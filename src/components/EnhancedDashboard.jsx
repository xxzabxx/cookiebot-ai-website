import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Switch } from '@/components/ui/switch.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import {
  Cookie,
  DollarSign,
  Users,
  Globe,
  Settings,
  BarChart3,
  Shield,
  Palette,
  Code,
  Eye,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Copy,
  Download,
  Upload,
  Zap,
  Layout,
  Smartphone,
  Monitor,
  Tablet,
  Brush,
  MousePointer,
  ToggleLeft,
  FileText,
  Scale,
  Sparkles,
  Star
} from 'lucide-react'

// API Configuration - Updated to use live backend
const API_BASE_URL = 'https://cookiebot-ai-backend.vercel.app'

// API Helper Functions
const apiCall = async (endpoint, options = {}) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      },
      ...options
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API call failed:', error)
    throw error
  }
}

// Mock data for demonstration (will be replaced with real API data when authenticated)
const mockAnalytics = {
  totalVisitors: 125430,
  consentRate: 78.5,
  dailyConsents: [
    { date: '2025-07-01', consents: 1250, revenue: 45.20 },
    { date: '2025-07-02', consents: 1380, revenue: 52.10 },
    { date: '2025-07-03', consents: 1420, revenue: 48.90 },
    { date: '2025-07-04', consents: 1650, revenue: 61.30 },
    { date: '2025-07-05', consents: 1580, revenue: 58.70 },
    { date: '2025-07-06', consents: 1720, revenue: 67.80 },
    { date: '2025-07-07', consents: 1890, revenue: 74.20 }
  ],
  consentCategories: [
    { name: 'Necessary', value: 100, color: '#10b981' },
    { name: 'Preferences', value: 65, color: '#3b82f6' },
    { name: 'Statistics', value: 82, color: '#f59e0b' },
    { name: 'Marketing', value: 45, color: '#ef4444' }
  ]
}

const mockWebsites = [
  {
    id: 1,
    domain: 'example.com',
    status: 'active',
    visitors_today: 1250,
    consent_rate: 78.5,
    revenue_today: 45.20,
    created_at: '2025-07-01T10:00:00Z'
  }
]

const mockUser = {
  id: 1,
  email: 'demo@cookiebot.ai',
  name: 'Demo User',
  company: 'Demo Company',
  subscription_tier: 'professional',
  revenue_balance: 234.56,
  created_at: '2025-07-01T10:00:00Z'
}

const EnhancedDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [websites, setWebsites] = useState([])
  const [analytics, setAnalytics] = useState(mockAnalytics)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Configuration state
  const [config, setConfig] = useState({
    companyName: 'Your Company',
    companyLogo: '',
    layout: 'dialog',
    position: 'bottom',
    theme: 'light',
    customColors: {
      background: '#ffffff',
      text: '#1f2937',
      accent: '#3b82f6',
      button: '#10b981'
    },
    buttonStyle: 'default',
    bannerType: 'multilevel',
    compliance: {
      gdpr: true,
      ccpa: true,
      lgpd: false
    },
    affiliateAds: true,
    consentExpiry: 365
  })

  const [previewDevice, setPreviewDevice] = useState('desktop')

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
    
    if (token) {
      // User is authenticated - load real data
      loadUserData()
      loadWebsites()
      loadAnalytics()
    } else {
      // User is not authenticated - show demo data for sales
      setUser(mockUser)
      setWebsites(mockWebsites)
      setAnalytics(mockAnalytics)
      setLoading(false)
    }
  }, [])

  const loadUserData = async () => {
    try {
      setLoading(true)
      const userData = await apiCall('/api/user/profile')
      setUser(userData)
      if (userData.company) {
        setConfig(prev => ({ ...prev, companyName: userData.company }))
      }
    } catch (error) {
      console.error('Failed to load user data:', error)
      setError('Failed to load user data')
      // Fallback to demo data if API fails
      setUser(mockUser)
    } finally {
      setLoading(false)
    }
  }

  const loadWebsites = async () => {
    try {
      const websitesData = await apiCall('/api/websites')
      setWebsites(websitesData)
    } catch (error) {
      console.error('Failed to load websites:', error)
      // Fallback to demo data if API fails
      setWebsites(mockWebsites)
    }
  }

  const loadAnalytics = async () => {
    try {
      const analyticsData = await apiCall('/api/analytics/dashboard')
      setAnalytics({
        ...prev,
        totalVisitors: analyticsData.events_today || prev.totalVisitors,
        activeWebsites: analyticsData.website_count || prev.activeWebsites,
        affiliateRevenue: analyticsData.revenue_balance || prev.affiliateRevenue
      })
    } catch (error) {
      console.error('Failed to load analytics:', error)
      // Keep using mock analytics data if API fails
    }
  }

  const addWebsite = async (websiteData) => {
    try {
      const newWebsite = await apiCall('/api/websites', {
        method: 'POST',
        body: JSON.stringify(websiteData)
      })
      setWebsites(prev => [...prev, newWebsite])
      return newWebsite
    } catch (error) {
      console.error('Failed to add website:', error)
      throw error
    }
  }

  const generateIntegrationCode = (website) => {
    const baseUrl = window.location.origin
    return `<script src="${baseUrl}/src/cookiebot-ai.js"
        data-cbid="${website.id}"
        data-company-name="${config.companyName}"
        data-layout="${config.layout}"
        data-position="${config.position}"
        data-theme="${config.theme}"
        ${config.theme === 'custom' ? `data-custom-colors='${JSON.stringify(config.customColors)}'` : ''}
        data-button-style="${config.buttonStyle}"
        data-banner-type="${config.bannerType}"
        data-affiliate-ads="${config.affiliateAds}"
        data-gdpr="${config.compliance.gdpr}"
        data-ccpa="${config.compliance.ccpa}"
        data-lgpd="${config.compliance.lgpd}"
        data-consent-expiry="${config.consentExpiry}">
</script>`
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isAuthenticated ? 'Dashboard' : 'Demo Dashboard'}
              </h1>
              <p className="text-gray-600">
                {isAuthenticated 
                  ? `Welcome back, ${user?.name || 'User'}!`
                  : 'Experience the power of CookieBot.ai with live demo data'
                }
              </p>
            </div>
            {!isAuthenticated && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Demo Mode
              </Badge>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="websites" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Websites
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="design" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Design
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Compliance
            </TabsTrigger>
            <TabsTrigger value="integration" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Integration
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalVisitors?.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Consent Rate</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.consentRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    +2.1% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Websites</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{websites.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {isAuthenticated ? 'Your websites' : 'Demo websites'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${user?.revenue_balance?.toFixed(2) || '0.00'}</div>
                  <p className="text-xs text-muted-foreground">
                    {isAuthenticated ? 'Available for payout' : 'Demo revenue'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Consents & Revenue</CardTitle>
                  <CardDescription>
                    Consent trends and revenue generation over the last 7 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analytics.dailyConsents}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="consents" fill="#3b82f6" />
                      <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Consent Categories</CardTitle>
                  <CardDescription>
                    Breakdown of consent types across all websites
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analytics.consentCategories}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {analytics.consentCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest consent events and system updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: '2 minutes ago', event: 'New consent recorded', website: 'example.com', type: 'success' },
                    { time: '15 minutes ago', event: 'Website configuration updated', website: 'demo.com', type: 'info' },
                    { time: '1 hour ago', event: 'Revenue milestone reached', website: 'All websites', type: 'success' },
                    { time: '3 hours ago', event: 'New website added', website: 'newsite.com', type: 'info' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.event}</p>
                        <p className="text-xs text-gray-500">{activity.website} • {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Websites Tab */}
          <TabsContent value="websites" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Websites</h2>
                <p className="text-gray-600">Manage your connected websites and their performance</p>
              </div>
              {isAuthenticated && (
                <Button>
                  <Globe className="h-4 w-4 mr-2" />
                  Add Website
                </Button>
              )}
            </div>

            <div className="grid gap-6">
              {websites.map((website) => (
                <Card key={website.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Globe className="h-5 w-5" />
                          {website.domain}
                        </CardTitle>
                        <CardDescription>
                          Added {new Date(website.created_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge variant={website.status === 'active' ? 'default' : 'secondary'}>
                        {website.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {website.visitors_today?.toLocaleString() || '0'}
                        </div>
                        <div className="text-sm text-gray-500">Visitors Today</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {website.consent_rate?.toFixed(1) || '0.0'}%
                        </div>
                        <div className="text-sm text-gray-500">Consent Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          ${website.revenue_today?.toFixed(2) || '0.00'}
                        </div>
                        <div className="text-sm text-gray-500">Revenue Today</div>
                      </div>
                    </div>
                    
                    {isAuthenticated && (
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Analytics
                        </Button>
                        <Button variant="outline" size="sm">
                          <Code className="h-4 w-4 mr-2" />
                          Integration Code
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {!isAuthenticated && (
              <Card className="border-dashed border-2 border-gray-300">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Globe className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Ready to add your websites?
                  </h3>
                  <p className="text-gray-600 text-center mb-4">
                    Sign up to start managing your cookie consent and generating revenue
                  </p>
                  <Button>
                    Get Started Free
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Layout Tab */}
          <TabsContent value="layout" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Layout Configuration</h2>
              <p className="text-gray-600">Customize the appearance and positioning of your cookie consent banner</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Banner Layout</CardTitle>
                  <CardDescription>Choose how your consent banner appears</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Layout Type</Label>
                    <Select value={config.layout} onValueChange={(value) => setConfig(prev => ({ ...prev, layout: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dialog">Dialog (Floating Window)</SelectItem>
                        <SelectItem value="bar">Bar (Full Width)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Position</Label>
                    <Select value={config.position} onValueChange={(value) => setConfig(prev => ({ ...prev, position: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top">Top</SelectItem>
                        <SelectItem value="bottom">Bottom</SelectItem>
                        {config.layout === 'dialog' && (
                          <>
                            <SelectItem value="center">Center</SelectItem>
                            <SelectItem value="top-left">Top Left</SelectItem>
                            <SelectItem value="top-right">Top Right</SelectItem>
                            <SelectItem value="bottom-left">Bottom Left</SelectItem>
                            <SelectItem value="bottom-right">Bottom Right</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Banner Type</Label>
                    <Select value={config.bannerType} onValueChange={(value) => setConfig(prev => ({ ...prev, bannerType: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multilevel">Multilevel (Detailed Options)</SelectItem>
                        <SelectItem value="accept-only">Accept Only</SelectItem>
                        <SelectItem value="accept-decline">Accept/Decline</SelectItem>
                        <SelectItem value="ccpa">CCPA Compliance</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>See how your banner will look</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Button
                        variant={previewDevice === 'desktop' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPreviewDevice('desktop')}
                      >
                        <Monitor className="h-4 w-4 mr-2" />
                        Desktop
                      </Button>
                      <Button
                        variant={previewDevice === 'tablet' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPreviewDevice('tablet')}
                      >
                        <Tablet className="h-4 w-4 mr-2" />
                        Tablet
                      </Button>
                      <Button
                        variant={previewDevice === 'mobile' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPreviewDevice('mobile')}
                      >
                        <Smartphone className="h-4 w-4 mr-2" />
                        Mobile
                      </Button>
                    </div>

                    <div className={`border rounded-lg overflow-hidden ${
                      previewDevice === 'desktop' ? 'aspect-video' :
                      previewDevice === 'tablet' ? 'aspect-[4/3]' : 'aspect-[9/16]'
                    }`}>
                      <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
                        <div className="text-gray-400 text-sm">Website Preview</div>
                        
                        {/* Mock Banner Preview */}
                        <div className={`absolute ${
                          config.layout === 'dialog' 
                            ? config.position === 'center' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' :
                              config.position === 'bottom' ? 'bottom-4 left-4 right-4' :
                              config.position === 'top' ? 'top-4 left-4 right-4' :
                              config.position === 'bottom-right' ? 'bottom-4 right-4' :
                              config.position === 'bottom-left' ? 'bottom-4 left-4' :
                              config.position === 'top-right' ? 'top-4 right-4' :
                              config.position === 'top-left' ? 'top-4 left-4' : 'bottom-4 left-4'
                            : config.position === 'top' ? 'top-0 left-0 right-0' : 'bottom-0 left-0 right-0'
                        } ${
                          config.layout === 'dialog' ? 'max-w-sm' : 'w-full'
                        } bg-white border shadow-lg rounded p-4`}>
                          <div className="text-sm font-medium mb-2">🍪 Cookie Consent</div>
                          <div className="text-xs text-gray-600 mb-3">
                            We use cookies to enhance your experience.
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="text-xs">Accept</Button>
                            <Button variant="outline" size="sm" className="text-xs">Decline</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Design Tab */}
          <TabsContent value="design" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Design Customization</h2>
              <p className="text-gray-600">Customize colors, themes, and visual elements</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Theme & Colors</CardTitle>
                  <CardDescription>Choose a theme or create custom colors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Theme</Label>
                    <Select value={config.theme} onValueChange={(value) => setConfig(prev => ({ ...prev, theme: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {config.theme === 'custom' && (
                    <div className="space-y-3">
                      <div>
                        <Label>Background Color</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={config.customColors.background}
                            onChange={(e) => setConfig(prev => ({
                              ...prev,
                              customColors: { ...prev.customColors, background: e.target.value }
                            }))}
                            className="w-12 h-10"
                          />
                          <Input
                            value={config.customColors.background}
                            onChange={(e) => setConfig(prev => ({
                              ...prev,
                              customColors: { ...prev.customColors, background: e.target.value }
                            }))}
                            placeholder="#ffffff"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Text Color</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={config.customColors.text}
                            onChange={(e) => setConfig(prev => ({
                              ...prev,
                              customColors: { ...prev.customColors, text: e.target.value }
                            }))}
                            className="w-12 h-10"
                          />
                          <Input
                            value={config.customColors.text}
                            onChange={(e) => setConfig(prev => ({
                              ...prev,
                              customColors: { ...prev.customColors, text: e.target.value }
                            }))}
                            placeholder="#1f2937"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Accent Color</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={config.customColors.accent}
                            onChange={(e) => setConfig(prev => ({
                              ...prev,
                              customColors: { ...prev.customColors, accent: e.target.value }
                            }))}
                            className="w-12 h-10"
                          />
                          <Input
                            value={config.customColors.accent}
                            onChange={(e) => setConfig(prev => ({
                              ...prev,
                              customColors: { ...prev.customColors, accent: e.target.value }
                            }))}
                            placeholder="#3b82f6"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Button Color</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={config.customColors.button}
                            onChange={(e) => setConfig(prev => ({
                              ...prev,
                              customColors: { ...prev.customColors, button: e.target.value }
                            }))}
                            className="w-12 h-10"
                          />
                          <Input
                            value={config.customColors.button}
                            onChange={(e) => setConfig(prev => ({
                              ...prev,
                              customColors: { ...prev.customColors, button: e.target.value }
                            }))}
                            placeholder="#10b981"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label>Button Style</Label>
                    <Select value={config.buttonStyle} onValueChange={(value) => setConfig(prev => ({ ...prev, buttonStyle: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default (CTA Style)</SelectItem>
                        <SelectItem value="solid">Solid (Equal Weight)</SelectItem>
                        <SelectItem value="outline">Outline (Minimal)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Company Branding</CardTitle>
                  <CardDescription>Add your company information and logo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Company Name</Label>
                    <Input
                      value={config.companyName}
                      onChange={(e) => setConfig(prev => ({ ...prev, companyName: e.target.value }))}
                      placeholder="Your Company Name"
                    />
                  </div>

                  <div>
                    <Label>Company Logo URL</Label>
                    <Input
                      value={config.companyLogo}
                      onChange={(e) => setConfig(prev => ({ ...prev, companyLogo: e.target.value }))}
                      placeholder="https://example.com/logo.png"
                    />
                  </div>

                  <div className="pt-4">
                    <Label>Preview</Label>
                    <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                      <div className="flex items-center gap-3">
                        {config.companyLogo ? (
                          <img src={config.companyLogo} alt="Logo" className="w-8 h-8 object-contain" />
                        ) : (
                          <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center">
                            <Building className="h-4 w-4 text-gray-500" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-sm">{config.companyName}</div>
                          <div className="text-xs text-gray-500">Cookie Consent</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Compliance Settings</h2>
              <p className="text-gray-600">Configure legal compliance for different jurisdictions</p>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Jurisdiction Compliance</CardTitle>
                  <CardDescription>Enable compliance features for specific regions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">GDPR (European Union)</Label>
                      <p className="text-sm text-gray-500">General Data Protection Regulation compliance</p>
                    </div>
                    <Switch
                      checked={config.compliance.gdpr}
                      onCheckedChange={(checked) => setConfig(prev => ({
                        ...prev,
                        compliance: { ...prev.compliance, gdpr: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">CCPA (California)</Label>
                      <p className="text-sm text-gray-500">California Consumer Privacy Act compliance</p>
                    </div>
                    <Switch
                      checked={config.compliance.ccpa}
                      onCheckedChange={(checked) => setConfig(prev => ({
                        ...prev,
                        compliance: { ...prev.compliance, ccpa: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">LGPD (Brazil)</Label>
                      <p className="text-sm text-gray-500">Lei Geral de Proteção de Dados compliance</p>
                    </div>
                    <Switch
                      checked={config.compliance.lgpd}
                      onCheckedChange={(checked) => setConfig(prev => ({
                        ...prev,
                        compliance: { ...prev.compliance, lgpd: checked }
                      }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                  <CardDescription>Fine-tune compliance behavior</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Consent Expiry (Days)</Label>
                    <Input
                      type="number"
                      value={config.consentExpiry}
                      onChange={(e) => setConfig(prev => ({ ...prev, consentExpiry: parseInt(e.target.value) }))}
                      min="1"
                      max="365"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      How long consent choices are remembered (1-365 days)
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Affiliate Advertisements</Label>
                      <p className="text-sm text-gray-500">Enable revenue generation through contextual ads</p>
                    </div>
                    <Switch
                      checked={config.affiliateAds}
                      onCheckedChange={(checked) => setConfig(prev => ({ ...prev, affiliateAds: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compliance Status</CardTitle>
                  <CardDescription>Current compliance configuration summary</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Cookie consent banner configured</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Privacy policy integration ready</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Consent records stored securely</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {config.compliance.gdpr || config.compliance.ccpa || config.compliance.lgpd ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span className="text-sm">Regional compliance enabled</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Integration Tab */}
          <TabsContent value="integration" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Integration</h2>
              <p className="text-gray-600">Get your integration code and setup instructions</p>
            </div>

            <div className="grid gap-6">
              {websites.map((website) => (
                <Card key={website.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      {website.domain}
                    </CardTitle>
                    <CardDescription>
                      Integration code for this website
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Integration Code</Label>
                      <div className="relative">
                        <Textarea
                          value={generateIntegrationCode(website)}
                          readOnly
                          className="font-mono text-sm"
                          rows={8}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(generateIntegrationCode(website))}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Code
                      </Button>
                      <Button variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Test Integration
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card>
                <CardHeader>
                  <CardTitle>Setup Instructions</CardTitle>
                  <CardDescription>
                    Step-by-step guide to implement CookieBot.ai
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium">Copy the integration code</h4>
                        <p className="text-sm text-gray-600">
                          Copy the generated script tag for your website
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium">Add to your website</h4>
                        <p className="text-sm text-gray-600">
                          Paste the code before the closing &lt;/head&gt; tag
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium">Test the implementation</h4>
                        <p className="text-sm text-gray-600">
                          Visit your website to verify the consent banner appears
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                        ✓
                      </div>
                      <div>
                        <h4 className="font-medium">Start earning revenue</h4>
                        <p className="text-sm text-gray-600">
                          Monitor your dashboard for consent data and revenue
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {!isAuthenticated && (
                <Card className="border-dashed border-2 border-gray-300">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Code className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Ready to integrate?
                    </h3>
                    <p className="text-gray-600 text-center mb-4">
                      Sign up to get your personalized integration code
                    </p>
                    <Button>
                      Get Started Free
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default EnhancedDashboard


