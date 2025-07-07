import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  Code, 
  Copy, 
  Download, 
  ExternalLink, 
  FileText, 
  Settings, 
  Zap,
  Shield,
  BarChart3,
  Palette,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'

const Documentation = () => {
  const [copiedCode, setCopiedCode] = useState('')

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(''), 2000)
  }

  const basicIntegrationCode = `<!-- Add this script to your website's <head> section -->
<script src="https://cdn.cookiebot.ai/v1/cookiebot-ai.js" 
        data-cbid="your-client-id"
        data-company-name="Your Company"
        data-enable-affiliate-ads="true"
        data-primary-color="#667eea"
        data-banner-position="bottom">
</script>`

  const advancedConfigCode = `<script src="https://cdn.cookiebot.ai/v1/cookiebot-ai.js" 
        data-cbid="your-client-id"
        data-company-name="Your Company"
        data-logo-url="https://yoursite.com/logo.png"
        data-primary-color="#667eea"
        data-banner-position="bottom"
        data-enable-affiliate-ads="true"
        data-auto-block="true"
        data-consent-expiry="365"
        data-show-decline="true"
        data-granular-consent="true">
</script>`

  const jsApiCode = `// Check consent status
if (CookieBot.consent.necessary) {
  // Necessary cookies are accepted
}

if (CookieBot.consent.preferences) {
  // Preference cookies are accepted
}

if (CookieBot.consent.statistics) {
  // Statistics cookies are accepted
}

if (CookieBot.consent.marketing) {
  // Marketing cookies are accepted
}

// Listen for consent changes
CookieBot.addEventListener('consent-changed', function(consent) {
  console.log('Consent updated:', consent);
});

// Show consent banner programmatically
CookieBot.show();

// Withdraw consent
CookieBot.withdraw();`

  const configOptions = [
    {
      attribute: 'data-cbid',
      description: 'Your unique client ID (required)',
      type: 'string',
      default: '-',
      example: 'cb-12345-abcde'
    },
    {
      attribute: 'data-company-name',
      description: 'Company name for branding',
      type: 'string',
      default: 'Your Company',
      example: 'Acme Corporation'
    },
    {
      attribute: 'data-logo-url',
      description: 'URL to company logo',
      type: 'string',
      default: '-',
      example: 'https://yoursite.com/logo.png'
    },
    {
      attribute: 'data-primary-color',
      description: 'Primary color for UI elements',
      type: 'string',
      default: '#667eea',
      example: '#ff6b6b'
    },
    {
      attribute: 'data-banner-position',
      description: 'Banner position (top/bottom)',
      type: 'string',
      default: 'bottom',
      example: 'top'
    },
    {
      attribute: 'data-enable-affiliate-ads',
      description: 'Enable affiliate advertisements',
      type: 'boolean',
      default: 'false',
      example: 'true'
    },
    {
      attribute: 'data-auto-block',
      description: 'Automatically block non-consented cookies',
      type: 'boolean',
      default: 'true',
      example: 'false'
    },
    {
      attribute: 'data-consent-expiry',
      description: 'Consent expiry in days',
      type: 'number',
      default: '365',
      example: '180'
    },
    {
      attribute: 'data-show-decline',
      description: 'Show decline all button',
      type: 'boolean',
      default: 'true',
      example: 'false'
    },
    {
      attribute: 'data-granular-consent',
      description: 'Enable category-specific consent',
      type: 'boolean',
      default: 'true',
      example: 'false'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4">Documentation</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Developer
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Documentation
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to integrate CookieBot.ai into your website. 
            Get started in minutes with our simple setup guide.
          </p>
        </div>

        {/* Quick Start */}
        <Card className="mb-12 shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-blue-600" />
              <CardTitle className="text-2xl">Quick Start</CardTitle>
            </div>
            <CardDescription>
              Get CookieBot.ai running on your website in under 5 minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Sign Up</h3>
                <p className="text-gray-600 text-sm">Create your free account and get your client ID</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Add Script</h3>
                <p className="text-gray-600 text-sm">Copy and paste our script tag to your website</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Configure</h3>
                <p className="text-gray-600 text-sm">Customize your consent banner and start earning</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Documentation Tabs */}
        <Tabs defaultValue="integration" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="integration">Integration</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="api">JavaScript API</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>

          {/* Integration Tab */}
          <TabsContent value="integration" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Basic Integration</span>
                </CardTitle>
                <CardDescription>
                  Add CookieBot.ai to your website with a single script tag
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code>{basicIntegrationCode}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(basicIntegrationCode, 'basic')}
                  >
                    {copiedCode === 'basic' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-blue-800 font-medium">Important:</p>
                      <p className="text-blue-700 text-sm">
                        Replace "your-client-id" with your actual client ID from the dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Advanced Integration</CardTitle>
                <CardDescription>
                  Full configuration with all available options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code>{advancedConfigCode}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(advancedConfigCode, 'advanced')}
                  >
                    {copiedCode === 'advanced' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configuration Tab */}
          <TabsContent value="configuration" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Configuration Options</span>
                </CardTitle>
                <CardDescription>
                  Complete list of all available configuration attributes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Attribute</th>
                        <th className="text-left p-3 font-semibold">Description</th>
                        <th className="text-left p-3 font-semibold">Type</th>
                        <th className="text-left p-3 font-semibold">Default</th>
                        <th className="text-left p-3 font-semibold">Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      {configOptions.map((option, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-mono text-sm bg-gray-100 rounded">{option.attribute}</td>
                          <td className="p-3 text-sm">{option.description}</td>
                          <td className="p-3 text-sm">
                            <Badge variant="outline">{option.type}</Badge>
                          </td>
                          <td className="p-3 text-sm font-mono">{option.default}</td>
                          <td className="p-3 text-sm font-mono text-blue-600">{option.example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* JavaScript API Tab */}
          <TabsContent value="api" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>JavaScript API</span>
                </CardTitle>
                <CardDescription>
                  Programmatically interact with the consent system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code>{jsApiCode}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(jsApiCode, 'api')}
                  >
                    {copiedCode === 'api' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">consent-changed</code>
                    <p className="text-sm text-gray-600 mt-1">Fired when consent preferences change</p>
                  </div>
                  <div>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">banner-shown</code>
                    <p className="text-sm text-gray-600 mt-1">Fired when consent banner is displayed</p>
                  </div>
                  <div>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">banner-hidden</code>
                    <p className="text-sm text-gray-600 mt-1">Fired when consent banner is hidden</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">CookieBot.show()</code>
                    <p className="text-sm text-gray-600 mt-1">Show the consent banner</p>
                  </div>
                  <div>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">CookieBot.hide()</code>
                    <p className="text-sm text-gray-600 mt-1">Hide the consent banner</p>
                  </div>
                  <div>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">CookieBot.withdraw()</code>
                    <p className="text-sm text-gray-600 mt-1">Withdraw all consent</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Examples Tab */}
          <TabsContent value="examples" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="h-5 w-5" />
                    <span>E-commerce Site</span>
                  </CardTitle>
                  <CardDescription>
                    Perfect setup for online stores with marketing tracking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Affiliate ads enabled</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Marketing cookies granular control</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Custom branding with logo</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Example
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Blog/Content Site</span>
                  </CardTitle>
                  <CardDescription>
                    Minimal setup focused on content and analytics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Analytics tracking</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Minimal UI design</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Fast loading</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Example
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Enterprise Site</span>
                  </CardTitle>
                  <CardDescription>
                    Maximum compliance and security features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Strict cookie blocking</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Detailed consent records</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Custom legal text</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Example
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>SaaS Platform</span>
                  </CardTitle>
                  <CardDescription>
                    Revenue optimization with affiliate system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Maximum revenue settings</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">A/B testing integration</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Advanced analytics</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Example
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Support Section */}
        <Card className="mt-12 shadow-lg">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              Our support team is here to help you get the most out of CookieBot.ai
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Knowledge Base</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Browse our comprehensive guides and tutorials
                </p>
                <Button variant="outline" size="sm">
                  Browse Articles
                </Button>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Code Examples</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Download ready-to-use integration examples
                </p>
                <Button variant="outline" size="sm">
                  Download Examples
                </Button>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Contact Support</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get direct help from our technical team
                </p>
                <Button variant="outline" size="sm">
                  Contact Us
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Documentation

