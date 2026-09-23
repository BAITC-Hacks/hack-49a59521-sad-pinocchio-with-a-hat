import re
from contextlib import asynccontextmanager
from datetime import date
from pathlib import Path
from typing import Annotated
from uuid import UUID

from fastapi import BackgroundTasks, FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response

from app.config import Settings
from app.demo import DEMO_DATE
from app.errors import ProviderError
from app.export import export_docx, export_pdf
from app.models import Meeting, SpeakerPatch, Task, TaskPatch, Transcript
from app.pipeline import Pipeline
from app.storage import ConflictError, Storage

MEDIA_TYPES = {
    ".mp3": {"audio/mpeg", "audio/mp3"},
    ".wav": {"audio/wav", "audio/x-wav", "audio/wave"},
    ".m4a": {"audio/mp4", "audio/x-m4a"},
    ".mp4": {"video/mp4", "audio/mp4"},
    ".webm": {"video/webm", "audio/webm"},
    ".ogg": {"audio/ogg", "video/ogg", "application/ogg"},
    ".flac": {"audio/flac", "audio/x-flac"},
    ".mpeg": {"video/mpeg"},
    ".mov": {"video/quicktime"},
}


def safe_filename(filename: str) -> str:
    basename = filename.replace("\\", "/").split("/")[-1]
    extension = Path(basename).suffix.lower()
    stem = re.sub(r"[^\w. -]", "_", Path(basename).stem, flags=re.UNICODE).strip(" .")[:120]
    # Prefix avoids Windows reserved device names such as CON.wav.
    return f"upload_{stem or 'meeting'}{extension}"


def create_app(settings: Settings | None = None) -> FastAPI:
    settings = settings or Settings()
    storage = Storage(settings.storage_dir)
    pipeline = Pipeline(settings, storage)

    @asynccontextmanager
    async def lifespan(app):
        storage.recover_interrupted()
        yield

    app = FastAPI(title="HackAlem Meeting Minutes", version="0.1.0", lifespan=lifespan)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost:5500",
            "http://localhost:3000",
            "http://localhost:5173",
            "null",
        ],
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.state.storage, app.state.pipeline, app.state.settings = storage, pipeline, settings

    @app.exception_handler(KeyError)
    async def not_found(request, exc):
        return JSONResponse(status_code=404, content={"detail": "Совещание или элемент не найден"})

    @app.exception_handler(ConflictError)
    async def conflict(request, exc):
        return JSONResponse(status_code=409, content={"detail": str(exc)})

    @app.exception_handler(ProviderError)
    async def provider_error(request, exc):
        return JSONResponse(status_code=503, content={"detail": str(exc)})

    def completed(meeting: Meeting):
        if meeting.status != "completed":
            raise ConflictError("Результат ещё не готов. Проверьте status и error.")

    @app.get("/health")
    def health():
        with storage.connect() as conn:
            conn.execute("SELECT 1")
        return {"status": "ok"}

    @app.post("/api/meetings/upload", status_code=201)
    async def upload(
        file: Annotated[UploadFile, File()],
        meeting_date: Annotated[date | None, Form()] = None,
        title: Annotated[str, Form(min_length=1, max_length=200)] = "Совещание",
    ):
        path = None
        try:
            if not file.filename:
                raise HTTPException(400, "Имя файла не указано")
            filename = safe_filename(file.filename)
            extension = Path(filename).suffix
            if extension not in MEDIA_TYPES:
                raise HTTPException(415, "Неподдерживаемое расширение файла")
            mime = (file.content_type or "").split(";")[0].lower()
            if mime not in MEDIA_TYPES[extension]:
                raise HTTPException(415, "MIME type не соответствует поддерживаемому формату")
            meeting = Meeting(title=title, date=meeting_date or date.today(), filename=filename)
            directory = storage.uploads / meeting.meeting_id
            directory.mkdir()
            path = directory / filename
            size = 0
            with path.open("xb") as target:
                while chunk := await file.read(1024 * 1024):
                    size += len(chunk)
                    if size > settings.max_upload_size_mb * 1024 * 1024:
                        raise HTTPException(413, "Файл превышает MAX_UPLOAD_SIZE_MB")
                    target.write(chunk)
            if size == 0:
                raise HTTPException(400, "Файл пуст")
            storage.create(meeting)
            return {
                "meeting_id": meeting.meeting_id,
                "status": meeting.status,
                "filename": filename,
            }
        except Exception:
            if path is not None:
                path.unlink(missing_ok=True)
                path.parent.rmdir()
            raise
        finally:
            await file.close()

    @app.post("/api/meetings/{meeting_id}/process", status_code=202)
    def process(meeting_id: UUID, background_tasks: BackgroundTasks):
        meeting = storage.claim(str(meeting_id))
        background_tasks.add_task(pipeline.run, str(meeting_id))
        return {"meeting_id": meeting.meeting_id, "status": meeting.status}

    @app.get("/api/meetings/{meeting_id}/status")
    def status(meeting_id: UUID):
        meeting = storage.get(str(meeting_id))
        return {"meeting_id": meeting.meeting_id, "status": meeting.status, "error": meeting.error}

    @app.get("/api/meetings/{meeting_id}", response_model=Meeting)
    def get_meeting(meeting_id: UUID):
        return storage.get(str(meeting_id))

    @app.get("/api/meetings/{meeting_id}/transcript", response_model=Transcript)
    def get_transcript(meeting_id: UUID):
        meeting = storage.get(str(meeting_id))
        completed(meeting)
        return meeting.transcript

    @app.patch("/api/meetings/{meeting_id}/tasks/{task_id}", response_model=Task)
    def patch_task(meeting_id: UUID, task_id: str, patch: TaskPatch):
        def change(meeting):
            completed(meeting)
            task = next((t for t in meeting.tasks if t.id == task_id), None)
            if task is None:
                raise KeyError(task_id)
            updates = patch.model_dump(exclude_unset=True)
            if updates.get("assignee") is not None and updates["assignee"] not in {
                s.id for s in meeting.speakers
            }:
                raise HTTPException(422, "Неизвестный speaker_id")
            if "assignee" in updates and "assignee_name" not in updates:
                updates["assignee_name"] = next(
                    (s.name for s in meeting.speakers if s.id == updates["assignee"]), None
                )
            updated = Task.model_validate(task.model_dump() | updates)
            meeting.tasks[meeting.tasks.index(task)] = updated

        meeting = storage.mutate(str(meeting_id), change)
        return next(t for t in meeting.tasks if t.id == task_id)

    @app.patch("/api/meetings/{meeting_id}/speakers/{speaker_id}")
    def patch_speaker(meeting_id: UUID, speaker_id: str, patch: SpeakerPatch):
        def change(meeting):
            completed(meeting)
            speaker = next((s for s in meeting.speakers if s.id == speaker_id), None)
            if speaker is None:
                raise KeyError(speaker_id)
            speaker.name = patch.name
            for task in meeting.tasks:
                if task.assignee == speaker_id:
                    task.assignee_name = patch.name

        meeting = storage.mutate(str(meeting_id), change)
        return next(s for s in meeting.speakers if s.id == speaker_id)

    @app.get("/api/meetings/{meeting_id}/export/{format}")
    def export(meeting_id: UUID, format: str):
        if format not in ("pdf", "docx"):
            raise HTTPException(404, "Неизвестный формат экспорта")
        meeting = storage.get(str(meeting_id))
        completed(meeting)
        # Generate from the latest transaction snapshot, so edits are always reflected.
        render = export_pdf if format == "pdf" else export_docx
        mime = (
            "application/pdf"
            if format == "pdf"
            else ("application/vnd.openxmlformats-officedocument.wordprocessingml.document")
        )
        return Response(
            content=render(meeting, settings),
            media_type=mime,
            headers={
                "Content-Disposition": f'attachment; filename="minutes-{meeting_id}.{format}"'
            },
        )

    @app.post("/api/demo/meeting", status_code=201, response_model=Meeting)
    def demo():
        meeting = Meeting(title="Запуск пилотного проекта", date=date.fromisoformat(DEMO_DATE))
        storage.create(meeting)
        storage.claim(meeting.meeting_id)
        pipeline.run(meeting.meeting_id, demo=True)
        result = storage.get(meeting.meeting_id)
        if result.status == "failed":
            return JSONResponse(status_code=500, content=result.model_dump(mode="json"))
        return result

    return app
