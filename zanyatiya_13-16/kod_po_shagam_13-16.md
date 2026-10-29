# Код по шагам: занятия 13–16

Каждый шаг можно копировать целиком. После каждого шага сохраните файл (Ctrl+S), обновите страницу (F5) и выполните проверку.

---

## Занятие 13. Калькулятор

### Шаг 1. Страница index.html

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Калькулятор</title>
</head>
<body>
  <h1>Калькулятор стоимости курса</h1>
  <label>Цена, руб. <input type="number" id="price" value="1200"></label>
  <br>
  <label>Количество занятий <input type="number" id="count" value="3"></label>
  <br>
  <button id="calc">Посчитать</button>
  <p id="out">Результат появится здесь.</p>
  <script src="script.js"></script>
</body>
</html>
```

**Проверка:** страница открывается, видны два поля и кнопка.

### Шаг 2. Консоль (F12)

Введите в консоли:

```js
let price = 1200;
const rate = 10;
let total = price * 3;
console.log(total);
```

**Проверка:** консоль выводит 3600. Попытка `rate = 20;` даёт ошибку, потому что `rate` объявлена через `const`.

### Шаг 3. Файл script.js

```js
const priceInput = document.getElementById("price");
const countInput = document.getElementById("count");
const button = document.getElementById("calc");
const out = document.getElementById("out");

button.addEventListener("click", () => {
  const price = Number(priceInput.value);
  const count = Number(countInput.value);
  const total = price * count;
  const withDiscount = total - (total * 10) / 100;
  console.log("Итого:", total);
  out.textContent = `Итого: ${total} руб., со скидкой 10%: ${withDiscount} руб.`;
});
```

**Проверка:** при нажатии «Посчитать» в абзаце появляется «Итого: 3600 руб., со скидкой 10%: 3240 руб.».

---

## Занятие 14. Проверка ответа

### Шаг 1. Страница index.html

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Проверка ответа</title>
</head>
<body>
  <h1>Сколько будет 6 × 7?</h1>
  <input type="text" id="answer" placeholder="Ваш ответ">
  <button id="check">Проверить</button>
  <p id="message"></p>
  <script src="script.js"></script>
</body>
</html>
```

### Шаг 2. Файл script.js

```js
const input = document.getElementById("answer");
const button = document.getElementById("check");
const message = document.getElementById("message");

button.addEventListener("click", () => {
  const value = input.value.trim();
  if (value === "") {
    message.textContent = "Введите ответ";
  } else if (Number(value) === 42) {
    message.textContent = "Верно!";
  } else {
    message.textContent = "Неверно, попробуйте ещё раз";
  }
});
```

**Проверка:** пустое поле даёт «Введите ответ», 42 даёт «Верно!», любое другое значение даёт «Неверно».

---

## Занятие 15. Генератор карточек

### Шаг 1. Страница index.html

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Карточки</title>
</head>
<body>
  <h1>Карточки</h1>
  <input type="text" id="filter" placeholder="Фильтр по названию">
  <div id="container"></div>
  <script src="script.js"></script>
</body>
</html>
```

### Шаг 2. Массив данных и первая отрисовка

```js
const cards = [
  { title: "HTML", text: "Структура страницы" },
  { title: "CSS", text: "Оформление" },
  { title: "JavaScript", text: "Поведение страницы" },
  { title: "Python", text: "Программы и данные" },
  { title: "ИИ", text: "Помощник в работе" }
];

const container = document.getElementById("container");

for (const card of cards) {
  const div = document.createElement("div");
  const h = document.createElement("h3");
  const p = document.createElement("p");
  h.textContent = card.title;
  p.textContent = card.text;
  div.appendChild(h);
  div.appendChild(p);
  container.appendChild(div);
}
```

**Проверка:** на странице появились пять карточек.

### Шаг 3. Вынести отрисовку в функцию и добавить фильтр

Замените содержимое script.js целиком:

```js
const cards = [
  { title: "HTML", text: "Структура страницы" },
  { title: "CSS", text: "Оформление" },
  { title: "JavaScript", text: "Поведение страницы" },
  { title: "Python", text: "Программы и данные" },
  { title: "ИИ", text: "Помощник в работе" }
];

const container = document.getElementById("container");
const filterInput = document.getElementById("filter");

function render(list) {
  container.textContent = "";
  for (const card of list) {
    const div = document.createElement("div");
    const h = document.createElement("h3");
    const p = document.createElement("p");
    h.textContent = card.title;
    p.textContent = card.text;
    div.appendChild(h);
    div.appendChild(p);
    container.appendChild(div);
  }
}

render(cards);

filterInput.addEventListener("input", (e) => {
  const word = e.target.value.trim().toLowerCase();
  render(cards.filter((card) => card.title.toLowerCase().includes(word)));
});
```

**Проверка:** при вводе «css» остаётся одна карточка, при пустом поле возвращаются все пять.

---

## Занятие 16. Мини-викторина

### Шаг 1. Страница index.html

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Мини-викторина</title>
</head>
<body>
  <h1>Мини-викторина</h1>
  <p id="progress"></p>
  <h2 id="question"></h2>
  <div id="options"></div>
  <button id="answerBtn">Ответить</button>
  <button id="nextBtn" disabled>Далее</button>
  <p id="feedback"></p>
  <p id="result"></p>
  <script src="script.js"></script>
</body>
</html>
```

### Шаг 2. Вопросы и состояние

```js
const questions = [
  { q: "Какой тег задаёт заголовок h1?", options: ["<p>", "<h1>", "<div>"], answer: 1 },
  { q: "Какое свойство меняет цвет текста?", options: ["background", "color", "margin"], answer: 1 },
  { q: "Какой метод добавляет обработчик события?", options: ["addEventListener", "getElementById", "createElement"], answer: 0 }
];

let current = 0;
let score = 0;
let answered = false;
let selected = null;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const answerBtn = document.getElementById("answerBtn");
const nextBtn = document.getElementById("nextBtn");
const feedbackEl = document.getElementById("feedback");
const progressEl = document.getElementById("progress");
const resultEl = document.getElementById("result");
```

### Шаг 3. Показ вопроса

Добавьте в конец script.js:

```js
function showQuestion() {
  const item = questions[current];
  answered = false;
  selected = null;

  progressEl.textContent = `Вопрос ${current + 1} из ${questions.length}`;
  questionEl.textContent = item.q;
  optionsEl.textContent = "";

  item.options.forEach((text, index) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "option";
    radio.addEventListener("change", () => {
      selected = index;
    });
    label.appendChild(radio);
    label.append(" " + text);
    optionsEl.appendChild(label);
  });

  feedbackEl.textContent = "";
  answerBtn.disabled = false;
  nextBtn.disabled = true;
}
```

### Шаг 4. Проверка ответа

```js
function checkAnswer() {
  if (answered) return;

  if (selected === null) {
    feedbackEl.textContent = "Выберите вариант.";
    return;
  }

  answered = true;
  const item = questions[current];

  if (selected === item.answer) {
    score += 1;
    feedbackEl.textContent = "Верно!";
  } else {
    feedbackEl.textContent = `Неверно. Правильный ответ: ${item.options[item.answer]}`;
  }

  answerBtn.disabled = true;
  nextBtn.disabled = false;
}
```

### Шаг 5. Переход и итог

```js
function nextQuestion() {
  if (!answered) return;
  current += 1;

  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionEl.textContent = "Викторина завершена";
  optionsEl.textContent = "";
  feedbackEl.textContent = "";
  progressEl.textContent = "";
  resultEl.textContent = `Ваш результат: ${score} из ${questions.length}`;
  answerBtn.disabled = true;
  nextBtn.disabled = true;
}

answerBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", nextQuestion);

showQuestion();
```

**Проверка:**

1. Нажатие «Ответить» без выбора выводит «Выберите вариант».
2. Повторное нажатие «Ответить» после ответа ничего не меняет: счёт не растёт дважды.
3. После последнего вопроса появляется итог «Ваш результат: N из 3».
4. Если все ответы неверные, итог «Ваш результат: 0 из 3» выводится без ошибки.

---

## Частые ошибки

Если вопросы не появляются, проверьте, что в index.html есть элемент с нужным id и `<script src="script.js">` стоит перед закрывающим `</body>`. Если в консоли написано `Cannot read properties of null`, id в HTML и в JavaScript не совпадают. Если после последнего вопроса ошибка «undefined», проверьте, что `nextQuestion` проверяет `current < questions.length` до показа вопроса.
