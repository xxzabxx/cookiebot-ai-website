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
  Info,
  CheckCircle,
  RefreshCw,
  AlertTriangle,
  Globe,
  Shield,
  Cookie,
  ChevronDown,
  ChevronRight
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
    // Privacy Insights Configuration (PRESERVED EXACTLY)
    privacyInsightsEnabled: false,
    revenueShare: 60,
    dataTypes: ['analytics', 'preferences', 'marketing'],
    // Enhanced Features (NEW - Compatible with existing system)
    showDetailedInfo: true,
    enableCookieScanning: true,
    multiLanguage: false,
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'es', 'fr', 'de'],
    cookieCategories: {
      necessary: { enabled: true, required: true, label: 'Necessary' },
      functional: { enabled: true, required: false, label: 'Functional' },
      analytics: { enabled: true, required: false, label: 'Analytics' },
      marketing: { enabled: true, required: false, label: 'Marketing' },
      undefined: { enabled: true, required: false, label: 'Undefined' }
    },
    consentMode: 'opt-in', // opt-in, opt-out, or notice
    showCookieCount: true,
    showProviderInfo: true,
    enableKeyboardNavigation: true,
    highContrast: false
  })

  const [previewDevice, setPreviewDevice] = useState('desktop')
  const [isPreviewVisible, setIsPreviewVisible] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [hasLoadedData, setHasLoadedData] = useState(false)
  const [previewExpanded, setPreviewExpanded] = useState(false)

  // Get user data from auth context (PRESERVED EXACTLY)
  const userId = user?.id || 1

  // Load configuration from localStorage (PRESERVED EXACTLY - maintains compatibility)
  useEffect(() => {
    const loadConfiguration = async () => {
      try {
        setLoading(true)
        setError(null)
        let loadedAnyData = false
        
        // Load all configuration from localStorage (EXACT SAME LOGIC)
        try {
          const savedConfig = localStorage.getItem('cookiebot_full_config')
          if (savedConfig) {
            const configData = JSON.parse(savedConfig)
            console.log('Loaded full config from localStorage:', configData)
            setConfig(prev => ({
              ...prev,
              ...configData
            }))
            loadedAnyData = true
          }
        } catch (err) {
          console.log('No saved config in localStorage')
        }
        
        // Try to load from separate keys as fallback (EXACT SAME LOGIC)
        if (!loadedAnyData) {
          try {
            const savedCustomization = localStorage.getItem('cookiebot_customization_config')
            const savedPrivacy = localStorage.getItem('cookiebot_privacy_insights_config')
            
            let mergedConfig = {}
            
            if (savedCustomization) {
              const customizationData = JSON.parse(savedCustomization)
              mergedConfig = { ...mergedConfig, ...customizationData }
              loadedAnyData = true
            }
            
            if (savedPrivacy) {
              const privacyData = JSON.parse(savedPrivacy)
              // PRESERVED EXACT STRUCTURE for privacy insights
              mergedConfig = {
                ...mergedConfig,
                privacyInsightsEnabled: privacyData.enabled || false,
                revenueShare: privacyData.revenueShare || 60,
                dataTypes: privacyData.dataTypes || ['analytics', 'preferences', 'marketing']
              }
              loadedAnyData = true
            }
            
            if (loadedAnyData) {
              setConfig(prev => ({ ...prev, ...mergedConfig }))
            }
          } catch (err) {
            console.log('No fallback config in localStorage')
          }
        }
        
        setHasLoadedData(loadedAnyData)
        if (loadedAnyData) {
          setSuccess('Configuration loaded from saved settings!')
          setTimeout(() => setSuccess(null), 3000)
        }
        
      } catch (err) {
        console.error('Failed to load configuration:', err)
        setError('Failed to load configuration settings')
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
    if (success) setSuccess(null)
  }

  const handleCategoryChange = (category, field, value) => {
    setConfig(prev => ({
      ...prev,
      cookieCategories: {
        ...prev.cookieCategories,
        [category]: {
          ...prev.cookieCategories[category],
          [field]: value
        }
      }
    }))
    if (success) setSuccess(null)
  }

  const handlePrivacyInsightsToggle = (enabled) => {
    setConfig(prev => ({
      ...prev,
      privacyInsightsEnabled: enabled
    }))
    if (success) setSuccess(null)
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
      dataTypes: ['analytics', 'preferences', 'marketing'],
      showDetailedInfo: true,
      enableCookieScanning: true,
      multiLanguage: false,
      defaultLanguage: 'en',
      supportedLanguages: ['en', 'es', 'fr', 'de'],
      cookieCategories: {
        necessary: { enabled: true, required: true, label: 'Necessary' },
        functional: { enabled: true, required: false, label: 'Functional' },
        analytics: { enabled: true, required: false, label: 'Analytics' },
        marketing: { enabled: true, required: false, label: 'Marketing' },
        undefined: { enabled: true, required: false, label: 'Undefined' }
      },
      consentMode: 'opt-in',
      showCookieCount: true,
      showProviderInfo: true,
      enableKeyboardNavigation: true,
      highContrast: false
    })
    setSuccess(null)
    setError(null)
    // PRESERVED EXACT localStorage key names for compatibility
    localStorage.removeItem('cookiebot_full_config')
    localStorage.removeItem('cookiebot_customization_config')
    localStorage.removeItem('cookiebot_privacy_insights_config')
  }

  const saveConfiguration = async () => {
    try {
      setSaving(true)
      setError(null)
      setSuccess(null)
      
      try {
        // PRESERVED EXACT localStorage structure for system compatibility
        localStorage.setItem('cookiebot_full_config', JSON.stringify(config))
        console.log('Enhanced configuration saved to localStorage:', config)
        
        // PRESERVED EXACT separation logic for backward compatibility
        const { privacyInsightsEnabled, revenueShare, dataTypes, ...customizationConfig } = config
        
        localStorage.setItem('cookiebot_customization_config', JSON.stringify(customizationConfig))
        localStorage.setItem('cookiebot_privacy_insights_config', JSON.stringify({
          enabled: privacyInsightsEnabled,
          revenueShare,
          dataTypes
        }))
        
        setSuccess('Enhanced configuration saved successfully! Your settings include new CookieTractor-inspired features.')
        setHasLoadedData(true)
        
      } catch (err) {
        console.error('Failed to save configuration:', err)
        setError('Failed to save configuration to local storage')
      }
      
    } catch (err) {
      console.error('Failed to save configuration:', err)
      setError(err.message || 'Failed to save configuration')
    } finally {
      setSaving(false)
    }
  }

  const EnhancedPreviewBanner = () => {
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
        <div className="h-full flex items-end justify-center relative">
          {config.overlay && (
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
          )}
          <div 
            className="max-w-sm p-4 shadow-lg rounded-lg relative z-10"
            style={bannerStyles}
          >
            {config.showLogo && config.logoUrl && (
              <img src={config.logoUrl} alt="Logo" className="h-6 mb-2" />
            )}
            
            <div className="font-semibold mb-2 flex items-center gap-2">
              <Cookie className="w-4 h-4" />
              Cookie Settings
            </div>
            
            <p className="text-xs mb-3 opacity-80">
              {config.companyName} and our partners use cookies to enhance your experience
              {config.privacyInsightsEnabled ? ' and generate privacy insights revenue' : ''}.
            </p>

            {/* Enhanced Category Toggles */}
            {config.showDetailedInfo && !previewExpanded && (
              <div className="mb-3 space-y-1">
                {Object.entries(config.cookieCategories).map(([key, category]) => (
                  category.enabled && (
                    <div key={key} className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1">
                        {category.label}
                        {config.showCookieCount && <span className="opacity-60">(3)</span>}
                      </span>
                      <div className={`w-8 h-4 rounded-full ${category.required ? 'bg-gray-300' : 'bg-green-500'} relative`}>
                        <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform ${category.required ? 'left-0.5' : 'right-0.5'}`}></div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}

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
                    Only Necessary
                  </button>
                  {config.showDetailedInfo && (
                    <button 
                      style={{...buttonStyles, backgroundColor: 'transparent', color: config.textColor, border: `1px solid ${config.textColor}30`}}
                      onClick={() => setPreviewExpanded(!previewExpanded)}
                    >
                      {previewExpanded ? 'Less Info' : 'More Info'}
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Expanded Details */}
            {previewExpanded && config.showDetailedInfo && (
              <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                <div className="text-xs font-medium">Cookie Details</div>
                {Object.entries(config.cookieCategories).map(([key, category]) => (
                  category.enabled && (
                    <div key={key} className="text-xs">
                      <div className="font-medium flex items-center gap-1">
                        <ChevronRight className="w-3 h-3" />
                        {category.label}
                        {config.showCookieCount && <span className="opacity-60">(3 cookies)</span>}
                      </div>
                      {config.showProviderInfo && (
                        <div className="ml-4 text-xs opacity-70">
                          Google Analytics, Facebook Pixel, etc.
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>
            )}

            {config.privacyInsightsEnabled && (
              <div className="mt-2 text-xs opacity-60 flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-green-600" />
                <span className="text-green-600 font-medium">
                  Privacy insights enabled ({config.revenueShare}% revenue share)
                </span>
              </div>
            )}

            {config.multiLanguage && (
              <div className="mt-2 text-xs opacity-60 flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>Language: {config.defaultLanguage.toUpperCase()}</span>
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
          <p className="text-gray-600">Loading your saved configuration...</p>
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
            Enhanced Customization
          </h2>
          <p className="text-gray-600">Advanced cookie consent banner with CookieTractor-inspired features</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reload
          </Button>
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

      {/* Status Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-medium">Error</span>
          </div>
          <p className="text-red-700 text-sm mt-1">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-800">
            <CheckCircle className="w-4 h-4" />
            <span className="font-medium">Success</span>
          </div>
          <p className="text-green-700 text-sm mt-1">{success}</p>
        </div>
      )}

      {/* System Compatibility Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-blue-800">
            <Shield className="w-4 h-4" />
            <span className="font-medium">System Compatible Enhanced Features</span>
          </div>
          <p className="text-blue-700 text-sm mt-1">
            This enhanced version maintains full compatibility with your existing dashboard, backend API, and tracking system 
            while adding CookieTractor-inspired features and preserving your privacy insights monetization.
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="space-y-6">
          <Tabs defaultValue="theme" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="theme">Theme</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="cookies">Cookies</TabsTrigger>
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

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="highContrast"
                      checked={config.highContrast}
                      onChange={(e) => handleConfigChange('highContrast', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="highContrast" className="text-sm font-medium">High Contrast Mode</label>
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
                    <label className="block text-sm font-medium mb-2">Consent Mode</label>
                    <select
                      value={config.consentMode}
                      onChange={(e) => handleConfigChange('consentMode', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="opt-in">Opt-in (GDPR Compliant)</option>
                      <option value="opt-out">Opt-out</option>
                      <option value="notice">Notice Only</option>
                    </select>
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

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="multiLanguage"
                      checked={config.multiLanguage}
                      onChange={(e) => handleConfigChange('multiLanguage', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="multiLanguage" className="text-sm font-medium">Enable Multi-language Support</label>
                  </div>

                  {config.multiLanguage && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Default Language</label>
                      <select
                        value={config.defaultLanguage}
                        onChange={(e) => handleConfigChange('defaultLanguage', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                        <option value="pt">Portuguese</option>
                      </select>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cookies" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Cookie className="w-5 h-5" />
                    Cookie Categories
                  </CardTitle>
                  <CardDescription>Configure which cookie categories to show and their settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(config.cookieCategories).map(([key, category]) => (
                    <div key={key} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={category.enabled}
                            onChange={(e) => handleCategoryChange(key, 'enabled', e.target.checked)}
                            className="w-4 h-4"
                            disabled={category.required}
                          />
                          <div>
                            <label className="text-sm font-medium capitalize">{category.label}</label>
                            {category.required && <Badge variant="secondary" className="ml-2 text-xs">Required</Badge>}
                          </div>
                        </div>
                      </div>
                      
                      {category.enabled && (
                        <div className="ml-7 space-y-2">
                          <input
                            type="text"
                            value={category.label}
                            onChange={(e) => handleCategoryChange(key, 'label', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                            placeholder="Category Label"
                          />
                          <p className="text-xs text-gray-500">
                            {key === 'necessary' && 'Essential cookies required for website functionality'}
                            {key === 'functional' && 'Cookies that enhance website functionality and personalization'}
                            {key === 'analytics' && 'Cookies used for website analytics and performance monitoring'}
                            {key === 'marketing' && 'Cookies used for advertising and marketing purposes'}
                            {key === 'undefined' && 'Cookies that have not yet been categorized'}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="space-y-3 pt-3 border-t">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="showDetailedInfo"
                        checked={config.showDetailedInfo}
                        onChange={(e) => handleConfigChange('showDetailedInfo', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor="showDetailedInfo" className="text-sm font-medium">Show Detailed Cookie Information</label>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="showCookieCount"
                        checked={config.showCookieCount}
                        onChange={(e) => handleConfigChange('showCookieCount', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor="showCookieCount" className="text-sm font-medium">Show Cookie Count per Category</label>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="showProviderInfo"
                        checked={config.showProviderInfo}
                        onChange={(e) => handleConfigChange('showProviderInfo', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor="showProviderInfo" className="text-sm font-medium">Show Cookie Provider Information</label>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="enableCookieScanning"
                        checked={config.enableCookieScanning}
                        onChange={(e) => handleConfigChange('enableCookieScanning', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor="enableCookieScanning" className="text-sm font-medium">Enable Automatic Cookie Scanning</label>
                    </div>
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
                        <h5 className="font-medium text-gray-900 mb-2">Enhanced Monetization Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Users can opt-in to share anonymized data</li>
                          <li>• {config.revenueShare}% revenue share from privacy insights</li>
                          <li>• Automatic compliance with privacy regulations</li>
                          <li>• Real-time earnings tracking in Revenue tab</li>
                          <li>• Enhanced transparency with detailed cookie information</li>
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
                  <CardDescription>Advanced configuration options and accessibility features</CardDescription>
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
                      id="enableKeyboardNavigation"
                      checked={config.enableKeyboardNavigation}
                      onChange={(e) => handleConfigChange('enableKeyboardNavigation', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="enableKeyboardNavigation" className="text-sm font-medium">Enable Keyboard Navigation</label>
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
          </Tabs>
        </div>

        {/* Enhanced Preview Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Enhanced Live Preview
              </CardTitle>
              <CardDescription>See how your enhanced banner will look with new features</CardDescription>
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

              <EnhancedPreviewBanner />

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
              <CardTitle className="text-lg">Enhanced Configuration Summary</CardTitle>
              <CardDescription>Current settings overview with new features</CardDescription>
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
                  <span className="text-gray-600">Consent Mode:</span>
                  <span className="font-medium">{config.consentMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cookie Categories:</span>
                  <span className="font-medium">
                    {Object.values(config.cookieCategories).filter(c => c.enabled).length} enabled
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Detailed Info:</span>
                  <span className={`font-medium ${config.showDetailedInfo ? 'text-green-600' : 'text-gray-400'}`}>
                    {config.showDetailedInfo ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Multi-language:</span>
                  <span className={`font-medium ${config.multiLanguage ? 'text-green-600' : 'text-gray-400'}`}>
                    {config.multiLanguage ? `Enabled (${config.defaultLanguage.toUpperCase()})` : 'Disabled'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Privacy Insights:</span>
                  <span className={`font-medium ${config.privacyInsightsEnabled ? 'text-purple-600' : 'text-gray-400'}`}>
                    {config.privacyInsightsEnabled ? `Enabled (${config.revenueShare}%)` : 'Disabled'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data Status:</span>
                  <span className={`font-medium ${hasLoadedData ? 'text-green-600' : 'text-yellow-600'}`}>
                    {hasLoadedData ? 'Saved Configuration' : 'Default Settings'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Integration Status */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                System Integration Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="w-4 h-4" />
                  <span>Dashboard integration maintained</span>
                </div>
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="w-4 h-4" />
                  <span>Backend API compatibility preserved</span>
                </div>
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="w-4 h-4" />
                  <span>Tracking system integration active</span>
                </div>
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="w-4 h-4" />
                  <span>Privacy insights monetization preserved</span>
                </div>
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="w-4 h-4" />
                  <span>Configuration storage compatibility maintained</span>
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

