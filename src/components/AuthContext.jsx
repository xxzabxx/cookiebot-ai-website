import React, { createContext, useContext, useState, useEffect } from 'react'

// API Configuration
const API_BASE_URL = 'https://cookiebot-ai-backend-production.up.railway.app'

// Create Auth Context
const AuthContext = createContext()

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // API helper function
  const apiCall = async (endpoint, options = {}) => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
          ...options.headers
        },
        ...options
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API call failed:', error)
      throw error
    }
  }

  // Load user data on app start
  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('authToken')
      
      if (!token) {
        setLoading(false)
        return
      }

      const userData = await apiCall('/api/auth/me')
      setUser(userData)
      setError(null)
    } catch (error) {
      console.error('Failed to load user:', error)
      // Clear invalid token
      localStorage.removeItem('authToken')
      setUser(null)
      setError('Session expired. Please login again.')
    } finally {
      setLoading(false)
    }
  }

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiCall('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      })
      
      // Store token and load user data
      localStorage.setItem('authToken', response.access_token)
      await loadUser()
      
      return { success: true, message: 'Registration successful!' }
    } catch (error) {
      setError(error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiCall('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
      
      // Store token and load user data
      localStorage.setItem('authToken', response.access_token)
      await loadUser()
      
      return { success: true, message: 'Login successful!' }
    } catch (error) {
      setError(error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken')
    setUser(null)
    setError(null)
  }

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      setLoading(true)
      setError(null)
      
      await apiCall('/api/auth/me', {
        method: 'PUT',
        body: JSON.stringify(profileData)
      })
      
      // Reload user data
      await loadUser()
      
      return { success: true, message: 'Profile updated successfully!' }
    } catch (error) {
      setError(error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Test API connection
  const testConnection = async () => {
    try {
      const health = await apiCall('/api/health')
      return { 
        success: true, 
        message: `✅ Backend Connected!\nStatus: ${health.status}\nDatabase: ${health.database}` 
      }
    } catch (error) {
      return { 
        success: false, 
        message: `❌ Connection Failed!\nError: ${error.message}` 
      }
    }
  }

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('authToken')
  }

  // Context value
  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
    testConnection,
    isAuthenticated,
    loadUser,
    setError
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
