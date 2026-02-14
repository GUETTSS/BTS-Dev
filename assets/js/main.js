/* ============================================
   MAIN.JS - Portfolio BTS SIO
   Core functionality and initializations
   ============================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initScrollReveal();
  initScrollToTop();
  initSkillBars();
  initTypingEffect();
  initSmoothScroll();
  initProjectFilters();
  initProjectTabs();
  initCategoryFilters();
  initCardTilt();
  initCardModal();
});

/* ============================================
   LOADER
   ============================================ */
function initLoader() {
  const loader = document.querySelector('.loader');
  if (!loader) return;

  const progress = loader.querySelector('.loader__progress');
  let width = 0;

  const interval = setInterval(() => {
    width += Math.random() * 15;
    if (width >= 100) {
      width = 100;
      clearInterval(interval);

      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.add('loaded');
      }, 300);
    }
    if (progress) {
      progress.style.width = width + '%';
    }
  }, 100);
}

/* ============================================
   NAVBAR
   ============================================ */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar__toggle');
  const menu = document.querySelector('.navbar__menu');
  const links = document.querySelectorAll('.navbar__link');

  if (!navbar) return;

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on a link
    links.forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && menu.classList.contains('active')) {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }

  // Active link on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ============================================
   SCROLL REVEAL ANIMATIONS
   ============================================ */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (!reveals.length) return;

  const revealOnScroll = () => {
    reveals.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
}

/* ============================================
   SCROLL TO TOP BUTTON
   ============================================ */
function initScrollToTop() {
  const scrollBtn = document.querySelector('.scroll-top');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ============================================
   SKILL PROGRESS BARS
   ============================================ */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-item__bar');
  if (!skillBars.length) return;

  const animateBars = () => {
    skillBars.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible && !bar.classList.contains('animated')) {
        bar.classList.add('animated');
      }
    });
  };

  window.addEventListener('scroll', animateBars);
  animateBars(); // Initial check
}

/* ============================================
   TYPING EFFECT
   ============================================ */
function initTypingEffect() {
  const typingElement = document.querySelector('.hero__typing');
  if (!typingElement) return;

  const texts = [
    'Etudiant BTS SIO',
    'Developpeur Web',
    'Passionné d\'IT',
    'En recherche d\'alternance'
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500; // Pause before next text
    }

    setTimeout(type, typeSpeed);
  }

  setTimeout(type, 1000);
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ============================================
   PROJECT FILTERS
   ============================================ */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
          card.classList.add('reveal');
          setTimeout(() => card.classList.add('active'), 100);
        } else {
          card.classList.remove('active');
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ============================================
   PROJECT TABS (TP / Missions)
   ============================================ */
function initProjectTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (!tabBtns.length || !tabContents.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.dataset.tab;

      // Hide all tab contents and show the selected one
      tabContents.forEach(content => {
        content.classList.remove('active');
      });

      const targetContent = document.getElementById(`${targetTab}-content`);
      if (targetContent) {
        targetContent.classList.add('active');

        // Re-trigger reveal animations for the new tab content
        const revealElements = targetContent.querySelectorAll('.reveal');
        revealElements.forEach((el, index) => {
          el.classList.remove('active');
          setTimeout(() => {
            el.classList.add('active');
          }, index * 100);
        });
      }
    });
  });
}

/* ============================================
   CONTACT FORM
   ============================================ */
function initContactForm() {
  const form = document.querySelector('.contact-form form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.contact-form__submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.disabled = true;

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show success message
    const formContent = form.closest('.contact-form');
    const successMsg = formContent.querySelector('.form-success');

    if (successMsg) {
      form.style.display = 'none';
      successMsg.classList.add('active');
    }

    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    form.reset();
  });
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Animate counter
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }

  updateCounter();
}

/* ============================================
   CARD TILT 3D EFFECT
   ============================================ */
function initCardTilt() {
  const cards = document.querySelectorAll('.project-card-interactive');

  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

/* ============================================
   CARD MODAL EXPANSION
   ============================================ */
function initCardModal() {
  const cards = document.querySelectorAll('.project-card-interactive[data-modal]');
  const modalOverlay = document.querySelector('.card-modal-overlay');
  const modal = document.querySelector('.card-modal');
  const modalClose = document.querySelector('.card-modal__close');

  if (!cards.length || !modal) return;

  // Open modal
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't open modal if clicking on a link
      if (e.target.closest('a')) return;

      const data = {
        image: card.dataset.image || card.querySelector('.card-media img')?.src || '',
        category: card.dataset.category || 'Projet',
        title: card.dataset.title || card.querySelector('.card-title')?.textContent || '',
        description: card.dataset.description || card.querySelector('.card-description')?.textContent || '',
        fullDescription: card.dataset.fullDescription || '',
        technologies: card.dataset.technologies || '',
        duration: card.dataset.duration || '',
        context: card.dataset.context || 'BTS SIO',
        link: card.dataset.link || '',
        github: card.dataset.github || ''
      };

      if (card.dataset.navigate === 'true' && data.link) {
        window.location.href = data.link;
        return;
      }

      populateModal(data);
      openModal();
    });
  });

  // Close modal
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function populateModal(data) {
    const modalImage = modal.querySelector('.card-modal__image');
    const modalCategory = modal.querySelector('.card-modal__category');
    const modalTitle = modal.querySelector('.card-modal__title');
    const modalDescription = modal.querySelector('.card-modal__description');
    const modalTags = modal.querySelector('.card-modal__tags');
    const modalMeta = modal.querySelector('.card-modal__meta');
    const modalCta = modal.querySelector('.card-modal__cta');

    if (modalImage) {
      if (data.image) {
        modalImage.src = data.image;
        modalImage.style.display = 'block';
      } else {
        modalImage.style.display = 'none';
      }
    }

    if (modalCategory) modalCategory.textContent = data.category;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDescription) {
      modalDescription.textContent = data.fullDescription || data.description;
    }

    // Tags
    if (modalTags && data.technologies) {
      const techs = data.technologies.split(',');
      modalTags.innerHTML = techs.map(tech =>
        `<span class="tag tag--primary">${tech.trim()}</span>`
      ).join('');
    }

    // Meta info
    if (modalMeta) {
      modalMeta.innerHTML = `
        <div class="card-modal__meta-item">
          <h4>Technologies</h4>
          <p>${data.technologies || 'N/A'}</p>
        </div>
        <div class="card-modal__meta-item">
          <h4>Duree</h4>
          <p>${data.duration || 'N/A'}</p>
        </div>
        <div class="card-modal__meta-item">
          <h4>Contexte</h4>
          <p>${data.context}</p>
        </div>
      `;
    }

    // CTA buttons
    if (modalCta) {
      let ctaHtml = '';
      if (data.link) {
        ctaHtml += `
          <a href="${data.link}" class="btn btn--primary" target="_blank">
            Voir le projet
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        `;
      }
      if (data.github) {
        ctaHtml += `
          <a href="${data.github}" class="btn btn--secondary" target="_blank">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Code source
          </a>
        `;
      }
      modalCta.innerHTML = ctaHtml || '<p style="color: var(--text-muted);">Liens non disponibles</p>';
    }
  }

  function openModal() {
    document.body.style.overflow = 'hidden';
    if (modalOverlay) modalOverlay.classList.add('active');
    modal.classList.add('active');
  }

  function closeModal() {
    document.body.style.overflow = '';
    if (modalOverlay) modalOverlay.classList.remove('active');
    modal.classList.remove('active');
  }
}

/* ============================================
   PROJECT CATEGORY FILTERS
   ============================================ */
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-bar .filter-btn');
  const cards = document.querySelectorAll('.project-card-interactive');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach((card, index) => {
        const categoryRaw = card.dataset.category || '';
        const categories = categoryRaw
          .split(',')
          .map((item) => item.trim().toLowerCase())
          .filter(Boolean);
        const shouldShow = filter === 'all' || categories.includes(filter);

        if (shouldShow) {
          card.style.display = 'block';
          card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
        } else {
          card.style.animation = 'fadeOutDown 0.3s ease forwards';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}
