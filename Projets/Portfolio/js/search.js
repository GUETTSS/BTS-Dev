// ============================================
//  SYSTÈME DE RECHERCHE SIMPLE
// ============================================

class SimpleSearch {
  constructor() {
    this.allItems = [];
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
    // Scanner les items à filtrer
    this.scanItems();

    // Initialiser la recherche
    this.setupSearch();
  }

  scanItems() {
    // Scanner tous les éléments filtrables (cards, minimal-cards, etc.)
    const items = document.querySelectorAll('.glass-card, .card, .minimal-card, .timeline-card, .flip-card');

    this.allItems = Array.from(items).map(item => {
      return {
        element: item,
        text: item.textContent.toLowerCase()
      };
    });
  }

  applySearch() {
    let visibleCount = 0;
    const searchTerm = this.searchTerm ? this.searchTerm.toLowerCase() : '';

    this.allItems.forEach(item => {
      if (!searchTerm || item.text.includes(searchTerm)) {
        item.element.style.display = '';
        item.element.style.animation = 'fadeIn 0.5s ease';
        visibleCount++;
      } else {
        item.element.style.display = 'none';
      }
    });

    // Retourner le nombre d'éléments visibles
    return visibleCount;
  }

  setupSearch() {
    const searchBar = document.getElementById('search-bar');
    if (!searchBar) return;

    searchBar.addEventListener('input', (e) => {
      this.searchTerm = e.target.value.trim();
      this.applySearch();
    });
  }
}

// Initialiser le système de recherche
window.simpleSearch = new SimpleSearch();
