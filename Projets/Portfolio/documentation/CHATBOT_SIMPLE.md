# 💬 Chatbot Simple avec Claude AI

## Vue d'ensemble

Un chatbot classique et épuré, connecté à Claude 3.5 Sonnet pour des réponses intelligentes et contextuelles.

## Caractéristiques

### ✅ Fonctionnalités incluses

- **Chat en temps réel** : Conversations fluides avec Claude AI
- **Design classique** : Interface épurée et professionnelle
- **Historique** : Mémorisation des 6 derniers messages pour le contexte
- **Bouton d'effacement** : Supprimer l'historique de conversation
- **Indicateur de typing** : Animation pendant que Claude réfléchit
- **Responsive** : S'adapte aux mobiles et tablettes

### ❌ Fonctionnalités supprimées

Pour un chatbot plus simple et performant, les fonctionnalités suivantes ont été retirées :
- Easter eggs
- Reconnaissance vocale
- Synthèse vocale
- Export de conversations
- Recherche dans l'historique
- Auto-complétion
- Mode sombre / Mode compact
- Analytics détaillées
- Réactions sur les messages
- Bouton de configuration API (clé intégrée directement)

## Configuration

### Clé API Claude

La clé API est intégrée directement dans le code pour simplifier l'utilisation :

```javascript
this.apiKey = 'sk-ant-api03-...';
```

**Important** : Pour des raisons de sécurité, cette clé ne devrait pas être exposée publiquement. Considérez :
- Utiliser des variables d'environnement
- Mettre en place un backend proxy
- Limiter les domaines autorisés dans la console Anthropic

## Utilisation

### Pour les utilisateurs

1. Cliquez sur le bouton **💬** en bas à droite
2. Tapez votre question dans le champ de saisie
3. Appuyez sur Entrée ou cliquez sur le bouton d'envoi
4. Claude répondra de manière intelligente

### Questions suggérées

- "Quelles sont tes compétences ?"
- "Parle-moi de tes projets"
- "Tu as des certifications ?"
- "Comment te contacter ?"
- "Ton parcours BTS SIO"

## Personnalisation

### Informations du portfolio

Modifiez les informations dans `portfolioInfo` :

```javascript
this.portfolioInfo = {
  name: 'IMAD',
  formation: 'BTS SIO - Services Informatiques aux Organisations',
  specialization: 'SLAM',
  skills: ['JavaScript', 'Python', 'PHP', 'HTML/CSS', 'React', 'Node.js'],
  passions: ['développement web', 'cybersécurité', 'innovation'],
  availability: 'Disponible pour stage/alternance'
};
```

### Styles CSS

Le chatbot utilise des classes préfixées par `.simple-chatbot` pour éviter les conflits CSS.

Personnalisation des couleurs principales :

```css
/* Couleur du bouton et header */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Couleur de fond des messages */
background: #f8f9fa;
```

## Structure des fichiers

```
js/
  └── chatbot-simple.js    # Logique du chatbot
css/
  └── style.css           # Styles (section CHATBOT SIMPLE)
docs/
  └── CHATBOT_SIMPLE.md   # Cette documentation
```

## Technologies utilisées

- **Claude 3.5 Sonnet** : IA conversationnelle d'Anthropic
- **Vanilla JavaScript** : Aucune dépendance externe
- **CSS moderne** : Flexbox, animations, gradients
- **API Fetch** : Communication avec l'API Claude

## Modèle Claude

- **Modèle** : `claude-3-5-sonnet-20241022`
- **Max tokens** : 500 (réponses courtes et concises)
- **Historique** : 6 derniers messages pour le contexte
- **System prompt** : Personnalisé avec les infos du portfolio

## Performance

- **Poids** : ~8 KB (JS minifié)
- **Dépendances** : Aucune
- **Temps de réponse** : ~2-3 secondes (selon l'API Claude)
- **Cache** : Aucun (chaque message appelle l'API)

## Limites

- Nécessite une connexion internet
- Consomme des tokens Claude (facturation par token)
- Pas de fallback vers réponses locales en cas d'erreur réseau
- Historique non persisté (perdu au rechargement de page)

## Support

Pour toute question ou problème :
- Vérifiez que la clé API est valide
- Consultez la console du navigateur pour les erreurs
- Vérifiez votre quota API sur console.anthropic.com

## Version

- **Version actuelle** : 1.0
- **Date** : Janvier 2026
- **Auteur** : IMAD
