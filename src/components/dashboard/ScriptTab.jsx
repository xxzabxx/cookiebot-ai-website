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
  Zap,
  Globe,
  Users,
  TrendingUp
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
  const apiKey = user?.api_key || `cb_api_${Math.random().toString(36).substr(2, 32)}`

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

  const generateAutoRegistrationScript = () => {
    return `<!-- CookieBot.ai Auto-Registration Script -->
<script>
(function() {
    var cb = window.CookieBot = window.CookieBot || {};
    cb.apiKey = '${apiKey}';
    cb.apiUrl = 'https://cookiebot-ai-backend-production.up.railway.app/api/public';
    cb.config = {
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
    
    // Auto-register website on script load
    if (cb.apiKey && window.location.hostname) {
        fetch(cb.apiUrl + '/register-website', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                api_key: cb.apiKey,
                domain: window.location.hostname,
                referrer: document.referrer || window.location.href
            })
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            if (data.success) {
                cb.clientId = data.data.client_id;
                cb.websiteId = data.data.website_id;
                console.log('CookieBot: Website auto-registered!', {
                    websiteId: data.data.website_id,
                    clientId: data.data.client_id,
                    domain: data.data.domain
                });
            }
        }).catch(function(error) {
            console.warn('CookieBot auto-registration failed:', error);
        });
    }
    
    // Load CookieBot tracking script
    var script = document.createElement('script');
    script.src = cb.apiUrl + '/script.js';
    script.async = true;
    script.onload = function() {
        console.log('CookieBot: Tracking script loaded successfully');
    };
    document.head.appendChild(script);
})();
</script>
<!-- End CookieBot.ai Auto-Registration Script -->`
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const downloadScript = () => {
    const script = generateAutoRegistrationScript()
    const blob = new Blob([script], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cookiebot-auto-registration-script.html'
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
          <p className="text-gray-600">Get your auto-registration script and deploy to any website</p>
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

      {/* Auto-Registration Feature Highlight */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-green-800 mb-2">
            <Zap className="w-5 h-5" />
            <span className="font-semibold text-lg">🚀 Auto-Registration Enabled!</span>
          </div>
          <p className="text-green-700 text-sm leading-relaxed">
            This script automatically registers your websites in the dashboard when deployed. 
            No manual setup required - just paste the script and your websites will appear in the 
            <strong> Websites tab</strong> automatically!
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Auto-Registration Status */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900">Auto-Registration</h3>
                <p className="text-sm text-green-700">Websites auto-populate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Key Status */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">API Key Active</h3>
                <p className="text-sm text-blue-700 font-mono">{apiKey.substring(0, 15)}...</p>
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
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            🚀 Your Auto-Registration Script
          </CardTitle>
          <CardDescription>
            Copy this script and paste it anywhere in your website's HTML. Your websites will automatically appear in the dashboard!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-400 text-sm font-mono">Auto-Registration Script</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(generateAutoRegistrationScript())}
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
              <code>{generateAutoRegistrationScript()}</code>
            </pre>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Auto-Registration Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-green-800 mb-1">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">Auto-Registration Enabled</span>
              </div>
              <p className="text-green-700 text-xs">
                Websites automatically appear in your dashboard when this script is deployed
              </p>
            </div>

            {/* Monetization Info */}
            {config.privacyInsightsEnabled && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-green-800 mb-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm font-medium">Privacy Insights Enabled</span>
                </div>
                <p className="text-green-700 text-xs">
                  Monetization active with {config.revenueShare}% revenue share
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>This script works on any website - WordPress, Shopify, React, HTML, etc.</span>
          </div>
        </CardContent>
      </Card>

      {/* How Auto-Registration Works */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            🔄 How Auto-Registration Works
          </CardTitle>
          <CardDescription>Understanding the automatic website registration process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm font-semibold">1</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Deploy Script</h4>
                <p className="text-gray-600 text-sm">
                  Copy the script above and paste it anywhere in your website's HTML code
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm font-semibold">2</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Automatic Registration</h4>
                <p className="text-gray-600 text-sm">
                  When someone visits your website, the script automatically registers it using your API key
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm font-semibold">3</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Appears in Dashboard</h4>
                <p className="text-gray-600 text-sm">
                  Your website automatically appears in the <strong>Websites tab</strong> with analytics and tracking
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm font-semibold">4</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Start Tracking</h4>
                <p className="text-gray-600 text-sm">
                  Cookie consent tracking, analytics, and revenue generation begin immediately
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benefits of Auto-Registration */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            ✨ Benefits of Auto-Registration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-800">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">No Manual Setup</span>
              </div>
              <p className="text-blue-700 text-xs ml-6">
                Websites appear automatically without manual configuration
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-800">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">Instant Analytics</span>
              </div>
              <p className="text-blue-700 text-xs ml-6">
                Start tracking consent and revenue immediately
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-800">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">Universal Compatibility</span>
              </div>
              <p className="text-blue-700 text-xs ml-6">
                Works on any website platform or technology
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-800">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">Secure & Private</span>
              </div>
              <p className="text-blue-700 text-xs ml-6">
                Your API key ensures only your websites are registered
              </p>
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
              <strong>Website not appearing in dashboard?</strong> Make sure the script is properly deployed and your website is receiving traffic.
            </p>
            <p className="text-yellow-800">
              <strong>Cookie banner not showing?</strong> Check your browser's console for any JavaScript errors and ensure the script loaded correctly.
            </p>
            <p className="text-yellow-800">
              <strong>Still having issues?</strong> Contact our support team - we're here to help you get set up!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ScriptTab

