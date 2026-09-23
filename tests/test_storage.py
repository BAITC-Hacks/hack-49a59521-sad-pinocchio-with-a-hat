from concurrent.futures import ThreadPoolExecutor
from datetime import date

from app.models import Meeting
from app.storage import ConflictError, Storage


def test_persistence_and_restart(tmp_path):
    storage = Storage(tmp_path)
    meeting = Meeting(title="Test", date=date(2026, 9, 23))
    storage.create(meeting)
    storage.claim(meeting.meeting_id)
    restarted = Storage(tmp_path)
    restarted.recover_interrupted()
    result = restarted.get(meeting.meeting_id)
    assert result.status == "failed" and "перезапуском" in result.error
    assert restarted.claim(meeting.meeting_id).status == "processing"


def test_concurrent_process_claim_is_atomic(tmp_path):
    storage = Storage(tmp_path)
    meeting = Meeting(title="Test", date=date(2026, 9, 23))
    storage.create(meeting)

    def claim(_):
        try:
            storage.claim(meeting.meeting_id)
            return "claimed"
        except ConflictError:
            return "conflict"

    with ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(claim, range(4)))
    assert results.count("claimed") == 1
