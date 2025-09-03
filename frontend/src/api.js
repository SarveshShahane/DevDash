// Central API utility for frontend
// Usage: import api from './api'; then use api.get('github/username')

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = {
  get: (endpoint, options = {}) => fetch(`${API_BASE}/${endpoint}`, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) => fetch(`${API_BASE}/${endpoint}`, {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    body: JSON.stringify(body)
  }),
  // Add put, delete, etc. as needed
};

export default api;
