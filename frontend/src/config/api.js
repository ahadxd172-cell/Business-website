// Centralized API configuration
// Reads from Vite environment variable when deployed (e.g. on Vercel),
// and defaults to local backend (http://localhost:5000) during development.

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Remove trailing slash if user accidentally enters it in Vercel environment variables
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

// Full API endpoint base (e.g. 'https://my-backend.onrender.com/api' or 'http://localhost:5000/api')
export const API_BASE = `${API_BASE_URL}/api`;
