import React, { useState, useEffect, useCallback } from 'react';
import {
  X, Mail, Lock, User, Building, Eye, EyeOff, Loader2
} from 'lucide-react';
import { useAuth } from './AuthContext';

/**
 * AuthModal (aligned with new AuthContext exposing: login, register,
 * authLoading, bootLoading, error, clearError, isAuthenticated)
 *
 * Props:
 *  - isOpen (boolean)
 *  - onClose (function)
 *  - initialMode ('login' | 'register')
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

  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    company: ''
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [localError, setLocalError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [submitting, setSubmitting] = useState(false); // local guard to avoid double submits

  // Unified busy flag (covers boot + auth + local submit)
  const busy = authLoading || bootLoading || submitting;

  // Reset mode when modal opens (if caller changes initialMode)
  useEffect(() => {
    if (isOpen) setMode(initialMode);
  }, [initialMode, isOpen]);

  // Clean up when closed
  useEffect(() => {
    if (!isOpen) resetForm(false);
  }, [isOpen]);

  // Auto-close if already authenticated on login screen
  useEffect(() => {
    if (isOpen && isAuthenticated && mode === 'login' && !authLoading && !bootLoading) {
      setSuccessMsg('Logged in!');
      const t = setTimeout(() => {
        handleClose();
      }, 600);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isOpen, mode, authLoading, bootLoading]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const esc = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [isOpen]);

  // Validation
  const validate = useCallback(() => {
    const errs = {};
    const email = formData.email.trim();
    if (!email) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Email is invalid';

    if (!formData.password) errs.password = 'Password is required';
    else if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters';

    if (mode === 'register') {
      if (!formData.first_name.trim()) errs.first_name = 'First name required';
      if (!formData.last_name.trim()) errs.last_name = 'Last name required';
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }, [formData, mode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: '' }));
    if (localError) setLocalError('');
    if (successMsg) setSuccessMsg('');
    if (contextError && clearError) clearError();
  };

  const resetForm = (clearMessages = true) => {
    setFormData({
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      company: ''
    });
    setFieldErrors({});
    if (clearMessages) {
      setLocalError('');
      setSuccessMsg('');
      if (contextError && clearError) clearError();
    }
    setShowPassword(false);
    setSubmitting(false);
  };

  const switchMode = () => {
    setMode(m => (m === 'login' ? 'register' : 'login'));
    setFormData(prev => ({
      email: prev.email, // keep email for convenience
      password: '',
      first_name: '',
      last_name: '',
      company: ''
    }));
    setFieldErrors({});
    setLocalError('');
    setSuccessMsg('');
    if (contextError && clearError) clearError();
  };

  const handleClose = () => {
    resetForm();
    onClose && onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setLocalError('');
    setSuccessMsg('');
    if (contextError && clearError) clearError();

    if (!validate()) return;

    setSubmitting(true);
    try {
      let result;
      if (mode === 'login') {
        result = await login(formData.email.trim(), formData.password);
      } else {
        result = await register({
          email: formData.email.trim(),
          password: formData.password,
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
          company: formData.company.trim()
        });
      }
      if (result?.success) {
        setSuccessMsg(mode === 'login' ? 'Login successful!' : 'Registration successful!');
        // Close after a brief delay
        setTimeout(() => {
          handleClose();
        }, 1000);
      } else if (result?.error) {
        setLocalError(result.error);
      } else {
        setLocalError('Unexpected server response.');
      }
    } catch (err) {
      setLocalError(err.message || 'Unexpected error');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose(); // click backdrop
      }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600 mt-1 text-sm">
              {mode === 'login'
                ? 'Sign in to your CookieBot.ai account'
                : 'Start using AI-powered consent & monetization'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close authentication modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'register' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        fieldErrors.first_name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Jane"
                      autoComplete="given-name"
                      disabled={busy}
                    />
                  </div>
                  {fieldErrors.first_name && (
                    <p className="text-xs text-red-500 mt-1">{fieldErrors.first_name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        fieldErrors.last_name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Doe"
                      autoComplete="family-name"
                      disabled={busy}
                    />
                  </div>
                  {fieldErrors.last_name && (
                    <p className="text-xs text-red-500 mt-1">{fieldErrors.last_name}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company (Optional)
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Company"
                    autoComplete="organization"
                    disabled={busy}
                  />
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  fieldErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={busy}
              />
            </div>
            {fieldErrors.email && (
              <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  fieldErrors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="••••••••"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                disabled={busy}
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="text-xs text-red-500 mt-1">{fieldErrors.password}</p>
            )}
          </div>

          {/* Messages */}
          {(contextError || localError || successMsg) && (
            <div
              className={`p-3 rounded-lg text-sm border ${
                successMsg
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}
            >
              {successMsg || localError || contextError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {busy ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
              </>
            ) : (
              (mode === 'login' ? 'Sign In' : 'Create Account')
            )}
          </button>

            {/* Switch */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-gray-600">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                type="button"
                onClick={switchMode}
                className="text-blue-600 hover:text-blue-700 font-semibold"
                disabled={busy}
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
