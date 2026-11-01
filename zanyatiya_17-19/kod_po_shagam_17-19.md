# Код по шагам: занятия 17–19 (Python)

Перед началом: установлен Python 3 с галочкой «Add python.exe to PATH». Проверка в cmd: `python --version`. Работайте в папке zanyatie17 (или любой другой). Файлы calc.py, quiz.py, report.py и students.csv лежат в архиве python_17-19.

---

## Занятие 17. Консольный калькулятор

### Шаг 1. Первый вывод

Создайте файл calc.py и напишите:

```python
print("Консольный калькулятор")
```

Запуск в cmd: `python calc.py`. **Проверка:** появилась строка «Консольный калькулятор».

### Шаг 2. Ввод и числа

```python
price = float(input("Цена товара: "))
count = int(input("Количество: "))
```

`input()` всегда возвращает строку. `float()` и `int()` превращают её в число. **Проверка:** введите 1200 и 3, программа работает без ошибок.

### Шаг 3. Расчёт

```python
total = price * count
print("Итого:", total)
```

**Проверка:** при вводе 1200 и 3 выводится 3600.0. Число с точкой — это тип float.

### Шаг 4. Скидка и полный код

```python
print("Консольный калькулятор")
price = float(input("Цена товара: "))
count = int(input("Количество: "))
discount = float(input("Скидка, %: "))

total = price * count
final = total - total * discount / 100

print("Итого:", total)
print("Со скидкой:", round(final, 2))
```

**Проверка:** цена 1200, количество 3, скидка 10 → «Со скидкой: 3240.0».

**Задание:** введите слово вместо числа и запишите сообщение об ошибке ValueError.

---

## Занятие 18. Викторина: условия, цикл, функция

### Шаг 1. Условие

```python
answer = int(input("Введите 1, 2 или 3: "))
if answer == 2:
    print("Верно!")
else:
    print("Неверно.")
```

### Шаг 2. Ввод с проверкой (функция и цикл while)

```python
def ask_choice(prompt, count):
    while True:
        text = input(prompt)
        try:
            choice = int(text)
        except ValueError:
            print("Ошибка: введите целое число.")
            continue
        if 1 <= choice <= count:
            return choice
        print(f"Ошибка: введите число от 1 до {count}.")

print(ask_choice("Ваш ответ: ", 3))
```

**Проверка:** введите «abc», затем 7, затем 2. Программа дважды выводит ошибку и возвращает 2.

### Шаг 3. Список словарей с вопросами

```python
questions = [
    {"q": "Какой тег задаёт заголовок h1?", "options": ["<p>", "<h1>", "<div>"], "answer": 2},
    {"q": "Чему равно 2 + 2 * 2?", "options": ["6", "8", "4"], "answer": 1},
]
```

`questions[0]["q"]` — текст первого вопроса. `answer` — номер правильного варианта с нуля.

### Шаг 4. Цикл по вопросам и счёт

```python
score = 0
for number, item in enumerate(questions, start=1):
    print(f"\nВопрос {number}: {item['q']}")
    for index, option in enumerate(item["options"], start=1):
        print(f"  {index}. {option}")
    choice = ask_choice("Ваш ответ: ", len(item["options"]))
    if choice - 1 == item["answer"]:
        print("Верно!")
        score += 1
    else:
        print("Неверно.")

print(f"\nРезультат: {score} из {len(questions)}")
```

Полный файл quiz.py из архива содержит все шаги.

**Проверка:** пройдите викторину, введя сначала ошибочный ввод, затем правильные ответы. Итог должен совпадать с числом верных ответов.

---

## Занятие 19. Отчёт по CSV

### Шаг 1. Файл students.csv

```
имя,балл
Анна,5
Бобоҷон,4
Светлана,5
Фарҳод,нет
Дилшод,3
```

Строка «Фарҳод,нет» намеренно содержит ошибку: балл не число.

### Шаг 2. Чтение CSV

```python
import csv

with open("students.csv", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        print(row["имя"], row["балл"])
```

`DictReader` читает каждую строку как словарь, ключи — заголовки таблицы.

### Шаг 3. Безопасная загрузка

```python
def load(path):
    rows = []
    with open(path, encoding="utf-8") as f:
        for line_no, row in enumerate(csv.DictReader(f), start=2):
            try:
                rows.append({"name": row["имя"], "score": int(row["балл"])})
            except (KeyError, ValueError):
                print(f"Строка {line_no}: некорректные данные, пропущена.")
    return rows
```

**Проверка:** программа выводит сообщение о строке 5 и продолжает работу.

### Шаг 4. Отчёт

```python
rows = load("students.csv")
if not rows:
    print("Корректных данных не найдено.")
else:
    scores = [r["score"] for r in rows]
    print("Количество учеников:", len(scores))
    print("Сумма баллов:", sum(scores))
    print("Средний балл:", round(sum(scores) / len(scores), 2))
```

**Ожидаемый результат:** количество 4, сумма 17, средний балл 4.25.

---

## Частые ошибки

- `ValueError: invalid literal for int()` — введён текст вместо числа; оберните `int()` в try.
- `FileNotFoundError` — students.csv лежит в другой папке; запускайте cmd из папки с файлом.
- `'python' не является внутренней командой` — Python установлен без галочки PATH.
- Кракозябры в cmd при кириллице — выполните `chcp 65001` перед запуском.
