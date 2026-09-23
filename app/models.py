from datetime import date
from typing import Annotated, Literal
from uuid import uuid4

from pydantic import BaseModel, ConfigDict, Field, model_validator

NonEmpty = Annotated[str, Field(min_length=1, max_length=20000)]
Priority = Literal["low", "normal", "high", "urgent"]
TaskStatus = Literal["open", "in_progress", "done", "cancelled"]
MeetingStatus = Literal["uploaded", "processing", "completed", "failed"]


class StrictModel(BaseModel):
    model_config = ConfigDict(extra="forbid", allow_inf_nan=False)


class Segment(StrictModel):
    id: NonEmpty
    speaker_id: NonEmpty
    start: float = Field(ge=0)
    end: float = Field(ge=0)
    text: NonEmpty

    @model_validator(mode="after")
    def interval(self):
        if self.end < self.start:
            raise ValueError("end must be >= start")
        return self


class Transcript(StrictModel):
    language: NonEmpty
    segments: list[Segment] = Field(min_length=1)

    @model_validator(mode="after")
    def unique_ids(self):
        if len({s.id for s in self.segments}) != len(self.segments):
            raise ValueError("Duplicate segment IDs")
        return self


class Task(StrictModel):
    id: NonEmpty
    title: NonEmpty
    description: str
    assignee: str | None
    assignee_name: str | None
    deadline: date | None
    priority: Priority
    status: TaskStatus
    source_segment_ids: list[str] = Field(min_length=1)
    confidence: float = Field(ge=0, le=1)


class Analysis(StrictModel):
    summary: NonEmpty
    decisions: list[str]
    unresolved_questions: list[str]
    tasks: list[Task]

    @model_validator(mode="after")
    def unique_ids(self):
        if len({t.id for t in self.tasks}) != len(self.tasks):
            raise ValueError("Duplicate task IDs")
        return self


def validate_analysis(data: dict, transcript: Transcript) -> Analysis:
    result = Analysis.model_validate(data)
    segments = {s.id for s in transcript.segments}
    speakers = {s.speaker_id for s in transcript.segments}
    for task in result.tasks:
        if not set(task.source_segment_ids) <= segments:
            raise ValueError("Task refers to an unknown source segment")
        if task.assignee is not None and task.assignee not in speakers:
            raise ValueError("Task refers to an unknown speaker")
    return result


class Speaker(StrictModel):
    id: str
    name: str | None = None


class Meeting(StrictModel):
    meeting_id: str = Field(default_factory=lambda: str(uuid4()))
    title: str
    date: date
    filename: str | None = None
    status: MeetingStatus = "uploaded"
    duration: float | None = None
    language: str | None = None
    speakers: list[Speaker] = Field(default_factory=list)
    transcript: Transcript | None = None
    summary: str | None = None
    decisions: list[str] = Field(default_factory=list)
    unresolved_questions: list[str] = Field(default_factory=list)
    tasks: list[Task] = Field(default_factory=list)
    error: str | None = None
    warnings: list[str] = Field(default_factory=list)
    providers: dict[str, str] = Field(default_factory=dict)


class TaskPatch(StrictModel):
    assignee: NonEmpty | None = None
    assignee_name: NonEmpty | None = None
    deadline: date | None = None
    title: NonEmpty | None = None
    description: str | None = None
    priority: Priority | None = None
    status: TaskStatus | None = None

    @model_validator(mode="after")
    def reject_null_required(self):
        for key in self.model_fields_set & {"title", "description", "priority", "status"}:
            if getattr(self, key) is None:
                raise ValueError(f"{key} cannot be null")
        return self


class SpeakerPatch(StrictModel):
    name: Annotated[str, Field(min_length=1, max_length=200)]
