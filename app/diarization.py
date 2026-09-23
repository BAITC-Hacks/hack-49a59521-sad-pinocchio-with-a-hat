from abc import ABC, abstractmethod
from copy import deepcopy
from functools import lru_cache

from app.audio import normalized_audio
from app.config import Settings


class DiarizationProvider(ABC):
    @abstractmethod
    def diarize(self, audio_path: str, transcript: dict) -> dict:
        raise NotImplementedError


class MockDiarizationProvider(DiarizationProvider):
    def diarize(self, audio_path: str, transcript: dict) -> dict:
        return deepcopy(transcript)


def _overlap(left_start: float, left_end: float, right_start: float, right_end: float) -> float:
    return max(0.0, min(left_end, right_end) - max(left_start, right_start))


@lru_cache(maxsize=1)
def _load_pipeline(model_name: str, token: str):
    try:
        from pyannote.audio import Pipeline
    except ImportError as exc:
        raise RuntimeError(
            "Установите pyannote.audio и torchcodec для локальной диаризации"
        ) from exc
    pipeline = Pipeline.from_pretrained(model_name, token=token or None)
    if pipeline is None:
        raise RuntimeError(f"Не удалось загрузить модель диаризации: {model_name}")
    return pipeline


class LocalDiarizationProvider(DiarizationProvider):
    def __init__(self, settings: Settings):
        self.settings = settings

    def diarize(self, audio_path: str, transcript: dict) -> dict:
        settings = self.settings
        try:
            with normalized_audio(audio_path, settings) as normalized_path:
                pipeline = _load_pipeline(settings.diarization_model, settings.hf_token)
                output = pipeline(
                    str(normalized_path),
                    min_speakers=settings.min_speakers,
                    max_speakers=settings.max_speakers,
                )
        except Exception as exc:
            raise RuntimeError(f"Локальная диаризация не выполнена: {exc}") from exc

        annotation = getattr(output, "exclusive_speaker_diarization", None)
        if annotation is None:
            annotation = getattr(output, "speaker_diarization", output)
        if not hasattr(annotation, "itertracks"):
            raise RuntimeError("pyannote.audio вернул результат без временных интервалов")

        speakers = [
            {"start": float(turn.start), "end": float(turn.end), "speaker": str(speaker)}
            for turn, _, speaker in annotation.itertracks(yield_label=True)
        ]
        result = deepcopy(transcript)
        for segment in result["segments"]:
            best = max(
                speakers,
                key=lambda item: _overlap(
                    segment["start"], segment["end"], item["start"], item["end"]
                ),
                default=None,
            )
            segment["speaker_id"] = (
                best["speaker"]
                if best and _overlap(segment["start"], segment["end"], best["start"], best["end"]) > 0
                else "unknown"
            )
        return result


def get_diarization_provider(settings: Settings) -> DiarizationProvider:
    return (
        LocalDiarizationProvider(settings)
        if settings.diarization_provider == "local"
        else MockDiarizationProvider()
    )
