import React, { useState, useCallback, useEffect } from 'react';
import {
  X, Mail, Lock, User, Building, Eye, EyeOff, Loader2
} from 'lucide-react';
import { useAuth } from './AuthContext';

/**
 * AuthModal
 * Supports login + registration.
 * Relies on AuthContext exposing:
 *  - login(email, password) -> { success, error? }
 *  - register(data) -> { success, error? }
 *  - authLoading (boolean) : active auth action
 *  - bootLoading (boolean) : initial app auth check
 *  - error (context-wide auth error)
 *  - clearError() to reset context error
 */
const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const {
    login,
    register,
    authLoading = false,
    bootLoading = false,
    error: contextError,
    clearError,
    isAuthenticated
  } = useAuth();

  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    company: ''
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');
  const [formError, setFormError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Unified busy flag (either boot init or current auth action)
  const busy = authLoading || bootLoading;

  // Close automatically if already authenticated *and* modal is open (e.g., user opened modal after being logged in)
  useEffect(() => {
    if (isAuthenticated && isOpen && mode === 'login' && !authLoading && !bootLoading) {
      // Small delay to allow success message (if any) to render
      setTimeout(() => {
        handleClose();
      }, 400);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // ---- Validation ----
  const validate = useCallback(() => {
    const errors = {};

    const email = formData.email.trim();
    const password = formData.password;

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'register') {
      if (!formData.first_name.trim()) {
        errors.first_name = 'First name is required';
      }
      if (!formData.last_name.trim()) {
        errors.last_name = 'Last name is required';
      }
    }

    setFieldErrors(errors);
    return { valid: Object.keys(errors).length === 0, errors };
  }, [formData, mode]);

  // ---- Input change handler ----
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear per-field error
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Clear global messages as user edits
    if (formError) setFormError(null);
    if (successMsg) setSuccessMsg(null);
    if (submitMessage) setSubmitMessage('');
    if (contextError && clearError) clearError();
  };

  // ---- Switch mode ----
  const switchMode = () => {
    const next = mode === 'login' ? 'register' : 'login';
    setMode(next);
    // Only reset fields that differ / or keep email if switching to register?
    setFormData(prev => ({
      email: prev.email, // keep email so user doesn't retype
      password: '',
      first_name: '',
      last_name: '',
      company: ''
    }));
    setFieldErrors({});
    setFormError(null);
    setSuccessMsg(null);
    setSubmitMe
