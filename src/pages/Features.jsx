import React from 'react'
import { CheckCircle, Brain, DollarSign, Shield, Palette, BarChart3, Zap, Globe, Eye, Settings, Code, Smartphone } from 'lucide-react'

const Features = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              AI-Powered Features
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Everything You Need to <span className="text-blue-600">Succeed</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              CookieBot.ai combines cutting-edge AI technology with revenue generation 
              to create the most advanced cookie consent platform available.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* AI Technology */}
            <div className="text-center p-8 bg-blue-50 rounded-2xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Technology</h3>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Consent Robot</h4>
              <p className="text-gray-600 mb-6">
                Our intelligent consent system automatically adapts to user behavior, jurisdiction 
                requirements, and optimal conversion patterns using advanced machine learning.
              </p>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Smart jurisdiction detection</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Behavioral optimization</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Conversion rate enhancement</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Automated A/B testing</span>
                </div>
              </div>
            </div>

            {/* Monetization */}
            <div className="text-center p-8 bg-green-50 rounded-2xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Monetization</h3>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Privacy Insights Revenue System</h4>
              <p className="text-gray-600 mb-6">
                The only platform that turns cookie consent into revenue. 
                Earn 60% from educational privacy content displayed after user consent.
              </p>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">60% revenue share</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Educational privacy tips</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Transparent tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Monthly automated payouts</span>
                </div>
              </div>
            </div>

            {/* Compliance */}
            <div className="text-center p-8 bg-purple-50 rounded-2xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Compliance</h3>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Multi-Jurisdiction Compliance</h4>
              <p className="text-gray-600 mb-6">
                Automatic compliance with GDPR, CCPA, LGPD, and emerging privacy laws. Our AI 
                detects user location and applies appropriate regulations.
              </p>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">GDPR compliance</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">CCPA support</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">LGPD coverage</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Auto-jurisdiction detection</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Customization */}
            <div className="text-center p-8 bg-orange-50 rounded-2xl">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Customization</h3>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Advanced Customization Engine</h4>
              <p className="text-gray-600 mb-6">
                Unlimited theme options, custom branding, and granular 
                control over every aspect of your consent banner's appearance and behavior.
              </p>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Unlimited themes</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Custom branding</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Logo integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Color customization</span>
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div className="text-center p-8 bg-indigo-50 rounded-2xl">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Analytics</h3>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Professional Analytics Dashboard</h4>
              <p className="text-gray-600 mb-6">
                Comprehensive 6-tab dashboard with real-time analytics, revenue tracking, 
                configuration management, and live preview capabilities.
              </p>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Real-time analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Revenue tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Live preview</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Configuration management</span>
                </div>
              </div>
            </div>

            {/* Performance */}
            <div className="text-center p-8 bg-teal-50 rounded-2xl">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Performance</h3>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Lightning-Fast Performance</h4>
              <p className="text-gray-600 mb-6">
                Optimized for speed with &lt;50KB bundle size, 99.9% uptime, 
                and edge-cached delivery for instant loading worldwide.
              </p>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">&lt;50KB bundle size</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">99.9% uptime</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Edge caching</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Global CDN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Platform Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-medium mb-6">
              Complete Platform
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Frontend Freedom, Backend Power
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start free with powerful frontend features, then unlock professional backend 
              capabilities to maximize revenue and streamline management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Frontend Features</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Advanced Customization</h4>
                    <p className="text-gray-600">Complete control over banner appearance and behavior</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Live Preview System</h4>
                    <p className="text-gray-600">Real-time visualization across all devices</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Easy Integration</h4>
                    <p className="text-gray-600">One-click setup for all major platforms</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Backend Power</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Privacy Insights Revenue</h4>
                    <p className="text-gray-600">Turn consent into revenue with 60% share</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Advanced Analytics</h4>
                    <p className="text-gray-600">Comprehensive insights and optimization</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Compliance Monitoring</h4>
                    <p className="text-gray-600">Automated compliance across all jurisdictions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Advanced Features for Every Need
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and capabilities that set CookieBot.ai apart from traditional consent management platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Global Compliance</h3>
              <p className="text-gray-600 text-sm">
                Automatic compliance with GDPR, CCPA, LGPD, and emerging privacy laws worldwide.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
              <p className="text-gray-600 text-sm">
                Real-time preview of your consent banner across desktop, mobile, and tablet devices.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Advanced Config</h3>
              <p className="text-gray-600 text-sm">
                Granular control over every aspect of consent collection and user experience.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Mobile Optimized</h3>
              <p className="text-gray-600 text-sm">
                Fully responsive design optimized for mobile devices and touch interactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Cookie Consent?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of websites already earning revenue with CookieBot.ai. 
            Start your free trial today and see the difference AI-powered customization makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Schedule Demo
            </button>
          </div>
          <p className="text-blue-100 text-sm mt-4">
            14-day free trial • No credit card required • Setup in 5 minutes
          </p>
        </div>
      </section>
    </div>
  )
}

export default Features

