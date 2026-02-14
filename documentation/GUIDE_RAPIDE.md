# 🚀 Guide Rapide - Activer Claude AI

## Étape 1 : Installer Node.js

Node.js n'est pas encore installé sur votre système. Installez-le :

### Sur Ubuntu/Debian :

```bash
# Installer Node.js et npm
sudo apt update
sudo apt install nodejs npm -y

# Vérifier l'installation
node --version
npm --version
```

### Alternative : Utiliser nvm (recommandé)

```bash
# Installer nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Recharger le terminal
source ~/.bashrc

# Installer la dernière version de Node.js
nvm install node

# Vérifier
node --version
```

## Étape 2 : Installer les dépendances

Une fois Node.js installé :

```bash
cd /home/asha/Bureau/dev
npm install
```

Cela va télécharger et installer :
- express
- cors
- node-fetch
- nodemon

## Étape 3 : Démarrer le serveur

```bash
npm start
```

Vous devriez voir :

```
╔══════════════════════════════════════════╗
║   🤖 SERVEUR CHATBOT CLAUDE DÉMARRÉ     ║
║   📡 Port: 3000                          ║
║   ✅ Status: ACTIF                       ║
╚══════════════════════════════════════════╝
```

## Étape 4 : Tester le chatbot

1. **Gardez le terminal avec le serveur ouvert**
2. Ouvrez `index.html` dans votre navigateur
3. Cliquez sur le chatbot (💬)
4. Posez une question !

Le chatbot utilisera maintenant Claude AI pour répondre intelligemment à toutes vos questions.

## Mode sans backend (si vous ne voulez pas installer Node.js)

Vous pouvez désactiver le backend pour utiliser les réponses locales :

1. Ouvrez `js/chatbot-simple.js`
2. Ligne 9, changez :
   ```javascript
   this.useBackend = false;
   ```
3. Le chatbot fonctionnera sans serveur backend

## Vérification rapide

### Le serveur est-il démarré ?

Ouvrez : http://localhost:3000

Vous devriez voir :
```json
{
  "message": "Serveur backend chatbot actif",
  "status": "OK"
}
```

### Le chatbot utilise-t-il Claude ?

Dans la console du navigateur (F12), vous devriez voir les requêtes vers `http://localhost:3000/api/chat`

## Commandes utiles

```bash
# Démarrer le serveur
npm start

# Démarrer en mode développement (auto-reload)
npm run dev

# Arrêter le serveur
Ctrl + C
```

## En cas de problème

### Port 3000 déjà utilisé ?

Changez le port dans `server.js` :
```javascript
const PORT = 3001;
```

### Le chatbot dit "Backend non disponible" ?

1. Vérifiez que `npm start` est en cours d'exécution
2. Vérifiez qu'il n'y a pas d'erreurs dans le terminal
3. Vérifiez que l'URL est `http://localhost:3000` dans `chatbot-simple.js`

## Résumé

✅ Backend créé avec votre clé API Claude
✅ Chatbot modifié pour utiliser le backend
✅ Fallback automatique vers réponses locales
✅ Documentation complète fournie

**Prochaine étape** : Installer Node.js et lancer `npm install` puis `npm start` !
