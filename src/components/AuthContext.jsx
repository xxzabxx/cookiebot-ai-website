import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef
} from 'react';
import { api, setAuthToken } from '../lib/api';

/**
 * AuthContext
 *  - Handles authentication state, token persistence, and user profile updates.
 *  - Exposes: user, isAuthenticated(), bootLoading, authLoading, error, login, register,
 *             logout, updateProfile, loadUser, testConnection, clearError.
 *
 * Endpoints assumed (relative to API base inside api helper):
 *   POST /auth/login      -> { access_token, user? } OR { data:{ access_token, user } }
 *   POST /auth/register   -> similar to login
 *   GET  /auth/me         -> user object (possibly wrapped)
 *   PUT  /auth/me         -> update user
 *   GET  /health          -> health info (skipAuth)
 */

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
};

const tokenKey = 'authToken';

const getToken = () => {
  try {
    return localStorage.getItem(tokenKey) || null;
  } catch {
    return null;
  }
};

const saveToken = (token) => {
  try {
    if (token) localStorage.setItem(tokenKey, token);
    else localStorage.removeItem(tokenKey);
  } catch {
    /* ignore storage errors */
  }
};

// Extract a user object from various possible backend response shapes
const extractUser = (payload) => {
  if (!payload) return null;
  return (
    payload?.data?.user ||
    payload?.user ||
    (payload?.email ? payload : null)
  );
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bootLoading, setBootLoading] = useState(true);   // initial auth detection
  const [authLoading, setAuthLoading] = useState(false);  // active auth operation (login/register/update)
  const [error, setError] = useState(null);

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const safeSet = (setter) => (...args) => {
    if (mountedRef.current) setter(...args);
  };
  const safeSetUser = safeSet(setUser);
  const safeSetError = safeSet(setError);
  const safeSetBootLoading = safeSet(setBootLoading);
  const safeSetAuthLoading = safeSet(setAuthLoading);

  const loadUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      safeSetUser(null);
      safeSetBootLoading(false);
      return;
    }
    try {
      const payload = await api('/auth/me');
      safeSetUser(extractUser(payload));
      safeSetError(null);
    } catch (e) {
      console.warn('Auth loadUser failed, clearing token:', e.message);
      setAuthToken(null);
      saveToken(null);
      safeSetUser(null);
    } finally {
      safeSetBootLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const clearError = useCallback(() => safeSetError(null), []);

  const runAuthAction = async (fn) => {
    safeSetAuthLoading(true);
    clearError();
    try {
      return await fn();
    } catch (e) {
      const msg = e.message || 'Operation failed';
      safeSetError(msg);
      return { success: false, error: msg };
    } finally {
      safeSetAuthLoading(false);
    }
  };

  const login = (email, password) =>
    runAuthAction(async () => {
      const payload = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        skipAuth: true
      });
      const data = payload?.data || payload;
      if (data?.access_token) {
        setAuthToken(data.access_token);
        saveToken(data.access_token);
      }
      safeSetUser(extractUser(data));
      return { success: true };
    });

  const register = (formData) =>
    runAuthAction(async () => {
      const payload = await api('/auth/register', {
        method: 'POST',
        body: JSON.stringify(formData),
        skipAuth: true
      });
      const data = payload?.data || payload;
      if (data?.access_token) {
        setAuthToken(data.access_token);
        saveToken(data.access_token);
      }
      safeSetUser(extractUser(data));
      return { success: true };
    });

  const updateProfile = (profileData) =>
    runAuthAction(async () => {
      await api('/auth/me', {
        method: 'PUT',
        body: JSON.stringify(profileData)
      });
      await loadUser();
      return { success: true };
    });

  const logout = () => {
    setAuthToken(null);
    saveToken(null);
    safeSetUser(null);
    safeSetError(null);
  };

  const testConnection = async () => {
    try {
      const health = await api('/health', { skipAuth: true });
      return {
        success: true,
        message: `Backend OK (status: ${health.status || 'unknown'})`
      };
    } catch (e) {
      return { success: false, message: e.message || 'Health check failed' };
    }
  };

  const isAuthenticated = useCallback(
    () => !!user && !!getToken(),
    [user]
  );

  const value = {
    user,
    error,
    clearError,
    bootLoading,
    authLoading,
    login,
    register,
    updateProfile,
    logout,
    loadUser,
    testConnection,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
