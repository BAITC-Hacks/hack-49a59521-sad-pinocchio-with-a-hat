from abc import ABC, abstractmethod
from copy import deepcopy

from app.config import Settings


class DiarizationProvider(ABC):
    @abstractmethod
    def diarize(self, audio_path: str, transcript: dict) -> dict:
        raise NotImplementedError


class MockDiarizationProvider(DiarizationProvider):
    def diarize(self, audio_path: str, transcript: dict) -> dict:
        # Preserve fixture speakers; never fabricate alternating speakers for real audio.
        return deepcopy(transcript)


class LocalDiarizationProvider(DiarizationProvider):
    """Offline fallback: all segments belong to one unidentified speaker."""

    def diarize(self, audio_path: str, transcript: dict) -> dict:
        result = deepcopy(transcript)
        for segment in result["segments"]:
            segment["speaker_id"] = "speaker_1"
        return result


def get_diarization_provider(settings: Settings) -> DiarizationProvider:
    return (
        LocalDiarizationProvider()
        if settings.diarization_provider == "local"
        else MockDiarizationProvider()
    )
