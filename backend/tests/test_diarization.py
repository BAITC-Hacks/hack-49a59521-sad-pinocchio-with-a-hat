import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parents[1]))

from app.diarization import assign_speakers


def test_assigns_speaker_by_largest_overlap():
    transcript = [{"start": 1.0, "end": 4.0, "text": "hello", "speaker": None}]
    speakers = [
        {"start": 0.0, "end": 2.0, "speaker": "SPEAKER_00"},
        {"start": 2.0, "end": 4.0, "speaker": "SPEAKER_01"},
    ]

    result = assign_speakers(transcript, speakers)

    assert result[0]["speaker"] == "SPEAKER_01"
