import os
import shutil
import subprocess
import tempfile
from contextlib import contextmanager
from pathlib import Path
from typing import Iterator

from app.config import Settings


def _ffmpeg_executable(settings: Settings) -> str:
    ffmpeg_dir = Path(settings.ffmpeg_dir)
    if not ffmpeg_dir.is_absolute():
        ffmpeg_dir = Path.cwd() / ffmpeg_dir
    local_binary = ffmpeg_dir / ("ffmpeg.exe" if os.name == "nt" else "ffmpeg")
    if local_binary.exists():
        return str(local_binary)
    system_binary = shutil.which("ffmpeg")
    if system_binary:
        return system_binary
    raise RuntimeError(
        "FFmpeg не найден. Укажите FFMPEG_DIR или добавьте full-shared FFmpeg в PATH."
    )


@contextmanager
def normalized_audio(source: str | Path, settings: Settings) -> Iterator[Path]:
    """Convert input audio/video to stable mono 16 kHz PCM WAV."""
    with tempfile.TemporaryDirectory(prefix="meeting-audio-") as temp_dir:
        target = Path(temp_dir) / "audio.wav"
        command = [
            _ffmpeg_executable(settings), "-hide_banner", "-loglevel", "error", "-y",
            "-i", str(source), "-vn", "-ac", "1", "-ar", "16000", "-c:a", "pcm_s16le",
            str(target),
        ]
        try:
            subprocess.run(command, check=True, capture_output=True, text=True, timeout=1800)
        except subprocess.CalledProcessError as exc:
            raise RuntimeError(f"FFmpeg не смог обработать файл: {(exc.stderr or '').strip()}") from exc
        except subprocess.TimeoutExpired as exc:
            raise RuntimeError("FFmpeg превысил лимит времени обработки файла") from exc
        yield target
