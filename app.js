const revealItems = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".site-nav a");
const sections = [...document.querySelectorAll("main section[id]")];

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.18
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const updateActiveLink = () => {
  let currentSection = null;

  for (let index = sections.length - 1; index >= 0; index -= 1) {
    const section = sections[index];

    if (section.getBoundingClientRect().top <= 180) {
      currentSection = section;
      break;
    }
  }

  navLinks.forEach((link) => {
    const isActive = currentSection && link.getAttribute("href") === `#${currentSection.id}`;
    link.classList.toggle("is-active", Boolean(isActive));
  });
};

window.addEventListener("scroll", updateActiveLink, { passive: true });
window.addEventListener("load", updateActiveLink);

