const tabs = document.querySelectorAll(".tab");
const projects = document.querySelectorAll(".project");
const projectLinks = document.querySelectorAll("[data-kind-link]");
const copyButtons = document.querySelectorAll("[data-copy]");

function setProjectFilter(kind) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.filter === kind;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  projects.forEach((project) => {
    project.hidden = project.dataset.kind !== kind;
  });

  projectLinks.forEach((link) => {
    link.hidden = link.dataset.kindLink !== kind;
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
