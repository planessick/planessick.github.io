const tabs = document.querySelectorAll(".tab");
const projects = document.querySelectorAll(".project");
const copyButtons = document.querySelectorAll("[data-copy]");
const themeToggle = document.querySelector(".theme-toggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("is-dark");
}

function setProjectFilter(kind) {
  const tabsContainer = document.querySelector(".tabs");

  if (tabsContainer) {
    tabsContainer.dataset.active = kind;
  }

  tabs.forEach((tab) => {
    const isActive = tab.dataset.filter === kind;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  projects.forEach((project) => {
    project.hidden = project.dataset.kind !== kind;
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setProjectFilter(tab.dataset.filter));
});

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    const originalText = button.textContent;

    try {
      await navigator.clipboard.writeText(value);
      button.textContent = "Email copied";
      window.setTimeout(() => {
        button.textContent = originalText;
      }, 1600);
    } catch {
      window.location.href = `mailto:${value}`;
    }
  });
});

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("is-dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("is-dark") ? "dark" : "light",
    );
  });
}
