const searchInput = document.querySelector("#lesson-search");
const lessonCards = [...document.querySelectorAll("[data-lesson]")];
const filterButtons = [...document.querySelectorAll(".filter-button")];
const emptyState = document.querySelector("#empty-state");
const resultsStatus = document.querySelector("#results-status");
const clearSearchButton = document.querySelector("#clear-search");

let activeFilter = "all";

function updateLessons() {
  const query = searchInput.value.trim().toLocaleLowerCase("ru");
  let visibleCount = 0;

  lessonCards.forEach((card) => {
    const matchesSearch = card.dataset.title.includes(query);
    const links = [...card.querySelectorAll(".resource-link")];
    let hasVisibleLink = false;

    links.forEach((link) => {
      const matchesFilter = activeFilter === "all" || link.dataset.type === activeFilter;
      link.hidden = !matchesFilter;
      hasVisibleLink ||= matchesFilter;
    });

    const isVisible = matchesSearch && hasVisibleLink;
    card.hidden = !isVisible;

    if (isVisible) {
      visibleCount += 1;
    }
  });

  emptyState.hidden = visibleCount > 0;
  resultsStatus.textContent = `Показано занятий: ${visibleCount} из ${lessonCards.length}`;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    updateLessons();
  });
});

searchInput.addEventListener("input", updateLessons);

clearSearchButton.addEventListener("click", () => {
  searchInput.value = "";
  activeFilter = "all";

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === "all";
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  updateLessons();
  searchInput.focus();
});

document.addEventListener("keydown", (event) => {
  const target = event.target;
  const isTyping = target instanceof HTMLElement
    && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

  if (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey && !isTyping) {
    event.preventDefault();
    searchInput.focus();
  }

  if (event.key === "Escape" && target === searchInput && searchInput.value) {
    searchInput.value = "";
    updateLessons();
  }
});

updateLessons();