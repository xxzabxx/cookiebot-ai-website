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
  Sparkles
} from 'lucide-react'

const CustomizationTab = () => {
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
    overlay: true
  })

  const [previewDevice, setPreviewDevice] = useState('desktop')
  const [isPreviewVisible, setIsPreviewVisible] = useState(true)

  const handleConfigChange = (key, value) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
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
      overlay: true
    })
  }

  const saveConfiguration = () => {
    // TODO: Save to backend
    console.log('Saving configuration:', config)
    alert('Configuration saved successfully!')
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
      <div className={`bg-gray-100 rounded-lg p-4 ${getDeviceClass()} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"></div>
        
        {/* Mock website content */}
        <div className="relative z-10 h-full">
          <div className="bg-white rounded shadow-sm p-4 mb-4">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-100 rounded mb-1"></div>
            <div className="h-3 bg-gray-100 rounded w-3/4"></div>
          </div>
          
          {/* Cookie Banner */}
          <div 
            className={`absolute ${
              config.position.includes('bottom') ? 'bottom-4' : 'top-4'
            } ${
              config.position.includes('right') ? 'right-4' : 
              config.position.includes('left') ? 'left-4' : 'left-1/2 transform -translate-x-1/2'
            } ${
              config.layout === 'bar' ? 'left-4 right-4' : 'max-w-sm'
            } p-4 shadow-lg z-20 ${config.animations ? 'animate-slide-up' : ''}`}
            style={bannerStyles}
          >
            {config.showLogo && (
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-blue-500 rounded mr-2"></div>
                <span className="font-semibold">{config.companyName}</span>
              </div>
            )}
            
            <h3 className="font-semibold mb-2">Cookie Consent</h3>
            <p className="text-sm mb-4 opacity-80">
              We use cookies to enhance your experience and analyze our traffic.
            </p>
            
            <div className="flex flex-wrap gap-2">
              {config.bannerType === 'multilevel' && (
                <>
                  <button style={buttonStyles}>Accept All</button>
                  <button style={{...buttonStyles, backgroundColor: 'transparent', color: config.textColor, border: `1px solid ${config.primaryColor}`}}>
                    Customize
                  </button>
                  <button style={{...buttonStyles, backgroundColor: 'transparent', color: config.textColor, border: `1px solid ${config.textColor}30`}}>
                    Decline
                  </button>
                </>
              )}
              {config.bannerType === 'accept-only' && (
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
            </div>
          </div>
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
          <p className="text-gray-600">Customize your cookie consent banner appearance and behavior</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetToDefaults}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={saveConfiguration}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="space-y-6">
          <Tabs defaultValue="theme" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="theme">Theme</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            {/* Theme Tab */}
            <TabsContent value="theme" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Theme Selection</CardTitle>
                  <CardDescription>Choose a predefined theme or create a custom one</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {['light', 'dark', 'custom'].map((theme) => (
                      <button
                        key={theme}
                        onClick={() => handleConfigChange('theme', theme)}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          config.theme === theme 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-full h-8 rounded mb-2 ${
                          theme === 'light' ? 'bg-white border' :
                          theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                        }`}></div>
                        <span className="text-sm font-medium capitalize">{theme}</span>
                      </button>
                    ))}
                  </div>

                  {config.theme === 'custom' && (
                    <div className="space-y-4 pt-4 border-t">
                      <div>
                        <label className="block text-sm font-medium mb-2">Primary Color</label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={config.primaryColor}
                            onChange={(e) => handleConfigChange('primaryColor', e.target.value)}
                            className="w-16 h-10 p-1"
                          />
                          <Input
                            type="text"
                            value={config.primaryColor}
                            onChange={(e) => handleConfigChange('primaryColor', e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Background Color</label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={config.backgroundColor}
                            onChange={(e) => handleConfigChange('backgroundColor', e.target.value)}
                            className="w-16 h-10 p-1"
                          />
                          <Input
                            type="text"
                            value={config.backgroundColor}
                            onChange={(e) => handleConfigChange('backgroundColor', e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Text Color</label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={config.textColor}
                            onChange={(e) => handleConfigChange('textColor', e.target.value)}
                            className="w-16 h-10 p-1"
                          />
                          <Input
                            type="text"
                            value={config.textColor}
                            onChange={(e) => handleConfigChange('textColor', e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Layout Tab */}
            <TabsContent value="layout" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Layout Options</CardTitle>
                  <CardDescription>Configure banner layout and positioning</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Banner Layout</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'dialog', label: 'Dialog', icon: Layout },
                        { value: 'bar', label: 'Bar', icon: Type }
                      ].map(({ value, label, icon: Icon }) => (
                        <button
                          key={value}
                          onClick={() => handleConfigChange('layout', value)}
                          className={`p-3 rounded-lg border-2 transition-colors flex items-center gap-2 ${
                            config.layout === value 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{label}</span>
                        </button>
                      ))}
                    </div>
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
                      <option value="bottom-center">Bottom Center</option>
                      <option value="top-right">Top Right</option>
                      <option value="top-left">Top Left</option>
                      <option value="top-center">Top Center</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Button Style</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['default', 'solid', 'outline'].map((style) => (
                        <button
                          key={style}
                          onClick={() => handleConfigChange('buttonStyle', style)}
                          className={`p-2 rounded border text-sm ${
                            config.buttonStyle === style 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {style.charAt(0).toUpperCase() + style.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Banner Type</label>
                    <select
                      value={config.bannerType}
                      onChange={(e) => handleConfigChange('bannerType', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="multilevel">Multilevel (Accept/Customize/Decline)</option>
                      <option value="accept-only">Accept Only</option>
                      <option value="accept-decline">Accept/Decline</option>
                      <option value="inline-multilevel">Inline Multilevel</option>
                      <option value="ccpa">CCPA Style</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Content & Branding</CardTitle>
                  <CardDescription>Customize text content and company branding</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="showLogo"
                      checked={config.showLogo}
                      onChange={(e) => handleConfigChange('showLogo', e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="showLogo" className="text-sm font-medium">Show Company Logo</label>
                  </div>

                  {config.showLogo && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Company Name</label>
                        <Input
                          value={config.companyName}
                          onChange={(e) => handleConfigChange('companyName', e.target.value)}
                          placeholder="Your Company"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Logo Upload</label>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Logo
                          </Button>
                          <span className="text-sm text-gray-500">PNG, JPG up to 2MB</span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Advanced Tab */}
            <TabsContent value="advanced" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Advanced Settings</CardTitle>
                  <CardDescription>Fine-tune visual effects and behavior</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Border Radius</label>
                    <Input
                      value={config.borderRadius}
                      onChange={(e) => handleConfigChange('borderRadius', e.target.value)}
                      placeholder="8px"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="animations"
                      checked={config.animations}
                      onChange={(e) => handleConfigChange('animations', e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="animations" className="text-sm font-medium">Enable Animations</label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="overlay"
                      checked={config.overlay}
                      onChange={(e) => handleConfigChange('overlay', e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="overlay" className="text-sm font-medium">Show Background Overlay</label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Preview Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Live Preview
              </CardTitle>
              <CardDescription>See how your banner will look on different devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
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

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 text-blue-800">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Preview Updates in Real-time</span>
                </div>
                <p className="text-blue-600 text-xs mt-1">
                  Changes to your configuration are reflected instantly in the preview above.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CustomizationTab

