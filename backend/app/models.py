from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class MeetingStatus(BaseModel):
    id: str
    filename: str
    status: Literal["queued", "processing", "completed", "failed"]
    created_at: datetime
    error: str | None = None
    result_url: str | None = None


class TranscriptSegment(BaseModel):
    start: float
    end: float
    text: str
    language: str | None = None
    speaker: str | None = None


class TranscriptResult(BaseModel):
    meeting_id: str
    filename: str
    language: str
    duration: float | None = None
    segments: list[TranscriptSegment] = Field(default_factory=list)
