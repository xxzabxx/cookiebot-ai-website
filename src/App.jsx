import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Features from './pages/Features';
import Scan from './pages/Scan';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AuthModal from './components/auth/AuthModal';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/" replace />;
};

// Main App Content
const AppContent = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <Routes>
        {/* Public Routes with Layout */}
        <Route path="/" element={
          <Layout onShowAuth={() => setShowAuthModal(true)}>
            <Landing onShowAuth={() => setShowAuthModal(true)} />
          </Layout>
        } />
        
        <Route path="/features" element={
          <Layout onShowAuth={() => setShowAuthModal(true)}>
            <Features />
          </Layout>
        } />
        
        <Route path="/scan" element={
          <Layout onShowAuth={() => setShowAuthModal(true)}>
            <Scan />
          </Layout>
        } />
        
        <Route path="/about" element={
          <Layout onShowAuth={() => setShowAuthModal(true)}>
            <About />
          </Layout>
        } />
        
        <Route path="/contact" element={
          <Layout onShowAuth={() => setShowAuthModal(true)}>
            <Contact />
          </Layout>
        } />
        
        <Route path="/privacy" element={
          <Layout onShowAuth={() => setShowAuthModal(true)}>
            <PrivacyPolicy />
          </Layout>
        } />
        
        <Route path="/terms" element={
          <Layout onShowAuth={() => setShowAuthModal(true)}>
            <TermsOfService />
          </Layout>
        } />

        {/* Protected Dashboard Route (No Layout - has its own) */}
        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;

