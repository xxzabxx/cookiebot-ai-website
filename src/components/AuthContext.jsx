import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import { api, setAuthToken } from '../lib/api';

// Create context
const AuthContext = createContext(null);

// Hook
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

export function AuthProvider({ children }) {
  // Boot/loading is the initial “figure out if I’m logged in” phase
  const [bootLoading, setBootLoading] = useState(true);
  // authLoading is for discrete auth actions (login, register, update)
  const [authLoading, setAuthLoading] = useState(false);

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Derived boolean
  const isAuthenticated = !!user;

  /**
   * Normalize API user response shape:
   * backend might return:
   *  { success:true, data:{ user:{...}, access_token?... } }
   * or sometimes { success:true, user:{...} }
   */
  function extractUser(payload) {
    if (!payload) return null;
    return (
      payload?.data?.user ||
      payload?.user ||
      // Fallback: if payload itself looks like a user (has email)
      (payload?.email ? payload : null)
    );
  }

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setUser(null);
      setBootLoading(false);
      return;
    }
    try {
      const payload = await api('/auth/me');
      setUser(extractUser(payload));
      setError(null);
    } catch (e) {
      // Invalid token – purge and reset silently
      setAuthToken(null);
      setUser(null);
      console.warn('loadUser(): token invalid or expired:', e.message);
    } finally {
      setBootLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Generic action wrapper to consolidate spinner + error behavior
  async function runAuthAction(fn) {
    setAuthLoading(true);
    setError(null);
    try {
      return await fn();
    } catch (e) {
      setError(e.message || 'Operation failed');
      return { success: false, error: e.message };
    } finally {
      setAuthLoading(false);
    }
  }

  const login = (email, password) =>
    runAuthAction(async () => {
      const payload = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        skipAuth: true
      });
      const data = payload?.data || payload;
      if (data?.access_token) setAuthToken(data.access_token);
      setUser(extractUser(data));
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
      if (data?.access_token) setAuthToken(data.access_token);
      setUser(extractUser(data));
      return { success: true };
    });

  const updateProfile = (profileData) =>
    runAuthAction(async () => {
      await api('/auth/me', {
        method: 'PUT',
        body: JSON.stringify(profileData)
      });
      // Reload after update
      await loadUser();
      return { success: true };
    });

  const testConnection = async () => {
    try {
      const health = await api('/health', { skipAuth: true });
      return {
        success: true,
        message: `✅ Backend Connected!
Status: ${health.status}
Database: ${health.database}`
      };
    } catch (e) {
      return {
        success: false,
        message: `❌ Connection Failed!
Error: ${e.message}`
      };
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    setError(null);
  };

  const clearError = () => setError(null);

  const value = {
    user,
    isAuthenticated,
    bootLoading,     // initial auth boot
    authLoading,     // current auth action
    error,
    login,
    register,
    logout,
    updateProfile,
    testConnection,
    loadUser,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthProvider;
