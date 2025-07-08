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
  ArrowRight
} from 'lucide-react'

// API Configuration - Updated to use live backend
const API_BASE_URL = 'https://cookiebot-ai-backend.vercel.app'

// API Helper Functions
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
      throw new Error(`API Error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API call failed:', error)
    throw error
  }
}

// Mock data for demonstration (will be replaced with real API data)
const mockAnalytics = {
  totalVisitors: 125430,
  consentRate: 78.5,
  affiliateRevenue: 2847.32,
  activeWebsites: 12,
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

const EnhancedDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [websites, setWebsites] = useState([])
  const [analytics, setAnalytics] = useState(mockAnalytics)
  
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

  // Load user data and websites on component mount
  useEffect(() => {
    loadUserData()
    loadWebsites()
    loadAnalytics()
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
    }
  }

  const loadAnalytics = async () => {
    try {
      const analyticsData = await apiCall('/api/analytics/dashboard')
      setAnalytics(prev => ({
        ...prev,
        totalVisitors: analyticsData.events_today || prev.totalVisitors,
        activeWebsites: analyticsData.website_count || prev.activeWebsites,
        affiliateRevenue: analyticsData.revenue_balance || prev.affiliateRevenue
      }))
    } catch (error) {
      console.error('Failed to load analytics:', error)
    }
  }

  const addWebsite = async (websiteData) => {
    try {
      setLoading(true)
      const newWebsite = await apiCall('/api/websites', {
        method: 'POST',
        body: JSON.stringify(websiteData)
      })
      setWebsites(prev => [...prev, newWebsite])
      return newWebsite
    } catch (error) {
      console.error('Failed to add website:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Test API connection
  const testConnection = async () => {
    try {
      const health = await apiCall('/api/health')
      alert(`✅ Backend Connected!\nStatus: ${health.status}\nDatabase: ${health.database}`)
    } catch (error) {
      alert(`❌ Connection Failed!\nError: ${error.message}`)
    }
  }

  // Live Preview Component
  const LivePreview = () => {
    const getDeviceClass = () => {
      switch (previewDevice) {
        case 'mobile': return 'w-80 h-96'
        case 'tablet': return 'w-96 h-80'
        default: return 'w-full h-64'
      }
    }

    const getLayoutStyles = () => {
      const baseStyles = {
        backgroundColor: config.customColors.background,
        color: config.customColors.text,
        borderColor: config.customColors.accent
      }

      if (config.layout === 'dialog') {
        return {
          ...baseStyles,
          position: 'absolute',
          bottom: config.position === 'bottom' ? '20px' : 'auto',
          top: config.position === 'top' ? '20px' : 'auto',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '400px',
          borderRadius: '12px',
          border: '1px solid',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }
      } else {
        return {
          ...baseStyles,
          position: 'absolute',
          bottom: config.position === 'bottom' ? '0' : 'auto',
          top: config.position === 'top' ? '0' : 'auto',
          left: '0',
          right: '0',
          borderTop: config.position === 'bottom' ? '1px solid' : 'none',
          borderBottom: config.position === 'top' ? '1px solid' : 'none'
        }
      }
    }

    const getButtonStyles = (isPrimary = false) => {
      const baseStyles = {
        padding: '8px 16px',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        border: 'none'
      }

      switch (config.buttonStyle) {
        case 'solid':
          return {
            ...baseStyles,
            backgroundColor: isPrimary ? config.customColors.button : config.customColors.accent,
            color: '#ffffff'
          }
        case 'outline':
          return {
            ...baseStyles,
            backgroundColor: 'transparent',
            color: isPrimary ? config.customColors.button : config.customColors.accent,
            border: `1px solid ${isPrimary ? config.customColors.button : config.customColors.accent}`
          }
        default:
          return {
            ...baseStyles,
            backgroundColor: isPrimary ? config.customColors.button : 'transparent',
            color: isPrimary ? '#ffffff' : config.customColors.text,
            border: isPrimary ? 'none' : `1px solid ${config.customColors.accent}`
          }
      }
    }

    return (
      <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ minHeight: '300px' }}>
        <div className={`mx-auto ${getDeviceClass()} bg-white relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Globe className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Your Website Preview</p>
            </div>
          </div>
          
          {/* Cookie Banner Preview */}
          <div style={getLayoutStyles()} className="p-4 z-10">
            <div className="flex items-start space-x-3">
              {config.companyLogo && (
                <div className="w-8 h-8 bg-gray-200 rounded flex-shrink-0"></div>
              )}
              <div className="flex-1">
                <h4 className="font-semibold mb-2">
                  {config.companyName} uses cookies
                </h4>
                <p className="text-sm opacity-80 mb-3">
                  We use cookies to enhance your experience and analyze our traffic. 
                  {config.affiliateAds && ' Our partners may also show you relevant ads.'}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button style={getButtonStyles(true)}>
                    Accept All
                  </button>
                  <button style={getButtonStyles(false)}>
                    Manage Preferences
                  </button>
                  {config.bannerType === 'accept-decline' && (
                    <button style={getButtonStyles(false)}>
                      Decline
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Device Selector */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={() => setPreviewDevice('desktop')}
            className={`p-2 rounded ${previewDevice === 'desktop' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600'}`}
          >
            <Monitor className="h-4 w-4" />
          </button>
          <button
            onClick={() => setPreviewDevice('tablet')}
            className={`p-2 rounded ${previewDevice === 'tablet' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600'}`}
          >
            <Tablet className="h-4 w-4" />
          </button>
          <button
            onClick={() => setPreviewDevice('mobile')}
            className={`p-2 rounded ${previewDevice === 'mobile' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600'}`}
          >
            <Smartphone className="h-4 w-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                CookieBot.ai Enhanced Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your cookie consent platform with advanced customization and analytics
              </p>
              {user && (
                <p className="text-sm text-blue-600 mt-1">
                  Welcome back, {user.first_name || user.email}!
                </p>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={testConnection}
                className="text-xs"
              >
                <Zap className="h-3 w-3 mr-1" />
                Test API
              </Button>
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                Enhanced v2.0
              </Badge>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="websites" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Websites</span>
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center space-x-2">
              <Layout className="h-4 w-4" />
              <span>Layout</span>
            </TabsTrigger>
            <TabsTrigger value="design" className="flex items-center space-x-2">
              <Palette className="h-4 w-4" />
              <span>Design</span>
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Compliance</span>
            </TabsTrigger>
            <TabsTrigger value="integration" className="flex items-center space-x-2">
              <Code className="h-4 w-4" />
              <span>Integration</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalVisitors.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +12.5% from last month
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
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +2.1% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Affiliate Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${analytics.affiliateRevenue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +18.7% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Websites</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.activeWebsites}</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +2 new this month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Consents & Revenue</CardTitle>
                  <CardDescription>Last 7 days performance</CardDescription>
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
                  <CardDescription>Acceptance rates by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analytics.consentCategories}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
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
          </TabsContent>

          {/* Layout Tab */}
          <TabsContent value="layout" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Layout Configuration</CardTitle>
                    <CardDescription>Choose your banner layout and positioning</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Layout Type</Label>
                      <Select value={config.layout} onValueChange={(value) => setConfig({...config, layout: value})}>
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
                      <Select value={config.position} onValueChange={(value) => setConfig({...config, position: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="top">Top</SelectItem>
                          <SelectItem value="bottom">Bottom</SelectItem>
                          {config.layout === 'dialog' && <SelectItem value="center">Center</SelectItem>}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Banner Type</Label>
                      <Select value={config.bannerType} onValueChange={(value) => setConfig({...config, bannerType: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="multilevel">Multilevel</SelectItem>
                          <SelectItem value="accept-only">Accept Only</SelectItem>
                          <SelectItem value="accept-decline">Accept/Decline</SelectItem>
                          <SelectItem value="inline-multilevel">Inline Multilevel</SelectItem>
                          <SelectItem value="ccpa">CCPA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Live Preview</CardTitle>
                    <CardDescription>See your changes in real-time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LivePreview />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Design Tab */}
          <TabsContent value="design" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Theme & Colors</CardTitle>
                    <CardDescription>Customize the appearance of your cookie banner</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Theme</Label>
                      <Select value={config.theme} onValueChange={(value) => setConfig({...config, theme: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light Theme</SelectItem>
                          <SelectItem value="dark">Dark Theme</SelectItem>
                          <SelectItem value="custom">Custom Theme</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {config.theme === 'custom' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Background Color</Label>
                          <Input
                            type="color"
                            value={config.customColors.background}
                            onChange={(e) => setConfig({
                              ...config,
                              customColors: {...config.customColors, background: e.target.value}
                            })}
                          />
                        </div>
                        <div>
                          <Label>Text Color</Label>
                          <Input
                            type="color"
                            value={config.customColors.text}
                            onChange={(e) => setConfig({
                              ...config,
                              customColors: {...config.customColors, text: e.target.value}
                            })}
                          />
                        </div>
                        <div>
                          <Label>Accent Color</Label>
                          <Input
                            type="color"
                            value={config.customColors.accent}
                            onChange={(e) => setConfig({
                              ...config,
                              customColors: {...config.customColors, accent: e.target.value}
                            })}
                          />
                        </div>
                        <div>
                          <Label>Button Color</Label>
                          <Input
                            type="color"
                            value={config.customColors.button}
                            onChange={(e) => setConfig({
                              ...config,
                              customColors: {...config.customColors, button: e.target.value}
                            })}
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <Label>Button Style</Label>
                      <Select value={config.buttonStyle} onValueChange={(value) => setConfig({...config, buttonStyle: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default (CTA)</SelectItem>
                          <SelectItem value="solid">Solid (Equal)</SelectItem>
                          <SelectItem value="outline">Outline (Minimal)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Company Name</Label>
                      <Input
                        value={config.companyName}
                        onChange={(e) => setConfig({...config, companyName: e.target.value})}
                        placeholder="Your Company Name"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Live Preview</CardTitle>
                    <CardDescription>See your design changes instantly</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LivePreview />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Settings</CardTitle>
                <CardDescription>Configure legal compliance options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">GDPR</Label>
                      <p className="text-sm text-gray-600">European Union compliance</p>
                    </div>
                    <Switch
                      checked={config.compliance.gdpr}
                      onCheckedChange={(checked) => setConfig({
                        ...config,
                        compliance: {...config.compliance, gdpr: checked}
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">CCPA</Label>
                      <p className="text-sm text-gray-600">California compliance</p>
                    </div>
                    <Switch
                      checked={config.compliance.ccpa}
                      onCheckedChange={(checked) => setConfig({
                        ...config,
                        compliance: {...config.compliance, ccpa: checked}
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">LGPD</Label>
                      <p className="text-sm text-gray-600">Brazil compliance</p>
                    </div>
                    <Switch
                      checked={config.compliance.lgpd}
                      onCheckedChange={(checked) => setConfig({
                        ...config,
                        compliance: {...config.compliance, lgpd: checked}
                      })}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Affiliate Advertisements</Label>
                    <p className="text-sm text-gray-600">Enable revenue-generating ads in consent banners</p>
                  </div>
                  <Switch
                    checked={config.affiliateAds}
                    onCheckedChange={(checked) => setConfig({...config, affiliateAds: checked})}
                  />
                </div>

                <div>
                  <Label>Consent Expiry (days)</Label>
                  <Input
                    type="number"
                    value={config.consentExpiry}
                    onChange={(e) => setConfig({...config, consentExpiry: parseInt(e.target.value)})}
                    min="1"
                    max="730"
                  />
                  <p className="text-sm text-gray-600 mt-1">How long consent choices are remembered</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integration Tab */}
          <TabsContent value="integration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Integration Code</CardTitle>
                <CardDescription>Copy this code to your website's &lt;head&gt; section</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`<script src="https://cookiebot.ai/src/cookiebot-ai.js"
        data-cbid="your-client-id"
        data-company-name="${config.companyName}"
        data-layout="${config.layout}"
        data-position="${config.position}"
        data-theme="${config.theme}"
        data-button-style="${config.buttonStyle}"
        data-banner-type="${config.bannerType}"
        data-affiliate-ads="${config.affiliateAds}"
        data-consent-expiry="${config.consentExpiry}"
        ${config.theme === 'custom' ? `data-custom-colors='${JSON.stringify(config.customColors)}'` : ''}
        ${config.compliance.gdpr ? 'data-gdpr="true"' : ''}
        ${config.compliance.ccpa ? 'data-ccpa="true"' : ''}
        ${config.compliance.lgpd ? 'data-lgpd="true"' : ''}>
</script>`}</pre>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button onClick={() => navigator.clipboard.writeText('/* Integration code */')}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>Quick setup guide</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                    <div>
                      <h4 className="font-medium">Copy the integration code</h4>
                      <p className="text-sm text-gray-600">Use the code above with your customizations</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                    <div>
                      <h4 className="font-medium">Add to your website</h4>
                      <p className="text-sm text-gray-600">Paste the code in your website's &lt;head&gt; section</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                    <div>
                      <h4 className="font-medium">Test and go live</h4>
                      <p className="text-sm text-gray-600">Verify the banner appears and start earning revenue</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Websites Tab */}
          <TabsContent value="websites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Websites</CardTitle>
                <CardDescription>Manage websites using CookieBot.ai Enhanced</CardDescription>
              </CardHeader>
              <CardContent>
                {websites.length === 0 ? (
                  <div className="text-center py-12">
                    <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No websites added yet</h3>
                    <p className="text-gray-600 mb-6">Add your first website to start tracking consent and revenue</p>
                    <Button 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={() => {
                        const domain = prompt('Enter your website domain (e.g., example.com):')
                        if (domain) {
                          addWebsite({ domain, name: domain })
                        }
                      }}
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Add Website
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {websites.map((website) => (
                      <div key={website.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{website.name}</h4>
                          <p className="text-sm text-gray-600">{website.domain}</p>
                        </div>
                        <Badge variant={website.status === 'active' ? 'default' : 'secondary'}>
                          {website.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Deploy Your Enhanced Cookie Consent?</h2>
          <p className="text-blue-100 mb-6">
            Your customized cookie banner is ready! Copy the integration code and start earning revenue today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              <Copy className="h-4 w-4 mr-2" />
              Copy Integration Code
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <FileText className="h-4 w-4 mr-2" />
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnhancedDashboard


