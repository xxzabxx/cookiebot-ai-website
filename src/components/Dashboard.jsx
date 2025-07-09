import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { 
  BarChart3, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Settings, 
  Globe, 
  Palette, 
  Shield, 
  Code, 
  Eye,
  Plus,
  Trash2,
  Copy,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  User,
  LogIn,
  Crown,
  Zap
} from 'lucide-react'
import { useAuth } from './AuthContext.jsx'
import AuthModal from './AuthModal.jsx'

const API_BASE_URL = 'https://cookiebot-ai-backend.vercel.app'

// Demo/Fake data for non-logged-in users
const DEMO_DATA = {
  user: {
    first_name: "Demo",
    last_name: "User",
    email: "demo@example.com",
    subscription_plan: "Professional"
  },
  stats: {
    revenue: 1234.56,
    visitors: 12543,
    consent_rate: 87.3,
    websites: 3
  },
  websites: [
    {
      id: 1,
      domain: "example.com",
      status: "active",
      visitors_today: 1250,
      consent_rate: 89.2,
      revenue_today: 45.67
    },
    {
      id: 2,
      domain: "mystore.com", 
      status: "active",
      visitors_today: 890,
      consent_rate: 85.1,
      revenue_today: 32.10
    },
    {
      id: 3,
      domain: "blog.example.com",
      status: "pending",
      visitors_today: 456,
      consent_rate: 91.5,
      revenue_today: 18.90
    }
  ],
  recentActivity: [
    { id: 1, action: "New consent", domain: "example.com", time: "2 minutes ago", revenue: "$2.45" },
    { id: 2, action: "Website added", domain: "mystore.com", time: "1 hour ago", revenue: "$0.00" },
    { id: 3, action: "Revenue payout", domain: "All sites", time: "2 hours ago", revenue: "$156.78" },
    { id: 4, action: "Consent updated", domain: "blog.example.com", time: "3 hours ago", revenue: "$1.23" }
  ]
}

const EnhancedDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAuthModal, setShowAuthModal] = useState(false)
  
  // Real data state
  const [userData, setUserData] = useState(null)
  const [websites, setWebsites] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [newWebsite, setNewWebsite] = useState('')

  const { user, isAuthenticated } = useAuth()

  // Determine if we're in demo mode or real mode
  const isDemoMode = !isAuthenticated()
  const displayData = isDemoMode ? DEMO_DATA : {
    user: userData || user,
    stats: analytics || { revenue: 0, visitors: 0, consent_rate: 0, websites: websites.length },
    websites: websites,
    recentActivity: []
  }

  // API helper function
  const apiCall = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      ...options
    })
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }
    
    return response.json()
  }

  // Load real data when user is authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      loadUserData()
    }
  }, [isAuthenticated])

  const loadUserData = async () => {
    try {
      setIsLoading(true)
      setError('')
      
      // Load user profile, websites, and analytics in parallel
      const [profileRes, websitesRes, analyticsRes] = await Promise.all([
        apiCall('/api/user/profile'),
        apiCall('/api/websites'),
        apiCall('/api/analytics/dashboard')
      ])
      
      setUserData(profileRes.user)
      setWebsites(websitesRes.websites || [])
      setAnalytics(analyticsRes)
      
    } catch (err) {
      console.error('Failed to load user data:', err)
      setError('Failed to load user data. Using demo mode.')
    } finally {
      setIsLoading(false)
    }
  }

  const testAPI = async () => {
    try {
      setIsLoading(true)
      const response = await apiCall('/api/health')
      alert(`✅ Backend Connected! Status: ${response.status}`)
    } catch (err) {
      alert(`❌ Backend Error: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const addWebsite = async () => {
    if (!newWebsite.trim()) return
    
    if (isDemoMode) {
      alert('Sign up to add real websites to your account!')
      setShowAuthModal(true)
      return
    }

    try {
      setIsLoading(true)
      const response = await apiCall('/api/websites', {
        method: 'POST',
        body: JSON.stringify({ domain: newWebsite.trim() })
      })
      
      setWebsites([...websites, response.website])
      setNewWebsite('')
    } catch (err) {
      setError(`Failed to add website: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const removeWebsite = async (websiteId) => {
    if (isDemoMode) {
      alert('Sign up to manage real websites!')
      setShowAuthModal(true)
      return
    }

    try {
      setIsLoading(true)
      await apiCall(`/api/websites/${websiteId}`, { method: 'DELETE' })
      setWebsites(websites.filter(w => w.id !== websiteId))
    } catch (err) {
      setError(`Failed to remove website: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const DemoModeIndicator = () => (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Eye className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900">Demo Mode - Simulated Data</h3>
            <p className="text-sm text-blue-700">Sign up to see your real website data and start earning revenue!</p>
          </div>
        </div>
        <Button 
          onClick={() => setShowAuthModal(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Crown className="h-4 w-4 mr-2" />
          Get Real Data
        </Button>
      </div>
    </div>
  )

  const StatCard = ({ title, value, icon: Icon, change, isDemo = false }) => (
    <Card className="relative">
      {isDemo && (
        <Badge className="absolute -top-2 -right-2 bg-blue-100 text-blue-700 text-xs">
          Demo
        </Badge>
      )}
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {change}
              </p>
            )}
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'websites', label: 'Websites', icon: Globe },
    { id: 'layout', label: 'Layout', icon: Eye },
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'compliance', label: 'Compliance', icon: Shield },
    { id: 'integration', label: 'Integration', icon: Code }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {displayData.user?.first_name || 'User'}!
            </h1>
            <p className="text-gray-600">
              {isDemoMode 
                ? "This is a demo of your CookieBot.ai dashboard with simulated data"
                : "Manage your cookie consent platform and track your revenue"
              }
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {isDemoMode ? (
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign Up for Real Data
              </Button>
            ) : (
              <Button onClick={testAPI} variant="outline" disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Test API
              </Button>
            )}
          </div>
        </div>

        {/* Demo Mode Indicator */}
        {isDemoMode && <DemoModeIndicator />}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-800">{error}</span>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value={`$${displayData.stats.revenue.toFixed(2)}`}
                icon={DollarSign}
                change="+12.5% from last month"
                isDemo={isDemoMode}
              />
              <StatCard
                title="Total Visitors"
                value={displayData.stats.visitors.toLocaleString()}
                icon={Users}
                change="+8.2% from last month"
                isDemo={isDemoMode}
              />
              <StatCard
                title="Consent Rate"
                value={`${displayData.stats.consent_rate}%`}
                icon={TrendingUp}
                change="+2.1% from last month"
                isDemo={isDemoMode}
              />
              <StatCard
                title="Active Websites"
                value={displayData.stats.websites}
                icon={Globe}
                change="+1 this month"
                isDemo={isDemoMode}
              />
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    {isDemoMode ? "Simulated recent activity" : "Your latest consent and revenue events"}
                  </CardDescription>
                </div>
                {isDemoMode && (
                  <Badge className="bg-blue-100 text-blue-700">Demo Data</Badge>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(displayData.recentActivity || DEMO_DATA.recentActivity).map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.domain} • {activity.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{activity.revenue}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {isDemoMode && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-blue-900">Want to see your real activity?</p>
                        <p className="text-sm text-blue-700">Sign up to track your actual consent events and revenue</p>
                      </div>
                      <Button 
                        onClick={() => setShowAuthModal(true)}
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-purple-600"
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Get Started
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'websites' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Management</CardTitle>
                <CardDescription>
                  {isDemoMode 
                    ? "Demo websites with simulated data - sign up to add your real websites"
                    : "Add and manage your websites with cookie consent integration"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-6">
                  <Input
                    placeholder="Enter website domain (e.g., example.com)"
                    value={newWebsite}
                    onChange={(e) => setNewWebsite(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addWebsite()}
                  />
                  <Button onClick={addWebsite} disabled={isLoading}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Website
                  </Button>
                </div>

                <div className="space-y-4">
                  {displayData.websites.map((website) => (
                    <div key={website.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Globe className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{website.domain}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Status: {website.status}</span>
                            <span>Visitors: {website.visitors_today}</span>
                            <span>Consent: {website.consent_rate}%</span>
                            <span>Revenue: ${website.revenue_today}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isDemoMode && (
                          <Badge className="bg-blue-100 text-blue-700 text-xs">Demo</Badge>
                        )}
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Code
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => removeWebsite(website.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {isDemoMode && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-blue-900">Ready to add your real websites?</p>
                        <p className="text-sm text-blue-700">Sign up to manage your actual websites and start earning revenue</p>
                      </div>
                      <Button 
                        onClick={() => setShowAuthModal(true)}
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-purple-600"
                      >
                        <Crown className="h-4 w-4 mr-2" />
                        Upgrade Now
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Other tabs would show similar demo/real data patterns */}
        {activeTab !== 'dashboard' && activeTab !== 'websites' && (
          <Card>
            <CardHeader>
              <CardTitle className="capitalize">{activeTab} Settings</CardTitle>
              <CardDescription>
                {isDemoMode 
                  ? `Demo ${activeTab} configuration - sign up to customize your real settings`
                  : `Configure your ${activeTab} settings`
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Configuration
                </h3>
                <p className="text-gray-600 mb-6">
                  {isDemoMode 
                    ? `Sign up to access ${activeTab} customization options`
                    : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} settings will be available here`
                  }
                </p>
                {isDemoMode && (
                  <Button 
                    onClick={() => setShowAuthModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign Up to Customize
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="register"
      />
    </div>
  )
}

export default EnhancedDashboard
