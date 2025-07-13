import React, { useState, useEffect } from 'react'
import { Button } from './ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs.jsx'
import { Badge } from './ui/badge.jsx'
import { Input } from './ui/input.jsx'
import { Label } from './ui/label.jsx'
import { Switch } from './ui/switch.jsx'
import { Textarea } from './ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select.jsx'

// Enhanced Dashboard with Advanced Customization Features
// Now properly controls the working Privacy Insights script

const EnhancedDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Updated Configuration State - Maps to Working Script Options
  const [config, setConfig] = useState({
    // Basic Configuration
    companyName: 'Your Company',
    companyLogo: '',
    clientId: 'your-client-id',
    
    // Banner Configuration (maps to working script)
    bannerPosition: 'bottom', // data-banner-position
    bannerStyle: 'modern', // internal config
    showLogo: true, // internal config
    
    // Layout and Positioning
    layout: 'dialog',
    position: 'bottom',
    
    // Styling (maps to working script colors)
    theme: 'light',
    customColors: {
      background: '#ffffff', // backgroundColor in script
      text: '#333333', // textColor in script  
      accent: '#007bff', // primaryColor in script
      button: '#10b981'
    },
    borderRadius: '8px', // borderRadius in script
    
    // Button and Banner Styling
    buttonStyle: 'default',
    bannerType: 'multilevel',
    
    // Compliance Configuration (maps to working script)
    compliance: {
      gdpr: true,
      ccpa: true,
      lgpd: false
    },
    jurisdiction: 'auto', // jurisdiction in script (auto/gdpr/ccpa/lgpd)
    
    // Privacy Insights Configuration (maps to working script)
    privacyInsights: {
      enabled: true, // data-enable-privacy-insights
      frequency: 3, // affects privacyWidgetDelay calculation
      content: 'educational',
      widgetDelay: 3000, // privacyWidgetDelay in script
      widgetDuration: 15000, // privacyWidgetDuration in script
      revenueShare: 0.6 // data-revenue-share
    },
    
    // Consent Configuration (maps to working script)
    autoBlock: true, // autoBlock in script
    consentExpiry: 365, // data-consent-expiry
    showDeclineButton: true, // showDeclineButton in script
    granularConsent: true, // granularConsent in script
    
    // API Configuration
    apiEndpoint: 'https://cookiebot-ai-backend.vercel.app/api', // data-api-endpoint
    
    // Language and Localization
    language: 'auto' // language in script
  })

  const [previewDevice, setPreviewDevice] = useState('desktop')

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
    }
  }, [])

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

  // Use demo data for display (either for unauthenticated users or as fallback)
  const currentData = isAuthenticated ? realData : demoData

  // Generate script with ALL working script configuration options
  const generateWorkingScript = () => {
    const scriptAttributes = [
      `src="https://cookiebot.ai/cookiebot-ai.js"`,
      `data-cbid="${config.clientId}"`,
      `data-api-endpoint="${config.apiEndpoint}"`,
      `data-company-name="${config.companyName}"`,
      `data-banner-position="${config.bannerPosition}"`,
      `data-primary-color="${config.customColors.accent}"`,
      config.companyLogo ? `data-logo-url="${config.companyLogo}"` : null,
      `data-enable-privacy-insights="${config.privacyInsights.enabled}"`,
      `data-revenue-share="${config.privacyInsights.revenueShare}"`,
      `data-auto-block="${config.autoBlock}"`,
      `data-consent-expiry="${config.consentExpiry}"`,
      `data-show-decline="${config.showDeclineButton}"`,
      `data-granular-consent="${config.granularConsent}"`,
      `data-jurisdiction="${config.jurisdiction}"`,
      `data-background-color="${config.customColors.background}"`,
      `data-text-color="${config.customColors.text}"`,
      `data-border-radius="${config.borderRadius}"`,
      `data-privacy-widget-delay="${config.privacyInsights.widgetDelay}"`,
      `data-privacy-widget-duration="${config.privacyInsights.widgetDuration}"`,
      `data-language="${config.language}"`
    ].filter(Boolean) // Remove null values
    
    return `<script ${scriptAttributes.join('\n        ')}>\n</script>`
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    // Could add a toast notification here
  }

  const downloadScript = () => {
    const script = generateWorkingScript()
    const blob = new Blob([script], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cookiebot-ai-script.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Enhanced Preview Component with Privacy Insights
  const LivePreview = () => {
    const [showPrivacyInsights, setShowPrivacyInsights] = useState(false)
    const [consentGiven, setConsentGiven] = useState(false)
    
    // Simulate Privacy Insights widget appearing after consent
    useEffect(() => {
      if (consentGiven && config.privacyInsights.enabled) {
        const timer = setTimeout(() => {
          setShowPrivacyInsights(true)
        }, config.privacyInsights.widgetDelay) // Use actual config delay
        
        return () => clearTimeout(timer)
      }
    }, [consentGiven, config.privacyInsights.enabled, config.privacyInsights.widgetDelay])
    
    const handleAcceptCookies = () => {
      setConsentGiven(true)
    }

    return (
      <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: '400px' }}>
        {/* Simulated Website Content */}
        <div className="p-6 h-full">
          <div className="bg-white rounded shadow-sm p-4 mb-4">
            <h3 className="font-semibold text-gray-900">Your Website Content</h3>
            <p className="text-gray-600 text-sm mt-2">This preview shows how your cookie consent banner will appear with your current configuration.</p>
          </div>
          
          {/* Cookie Consent Banner - Styled with actual config */}
          {!consentGiven && (
            <div 
              className={`fixed ${config.bannerPosition === 'top' ? 'top-0' : 'bottom-0'} left-0 right-0 z-50 p-4`}
              style={{ 
                backgroundColor: config.customColors.background, 
                color: config.customColors.text,
                borderRadius: config.bannerPosition === 'center' ? config.borderRadius : '0'
              }}
            >
              <div className="max-w-6xl mx-auto">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">🍪</div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      {config.showLogo && config.companyLogo && (
                        <img src={config.companyLogo} alt="Logo" className="h-6 w-6 mr-2" />
                      )}
                      <h3 className="font-semibold text-sm">
                        {config.companyName} Cookie Consent
                      </h3>
                    </div>
                    <p className="text-xs opacity-80">
                      We use cookies to enhance your experience{config.privacyInsights.enabled && ' and provide privacy insights'}.
                      {config.granularConsent && ' You can customize your preferences below.'}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {config.showDeclineButton && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        style={{ 
                          borderColor: config.customColors.accent, 
                          color: config.customColors.accent,
                          borderRadius: config.borderRadius
                        }}
                      >
                        Decline
                      </Button>
                    )}
                    <Button 
                      size="sm"
                      onClick={handleAcceptCookies}
                      style={{ 
                        backgroundColor: config.customColors.accent, 
                        color: 'white',
                        borderRadius: config.borderRadius
                      }}
                    >
                      Accept All
                    </Button>
                  </div>
                </div>
                
                {/* Granular Consent Options */}
                {config.granularConsent && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      <label className="flex items-center">
                        <input type="checkbox" checked disabled className="mr-1" />
                        Necessary
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-1" />
                        Analytics
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-1" />
                        Marketing
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-1" />
                        Functional
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Privacy Insights Widget - Styled with actual config */}
          {showPrivacyInsights && (
            <div 
              className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50"
              style={{ borderRadius: config.borderRadius }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                    style={{ 
                      background: `linear-gradient(135deg, ${config.customColors.accent}, ${config.customColors.button})`,
                      borderRadius: config.borderRadius
                    }}
                  >
                    <span className="text-white text-sm">🛡️</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Privacy Insights</h4>
                    <p className="text-xs text-gray-600">Educational content • Revenue share: {(config.privacyInsights.revenueShare * 100)}%</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowPrivacyInsights(false)}
                >
                  ×
                </Button>
              </div>
              
              <div className="text-sm text-gray-700 mb-3">
                <p className="font-medium mb-1">Did you know?</p>
                <p>Websites use cookies to remember your preferences and improve your experience. You can manage these settings anytime in your browser.</p>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  style={{ 
                    backgroundColor: config.customColors.accent,
                    borderRadius: config.borderRadius
                  }}
                >
                  Learn More
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowPrivacyInsights(false)}
                  style={{ borderRadius: config.borderRadius }}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Configure your Privacy Insights cookie consent system</p>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="websites">Websites</TabsTrigger>
            <TabsTrigger value="configuration">Config</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <span className="text-2xl">💰</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${currentData.revenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Visitors</CardTitle>
                  <span className="text-2xl">👥</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentData.visitors.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+8.2% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Consent Rate</CardTitle>
                  <span className="text-2xl">✅</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentData.consent_rate}%</div>
                  <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Websites</CardTitle>
                  <span className="text-2xl">🌐</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentData.websites}</div>
                  <p className="text-xs text-muted-foreground">+1 new this month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest website performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demoData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
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
                          <div className="flex space-x-2">
                            <Badge variant="secondary">{config.jurisdiction.toUpperCase()}</Badge>
                            <Badge variant="outline">Privacy Insights</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configuration Tab - Now controls ALL working script options */}
          <TabsContent value="configuration" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Basic Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Configuration</CardTitle>
                  <CardDescription>Essential settings for your cookie banner</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="client-id">Client ID</Label>
                    <Input
                      id="client-id"
                      value={config.clientId}
                      onChange={(e) => setConfig({...config, clientId: e.target.value})}
                      placeholder="your-client-id"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      value={config.companyName}
                      onChange={(e) => setConfig({...config, companyName: e.target.value})}
                      placeholder="Your Company"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company-logo">Company Logo URL</Label>
                    <Input
                      id="company-logo"
                      value={config.companyLogo}
                      onChange={(e) => setConfig({...config, companyLogo: e.target.value})}
                      placeholder="https://yoursite.com/logo.png"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="banner-position">Banner Position</Label>
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
                </CardContent>
              </Card>

              {/* Privacy Insights Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Insights Revenue</CardTitle>
                  <CardDescription>Configure your monetization settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Enable Privacy Insights</Label>
                    <Switch
                      checked={config.privacyInsights.enabled}
                      onCheckedChange={(checked) => setConfig({...config, privacyInsights: {...config.privacyInsights, enabled: checked}})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Widget Delay (milliseconds)</Label>
                    <Input
                      type="number"
                      value={config.privacyInsights.widgetDelay}
                      onChange={(e) => setConfig({...config, privacyInsights: {...config.privacyInsights, widgetDelay: parseInt(e.target.value)}})}
                      min="1000"
                      max="10000"
                      step="500"
                    />
                    <p className="text-xs text-gray-500">Delay before showing Privacy Insights widget after consent</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Widget Duration (milliseconds)</Label>
                    <Input
                      type="number"
                      value={config.privacyInsights.widgetDuration}
                      onChange={(e) => setConfig({...config, privacyInsights: {...config.privacyInsights, widgetDuration: parseInt(e.target.value)}})}
                      min="5000"
                      max="30000"
                      step="1000"
                    />
                    <p className="text-xs text-gray-500">How long the widget stays visible</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Revenue Share</Label>
                    <Select 
                      value={config.privacyInsights.revenueShare.toString()} 
                      onValueChange={(value) => setConfig({...config, privacyInsights: {...config.privacyInsights, revenueShare: parseFloat(value)}})}
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

                  {config.privacyInsights.enabled && (
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Revenue Projection</h4>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-purple-600">
                            {Math.round(currentData.visitors * 0.785).toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-600">Monthly Consents</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-600">
                            ${Math.round(currentData.visitors * 0.785 * 0.15 * config.privacyInsights.revenueShare).toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-600">Est. Monthly Revenue</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Compliance Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Settings</CardTitle>
                  <CardDescription>Configure legal compliance options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Primary Jurisdiction</Label>
                    <Select value={config.jurisdiction} onValueChange={(value) => setConfig({...config, jurisdiction: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto-detect</SelectItem>
                        <SelectItem value="gdpr">GDPR (European Union)</SelectItem>
                        <SelectItem value="ccpa">CCPA (California)</SelectItem>
                        <SelectItem value="lgpd">LGPD (Brazil)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>Auto-block Cookies</Label>
                    <Switch
                      checked={config.autoBlock}
                      onCheckedChange={(checked) => setConfig({...config, autoBlock: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>Show Decline Button</Label>
                    <Switch
                      checked={config.showDeclineButton}
                      onCheckedChange={(checked) => setConfig({...config, showDeclineButton: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>Granular Consent</Label>
                    <Switch
                      checked={config.granularConsent}
                      onCheckedChange={(checked) => setConfig({...config, granularConsent: checked})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Consent Expiry (days)</Label>
                    <Input
                      type="number"
                      value={config.consentExpiry}
                      onChange={(e) => setConfig({...config, consentExpiry: parseInt(e.target.value)})}
                      min="30"
                      max="730"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Styling Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>Styling & Appearance</CardTitle>
                  <CardDescription>Customize colors and visual appearance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <Input
                      type="color"
                      value={config.customColors.accent}
                      onChange={(e) => setConfig({...config, customColors: {...config.customColors, accent: e.target.value}})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Background Color</Label>
                    <Input
                      type="color"
                      value={config.customColors.background}
                      onChange={(e) => setConfig({...config, customColors: {...config.customColors, background: e.target.value}})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Text Color</Label>
                    <Input
                      type="color"
                      value={config.customColors.text}
                      onChange={(e) => setConfig({...config, customColors: {...config.customColors, text: e.target.value}})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Border Radius</Label>
                    <Select value={config.borderRadius} onValueChange={(value) => setConfig({...config, borderRadius: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0px">Square (0px)</SelectItem>
                        <SelectItem value="4px">Slightly Rounded (4px)</SelectItem>
                        <SelectItem value="8px">Rounded (8px)</SelectItem>
                        <SelectItem value="12px">Very Rounded (12px)</SelectItem>
                        <SelectItem value="20px">Pill Shape (20px)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>Show Company Logo</Label>
                    <Switch
                      checked={config.showLogo}
                      onCheckedChange={(checked) => setConfig({...config, showLogo: checked})}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Generated Script */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Generated Script</CardTitle>
                  <CardDescription>Copy this script to your website's &lt;head&gt; section</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 rounded-lg p-4 mb-4">
                    <pre className="text-green-400 text-xs overflow-x-auto">
                      <code>{generateWorkingScript()}</code>
                    </pre>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => copyToClipboard(generateWorkingScript())} className="flex-1">
                      Copy Script
                    </Button>
                    <Button onClick={downloadScript} variant="outline">
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>See how your cookie banner will look with current configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-4">
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
                  
                  <LivePreview />
                  
                  {/* Configuration Summary */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Current Configuration:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Company: {config.companyName}</div>
                      <div>Position: {config.bannerPosition}</div>
                      <div>Jurisdiction: {config.jurisdiction}</div>
                      <div>Privacy Insights: {config.privacyInsights.enabled ? 'Enabled' : 'Disabled'}</div>
                      <div>Auto-block: {config.autoBlock ? 'Yes' : 'No'}</div>
                      <div>Granular Consent: {config.granularConsent ? 'Yes' : 'No'}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Overview</CardTitle>
                <CardDescription>Monitor your compliance status across different regulations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 border rounded-lg">
                    <div className="text-3xl mb-2">🇪🇺</div>
                    <h3 className="font-semibold">GDPR</h3>
                    <p className="text-sm text-gray-600 mb-2">European Union</p>
                    <Badge variant={config.jurisdiction === 'gdpr' || config.jurisdiction === 'auto' ? 'default' : 'secondary'}>
                      {config.jurisdiction === 'gdpr' || config.jurisdiction === 'auto' ? 'Active' : 'Available'}
                    </Badge>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <div className="text-3xl mb-2">🇺🇸</div>
                    <h3 className="font-semibold">CCPA</h3>
                    <p className="text-sm text-gray-600 mb-2">California</p>
                    <Badge variant={config.jurisdiction === 'ccpa' ? 'default' : 'secondary'}>
                      {config.jurisdiction === 'ccpa' ? 'Active' : 'Available'}
                    </Badge>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <div className="text-3xl mb-2">🇧🇷</div>
                    <h3 className="font-semibold">LGPD</h3>
                    <p className="text-sm text-gray-600 mb-2">Brazil</p>
                    <Badge variant={config.jurisdiction === 'lgpd' ? 'default' : 'secondary'}>
                      {config.jurisdiction === 'lgpd' ? 'Active' : 'Available'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Insights Revenue</CardTitle>
                <CardDescription>Track your earnings from the Privacy Insights system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-2">This Month</h3>
                      <div className="text-3xl font-bold text-green-600">${currentData.revenue.toLocaleString()}</div>
                      <p className="text-sm text-gray-600">+12.5% from last month</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-2">Revenue Share</h3>
                      <div className="text-3xl font-bold text-purple-600">{(config.privacyInsights.revenueShare * 100)}%</div>
                      <p className="text-sm text-gray-600">Your share of Privacy Insights revenue</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Recent Payouts</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-sm">June 2025</span>
                        <span className="font-medium text-green-600">$2,156.80</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-sm">May 2025</span>
                        <span className="font-medium text-green-600">$1,943.20</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-sm">April 2025</span>
                        <span className="font-medium text-green-600">$1,789.40</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Payout Information</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Current Balance:</span>
                          <span className="font-medium">${(currentData.revenue * config.privacyInsights.revenueShare).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Minimum Payout:</span>
                          <span className="font-medium">$50.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Next Payout:</span>
                          <span className="font-medium">End of Month</span>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-4" disabled={(currentData.revenue * config.privacyInsights.revenueShare) < 50}>
                        {(currentData.revenue * config.privacyInsights.revenueShare) >= 50 ? 'Request Payout' : 'Minimum Not Reached'}
                      </Button>
                    </div>
                  </div>
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

