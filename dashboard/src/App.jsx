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
  Sparkles
} from 'lucide-react'
import './App.css'

// Mock data for demonstration (same as before)
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
  ],
  websites: [
    { 
      id: 1, 
      domain: 'example.com', 
      status: 'active', 
      visitors: 45230, 
      consentRate: 82.1,
      revenue: 1247.50,
      lastScan: '2025-07-07 10:30'
    },
    { 
      id: 2, 
      domain: 'shop.example.com', 
      status: 'active', 
      visitors: 32100, 
      consentRate: 76.8,
      revenue: 892.30,
      lastScan: '2025-07-07 09:15'
    },
    { 
      id: 3, 
      domain: 'blog.example.com', 
      status: 'warning', 
      visitors: 18900, 
      consentRate: 71.2,
      revenue: 456.80,
      lastScan: '2025-07-06 14:20'
    }
  ]
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [settings, setSettings] = useState({
    // Basic Settings
    companyName: 'Demo Company',
    logoUrl: '',
    
    // Layout Configuration
    layout: 'dialog', // 'dialog' | 'bar'
    position: 'bottom', // 'top' | 'bottom' | 'center'
    overlay: true,
    slideIn: true,
    
    // Theme Configuration
    theme: 'light', // 'light' | 'dark' | 'custom'
    customColors: {
      background: '#ffffff',
      text: '#333333',
      accent: '#667eea',
      buttonPrimary: '#667eea',
      buttonSecondary: '#6c757d',
      overlayColor: 'rgba(0, 0, 0, 0.5)'
    },
    
    // Button Configuration
    buttonStyle: 'default', // 'default' | 'solid' | 'outline'
    
    // Banner Type
    bannerType: 'multilevel', // 'multilevel' | 'accept-only' | 'accept-decline' | 'inline-multilevel' | 'ccpa'
    
    // Advanced Options
    showCloseIcon: false,
    checkboxDefaults: {
      preferences: false,
      statistics: false,
      marketing: false
    },
    
    // Legacy/Compatibility
    primaryColor: '#667eea', // Mapped to customColors.accent
    bannerPosition: 'bottom', // Mapped to position
    enableAffiliateAds: true,
    autoBlock: true,
    consentExpiry: 365,
    showDeclineButton: true,
    granularConsent: true,
    
    // Responsive Configuration
    mobileBreakpoint: 600,
    tabletBreakpoint: 1280,
    
    // Compliance
    jurisdiction: 'auto', // 'auto' | 'gdpr' | 'ccpa' | 'lgpd'
    language: 'auto'
  })

  const [clientId] = useState('demo-client-123')
  const [scriptCode, setScriptCode] = useState('')
  const [previewMode, setPreviewMode] = useState('desktop') // 'desktop' | 'tablet' | 'mobile'

  useEffect(() => {
    // Generate enhanced script code based on settings
    const code = `<script src="https://cdn.cookiebot.ai/v2/cookiebot-ai-enhanced.js" 
        data-cbid="${clientId}"
        data-company-name="${settings.companyName}"
        ${settings.logoUrl ? `data-logo-url="${settings.logoUrl}"` : ''}
        data-layout="${settings.layout}"
        data-position="${settings.position}"
        data-overlay="${settings.overlay}"
        data-slide-in="${settings.slideIn}"
        data-theme="${settings.theme}"
        data-button-style="${settings.buttonStyle}"
        data-banner-type="${settings.bannerType}"
        data-show-close-icon="${settings.showCloseIcon}"
        data-enable-affiliate-ads="${settings.enableAffiliateAds}"
        data-auto-block="${settings.autoBlock}"
        data-consent-expiry="${settings.consentExpiry}"
        data-jurisdiction="${settings.jurisdiction}"
        data-language="${settings.language}"
        ${settings.theme === 'custom' ? `data-custom-colors='${JSON.stringify(settings.customColors)}'` : ''}>
</script>`
    setScriptCode(code)
  }, [settings, clientId])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  const StatusBadge = ({ status }) => {
    const variants = {
      active: { variant: 'default', icon: CheckCircle, color: 'text-green-600' },
      warning: { variant: 'secondary', icon: AlertTriangle, color: 'text-yellow-600' },
      error: { variant: 'destructive', icon: XCircle, color: 'text-red-600' }
    }
    
    const config = variants[status] || variants.active
    const Icon = config.icon
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className={`h-3 w-3 ${config.color}`} />
        {status}
      </Badge>
    )
  }

  const PreviewBanner = () => {
    const getPreviewStyles = () => {
      const baseStyles = {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '14px',
        lineHeight: '1.5',
        borderRadius: settings.layout === 'dialog' ? '12px' : '0',
        padding: settings.layout === 'dialog' ? '24px' : '16px 24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        maxWidth: settings.layout === 'dialog' ? '400px' : 'none',
        margin: settings.layout === 'dialog' ? '20px' : '0'
      }

      const themeColors = settings.theme === 'custom' ? settings.customColors : 
        settings.theme === 'dark' ? {
          background: '#2d3748',
          text: '#ffffff',
          accent: '#63b3ed',
          buttonPrimary: '#63b3ed'
        } : {
          background: '#ffffff',
          text: '#333333',
          accent: '#667eea',
          buttonPrimary: '#667eea'
        }

      return {
        ...baseStyles,
        background: themeColors.background,
        color: themeColors.text,
        border: `1px solid ${themeColors.accent}20`
      }
    }

    const getButtonStyles = (isPrimary = false) => {
      const themeColors = settings.theme === 'custom' ? settings.customColors : 
        settings.theme === 'dark' ? {
          accent: '#63b3ed',
          buttonPrimary: '#63b3ed'
        } : {
          accent: '#667eea',
          buttonPrimary: '#667eea'
        }

      const baseButton = {
        padding: '8px 16px',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        border: '2px solid',
        margin: '0 4px'
      }

      if (settings.buttonStyle === 'solid') {
        return {
          ...baseButton,
          background: themeColors.accent,
          color: 'white',
          borderColor: themeColors.accent
        }
      } else if (settings.buttonStyle === 'outline') {
        return {
          ...baseButton,
          background: 'transparent',
          color: themeColors.accent,
          borderColor: themeColors.accent
        }
      } else { // default
        if (isPrimary) {
          return {
            ...baseButton,
            background: themeColors.buttonPrimary,
            color: 'white',
            borderColor: themeColors.buttonPrimary
          }
        } else {
          return {
            ...baseButton,
            background: 'transparent',
            color: settings.theme === 'dark' ? '#ffffff' : '#333333',
            borderColor: settings.theme === 'dark' ? '#4a5568' : '#e9ecef'
          }
        }
      }
    }

    const getButtons = () => {
      switch (settings.bannerType) {
        case 'accept-only':
          return <button style={getButtonStyles(true)}>Accept All</button>
        case 'accept-decline':
          return (
            <>
              <button style={getButtonStyles(false)}>Decline</button>
              <button style={getButtonStyles(true)}>Accept All</button>
            </>
          )
        case 'ccpa':
          return <button style={getButtonStyles(true)}>Save Preferences</button>
        case 'inline-multilevel':
          return (
            <>
              <button style={getButtonStyles(false)}>Customize</button>
              <button style={getButtonStyles(true)}>Accept All</button>
            </>
          )
        default: // multilevel
          return (
            <>
              {settings.showDeclineButton && <button style={getButtonStyles(false)}>Decline</button>}
              <button style={getButtonStyles(false)}>Save Preferences</button>
              <button style={getButtonStyles(true)}>Accept All</button>
            </>
          )
      }
    }

    return (
      <div style={{
        position: 'relative',
        background: '#f8f9fa',
        borderRadius: '8px',
        padding: '20px',
        minHeight: '200px',
        overflow: 'hidden'
      }}>
        {settings.overlay && settings.layout === 'dialog' && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '8px'
          }} />
        )}
        
        <div style={{
          position: 'absolute',
          [settings.position === 'top' ? 'top' : 'bottom']: settings.layout === 'dialog' ? '20px' : '0',
          [settings.layout === 'dialog' ? 'right' : 'left']: settings.layout === 'dialog' ? '20px' : '0',
          [settings.layout === 'dialog' ? 'left' : 'right']: settings.layout === 'dialog' ? 'auto' : '0',
          zIndex: 10,
          ...getPreviewStyles()
        }}>
          {settings.showCloseIcon && (
            <div style={{ position: 'absolute', top: '8px', right: '8px', fontSize: '16px', cursor: 'pointer' }}>×</div>
          )}
          
          {settings.logoUrl && (
            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <img src={settings.logoUrl} alt="Logo" style={{ maxHeight: '30px', maxWidth: '120px' }} />
            </div>
          )}
          
          {settings.companyName && !settings.logoUrl && (
            <div style={{ textAlign: 'center', marginBottom: '12px', fontWeight: 'bold', color: settings.customColors.accent }}>
              {settings.companyName}
            </div>
          )}
          
          <div style={{ marginBottom: '12px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>We value your privacy</h4>
            <p style={{ margin: '0', fontSize: '13px', opacity: 0.9 }}>
              We use cookies to enhance your experience. Choose your preferences below.
            </p>
          </div>
          
          {(settings.bannerType === 'multilevel' || settings.bannerType === 'ccpa') && (
            <div style={{ margin: '12px 0', fontSize: '12px' }}>
              {settings.bannerType === 'ccpa' ? (
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" />
                  Do Not Sell My Personal Information
                </label>
              ) : (
                <div style={{ display: 'grid', gap: '6px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                    <input type="checkbox" checked disabled />
                    Necessary
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                    <input type="checkbox" defaultChecked={settings.checkboxDefaults.preferences} />
                    Preferences
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                    <input type="checkbox" defaultChecked={settings.checkboxDefaults.statistics} />
                    Statistics
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                    <input type="checkbox" defaultChecked={settings.checkboxDefaults.marketing} />
                    Marketing
                  </label>
                </div>
              )}
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
            {getButtons()}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Cookie className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CookieBot.ai Enhanced</h1>
                <p className="text-sm text-gray-600">Advanced Cookie Consent Management Platform v2.0</p>
              </div>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Enhanced Edition
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockAnalytics.totalVisitors.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Consent Rate</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockAnalytics.consentRate}%</div>
                  <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Affiliate Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${mockAnalytics.affiliateRevenue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">+18.7% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Websites</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockAnalytics.activeWebsites}</div>
                  <p className="text-xs text-muted-foreground">+2 new this month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Consents & Revenue</CardTitle>
                  <CardDescription>Consent collection and affiliate revenue over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockAnalytics.dailyConsents}>
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
                  <CardDescription>Breakdown of consent preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={mockAnalytics.consentCategories}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {mockAnalytics.consentCategories.map((entry, index) => (
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
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="h-5 w-5" />
                    Layout Configuration
                  </CardTitle>
                  <CardDescription>Configure banner layout and positioning</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="layout">Banner Layout</Label>
                    <Select value={settings.layout} onValueChange={(value) => setSettings({...settings, layout: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dialog">Dialog (Floating Window)</SelectItem>
                        <SelectItem value="bar">Bar (Full Width)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Dialog appears as a floating window, Bar spans the full width
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Select value={settings.position} onValueChange={(value) => setSettings({...settings, position: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top">Top</SelectItem>
                        <SelectItem value="bottom">Bottom</SelectItem>
                        {settings.layout === 'dialog' && <SelectItem value="center">Center</SelectItem>}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="overlay"
                      checked={settings.overlay}
                      onCheckedChange={(checked) => setSettings({...settings, overlay: checked})}
                    />
                    <Label htmlFor="overlay">Show Overlay</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Adds a semi-transparent background overlay (Dialog only)
                  </p>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="slideIn"
                      checked={settings.slideIn}
                      onCheckedChange={(checked) => setSettings({...settings, slideIn: checked})}
                    />
                    <Label htmlFor="slideIn">Slide-in Animation</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="showCloseIcon"
                      checked={settings.showCloseIcon}
                      onCheckedChange={(checked) => setSettings({...settings, showCloseIcon: checked})}
                    />
                    <Label htmlFor="showCloseIcon">Show Close Icon</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Live Preview
                  </CardTitle>
                  <CardDescription>See how your banner will look</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant={previewMode === 'desktop' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPreviewMode('desktop')}
                      >
                        <Monitor className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={previewMode === 'tablet' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPreviewMode('tablet')}
                      >
                        <Tablet className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={previewMode === 'mobile' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPreviewMode('mobile')}
                      >
                        <Smartphone className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div style={{
                      width: previewMode === 'mobile' ? '320px' : previewMode === 'tablet' ? '768px' : '100%',
                      maxWidth: '100%',
                      margin: '0 auto',
                      transition: 'width 0.3s ease'
                    }}>
                      <PreviewBanner />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Design Tab */}
          <TabsContent value="design" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Theme & Colors
                  </CardTitle>
                  <CardDescription>Customize the visual appearance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={settings.theme} onValueChange={(value) => setSettings({...settings, theme: value})}>
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

                  {settings.theme === 'custom' && (
                    <div className="space-y-4 p-4 border rounded-lg">
                      <h4 className="font-medium">Custom Colors</h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="bg-color">Background</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={settings.customColors.background}
                              onChange={(e) => setSettings({
                                ...settings,
                                customColors: {...settings.customColors, background: e.target.value}
                              })}
                              className="w-12 h-10 p-1"
                            />
                            <Input
                              value={settings.customColors.background}
                              onChange={(e) => setSettings({
                                ...settings,
                                customColors: {...settings.customColors, background: e.target.value}
                              })}
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="text-color">Text Color</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={settings.customColors.text}
                              onChange={(e) => setSettings({
                                ...settings,
                                customColors: {...settings.customColors, text: e.target.value}
                              })}
                              className="w-12 h-10 p-1"
                            />
                            <Input
                              value={settings.customColors.text}
                              onChange={(e) => setSettings({
                                ...settings,
                                customColors: {...settings.customColors, text: e.target.value}
                              })}
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="accent-color">Accent Color</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={settings.customColors.accent}
                              onChange={(e) => setSettings({
                                ...settings,
                                customColors: {...settings.customColors, accent: e.target.value}
                              })}
                              className="w-12 h-10 p-1"
                            />
                            <Input
                              value={settings.customColors.accent}
                              onChange={(e) => setSettings({
                                ...settings,
                                customColors: {...settings.customColors, accent: e.target.value}
                              })}
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="button-color">Button Color</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={settings.customColors.buttonPrimary}
                              onChange={(e) => setSettings({
                                ...settings,
                                customColors: {...settings.customColors, buttonPrimary: e.target.value}
                              })}
                              className="w-12 h-10 p-1"
                            />
                            <Input
                              value={settings.customColors.buttonPrimary}
                              onChange={(e) => setSettings({
                                ...settings,
                                customColors: {...settings.customColors, buttonPrimary: e.target.value}
                              })}
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="buttonStyle">Button Style</Label>
                    <Select value={settings.buttonStyle} onValueChange={(value) => setSettings({...settings, buttonStyle: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default (CTA Style)</SelectItem>
                        <SelectItem value="solid">Solid (Equal Weight)</SelectItem>
                        <SelectItem value="outline">Outline (Minimal)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Default emphasizes the accept button, Solid makes all buttons equal, Outline is minimal
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brush className="h-5 w-5" />
                    Branding
                  </CardTitle>
                  <CardDescription>Add your company branding</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={settings.companyName}
                      onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                      placeholder="Your Company Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logoUrl">Logo URL</Label>
                    <Input
                      id="logoUrl"
                      value={settings.logoUrl}
                      onChange={(e) => setSettings({...settings, logoUrl: e.target.value})}
                      placeholder="https://example.com/logo.png"
                    />
                    <p className="text-xs text-muted-foreground">
                      Supports JPG, PNG, GIF, SVG. Recommended size: 120x40px
                    </p>
                  </div>

                  {settings.logoUrl && (
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm font-medium mb-2">Logo Preview:</p>
                      <img 
                        src={settings.logoUrl} 
                        alt="Logo preview" 
                        className="max-h-10 max-w-32"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'block'
                        }}
                      />
                      <p className="text-xs text-red-500" style={{display: 'none'}}>
                        Failed to load logo. Please check the URL.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Banner Type & Consent
                  </CardTitle>
                  <CardDescription>Configure consent collection approach</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="bannerType">Banner Type</Label>
                    <Select value={settings.bannerType} onValueChange={(value) => setSettings({...settings, bannerType: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multilevel">Multilevel (Full Options)</SelectItem>
                        <SelectItem value="accept-only">Accept Only</SelectItem>
                        <SelectItem value="accept-decline">Accept/Decline Binary</SelectItem>
                        <SelectItem value="inline-multilevel">Inline Multilevel</SelectItem>
                        <SelectItem value="ccpa">CCPA "Do Not Sell"</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(settings.bannerType === 'multilevel' || settings.bannerType === 'inline-multilevel') && (
                    <>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="showDeclineButton"
                          checked={settings.showDeclineButton}
                          onCheckedChange={(checked) => setSettings({...settings, showDeclineButton: checked})}
                        />
                        <Label htmlFor="showDeclineButton">Show Decline Button</Label>
                      </div>

                      <div className="space-y-4 p-4 border rounded-lg">
                        <h4 className="font-medium">Default Consent Preferences</h4>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="defaultPreferences"
                            checked={settings.checkboxDefaults.preferences}
                            onCheckedChange={(checked) => setSettings({
                              ...settings,
                              checkboxDefaults: {...settings.checkboxDefaults, preferences: checked}
                            })}
                          />
                          <Label htmlFor="defaultPreferences">Preferences (pre-checked)</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id="defaultStatistics"
                            checked={settings.checkboxDefaults.statistics}
                            onCheckedChange={(checked) => setSettings({
                              ...settings,
                              checkboxDefaults: {...settings.checkboxDefaults, statistics: checked}
                            })}
                          />
                          <Label htmlFor="defaultStatistics">Statistics (pre-checked)</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id="defaultMarketing"
                            checked={settings.checkboxDefaults.marketing}
                            onCheckedChange={(checked) => setSettings({
                              ...settings,
                              checkboxDefaults: {...settings.checkboxDefaults, marketing: checked}
                            })}
                          />
                          <Label htmlFor="defaultMarketing">Marketing (pre-checked)</Label>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5" />
                    Legal Compliance
                  </CardTitle>
                  <CardDescription>Regional compliance settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="jurisdiction">Jurisdiction</Label>
                    <Select value={settings.jurisdiction} onValueChange={(value) => setSettings({...settings, jurisdiction: value})}>
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

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={settings.language} onValueChange={(value) => setSettings({...settings, language: value})}>
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

                  <div className="space-y-2">
                    <Label htmlFor="consentExpiry">Consent Expiry (days)</Label>
                    <Input
                      id="consentExpiry"
                      type="number"
                      value={settings.consentExpiry}
                      onChange={(e) => setSettings({...settings, consentExpiry: parseInt(e.target.value)})}
                      min="1"
                      max="730"
                    />
                    <p className="text-xs text-muted-foreground">
                      How long consent is valid before asking again (1-730 days)
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="autoBlock"
                      checked={settings.autoBlock}
                      onCheckedChange={(checked) => setSettings({...settings, autoBlock: checked})}
                    />
                    <Label htmlFor="autoBlock">Auto-block Tracking</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Automatically block tracking scripts until consent is given
                  </p>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enableAffiliateAds"
                      checked={settings.enableAffiliateAds}
                      onCheckedChange={(checked) => setSettings({...settings, enableAffiliateAds: checked})}
                    />
                    <Label htmlFor="enableAffiliateAds">Enable Affiliate Ads</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Show contextual ads in consent banners (revenue sharing enabled)
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Integration Tab */}
          <TabsContent value="integration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Integration Code
                </CardTitle>
                <CardDescription>Copy this code to your website's &lt;head&gt; section</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Textarea
                    value={scriptCode}
                    readOnly
                    className="font-mono text-sm min-h-[200px]"
                  />
                  <Button
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(scriptCode)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={() => copyToClipboard(scriptCode)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Enhanced Features Included:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>✅ Advanced layout options (Dialog/Bar)</li>
                    <li>✅ Professional themes (Light/Dark/Custom)</li>
                    <li>✅ Button style variations</li>
                    <li>✅ Multiple banner types</li>
                    <li>✅ GDPR/CCPA compliance</li>
                    <li>✅ Affiliate revenue system</li>
                    <li>✅ Responsive design</li>
                    <li>✅ Auto-blocking technology</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Websites Tab (same as before) */}
          <TabsContent value="websites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Management</CardTitle>
                <CardDescription>Manage your connected websites and their performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.websites.map((website) => (
                    <div key={website.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{website.domain}</h3>
                          <StatusBadge status={website.status} />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {website.visitors.toLocaleString()} visitors • {website.consentRate}% consent rate
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last scan: {website.lastScan}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          ${website.revenue.toFixed(2)}
                        </div>
                        <p className="text-xs text-muted-foreground">This month</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App

