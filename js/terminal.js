// ============================================
//  TERMINAL INTERACTIF
// ============================================

class InteractiveTerminal {
  constructor() {
    this.commands = {
      help: this.helpCommand.bind(this),
      about: this.aboutCommand.bind(this),
      skills: this.skillsCommand.bind(this),
      projects: this.projectsCommand.bind(this),
      missions: this.missionsCommand.bind(this),
      certifications: this.certificationsCommand.bind(this),
      contact: this.contactCommand.bind(this),
      theme: this.themeCommand.bind(this),
      clear: this.clearCommand.bind(this),
      particles: this.particlesCommand.bind(this),
      cv: this.cvCommand.bind(this),
      social: this.socialCommand.bind(this),
      easter: this.easterCommand.bind(this)
    };

    this.history = [];
    this.historyIndex = -1;
    this.isOpen = false;

    this.init();
  }

  init() {
    // Créer le terminal
    this.createTerminal();

    // Event listeners
    document.addEventListener('keydown', (e) => this.handleKeyPress(e));
  }

  createTerminal() {
    const terminal = document.createElement('div');
    terminal.id = 'terminal';
    terminal.className = 'terminal hidden';
    terminal.innerHTML = `
      <div class="terminal-header">
        <span class="terminal-title">🖥️ IMAD Terminal v1.0</span>
        <button class="terminal-close" onclick="window.terminal.toggle()">✕</button>
      </div>
      <div class="terminal-body">
        <div class="terminal-output">
          <div class="terminal-line">
            <span class="terminal-prompt">Bienvenue dans le terminal IMAD !</span>
          </div>
          <div class="terminal-line">
            <span class="terminal-info">Tapez 'help' pour voir les commandes disponibles.</span>
          </div>
          <div class="terminal-line">
            <span class="terminal-info">Appuyez sur <kbd>\`</kbd> ou <kbd>~</kbd> pour ouvrir/fermer le terminal.</span>
          </div>
        </div>
        <div class="terminal-input-line">
          <span class="terminal-prompt">visitor@imad:~$</span>
          <input type="text" class="terminal-input" placeholder="Entrez une commande..." autocomplete="off" />
        </div>
      </div>
    `;

    document.body.appendChild(terminal);

    // Référence aux éléments
    this.terminal = terminal;
    this.output = terminal.querySelector('.terminal-output');
    this.input = terminal.querySelector('.terminal-input');

    // Event sur l'input
    this.input.addEventListener('keydown', (e) => this.handleInputKeyPress(e));
  }

  handleKeyPress(e) {
    // Toggle terminal avec ` ou ~
    if (e.key === '`' || e.key === '~') {
      e.preventDefault();
      this.toggle();
    }
  }

  handleInputKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const command = this.input.value.trim();
      if (command) {
        this.executeCommand(command);
        this.history.push(command);
        this.historyIndex = this.history.length;
      }
      this.input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.input.value = this.history[this.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.input.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = this.history.length;
        this.input.value = '';
      }
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.terminal.classList.toggle('hidden');
    if (this.isOpen) {
      this.input.focus();
    }
  }

  executeCommand(commandLine) {
    const [command, ...args] = commandLine.toLowerCase().split(' ');

    // Afficher la commande
    this.addOutput(`<span class="terminal-prompt">visitor@imad:~$</span> ${commandLine}`, 'command');

    if (this.commands[command]) {
      this.commands[command](args);
    } else {
      this.addOutput(`Commande '${command}' non trouvée. Tapez 'help' pour voir les commandes disponibles.`, 'error');
    }

    // Scroll vers le bas
    this.output.scrollTop = this.output.scrollHeight;
  }

  addOutput(text, type = 'normal') {
    const line = document.createElement('div');
    line.className = `terminal-line terminal-${type}`;
    line.innerHTML = text;
    this.output.appendChild(line);
  }

  // ===== COMMANDES =====

  helpCommand() {
    this.addOutput('<span class="terminal-success">📋 Commandes disponibles:</span>');
    this.addOutput('  <span class="terminal-keyword">help</span>           - Affiche cette aide');
    this.addOutput('  <span class="terminal-keyword">about</span>          - À propos de moi');
    this.addOutput('  <span class="terminal-keyword">skills</span>         - Mes compétences techniques');
    this.addOutput('  <span class="terminal-keyword">projects</span>       - Liste de mes projets');
    this.addOutput('  <span class="terminal-keyword">missions</span>       - Mes missions professionnelles');
    this.addOutput('  <span class="terminal-keyword">certifications</span> - Mes certifications');
    this.addOutput('  <span class="terminal-keyword">contact</span>        - Informations de contact');
    this.addOutput('  <span class="terminal-keyword">social</span>         - Mes réseaux sociaux');
    this.addOutput('  <span class="terminal-keyword">theme</span> [color]  - Changer le thème (blue, purple, green, orange, red)');
    this.addOutput('  <span class="terminal-keyword">particles</span>      - Activer/désactiver les particules');
    this.addOutput('  <span class="terminal-keyword">cv</span>             - Télécharger mon CV');
    this.addOutput('  <span class="terminal-keyword">clear</span>          - Effacer le terminal');
    this.addOutput('  <span class="terminal-keyword">easter</span>         - 👀 ?');
  }

  aboutCommand() {
    this.addOutput('<span class="terminal-success">👤 À propos de moi:</span>');
    this.addOutput('Nom: IMAD');
    this.addOutput('Formation: BTS SIO (Services Informatiques aux Organisations)');
    this.addOutput('Spécialité: Développement web & Cybersécurité');
    this.addOutput('Passion: Code, sécurité informatique, innovation');
    this.addOutput('<span class="terminal-info">💡 Tapez "skills" pour voir mes compétences</span>');
  }

  skillsCommand() {
    this.addOutput('<span class="terminal-success">💻 Compétences techniques:</span>');
    this.addOutput('');
    this.addOutput('Frontend:');
    this.addOutput('  ▸ HTML5, CSS3, JavaScript (ES6+)');
    this.addOutput('  ▸ Glassmorphism, Animations, UI/UX');
    this.addOutput('');
    this.addOutput('Backend:');
    this.addOutput('  ▸ PHP, Python, Node.js');
    this.addOutput('  ▸ SQL, MySQL, PostgreSQL');
    this.addOutput('');
    this.addOutput('Cybersécurité:');
    this.addOutput('  ▸ ANSSI SecNum, RGPD/CNIL');
    this.addOutput('  ▸ Cybermalveillance, Sécurité réseau');
    this.addOutput('');
    this.addOutput('Outils:');
    this.addOutput('  ▸ Git, GitHub, VS Code');
    this.addOutput('  ▸ Docker, Linux');
  }

  projectsCommand() {
    this.addOutput('<span class="terminal-success">📚 Mes projets (TP):</span>');
    this.addOutput('  1. TP 1 - Premier Projet Web');
    this.addOutput('  2. TP 2 - JavaScript Avancé');
    this.addOutput('  3. TP 3 - Application Web');
    this.addOutput('  4. TP 4 - UI Design');
    this.addOutput('  5. TP 5 - Frontend Development');
    this.addOutput('  6. TP 6 - Full-Stack Project');
    this.addOutput('');
    this.addOutput('<span class="terminal-info">💡 Visitez la page "Mes TP" pour plus de détails</span>');
    this.addOutput('<span class="terminal-link"><a href="tp.html" target="_blank">→ Voir tous les projets</a></span>');
  }

  missionsCommand() {
    this.addOutput('<span class="terminal-success">💼 Mes missions professionnelles:</span>');
    this.addOutput('  1. Mission 1 - Projet professionnel en entreprise');
    this.addOutput('  2. Mission 2 - Développement et intégration système');
    this.addOutput('  3. Mission 3 - Gestion de projet et déploiement');
    this.addOutput('  4. Mission 4 - Infrastructure et administration');
    this.addOutput('');
    this.addOutput('<span class="terminal-link"><a href="missions.html" target="_blank">→ Voir toutes les missions</a></span>');
  }

  certificationsCommand() {
    this.addOutput('<span class="terminal-success">🎓 Mes certifications:</span>');
    this.addOutput('  ✓ Cybermalveillance - Cybersécurité');
    this.addOutput('  ✓ SecNum Académie - ANSSI');
    this.addOutput('  ✓ CNIL - RGPD (5 modules)');
    this.addOutput('');
    this.addOutput('<span class="terminal-link"><a href="certification.html" target="_blank">→ Voir toutes les certifications</a></span>');
  }

  contactCommand() {
    this.addOutput('<span class="terminal-success">✉️ Contact:</span>');
    this.addOutput('Email: votre.email@example.com');
    this.addOutput('GitHub: <a href="https://github.com/guettss" target="_blank">github.com/guettss</a>');
    this.addOutput('LinkedIn: <a href="https://linkedin.com/in/votre-profil" target="_blank">linkedin.com/in/votre-profil</a>');
    this.addOutput('');
    this.addOutput('<span class="terminal-info">💡 Tapez "social" pour plus de liens</span>');
  }

  socialCommand() {
    this.addOutput('<span class="terminal-success">🌐 Réseaux sociaux:</span>');
    this.addOutput('GitHub: <a href="https://github.com/guettss" target="_blank">github.com/guettss</a>');
    this.addOutput('LinkedIn: <a href="https://linkedin.com/in/votre-profil" target="_blank">linkedin.com/in/votre-profil</a>');
    this.addOutput('Email: votre.email@example.com');
  }

  themeCommand(args) {
    const themes = ['blue', 'purple', 'green', 'orange', 'red'];
    const themeName = args[0];

    if (!themeName) {
      this.addOutput('<span class="terminal-error">❌ Spécifiez un thème: blue, purple, green, orange, red</span>');
      this.addOutput('Exemple: theme purple');
      return;
    }

    if (!themes.includes(themeName)) {
      this.addOutput(`<span class="terminal-error">❌ Thème '${themeName}' non trouvé</span>`);
      this.addOutput('Thèmes disponibles: ' + themes.join(', '));
      return;
    }

    // Appliquer le thème
    if (window.applyTheme) {
      window.applyTheme(themeName);
      this.addOutput(`<span class="terminal-success">✓ Thème '${themeName}' appliqué !</span>`);
    } else {
      this.addOutput('<span class="terminal-error">❌ Fonction de thème non disponible sur cette page</span>');
    }
  }

  particlesCommand() {
    if (window.toggleParticles) {
      window.toggleParticles();
      const enabled = document.getElementById('particles-canvas') !== null;
      this.addOutput(`<span class="terminal-success">✓ Particules ${enabled ? 'activées' : 'désactivées'} !</span>`);
    } else {
      this.addOutput('<span class="terminal-error">❌ Système de particules non disponible</span>');
    }
  }

  cvCommand() {
    this.addOutput('<span class="terminal-success">📄 Génération du CV...</span>');
    this.addOutput('<span class="terminal-info">⏳ Fonctionnalité en cours de développement</span>');
    this.addOutput('<span class="terminal-info">💡 En attendant, contactez-moi par email</span>');
  }

  clearCommand() {
    this.output.innerHTML = '';
    this.addOutput('<span class="terminal-info">Terminal effacé. Tapez "help" pour voir les commandes.</span>');
  }

  easterCommand() {
    this.addOutput('<span class="terminal-success">🎉 Easter Egg trouvé !</span>');
    this.addOutput('');
    this.addOutput('    ⠀⠀⠀⠀⠀⢀⣠⣤⣤⣤⣀⠀⠀⠀⠀⠀⠀⠀');
    this.addOutput('    ⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀');
    this.addOutput('    ⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀');
    this.addOutput('    ⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀');
    this.addOutput('    ⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀');
    this.addOutput('    ⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀');
    this.addOutput('    ⠀⠀⠀⠘⢿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀');
    this.addOutput('    ⠀⠀⠀⠀⠀⠉⠛⠿⠿⠛⠋⠁⠀⠀⠀⠀⠀⠀');
    this.addOutput('');
    this.addOutput('<span class="terminal-success">Merci de visiter mon portfolio ! 🚀</span>');
    this.addOutput('<span class="terminal-info">Développé avec passion par IMAD</span>');
  }
}

// Initialiser le terminal
document.addEventListener('DOMContentLoaded', () => {
  window.terminal = new InteractiveTerminal();
});
