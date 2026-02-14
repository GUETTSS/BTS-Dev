// ============================================
//  SYSTÈME DE FILTRAGE AVANCÉ PAR TAGS
// ============================================

class AdvancedFilter {
  constructor() {
    this.activeTags = new Set();
    this.allItems = [];
    this.searchTerm = '';
    this.init();
  }

  init() {
    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // Chercher le conteneur où insérer les filtres
    const searchContainer = document.querySelector('.search-container');
    if (!searchContainer) return;

    // Créer le système de filtrage
    this.createFilterSystem(searchContainer);

    // Scanner les items à filtrer
    this.scanItems();

    // Initialiser les tags
    this.initializeTags();

    // Initialiser la recherche
    this.setupSearch();
  }

  createFilterSystem(searchContainer) {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.innerHTML = `
      <div class="filter-header">
        <span class="filter-title">🏷️ Filtrer par:</span>
        <button class="filter-reset" style="display: none;">Réinitialiser</button>
      </div>
      <div class="filter-tags" id="filter-tags">
        <!-- Les tags seront générés ici -->
      </div>
      <div class="filter-results">
        <span id="filter-count">Tous les éléments affichés</span>
      </div>
    `;

    searchContainer.parentElement.insertBefore(filterContainer, searchContainer.nextSibling);

    // Références
    this.filterTags = document.getElementById('filter-tags');
    this.filterCount = document.getElementById('filter-count');
    this.resetButton = filterContainer.querySelector('.filter-reset');

    // Event reset
    this.resetButton.addEventListener('click', () => this.resetFilters());
  }

  scanItems() {
    // Scanner tous les éléments filtrables (cards, minimal-cards, etc.)
    const items = document.querySelectorAll('[data-tags], .glass-card, .card, .minimal-card, .timeline-card, .flip-card');

    this.allItems = Array.from(items).map(item => {
      // Récupérer les tags depuis l'attribut data-tags ou générer depuis le contenu
      let tags = [];

      if (item.hasAttribute('data-tags')) {
        tags = item.getAttribute('data-tags').split(',').map(t => t.trim().toLowerCase());
      } else {
        // Générer des tags automatiques basés sur le contenu
        tags = this.generateTagsFromContent(item);
      }

      return {
        element: item,
        tags: tags,
        text: item.textContent.toLowerCase()
      };
    });
  }

  generateTagsFromContent(element) {
    const text = element.textContent.toLowerCase();
    const tags = [];

    // Mots-clés à détecter
    const keywords = {
      'javascript': ['javascript', 'js', 'node'],
      'python': ['python', 'django', 'flask'],
      'php': ['php', 'laravel', 'symfony'],
      'web': ['web', 'html', 'css'],
      'backend': ['backend', 'serveur', 'api'],
      'frontend': ['frontend', 'client'],
      'fullstack': ['fullstack', 'full-stack', 'full stack'],
      'cybersecurite': ['cyber', 'sécurité', 'securite', 'anssi', 'rgpd'],
      'database': ['base de données', 'sql', 'mysql', 'postgresql', 'database'],
      'mobile': ['mobile', 'ios', 'android'],
      'devops': ['devops', 'docker', 'kubernetes', 'ci/cd'],
      'mission': ['mission', 'professionnel', 'entreprise'],
      'projet': ['projet', 'tp', 'travaux pratiques'],
      'certification': ['certification', 'diplome', 'formation']
    };

    Object.entries(keywords).forEach(([tag, words]) => {
      if (words.some(word => text.includes(word))) {
        tags.push(tag);
      }
    });

    return tags;
  }

  initializeTags() {
    // Collecter tous les tags uniques
    const allTags = new Set();
    this.allItems.forEach(item => {
      item.tags.forEach(tag => allTags.add(tag));
    });

    // Définir les tags prédéfinis avec leurs icônes et couleurs
    const predefinedTags = [
      { name: 'web', icon: '🌐', color: '#4a90e2' },
      { name: 'javascript', icon: '⚡', color: '#f7df1e' },
      { name: 'python', icon: '🐍', color: '#3776ab' },
      { name: 'php', icon: '🐘', color: '#777bb4' },
      { name: 'frontend', icon: '💻', color: '#61dafb' },
      { name: 'backend', icon: '⚙️', color: '#68a063' },
      { name: 'fullstack', icon: '🚀', color: '#764abc' },
      { name: 'cybersecurite', icon: '🔒', color: '#e74c3c' },
      { name: 'database', icon: '🗄️', color: '#336791' },
      { name: 'mobile', icon: '📱', color: '#3ddc84' },
      { name: 'devops', icon: '🔧', color: '#2496ed' },
      { name: 'mission', icon: '💼', color: '#9b59b6' },
      { name: 'projet', icon: '📚', color: '#3498db' },
      { name: 'certification', icon: '🎓', color: '#27ae60' }
    ];

    // Créer les boutons de tags
    this.filterTags.innerHTML = '';

    predefinedTags.forEach(tagData => {
      if (allTags.has(tagData.name)) {
        const tagButton = document.createElement('button');
        tagButton.className = 'filter-tag';
        tagButton.dataset.tag = tagData.name;
        tagButton.innerHTML = `${tagData.icon} ${tagData.name}`;
        tagButton.style.setProperty('--tag-color', tagData.color);

        tagButton.addEventListener('click', () => this.toggleTag(tagData.name, tagButton));

        this.filterTags.appendChild(tagButton);
      }
    });

    // Ajouter les tags non prédéfinis
    allTags.forEach(tag => {
      if (!predefinedTags.find(t => t.name === tag)) {
        const tagButton = document.createElement('button');
        tagButton.className = 'filter-tag';
        tagButton.dataset.tag = tag;
        tagButton.innerHTML = `🏷️ ${tag}`;
        tagButton.style.setProperty('--tag-color', '#95a5a6');

        tagButton.addEventListener('click', () => this.toggleTag(tag, tagButton));

        this.filterTags.appendChild(tagButton);
      }
    });
  }

  toggleTag(tag, button) {
    if (this.activeTags.has(tag)) {
      this.activeTags.delete(tag);
      button.classList.remove('active');
    } else {
      this.activeTags.add(tag);
      button.classList.add('active');
    }

    this.applyFilters();
    this.updateResetButton();
  }

  applyFilters() {
    let visibleCount = 0;

    this.allItems.forEach(item => {
      let shouldShow = true;

      // Vérifier les tags actifs
      if (this.activeTags.size > 0) {
        const hasAllTags = Array.from(this.activeTags).every(tag =>
          item.tags.includes(tag)
        );
        if (!hasAllTags) {
          shouldShow = false;
        }
      }

      // Vérifier le terme de recherche
      if (this.searchTerm && shouldShow) {
        const matchesSearch = item.text.includes(this.searchTerm.toLowerCase());
        if (!matchesSearch) {
          shouldShow = false;
        }
      }

      // Afficher ou cacher l'élément
      if (shouldShow) {
        item.element.style.display = '';
        item.element.style.animation = 'fadeIn 0.5s ease';
        visibleCount++;
      } else {
        item.element.style.display = 'none';
      }
    });

    // Mettre à jour le compteur
    if (this.activeTags.size === 0 && !this.searchTerm) {
      this.filterCount.textContent = 'Tous les éléments affichés';
    } else {
      this.filterCount.textContent = `${visibleCount} élément${visibleCount > 1 ? 's' : ''} trouvé${visibleCount > 1 ? 's' : ''}`;
    }

    // Message si aucun résultat
    if (visibleCount === 0 && (this.activeTags.size > 0 || this.searchTerm)) {
      this.filterCount.textContent = '❌ Aucun élément ne correspond aux critères';
      this.filterCount.style.color = '#e74c3c';
    } else {
      this.filterCount.style.color = '';
    }
  }

  resetFilters() {
    this.activeTags.clear();
    this.searchTerm = '';

    // Désactiver tous les tags
    document.querySelectorAll('.filter-tag').forEach(button => {
      button.classList.remove('active');
    });

    // Vider la barre de recherche
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
      searchBar.value = '';
    }

    this.applyFilters();
    this.updateResetButton();
  }

  updateResetButton() {
    if (this.activeTags.size > 0 || this.searchTerm) {
      this.resetButton.style.display = 'inline-block';
    } else {
      this.resetButton.style.display = 'none';
    }
  }

  setupSearch() {
    const searchBar = document.getElementById('search-bar');
    if (!searchBar) return;

    searchBar.addEventListener('input', (e) => {
      this.searchTerm = e.target.value.trim();
      this.applyFilters();
      this.updateResetButton();
    });
  }
}

// Initialiser le système de filtrage
window.advancedFilter = new AdvancedFilter();
