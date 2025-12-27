# Charly Shop

Bienvenue sur Charly Shop, une boutique en ligne élégante spécialisée dans les accessoires de mode et les vêtements pour hommes et femmes. Ce projet est une application web front-end pure, conçue pour offrir une expérience utilisateur fluide et moderne.
https://charly-shop.vercel.app/

## Description

Charly Shop est une plateforme de e-commerce qui met en avant des collections soigneusement sélectionnées. Les principales fonctionnalités incluent :

- **Navigation Intuitive** : Une interface claire avec des pages dédiées pour les collections hommes et femmes.
- **Galeries de Produits** : Des pages de produits dynamiques avec des galeries d'images et des descriptions détaillées.
- **Panier d'Achat Interactif** : Un panier d'achat accessible depuis n'importe quelle page, permettant aux utilisateurs d'ajouter, de modifier et de supprimer des articles.
- **Intégration WhatsApp** : Un processus de commande finalisé via une redirection vers WhatsApp avec un message pré-rempli.

## Comment Lancer le Projet

Ce projet ne nécessite pas de backend ni de processus de build complexe. Pour le lancer, suivez ces étapes simples :

1. **Clonez le Dépôt** :

   ```bash
   git clone https://github.com/your-username/charly-shop.git
   ```

2. **Ouvrez le Fichier `index.html`** :

   - Naviguez jusqu'au répertoire du projet.
   - Ouvrez le fichier `index.html` directement dans votre navigateur web.

Et voilà ! Le site devrait être entièrement fonctionnel.

## Structure des Fichiers

Le projet est organisé de manière logique pour séparer les différentes préoccupations (HTML, CSS, JavaScript).

```
.
├── css/
│   ├── style.css         # Styles globaux du site
│   └── responsive.css    # Styles pour les appareils mobiles
│
├── images/
│   └── products/         # Contient les images des produits
│       ├── femmes/
│       └── hommes/
│
├── js/
│   ├── cart.js           # Gère la logique du panier d'achat
│   ├── main.js           # Scripts principaux (menu, notifications, etc.)
│   ├── products.js       # Contient les données des produits
│   ├── renderProducts.js # Fonction pour afficher les produits dynamiquement
│   ├── page-specific.js  # Scripts spécifiques à chaque page
│   ├── product-slider.js # Gère les sliders de produits
│   └── navbar.js         # Logique pour la barre de navigation
│
├── contact.html          # Page de contact
├── femmes.html           # Page des produits pour femmes
├── hommes.html           # Page des produits pour hommes
├── index.html            # Page d'accueil
└── produits.html         # Page de présentation des catégories
```

## Technologies Utilisées

- **HTML5**
- **CSS3** (avec des variables pour une gestion facile des thèmes)
- **JavaScript (ES6+)**

Aucune dépendance externe n'est requise, à l'exception des polices Google Fonts et de Font Awesome pour les icônes. 
