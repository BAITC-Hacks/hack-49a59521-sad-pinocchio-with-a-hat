# HackAlem AI — протоколирование совещаний

Backend хакатонного MVP: загрузка аудио/видео → транскрипт → метки говорящих →
поручения, решения и краткое содержание → PDF/DOCX. Frontend и авторизация не входят
в проект. Интерактивная документация доступна по адресу http://localhost:8000/docs.

## Быстрый запуск

Нужен работающий Docker Engine / Docker Desktop с Linux-контейнерами.

```bash
docker compose up --build
```

По умолчанию все провайдеры работают в mock-режиме; ключи и модели не нужны.
Первичная сборка скачивает образ, зависимости и Unicode-шрифт. Уже собранный mock-образ
работает без внешних API. Данные сохраняются в volumes `uploads` и `results`.
Проверка готовности: `GET /health`; порт по умолчанию открыт только на `127.0.0.1`.

```bash
curl -X POST http://localhost:8000/api/demo/meeting
```

Ответ содержит **готовое** совещание со статусом `completed`, ID, транскриптом и пятью
поручениями. Demo всегда использует mock, даже если в окружении выбран `api` или `local`.
При ошибке генерации документов возвращается HTTP 500 и сохранённый статус `failed`.

Явный запуск без внешних API, Bash:

```bash
STT_PROVIDER=mock AI_PROVIDER=mock DIARIZATION_PROVIDER=mock docker compose up --build
```

PowerShell:

```powershell
$env:STT_PROVIDER = "mock"
$env:AI_PROVIDER = "mock"
$env:DIARIZATION_PROVIDER = "mock"
docker compose up --build
```

Локальный запуск Python 3.11+ с [uv](https://docs.astral.sh/uv/):

```bash
uv sync --frozen --extra test
uv run uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Без uv:

```bash
python -m venv .venv
# Linux/macOS: source .venv/bin/activate
# PowerShell: .venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

## Архитектура и файлы

```text
.
├── app/
│   ├── __init__.py
│   ├── main.py          # ASGI entrypoint
│   ├── config.py        # Настройки окружения, защита local
│   ├── models.py        # Pydantic-схемы и проверка ссылок
│   ├── storage.py       # SQLite, транзакции, статусы
│   ├── api.py           # REST, multipart, PATCH, demo
│   ├── pipeline.py      # Фоновая последовательная обработка
│   ├── stt.py           # Mock / API / faster-whisper
│   ├── diarization.py   # Mock / локальный fallback
│   ├── analysis.py      # Mock / AI API, повтор невалидного ответа
│   ├── export.py        # Unicode PDF и DOCX
│   ├── demo.py          # Детерминированный RU/KK сценарий
│   └── errors.py        # Безопасные сообщения об ошибках
├── tests/
│   ├── conftest.py
│   ├── test_api.py
│   ├── test_providers.py
│   └── test_storage.py
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env.example
├── .gitignore
├── pyproject.toml
├── uv.lock
├── requirements.txt
├── requirements-local.txt
└── README.md
```

FastAPI принимает запрос, SQLite атомарно переводит `uploaded/failed → processing`,
затем `BackgroundTasks` запускает pipeline. STT, диаризация и анализ имеют независимые
интерфейсы. Схема и ссылки на исходные сегменты проверяются перед сохранением результата.
После подготовки обоих документов устанавливается `completed`; исключение даёт `failed`
с понятной ошибкой. Одновременный повтор `process` отклоняется с HTTP 409.

Один процесс Uvicorn и один исполняемый pipeline: остальные задачи ждут в памяти.
При перезапуске оставшиеся `processing` переводятся в `failed`, их можно запустить снова.
Не используйте несколько workers/реплик с общим хранилищем в этом MVP.

Хранение на диске:

```text
storage/                       # /data внутри контейнера
├── uploads/<UUID>/<safe-name>  # Исходный файл
└── results/
    ├── meetings.sqlite3       # Метаданные и результаты в JSON
    └── <UUID>/minutes.{pdf,docx}
```

SQLite обновляется транзакционно. Файлы документов при первой обработке записываются
через временный файл и атомарную замену. Скачивание каждый раз строит документ из
актуального снимка SQLite: PATCH сразу отражается в PDF/DOCX. Первоначальные файлы
в `results/<UUID>` являются снимком обработки, а не источником актуальных правок.

## Настройки

Скопируйте `.env.example` в `.env` и заполните нужные значения. `.env` исключён из Git
и Docker build context. Переменные shell имеют приоритет. В Docker хранилище фиксировано
в `/data`, а каталог моделей — `/models`; `STORAGE_DIR` из `.env` применяется при запуске Python.

| Переменная | Значение по умолчанию | Назначение |
|---|---|---|
| `STT_PROVIDER` | `mock` | `mock`, `api`, `local` |
| `AI_PROVIDER` | `mock` | `mock`, `api` |
| `DIARIZATION_PROVIDER` | `mock` | `mock`, `local` |
| `STT_API_URL`, `STT_API_KEY`, `STT_MODEL` | пусто | Endpoint, ключ и модель STT |
| `AI_API_URL`, `AI_API_KEY`, `AI_MODEL` | пусто | Endpoint, ключ и модель анализа |
| `WHISPER_MODEL` | `small` | Имя кешированной модели или путь к каталогу |
| `WHISPER_DEVICE` | `cpu` | Устройство Whisper |
| `WHISPER_COMPUTE_TYPE` | `int8` | Тип вычислений |
| `WHISPER_DOWNLOAD_ROOT` | `./models` | Каталог заранее скачанных моделей |
| `MAX_UPLOAD_SIZE_MB` | `500` | Предел файла, MiB (1024² байт) |
| `STORAGE_DIR` | `./storage` | Хранилище при запуске Python |
| `PDF_FONT_PATH` | автоопределение | Unicode TTF; в Docker DejaVu Sans |
| `API_TIMEOUT_SECONDS` | `180` | Таймаут HTTP API |

### API-режим

Поддерживается совместимый HTTP-контракт: multipart transcription endpoint для STT
и chat completions endpoint с JSON response mode для анализа. URL указываются **полностью**;
суффиксы автоматически не дописываются. Выберите провайдера, поддерживающего эти форматы.

```env
STT_PROVIDER=api
STT_API_URL=https://your-provider.example/v1/audio/transcriptions
STT_API_KEY=your-secret
STT_MODEL=your-transcription-model
AI_PROVIDER=api
AI_API_URL=https://your-provider.example/v1/chat/completions
AI_API_KEY=your-secret
AI_MODEL=your-analysis-model
DIARIZATION_PROVIDER=mock
```

STT должен принимать `file`, `model`, `response_format=verbose_json`,
`timestamp_granularities[]=segment` и возвращать `language` и
`segments: [{start, end, text}]`. Text-only ответ без временных меток отклоняется.
AI должен принимать `model`, `messages`, `temperature`, `response_format` и возвращать
JSON-строку в `choices[0].message.content`. Ключ передаётся как Bearer; пустой ключ
допустим для совместимого сервера без авторизации. Редиректы HTTP не выполняются.

Невалидный JSON, схема или неизвестные ссылки вызывают ровно одну попытку исправления.
Вторая неудача переводит совещание в `failed`. HTTP-ошибки и таймауты не маскируются mock-ответом.
Содержимое ответов провайдера, ключи и транскрипты не включаются в сообщения об ошибках.

В API-режиме файл/текст передаётся настроенному серверу. Локальный совместимый LLM можно
использовать через этот контракт, но он остаётся явно выбранным `AI_PROVIDER=api`.

### Local Whisper и закрытый контур

**`STT_PROVIDER=local` предназначен для закрытого контура: backend не отправляет аудио
или текст во внешние сервисы.** Сочетание `STT_PROVIDER=local` и `AI_PROVIDER=api`
запрещено валидацией конфигурации. Автоматическая загрузка модели отключена
(`local_files_only=True`); в Docker также включены offline-переменные Hugging Face.
Модель и образ нужно подготовить до переноса в закрытый контур. Перед загрузкой движка
backend требует `model.bin`, `config.json` и `tokenizer.json`, чтобы исключить скрытое
скачивание отсутствующего токенизатора библиотекой.

На машине с интернетом отдельно установите локальные зависимости и загрузите модель
(эта подготовительная команда сама обращается к Hugging Face, но не передаёт записи):

```bash
uv sync --frozen --extra local --extra test
uv run --extra local python -c "from huggingface_hub import snapshot_download; snapshot_download('Systran/faster-whisper-small', local_dir='models/whisper-small')"
```

Перенесите весь каталог `models/whisper-small` и собранный образ в закрытый контур.
Укажите в `.env`:

```env
STT_PROVIDER=local
AI_PROVIDER=mock
DIARIZATION_PROVIDER=local
WHISPER_MODEL=/models/whisper-small
WHISPER_DEVICE=cpu
WHISPER_COMPUTE_TYPE=int8
```

```bash
STT_PROVIDER=local docker compose --profile local up --build
```

В PowerShell задайте `$env:STT_PROVIDER = "local"`, затем выполните ту же команду
`docker compose --profile local up --build`. Backend остаётся единственным сервисом;
Docker target выбирается через `STT_PROVIDER`. Флаг `--profile local` совместим с этой
командой и не запускает второй backend. Для Python вне Docker задайте
`WHISPER_MODEL=./models/whisper-small` и запустите `uv run --extra local uvicorn app.main:app`.

Если оставить `WHISPER_MODEL=small`, модель ищется в заранее заполненном кеше
`WHISPER_DOWNLOAD_ROOT`. Если её нет, обработка завершится `failed` с инструкцией,
без скачивания или подмены результата. Для CPU используйте multilingual-модель,
не вариант `.en`. GPU-образ и проброс GPU в этом MVP не настроены.

`LocalDiarizationProvider` — **явный fallback с одним говорящим**, без распознавания
голосов. Mock-диаризация сохраняет метки fixture/STT и тоже не разделяет реальное аудио.
Каждое ограничение записывается в `warnings` и экспорт. Для реальной диаризации
нужно подключить отдельную предварительно загруженную модель через существующий интерфейс.

Mock AI использует несколько прозрачных RU/KK правил; это демонстрация и не полноценный
семантический анализ произвольных встреч. В local-режиме STT реальный, а анализ остаётся mock.

## REST API

| Метод и путь | Результат |
|---|---|
| `POST /api/meetings/upload` | `201`: ID, `uploaded`, безопасное имя |
| `POST /api/meetings/{id}/process` | `202`: `processing` |
| `GET /api/meetings/{id}/status` | ID, статус, ошибка |
| `GET /api/meetings/{id}` | Полное совещание, в том числе промежуточный статус |
| `GET /api/meetings/{id}/transcript` | Транскрипт готового совещания |
| `PATCH /api/meetings/{id}/tasks/{task_id}` | Обновлённое поручение |
| `PATCH /api/meetings/{id}/speakers/{speaker_id}` | Говорящий со своим стабильным ID и новым именем |
| `GET /api/meetings/{id}/export/pdf` | PDF |
| `GET /api/meetings/{id}/export/docx` | DOCX |
| `POST /api/demo/meeting` | Готовое демонстрационное совещание |
| `GET /health` | Проверка приложения и SQLite |

В multipart обязательное поле `file`; необязательные поля `title`, `meeting_date=YYYY-MM-DD`.
Для правильных относительных сроков передавайте фактическую дату совещания. По умолчанию
используется дата сервера (в Docker обычно UTC). Поддерживаются MP3, WAV, M4A, MP4, WebM,
OGG, FLAC, MPEG, MOV; MIME должен соответствовать расширению. Например, WAV — `audio/wav`,
MP3 — `audio/mpeg`, MP4 — `video/mp4`. Generic `application/octet-stream` отклоняется.
Имя очищается от пути/опасных символов, получает префикс `upload_`, файл хранится под UUID.

Ошибки: `400` пустой файл, `413` превышение размера, `415` формат/MIME,
`422` неверный JSON/UUID/дата/поля, `404` неизвестный ID, `409` результат не готов или
повторный process. Ошибка фонового pipeline читается через `status.error`; сам `process`
означает принятие задачи, а не успешное окончание.

PATCH поручения принимает `assignee`, `assignee_name`, `deadline`, `title`, `description`,
`priority`, `status`. Неизвестные поля запрещены. `null` очищает ответственного, имя или срок;
`title`, `description`, `priority`, `status` не могут быть null. Приоритет:
`low|normal|high|urgent`; статус: `open|in_progress|done|cancelled`.
`assignee` должен ссылаться на существующий speaker ID. Переименование говорящего не меняет
его ID и исходные ссылки, но обновляет отображаемое имя в назначенных ему поручениях.

## Примеры curl

В PowerShell используйте `curl.exe` вместо псевдонима `curl`. Замените `MEETING_ID` на
UUID из ответа; запросы ниже записаны для Bash.

```bash
curl -X POST http://localhost:8000/api/meetings/upload \
  -F 'file=@meeting.mp3;type=audio/mpeg' \
  -F 'title=Рабочее совещание' -F 'meeting_date=2026-09-23'

curl -X POST http://localhost:8000/api/meetings/MEETING_ID/process
curl http://localhost:8000/api/meetings/MEETING_ID/status
curl http://localhost:8000/api/meetings/MEETING_ID
curl http://localhost:8000/api/meetings/MEETING_ID/transcript

curl -X PATCH http://localhost:8000/api/meetings/MEETING_ID/tasks/task-1 \
  -H 'Content-Type: application/json' \
  -d '{"status":"in_progress","deadline":"2026-09-30","priority":"high"}'

curl -X PATCH http://localhost:8000/api/meetings/MEETING_ID/speakers/speaker_2 \
  -H 'Content-Type: application/json' -d '{"name":"Әлия"}'

curl -o minutes.pdf http://localhost:8000/api/meetings/MEETING_ID/export/pdf
curl -o minutes.docx http://localhost:8000/api/meetings/MEETING_ID/export/docx
```

## Формат результата

`GET /api/meetings/{id}` возвращает `meeting_id`, `title`, `date`, `filename`, `status`,
`duration` (секунды до конца последней реплики), `language`, `speakers`, `transcript`,
`summary`, `decisions`, `unresolved_questions`, `tasks`, `error`, `warnings`, `providers`.
Транскрипт:

```json
{
  "language": "mixed",
  "segments": [
    {"id":"segment-1","speaker_id":"speaker_1","start":0.0,"end":4.2,"text":"Я подготовлю отчёт завтра."}
  ]
}
```

AI-результат валидируется отдельно перед включением в совещание:

```json
{
  "summary":"Участник принял поручение подготовить отчёт.",
  "decisions":[],
  "unresolved_questions":[],
  "tasks":[{
    "id":"task-1",
    "title":"Подготовить отчёт",
    "description":"Подготовить отчёт к следующему дню.",
    "assignee":"speaker_1",
    "assignee_name":null,
    "deadline":"2026-09-24",
    "priority":"normal",
    "status":"open",
    "source_segment_ids":["segment-1"],
    "confidence":0.86
  }]
}
```

ID сегментов/поручений уникальны в рамках встречи, временные интервалы неотрицательны,
`end >= start`, confidence в `[0, 1]`, ссылки задач должны существовать в транскрипте.
`завтра`/`ертең` означает +1 день; `до пятницы` — ближайшую пятницу, включая текущую;
`на следующей неделе` — следующий понедельник. Это явно выбранная политика неоднозначных
сроков, она также передаётся AI в prompt.

PDF использует встроенный Unicode TTF, таблицу с повторяемым заголовком и номера страниц.
DOCX использует DejaVu Sans (желательно установить у получателя, иначе Word выберет замену).
Оба формата содержат полный транскрипт, говорящих, временные метки, источники поручений,
сроки, статусы, приоритеты и ограничения применённых провайдеров.

## Сценарий демонстрации

1. Поднимите backend и откройте `/docs`.
2. Выполните `POST /api/demo/meeting`; сохраните UUID.
3. Покажите смешанный транскрипт и трёх говорящих.
4. Покажите пять поручений: абсолютная дата 30 сентября, «завтра»/«ертең»,
   «до пятницы», неизвестный срок и неизвестный ответственный.
5. Переименуйте `speaker_2` в «Әлия», измените статус первого поручения.
6. Скачайте PDF и DOCX: в них уже будут внесённые правки.
7. Загрузите небольшой файл в mock-режиме и покажите переход `uploaded → processing → completed`.
   Объясните, что mock STT использует фиксированный пример, а не содержимое записи.

Дата demo фиксирована: **2026-09-23**, чтобы показ был воспроизводимым.

## Тесты и воспроизводимость

```bash
uv sync --frozen --extra test
uv run --extra test pytest -q
uv run --extra test ruff check app tests
uv run --extra test ruff format --check app tests
```

Без uv установите `python -m pip install pytest pypdf ruff` после основных зависимостей,
затем `python -m pytest -q`. На Windows после настройки окружения также можно запускать
`.venv\Scripts\python.exe -m pytest -q`.

Тесты не требуют реальных API, модели или GPU. Проверяются upload и его ограничения,
статусы/повторный запуск, атомарность claim, восстановление после перезапуска,
demo, RU/KK правила, валидация JSON/ссылок, PATCH, Unicode PDF/DOCX, переключение
провайдеров, запрет внешних API в local, исправление AI JSON и корректная ошибка после
второго невалидного ответа. Локальный движок в тесте заменяется заглушкой;
это проверка контракта и offline-настроек, не качества распознавания.

`uv.lock` фиксирует версии. Docker использует экспортированные requirements с SHA-256.
После осознанного изменения зависимостей обновите lock и оба экспорта:

```bash
uv lock
uv export --frozen --no-dev --no-emit-project -o requirements.txt
uv export --frozen --no-dev --extra local --no-emit-project -o requirements-local.txt
```

Проверка в среде разработки (Windows, Python 3.12): **41 тест пройден**, Ruff check и
проверка форматирования пройдены. Smoke-тест через реальный HTTP/Uvicorn проверил health,
demo, upload/process/status и скачивание обоих форматов. Обе страницы demo PDF
отрендерены и проверены визуально. DOCX проверен по структуре и Unicode-содержимому;
визуальная проверка не выполнена, поскольку LibreOffice отсутствует.
`docker compose config --quiet` и вариант с `--profile local` проходят;
сборка/запуск контейнера не проверены, поскольку Docker Engine не запущен.
Внешние API и реальный Whisper с весами не запускались. Pytest выводит одно предупреждение
Starlette о будущем переходе TestClient с httpx на httpx2; на результат тестов оно не влияет.

## Ограничения MVP и развитие

- Нет настоящей диаризации, локального LLM, авторизации и интеграций с платформами встреч.
- Mock AI распознаёт только ограниченные демонстрационные обороты; качество настоящего
  AI зависит от выбранной модели. Схема проверяет структуру, а не истинность выводов.
- Whisper использует multilingual-распознавание; точность казахского и переключения языков
  зависит от модели/записи. Поле `mixed` определяется простой эвристикой и не является
  полноценной классификацией языка каждого сегмента.
- Продолжительность — конец последней распознанной реплики, без завершающей тишины.
- Фоновые задачи не имеют долговечной очереди, отмены или автоматического возобновления.
  Один процесс; длительные записи на CPU могут обрабатываться долго.
- MIME и расширение проверяются, но контейнер медиа не декодируется при upload.
  Повреждённый файл в реальном STT должен завершиться `failed`; mock не проверяет содержимое.
  Multipart сначала попадает во временное хранилище Starlette; для публичного размещения
  нужно ограничение тела запроса и квоты диска на reverse proxy.
- Ограничение размера внешнего STT и контекстное окно AI зависят от сервера;
  разбиение длинных записей/транскриптов на части пока не реализовано.
- Healthcheck проверяет приложение и SQLite, но не готовность внешнего API или модели.
- Нет удаления встреч, квот, retention policy, API пагинации и списка встреч.

Следующие этапы: реальная offline-диаризация, локальный анализ с проверкой источников,
разбиение длинных встреч, оценка RU/KK качества на размеченном наборе, долговечная очередь
и администрирование хранения.

Реализация опирается на официальные интерфейсы
[FastAPI BackgroundTasks](https://fastapi.tiangolo.com/tutorial/background-tasks/),
[UploadFile](https://fastapi.tiangolo.com/tutorial/request-files/) и
[faster-whisper](https://github.com/SYSTRAN/faster-whisper).
