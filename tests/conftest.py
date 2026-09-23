import pytest
from fastapi.testclient import TestClient

from app.api import create_app
from app.config import Settings


@pytest.fixture
def settings(tmp_path):
    return Settings(
        _env_file=None,
        storage_dir=tmp_path,
        stt_provider="mock",
        ai_provider="mock",
        diarization_provider="mock",
        max_upload_size_mb=1,
    )


@pytest.fixture
def client(settings):
    with TestClient(create_app(settings)) as client:
        yield client


@pytest.fixture
def demo(client):
    response = client.post("/api/demo/meeting")
    assert response.status_code == 201, response.text
    return response.json()
