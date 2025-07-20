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
  RefreshCw,
  Info
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const ScriptTab = () => {
  const { user } = useAuth()
  const [copied, setCopied] = useState(false)
  const [scriptType, setScriptType] = useState('standard')
  const [config, setConfig] = useState({
    privacyInsightsEnabled: false,
    revenueShare: 60,
    theme: 'light',
    position: 'bottom-right',
    layout: 'dialog',
    primaryColor: '#007bff',
    backgroundColor: '#ffffff',
    textColor: '#333333'
  })
  const [configLoaded, setConfigLoaded] = useState(false)
  const [configSource, setConfigSource] = useState('default')

  const userId = user?.id || 'user_12345'
  const apiKey = user?.apiKey || 'cb_live_abcd1234efgh5678ijkl9012mnop3456'

  // Load configuration from localStorage
  useEffect(() => {
    const loadConfiguration = () => {
      try {
        let loadedConfig = {}
        let source = 'default'

        // Try to load complete config first
        const fullConfig = localStorage.getItem('cookiebot_full_config')
        if (fullConfig) {
          loadedConfig = JSON.parse(fullConfig)
          source = 'saved'
        } else {
          // Fallback to separate keys
          const customizationConfig = localStorage.getItem('cookiebot_customization_config')
          const privacyConfig = localStorage.getItem('cookiebot_privacy_insights_config')
          
          if (customizationConfig) {
            const customData = JSON.parse(customizationConfig)
            loadedConfig = { ...loadedConfig, ...customData }
            source = 'saved'
          }
          
          if (privacyConfig) {
            const privacyData = JSON.parse(privacyConfig)
            loadedConfig = {
              ...loadedConfig,
              privacyInsightsEnabled: privacyData.enabled || false,
              revenueShare: privacyData.revenueShare || 60,
              dataTypes: privacyData.dataTypes || ['analytics', 'preferences', 'marketing']
            }
            source = 'saved'
          }
        }

        if (Object.keys(loadedConfig).length > 0) {
          setConfig(prev => ({ ...prev, ...loadedConfig }))
          setConfigSource(source)
        }
        
        setConfigLoaded(true)
        console.log('ScriptTab loaded config:', loadedConfig)
      } catch (err) {
        console.error('Failed to load configuration:', err)
        setConfigLoaded(true)
      }
    }

    loadConfiguration()
  }, [])

  const refreshConfiguration = () => {
    setConfigLoaded(false)
    // Trigger reload
    const loadConfiguration = () => {
      try {
        let loadedConfig = {}
        let source = 'default'

        const fullConfig = localStorage.getItem('cookiebot_full_config')
        if (fullConfig) {
          loadedConfig = JSON.parse(fullConfig)
          source = 'saved'
        } else {
          const customizationConfig = localStorage.getItem('cookiebot_customization_config')
          const privacyConfig = localStorage.getItem('cookiebot_privacy_insights_config')
          
          if (customizationConfig) {
            const customData = JSON.parse(customizationConfig)
            loadedConfig = { ...loadedConfig, ...customData }
            source = 'saved'
          }
          
          if (privacyConfig) {
            const privacyData = JSON.parse(privacyConfig)
            loadedConfig = {
              ...loadedConfig,
              privacyInsightsEnabled: privacyData.enabled || false,
              revenueShare: privacyData.revenueShare || 60,
              dataTypes: privacyData.dataTypes || ['analytics', 'preferences', 'marketing']
            }
            source = 'saved'
          }
        }

        if (Object.keys(loadedConfig).length > 0) {
          setConfig(prev => ({ ...prev, ...loadedConfig }))
          setConfigSource(source)
        }
        
        setConfigLoaded(true)
        console.log('ScriptTab refreshed config:', loadedConfig)
      } catch (err) {
        console.error('Failed to refresh configuration:', err)
        setConfigLoaded(true)
      }
    }

    loadConfiguration()
  }

  const generateScript = (type = 'standard') => {
    const baseScript = `<!-- CookieBot.ai V3 Script -->
<script>
  window.cookieBotConfig = {
    apiKey: '${apiKey}',
    userId: '${userId}',
    domain: window.location.hostname,
    version: 'v3',
    ${type === 'async' ? 'async: true,' : ''}
    ${config.privacyInsightsEnabled || type === 'privacy-insights' ? 'privacyInsights: true,' : ''}
    ${config.privacyInsightsEnabled ? `revenueShare: ${config.revenueShare / 100},` : ''}
    ${type === 'minimal' ? 'minimal: true,' : ''}
    autoShow: true,
    compliance: {
      gdpr: true,
      ccpa: true,
      lgpd: true
    },
    customization: {
      theme: '${config.theme}',
      position: '${config.position}',
      layout: '${config.layout}',
      primaryColor: '${config.primaryColor}',
      backgroundColor: '${config.backgroundColor}',
      textColor: '${config.textColor}'
    }${config.privacyInsightsEnabled ? `,
    monetization: {
      enabled: true,
      revenueShare: ${config.revenueShare / 100},
      dataTypes: ${JSON.stringify(config.dataTypes || ['analytics', 'preferences', 'marketing'])}
    }` : ''}
  };
</script>
<script src="https://cookiebot-ai-backend-production.up.railway.app/static/enhanced_cookiebot_ai_v3.js" ${type === 'async' ? 'async' : ''}></script>`

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

  if (!configLoaded) {
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
            Script
          </h2>
          <p className="text-gray-600">Get your integration script and implementation guide</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshConfiguration}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Config
          </Button>
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

      {/* Configuration Status */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-blue-800">
            <Info className="w-4 h-4" />
            <span className="font-medium">Script Configuration</span>
          </div>
          <p className="text-blue-700 text-sm mt-1">
            This script automatically includes your settings from the <strong>Customization tab</strong>. To modify privacy insights, colors, layout, or other settings, use the Customization tab and save your changes.
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* V3 Active Status */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900">V3 Active</h3>
                <p className="text-sm text-green-700">Latest Version</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custom Config Status */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900">Custom Config</h3>
                <p className="text-sm text-green-700">From Customization Tab</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monetization Status */}
        <Card className={`${config.privacyInsightsEnabled ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                config.privacyInsightsEnabled 
                  ? 'bg-green-100' 
                  : 'bg-gray-100'
              }`}>
                <DollarSign className={`w-6 h-6 ${
                  config.privacyInsightsEnabled 
                    ? 'text-green-600' 
                    : 'text-gray-400'
                }`} />
              </div>
              <div>
                <h3 className={`font-semibold ${
                  config.privacyInsightsEnabled 
                    ? 'text-green-900' 
                    : 'text-gray-900'
                }`}>
                  {config.privacyInsightsEnabled ? 'Monetization Active' : 'Monetization Off'}
                </h3>
                <p className={`text-sm ${
                  config.privacyInsightsEnabled 
                    ? 'text-green-700' 
                    : 'text-gray-600'
                }`}>
                  {config.privacyInsightsEnabled 
                    ? `${config.revenueShare}% Revenue Share` 
                    : 'Configure in Customization'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Script Generator */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🔥 Script Integration</CardTitle>
              <CardDescription>Get your CookieBot.ai V3 script with your customization settings</CardDescription>
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
                  <span className="text-green-400 text-sm font-mono">HTML</span>
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
                <pre className="text-gray-300 text-sm overflow-x-auto">
                  <code>{generateScript(scriptType)}</code>
                </pre>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>This V3 script includes your customization settings and latest compliance features</span>
              </div>

              {config.privacyInsightsEnabled && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-green-800 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm font-medium">Privacy Insights Enabled</span>
                  </div>
                  <p className="text-green-700 text-xs">
                    This script includes privacy insights monetization with {config.revenueShare}% revenue share
                  </p>
                </div>
              )}
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
              <CardDescription>Follow these steps to implement CookieBot.ai on your website</CardDescription>
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
              <CardTitle className="text-lg">Live Preview</CardTitle>
              <CardDescription>Preview how your banner will look with current settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg bg-gray-50 p-4 h-48">
                <div className="h-full flex items-end justify-center">
                  <div 
                    className="max-w-sm p-4 shadow-lg rounded-lg"
                    style={{
                      backgroundColor: config.backgroundColor,
                      color: config.textColor,
                      borderRadius: '8px',
                      border: `1px solid ${config.primaryColor}20`
                    }}
                  >
                    <div className="font-semibold mb-2">🍪 We value your privacy</div>
                    <p className="text-xs mb-3 opacity-80">
                      This website uses cookies to enhance your experience{config.privacyInsightsEnabled ? ' and generate privacy insights revenue' : ''}.
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <button 
                        style={{
                          backgroundColor: config.primaryColor,
                          color: '#ffffff',
                          borderRadius: '8px',
                          border: 'none',
                          padding: '8px 16px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Accept All
                      </button>
                      <button 
                        style={{
                          backgroundColor: 'transparent',
                          color: config.textColor,
                          border: `1px solid ${config.textColor}30`,
                          borderRadius: '8px',
                          padding: '8px 16px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Customize
                      </button>
                    </div>
                    {config.privacyInsightsEnabled && (
                      <div className="mt-2 text-xs opacity-60 flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-green-600" />
                        <span className="text-green-600 font-medium">
                          Privacy insights enabled ({config.revenueShare}% revenue share)
                        </span>
                      </div>
                    )}
                  </div>
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

          {/* Testing Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Testing & Validation</CardTitle>
              <CardDescription>Tools to verify your implementation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Globe className="w-4 h-4 mr-2" />
                Test Script on Domain
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile Preview
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Compliance Validator
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Generate Test Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Advanced Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Advanced Configuration</CardTitle>
          <CardDescription>Optional settings for advanced users</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="events" className="w-full">
            <TabsList>
              <TabsTrigger value="events">Event Callbacks</TabsTrigger>
              <TabsTrigger value="custom">Custom CSS</TabsTrigger>
              <TabsTrigger value="api">API Methods</TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-green-400 text-sm font-mono mb-2">JavaScript</div>
                <pre className="text-gray-300 text-sm overflow-x-auto">
                  <code>{`// V3 Event callbacks
window.cookieBotConfig.callbacks = {
  onAccept: function(categories) {
    console.log('Accepted categories:', categories);
    // Your custom code here
  },
  onDecline: function() {
    console.log('User declined cookies');
    // Your custom code here
  },
  onCustomize: function() {
    console.log('User opened customization');
    // Your custom code here
  }${config.privacyInsightsEnabled ? `,
  onPrivacyInsightClick: function(insightData) {
    console.log('Privacy insight clicked:', insightData);
    // Revenue tracking code here
  }` : ''}
};`}</code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-green-400 text-sm font-mono mb-2">CSS</div>
                <pre className="text-gray-300 text-sm overflow-x-auto">
                  <code>{`/* Custom V3 styling */
.cookiebot-v3-banner {
  font-family: 'Your Font', sans-serif;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.cookiebot-v3-button-accept {
  background: linear-gradient(45deg, ${config.primaryColor}, #0056b3);
  border-radius: 25px;
}${config.privacyInsightsEnabled ? `

.cookiebot-v3-privacy-insights {
  background: linear-gradient(45deg, #28a745, #20c997);
  color: white;
}` : ''}`}</code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="api" className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-green-400 text-sm font-mono mb-2">JavaScript V3 API</div>
                <pre className="text-gray-300 text-sm overflow-x-auto">
                  <code>{`// Available V3 API methods
CookieBotV3.show();           // Show banner
CookieBotV3.hide();           // Hide banner
CookieBotV3.reset();          // Reset consent
CookieBotV3.getConsent();     // Get current consent
CookieBotV3.hasConsent();     // Check if user has consented${config.privacyInsightsEnabled ? `
CookieBotV3.getRevenue();     // Get revenue data
CookieBotV3.trackInsight();   // Track privacy insight` : ''}`}</code>
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

