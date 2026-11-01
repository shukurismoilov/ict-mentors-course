# Занятие 18: консольная викторина с условиями, циклом и функцией

questions = [
    {"q": "Какой тег задаёт заголовок h1?", "options": ["<p>", "<h1>", "<div>"], "answer": 2},
    {"q": "Чему равно 2 + 2 * 2?", "options": ["6", "8", "4"], "answer": 1},
    {"q": "Какая функция получает текст от пользователя?", "options": ["print", "input", "len"], "answer": 2},
]

def ask_choice(prompt, count):
    """Возвращает корректный номер варианта. Ошибочный ввод повторяется."""
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

# Словарь и список словарей
students = [
    {"name": "Анна", "score": 5},
    {"name": "Бобожон", "score": 4},
]
for s in students:
    print(s["name"], "—", s["score"])
