# 🚀 Backend Chatbot Claude - Guide d'installation

## Prérequis

Avant de commencer, assurez-vous d'avoir **Node.js** installé sur votre machine.

### Vérifier si Node.js est installé

```bash
node --version
npm --version
```

Si Node.js n'est pas installé, téléchargez-le depuis : https://nodejs.org/

## Installation

### 1. Ouvrir un terminal

Naviguez jusqu'au dossier de votre projet :

```bash
cd /home/asha/Bureau/dev
```

### 2. Installer les dépendances

Exécutez cette commande pour installer toutes les dépendances nécessaires :

```bash
npm install
```

Cette commande va installer :
- `express` : Framework web pour Node.js
- `cors` : Middleware pour gérer les requêtes cross-origin
- `node-fetch` : Pour faire des requêtes HTTP vers l'API Claude
- `nodemon` (dev) : Pour redémarrer automatiquement le serveur

## Démarrage du serveur

### Mode production

```bash
npm start
```

### Mode développement (avec auto-reload)

```bash
npm run dev
```

Le serveur démarre sur **http://localhost:3000**

Vous devriez voir ce message :

```
╔══════════════════════════════════════════╗
║   🤖 SERVEUR CHATBOT CLAUDE DÉMARRÉ     ║
║                                          ║
║   📡 Port: 3000                          ║
║   🌐 URL: http://localhost:3000          ║
║   ✅ Status: ACTIF                       ║
║                                          ║
║   Routes disponibles:                    ║
║   - GET  /           (test)              ║
║   - POST /api/chat   (chat avec Claude)  ║
╚══════════════════════════════════════════╝
```

## Tester le serveur

### 1. Test simple

Ouvrez votre navigateur et allez sur : http://localhost:3000

Vous devriez voir :

```json
{
  "message": "Serveur backend chatbot actif",
  "status": "OK"
}
```

### 2. Ouvrir votre site

Ouvrez maintenant votre fichier `index.html` dans le navigateur et testez le chatbot.

**Important** : Le serveur backend doit rester actif dans le terminal pendant que vous utilisez le chatbot.

## Configuration

### Activer/Désactiver le backend

Dans le fichier `js/chatbot-simple.js`, ligne 9 :

```javascript
this.useBackend = true;  // true = utilise Claude via backend
                         // false = utilise réponses locales
```

### Changer le port du serveur

Dans `server.js`, ligne 6 :

```javascript
const PORT = 3000; // Changer le port si nécessaire
```

N'oubliez pas de mettre à jour `backendUrl` dans `chatbot-simple.js` si vous changez le port.

## Structure des fichiers

```
dev/
├── server.js              # Serveur backend Node.js
├── package.json           # Configuration et dépendances
├── README_BACKEND.md      # Ce fichier
├── js/
│   └── chatbot-simple.js  # Chatbot frontend
└── node_modules/          # Dépendances (créé après npm install)
```

## Fonctionnement

```
┌─────────────┐          ┌──────────────┐          ┌────────────┐
│   Frontend  │  HTTP    │   Backend    │   API    │  Claude AI │
│  (Chatbot)  │ ──────>  │  (server.js) │ ──────>  │ (Anthropic)│
└─────────────┘          └──────────────┘          └────────────┘
      ▲                          │                         │
      │                          │                         │
      └──────────────────────────┴─────────────────────────┘
              Réponse intelligente de Claude
```

## Avantages du backend

✅ **Sécurité** : La clé API reste côté serveur
✅ **CORS** : Pas de problème de cross-origin
✅ **Contrôle** : Vous pouvez ajouter des logs, limites, etc.
✅ **Fallback** : Si le backend est indisponible, réponses locales

## Désactivation du backend

Si vous ne voulez pas utiliser le backend :

1. Ouvrez `js/chatbot-simple.js`
2. Changez la ligne 9 :
   ```javascript
   this.useBackend = false;
   ```
3. Le chatbot utilisera automatiquement les réponses locales

## Logs du serveur

Quand le serveur reçoit une requête, vous verrez dans le terminal :

```
📨 Requête reçue: 2 messages
✅ Réponse Claude reçue
```

En cas d'erreur :

```
❌ Erreur API Claude: 401 { error: { message: "Invalid API key" } }
```

## Arrêter le serveur

Dans le terminal où le serveur tourne, appuyez sur :

```
Ctrl + C
```

## Dépannage

### Erreur : "npm: command not found"

Node.js n'est pas installé. Installez-le depuis nodejs.org

### Erreur : "Port 3000 already in use"

Un autre processus utilise le port 3000. Changez le port dans `server.js` :

```javascript
const PORT = 3001; // ou un autre port libre
```

### Le chatbot dit "Backend non disponible"

1. Vérifiez que le serveur est bien démarré (`npm start`)
2. Vérifiez l'URL dans `chatbot-simple.js` (ligne 8)
3. Regardez les logs du serveur pour voir les erreurs

### Erreur API Claude

Vérifiez que votre clé API est valide dans `server.js` ligne 13.

## Support

Pour toute question, consultez la documentation ou les logs du serveur dans le terminal.
