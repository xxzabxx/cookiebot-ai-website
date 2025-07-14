import React, { useState, useEffect, useCallback } from 'react'
import { Button } from './ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs.jsx'
import { Badge } from './ui/badge.jsx'
import { Input } from './ui/input.jsx'
import { Label } from './ui/label.jsx'
import { Switch } from './ui/switch.jsx'
import { Textarea } from './ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select.jsx'
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { RefreshCw, TrendingUp, Users, MousePointer, DollarSign, Globe, Calendar, Download } from 'lucide-react'

// Enhanced Dashboard with Complete V3 Script Configuration + Phase 2 Analytics
// FIXED: Preview now properly loads the enhanced V3 script while preserving ALL existing functionality
// ADDED: Phase 2 real-time analytics, live charts, and historical data visualization

const EnhancedDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Phase 2: Real-time data states
  const [dashboardSummary, setDashboardSummary] = useState(null)
  const [selectedWebsite, setSelectedWebsite] = useState(null)
  const [websiteMetrics, setWebsiteMetrics] = useState(null)
  const [analyticsData, setAnalyticsData] = useState(null)
  const [dateRange, setDateRange] = useState({
    start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0]
  })
  const [granularity, setGranularity] = useState('daily')
  const [autoRefresh, setAutoRefresh] = useState(true)
  
  // Enhanced Configuration State - Maps to V3 Script Attributes
  const [config, setConfig] = useState({
    // Basic Configuration
    clientId: 'your-client-id',
    companyName: 'Your Company',
    logoUrl: '',
    
    // Banner Configuration (V3 Enhanced)
    bannerPosition: 'bottom', // top, bottom, center
    bannerStyle: 'modern', // modern, classic, minimal
    theme: 'light', // light, dark, custom
    
    // Styling Configuration (NEW in V3)
    primaryColor: '#007bff',
    backgroundColor: '#ffffff',
    textColor: '#333333',
    borderRadius: '8px',
    buttonStyle: 'default', // default, solid, outline
    
    // Compliance Configuration (NEW in V3)
    jurisdiction: 'auto', // auto, gdpr, ccpa, lgpd
    autoBlock: true,
    granularConsent: true,
    showDeclineButton: true,
    consentExpiry: 365,
    
    // Privacy Insights Configuration (Enhanced in V3)
    enablePrivacyInsights: true,
    privacyInsightsFrequency: 3,
    privacyWidgetDelay: 3000,
    privacyWidgetDuration: 15000,
    revenueShare: 0.6,
    
    // Language Configuration (NEW in V3)
    language: 'auto',
    
    // Legacy compliance toggles (for UI display)
    compliance: {
      gdpr: true,
      ccpa: true,
      lgpd: false
    }
  })

  const [previewDevice, setPreviewDevice] = useState('desktop')
  const [generatedScript, setGeneratedScript] = useState('')

  // Demo data for sales purposes (when not authenticated)
  const demoData = {
    revenue: 2847.32,
    visitors: 125430,
    consent_rate: 78.5,
    websites: 12,
    recentActivity: [
      { date: '2025-07-09', visitors: 1890, consents: 1420, revenue: 74.20 },
      { date: '2025-07-08', visitors: 1720, consents: 1380, revenue: 67.80 },
      { date: '2025-07-07', visitors: 1650, consents: 1250, revenue: 61.30 }
    ],
    // Phase 2: Enhanced demo data for charts
    hourly_breakdown: [
      { hour: 0, visitors: 45, consents: 32, revenue: 1.60 },
      { hour: 1, visitors: 23, consents: 18, revenue: 0.90 },
      { hour: 2, visitors: 12, consents: 8, revenue: 0.40 },
      { hour: 3, visitors: 8, consents: 5, revenue: 0.25 },
      { hour: 4, visitors: 15, consents: 10, revenue: 0.50 },
      { hour: 5, visitors: 28, consents: 20, revenue: 1.00 },
      { hour: 6, visitors: 67, consents: 48, revenue: 2.40 },
      { hour: 7, visitors: 134, consents: 98, revenue: 4.90 },
      { hour: 8, visitors: 189, consents: 142, revenue: 7.10 },
      { hour: 9, visitors: 234, consents: 178, revenue: 8.90 },
      { hour: 10, visitors: 267, consents: 201, revenue: 10.05 },
      { hour: 11, visitors: 298, consents: 225, revenue: 11.25 }
    ],
    event_types: [
      { type: 'page_view', count: 1250, revenue: 12.50 },
      { type: 'consent_given', count: 890, revenue: 44.50 },
      { type: 'privacy_insight_click', count: 67, revenue: 10.05 },
      { type: 'form_submission', count: 34, revenue: 3.40 },
      { type: 'newsletter_signup', count: 23, revenue: 1.84 }
    ]
  }

  // Real data state (when authenticated)
  const [realData, setRealData] = useState({
    revenue: 0,
    visitors: 0,
    consent_rate: 0,
    websites: 0
  })

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      setIsAuthenticated(true)
      loadRealData()
      loadDashboardSummary()
    }
  }, [])

  // Generate script whenever config changes
  useEffect(() => {
    setGeneratedScript(generateScript())
  }, [config])

  // Phase 2: Auto-refresh effect
  useEffect(() => {
    if (!autoRefresh || !isAuthenticated) return

    const interval = setInterval(() => {
      if (activeTab === 'analytics') {
        loadDashboardSummary()
        if (selectedWebsite) {
          loadWebsiteMetrics(selectedWebsite.id)
        }
      }
    }, 30000) // Refresh every 30 seconds

    return () => clearInterval(interval)
  }, [autoRefresh, isAuthenticated, activeTab, selectedWebsite])

  // Phase 2: API Functions
  const loadDashboardSummary = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('https://cookiebot-ai-backend.vercel.app/api/user/dashboard-summary', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setDashboardSummary(data)
        
        // Auto-select first website if none selected
        if (!selectedWebsite && data.websites && data.websites.length > 0) {
          setSelectedWebsite(data.websites[0])
          loadWebsiteMetrics(data.websites[0].id)
        }
      } else {
        throw new Error('Failed to load dashboard summary')
      }
    } catch (error) {
      console.error('Failed to load dashboard summary:', error)
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }, [selectedWebsite])

  const loadWebsiteMetrics = useCallback(async (websiteId) => {
    try {
      const response = await fetch(`https://cookiebot-ai-backend.vercel.app/api/websites/${websiteId}/metrics`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setWebsiteMetrics(data)
      }
    } catch (error) {
      console.error('Failed to load website metrics:', error)
    }
  }, [])

  const loadAnalyticsData = useCallback(async (websiteId) => {
    try {
      const params = new URLSearchParams({
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
        granularity: granularity
      })
      
      const response = await fetch(`https://cookiebot-ai-backend.vercel.app/api/websites/${websiteId}/analytics?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setAnalyticsData(data)
      }
    } catch (error) {
      console.error('Failed to load analytics data:', error)
    }
  }, [dateRange, granularity])

  // Handle website selection
  const handleWebsiteSelect = (website) => {
    setSelectedWebsite(website)
    loadWebsiteMetrics(website.id)
    loadAnalyticsData(website.id)
  }

  const loadRealData = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://cookiebot-ai-backend.vercel.app/api/analytics/dashboard', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setRealData({
          revenue: data.revenue || 0,
          visitors: data.visitors || 0,
          consent_rate: data.consent_rate || 0,
          websites: data.websites || 0
        })
      }
    } catch (error) {
      console.error('Failed to load real data:', error)
      // Fallback to demo data if API fails
    } finally {
      setLoading(false)
    }
  }

  // Use demo data for sales, real data when authenticated
  const currentData = isAuthenticated ? (dashboardSummary || realData) : { 
    ...demoData, 
    websites: [{ id: 'demo', domain: 'demo-site.com', status: 'active' }] 
  }
  
  // Phase 2: Current metrics for charts
  const currentMetrics = isAuthenticated ? websiteMetrics : { 
    today_metrics: demoData, 
    hourly_breakdown: demoData.hourly_breakdown,
    event_types: demoData.event_types
  }

  /**
   * FIXED: Generate the complete V3 script with correct URL and all configuration options
   */
  const generateScript = () => {
    const attributes = [
      `src="https://cookiebot-ai-backend.vercel.app/static/enhanced_cookiebot_ai_v3.js"`,
      `data-cbid="${config.clientId}"`,
      `data-api-endpoint="https://cookiebot-ai-backend.vercel.app/api"`,
      `data-company-name="${config.companyName}"`,
      config.logoUrl && `data-logo-url="${config.logoUrl}"`,
      `data-banner-position="${config.bannerPosition}"`,
      `data-banner-style="${config.bannerStyle}"`,
      `data-theme="${config.theme}"`,
      `data-primary-color="${config.primaryColor}"`,
      `data-background-color="${config.backgroundColor}"`,
      `data-text-color="${config.textColor}"`,
      `data-border-radius="${config.borderRadius}"`,
      `data-button-style="${config.buttonStyle}"`,
      `data-jurisdiction="${config.jurisdiction}"`,
      `data-auto-block="${config.autoBlock}"`,
      `data-granular-consent="${config.granularConsent}"`,
      `data-show-decline-button="${config.showDeclineButton}"`,
      `data-consent-expiry="${config.consentExpiry}"`,
      `data-enable-privacy-insights="${config.enablePrivacyInsights}"`,
      `data-privacy-insights-frequency="${config.privacyInsightsFrequency}"`,
      `data-privacy-widget-delay="${config.privacyWidgetDelay}"`,
      `data-privacy-widget-duration="${config.privacyWidgetDuration}"`,
      `data-revenue-share="${config.revenueShare}"`,
      `data-language="${config.language}"`
    ].filter(Boolean)

    return `<script ${attributes.join('\n        ')}>\n</script>`
  }

  // Phase 2: Chart color scheme
  const colors = {
    primary: '#007bff',
    success: '#28a745',
    warning: '#ffc107',
    danger: '#dc3545',
    info: '#17a2b8'
  }

  // Phase 2: Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }

  // Phase 2: Format percentage
  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`
  }

  /**
   * Copy script to clipboard
   */
  const copyScript = async () => {
    try {
      await navigator.clipboard.writeText(generatedScript)
      // Could add a toast notification here
    } catch (error) {
      console.error('Failed to copy script:', error)
    }
  }

  /**
   * Download script as HTML file
   */
  const downloadScript = () => {
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>CookieBot.ai Integration</title>
    ${generatedScript}
</head>
<body>
    <!-- Your website content here -->
    <h1>CookieBot.ai Integration</h1>
    <p>The cookie consent banner will appear automatically.</p>
</body>
</html>`

    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cookiebot-ai-integration.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  /**
   * FIXED: Live Preview Component with Proper V3 Script Integration and Enhanced Sandbox
   */
  const LivePreview = () => {
    const getDeviceClass = () => {
      switch (previewDevice) {
        case 'mobile':
          return 'w-80 h-96'
        case 'tablet':
          return 'w-96 h-80'
        default:
          return 'w-full h-96'
      }
    }

    // FIXED: Create preview HTML with correct V3 script URL and all attributes
    const previewHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CookieBot.ai Preview</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .preview-content {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 500px;
        }
        .logo {
            font-size: 48px;
            margin-bottom: 20px;
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
        }
        p {
            color: #666;
            line-height: 1.6;
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        .feature {
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            font-size: 14px;
        }
        .config-info {
            margin-top: 20px;
            padding: 15px;
            background: #e3f2fd;
            border-radius: 8px;
            font-size: 12px;
            color: #1565c0;
        }
    </style>
</head>
<body>
    <div class="preview-content">
        <div class="logo">🍪</div>
        <h1>${config.companyName}</h1>
        <p>This is a preview of how your website will look with CookieBot.ai cookie consent.</p>
        <p>The cookie banner will appear based on your configuration settings.</p>
        
        <div class="features">
            <div class="feature">
                <strong>🛡️ Compliant</strong><br>
                ${config.jurisdiction.toUpperCase()} Ready
            </div>
            <div class="feature">
                <strong>💰 Revenue</strong><br>
                ${config.enablePrivacyInsights ? config.revenueShare * 100 + '% Share' : 'Disabled'}
            </div>
            <div class="feature">
                <strong>🎨 Styled</strong><br>
                ${config.theme} Theme
            </div>
            <div class="feature">
                <strong>📱 Responsive</strong><br>
                All Devices
            </div>
        </div>

        <div class="config-info">
            <strong>Current Configuration:</strong><br>
            Position: ${config.bannerPosition} | Style: ${config.bannerStyle} | 
            Privacy Insights: ${config.enablePrivacyInsights ? 'Enabled' : 'Disabled'} |
            Frequency: Every ${config.privacyInsightsFrequency} views
        </div>
    </div>

    <!-- FIXED: Load the enhanced V3 script with correct URL and all configuration attributes -->
    <script src="https://cookiebot-ai-backend.vercel.app/static/enhanced_cookiebot_ai_v3.js"
            data-cbid="${config.clientId}"
            data-api-endpoint="https://cookiebot-ai-backend.vercel.app/api"
            data-company-name="${config.companyName}"
            ${config.logoUrl ? `data-logo-url="${config.logoUrl}"` : ''}
            data-banner-position="${config.bannerPosition}"
            data-banner-style="${config.bannerStyle}"
            data-theme="${config.theme}"
            data-primary-color="${config.primaryColor}"
            data-background-color="${config.backgroundColor}"
            data-text-color="${config.textColor}"
            data-border-radius="${config.borderRadius}"
            data-button-style="${config.buttonStyle}"
            data-jurisdiction="${config.jurisdiction}"
            data-auto-block="${config.autoBlock}"
            data-granular-consent="${config.granularConsent}"
            data-show-decline-button="${config.showDeclineButton}"
            data-consent-expiry="${config.consentExpiry}"
            data-enable-privacy-insights="${config.enablePrivacyInsights}"
            data-privacy-insights-frequency="${config.privacyInsightsFrequency}"
            data-privacy-widget-delay="${config.privacyWidgetDelay}"
            data-privacy-widget-duration="${config.privacyWidgetDuration}"
            data-revenue-share="${config.revenueShare}"
            data-language="${config.language}">
    </script>
</body>
</html>`

    return (
      <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ minHeight: '400px' }}>
        <div className={`mx-auto ${getDeviceClass()} bg-white relative overflow-hidden border rounded-lg`}>
          {/* FIXED: Enhanced iframe sandbox permissions for proper script loading */}
          <iframe
            srcDoc={previewHTML}
            className="w-full h-full border-0"
            title="Cookie Banner Preview"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CookieBot.ai Dashboard</h1>
              <p className="text-gray-600 mt-1">
                {isAuthenticated ? 'Manage your websites and track performance' : 'Experience the power of CookieBot.ai'}
              </p>
              {!isAuthenticated && (
                <Badge className="mt-2 bg-blue-100 text-blue-800">
                  Demo Mode - Sign in for real data
                </Badge>
              )}
            </div>
            
            {/* Phase 2: Real-time controls */}
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={autoRefresh} 
                    onCheckedChange={setAutoRefresh}
                    id="auto-refresh"
                  />
                  <Label htmlFor="auto-refresh" className="text-sm">Auto-refresh</Label>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    loadDashboardSummary()
                    if (selectedWebsite) loadWebsiteMetrics(selectedWebsite.id)
                  }}
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            )}
            
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Enhanced v3.0 + Phase 2
            </Badge>
          </div>
        </div>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-1">
            <TabsTrigger value="analytics" className="text-xs md:text-sm px-2">Analytics</TabsTrigger>
            <TabsTrigger value="revenue" className="text-xs md:text-sm px-2">Revenue</TabsTrigger>
            <TabsTrigger value="websites" className="text-xs md:text-sm px-2">Websites</TabsTrigger>
            <TabsTrigger value="configuration" className="text-xs md:text-sm px-2">Config</TabsTrigger>
            <TabsTrigger value="compliance" className="text-xs md:text-sm px-2">Compliance</TabsTrigger>
            <TabsTrigger value="preview" className="text-xs md:text-sm px-2">Preview</TabsTrigger>
          </TabsList>

          {/* Phase 2: Enhanced Analytics Tab with Live Charts */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Website Selection */}
            {isAuthenticated && currentData?.websites && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Website Selection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Label>Select Website:</Label>
                    <Select 
                      value={selectedWebsite?.id?.toString() || ''} 
                      onValueChange={(value) => {
                        const website = currentData.websites.find(w => w.id.toString() === value)
                        if (website) handleWebsiteSelect(website)
                      }}
                    >
                      <SelectTrigger className="w-64">
                        <SelectValue placeholder="Choose a website" />
                      </SelectTrigger>
                      <SelectContent>
                        {currentData.websites.map((website) => (
                          <SelectItem key={website.id} value={website.id.toString()}>
                            <div className="flex items-center justify-between w-full">
                              <span>{website.domain}</span>
                              <Badge variant={website.status === 'active' ? 'default' : 'secondary'}>
                                {website.status}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Phase 2: Real-time Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Visitors</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {currentMetrics?.today_metrics?.unique_visitors?.toLocaleString() || currentData?.visitors?.toLocaleString() || '0'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +12% from yesterday
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Consent Rate</CardTitle>
                  <MousePointer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatPercentage(currentMetrics?.today_metrics?.consent_rate || currentData?.consent_rate || 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +2.1% from yesterday
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(currentMetrics?.today_metrics?.total_revenue || currentData?.revenue || 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +8.2% from yesterday
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Privacy Insights</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {currentMetrics?.today_metrics?.privacy_clicks || 67}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency((currentMetrics?.today_metrics?.privacy_clicks || 67) * 0.15)} earned
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Phase 2: Hourly Breakdown Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Hourly Breakdown</CardTitle>
                <CardDescription>Visitor traffic and consent patterns throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={currentMetrics?.hourly_breakdown || demoData.hourly_breakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" tickFormatter={(hour) => `${hour}:00`} />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(hour) => `${hour}:00`}
                      formatter={(value, name) => [
                        name === 'revenue' ? formatCurrency(value) : value,
                        name === 'visitors' ? 'Visitors' : name === 'consents' ? 'Consents' : 'Revenue'
                      ]}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="visitors" stackId="1" stroke={colors.primary} fill={colors.primary} fillOpacity={0.6} />
                    <Area type="monotone" dataKey="consents" stackId="2" stroke={colors.success} fill={colors.success} fillOpacity={0.6} />
                    <Line type="monotone" dataKey="revenue" stroke={colors.warning} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Phase 2: Event Types Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event Types</CardTitle>
                  <CardDescription>Breakdown of user interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={currentMetrics?.event_types || demoData.event_types}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ type, count }) => `${type}: ${count}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {(currentMetrics?.event_types || demoData.event_types).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={Object.values(colors)[index % Object.values(colors).length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [value, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Event Type</CardTitle>
                  <CardDescription>Revenue breakdown by interaction type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={currentMetrics?.event_types || demoData.event_types}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" angle={-45} textAnchor="end" height={80} />
                      <YAxis tickFormatter={(value) => formatCurrency(value)} />
                      <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
                      <Bar dataKey="revenue" fill={colors.success} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest visitor and consent data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(currentData.recentActivity || []).map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{activity.date}</p>
                        <p className="text-sm text-gray-600">{activity.visitors} visitors, {activity.consents} consents</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">${activity.revenue}</p>
                        <p className="text-sm text-gray-600">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Insights Revenue</CardTitle>
                  <CardDescription>{config.revenueShare * 100}% of ad revenue goes to you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">Your Share ({config.revenueShare * 100}%)</p>
                      <p className="text-2xl font-bold text-green-600">${(currentData.revenue * config.revenueShare).toFixed(2)}</p>
                    </div>
                    <div className="text-green-600 text-3xl">📈</div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Platform Share ({(1 - config.revenueShare) * 100}%)</p>
                      <p className="text-2xl font-bold text-blue-600">${(currentData.revenue * (1 - config.revenueShare)).toFixed(2)}</p>
                    </div>
                    <div className="text-blue-600 text-3xl">🏢</div>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Revenue Frequency:</strong> Privacy Insights shown every {config.privacyInsightsFrequency} page views
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payout Information</CardTitle>
                  <CardDescription>Monthly payouts with $50 minimum</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Current Balance:</span>
                      <span className="font-medium">${(currentData.revenue * config.revenueShare).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Minimum Payout:</span>
                      <span className="font-medium">$50.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next Payout:</span>
                      <span className="font-medium">End of Month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue Share:</span>
                      <span className="font-medium">{config.revenueShare * 100}%</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" disabled={(currentData.revenue * config.revenueShare) < 50}>
                    {(currentData.revenue * config.revenueShare) >= 50 ? 'Request Payout' : 'Minimum Not Reached'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Phase 2: Revenue Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Daily revenue over the past 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={currentData?.recentActivity || demoData.recentActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
                    <Line type="monotone" dataKey="revenue" stroke={colors.success} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Websites Tab */}
          <TabsContent value="websites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Websites</CardTitle>
                <CardDescription>Manage websites using CookieBot.ai</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isAuthenticated ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🌐</div>
                      <p className="text-gray-600 mb-4">No websites added yet</p>
                      <Button>Add Your First Website</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {['example.com', 'mystore.com', 'blog.example.com'].map((domain, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{domain}</p>
                            <p className="text-sm text-gray-600">Active • {Math.floor(Math.random() * 1000) + 500} visitors today</p>
                          </div>
                          <Badge>Demo</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configuration Tab - Complete V3 Configuration */}
          <TabsContent value="configuration" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Configuration</CardTitle>
                  <CardDescription>Essential settings for your cookie consent</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Client ID</Label>
                    <Input
                      value={config.clientId}
                      onChange={(e) => setConfig({...config, clientId: e.target.value})}
                      placeholder="your-client-id"
                    />
                  </div>

                  <div>
                    <Label>Company Name</Label>
                    <Input
                      value={config.companyName}
                      onChange={(e) => setConfig({...config, companyName: e.target.value})}
                      placeholder="Your Company Name"
                    />
                  </div>
                  
                  <div>
                    <Label>Company Logo URL</Label>
                    <Input
                      value={config.logoUrl}
                      onChange={(e) => setConfig({...config, logoUrl: e.target.value})}
                      placeholder="https://example.com/logo.png"
                    />
                  </div>

                  <div>
                    <Label>Language</Label>
                    <Select value={config.language} onValueChange={(value) => setConfig({...config, language: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto-detect</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="it">Italian</SelectItem>
                        <SelectItem value="pt">Portuguese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Banner Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>Banner Configuration</CardTitle>
                  <CardDescription>Customize banner appearance and behavior</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Banner Position</Label>
                    <Select value={config.bannerPosition} onValueChange={(value) => setConfig({...config, bannerPosition: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top">Top</SelectItem>
                        <SelectItem value="bottom">Bottom</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Banner Style</Label>
                    <Select value={config.bannerStyle} onValueChange={(value) => setConfig({...config, bannerStyle: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Theme</Label>
                    <Select value={config.theme} onValueChange={(value) => setConfig({...config, theme: value})}>
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

                  <div>
                    <Label>Button Style</Label>
                    <Select value={config.buttonStyle} onValueChange={(value) => setConfig({...config, buttonStyle: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="solid">Solid</SelectItem>
                        <SelectItem value="outline">Outline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Styling Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>Styling Configuration</CardTitle>
                  <CardDescription>Customize colors and visual appearance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Primary Color</Label>
                      <Input
                        type="color"
                        value={config.primaryColor}
                        onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Background Color</Label>
                      <Input
                        type="color"
                        value={config.backgroundColor}
                        onChange={(e) => setConfig({...config, backgroundColor: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Text Color</Label>
                      <Input
                        type="color"
                        value={config.textColor}
                        onChange={(e) => setConfig({...config, textColor: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Border Radius</Label>
                      <Input
                        value={config.borderRadius}
                        onChange={(e) => setConfig({...config, borderRadius: e.target.value})}
                        placeholder="8px"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Compliance Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Configuration</CardTitle>
                  <CardDescription>Configure legal compliance features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Primary Jurisdiction</Label>
                    <Select value={config.jurisdiction} onValueChange={(value) => setConfig({...config, jurisdiction: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto-detect</SelectItem>
                        <SelectItem value="gdpr">GDPR (EU)</SelectItem>
                        <SelectItem value="ccpa">CCPA (California)</SelectItem>
                        <SelectItem value="lgpd">LGPD (Brazil)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Auto-block Tracking</Label>
                      <Switch
                        checked={config.autoBlock}
                        onCheckedChange={(checked) => setConfig({...config, autoBlock: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>Granular Consent</Label>
                      <Switch
                        checked={config.granularConsent}
                        onCheckedChange={(checked) => setConfig({...config, granularConsent: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>Show Decline Button</Label>
                      <Switch
                        checked={config.showDeclineButton}
                        onCheckedChange={(checked) => setConfig({...config, showDeclineButton: checked})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Consent Expiry (days)</Label>
                    <Input
                      type="number"
                      value={config.consentExpiry}
                      onChange={(e) => setConfig({...config, consentExpiry: parseInt(e.target.value)})}
                      min="1"
                      max="365"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Insights Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Insights Configuration</CardTitle>
                  <CardDescription>Configure monetization and revenue settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Enable Privacy Insights</Label>
                    <Switch
                      checked={config.enablePrivacyInsights}
                      onCheckedChange={(checked) => setConfig({...config, enablePrivacyInsights: checked})}
                    />
                  </div>

                  {config.enablePrivacyInsights && (
                    <>
                      <div>
                        <Label>Widget Frequency (per session)</Label>
                        <Input
                          type="number"
                          value={config.privacyInsightsFrequency}
                          onChange={(e) => setConfig({...config, privacyInsightsFrequency: parseInt(e.target.value)})}
                          min="1"
                          max="10"
                        />
                        <p className="text-xs text-gray-500 mt-1">Show Privacy Insights every N page views</p>
                      </div>

                      <div>
                        <Label>Revenue Share</Label>
                        <Select 
                          value={config.revenueShare.toString()} 
                          onValueChange={(value) => setConfig({...config, revenueShare: parseFloat(value)})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0.5">50% (Standard)</SelectItem>
                            <SelectItem value="0.6">60% (Premium)</SelectItem>
                            <SelectItem value="0.7">70% (Enterprise)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Widget Delay (ms)</Label>
                          <Input
                            type="number"
                            value={config.privacyWidgetDelay}
                            onChange={(e) => setConfig({...config, privacyWidgetDelay: parseInt(e.target.value)})}
                            min="1000"
                            max="10000"
                            step="1000"
                          />
                        </div>
                        <div>
                          <Label>Widget Duration (ms)</Label>
                          <Input
                            type="number"
                            value={config.privacyWidgetDuration}
                            onChange={(e) => setConfig({...config, privacyWidgetDuration: parseInt(e.target.value)})}
                            min="5000"
                            max="30000"
                            step="5000"
                          />
                        </div>
                      </div>

                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800">
                          <strong>Estimated Monthly Revenue:</strong> ${((currentData.visitors * 0.1 * config.revenueShare * 30) / 1000).toFixed(2)} 
                          <span className="text-xs block mt-1">Based on current traffic and {config.revenueShare * 100}% revenue share</span>
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Generated Script Section */}
            <Card>
              <CardHeader>
                <CardTitle>Generated Script</CardTitle>
                <CardDescription>Copy this script to your website's &lt;head&gt; section</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{generatedScript}</pre>
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={copyScript} className="flex-1">
                    📋 Copy Script
                  </Button>
                  <Button onClick={downloadScript} variant="outline" className="flex-1">
                    💾 Download HTML
                  </Button>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Integration Instructions:</strong>
                  </p>
                  <ol className="text-xs text-blue-700 mt-2 space-y-1">
                    <li>1. Copy the script above</li>
                    <li>2. Paste it in your website's &lt;head&gt; section</li>
                    <li>3. Replace "your-client-id" with your actual client ID</li>
                    <li>4. The cookie banner will appear automatically</li>
                  </ol>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-800">
                    <strong>⚠️ Important:</strong> Make sure you have deployed the enhanced V3 script to your backend at 
                    <code className="bg-orange-200 px-1 rounded">https://cookiebot-ai-backend.vercel.app/static/enhanced_cookiebot_ai_v3.js</code>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>🇪🇺</span>
                    <span>GDPR</span>
                  </CardTitle>
                  <CardDescription>European Union compliance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Status:</span>
                      <Badge className={config.jurisdiction === 'gdpr' || config.jurisdiction === 'auto' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {config.jurisdiction === 'gdpr' || config.jurisdiction === 'auto' ? "Active" : "Available"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Ensures compliance with EU General Data Protection Regulation
                    </p>
                    <div className="text-xs text-gray-500">
                      <p>✓ Granular consent: {config.granularConsent ? 'Enabled' : 'Disabled'}</p>
                      <p>✓ Auto-blocking: {config.autoBlock ? 'Enabled' : 'Disabled'}</p>
                      <p>✓ Decline option: {config.showDeclineButton ? 'Enabled' : 'Disabled'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>🇺🇸</span>
                    <span>CCPA</span>
                  </CardTitle>
                  <CardDescription>California compliance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Status:</span>
                      <Badge className={config.jurisdiction === 'ccpa' || config.jurisdiction === 'auto' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {config.jurisdiction === 'ccpa' || config.jurisdiction === 'auto' ? "Active" : "Available"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Complies with California Consumer Privacy Act
                    </p>
                    <div className="text-xs text-gray-500">
                      <p>✓ Do Not Sell option</p>
                      <p>✓ Opt-out mechanisms</p>
                      <p>✓ Consumer rights disclosure</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>🇧🇷</span>
                    <span>LGPD</span>
                  </CardTitle>
                  <CardDescription>Brazil compliance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Status:</span>
                      <Badge className={config.jurisdiction === 'lgpd' || config.jurisdiction === 'auto' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {config.jurisdiction === 'lgpd' || config.jurisdiction === 'auto' ? "Active" : "Available"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Follows Brazilian General Data Protection Law
                    </p>
                    <div className="text-xs text-gray-500">
                      <p>✓ Data subject rights</p>
                      <p>✓ Consent mechanisms</p>
                      <p>✓ Privacy by design</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Summary</CardTitle>
                <CardDescription>Current compliance configuration overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Active Features</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className={config.autoBlock ? "text-green-600" : "text-gray-400"}>
                          {config.autoBlock ? "✓" : "✗"}
                        </span>
                        <span>Auto-blocking of tracking scripts</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={config.granularConsent ? "text-green-600" : "text-gray-400"}>
                          {config.granularConsent ? "✓" : "✗"}
                        </span>
                        <span>Granular consent categories</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={config.showDeclineButton ? "text-green-600" : "text-gray-400"}>
                          {config.showDeclineButton ? "✓" : "✗"}
                        </span>
                        <span>Decline button option</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600">✓</span>
                        <span>Consent expiry: {config.consentExpiry} days</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Jurisdiction Settings</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Primary Jurisdiction:</span>
                        <Badge>{config.jurisdiction.toUpperCase()}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Auto-detection:</span>
                        <span className={config.jurisdiction === 'auto' ? "text-green-600" : "text-gray-400"}>
                          {config.jurisdiction === 'auto' ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Multi-jurisdiction:</span>
                        <span className="text-green-600">Supported</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview Tab - FIXED Enhanced Live Preview */}
          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>See how your cookie banner will look with Privacy Insights (V3 Enhanced)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Device Selector */}
                <div className="flex space-x-2">
                  <Button
                    variant={previewDevice === 'desktop' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPreviewDevice('desktop')}
                  >
                    🖥️ Desktop
                  </Button>
                  <Button
                    variant={previewDevice === 'tablet' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPreviewDevice('tablet')}
                  >
                    📱 Tablet
                  </Button>
                  <Button
                    variant={previewDevice === 'mobile' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPreviewDevice('mobile')}
                  >
                    📱 Mobile
                  </Button>
                </div>

                {/* FIXED: Live Preview with Real V3 Script */}
                <LivePreview />

                {/* Configuration Summary */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Current Configuration:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    <div>Position: {config.bannerPosition}</div>
                    <div>Style: {config.bannerStyle}</div>
                    <div>Theme: {config.theme}</div>
                    <div>Jurisdiction: {config.jurisdiction}</div>
                    <div>Privacy Insights: {config.enablePrivacyInsights ? 'Enabled' : 'Disabled'}</div>
                    <div>Revenue Share: {config.revenueShare * 100}%</div>
                    <div>Auto-block: {config.autoBlock ? 'Yes' : 'No'}</div>
                    <div>Granular: {config.granularConsent ? 'Yes' : 'No'}</div>
                    <div>Decline Button: {config.showDeclineButton ? 'Yes' : 'No'}</div>
                  </div>
                </div>

                {config.enablePrivacyInsights && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium mb-2 text-green-800">Privacy Insights Active (V3 Enhanced)</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-green-700">
                      <div>Frequency: Every {config.privacyInsightsFrequency} views</div>
                      <div>Revenue Share: {config.revenueShare * 100}%</div>
                      <div>Widget Delay: {config.privacyWidgetDelay / 1000}s</div>
                      <div>Widget Duration: {config.privacyWidgetDuration / 1000}s</div>
                    </div>
                  </div>
                )}

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2 text-blue-800">Preview Information</h4>
                  <p className="text-sm text-blue-700">
                    This preview loads the enhanced V3 script with all your configuration settings. 
                    The cookie banner and Privacy Insights widget will appear based on your settings.
                  </p>
                  <p className="text-xs text-blue-600 mt-2">
                    <strong>Note:</strong> Make sure the enhanced V3 script is deployed to your backend for the preview to work correctly.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default EnhancedDashboard

