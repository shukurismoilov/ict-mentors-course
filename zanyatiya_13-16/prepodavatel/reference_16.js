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
    radio.value = String(index);
    radio.addEventListener("change", () => {
      selected = index;
    });
    label.appendChild(radio);
    label.append(` ${text}`);
    optionsEl.appendChild(label);
  });

  feedbackEl.textContent = "";
  resultEl.textContent = "";
  answerBtn.disabled = false;
  nextBtn.disabled = true;
}

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
