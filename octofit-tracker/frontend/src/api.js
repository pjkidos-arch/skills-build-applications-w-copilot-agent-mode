// Helper to construct API BASE using GitHub Codespaces environment variable
const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME || '';

export const API_BASE = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : `${window.location.protocol}//${window.location.hostname}:8000/api`;

export const endpoints = {
  activities: `${API_BASE}/activities/`,
  teams: `${API_BASE}/teams/`,
  leaderboard: `${API_BASE}/leaderboard/`,
  users: `${API_BASE}/users/`,
};

export default endpoints;
