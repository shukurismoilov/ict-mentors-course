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
    const div = document.createElement("article");
    div.className = "card";
    const heading = document.createElement("h3");
    const description = document.createElement("p");
    heading.textContent = card.title;
    description.textContent = card.text;
    div.appendChild(heading);
    div.appendChild(description);
    container.appendChild(div);
  }
}

render(cards);

filterInput.addEventListener("input", () => {
  const query = filterInput.value.trim().toLocaleLowerCase("ru");
  const filteredCards = cards.filter((card) =>
    card.title.toLocaleLowerCase("ru").includes(query)
  );
  render(filteredCards);
});
