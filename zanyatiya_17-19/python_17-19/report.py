# Занятие 19: чтение CSV и краткий отчёт
import csv

def load(path):
    rows = []
    with open(path, encoding="utf-8") as f:
        for line_no, row in enumerate(csv.DictReader(f), start=2):
            try:
                rows.append({"name": row["имя"], "score": int(row["балл"])})
            except (KeyError, ValueError):
                print(f"Строка {line_no}: некорректные данные, пропущена.")
    return rows

rows = load("students.csv")

if not rows:
    print("Корректных данных не найдено.")
else:
    scores = [r["score"] for r in rows]
    print("Количество учеников:", len(scores))
    print("Сумма баллов:", sum(scores))
    print("Средний балл:", round(sum(scores) / len(scores), 2))
