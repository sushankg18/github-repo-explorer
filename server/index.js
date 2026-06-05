require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

app.use(cors());
app.use(express.json());

const github = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 15000,
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'repo-explorer-app',
    ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
  },
});

app.get('/api/health', (_req, res) => {
  res.json({ success: true, status: 'ok', uptime: process.uptime() });
});

app.get('/api/github/:username', async (req, res) => {
  const { username } = req.params;

  if (!username || !/^[A-Za-z0-9-]{1,39}$/.test(username)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid username. Use letters, digits, or hyphens (max 39 chars).',
    });
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      github.get(`/users/${username}`),
      github.get(`/users/${username}/repos`, {
        params: { per_page: 100, sort: 'updated', type: 'owner' },
      }),
    ]);

    const user = userRes.data;
    const repos = (reposRes.data || []).map((r) => ({
      id: r.id,
      name: r.name,
      full_name: r.full_name,
      description: r.description,
      html_url: r.html_url,
      language: r.language,
      stargazers_count: r.stargazers_count,
      forks_count: r.forks_count,
      open_issues_count: r.open_issues_count,
      watchers_count: r.watchers_count,
      topics: r.topics || [],
      visibility: r.visibility || (r.private ? 'private' : 'public'),
      fork: r.fork,
      archived: r.archived,
      pushed_at: r.pushed_at,
      updated_at: r.updated_at,
      created_at: r.created_at,
    }));

    return res.json({
      success: true,
      user: {
        id: user.id,
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
        bio: user.bio,
        company: user.company,
        location: user.location,
        blog: user.blog,
        twitter_username: user.twitter_username,
        email: user.email,
        public_repos: user.public_repos,
        public_gists: user.public_gists,
        followers: user.followers,
        following: user.following,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
      repos,
    });
  } catch (err) {
    const status = err.response?.status || 500;
    const message =
      status === 404
        ? `GitHub user "${username}" not found.`
        : status === 403
        ? 'GitHub API rate limit reached. Try again later or set GITHUB_TOKEN.'
        : err.message || 'Unexpected server error.';

    return res.status(status).json({ success: false, error: message });
  }
});

app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[repo-explorer] API listening on http://localhost:${PORT}`);
});
