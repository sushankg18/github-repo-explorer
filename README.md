# Repo Explorer

A production-ready GitHub Repository Explorer built with **React + Chakra UI v2** on the frontend and **Node.js + Express + Axios** on the backend.

Modern dark GitHub-inspired design with profile, repository grid, language analytics donut chart, and recent searches.

## Project structure

```
github-repo-explorer/
├── server/                 # Express + Axios API
│   ├── index.js
│   ├── package.json
│   └── .env.example
└── client/                 # React + Chakra UI v2 + Vite
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── theme.js
        ├── components/
        │   ├── Card.jsx
        │   ├── ErrorState.jsx
        │   ├── Hero.jsx
        │   ├── LanguageChart.jsx
        │   ├── Navbar.jsx
        │   ├── RecentSearches.jsx
        │   ├── RepositoryCard.jsx
        │   ├── RepositoryGrid.jsx
        │   └── UserProfileCard.jsx
        └── services/
            ├── api.js
            └── languages.js
```

## Quick start

Run **two terminals** — one for the API, one for the React app.

### 1. Backend

```bash
cd server
cp .env.example .env          # optional: add a GITHUB_TOKEN
npm install
npm start                      # http://localhost:5000
```

### 2. Frontend

```bash
cd client
npm install
npm run dev                    # http://localhost:5173
```

The Vite dev server proxies `/api/*` to the backend on port 5000.

## API

`GET /api/github/:username` returns:

```json
{
  "success": true,
  "user":  { "...": "GitHub user profile" },
  "repos": [ { "...": "Sanitized repository fields" } ]
}
```

Errors include `{ success: false, error: "..." }` with appropriate status codes.

## Features

- Search any GitHub username from the navbar
- User profile card (avatar, bio, company, location, blog, stats)
- 2-column repository grid with hover lift animation
- Sort by stars, recently updated, or name (A–Z)
- Donut chart for language breakdown
- Recent searches persisted in `localStorage`
- Loading skeletons, inline error banners, empty states
- Fully responsive: 3-column desktop, 2-column tablet, single-column mobile with a hamburger drawer

## Tech stack

- React 18, Vite
- Chakra UI v2, Emotion, Framer Motion
- React Icons
- Axios
- Express 4

## Notes

GitHub's unauthenticated REST API allows **60 requests/hour per IP**. Set `GITHUB_TOKEN` in `server/.env` to bump that to **5,000/hour** (no scopes required for public data).
