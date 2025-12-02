// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem("theme") || "dark";
if (currentTheme === "light") {
  body.classList.add("light-theme");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");

  // Save theme preference
  const theme = body.classList.contains("light-theme") ? "light" : "dark";
  localStorage.setItem("theme", theme);

  // Add rotation animation
  themeToggle.style.transform = "rotate(360deg)";
  setTimeout(() => {
    themeToggle.style.transform = "rotate(0deg)";
  }, 300);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add scroll animation to elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll(".description, .services").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.6s ease";
  observer.observe(el);
});

// Search button functionality (placeholder)
const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", () => {
  alert("Функция поиска будет добавлена в ближайшее время");
});

// Copy email on email icon click
const emailCopyBtn = document.getElementById("emailCopyBtn");
if (emailCopyBtn) {
  const emailToCopy = "deseara@nigga.cc";
  emailCopyBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(emailToCopy)
        .then(() => {
          alert("Почта скопирована: " + emailToCopy);
        })
        .catch(() => {
          alert("Не получилось скопировать. Почта: " + emailToCopy);
        });
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = emailToCopy;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        alert("Почта скопирована: " + emailToCopy);
      } catch (err) {
        alert("Не получилось скопировать. Почта: " + emailToCopy);
      }
      document.body.removeChild(textarea);
    }
  });
}

// GitHub projects from deseara
const projectsGrid = document.getElementById("projectsGrid");
if (projectsGrid) {
  fetch("https://api.github.com/users/Deseara/repos?per_page=12&sort=updated")
    .then((res) => res.json())
    .then((repos) => {
      if (!Array.isArray(repos) || repos.length === 0) {
        projectsGrid.innerHTML =
          '<p class="project-description">Пока нет публичных репозиториев или GitHub недоступен.</p>';
        return;
      }

      const fragment = document.createDocumentFragment();

      repos.forEach((repo) => {
        const card = document.createElement("article");
        card.className = "project-card";

        const title = document.createElement("h3");
        title.className = "project-title";
        title.textContent = repo.full_name || repo.name;

        const desc = document.createElement("p");
        desc.className = "project-description";
        desc.textContent = repo.description || "Нет описания";

        const link = document.createElement("a");
        link.className = "project-link";
        link.href = repo.html_url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Открыть на GitHub";

        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(link);

        fragment.appendChild(card);
      });

      projectsGrid.innerHTML = "";
      projectsGrid.appendChild(fragment);
    })
    .catch(() => {
      projectsGrid.innerHTML =
        '<p class="project-description">Не удалось загрузить проекты с GitHub.</p>';
    });
}

// Add rotation effect to logo on scroll
window.addEventListener("scroll", () => {
  const logo = document.querySelector(".main-logo");
  if (logo) {
    const scrolled = window.pageYOffset;
    const rotation = scrolled * 0.5; // 0.5 градуса на пиксель скролла
    logo.style.transform = `rotate(${rotation}deg)`;
  }
});

// Easter egg: Konami code
let konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let konamiCodePosition = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === konamiCode[konamiCodePosition]) {
    konamiCodePosition++;
    if (konamiCodePosition === konamiCode.length) {
      activateEasterEgg();
      konamiCodePosition = 0;
    }
  } else {
    konamiCodePosition = 0;
  }
});

function activateEasterEgg() {
  const mainLogo = document.querySelector(".main-logo");
  mainLogo.style.transition = "all 2s ease";
  mainLogo.style.transform = "rotate(720deg) scale(1.5)";

  setTimeout(() => {
    mainLogo.style.transform = "rotate(0deg) scale(1)";
  }, 2000);

  console.log("🎉 You found the easter egg! import this 🐍");
}

// Console message
console.log(
  "%cDeseara — Python dev",
  "font-size: 48px; font-weight: bold; color: #666; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);",
);
console.log(
  "%cBackend, скрипты и утилиты на Python",
  "font-size: 14px; color: #999;",
);
console.log(
  "%cНашли баг или идею? Откройте issue на GitHub: github.com/deseara",
  "font-size: 12px; color: #666; font-style: italic;",
);
