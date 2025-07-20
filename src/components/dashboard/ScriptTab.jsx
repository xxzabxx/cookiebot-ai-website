import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { 
  Code, 
  Copy, 
  Download, 
  CheckCircle, 
  AlertTriangle,
  DollarSign,
  RefreshCw,
  Info,
  Zap
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const ScriptTab = () => {
  const { user } = useAuth()
  const [copied, setCopied] = useState(false)
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

  const userId = user?.id || '1'
  const apiKey = user?.apiKey || 'cb_live_abcd1234efgh5678ijkl9012mnop3456'

  // Load configuration from localStorage
  useEffect(() => {
    const loadConfiguration = () => {
      try {
        let loadedConfig = {}

        const fullConfig = localStorage.getItem('cookiebot_full_config')
        if (fullConfig) {
          loadedConfig = JSON.parse(fullConfig)
        } else {
          const customizationConfig = localStorage.getItem('cookiebot_customization_config')
          const privacyConfig = localStorage.getItem('cookiebot_privacy_insights_config')
          
          if (customizationConfig) {
            const customData = JSON.parse(customizationConfig)
            loadedConfig = { ...loadedConfig, ...customData }
          }
          
          if (privacyConfig) {
            const privacyData = JSON.parse(privacyConfig)
            loadedConfig = {
              ...loadedConfig,
              privacyInsightsEnabled: privacyData.enabled || false,
              revenueShare: privacyData.revenueShare || 60,
              dataTypes: privacyData.dataTypes || ['analytics', 'preferences', 'marketing']
            }
          }
        }

        if (Object.keys(loadedConfig).length > 0) {
          setConfig(prev => ({ ...prev, ...loadedConfig }))
        }
        
        setConfigLoaded(true)
      } catch (err) {
        console.error('Failed to load configuration:', err)
        setConfigLoaded(true)
      }
    }

    loadConfiguration()
  }, [])

  const refreshConfiguration = () => {
    setConfigLoaded(false)
    setTimeout(() => {
      const loadConfiguration = () => {
        try {
          let loadedConfig = {}

          const fullConfig = localStorage.getItem('cookiebot_full_config')
          if (fullConfig) {
            loadedConfig = JSON.parse(fullConfig)
          } else {
            const customizationConfig = localStorage.getItem('cookiebot_customization_config')
            const privacyConfig = localStorage.getItem('cookiebot_privacy_insights_config')
            
            if (customizationConfig) {
              const customData = JSON.parse(customizationConfig)
              loadedConfig = { ...loadedConfig, ...customData }
            }
            
            if (privacyConfig) {
              const privacyData = JSON.parse(privacyConfig)
              loadedConfig = {
                ...loadedConfig,
                privacyInsightsEnabled: privacyData.enabled || false,
                revenueShare: privacyData.revenueShare || 60,
                dataTypes: privacyData.dataTypes || ['analytics', 'preferences', 'marketing']
              }
            }
          }

          if (Object.keys(loadedConfig).length > 0) {
            setConfig(prev => ({ ...prev, ...loadedConfig }))
          }
          
          setConfigLoaded(true)
        } catch (err) {
          console.error('Failed to refresh configuration:', err)
          setConfigLoaded(true)
        }
      }

      loadConfiguration()
    }, 100)
  }

  const generateSimpleScript = () => {
    return `<!-- CookieBot.ai - Just copy and paste anywhere in your website -->
<script>
window.cookieBotConfig = {
  apiKey: '${apiKey}',
  userId: '${userId}',
  domain: window.location.hostname,
  version: 'v3',${config.privacyInsightsEnabled ? `
  privacyInsights: true,
  revenueShare: ${config.revenueShare / 100},` : ''}
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

// Universal script that works on any website
(function() {
  function loadCookieBot() {
    if (window.CookieBotLoaded) return;
    window.CookieBotLoaded = true;
    
    var script = document.createElement('script');
    script.src = 'https://cookiebot-ai-backend-production.up.railway.app/static/enhanced_cookiebot_ai_v3.js';
    document.head.appendChild(script);
  }
  
  if (document.readyState === 'complete') {
    loadCookieBot();
  } else {
    window.addEventListener('load', loadCookieBot);
    document.addEventListener('DOMContentLoaded', loadCookieBot);
    setTimeout(loadCookieBot, 2000);
  }
})();
</script>`
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const downloadScript = () => {
    const script = generateSimpleScript()
    const blob = new Blob([script], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cookiebot-script.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

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
        </div>
      </div>

      {/* Simple Instructions */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-green-800 mb-2">
            <Zap className="w-4 h-4" />
            <span className="font-medium">Super Simple Installation</span>
          </div>
          <p className="text-green-700 text-sm">
            Just copy the script below and paste it <strong>anywhere</strong> in your website's HTML. 
            It works on WordPress, Shopify, React, or any website. No technical knowledge required!
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
                <Code className="w-6 h-6 text-green-600" />
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

      {/* Main Script Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🚀 Your CookieBot Script</CardTitle>
          <CardDescription>
            Copy this script and paste it anywhere in your website's HTML. It works everywhere!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-400 text-sm font-mono">HTML Script</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(generateSimpleScript())}
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
              <code>{generateSimpleScript()}</code>
            </pre>
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

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>This script works on any website - WordPress, Shopify, React, HTML, etc.</span>
          </div>
        </CardContent>
      </Card>

      {/* Simple Installation Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📋 Installation Steps</CardTitle>
          <CardDescription>Follow these 3 simple steps to add CookieBot to your website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm font-semibold">1</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Copy the Script</h4>
                <p className="text-gray-600 text-sm">Click the copy button above to copy your personalized script</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm font-semibold">2</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Paste in Your Website</h4>
                <p className="text-gray-600 text-sm">
                  Paste the script anywhere in your website's HTML:
                </p>
                <ul className="text-gray-600 text-xs mt-1 ml-4 list-disc">
                  <li><strong>WordPress:</strong> In your theme's header.php or footer.php</li>
                  <li><strong>Shopify:</strong> In your theme.liquid file</li>
                  <li><strong>HTML websites:</strong> In the &lt;head&gt; or before &lt;/body&gt;</li>
                  <li><strong>Other platforms:</strong> In any HTML section</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm font-semibold">3</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Test Your Website</h4>
                <p className="text-gray-600 text-sm">Visit your website and you should see the cookie banner appear</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            Need Help?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p className="text-yellow-800">
              <strong>Banner not showing?</strong> Make sure you pasted the script correctly and your website is live.
            </p>
            <p className="text-yellow-800">
              <strong>Still having issues?</strong> Contact our support team - we're here to help!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ScriptTab

