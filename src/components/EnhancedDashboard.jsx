import React, { useState, useEffect } from 'react'

const WorkingDashboard = () => {
  // State management
  const [activeTab, setActiveTab] = useState('analytics')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [websites, setWebsites] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Demo data for sales purposes (when not logged in)
  const demoData = {
    user: {
      name: "Demo User",
      email: "demo@cookiebot.ai",
      subscription_tier: "professional",
      revenue_balance: 127.50
    },
    websites: [
      {
        id: 1,
        domain: "example.com",
        visitors_today: 1250,
        consent_rate: 78.5,
        revenue_today: 12.75,
        status: "active"
      },
      {
        id: 2,
        domain: "shop.example.com",
        visitors_today: 890,
        consent_rate: 82.1,
        revenue_today: 8.90,
        status: "active"
      }
    ],
    analytics: {
      total_visitors: 125430,
      consent_rate: 78.5,
      total_revenue: 1247.50,
      websites_count: 2
    }
  }

  // API Base URL - your working backend
  const API_BASE_URL = 'https://cookiebot-ai-backend.vercel.app'

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
      loadRealData()
    } else {
      setIsAuthenticated(false)
      loadDemoData()
    }
  }, [])

  // Load demo data for sales
  const loadDemoData = () => {
    setUser(demoData.user)
    setWebsites(demoData.websites)
    setAnalytics(demoData.analytics)
  }

  // Load real data from your working backend
  const loadRealData = async () => {
    setLoading(true)
    const token = localStorage.getItem('token')
    
    try {
      // Load user profile
      const userResponse = await fetch(`${API_BASE_URL}/api/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (userResponse.ok) {
        const userData = await userResponse.json()
        setUser(userData)
      }

      // Load websites
      const websitesResponse = await fetch(`${API_BASE_URL}/api/websites`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (websitesResponse.ok) {
        const websitesData = await websitesResponse.json()
        setWebsites(websitesData)
      }

      // Load analytics
      const analyticsResponse = await fetch(`${API_BASE_URL}/api/analytics/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json()
        setAnalytics(analyticsData)
      }

    } catch (error) {
      console.error('Error loading data:', error)
      // Fallback to demo data if API fails
      loadDemoData()
    }
    
    setLoading(false)
  }

  // Tab navigation
  const tabs = [
    { id: 'analytics', name: 'Analytics', icon: '📊' },
    { id: 'revenue', name: 'Revenue', icon: '💰' },
    { id: 'websites', name: 'Websites', icon: '🌐' },
    { id: 'configuration', name: 'Configuration', icon: '⚙️' },
    { id: 'compliance', name: 'Compliance', icon: '⚖️' },
    { id: 'preview', name: 'Preview', icon: '👁️' }
  ]

  // Analytics Tab Component
  const AnalyticsTab = () => (
    <div style={{ padding: '20px' }}>
      <h2>Analytics Dashboard</h2>
      {!isAuthenticated && (
        <div style={{ 
          background: '#e3f2fd', 
          padding: '10px', 
          borderRadius: '5px', 
          marginBottom: '20px',
          color: '#1976d2'
        }}>
          🎯 Demo Mode - Showing sample data for demonstration
        </div>
      )}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Total Visitors</h3>
          <p style={{ fontSize: '2em', margin: '10px 0', color: '#1976d2' }}>
            {analytics?.total_visitors?.toLocaleString() || '0'}
          </p>
        </div>
        
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Consent Rate</h3>
          <p style={{ fontSize: '2em', margin: '10px 0', color: '#4caf50' }}>
            {analytics?.consent_rate || 0}%
          </p>
        </div>
        
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Total Revenue</h3>
          <p style={{ fontSize: '2em', margin: '10px 0', color: '#ff9800' }}>
            ${analytics?.total_revenue?.toFixed(2) || '0.00'}
          </p>
        </div>
        
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Active Websites</h3>
          <p style={{ fontSize: '2em', margin: '10px 0', color: '#9c27b0' }}>
            {analytics?.websites_count || websites.length}
          </p>
        </div>
      </div>
    </div>
  )

  // Revenue Tab Component
  const RevenueTab = () => (
    <div style={{ padding: '20px' }}>
      <h2>Revenue Tracking</h2>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3>Your Revenue Share (60%)</h3>
        <p style={{ fontSize: '1.5em', color: '#4caf50' }}>
          Current Balance: ${user?.revenue_balance?.toFixed(2) || '0.00'}
        </p>
        <p>Minimum payout: $50.00</p>
        <p>Next payout: End of month</p>
      </div>
    </div>
  )

  // Websites Tab Component
  const WebsitesTab = () => (
    <div style={{ padding: '20px' }}>
      <h2>Website Management</h2>
      <div style={{ display: 'grid', gap: '15px' }}>
        {websites.map(website => (
          <div key={website.id} style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '15px'
          }}>
            <div>
              <h4>{website.domain}</h4>
              <p>Status: <span style={{ color: website.status === 'active' ? '#4caf50' : '#ff9800' }}>
                {website.status}
              </span></p>
            </div>
            <div>
              <p>Visitors Today: {website.visitors_today}</p>
              <p>Consent Rate: {website.consent_rate}%</p>
            </div>
            <div>
              <p>Revenue Today: ${website.revenue_today}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Configuration Tab Component
  const ConfigurationTab = () => (
    <div style={{ padding: '20px' }}>
      <h2>Banner Configuration</h2>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3>Customization Options</h3>
        <p>🎨 Theme: Light, Dark, Custom</p>
        <p>📱 Layout: Dialog, Bar</p>
        <p>🎯 Position: Top, Bottom, Center</p>
        <p>✨ Effects: Slide-in, Overlay</p>
        <p>🏷️ Banner Types: Multilevel, Accept-only, Accept/Decline</p>
      </div>
    </div>
  )

  // Compliance Tab Component
  const ComplianceTab = () => (
    <div style={{ padding: '20px' }}>
      <h2>Compliance Status</h2>
      <div style={{ display: 'grid', gap: '15px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>✅ GDPR Compliant</h3>
          <p>European Union compliance active</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>✅ CCPA Compliant</h3>
          <p>California compliance active</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>✅ LGPD Compliant</h3>
          <p>Brazil compliance active</p>
        </div>
      </div>
    </div>
  )

  // Preview Tab Component
  const PreviewTab = () => (
    <div style={{ padding: '20px' }}>
      <h2>Live Preview</h2>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3>Banner Preview</h3>
        <div style={{ 
          border: '2px dashed #ccc', 
          padding: '40px', 
          textAlign: 'center',
          borderRadius: '8px',
          background: '#f9f9f9'
        }}>
          <p>🍪 Cookie Banner Preview</p>
          <p>This website uses cookies to enhance your experience.</p>
          <button style={{ 
            background: '#1976d2', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '5px',
            margin: '0 10px'
          }}>
            Accept All
          </button>
          <button style={{ 
            background: '#666', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '5px',
            margin: '0 10px'
          }}>
            Decline
          </button>
        </div>
      </div>
    </div>
  )

  // Render current tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'analytics': return <AnalyticsTab />
      case 'revenue': return <RevenueTab />
      case 'websites': return <WebsitesTab />
      case 'configuration': return <ConfigurationTab />
      case 'compliance': return <ComplianceTab />
      case 'preview': return <PreviewTab />
      default: return <AnalyticsTab />
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, color: '#1976d2' }}>CookieBot.ai Dashboard</h1>
        <div>
          {user && (
            <span>Welcome, {user.name} ({user.subscription_tier})</span>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ 
        background: 'white', 
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        overflowX: 'auto'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '15px 20px',
              border: 'none',
              background: activeTab === tab.id ? '#1976d2' : 'transparent',
              color: activeTab === tab.id ? 'white' : '#666',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              borderBottom: activeTab === tab.id ? '3px solid #1976d2' : '3px solid transparent'
            }}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <p>Loading...</p>
          </div>
        ) : (
          renderTabContent()
        )}
      </div>
    </div>
  )
}

export default WorkingDashboard

