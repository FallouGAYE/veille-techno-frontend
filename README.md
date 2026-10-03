# Veille Techno Frontend - Kanban

Application frontend réalisée dans le cadre d'un projet de veille technologique.

Le projet permet d'expérimenter React et Next.js à travers une interface Kanban connectée à une API backend.

## Technologies

- React
- Next.js
- TypeScript
- Axios
- CSS

## Fonctionnalités

- Inscription et connexion
- Affichage du tableau Kanban
- Affichage des colonnes
- Ajout d'une colonne
- Ajout d'une tâche
- Modification d'une tâche
- Suppression d'une tâche
- Communication avec l'API backend

## Structure du projet

```text
app/
├── board/
├── components/
│   ├── KanbanColumn.tsx
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── TaskCard.tsx
├── login/
├── register/
└── services/
    ├── api.service.ts
    ├── auth.service.ts
    ├── cards.service.ts
    └── lists.service.ts
```

## Installation

Installer les dépendances :

```bash
npm install
```

Lancer le frontend :

```bash
npm run dev -- -p 3001
```

Puis ouvrir :

```text
http://localhost:3001
```

## Backend

Le frontend communique avec l'API backend disponible sur :

```text
http://localhost:3000/api
```

Les appels HTTP sont regroupés dans le dossier `services` et utilisent Axios.

## Auteur

Fallou Gaye
