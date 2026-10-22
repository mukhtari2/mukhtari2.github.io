// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

// Theme toggle (remembers choice, falls back to system preference)
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function getSavedTheme() {
  try { return localStorage.getItem("theme"); } catch (e) { return null; }
}
function saveTheme(value) {
  try { localStorage.setItem("theme", value); } catch (e) { /* ignore */ }
}

const initialTheme =
  getSavedTheme() ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
root.setAttribute("data-theme", initialTheme);

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  saveTheme(next);
});

// Typing effect
const typedEl = document.getElementById("typed");
const phrases = [
  "",
  " | Java & Spring Boot",
  " | Python & FastAPI",
  " | React & Tailwind CSS",
];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function type() {
  const phrase = phrases[phraseIndex];
  typedEl.textContent = phrase.slice(0, charIndex);

  if (!deleting && charIndex < phrase.length) {
    charIndex++;
    setTimeout(type, 80);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1600);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(type, 40);
  } else {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(type, 300);
  }
}
if (!reduceMotion) type();

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

// Highlight active nav link
const sections = document.querySelectorAll("main section[id]");
const links = navLinks.querySelectorAll("a[href^='#']");
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((l) =>
          l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id)
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => spy.observe(s));

// Copy email
const copyBtn = document.getElementById("copyEmail");
copyBtn.addEventListener("click", async () => {
  const email = "mukhtarisule@gmail.com";
  try {
    await navigator.clipboard.writeText(email);
    copyBtn.textContent = "Copied!";
  } catch (e) {
    copyBtn.textContent = email;
  }
  setTimeout(() => (copyBtn.textContent = "Copy email address"), 2000);
});
