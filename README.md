# GitHub Repo Explorer

A full-stack GitHub Repository Explorer built with React, Chakra UI, Node.js, and Express.

The application allows users to search for any public GitHub profile, view profile information, explore repositories, and analyze language usage through a clean and responsive interface.

## Features

- Search any GitHub username
- View profile details (avatar, bio, followers, following, repositories)
- Browse repositories with stars, forks, language, and last updated date
- Sort repositories by stars, recent updates, or name
- Language analytics chart
- Recent searches stored in localStorage
- Responsive design for desktop, tablet, and mobile

## Tech Stack

### Frontend
- React
- Vite
- Chakra UI
- Axios

### Backend
- Node.js
- Express.js
- Axios

## Getting Started

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## API Endpoint

```http
GET /api/github/:username
```

Example:

```http
GET /api/github/torvalds
```

## Challenges

- Handling GitHub API rate limits
- Managing loading and error states
- Creating reusable and responsive UI components

## Future Improvements

- Repository pagination
- Search suggestions
- Dark/Light theme toggle
- Advanced repository filters

## Author

Sushank

Built as part of the Studio Graphene Associate Software Engineer assignment.