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
// Integrates the working foundation with rich configuration options

const EnhancedDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Advanced Configuration State (restored from original)
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

  // Use demo data for sales, real data when authenticated
  const currentData = isAuthenticated ? realData : demoData

  // Live Preview Component (restored from original)
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

    const getBannerStyles = () => {
      const baseStyles = {
        backgroundColor: config.customColors.background,
        color: config.customColors.text,
        padding: '16px',
        borderRadius: config.layout === 'dialog' ? '8px' : '0px',
        boxShadow: config.layout === 'dialog' ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
        border: `1px solid ${config.customColors.accent}20`
      }

      if (config.layout === 'bar') {
        return {
          ...baseStyles,
          width: '100%',
          borderRadius: '0px',
          borderLeft: 'none',
          borderRight: 'none',
          borderTop: config.position === 'bottom' ? '1px solid' : 'none',
          borderBottom: config.position === 'top' ? '1px solid' : 'none'
        }
      }

      return baseStyles
    }

    const getButtonStyles = (isPrimary = false) => {
      const baseStyles = {
        padding: '8px 16px',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        border: 'none',
        marginRight: '8px'
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
      <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ minHeight: '400px' }}>
        <div className={`mx-auto ${getDeviceClass()} bg-white relative overflow-hidden border rounded-lg`}>
          {/* Simulated Website Content */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-2xl mb-2">🌐</div>
              <p className="text-sm">Your Website Preview</p>
              <p className="text-xs text-gray-400 mt-1">{config.companyName}</p>
            </div>
          </div>

          {/* Cookie Banner Preview */}
          <div 
            className={`absolute ${config.position === 'top' ? 'top-4' : config.position === 'center' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : 'bottom-4'} ${config.layout === 'bar' ? 'left-0 right-0' : 'left-4 right-4'}`}
            style={getBannerStyles()}
          >
            <div className="flex flex-col space-y-3">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🍪</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">Cookie Consent</h3>
                  <p className="text-xs opacity-80">
                    We use cookies to enhance your experience and show relevant ads.
                    {config.affiliateAds && " This helps support our platform."}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {config.bannerType === 'accept-only' && (
                  <button style={getButtonStyles(true)}>Accept All</button>
                )}
                
                {config.bannerType === 'accept-decline' && (
                  <>
                    <button style={getButtonStyles(true)}>Accept All</button>
                    <button style={getButtonStyles(false)}>Decline</button>
                  </>
                )}
                
                {(config.bannerType === 'multilevel' || config.bannerType === 'inline-multilevel') && (
                  <>
                    <button style={getButtonStyles(true)}>Accept All</button>
                    <button style={getButtonStyles(false)}>Customize</button>
                    <button style={getButtonStyles(false)}>Decline</button>
                  </>
                )}
                
                {config.bannerType === 'ccpa' && (
                  <>
                    <button style={getButtonStyles(true)}>Accept</button>
                    <button style={getButtonStyles(false)}>Do Not Sell My Info</button>
                  </>
                )}
              </div>
              
              {config.compliance.gdpr && (
                <p className="text-xs opacity-60">GDPR Compliant</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CookieBot.ai Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Advanced cookie consent platform with built-in monetization
              </p>
              {!isAuthenticated && (
                <Badge className="mt-2 bg-blue-100 text-blue-800">
                  Demo Mode - Sign in for real data
                </Badge>
              )}
            </div>
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Enhanced v2.0
            </Badge>
          </div>
        </div>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="websites">Websites</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <div className="text-2xl">💰</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${currentData.revenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">60% revenue share</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                  <div className="text-2xl">👥</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentData.visitors.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Across all websites</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Consent Rate</CardTitle>
                  <div className="text-2xl">✅</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentData.consent_rate}%</div>
                  <p className="text-xs text-muted-foreground">Average across sites</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Websites</CardTitle>
                  <div className="text-2xl">🌐</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentData.websites}</div>
                  <p className="text-xs text-muted-foreground">Monitored sites</p>
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
                  <CardTitle>Revenue Sharing</CardTitle>
                  <CardDescription>60% of ad revenue goes to you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">Your Share (60%)</p>
                      <p className="text-2xl font-bold text-green-600">${(currentData.revenue * 0.6).toFixed(2)}</p>
                    </div>
                    <div className="text-green-600 text-3xl">📈</div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Platform Share (40%)</p>
                      <p className="text-2xl font-bold text-blue-600">${(currentData.revenue * 0.4).toFixed(2)}</p>
                    </div>
                    <div className="text-blue-600 text-3xl">🏢</div>
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
                      <span className="font-medium">${(currentData.revenue * 0.6).toFixed(2)}</span>
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
                  
                  <Button className="w-full" disabled={(currentData.revenue * 0.6) < 50}>
                    {(currentData.revenue * 0.6) >= 50 ? 'Request Payout' : 'Minimum Not Reached'}
                  </Button>
                </CardContent>
              </Card>
            </div>
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

          {/* Configuration Tab - Advanced Customization */}
          <TabsContent value="configuration" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Layout Configuration */}
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

              {/* Color Customization */}
              <Card>
                <CardHeader>
                  <CardTitle>Color Customization</CardTitle>
                  <CardDescription>Customize colors to match your brand</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                </CardContent>
              </Card>

              {/* Company Branding */}
              <Card>
                <CardHeader>
                  <CardTitle>Company Branding</CardTitle>
                  <CardDescription>Add your company information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                      value={config.companyLogo}
                      onChange={(e) => setConfig({...config, companyLogo: e.target.value})}
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Advanced Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                  <CardDescription>Configure compliance and monetization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Enable Affiliate Ads</Label>
                      <Switch
                        checked={config.affiliateAds}
                        onCheckedChange={(checked) => setConfig({...config, affiliateAds: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>GDPR Compliance</Label>
                      <Switch
                        checked={config.compliance.gdpr}
                        onCheckedChange={(checked) => setConfig({
                          ...config,
                          compliance: {...config.compliance, gdpr: checked}
                        })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>CCPA Compliance</Label>
                      <Switch
                        checked={config.compliance.ccpa}
                        onCheckedChange={(checked) => setConfig({
                          ...config,
                          compliance: {...config.compliance, ccpa: checked}
                        })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>LGPD Compliance</Label>
                      <Switch
                        checked={config.compliance.lgpd}
                        onCheckedChange={(checked) => setConfig({
                          ...config,
                          compliance: {...config.compliance, lgpd: checked}
                        })}
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
            </div>
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
                      <Badge className={config.compliance.gdpr ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {config.compliance.gdpr ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Ensures compliance with EU General Data Protection Regulation
                    </p>
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
                      <Badge className={config.compliance.ccpa ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {config.compliance.ccpa ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Complies with California Consumer Privacy Act
                    </p>
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
                      <Badge className={config.compliance.lgpd ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {config.compliance.lgpd ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Follows Brazilian General Data Protection Law
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Preview Tab - Live Preview */}
          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>See how your cookie banner will look on different devices</CardDescription>
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

                {/* Live Preview */}
                <LivePreview />

                {/* Configuration Summary */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Current Configuration:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Layout: {config.layout}</div>
                    <div>Position: {config.position}</div>
                    <div>Banner Type: {config.bannerType}</div>
                    <div>Button Style: {config.buttonStyle}</div>
                    <div>Theme: {config.theme}</div>
                    <div>Affiliate Ads: {config.affiliateAds ? 'Enabled' : 'Disabled'}</div>
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

