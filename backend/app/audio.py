import shutil
import subprocess
import tempfile
from contextlib import contextmanager
from pathlib import Path
from typing import Iterator

from .config import FFMPEG_DIR


def _ffmpeg_executable() -> str:
    local_binary = FFMPEG_DIR / "ffmpeg.exe"
    if local_binary.exists():
        return str(local_binary)
    system_binary = shutil.which("ffmpeg")
    if system_binary:
        return system_binary
    raise RuntimeError(
        "FFmpeg не найден. Поместите full-shared сборку в backend/tools/ffmpeg/bin "
        "или добавьте FFmpeg в PATH."
    )


@contextmanager
def normalized_audio(source: Path) -> Iterator[Path]:
    """Convert input audio/video to stable mono 16 kHz PCM WAV."""
    with tempfile.TemporaryDirectory(prefix="meeting-audio-") as temp_dir:
        target = Path(temp_dir) / "audio.wav"
        command = [
            _ffmpeg_executable(),
            "-hide_banner",
            "-loglevel",
            "error",
            "-y",
            "-i",
            str(source),
            "-vn",
            "-ac",
            "1",
            "-ar",
            "16000",
            "-c:a",
            "pcm_s16le",
            str(target),
        ]
        try:
            subprocess.run(command, check=True, capture_output=True, text=True, timeout=1800)
        except subprocess.CalledProcessError as exc:
            details = (exc.stderr or "").strip()
            raise RuntimeError(f"FFmpeg не смог обработать файл: {details}") from exc
        except subprocess.TimeoutExpired as exc:
            raise RuntimeError("FFmpeg превысил лимит времени обработки файла") from exc
        yield target
