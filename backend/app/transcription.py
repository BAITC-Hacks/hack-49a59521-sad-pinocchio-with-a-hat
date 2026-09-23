from pathlib import Path
from typing import Any

from .config import (
    DIARIZATION_ENABLED,
    DIARIZATION_MODEL,
    HF_TOKEN,
    MAX_SPEAKERS,
    MIN_SPEAKERS,
)
from .audio import normalized_audio
from .diarization import assign_speakers, diarize_file


def transcribe_file(file_path: Path) -> dict[str, Any]:
    """Run local speech-to-text with faster-whisper.

    The model is imported lazily so the API can start and expose a useful
    configuration error even when ML dependencies are not installed yet.
    """
    try:
        from faster_whisper import WhisperModel
    except ImportError as exc:
        raise RuntimeError(
            "faster-whisper не установлен. Выполните: pip install -r requirements.txt"
        ) from exc

    from .config import MODEL_COMPUTE_TYPE, MODEL_DEVICE, MODEL_SIZE

    model = WhisperModel(
        MODEL_SIZE,
        device=MODEL_DEVICE,
        compute_type=MODEL_COMPUTE_TYPE,
    )
    with normalized_audio(file_path) as normalized_path:
        segments, info = model.transcribe(
            str(normalized_path),
            task="transcribe",
            vad_filter=True,
            beam_size=5,
        )

        result_segments = []
        for segment in segments:
            result_segments.append(
                {
                    "start": round(segment.start, 3),
                    "end": round(segment.end, 3),
                    "text": segment.text.strip(),
                    "language": info.language,
                    "speaker": None,
                }
            )

        diarization_segments = []
        if DIARIZATION_ENABLED:
            diarization_segments = diarize_file(
                normalized_path,
                model_name=DIARIZATION_MODEL,
                token=HF_TOKEN,
                min_speakers=MIN_SPEAKERS,
                max_speakers=MAX_SPEAKERS,
            )
            result_segments = assign_speakers(result_segments, diarization_segments)

    return {
        "language": info.language,
        "duration": getattr(info, "duration", None),
        "diarization": {
            "enabled": DIARIZATION_ENABLED,
            "speakers": sorted({item["speaker"] for item in diarization_segments}),
        },
        "segments": result_segments,
    }
