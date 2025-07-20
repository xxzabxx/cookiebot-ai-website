import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { 
  Code, 
  Copy, 
  Download, 
  ExternalLink, 
  CheckCircle, 
  AlertTriangle,
  Globe,
  Zap,
  Shield,
  Settings,
  FileText,
  Smartphone,
  DollarSign,
  Eye,
  ToggleLeft,
  ToggleRight
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { api } from '../../lib/api'

const ScriptTab = () => {
  const { user } = useAuth()
  const [copied, setCopied] = useState(false)
  const [scriptType, setScriptType] = useState('standard')
  const [privacyInsightsEnabled, setPrivacyInsightsEnabled] = useState(false)
  const [customizationConfig, setCustomizationConfig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Get user data from auth context
  const userId = user?.id || 'user_demo'
  const apiKey = user?.api_key || 'cb_live_demo_key'

  // Load customization config and privacy insights settings from backend
  useEffect(() => {
    const loadConfiguration = async () => {
      try {
        setLoading(true)
        
        // Load customization config
        const customizationResponse = await api.get('/api/customization/config')
        if (customizationResponse.success) {
          setCustomizationConfig(customizationResponse.data)
        }
        
        // Load privacy insights setting
        const privacyResponse = await api.get('/api/privacy-insights/settings')
        if (privacyResponse.success) {
          setPrivacyInsightsEnabled(privacyResponse.data.enabled || false)
        }
        
      } catch (err) {
        console.error('Failed to load configuration:', err)
        setError('Failed to load configuration')
        // Set defaults if backend fails
        setCustomizationConfig({
          theme: 'light',
          position: 'bottom-right',
          layout: 'dialog',
          primaryColor: '#007bff',
          backgroundColor: '#ffffff',
          textColor: '#333333'
        })
      } finally {
        setLoading(false)
      }
    }

    loadConfiguration()
  }, [])

  // Save privacy insights setting to backend
  const handlePrivacyInsightsToggle = async (enabled) => {
    try {
      const response = await api.post('/api/privacy-insights/settings', {
        enabled: enabled
      })
      
      if (response.success) {
        setPrivacyInsightsEnabled(enabled)
      } else {
        throw new Error(response.message || 'Failed to update setting')
      }
    } catch (err) {
      console.error('Failed to update privacy insights setting:', err)
      // Revert toggle on error
      setPrivacyInsightsEnabled(!enabled)
    }
  }

  const generateScript = (type = 'standard') => {
    // Use V3 script URL instead of V2
    const scriptUrl = 'https://cookiebot-ai-backend-production.up.railway.app/static/enhanced_cookiebot_ai_v3.js'
    
    // Build customization object from backend config
    const customization = customizationConfig ? {
      theme: customizationConfig.theme || 'light',
      position: customizationConfig.position || 'bottom-right',
      layout: customizationConfig.layout || 'dialog',
      primaryColor: customizationConfig.primaryColor || '#007bff',
      backgroundColor: customizationConfig.backgroundColor || '#ffffff',
      textColor: customizationConfig.textColor || '#333333',
      buttonStyle: customizationConfig.buttonStyle || 'default',
      borderRadius: customizationConfig.borderRadius || '8px',
      animations: customizationConfig.animations !== false,
      overlay: customizationConfig.overlay !== false
    } : {
      theme: 'light',
      position: 'bottom-right',
      layout: 'dialog'
    }

    const baseScript = `<!-- CookieBot.ai V3 Script -->
<script>
  window.cookieBotConfig = {
    apiKey: '${apiKey}',
    userId: '${userId}',
    domain: window.location.hostname,
    version: 'v3',
    ${type === 'async' ? 'async: true,' : ''}
    ${(type === 'privacy-insights' || privacyInsightsEnabled) ? 'privacyInsights: true,' : ''}
    ${type === 'minimal' ? 'minimal: true,' : ''}
    autoShow: true,
    compliance: {
      gdpr: true,
      ccpa: true,
      lgpd: true
    },
    customization: ${JSON.stringify(customization, null, 6).replace(/\n/g, '\n    ')},
    ${privacyInsightsEnabled ? `monetization: {
      enabled: true,
      revenueShare: 60,
      dataTypes: ['analytics', 'preferences', 'marketing']
    },` : ''}
    callbacks: {
      onAccept: function(categories) {
        console.log('CookieBot: Accepted categories:', categories);
      },
      onDecline: function() {
        console.log('CookieBot: User declined cookies');
      },
      onCustomize: function() {
        console.log('CookieBot: User opened customization');
      }${privacyInsightsEnabled ? `,
      onPrivacyInsights: function(data) {
        console.log('CookieBot: Privacy insights data:', data);
      }` : ''}
    }
  };
</script>
<script src="${scriptUrl}" ${type === 'async' ? 'async' : ''}></script>`

    return baseScript
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const downloadScript = () => {
    const script = generateScript(scriptType)
    const blob = new Blob([script], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cookiebot-v3-script.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const integrationSteps = [
    {
      title: "Copy the Script",
      description: "Copy the generated V3 script code below",
      icon: Copy
    },
    {
      title: "Add to Your Website",
      description: "Paste the script in your website's <head> section",
      icon: Code
    },
    {
      title: "Test Implementation",
      description: "Visit your website to verify the banner appears",
      icon: CheckCircle
    },
    {
      title: "Monitor Performance",
      description: "Track analytics and compliance in your dashboard",
      icon: Zap
    }
  ]

  const platformGuides = [
    {
      name: "WordPress",
      description: "Install via plugin or theme editor",
      icon: "🔌",
      popular: true
    },
    {
      name: "Shopify",
      description: "Add to theme.liquid file",
      icon: "🛍️",
      popular: true
    },
    {
      name: "React",
      description: "Install via npm package",
      icon: "⚛️",
      popular: true
    },
    {
      name: "HTML/CSS",
      description: "Direct script integration",
      icon: "📄",
      popular: false
    },
    {
      name: "Vue.js",
      description: "Component integration",
      icon: "💚",
      popular: false
    },
    {
      name: "Angular",
      description: "Service integration",
      icon: "🅰️",
      popular: false
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
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
            <Code className="w-6 h-6 text-blue-600" />
            Script Integration
          </h2>
          <p className="text-gray-600">Get your CookieBot.ai V3 script with customization and privacy insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={downloadScript}>
            <Download className="w-4 h-4 mr-2" />
            Download Script
          </Button>
          <Button>
            <ExternalLink className="w-4 h-4 mr-2" />
            View Documentation
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">V3 Active</h3>
                <p className="text-sm text-gray-600">Latest Version</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Custom Config</h3>
                <p className="text-sm text-gray-600">Applied</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${privacyInsightsEnabled ? 'bg-purple-100' : 'bg-gray-100'} rounded-lg flex items-center justify-center`}>
                <DollarSign className={`w-6 h-6 ${privacyInsightsEnabled ? 'text-purple-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {privacyInsightsEnabled ? 'Monetization On' : 'Monetization Off'}
                </h3>
                <p className="text-sm text-gray-600">Privacy Insights</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Privacy Insights Configuration */}
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
                Allow users to opt-in to share anonymized privacy insights and earn 60% revenue share
              </p>
            </div>
            <button
              onClick={() => handlePrivacyInsightsToggle(!privacyInsightsEnabled)}
              className="flex items-center"
            >
              {privacyInsightsEnabled ? (
                <ToggleRight className="w-8 h-8 text-purple-600" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-gray-400" />
              )}
            </button>
          </div>
          
          {privacyInsightsEnabled && (
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h5 className="font-medium text-gray-900 mb-2">Monetization Features Enabled:</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Users can opt-in to share anonymized analytics data</li>
                <li>• 60% revenue share from privacy insights</li>
                <li>• Automatic compliance with privacy regulations</li>
                <li>• Real-time earnings tracking in Revenue tab</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Script Generator */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Generate Your V3 Script</CardTitle>
              <CardDescription>
                Your script includes customization settings and {privacyInsightsEnabled ? 'privacy insights monetization' : 'compliance features'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Script Type</label>
                <select
                  value={scriptType}
                  onChange={(e) => setScriptType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="standard">Standard (Recommended)</option>
                  <option value="async">Async Loading</option>
                  <option value="privacy-insights">Force Privacy Insights</option>
                  <option value="minimal">Minimal (Compliance Only)</option>
                </select>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-400 text-sm font-mono">HTML - V3 Script</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(generateScript(scriptType))}
                    className="text-gray-400 hover:text-white"
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <pre className="text-gray-300 text-sm overflow-x-auto max-h-96">
                  <code>{generateScript(scriptType)}</code>
                </pre>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>V3 script includes your customization settings and latest compliance features</span>
              </div>
            </CardContent>
          </Card>

          {/* API Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">API Configuration</CardTitle>
              <CardDescription>Your unique API credentials and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">API Key</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={apiKey}
                    readOnly
                    className="flex-1 p-2 bg-gray-50 border border-gray-300 rounded-md font-mono text-sm"
                  />
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(apiKey)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">User ID</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userId}
                    readOnly
                    className="flex-1 p-2 bg-gray-50 border border-gray-300 rounded-md font-mono text-sm"
                  />
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(userId)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-800">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium">Keep Your API Key Secure</span>
                </div>
                <p className="text-yellow-700 text-xs mt-1">
                  Never share your API key publicly or commit it to version control.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Integration Guide */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Integration Steps</CardTitle>
              <CardDescription>Follow these steps to implement CookieBot.ai V3 on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrationSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-sm font-semibold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                    <step.icon className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Live Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Live Preview
              </CardTitle>
              <CardDescription>Preview how your banner will look with current settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-gray-50 min-h-32 flex items-center justify-center">
                <div 
                  className="bg-white border rounded-lg p-4 shadow-lg max-w-sm"
                  style={{
                    borderColor: customizationConfig?.primaryColor || '#007bff',
                    backgroundColor: customizationConfig?.backgroundColor || '#ffffff',
                    color: customizationConfig?.textColor || '#333333'
                  }}
                >
                  <div className="font-semibold mb-2">🍪 We value your privacy</div>
                  <p className="text-xs mb-3 opacity-80">
                    This website uses cookies to enhance your experience and {privacyInsightsEnabled ? 'generate privacy insights revenue' : 'ensure compliance'}.
                  </p>
                  <div className="flex gap-2">
                    <button 
                      className="px-3 py-1 rounded text-xs font-medium text-white"
                      style={{ backgroundColor: customizationConfig?.primaryColor || '#007bff' }}
                    >
                      Accept All
                    </button>
                    <button className="px-3 py-1 rounded text-xs font-medium border">
                      Customize
                    </button>
                  </div>
                  {privacyInsightsEnabled && (
                    <div className="mt-2 text-xs opacity-60">
                      💰 Privacy insights enabled
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform-Specific Guides */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Platform Guides</CardTitle>
              <CardDescription>Step-by-step instructions for popular platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {platformGuides.map((platform, index) => (
                  <button
                    key={index}
                    className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{platform.icon}</span>
                      <span className="font-semibold text-gray-900">{platform.name}</span>
                      {platform.popular && (
                        <Badge variant="secondary" className="text-xs">Popular</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 text-xs">{platform.description}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Advanced Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Advanced V3 Configuration</CardTitle>
          <CardDescription>Optional settings and callbacks for advanced users</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="events" className="w-full">
            <TabsList>
              <TabsTrigger value="events">Event Callbacks</TabsTrigger>
              <TabsTrigger value="custom">Custom CSS</TabsTrigger>
              <TabsTrigger value="api">V3 API Methods</TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-green-400 text-sm font-mono mb-2">JavaScript - V3 Events</div>
                <pre className="text-gray-300 text-sm overflow-x-auto">
                  <code>{`// V3 Event callbacks
window.cookieBotConfig.callbacks = {
  onAccept: function(categories) {
    console.log('V3: Accepted categories:', categories);
    // Your custom code here
  },
  onDecline: function() {
    console.log('V3: User declined cookies');
    // Your custom code here
  },
  onCustomize: function() {
    console.log('V3: User opened customization');
    // Your custom code here
  }${privacyInsightsEnabled ? `,
  onPrivacyInsights: function(data) {
    console.log('V3: Privacy insights data:', data);
    // Handle monetization data
  }` : ''}
};`}</code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-green-400 text-sm font-mono mb-2">CSS - V3 Styling</div>
                <pre className="text-gray-300 text-sm overflow-x-auto">
                  <code>{`/* V3 Custom styling */
.cookiebot-v3-banner {
  font-family: 'Your Font', sans-serif;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  border-radius: ${customizationConfig?.borderRadius || '8px'};
}

.cookiebot-v3-button-accept {
  background: ${customizationConfig?.primaryColor || '#007bff'};
  border-radius: 25px;
  transition: all 0.3s ease;
}${privacyInsightsEnabled ? `

.cookiebot-v3-privacy-insights {
  background: linear-gradient(45deg, #9333ea, #7c3aed);
  color: white;
}` : ''}`}</code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="api" className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-green-400 text-sm font-mono mb-2">JavaScript - V3 API</div>
                <pre className="text-gray-300 text-sm overflow-x-auto">
                  <code>{`// V3 API methods
CookieBotV3.show();           // Show banner
CookieBotV3.hide();           // Hide banner
CookieBotV3.reset();          // Reset consent
CookieBotV3.getConsent();     // Get current consent
CookieBotV3.hasConsent();     // Check if user has consented
CookieBotV3.updateConfig();   // Update configuration${privacyInsightsEnabled ? `
CookieBotV3.getInsights();    // Get privacy insights data
CookieBotV3.getRevenue();     // Get revenue information` : ''}`}</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default ScriptTab

