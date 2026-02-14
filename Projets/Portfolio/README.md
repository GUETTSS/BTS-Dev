# Portfolio IMAD - BTS SIO

Portfolio personnel presentant mes competences, projets, missions et certifications dans le cadre de ma formation BTS SIO.

## Structure du projet

```
dev/
├── index.html                 # Page d'accueil
├── about.html                 # Page A propos
├── skills.html                # Page Competences
├── projects.html              # Page Projets
├── tp.html                    # Page Travaux Pratiques
├── missions.html              # Page Missions professionnelles
├── veille.html                # Page Veille technologique
├── certifications.html        # Page Certifications
├── contact.html               # Page Contact
│
├── assets/                    # Ressources du site
│   ├── css/                   # Styles CSS modulaires
│   │   ├── variables.css      # Variables CSS (couleurs, fonts, espacements)
│   │   ├── base.css           # Styles de base et reset
│   │   ├── animations.css     # Animations et keyframes
│   │   ├── components.css     # Composants UI (navbar, boutons, cartes)
│   │   └── pages/             # Styles specifiques par page
│   │       ├── home.css
│   │       ├── about.css
│   │       ├── projects.css
│   │       ├── skills.css
│   │       └── other.css
│   ├── fonts/                 # Polices personnalisees
│   └── js/                    # JavaScript principal
│       └── main.js
│
├── js/                        # Scripts JavaScript fonctionnels
│   ├── chatbot-simple.js      # Chatbot avec Claude AI
│   ├── filters.js             # Systeme de filtrage par tags
│   ├── search.js              # Barre de recherche
│   ├── style.js               # Gestion des themes
│   ├── particles.js           # Effets de particules animees
│   └── terminal.js            # Terminal interactif
│
├── css/                       # Style CSS principal
│   └── style.css
│
├── portfolio/                 # Contenu du portfolio
│   ├── images/                # Images et GIFs
│   ├── tp/                    # Travaux pratiques (TP 1-6)
│   │   ├── tp_1/
│   │   ├── tp_3/
│   │   ├── tp_4/
│   │   ├── tp_5/
│   │   └── tp_6/
│   ├── missions/              # Missions professionnelles (TP 7-10)
│   │   ├── tp_7/
│   │   ├── tp_8/
│   │   ├── tp_9/
│   │   └── tp_10/
│   └── certification/         # Certificats PDF
│       ├── anssi/             # SecNumedu
│       ├── cnil/              # RGPD
│       └── cybermalveillance/
│
├── backend/                   # Serveur Node.js (optionnel)
│   ├── server.js              # Serveur Express pour le chatbot
│   └── package.json
│
└── documentation/             # Documentation technique
    ├── CHATBOT_SIMPLE.md
    ├── README_BACKEND.md
    ├── GUIDE_RAPIDE.md
    └── DEMARRAGE.md
```

## Demarrage rapide

### Ouvrir le site

Ouvrez simplement `index.html` dans votre navigateur.

### Activer le chatbot avec Claude AI (optionnel)

1. Installez Node.js
2. Configurez le backend :
   ```bash
   cd backend
   npm install
   npm start
   ```
3. Dans `js/chatbot-simple.js`, activez le backend :
   ```javascript
   this.useBackend = true;
   ```

**Note** : Necessite une cle API Anthropic configuree dans le backend.

## Fonctionnalites

- **Themes multiples** : Personnalisation des couleurs du site
- **Chatbot intelligent** : Assistant virtuel avec Claude AI
- **Recherche** : Barre de recherche integree
- **Filtres par tags** : Filtrage du contenu par categories
- **Particules animees** : Effets visuels interactifs
- **Terminal interactif** : Simulation de terminal pour developpeurs
- **Design responsive** : Adapte a tous les ecrans
- **Glassmorphism** : Design moderne avec effets de transparence

## Technologies utilisees

**Frontend**
- HTML5
- CSS3 (Variables CSS, Flexbox, Grid, Animations)
- JavaScript vanilla

**Backend (optionnel)**
- Node.js
- Express
- API Claude (Anthropic)

**Design**
- Glassmorphism
- Dark mode
- Animations CSS

## Pages du portfolio

| Page | Description |
|------|-------------|
| Accueil | Presentation generale et navigation |
| A propos | Parcours academique et professionnel |
| Competences | Skills techniques et soft skills |
| Projets | Realisations et projets personnels |
| Travaux Pratiques | TP realises en formation |
| Missions | Stages et missions professionnelles |
| Veille | Veille technologique |
| Certifications | Diplomes et certifications obtenues |
| Contact | Formulaire de contact |

## Documentation

Consultez le dossier `documentation/` pour :
- Guide complet du chatbot
- Configuration du backend
- Instructions de demarrage
- Resolution des problemes

## Licence

© 2026 IMAD - Tous droits reserves

---

**Etudiant en BTS SIO** | Developpement web et Cybersecurite
