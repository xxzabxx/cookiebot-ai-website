// Central API wrapper.
// Usage: import { api, setAuthToken } from '@/lib/api';
//        await api('/auth/me');  (auto‑prefixes with VITE_API_BASE)

const API_BASE = import.meta.env.VITE_API_BASE || 'https://cookiebot-ai-backend-production.up.railway.app/api';

export function getApiBase() {
  return API_BASE.replace(/\/$/, '');
}

export function setAuthToken(token) {
  if (token) localStorage.setItem('authToken', token);
  else localStorage.removeItem('authToken');
}

export async function api(endpoint, { skipAuth = false, parseJson = true, ...options } = {}) {
  const token = localStorage.getItem('authToken');

  const { headers: extraHeaders, ...rest } = options;
  const headers = {
    'Content-Type': 'application/json',
    ...(token && !skipAuth ? { Authorization: `Bearer ${token}` } : {}),
    ...extraHeaders,
  };

  const res = await fetch(`${getApiBase()}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`, {
    headers,
    ...rest,
  });

  let payload = null;
  if (parseJson) {
    try {
      payload = await res.clone().json();
    } catch {
      payload = null;
    }
  }

  if (!res.ok) {
    const msg =
      payload?.error?.message ??
      payload?.message ??
      res.statusText ??
      `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return payload;
}
