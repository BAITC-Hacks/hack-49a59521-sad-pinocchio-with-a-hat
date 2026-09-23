import logging
from threading import Semaphore

from app.analysis import MockMeetingAnalysisProvider, get_analysis_provider
from app.config import Settings
from app.diarization import MockDiarizationProvider, get_diarization_provider
from app.errors import ProviderError
from app.export import prepare_exports
from app.models import Speaker, Transcript, validate_analysis
from app.storage import Storage
from app.stt import MockSpeechToTextProvider, get_stt_provider

logger = logging.getLogger(__name__)


class Pipeline:
    def __init__(self, settings: Settings, storage: Storage):
        self.settings, self.storage = settings, storage
        self.slots = Semaphore(1)  # Avoid loading several Whisper models into RAM at once.

    def run(self, meeting_id: str, demo: bool = False):
        with self.slots:
            self._run(meeting_id, demo)

    def _run(self, meeting_id: str, demo: bool):
        stage = "подготовка"
        try:
            meeting = self.storage.get(meeting_id)
            s = self.settings
            stt = MockSpeechToTextProvider() if demo else get_stt_provider(s)
            diarization = MockDiarizationProvider() if demo else get_diarization_provider(s)
            analysis = MockMeetingAnalysisProvider() if demo else get_analysis_provider(s)
            path = str(self.storage.uploads / meeting_id / (meeting.filename or "demo.wav"))
            stage = "распознавание речи"
            transcript = Transcript.model_validate(stt.transcribe(path))
            stage = "диаризация"
            transcript = Transcript.model_validate(
                diarization.diarize(path, transcript.model_dump())
            )
            stage = "AI-анализ"
            result = validate_analysis(
                analysis.analyze(transcript.model_dump(), str(meeting.date)), transcript
            )
            meeting.transcript = transcript
            meeting.duration = max(seg.end for seg in transcript.segments)
            meeting.language = transcript.language
            meeting.speakers = [
                Speaker(id=sid)
                for sid in dict.fromkeys(seg.speaker_id for seg in transcript.segments)
            ]
            for field in ("summary", "decisions", "unresolved_questions", "tasks"):
                setattr(meeting, field, getattr(result, field))
            meeting.providers = {
                "stt": "mock" if demo else s.stt_provider,
                "ai": "mock" if demo else s.ai_provider,
                "diarization": "mock" if demo else s.diarization_provider,
            }
            meeting.warnings = []
            if meeting.providers["stt"] == "mock":
                meeting.warnings.append(
                    "Mock STT: фиксированный демонстрационный текст, не распознавание файла."
                )
            if meeting.providers["ai"] == "mock":
                meeting.warnings.append(
                    "Mock AI: ограниченные правила извлечения, не полноценная языковая модель."
                )
            if meeting.providers["diarization"] == "local":
                meeting.warnings.append(
                    "Локальная диаризация: fallback с одним неопределённым говорящим."
                )
            elif meeting.providers["stt"] != "mock":
                meeting.warnings.append(
                    "Mock-диаризация сохраняет метки STT; реального разделения голосов нет."
                )
            stage = "экспорт документов"
            prepare_exports(meeting, s, self.storage.results / meeting_id)
            meeting.status, meeting.error = "completed", None
            self.storage.mutate(meeting_id, lambda target: target.__dict__.update(meeting.__dict__))
        except Exception as exc:
            message = (
                str(exc)
                if isinstance(exc, ProviderError)
                else f"Ошибка этапа «{stage}» ({type(exc).__name__})"
            )
            # Log only safe metadata: provider exceptions can contain transcripts or API keys.
            logger.error("Meeting %s failed at %s: %s", meeting_id, stage, type(exc).__name__)

            def fail(target):
                target.status, target.error = "failed", message

            self.storage.mutate(meeting_id, fail)
