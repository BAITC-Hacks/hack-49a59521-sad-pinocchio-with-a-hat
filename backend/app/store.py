import json
from pathlib import Path
from threading import Lock

from .config import RESULTS_DIR
from .models import MeetingStatus


class MeetingStore:
    def __init__(self) -> None:
        self._lock = Lock()
        self._meetings: dict[str, MeetingStatus] = {}

    def put(self, meeting: MeetingStatus) -> MeetingStatus:
        with self._lock:
            self._meetings[meeting.id] = meeting
        return meeting

    def get(self, meeting_id: str) -> MeetingStatus | None:
        return self._meetings.get(meeting_id)

    def save_result(self, meeting_id: str, result: dict) -> None:
        path = RESULTS_DIR / f"{meeting_id}.json"
        path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")

    def read_result(self, meeting_id: str) -> dict | None:
        path = RESULTS_DIR / f"{meeting_id}.json"
        if not path.exists():
            return None
        return json.loads(path.read_text(encoding="utf-8"))
