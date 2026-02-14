# 🚀 Démarrage du Backend - Instructions

## 1. Vérifier l'installation de Node.js

Ouvrez un nouveau terminal et tapez :

```bash
node --version
npm --version
```

Vous devriez voir quelque chose comme :
```
v18.17.0
9.6.7
```

Si ces commandes ne fonctionnent pas, redémarrez votre terminal ou votre ordinateur.

## 2. Installer les dépendances

Dans le terminal, naviguez vers votre projet :

```bash
cd /home/asha/Bureau/dev
```

Puis installez les dépendances :

```bash
npm install
```

Vous devriez voir :
```
added 57 packages in 3s
```

## 3. Démarrer le serveur

```bash
npm start
```

Vous verrez :

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

## 4. Tester le serveur

Gardez le terminal avec le serveur ouvert, puis :

### Test 1 : Vérifier que le serveur répond

Ouvrez votre navigateur et allez sur : http://localhost:3000

Vous devriez voir :
```json
{
  "message": "Serveur backend chatbot actif",
  "status": "OK"
}
```

### Test 2 : Tester le chatbot

1. Ouvrez `index.html` dans votre navigateur
2. Cliquez sur le bouton du chatbot (💬)
3. Tapez "Bonjour" ou toute autre question
4. **Claude AI répondra intelligemment !**

## 5. Vérifier que Claude AI est bien utilisé

Ouvrez la console du navigateur (F12) et vous verrez :

```
POST http://localhost:3000/api/chat
```

Cela confirme que le chatbot communique avec le backend qui utilise Claude.

## Commandes utiles

### Démarrer le serveur
```bash
npm start
```

### Arrêter le serveur
Appuyez sur `Ctrl + C` dans le terminal

### Redémarrer le serveur après modification
```bash
npm start
```

## En cas de problème

### Erreur : "Port 3000 is already in use"

Un serveur tourne déjà sur le port 3000. Soit :
- Arrêtez l'autre serveur
- Ou changez le port dans `server.js` ligne 6 :
  ```javascript
  const PORT = 3001;
  ```

### Le chatbot dit "Backend non disponible"

1. Vérifiez que `npm start` est bien en cours d'exécution
2. Vérifiez qu'il n'y a pas d'erreurs dans le terminal du serveur
3. Ouvrez http://localhost:3000 pour tester

### Erreur : "Module not found"

Réinstallez les dépendances :
```bash
rm -rf node_modules package-lock.json
npm install
```

## Logs du serveur

Quand quelqu'un utilise le chatbot, vous verrez dans le terminal :

```
📨 Requête reçue: 2 messages
✅ Réponse Claude reçue
```

## Mode développement (optionnel)

Pour que le serveur redémarre automatiquement à chaque modification :

```bash
npm run dev
```

## C'est tout !

Votre chatbot utilise maintenant Claude 3.5 Sonnet pour des réponses intelligentes et contextuelles ! 🎉
