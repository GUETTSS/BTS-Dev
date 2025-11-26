document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const skipLoader = params.get("skipLoader") === "true";

  const loader = document.getElementById("loader");
  const sommaire = document.getElementById("sommaire");
  const progressText = document.getElementById("progress-text");

  if (skipLoader) {
    loader.style.display = "none";
    sommaire.style.display = "block";
    return;
  }

  let percent = 0;
  const interval = setInterval(() => {
    percent += 2.5;
    if (progressText) {
      progressText.textContent = `Chargement : ${Math.floor(percent)}%`;
    }
    if (percent >= 100) clearInterval(interval);
  }, 100);

  setTimeout(() => {
    loader.style.transition = "opacity 0.5s ease";
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
      sommaire.style.display = "block";
    }, 500);
  }, 4000);
});


// Menu déroulant
function toggleDropdown(id) {
  const section = document.getElementById(id);
  section.classList.toggle("hidden");
}

// Scroll vers section
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// === Animation des étoiles avec effet souris ===
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const starCount = 100;

for (let i = 0; i < starCount; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.5 + 0.2
  });
}

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.shadowBlur = 4;
  ctx.shadowColor = "#ffcc00";

  for (let star of stars) {
    star.x += mouseX * star.speed * 2;
    star.y += star.speed + mouseY * star.speed * 2;

    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
    if (star.x < 0) star.x = canvas.width;
    if (star.x > canvas.width) star.x = 0;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(animateStars);
}

animateStars();
