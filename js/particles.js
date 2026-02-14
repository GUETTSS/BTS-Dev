// ============================================
//  PARTICULES 3D INTERACTIVES
// ============================================

class ParticleSystem {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'particles-canvas';
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 100;
    this.mouse = { x: null, y: null, radius: 150 };
    this.connectionDistance = 120;

    this.init();
  }

  init() {
    // Insérer le canvas en arrière-plan
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.pointerEvents = 'none';
    document.body.insertBefore(this.canvas, document.body.firstChild);

    // Définir les dimensions
    this.resize();

    // Créer les particules
    this.createParticles();

    // Events
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    window.addEventListener('mouseout', () => this.handleMouseOut());

    // Animation
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        z: Math.random() * 2 + 0.5, // Profondeur pour effet 3D
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        originalX: 0,
        originalY: 0
      });
    }

    // Sauvegarder les positions originales
    this.particles.forEach(p => {
      p.originalX = p.x;
      p.originalY = p.y;
    });
  }

  handleMouseMove(e) {
    this.mouse.x = e.x;
    this.mouse.y = e.y;
  }

  handleMouseOut() {
    this.mouse.x = null;
    this.mouse.y = null;
  }

  updateParticles() {
    this.particles.forEach(particle => {
      // Interaction avec la souris
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - particle.x;
        const dy = this.mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.mouse.radius) {
          const force = (this.mouse.radius - distance) / this.mouse.radius;
          const angle = Math.atan2(dy, dx);

          // Repousser les particules
          particle.x -= Math.cos(angle) * force * 5;
          particle.y -= Math.sin(angle) * force * 5;
        }
      }

      // Retour progressif vers la position originale
      const returnForce = 0.05;
      particle.x += (particle.originalX - particle.x) * returnForce;
      particle.y += (particle.originalY - particle.y) * returnForce;

      // Mouvement de base
      particle.x += particle.vx * particle.z;
      particle.y += particle.vy * particle.z;
      particle.originalX += particle.vx * particle.z;
      particle.originalY += particle.vy * particle.z;

      // Rebond sur les bords
      if (particle.originalX < 0 || particle.originalX > this.canvas.width) {
        particle.vx *= -1;
        particle.originalX = Math.max(0, Math.min(this.canvas.width, particle.originalX));
      }
      if (particle.originalY < 0 || particle.originalY > this.canvas.height) {
        particle.vy *= -1;
        particle.originalY = Math.max(0, Math.min(this.canvas.height, particle.originalY));
      }
    });
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.connectionDistance) {
          const opacity = (1 - distance / this.connectionDistance) * 0.5;
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  drawParticles() {
    this.particles.forEach(particle => {
      // Effet de profondeur avec la taille et l'opacité
      const size = particle.radius * particle.z;
      const opacity = 0.3 + (particle.z - 0.5) * 0.3;

      this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
      this.ctx.fill();

      // Glow effect
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
    });

    this.ctx.shadowBlur = 0;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.updateParticles();
    this.drawConnections();
    this.drawParticles();

    requestAnimationFrame(() => this.animate());
  }
}

// Initialiser les particules au chargement
document.addEventListener('DOMContentLoaded', () => {
  // Vérifier si les particules sont activées (par défaut oui)
  const particlesEnabled = localStorage.getItem('particlesEnabled') !== 'false';

  if (particlesEnabled) {
    new ParticleSystem();
  }
});

// Fonction pour toggle les particules
window.toggleParticles = function() {
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    canvas.remove();
    localStorage.setItem('particlesEnabled', 'false');
  } else {
    localStorage.setItem('particlesEnabled', 'true');
    new ParticleSystem();
  }
};
