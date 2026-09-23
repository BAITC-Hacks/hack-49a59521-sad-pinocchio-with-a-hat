import shutil
import uuid
from datetime import datetime, timezone
from pathlib import Path

from fastapi import BackgroundTasks, FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from .config import ALLOWED_EXTENSIONS, UPLOADS_DIR, ensure_directories
from .models import MeetingStatus
from .store import MeetingStore
from .transcription import transcribe_file

store = MeetingStore()

app = FastAPI(
    title="Meeting AI Assistant API",
    version="0.1.0",
    description="Локальная обработка аудио и видео совещаний.",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def initialize_storage() -> None:
    ensure_directories()


def process_meeting(meeting_id: str, file_path: Path) -> None:
    meeting = store.get(meeting_id)
    if meeting is None:
        return
    store.put(meeting.model_copy(update={"status": "processing"}))
    try:
        result = transcribe_file(file_path)
        result.update({"meeting_id": meeting_id, "filename": meeting.filename})
        store.save_result(meeting_id, result)
        store.put(
            meeting.model_copy(
                update={
                    "status": "completed",
                    "result_url": f"/meetings/{meeting_id}/result",
                }
            )
        )
    except Exception as exc:  # noqa: BLE001 - expose task failure through status API
        store.put(meeting.model_copy(update={"status": "failed", "error": str(exc)}))


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/meetings", response_model=MeetingStatus, status_code=202)
def upload_meeting(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
) -> MeetingStatus:
    original_name = file.filename or "meeting"
    extension = Path(original_name).suffix.lower()
    if extension not in ALLOWED_EXTENSIONS:
        allowed = ", ".join(sorted(ALLOWED_EXTENSIONS))
        raise HTTPException(400, f"Неподдерживаемый формат. Разрешены: {allowed}")

    meeting_id = str(uuid.uuid4())
    target = UPLOADS_DIR / f"{meeting_id}{extension}"
    with target.open("wb") as output:
        shutil.copyfileobj(file.file, output)

    meeting = MeetingStatus(
        id=meeting_id,
        filename=original_name,
        status="queued",
        created_at=datetime.now(timezone.utc),
    )
    store.put(meeting)
    background_tasks.add_task(process_meeting, meeting_id, target)
    return meeting


@app.get("/meetings/{meeting_id}", response_model=MeetingStatus)
def get_meeting(meeting_id: str) -> MeetingStatus:
    meeting = store.get(meeting_id)
    if meeting is None:
        raise HTTPException(404, "Совещание не найдено")
    return meeting


@app.get("/meetings/{meeting_id}/result")
def get_result(meeting_id: str) -> dict:
    meeting = store.get(meeting_id)
    if meeting is None:
        raise HTTPException(404, "Совещание не найдено")
    if meeting.status != "completed":
        raise HTTPException(409, f"Результат пока недоступен: {meeting.status}")
    result = store.read_result(meeting_id)
    if result is None:
        raise HTTPException(404, "Результат не найден")
    return result
