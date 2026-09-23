FROM python:3.12-slim-bookworm AS base
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PIP_NO_CACHE_DIR=1
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends fonts-dejavu-core ffmpeg \
    && rm -rf /var/lib/apt/lists/* \
    && useradd --create-home --uid 10001 backend \
    && mkdir -p /data/uploads /data/results /models \
    && chown -R backend:backend /data /models
COPY requirements.txt requirements-local.txt ./
RUN pip install --require-hashes -r requirements.txt
COPY app ./app
ENV STORAGE_DIR=/data WHISPER_DOWNLOAD_ROOT=/models
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health', timeout=3)"
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]

FROM base AS local
RUN pip install --require-hashes -r requirements-local.txt
RUN pip install "pyannote.audio>=4.0.3,<5" "torchcodec>=0.16,<1"
ENV HF_HUB_OFFLINE=1 TRANSFORMERS_OFFLINE=1
USER backend

FROM base AS api
USER backend

FROM base AS mock
USER backend

