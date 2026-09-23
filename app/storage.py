import sqlite3
from contextlib import contextmanager
from pathlib import Path

from app.models import Meeting


class ConflictError(Exception):
    pass


class Storage:
    def __init__(self, root: Path):
        self.root = root
        self.uploads = root / "uploads"
        self.results = root / "results"
        self.uploads.mkdir(parents=True, exist_ok=True)
        self.results.mkdir(parents=True, exist_ok=True)
        self.db = self.results / "meetings.sqlite3"
        with self.connect() as conn:
            conn.execute("PRAGMA journal_mode=WAL")
            conn.execute(
                "CREATE TABLE IF NOT EXISTS meetings (id TEXT PRIMARY KEY, data TEXT NOT NULL)"
            )

    @contextmanager
    def connect(self):
        conn = sqlite3.connect(self.db, timeout=30)
        try:
            with conn:
                yield conn
        finally:
            conn.close()

    def create(self, meeting: Meeting):
        with self.connect() as conn:
            conn.execute(
                "INSERT INTO meetings VALUES (?, ?)",
                (meeting.meeting_id, meeting.model_dump_json()),
            )

    def get(self, meeting_id: str) -> Meeting:
        with self.connect() as conn:
            row = conn.execute("SELECT data FROM meetings WHERE id=?", (meeting_id,)).fetchone()
        if row is None:
            raise KeyError(meeting_id)
        return Meeting.model_validate_json(row[0])

    def mutate(self, meeting_id: str, change) -> Meeting:
        with self.connect() as conn:
            conn.execute("BEGIN IMMEDIATE")
            row = conn.execute("SELECT data FROM meetings WHERE id=?", (meeting_id,)).fetchone()
            if row is None:
                raise KeyError(meeting_id)
            meeting = Meeting.model_validate_json(row[0])
            change(meeting)
            meeting = Meeting.model_validate(meeting.model_dump())
            conn.execute(
                "UPDATE meetings SET data=? WHERE id=?", (meeting.model_dump_json(), meeting_id)
            )
        return meeting

    def claim(self, meeting_id: str) -> Meeting:
        def change(m):
            if m.status not in ("uploaded", "failed"):
                raise ConflictError("Совещание уже обрабатывается или завершено")
            m.status = "processing"
            m.error = None

        return self.mutate(meeting_id, change)

    def recover_interrupted(self):
        with self.connect() as conn:
            rows = conn.execute("SELECT id, data FROM meetings").fetchall()
            for meeting_id, raw in rows:
                meeting = Meeting.model_validate_json(raw)
                if meeting.status == "processing":
                    meeting.status = "failed"
                    meeting.error = (
                        "Обработка прервана перезапуском сервера. Запустите process повторно."
                    )
                    conn.execute(
                        "UPDATE meetings SET data=? WHERE id=?",
                        (meeting.model_dump_json(), meeting_id),
                    )
