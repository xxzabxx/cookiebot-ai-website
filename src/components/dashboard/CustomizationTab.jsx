import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { 
  Palette, 
  Layout, 
  Type, 
  Image, 
  Monitor, 
  Smartphone, 
  Tablet,
  Eye,
  Save,
  RotateCcw,
  Upload,
  Settings,
  Sparkles,
  DollarSign,
  ToggleLeft,
  ToggleRight,
  Info
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { api } from '../../lib/api'

const CustomizationTab = () => {
  const { user } = useAuth()
  const [config, setConfig] = useState({
    theme: 'light',
    layout: 'dialog',
    position: 'bottom-right',
    primaryColor: '#007bff',
    backgroundColor: '#ffffff',
    textColor: '#333333',
    buttonStyle: 'default',
    bannerType: 'multilevel',
    showLogo: true,
    logoUrl: '',
    companyName: 'Your Company',
    borderRadius: '8px',
    animations: true,
    overlay: true,
    // Privacy Insights Configuration
    privacyInsightsEnabled: false,
    revenueShare: 60,
    dataTypes: ['analytics', 'preferences', 'marketing']
  })

  const [previewDevice, setPreviewDevice] = useState('desktop')
  const [isPreviewVisible, setIsPreviewVisible] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  // Load configuration from backend on component mount
  useEffect(() => {
    const loadConfiguration = async () => {
      try {
        setLoading(true)
        
        // Load customization config using the generic request method
        try {
          const customizationResponse = await api.request('/api/customization/config')
          if (customizationResponse.success) {
            setConfig(prev => ({
              ...prev,
              ...customizationResponse.data
            }))
          }
        } catch (err) {
          console.log('Customization config not found, using defaults')
        }
        
        // Load privacy insights settings using the generic request method
        try {
          const privacyResponse = await api.request('/api/privacy-insights/settings')
          if (privacyResponse.success) {
            setConfig(prev => ({
              ...prev,
              privacyInsightsEnabled: privacyResponse.data.enabled || false,
              revenueShare: privacyResponse.data.revenueShare || 60,
              dataTypes: privacyResponse.data.dataTypes || ['analytics', 'preferences', 'marketing']
            }))
          }
        } catch (err) {
          console.log('Privacy insights config not found, using defaults')
        }
        
      } catch (err) {
        console.error('Failed to load configuration:', err)
        setError('Failed to load configuration')
      } finally {
        setLoading(false)
      }
    }

    loadConfiguration()
  }, [])

  const handleConfigChange = (key, value) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handlePrivacyInsightsToggle = (enabled) => {
    setConfig(prev => ({
      ...prev,
      privacyInsightsEnabled: enabled
    }))
  }

  const resetToDefaults = () => {
    setConfig({
      theme: 'light',
      layout: 'dialog',
      position: 'bottom-right',
      primaryColor: '#007bff',
      backgroundColor: '#ffffff',
      textColor: '#333333',
      buttonStyle: 'default',
      bannerType: 'multilevel',
      showLogo: true,
      logoUrl: '',
      companyName: 'Your Company',
      borderRadius: '8px',
      animations: true,
      overlay: true,
      privacyInsightsEnabled: false,
      revenueShare: 60,
      dataTypes: ['analytics', 'preferences', 'marketing']
    })
  }

  const saveConfiguration = async () => {
    try {
      setSaving(true)
      setError(null)
      
      // Separate customization config from privacy insights config
      const { privacyInsightsEnabled, revenueShare, dataTypes, ...customizationConfig } = config
      
      // Save customization config using the generic request method
      try {
        const customizationResponse = await api.request('/api/customization/config', {
          method: 'POST',
          body: customizationConfig
        })
        if (!customizationResponse.success) {
          throw new Error(customizationResponse.message || 'Failed to save customization')
        }
      } catch (err) {
        console.error('Failed to save customization config:', err)
        // Continue with privacy insights even if customization fails
      }
      
      // Save privacy insights settings using the generic request method
      try {
        const privacyResponse = await api.request('/api/privacy-insights/settings', {
          method: 'POST',
          body: {
            enabled: privacyInsightsEnabled,
            revenueShare,
            dataTypes
          }
        })
        if (!privacyResponse.success) {
          throw new Error(privacyResponse.message || 'Failed to save privacy insights settings')
        }
      } catch (err) {
        console.error('Failed to save privacy insights settings:', err)
        // Continue even if privacy insights fails
      }
      
      // Show success message
      alert('Configuration saved successfully!')
      
    } catch (err) {
      console.error('Failed to save configuration:', err)
      setError(err.message || 'Failed to save configuration')
      alert('Configuration saved with some warnings. Check console for details.')
    } finally {
      setSaving(false)
    }
  }

  const PreviewBanner = () => {
    const bannerStyles = {
      backgroundColor: config.backgroundColor,
      color: config.textColor,
      borderRadius: config.borderRadius,
      border: `1px solid ${config.primaryColor}20`
    }

    const buttonStyles = {
      backgroundColor: config.primaryColor,
      color: '#ffffff',
      borderRadius: config.borderRadius,
      border: 'none',
      padding: '8px 16px',
      margin: '0 4px',
      cursor: 'pointer'
    }

    const getDeviceClass = () => {
      switch (previewDevice) {
        case 'mobile': return 'w-80 h-96'
        case 'tablet': return 'w-96 h-128'
        default: return 'w-full h-64'
      }
    }

    return (
      <div className={`border rounded-lg bg-gray-50 p-4 ${getDeviceClass()}`}>
        <div className="h-full flex items-end justify-center">
          <div 
            className="max-w-sm p-4 shadow-lg rounded-lg"
            style={bannerStyles}
          >
            {config.showLogo && config.logoUrl && (
              <img src={config.logoUrl} alt="Logo" className="h-6 mb-2" />
            )}
            <div className="font-semibold mb-2">🍪 We value your privacy</div>
            <p className="text-xs mb-3 opacity-80">
              This website uses cookies to enhance your experience{config.privacyInsightsEnabled ? ' and generate privacy insights revenue' : ''}.
            </p>
            <div className="flex gap-2 flex-wrap">
              {config.bannerType === 'simple' && (
                <button style={buttonStyles}>Accept</button>
              )}
              {config.bannerType === 'accept-decline' && (
                <>
                  <button style={buttonStyles}>Accept</button>
                  <button style={{...buttonStyles, backgroundColor: 'transparent', color: config.textColor, border: `1px solid ${config.textColor}30`}}>
                    Decline
                  </button>
                </>
              )}
              {config.bannerType === 'multilevel' && (
                <>
                  <button style={buttonStyles}>Accept All</button>
                  <button style={{...buttonStyles, backgroundColor: 'transparent', color: config.textColor, border: `1px solid ${config.textColor}30`}}>
                    Customize
                  </button>
                </>
              )}
            </div>
            {config.privacyInsightsEnabled && (
              <div className="mt-2 text-xs opacity-60 flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                Privacy insights enabled ({config.revenueShare}% revenue share)
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading configuration...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Palette className="w-6 h-6 text-purple-600" />
            Customization
          </h2>
          <p className="text-gray-600">Customize your cookie consent banner appearance, behavior, and monetization</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetToDefaults}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={saveConfiguration} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800">
            <Info className="w-4 h-4" />
            <span className="font-medium">Error</span>
          </div>
          <p className="text-red-700 text-sm mt-1">{error}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="space-y-6">
          <Tabs defaultValue="theme" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="theme">Theme</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="monetization">Revenue</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="theme" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Theme Settings</CardTitle>
                  <CardDescription>Configure the visual appearance of your banner</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Theme</label>
                    <select
                      value={config.theme}
                      onChange={(e) => handleConfigChange('theme', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto (System)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={config.primaryColor}
                        onChange={(e) => handleConfigChange('primaryColor', e.target.value)}
                        className="w-12 h-10 border border-gray-300 rounded-md"
                      />
                      <input
                        type="text"
                        value={config.primaryColor}
                        onChange={(e) => handleConfigChange('primaryColor', e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md font-mono"
                        placeholder="#007bff"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Background Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={config.backgroundColor}
                        onChange={(e) => handleConfigChange('backgroundColor', e.target.value)}
                        className="w-12 h-10 border border-gray-300 rounded-md"
                      />
                      <input
                        type="text"
                        value={config.backgroundColor}
                        onChange={(e) => handleConfigChange('backgroundColor', e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md font-mono"
                        placeholder="#ffffff"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Text Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={config.textColor}
                        onChange={(e) => handleConfigChange('textColor', e.target.value)}
                        className="w-12 h-10 border border-gray-300 rounded-md"
                      />
                      <input
                        type="text"
                        value={config.textColor}
                        onChange={(e) => handleConfigChange('textColor', e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md font-mono"
                        placeholder="#333333"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layout" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Layout Settings</CardTitle>
                  <CardDescription>Configure the layout and positioning of your banner</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Layout Type</label>
                    <select
                      value={config.layout}
                      onChange={(e) => handleConfigChange('layout', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="dialog">Dialog (Modal)</option>
                      <option value="banner">Banner (Top/Bottom)</option>
                      <option value="sidebar">Sidebar</option>
                      <option value="corner">Corner Popup</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Position</label>
                    <select
                      value={config.position}
                      onChange={(e) => handleConfigChange('position', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="bottom-right">Bottom Right</option>
                      <option value="bottom-left">Bottom Left</option>
                      <option value="top-right">Top Right</option>
                      <option value="top-left">Top Left</option>
                      <option value="center">Center</option>
                      <option value="bottom">Bottom</option>
                      <option value="top">Top</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Banner Type</label>
                    <select
                      value={config.bannerType}
                      onChange={(e) => handleConfigChange('bannerType', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="simple">Simple (Accept Only)</option>
                      <option value="accept-decline">Accept/Decline</option>
                      <option value="multilevel">Multi-level (Recommended)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Border Radius</label>
                    <input
                      type="text"
                      value={config.borderRadius}
                      onChange={(e) => handleConfigChange('borderRadius', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="8px"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Content Settings</CardTitle>
                  <CardDescription>Configure the content and branding of your banner</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <input
                      type="text"
                      value={config.companyName}
                      onChange={(e) => handleConfigChange('companyName', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Your Company"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="showLogo"
                      checked={config.showLogo}
                      onChange={(e) => handleConfigChange('showLogo', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="showLogo" className="text-sm font-medium">Show Company Logo</label>
                  </div>

                  {config.showLogo && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Logo URL</label>
                      <input
                        type="url"
                        value={config.logoUrl}
                        onChange={(e) => handleConfigChange('logoUrl', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2">Button Style</label>
                    <select
                      value={config.buttonStyle}
                      onChange={(e) => handleConfigChange('buttonStyle', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="default">Default</option>
                      <option value="rounded">Rounded</option>
                      <option value="square">Square</option>
                      <option value="pill">Pill</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monetization" className="space-y-4">
              <Card className="border-purple-200 bg-purple-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                    Privacy Insights Monetization
                  </CardTitle>
                  <CardDescription>
                    Enable privacy insights to generate revenue while respecting user privacy
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Enable Privacy Insights</h4>
                      <p className="text-sm text-gray-600">
                        Allow users to opt-in to share anonymized privacy insights and earn revenue share
                      </p>
                    </div>
                    <button
                      onClick={() => handlePrivacyInsightsToggle(!config.privacyInsightsEnabled)}
                      className="flex items-center"
                    >
                      {config.privacyInsightsEnabled ? (
                        <ToggleRight className="w-8 h-8 text-purple-600" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-gray-400" />
                      )}
                    </button>
                  </div>
                  
                  {config.privacyInsightsEnabled && (
                    <div className="bg-white p-4 rounded-lg border border-purple-200 space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Revenue Share Percentage</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="50"
                            max="70"
                            step="5"
                            value={config.revenueShare}
                            onChange={(e) => handleConfigChange('revenueShare', parseInt(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium w-12">{config.revenueShare}%</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Higher percentages available with premium plans
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Data Types to Share</label>
                        <div className="space-y-2">
                          {['analytics', 'preferences', 'marketing'].map(type => (
                            <div key={type} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={type}
                                checked={config.dataTypes.includes(type)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    handleConfigChange('dataTypes', [...config.dataTypes, type])
                                  } else {
                                    handleConfigChange('dataTypes', config.dataTypes.filter(t => t !== type))
                                  }
                                }}
                                className="w-4 h-4"
                              />
                              <label htmlFor={type} className="text-sm capitalize">{type} Data</label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-purple-100 p-3 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-2">Monetization Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Users can opt-in to share anonymized data</li>
                          <li>• {config.revenueShare}% revenue share from privacy insights</li>
                          <li>• Automatic compliance with privacy regulations</li>
                          <li>• Real-time earnings tracking in Revenue tab</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Advanced Settings</CardTitle>
                  <CardDescription>Advanced configuration options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="animations"
                      checked={config.animations}
                      onChange={(e) => handleConfigChange('animations', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="animations" className="text-sm font-medium">Enable Animations</label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="overlay"
                      checked={config.overlay}
                      onChange={(e) => handleConfigChange('overlay', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="overlay" className="text-sm font-medium">Show Background Overlay</label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Live Preview
              </CardTitle>
              <CardDescription>See how your banner will look on different devices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant={previewDevice === 'desktop' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewDevice('desktop')}
                >
                  <Monitor className="w-4 h-4 mr-1" />
                  Desktop
                </Button>
                <Button
                  variant={previewDevice === 'tablet' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewDevice('tablet')}
                >
                  <Tablet className="w-4 h-4 mr-1" />
                  Tablet
                </Button>
                <Button
                  variant={previewDevice === 'mobile' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewDevice('mobile')}
                >
                  <Smartphone className="w-4 h-4 mr-1" />
                  Mobile
                </Button>
              </div>

              <PreviewBanner />

              {config.privacyInsightsEnabled && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-purple-800 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm font-medium">Monetization Active</span>
                  </div>
                  <p className="text-purple-700 text-xs">
                    Privacy insights enabled with {config.revenueShare}% revenue share
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Configuration Summary</CardTitle>
              <CardDescription>Current settings overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Theme:</span>
                  <span className="font-medium capitalize">{config.theme}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Layout:</span>
                  <span className="font-medium capitalize">{config.layout}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Position:</span>
                  <span className="font-medium">{config.position}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Banner Type:</span>
                  <span className="font-medium">{config.bannerType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Privacy Insights:</span>
                  <span className={`font-medium ${config.privacyInsightsEnabled ? 'text-purple-600' : 'text-gray-400'}`}>
                    {config.privacyInsightsEnabled ? `Enabled (${config.revenueShare}%)` : 'Disabled'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CustomizationTab

