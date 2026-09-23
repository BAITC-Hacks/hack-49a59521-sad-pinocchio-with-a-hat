from functools import lru_cache
from pathlib import Path
from typing import Any


def _intersection(left_start: float, left_end: float, right_start: float, right_end: float) -> float:
    return max(0.0, min(left_end, right_end) - max(left_start, right_start))


def assign_speakers(
    transcript_segments: list[dict[str, Any]],
    speaker_segments: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    """Attach the speaker with the largest temporal overlap to each transcript segment."""
    for transcript in transcript_segments:
        best_speaker = None
        best_overlap = 0.0
        for speaker in speaker_segments:
            overlap = _intersection(
                transcript["start"],
                transcript["end"],
                speaker["start"],
                speaker["end"],
            )
            if overlap > best_overlap:
                best_overlap = overlap
                best_speaker = speaker["speaker"]
        transcript["speaker"] = best_speaker
    return transcript_segments


@lru_cache(maxsize=1)
def _load_pipeline(model_name: str, token: str | None):
    try:
        from pyannote.audio import Pipeline
    except ImportError as exc:
        raise RuntimeError(
            "pyannote.audio не установлен. Выполните: pip install -r requirements.txt"
        ) from exc

    kwargs = {"token": token} if token else {}
    pipeline = Pipeline.from_pretrained(model_name, **kwargs)
    if pipeline is None:
        raise RuntimeError(f"Не удалось загрузить модель диаризации: {model_name}")
    return pipeline


def diarize_file(
    file_path: Path,
    model_name: str,
    token: str | None = None,
    min_speakers: int | None = None,
    max_speakers: int | None = None,
) -> list[dict[str, Any]]:
    """Run local speaker diarization and return normalized time intervals."""
    pipeline = _load_pipeline(model_name, token)
    kwargs = {}
    if min_speakers is not None:
        kwargs["min_speakers"] = min_speakers
    if max_speakers is not None:
        kwargs["max_speakers"] = max_speakers

    output = pipeline(str(file_path), **kwargs)
    # pyannote.audio 4.x returns a DiarizeOutput wrapper, while older
    # versions returned Annotation directly. Exclusive diarization is easier
    # to reconcile with ASR timestamps because it avoids speaker overlaps.
    annotation = getattr(output, "exclusive_speaker_diarization", None)
    if annotation is None:
        annotation = getattr(output, "speaker_diarization", output)
    if not hasattr(annotation, "itertracks"):
        raise RuntimeError(
            "Не удалось получить интервалы говорящих из результата pyannote.audio"
        )

    result = []
    for turn, _, speaker in annotation.itertracks(yield_label=True):
        result.append(
            {
                "start": round(float(turn.start), 3),
                "end": round(float(turn.end), 3),
                "speaker": str(speaker),
            }
        )
    return result
