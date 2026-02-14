# 🔧 Backend Chatbot

Serveur Node.js pour connecter le chatbot à Claude AI.

## Installation

```bash
npm install
```

## Démarrage

```bash
npm start
```

Le serveur démarre sur http://localhost:3000

## Configuration

La clé API Claude est déjà configurée dans `server.js`.

## Activation dans le chatbot

Dans `../js/chatbot-simple.js` ligne 9 :
```javascript
this.useBackend = true;
```

## Note importante

⚠️ Nécessite des crédits API Anthropic pour fonctionner.

Consultez `../documentation/README_BACKEND.md` pour plus de détails.
