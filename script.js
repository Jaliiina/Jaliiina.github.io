const header = document.querySelector("[data-header]");
const navLinks = Array.from(document.querySelectorAll(".nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === `#${visible.target.id}`,
      );
    });
  },
  {
    rootMargin: "-35% 0px -50% 0px",
    threshold: [0.15, 0.35, 0.6],
  },
);

sections.forEach((section) => observer.observe(section));
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
