import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { api } from '../lib/api';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false, error: null, validationErrors: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false, validationErrors: null };
    case 'SET_VALIDATION_ERROR':
      return { ...state, error: action.payload, validationErrors: action.validationErrors, loading: false };
    case 'LOGOUT':
      return { user: null, loading: false, error: null, validationErrors: null };
    case 'CLEAR_ERROR':
      return { ...state, error: null, validationErrors: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: true,
    error: null,
    validationErrors: null,
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return;
      }

      // Handle demo login
      if (token === 'demo_token_123') {
        const demoUser = {
          id: 1,
          email: 'demo@cookiebot.ai',
          first_name: 'Demo',
          last_name: 'User',
          company: 'CookieBot.ai',
          subscription_tier: 'basic',
          created_at: new Date().toISOString()
        };
        dispatch({ type: 'SET_USER', payload: demoUser });
        return;
      }

      api.setToken(token);
      const response = await api.getCurrentUser();
      dispatch({ type: 'SET_USER', payload: response.data.user });
    } catch (error) {
      console.error('Failed to load user:', error);
      localStorage.removeItem('authToken');
      api.setToken(null);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await api.login(credentials);
      const { user, access_token } = response.data;
      
      api.setToken(access_token);
      dispatch({ type: 'SET_USER', payload: user });
      
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await api.register(userData);
      const { user, access_token } = response.data;
      
      api.setToken(access_token);
      dispatch({ type: 'SET_USER', payload: user });
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      
      // Enhanced error handling for validation errors
      let errorMessage = error.message;
      let validationErrors = null;
      
      // Check if this is a validation error with detailed information
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        
        // Handle validation errors from backend
        if (errorData.validation_errors) {
          validationErrors = errorData.validation_errors;
          errorMessage = 'Please fix the validation errors below';
          
          dispatch({ 
            type: 'SET_VALIDATION_ERROR', 
            payload: errorMessage,
            validationErrors: validationErrors
          });
          
          return { 
            success: false, 
            error: errorMessage, 
            validationErrors: validationErrors 
          };
        }
        
        // Handle other structured error responses
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      }
      
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      api.setToken(null);
      dispatch({ type: 'LOGOUT' });
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await api.updateProfile(profileData);
      dispatch({ type: 'SET_USER', payload: response.data.user });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    loadUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

