import React, { useState, useEffect } from 'react'
import {
  X,
  Mail,
  Lock,
  User,
  Building,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react'
import { useAuth } from './AuthContext'

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    company: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [submitMessage, setSubmitMessage] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const { login, register, loading, error, setError, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isOpen) setMode(initialMode)
  }, [initialMode, isOpen])

  useEffect(() => {
    if (!isOpen) resetForm(false)
  }, [isOpen])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }))
    if (submitMessage) setSubmitMessage('')
    if (successMsg) setSuccessMsg('')
    if (error) setError(null)
  }

  const validateForm = () => {
    const errs = {}
    if (!formData.email) {
      errs.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Email is invalid'
    }
    if (!formData.password) {
      errs.password = 'Password is required'
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters'
    }
    if (mode === 'register') {
      if (!formData.first_name) errs.first_name = 'First name is required'
      if (!formData.last_name) errs.last_name = 'Last name is required'
    }
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitMessage('')
    setSuccessMsg('')
    setError(null)
    if (!validateForm()) return

    try {
      let result
      if (mode === 'login') {
        result = await login(formData.email, formData.password)
      } else {
        result = await register({
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          company: formData.company
        })
      }

      if (result.success) {
        setSuccessMsg(result.message || (mode === 'login' ? 'Login successful!' : 'Registration successful!'))
        setTimeout(() => {
          handleClose()
        }, 1200)
      } else {
        setSubmitMessage(result.error || 'Authentication failed')
      }
    } catch (err) {
      setSubmitMessage(err.message || 'Unexpected error occurred')
    }
  }

  const resetForm = (clearMessages = true) => {
    setFormData({
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      company: ''
    })
    setFormErrors({})
    if (clearMessages) {
      setSubmitMessage('')
      setSuccessMsg('')
      setError(null)
    }
    setShowPassword(false)
  }

  const switchMode = () => {
    setMode(prev => (prev === 'login' ? 'register' : 'login'))
    resetForm()
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={mode === 'login' ? 'Login form' : 'Registration form'}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600 mt-1 text-sm">
              {mode === 'login'
                ? 'Sign in to your CookieBot.ai account'
                : 'Join thousands of websites earning revenue'}
            </p>
          </div>
          <button
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.first_name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="John"
                      autoComplete="given-name"
                    />
                  </div>
                  {formErrors.first_name && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.first_name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.last_name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Doe"
                      autoComplete="family-name"
                    />
                  </div>
                  {formErrors.last_name && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.last_name}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company (Optional)
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Company"
                    autoComplete="organization"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="john@example.com"
                autoComplete="email"
              />
            </div>
            {formErrors.email && (
              <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="••••••••"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {formErrors.password && (
              <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
            )}
          </div>

          {/* Messages */}
          {(error || submitMessage || successMsg) && (
            <div
              className={`p-3 rounded-lg text-sm border ${
                successMsg
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : (error || submitMessage)
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : 'bg-gray-50 text-gray-700 border-gray-200'
              }`}
            >
              {successMsg || error || submitMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
              </>
            ) : (
              mode === 'login' ? 'Sign In' : 'Create Account'
            )}
          </button>

          {/* Switch mode */}
          <div className="text-center pt-4 border-t">
            <p className="text-gray-600 text-sm">
              {mode === 'login'
                ? "Don't have an account?"
                : 'Already have an account?'}
              <button
                type="button"
                onClick={switchMode}
                className="ml-2 text-blue-600 hover:text-blue-700 font-semibold"
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthModal
