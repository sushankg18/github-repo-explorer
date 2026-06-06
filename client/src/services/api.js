import axios from 'axios';

const api = axios.create({
  baseURL: 'https://github-repo-explorer-665e.onrender.com/api',
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Fetch GitHub profile + repositories for a username.
 * @param {string} username
 * @returns {Promise<{ success: boolean, user: object, repos: object[] }>}
 */
export async function fetchGithubUser(username) {
  const clean = String(username || '').trim().replace(/^@/, '');
  if (!clean) throw new Error('Please enter a GitHub username.');

  try {
    const { data } = await api.get(`/github/${encodeURIComponent(clean)}`);
    return data;
  } catch (err) {
    const message =
      err.response?.data?.error ||
      err.message ||
      'Failed to load data from the server.';
    throw new Error(message);
  }
}

export default api;
