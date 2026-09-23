from copy import deepcopy

DEMO_DATE = "2026-09-23"
DEMO_SEGMENTS = [
    ("speaker_1", "Коллеги, сегодня обсуждаем запуск пилота. Решили начать с отдела закупок."),
    ("speaker_2", "Мен техникалық есепті 2026-09-30 дейін дайындаймын."),
    ("speaker_3", "Я подготовлю список участников завтра."),
    ("speaker_2", "Тест жоспарын ертең жіберемін, потом обсудим результаты."),
    ("speaker_1", "Я проверю требования безопасности, срок пока не определён."),
    ("speaker_1", "Нужно согласовать бюджет до пятницы. Ответственный пока не назначен."),
    ("speaker_3", "Какой бюджет выделяем на пилот? Этот вопрос пока открыт."),
    ("speaker_1", "Решили провести демонстрацию после проверки. Спасибо, рақмет!"),
]


def demo_transcript() -> dict:
    return deepcopy(
        {
            "language": "mixed",
            "segments": [
                {
                    "id": f"segment-{i + 1}",
                    "speaker_id": speaker,
                    "start": float(i * 8),
                    "end": float(i * 8 + 7),
                    "text": text,
                }
                for i, (speaker, text) in enumerate(DEMO_SEGMENTS)
            ],
        }
    )
