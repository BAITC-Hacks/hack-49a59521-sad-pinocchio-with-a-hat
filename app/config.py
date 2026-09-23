from pathlib import Path
from typing import Literal

from pydantic import Field, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=(".env", "backend/.env"), extra="ignore")
    stt_provider: Literal["api", "local", "mock"] = "local"
    ai_provider: Literal["api", "mock"] = "mock"
    diarization_provider: Literal["local", "mock"] = "local"
    stt_api_url: str = ""
    stt_api_key: str = ""
    stt_model: str = ""
    ai_api_url: str = ""
    ai_api_key: str = ""
    ai_model: str = ""
    whisper_model: str = "./models/whisper-small"
    whisper_device: str = "cpu"
    whisper_compute_type: str = "int8"
    whisper_download_root: str = "./models"
    ffmpeg_dir: Path = Path("tools/ffmpeg/bin")
    diarization_model: str = "pyannote/speaker-diarization-community-1"
    hf_token: str = ""
    min_speakers: int = Field(default=1, ge=1)
    max_speakers: int = Field(default=20, ge=1)
    max_upload_size_mb: int = Field(default=500, gt=0)
    storage_dir: Path = Path("storage")
    pdf_font_path: str = ""
    api_timeout_seconds: float = Field(default=180, gt=0)

    @model_validator(mode="after")
    def protect_local_mode(self):
        if self.stt_provider == "local" and self.ai_provider == "api":
            raise ValueError("STT_PROVIDER=local requires AI_PROVIDER=mock: external API disabled")
        return self
