import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import AuthModal from './AuthModal'
import { Loader2, Shield } from 'lucide-react'

const ProtectedRoute = ({ children, fallback = null }) => {
  const { user, loading, isAuthenticated } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [hasChecked, setHasChecked] = useState(false)

  useEffect(() => {
    if (!loading) {
      setHasChecked(true)
      if (!isAuthenticated()) {
        setShowAuthModal(true)
      }
    }
  }, [loading, isAuthenticated])

  // Show loading spinner while checking authentication
  if (loading || !hasChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show authentication modal if not authenticated
  if (!isAuthenticated()) {
    return (
      <>
        {fallback || (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto p-8">
              <Shield className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Authentication Required
              </h2>
              <p className="text-gray-600 mb-6">
                Please sign in to access your CookieBot.ai dashboard and manage your cookie consent platform.
              </p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
              >
                Sign In to Continue
              </button>
            </div>
          </div>
        )}
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode="login"
        />
      </>
    )
  }

  // User is authenticated, render the protected content
  return children
}

export default ProtectedRoute

