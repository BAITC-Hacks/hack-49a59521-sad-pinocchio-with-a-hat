import json
import sys
from types import SimpleNamespace

import httpx
import pytest
from fastapi.testclient import TestClient
from pydantic import ValidationError

from app.analysis import (
    ApiMeetingAnalysisProvider,
    MockMeetingAnalysisProvider,
    get_analysis_provider,
    resolve_deadline,
)
from app.api import create_app
from app.config import Settings
from app.demo import demo_transcript
from app.diarization import (
    LocalDiarizationProvider,
    MockDiarizationProvider,
    get_diarization_provider,
)
from app.errors import ProviderError
from app.models import Analysis, Transcript, validate_analysis
from app.stt import (
    ApiWhisperProvider,
    LocalWhisperProvider,
    MockSpeechToTextProvider,
    get_stt_provider,
)


def test_mock_providers_and_grounding():
    transcript = MockSpeechToTextProvider().transcribe("unused")
    diarized = MockDiarizationProvider().diarize("unused", transcript)
    assert diarized == transcript and diarized is not transcript
    analysis = MockMeetingAnalysisProvider().analyze(diarized, "2026-09-23")
    assert len(Analysis.model_validate(analysis).tasks) == 5
    assert analysis["tasks"][-1]["assignee"] is None
    assert analysis["tasks"][-1]["deadline"] == "2026-09-25"
    analysis["tasks"][0]["source_segment_ids"] = ["invented"]
    with pytest.raises(ValueError):
        validate_analysis(analysis, Transcript.model_validate(transcript))


@pytest.mark.parametrize(
    "text,expected",
    [
        ("завтра", "2026-09-24"),
        ("ертең", "2026-09-24"),
        ("до пятницы", "2026-09-25"),
        ("на следующей неделе", "2026-09-28"),
        ("до 2026-09-30", "2026-09-30"),
        ("без срока", None),
        ("2026-02-31", None),
    ],
)
def test_relative_dates(text, expected):
    assert resolve_deadline(text, "2026-09-23") == expected


def test_discussion_is_not_task():
    transcript = {
        "language": "ru",
        "segments": [
            {
                "id": "s1",
                "speaker_id": "speaker_1",
                "start": 0,
                "end": 2,
                "text": "Возможно, стоит обсудить бюджет.",
            }
        ],
    }
    assert MockMeetingAnalysisProvider().analyze(transcript, "2026-09-23")["tasks"] == []


def test_pydantic_validation():
    transcript = demo_transcript()
    transcript["segments"][0]["end"] = -1
    with pytest.raises(ValidationError):
        Transcript.model_validate(transcript)
    result = MockMeetingAnalysisProvider().analyze(demo_transcript(), "2026-09-23")
    result["tasks"][0]["confidence"] = 1.1
    with pytest.raises(ValidationError):
        Analysis.model_validate(result)


@pytest.mark.parametrize(
    "provider,kind",
    [
        ("mock", MockSpeechToTextProvider),
        ("api", ApiWhisperProvider),
        ("local", LocalWhisperProvider),
    ],
)
def test_stt_switch(settings, provider, kind):
    settings.stt_provider = provider
    assert isinstance(get_stt_provider(settings), kind)


def test_other_switches(settings):
    assert isinstance(get_analysis_provider(settings), MockMeetingAnalysisProvider)
    settings.ai_provider = "api"
    assert isinstance(get_analysis_provider(settings), ApiMeetingAnalysisProvider)
    assert isinstance(get_diarization_provider(settings), MockDiarizationProvider)
    settings.diarization_provider = "local"
    assert isinstance(get_diarization_provider(settings), LocalDiarizationProvider)
    result = get_diarization_provider(settings).diarize("", demo_transcript())
    assert {s["speaker_id"] for s in result["segments"]} == {"speaker_1"}


def test_local_guard():
    with pytest.raises(ValidationError, match="external API disabled"):
        Settings(_env_file=None, stt_provider="local", ai_provider="api")


def test_local_pipeline_never_calls_api(settings, monkeypatch, tmp_path):
    calls = []
    original_post = httpx.Client.post

    class FakeWhisper:
        def __init__(self, model, **kwargs):
            assert kwargs["local_files_only"] is True
            calls.append(model)

        def transcribe(self, path, **kwargs):
            assert kwargs["multilingual"] is True
            return iter(
                [SimpleNamespace(start=0, end=2, text="Я подготовлю отчёт завтра.")]
            ), SimpleNamespace(language="ru")

    def forbidden(*args, **kwargs):
        if isinstance(args[0], TestClient):
            return original_post(*args, **kwargs)
        pytest.fail("External API called in local/demo mode")

    monkeypatch.setitem(sys.modules, "faster_whisper", SimpleNamespace(WhisperModel=FakeWhisper))
    monkeypatch.setattr(httpx.Client, "post", forbidden)
    monkeypatch.setattr(ApiWhisperProvider, "transcribe", forbidden)
    monkeypatch.setattr(ApiMeetingAnalysisProvider, "analyze", forbidden)
    settings.stt_provider = "local"
    settings.diarization_provider = "local"
    model_dir = tmp_path / "offline-model"
    model_dir.mkdir()
    for name in ("model.bin", "config.json", "tokenizer.json"):
        (model_dir / name).write_text("test fixture")
    settings.whisper_model = str(model_dir)
    with TestClient(create_app(settings)) as client:
        mid = client.post(
            "/api/meetings/upload", files={"file": ("a.wav", b"fake", "audio/wav")}
        ).json()["meeting_id"]
        client.post(f"/api/meetings/{mid}/process")
        meeting = client.get(f"/api/meetings/{mid}").json()
        assert meeting["status"] == "completed", meeting
        assert calls and len(meeting["speakers"]) == 1
        assert any("fallback" in w for w in meeting["warnings"])


def test_incomplete_local_model_cannot_download_tokenizer(settings, monkeypatch, tmp_path):
    def forbidden(*args, **kwargs):
        pytest.fail("Incomplete model must be rejected before engine construction")

    model_dir = tmp_path / "incomplete-model"
    model_dir.mkdir()
    for name in ("model.bin", "config.json"):
        (model_dir / name).write_text("fixture")
    monkeypatch.setitem(sys.modules, "faster_whisper", SimpleNamespace(WhisperModel=forbidden))
    settings.whisper_model = str(model_dir)
    with pytest.raises(ProviderError, match="tokenizer.json"):
        LocalWhisperProvider(settings).transcribe("unused")


def test_demo_ignores_api_settings(settings, monkeypatch):
    settings.stt_provider = settings.ai_provider = "api"

    def forbidden(*args, **kwargs):
        pytest.fail("demo contacted API")

    monkeypatch.setattr(ApiWhisperProvider, "transcribe", forbidden)
    monkeypatch.setattr(ApiMeetingAnalysisProvider, "analyze", forbidden)
    with TestClient(create_app(settings)) as client:
        assert client.post("/api/demo/meeting").status_code == 201


def api_settings(settings):
    settings.ai_provider = settings.stt_provider = "api"
    settings.ai_api_url = "https://example.test/v1/chat/completions"
    settings.ai_model = "test-model"
    settings.stt_api_url = "https://example.test/v1/audio/transcriptions"
    settings.stt_model = "test-stt"
    return settings


def test_ai_retry_then_valid(settings, monkeypatch):
    settings = api_settings(settings)
    good = MockMeetingAnalysisProvider().analyze(demo_transcript(), "2026-09-23")
    calls = []

    def post(self, url, **kwargs):
        calls.append(json.loads(json.dumps(kwargs["json"])))
        content = "not json" if len(calls) == 1 else json.dumps(good)
        return httpx.Response(
            200,
            request=httpx.Request("POST", url),
            json={"choices": [{"message": {"content": content}}]},
        )

    monkeypatch.setattr(httpx.Client, "post", post)
    assert ApiMeetingAnalysisProvider(settings).analyze(demo_transcript(), "2026-09-23") == good
    assert len(calls) == 2
    assert "Исправь" in calls[1]["messages"][-1]["content"]


def test_invalid_ai_twice_fails_pipeline(settings, monkeypatch):
    settings = api_settings(settings)
    settings.stt_provider = "mock"
    calls = []
    original_post = httpx.Client.post

    def post(self, url, **kwargs):
        if isinstance(self, TestClient):
            return original_post(self, url, **kwargs)
        calls.append(url)
        return httpx.Response(
            200,
            request=httpx.Request("POST", url),
            json={"choices": [{"message": {"content": "{}"}}]},
        )

    monkeypatch.setattr(httpx.Client, "post", post)
    with TestClient(create_app(settings)) as client:
        mid = client.post(
            "/api/meetings/upload", files={"file": ("a.wav", b"fake", "audio/wav")}
        ).json()["meeting_id"]
        client.post(f"/api/meetings/{mid}/process")
        status = client.get(f"/api/meetings/{mid}/status").json()
        assert status["status"] == "failed" and "дважды" in status["error"]
    assert len(calls) == 2


def test_api_stt(settings, monkeypatch, tmp_path):
    settings = api_settings(settings)
    path = tmp_path / "audio.wav"
    path.write_bytes(b"sample")

    def post(self, url, **kwargs):
        assert kwargs["data"]["response_format"] == "verbose_json"
        assert kwargs["files"]["file"][1].read() == b"sample"
        return httpx.Response(
            200,
            request=httpx.Request("POST", url),
            json={
                "language": "russian",
                "segments": [{"start": 0, "end": 2, "text": "Сәлем, коллеги"}],
            },
        )

    monkeypatch.setattr(httpx.Client, "post", post)
    result = ApiWhisperProvider(settings).transcribe(str(path))
    assert result["language"] == "mixed"
    assert result["segments"][0]["id"] == "segment-1"


def test_api_error_does_not_leak_secrets(settings, monkeypatch):
    settings = api_settings(settings)

    def post(self, url, **kwargs):
        return httpx.Response(
            401, text="secret-key private transcript", request=httpx.Request("POST", url)
        )

    monkeypatch.setattr(httpx.Client, "post", post)
    with pytest.raises(ProviderError) as exc:
        ApiMeetingAnalysisProvider(settings).analyze(demo_transcript(), "2026-09-23")
    assert str(exc.value) == "AI API: HTTP 401"
