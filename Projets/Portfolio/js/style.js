// === DESIGN MODERNE - JavaScript ===

// Fonction globale pour appliquer un thème (utilisée par le terminal)
window.applyTheme = function(themeName) {
  const themes = ['blue', 'purple', 'green', 'orange', 'red'];
  if (!themes.includes(themeName)) return false;

  // Retirer toutes les classes de thème
  document.body.classList.remove(
    'theme-blue', 'theme-purple', 'theme-green', 'theme-orange', 'theme-red'
  );

  // Ajouter le nouveau thème
  document.body.classList.add('theme-' + themeName);

  // Sauvegarder
  localStorage.setItem('portfolio-theme', themeName);

  return true;
};

document.addEventListener("DOMContentLoaded", () => {
  // === GESTION DU LOADER ===
  const params = new URLSearchParams(window.location.search);
  const skipLoader = params.get("skipLoader") === "true";

  const loader = document.getElementById("loader");
  const sommaire = document.getElementById("sommaire");
  const footer = document.getElementById("main-footer");
  const progressText = document.getElementById("progress-text");
  const progressFill = document.getElementById("progress-fill");

  // Charger le thème sauvegardé ou utiliser bleu par défaut
  const savedTheme = localStorage.getItem("portfolio-theme") || "blue";
  document.body.classList.add("theme-" + savedTheme);

  if (skipLoader) {
    if (loader) loader.style.display = "none";
    if (sommaire) sommaire.style.display = "block";
    if (footer) footer.style.display = "block";
    return;
  }

  // Animation de la progress bar
  let percent = 0;
  const interval = setInterval(() => {
    percent += 2;
    if (progressText) {
      progressText.textContent = `Chargement : ${Math.floor(percent)}%`;
    }
    if (progressFill) {
      progressFill.style.width = percent + "%";
    }
    if (percent >= 100) {
      clearInterval(interval);
    }
  }, 80);

  // Transition après le chargement
  setTimeout(() => {
    if (loader) {
      loader.style.transition = "opacity 0.5s ease";
      loader.style.opacity = "0";

      setTimeout(() => {
        loader.style.display = "none";
        if (sommaire) sommaire.style.display = "block";
        if (footer) footer.style.display = "block";
      }, 500);
    }
  }, 4000);

  // === GESTION DU THEME TOGGLE ===
  const themeToggle = document.getElementById("theme-toggle");
  const themePanel = document.getElementById("theme-panel");

  if (themeToggle && themePanel) {
    themeToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      themePanel.classList.toggle("active");
    });

    // Fermer le panel en cliquant ailleurs
    document.addEventListener("click", (e) => {
      if (!themePanel.contains(e.target) && e.target !== themeToggle) {
        themePanel.classList.remove("active");
      }
    });

    // Gestion des boutons de thème
    const themeOptions = document.querySelectorAll(".theme-option");
    themeOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const theme = option.getAttribute("data-theme");

        // Retirer toutes les classes de thème
        document.body.classList.remove(
          "theme-blue",
          "theme-purple",
          "theme-green",
          "theme-orange",
          "theme-red"
        );

        // Ajouter le nouveau thème
        document.body.classList.add("theme-" + theme);

        // Sauvegarder le thème
        localStorage.setItem("portfolio-theme", theme);

        // Fermer le panel
        themePanel.classList.remove("active");
      });
    });
  }
});

// === FONCTIONS UTILITAIRES ===

// Menu déroulant
function toggleDropdown(id) {
  const section = document.getElementById(id);
  if (section) {
    section.classList.toggle("hidden");
  }
}

// Scroll vers section
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}
