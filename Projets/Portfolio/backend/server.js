// ============================================
//  SERVEUR BACKEND POUR CHATBOT CLAUDE
// ============================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Clé API Claude chargée depuis les variables d'environnement
const CLAUDE_API_KEY = process.env.ANTHROPIC_API_KEY;

// Middleware
app.use(cors()); // Permettre les requêtes depuis le frontend
app.use(express.json()); // Parser le JSON

// Route de test
app.get('/', (req, res) => {
  res.json({
    message: 'Serveur backend chatbot actif',
    status: 'OK'
  });
});

// Route pour communiquer avec Claude
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body;

    console.log('📨 Requête reçue:', messages ? messages.length : 0, 'messages');
    console.log('Messages:', JSON.stringify(messages, null, 2));

    // Vérifier que messages n'est pas vide
    if (!messages || messages.length === 0) {
      return res.status(400).json({
        error: 'Messages array is empty'
      });
    }

    // Appeler l'API Claude
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 500,
        system: systemPrompt,
        messages: messages
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Erreur API Claude:', response.status, errorData);
      return res.status(response.status).json({
        error: 'Erreur API Claude',
        details: errorData
      });
    }

    const data = await response.json();
    console.log('✅ Réponse Claude reçue');

    // Retourner la réponse au frontend
    res.json({
      message: data.content[0].text
    });

  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    res.status(500).json({
      error: 'Erreur serveur',
      details: error.message
    });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════╗
║   🤖 SERVEUR CHATBOT CLAUDE DÉMARRÉ     ║
║                                          ║
║   📡 Port: ${PORT}                          ║
║   🌐 URL: http://localhost:${PORT}         ║
║   ✅ Status: ACTIF                       ║
║                                          ║
║   Routes disponibles:                    ║
║   - GET  /           (test)              ║
║   - POST /api/chat   (chat avec Claude)  ║
╚══════════════════════════════════════════╝
  `);
});
