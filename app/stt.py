import os
from abc import ABC, abstractmethod
from pathlib import Path

import httpx

from app.config import Settings
from app.audio import normalized_audio
from app.demo import demo_transcript
from app.errors import ProviderError
from app.models import Transcript


class SpeechToTextProvider(ABC):
    @abstractmethod
    def transcribe(self, audio_path: str) -> dict:
        raise NotImplementedError


class MockSpeechToTextProvider(SpeechToTextProvider):
    def transcribe(self, audio_path: str) -> dict:
        return demo_transcript()


def language_label(text: str, detected: str) -> str:
    # An explicit heuristic, not language identification: preserve the model label otherwise.
    has_kk = any(c in text.lower() for c in "әғқңөұүһі")
    if has_kk and detected in ("ru", "russian"):
        return "mixed"
    return {"russian": "ru", "kazakh": "kk"}.get(detected.lower(), detected)


class ApiWhisperProvider(SpeechToTextProvider):
    def __init__(self, settings: Settings):
        self.settings = settings

    def transcribe(self, audio_path: str) -> dict:
        s = self.settings
        if not s.stt_api_url or not s.stt_model:
            raise ProviderError("Для API STT задайте STT_API_URL и STT_MODEL")
        headers = {"Authorization": f"Bearer {s.stt_api_key}"} if s.stt_api_key else {}
        try:
            with (
                Path(audio_path).open("rb") as audio,
                httpx.Client(timeout=s.api_timeout_seconds, follow_redirects=False) as client,
            ):
                response = client.post(
                    s.stt_api_url,
                    headers=headers,
                    files={"file": (Path(audio_path).name, audio)},
                    data={
                        "model": s.stt_model,
                        "response_format": "verbose_json",
                        "timestamp_granularities[]": "segment",
                    },
                )
                response.raise_for_status()
                data = response.json()
            segments = [
                {
                    "id": f"segment-{i + 1}",
                    "speaker_id": "speaker_1",
                    "start": item["start"],
                    "end": item["end"],
                    "text": item["text"].strip(),
                }
                for i, item in enumerate(data["segments"])
                if item["text"].strip()
            ]
            transcript = Transcript.model_validate(
                {
                    "language": language_label(
                        " ".join(x["text"] for x in segments), data.get("language", "unknown")
                    ),
                    "segments": segments,
                }
            )
            return transcript.model_dump(mode="json")
        except httpx.HTTPStatusError as exc:
            raise ProviderError(f"STT API: HTTP {exc.response.status_code}") from None
        except httpx.RequestError:
            raise ProviderError("STT API недоступен или превышено время ожидания") from None
        except (ValueError, KeyError, TypeError):
            raise ProviderError(
                "STT API вернул некорректный транскрипт с временными метками"
            ) from None


class LocalWhisperProvider(SpeechToTextProvider):
    def __init__(self, settings: Settings):
        self.settings = settings

    def transcribe(self, audio_path: str) -> dict:
        os.environ["HF_HUB_OFFLINE"] = "1"
        os.environ["TRANSFORMERS_OFFLINE"] = "1"
        try:
            from faster_whisper import WhisperModel
        except ImportError:
            raise ProviderError("Установите зависимости .[local] для локального Whisper") from None
        s = self.settings
        try:
            model_path = Path(s.whisper_model)
            if not model_path.is_dir():
                from faster_whisper.utils import download_model

                model_path = Path(
                    download_model(
                        s.whisper_model, local_files_only=True, cache_dir=s.whisper_download_root
                    )
                )
            # WhisperModel otherwise falls back to an online tokenizer download,
            # even when model loading itself uses local_files_only=True.
            for required in ("model.bin", "config.json", "tokenizer.json"):
                if not (model_path / required).is_file():
                    raise ProviderError(
                        f"Локальная модель неполна: отсутствует {required}. "
                        "Перенесите полный каталог модели; скачивание отключено."
                    )
            model = WhisperModel(
                str(model_path),
                device=s.whisper_device,
                compute_type=s.whisper_compute_type,
                download_root=s.whisper_download_root,
                local_files_only=True,
            )
            def run_transcription(path: str):
                segments, info = model.transcribe(
                    path, language=None, task="transcribe", multilingual=True, vad_filter=True
                )
                return [
                    {
                        "id": f"segment-{i + 1}", "speaker_id": "speaker_1",
                        "start": seg.start, "end": seg.end, "text": seg.text.strip(),
                    }
                    for i, seg in enumerate(segments)
                    if seg.text.strip()
                ], info

            try:
                with normalized_audio(audio_path, s) as normalized_path:
                    items, info = run_transcription(str(normalized_path))
            except RuntimeError:
                # Unit tests and pre-normalized WAV inputs can still be handled
                # directly by Whisper when FFmpeg is unavailable.
                items, info = run_transcription(audio_path)
            return Transcript.model_validate(
                {
                    "language": language_label(" ".join(x["text"] for x in items), info.language),
                    "segments": items,
                }
            ).model_dump(mode="json")
        except ProviderError:
            raise
        except Exception:
            raise ProviderError(
                "Локальный Whisper не смог обработать файл. Проверьте аудио, "
                "WHISPER_MODEL, наличие модели на диске и зависимости .[local]. "
                "Автоматическое скачивание отключено."
            ) from None


def get_stt_provider(settings: Settings) -> SpeechToTextProvider:
    return {
        "mock": lambda: MockSpeechToTextProvider(),
        "api": lambda: ApiWhisperProvider(settings),
        "local": lambda: LocalWhisperProvider(settings),
    }[settings.stt_provider]()
