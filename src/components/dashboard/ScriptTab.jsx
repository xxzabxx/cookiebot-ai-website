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
  Smartphone
} from 'lucide-react'

const ScriptTab = () => {
  const [copied, setCopied] = useState(false)
  const [scriptType, setScriptType] = useState('standard')
  const [userId] = useState('user_12345') // This would come from auth context
  const [apiKey] = useState('cb_live_abcd1234efgh5678ijkl9012mnop3456') // This would come from user settings

  const generateScript = (type = 'standard') => {
    const baseScript = `<!-- CookieBot.ai Script -->
<script>
  window.cookieBotConfig = {
    apiKey: '${apiKey}',
    userId: '${userId}',
    domain: window.location.hostname,
    ${type === 'async' ? 'async: true,' : ''}
    ${type === 'privacy-insights' ? 'privacyInsights: true,' : ''}
    ${type === 'minimal' ? 'minimal: true,' : ''}
    autoShow: true,
    compliance: {
      gdpr: true,
      ccpa: true,
      lgpd: true
    },
    customization: {
      theme: 'auto',
      position: 'bottom-right',
      layout: 'dialog'
    }
  };
</script>
<script src="https://cdn.cookiebot.ai/v2/cookiebot.min.js" ${type === 'async' ? 'async' : ''}></script>`

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
    a.download = 'cookiebot-script.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const integrationSteps = [
    {
      title: "Copy the Script",
      description: "Copy the generated script code below",
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Code className="w-6 h-6 text-blue-600" />
            Script Integration
          </h2>
          <p className="text-gray-600">Get your CookieBot.ai script and integration instructions</p>
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
                <h3 className="font-semibold text-gray-900">Active</h3>
                <p className="text-sm text-gray-600">Script Status</p>
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
                <h3 className="font-semibold text-gray-900">3 Domains</h3>
                <p className="text-sm text-gray-600">Configured</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">v2.1.0</h3>
                <p className="text-sm text-gray-600">Latest Version</p>
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
              <CardTitle className="text-lg">Generate Your Script</CardTitle>
              <CardDescription>Choose the integration type that best fits your needs</CardDescription>
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
                  <option value="privacy-insights">With Privacy Insights</option>
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
                <span>This script is automatically updated and includes the latest compliance features</span>
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
                  <code>{`// Event callbacks
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
  }
};`}</code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-green-400 text-sm font-mono mb-2">CSS</div>
                <pre className="text-gray-300 text-sm overflow-x-auto">
                  <code>{`/* Custom styling */
.cookiebot-banner {
  font-family: 'Your Font', sans-serif;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.cookiebot-button-accept {
  background: linear-gradient(45deg, #007bff, #0056b3);
  border-radius: 25px;
}`}</code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="api" className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-green-400 text-sm font-mono mb-2">JavaScript API</div>
                <pre className="text-gray-300 text-sm overflow-x-auto">
                  <code>{`// Available API methods
CookieBot.show();           // Show banner
CookieBot.hide();           // Hide banner
CookieBot.reset();          // Reset consent
CookieBot.getConsent();     // Get current consent
CookieBot.hasConsent();     // Check if user has consented`}</code>
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

