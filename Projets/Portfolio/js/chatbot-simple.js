// ============================================
//  CHATBOT SIMPLE AVEC CLAUDE AI
// ============================================

class SimpleChatbot {
  constructor() {
    // Configuration
    this.backendUrl = 'http://localhost:3000'; // URL du serveur backend
    this.useBackend = false; // Activer/désactiver l'utilisation du backend (désactivé car pas de crédits API)

    this.isOpen = false;
    this.conversationHistory = [];

    // Base de connaissances
    this.portfolioInfo = {
      name: 'IMAD',
      formation: 'BTS SIO - Services Informatiques aux Organisations',
      specialization: 'SLAM (Solutions Logicielles et Applications Métier)',
      skills: ['JavaScript', 'Python', 'PHP', 'HTML/CSS', 'React', 'Node.js'],
      passions: ['développement web', 'cybersécurité', 'innovation'],
      availability: 'Disponible pour stage/alternance'
    };

    this.init();
  }

  init() {
    this.createChatbot();
    this.setupEventListeners();
    this.loadWelcomeMessage();
  }

  createChatbot() {
    const chatbot = document.createElement('div');
    chatbot.className = 'simple-chatbot';
    chatbot.innerHTML = `
      <button class="chatbot-toggle" id="chatbot-toggle" title="Ouvrir le chatbot">
        💬
      </button>

      <div class="chatbot-window" id="chatbot-window">
        <div class="chatbot-header">
          <div class="chatbot-header-info">
            <div class="chatbot-avatar">🤖</div>
            <div>
              <h3>Assistant Portfolio</h3>
              <span class="chatbot-status">En ligne</span>
            </div>
          </div>
          <div class="chatbot-actions">
            <button class="chatbot-action-btn" id="chatbot-clear" title="Effacer">🗑️</button>
            <button class="chatbot-close" id="chatbot-close">✕</button>
          </div>
        </div>

        <div class="chatbot-messages" id="chatbot-messages"></div>

        <div class="chatbot-footer">
          <input type="text" class="chatbot-input" id="chatbot-input" placeholder="Posez-moi une question..." />
          <button class="chatbot-send" id="chatbot-send">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(chatbot);

    // Références
    this.toggle = document.getElementById('chatbot-toggle');
    this.window = document.getElementById('chatbot-window');
    this.close = document.getElementById('chatbot-close');
    this.messagesContainer = document.getElementById('chatbot-messages');
    this.input = document.getElementById('chatbot-input');
    this.sendBtn = document.getElementById('chatbot-send');
    this.clearBtn = document.getElementById('chatbot-clear');
  }

  setupEventListeners() {
    this.toggle.addEventListener('click', () => this.toggleChat());
    this.close.addEventListener('click', () => this.toggleChat());
    this.sendBtn.addEventListener('click', () => this.sendMessage());
    this.clearBtn.addEventListener('click', () => this.clearHistory());

    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.window.classList.add('open');
      this.toggle.classList.add('open');
      this.input.focus();
    } else {
      this.window.classList.remove('open');
      this.toggle.classList.remove('open');
    }
  }

  loadWelcomeMessage() {
    const welcomeMessage = `👋 Bonjour ! Je suis l'assistant virtuel d'IMAD.

Je peux répondre à vos questions sur :
• Compétences et formations
• Projets et expériences
• Certifications
• Contact et disponibilité

Comment puis-je vous aider ?`;

    this.addBotMessage(welcomeMessage, false);
  }

  async sendMessage() {
    const message = this.input.value.trim();
    if (!message) return;

    this.addUserMessage(message);
    this.input.value = '';

    // Ajouter à l'historique
    this.conversationHistory.push({
      role: 'user',
      content: message
    });

    // Afficher l'indicateur de typing
    this.showTypingIndicator();

    try {
      const response = await this.askClaude(message);
      this.hideTypingIndicator();
      this.addBotMessage(response, true);

      this.conversationHistory.push({
        role: 'assistant',
        content: response
      });
    } catch (error) {
      this.hideTypingIndicator();
      console.error('Erreur:', error);
      this.addBotMessage("Désolé, une erreur s'est produite. Veuillez réessayer.", true);
    }
  }

  async askClaude(userMessage) {
    // Si le backend est activé, essayer de l'utiliser
    if (this.useBackend) {
      try {
        return await this.askClaudeViaBackend(userMessage);
      } catch (error) {
        console.warn('Backend non disponible, utilisation des réponses locales');
        return this.getLocalResponse(userMessage);
      }
    }

    // Sinon, utiliser les réponses locales
    return this.getLocalResponse(userMessage);
  }

  async askClaudeViaBackend(userMessage) {
    const systemPrompt = `Tu es un assistant personnel pour IMAD, un étudiant en BTS SIO passionné par le développement web et la cybersécurité.

Informations sur IMAD:
- Nom: ${this.portfolioInfo.name}
- Formation: ${this.portfolioInfo.formation}
- Spécialisation: ${this.portfolioInfo.specialization}
- Compétences principales: ${this.portfolioInfo.skills.join(', ')}
- Passions: ${this.portfolioInfo.passions.join(', ')}
- Disponibilité: ${this.portfolioInfo.availability}

Réponds de manière concise, professionnelle et amicale. Si on te pose une question sur IMAD, réponds avec les informations ci-dessus. Sois naturel et engageant. Garde tes réponses courtes (2-3 paragraphes maximum).`;

    const response = await fetch(`${this.backendUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: this.conversationHistory.slice(-6),
        systemPrompt: systemPrompt
      })
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const data = await response.json();
    return data.message;
  }

  getLocalResponse(message) {
    const msg = message.toLowerCase();

    // Salutations
    if (msg.match(/bonjour|salut|hello|hey|hi|coucou/)) {
      return `Bonjour ! 👋 Je suis l'assistant virtuel d'${this.portfolioInfo.name}. Je peux vous renseigner sur son parcours, ses compétences, ses projets et ses coordonnées. Comment puis-je vous aider ?`;
    }

    // Identité
    if (msg.match(/qui es-tu|tu es qui|ton nom|qui êtes-vous|présente-toi|te présenter/)) {
      return `Je suis ${this.portfolioInfo.name}, étudiant en ${this.portfolioInfo.formation}, spécialisation ${this.portfolioInfo.specialization}. Je suis passionné par ${this.portfolioInfo.passions.join(', ')}. ${this.portfolioInfo.availability}.`;
    }

    // Compétences
    if (msg.match(/compétence|skill|langage|technologie|maîtrise|connaître|sais faire/)) {
      return `Je maîtrise plusieurs technologies :\n\n💻 **Langages** : ${this.portfolioInfo.skills.join(', ')}\n\nMes domaines d'expertise incluent le ${this.portfolioInfo.passions.join(', ')}. Je suis toujours en apprentissage continu pour rester à jour avec les dernières technologies.`;
    }

    // Formation
    if (msg.match(/formation|étude|diplôme|bts|sio|parcours|études/)) {
      return `Je suis actuellement en ${this.portfolioInfo.formation}, avec une spécialisation ${this.portfolioInfo.specialization}. Cette formation me permet d'acquérir des compétences solides en développement logiciel et gestion de projets informatiques.`;
    }

    // Projets
    if (msg.match(/projet|réalisation|travaux|portfolio|tp|mission/)) {
      return `Vous pouvez découvrir mes projets sur ce portfolio :\n\n📚 **Travaux Pratiques** : Projets académiques variés\n💼 **Missions** : Expériences professionnelles\n🎓 **Certifications** : Diplômes et formations\n\nN'hésitez pas à explorer les différentes sections pour voir mes réalisations en détail !`;
    }

    // Certifications
    if (msg.match(/certification|diplôme|attestation|formation|rgpd|anssi|cnil|cybersécurité/)) {
      return `J'ai obtenu plusieurs certifications :\n\n🔒 **Cybermalveillance** : Formation en cybersécurité\n🛡️ **SecNum Académie (ANSSI)** : Sécurité numérique\n📋 **RGPD (CNIL)** : Protection des données\n\nCes certifications témoignent de mon engagement dans la sécurité informatique et la protection des données.`;
    }

    // Contact
    if (msg.match(/contact|email|téléphone|joindre|contacter|coordonnée|écrire/)) {
      return `Vous pouvez me contacter via :\n\n📧 **Email** : Disponible sur la page contact\n💼 **LinkedIn** : Lien disponible dans le footer\n💻 **GitHub** : Retrouvez mes projets open source\n\nN'hésitez pas à me contacter pour toute opportunité de stage ou d'alternance !`;
    }

    // Disponibilité / Stage / Alternance
    if (msg.match(/disponible|stage|alternance|recrutement|embauche|poste|emploi/)) {
      return `${this.portfolioInfo.availability} ! 🎯\n\nJe recherche activement des opportunités pour mettre en pratique mes compétences en ${this.portfolioInfo.passions[0]}. Je suis motivé, curieux et prêt à m'investir dans de nouveaux projets.\n\nN'hésitez pas à me contacter pour discuter d'éventuelles collaborations !`;
    }

    // JavaScript
    if (msg.match(/javascript|js|react|node/)) {
      return `Oui, je maîtrise JavaScript ! 🚀\n\nC'est l'un de mes langages principaux. J'ai travaillé avec JavaScript vanilla, ainsi qu'avec des frameworks modernes comme React et Node.js pour créer des applications web interactives et performantes.`;
    }

    // Python
    if (msg.match(/python/)) {
      return `Oui, je connais Python ! 🐍\n\nC'est un langage polyvalent que j'utilise pour diverses applications : scripts d'automatisation, traitement de données, et développement web avec des frameworks comme Django ou Flask.`;
    }

    // PHP
    if (msg.match(/php|laravel|symfony/)) {
      return `Oui, je maîtrise PHP ! 🐘\n\nJ'ai de l'expérience en développement backend avec PHP, notamment pour créer des applications web dynamiques et des API. C'est un langage très utilisé dans le monde professionnel.`;
    }

    // Remerciements
    if (msg.match(/merci|thanks|cool|super|génial|parfait/)) {
      return `Avec plaisir ! 😊 N'hésitez pas si vous avez d'autres questions sur mon parcours ou mes compétences. Je suis là pour vous aider !`;
    }

    // Au revoir
    if (msg.match(/au revoir|bye|à bientôt|ciao|à plus/)) {
      return `Au revoir ! 👋 N'hésitez pas à revenir si vous avez d'autres questions. Bonne journée !`;
    }

    // Réponse par défaut
    return `Je peux vous renseigner sur :\n\n• 👨‍💻 Mes compétences et technologies\n• 🎓 Ma formation et mon parcours\n• 💼 Mes projets et expériences\n• 🎯 Mes certifications\n• 📞 Comment me contacter\n• 🚀 Ma disponibilité pour un stage/alternance\n\nQue souhaitez-vous savoir ?`;
  }

  addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
      <div class="message-content">${this.escapeHtml(text)}</div>
    `;
    this.messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();
  }

  addBotMessage(text, animate = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    if (animate) messageDiv.style.opacity = '0';

    messageDiv.innerHTML = `
      <div class="bot-avatar">🤖</div>
      <div class="message-content">${this.formatMessage(text)}</div>
    `;

    this.messagesContainer.appendChild(messageDiv);

    if (animate) {
      setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transition = 'opacity 0.3s ease';
      }, 100);
    }

    this.scrollToBottom();
  }

  showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'message bot-message typing-indicator';
    indicator.id = 'typing-indicator';
    indicator.innerHTML = `
      <div class="bot-avatar">🤖</div>
      <div class="message-content">
        <div class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
    this.messagesContainer.appendChild(indicator);
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
  }

  formatMessage(text) {
    // Convertir les retours à la ligne
    text = text.replace(/\n/g, '<br>');

    // Convertir les liens
    text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');

    return text;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  scrollToBottom() {
    setTimeout(() => {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }, 100);
  }

  clearHistory() {
    if (confirm('Effacer tout l\'historique de conversation ?')) {
      this.messagesContainer.innerHTML = '';
      this.conversationHistory = [];
      this.loadWelcomeMessage();
    }
  }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  window.chatbot = new SimpleChatbot();
  console.log('💬 Chatbot chargé avec Claude AI');
});
