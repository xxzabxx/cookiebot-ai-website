import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  ArrowRight,
  Shield,
  Zap,
  Palette,
  BarChart3,
  Globe,
  Settings,
  Eye,
  Lock,
  Smartphone,
  Code,
  DollarSign,
  CheckCircle,
  Star,
  Layers,
  Target,
  Brain,
  Sparkles,
  TrendingUp,
  Users,
  Clock,
  Award,
  Scan,
  Search
} from 'lucide-react'
import { Link } from 'react-router-dom'

const Features = () => {
  const coreFeatures = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Consent Robot",
      description: "Our intelligent consent system automatically adapts to user behavior, jurisdiction requirements, and optimal conversion patterns using advanced machine learning.",
      features: ["Smart jurisdiction detection", "Behavioral optimization", "Conversion rate enhancement", "Automated A/B testing"],
      category: "AI Technology"
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Privacy Insights Revenue System",
      description: "The only platform that turns cookie consent into revenue. Earn 60% from educational privacy content displayed after user consent.",
      features: ["60% revenue share", "Educational privacy tips", "Transparent tracking", "Monthly automated payouts"],
      category: "Monetization"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Multi-Jurisdiction Compliance",
      description: "Automatic compliance with GDPR, CCPA, LGPD, and emerging privacy laws. Our AI detects user location and applies appropriate regulations.",
      features: ["GDPR compliance", "CCPA support", "LGPD coverage", "Auto-jurisdiction detection"],
      category: "Compliance"
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Advanced Customization Engine",
      description: "Unlimited theme options, custom branding, and granular control over every aspect of your consent banner's appearance and behavior.",
      features: ["Unlimited themes", "Custom branding", "Logo integration", "Color customization"],
      category: "Customization"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Professional Analytics Dashboard",
      description: "Comprehensive 6-tab dashboard with real-time analytics, revenue tracking, configuration management, and live preview capabilities.",
      features: ["Real-time analytics", "Revenue tracking", "Live preview", "Configuration management"],
      category: "Analytics"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning-Fast Performance",
      description: "Optimized for speed with <50KB bundle size, 99.9% uptime, and edge-cached delivery for instant loading worldwide.",
      features: ["<50KB bundle size", "99.9% uptime", "Edge caching", "Global CDN"],
      category: "Performance"
    }
  ]

  const frontendFeatures = [
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Layout Control",
      description: "Dialog and Bar layouts with flexible positioning",
      features: ["Dialog layout", "Bar layout", "Position control", "Overlay effects"]
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Theme System",
      description: "Light, Dark, and Custom themes with color control",
      features: ["3 theme options", "Custom colors", "Brand integration", "Logo support"]
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Button Styles",
      description: "Multiple button variations for optimal UX",
      features: ["Default CTA", "Solid equal", "Outline minimal", "Custom styling"]
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Multi-Language",
      description: "Support for 40+ languages with auto-detection",
      features: ["40+ languages", "Auto-detection", "Custom translations", "RTL support"]
    }
  ]

  const backendFeatures = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics Dashboard",
      description: "Real-time consent tracking and performance metrics",
      features: ["Real-time data", "Conversion tracking", "Performance metrics", "Custom reports"]
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Revenue Management",
      description: "Track earnings and manage automated payouts",
      features: ["Revenue tracking", "Payout management", "Performance analytics", "Tax reporting"]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Collaboration",
      description: "Multi-user access with role-based permissions",
      features: ["Team management", "Role permissions", "Activity logs", "Shared workspaces"]
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Developer Tools",
      description: "APIs, webhooks, and integration tools",
      features: ["REST API", "Webhooks", "SDK libraries", "Documentation"]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Comprehensive SEO Implementation */}
      <Helmet>
        {/* Primary Meta Tags */}
        <title>AI-Powered Cookie Consent Features | CookieBot.ai - Your AI Consent Robot</title>
        <meta name="title" content="AI-Powered Cookie Consent Features | CookieBot.ai - Your AI Consent Robot" />
        <meta name="description" content="Discover CookieBot.ai's revolutionary features: AI-powered consent optimization, 60% revenue sharing system, GDPR compliance automation, unlimited customization, and professional analytics dashboard. The only cookie consent platform that pays you." />
        <meta name="keywords" content="AI cookie consent, GDPR compliance features, revenue sharing cookie banner, privacy insights monetization, cookie consent customization, automated compliance, consent management platform, AI-powered privacy, cookie banner revenue, CCPA compliance features" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="CookieBot.ai" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://cookiebot.ai/features" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cookiebot.ai/features" />
        <meta property="og:title" content="AI-Powered Cookie Consent Features | CookieBot.ai" />
        <meta property="og:description" content="The only AI-powered cookie consent platform with built-in revenue generation. Discover advanced features: 60% revenue sharing, GDPR automation, unlimited customization, and professional analytics." />
        <meta property="og:image" content="https://cookiebot.ai/features-og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="CookieBot.ai" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://cookiebot.ai/features" />
        <meta property="twitter:title" content="AI-Powered Cookie Consent Features | CookieBot.ai" />
        <meta property="twitter:description" content="Revenue-generating cookie consent with AI optimization. 60% revenue share, GDPR compliance, unlimited customization." />
        <meta property="twitter:image" content="https://cookiebot.ai/features-twitter-card.png" />
        
        {/* Additional SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#667eea" />
        
        {/* Structured Data for Rich Snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "CookieBot.ai Features - AI-Powered Cookie Consent",
            "description": "Comprehensive features of CookieBot.ai: AI-powered consent optimization, revenue generation, GDPR compliance, and advanced customization.",
            "url": "https://cookiebot.ai/features",
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "CookieBot.ai",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description": "AI-powered cookie consent platform with revenue generation",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "description": "Free tier available with premium features"
              },
              "featureList": [
                "AI-powered consent optimization",
                "60% revenue sharing system",
                "GDPR/CCPA/LGPD compliance",
                "Unlimited customization options",
                "Professional analytics dashboard",
                "Multi-language support",
                "Real-time performance tracking"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "127"
              },
              "publisher": {
                "@type": "Organization",
                "name": "CookieBot.ai",
                "url": "https://cookiebot.ai",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://cookiebot.ai/logo.png"
                }
              }
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://cookiebot.ai"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Features",
                  "item": "https://cookiebot.ai/features"
                }
              ]
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              🤖 Your AI-Powered Cookie Consent Robot
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Revolutionary Features That
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Generate Revenue
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Discover why CookieBot.ai is the only AI-powered cookie consent platform that actually pays you. 
              Advanced features, intelligent optimization, and 60% revenue sharing make compliance profitable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/scan">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4">
                  <Scan className="mr-2 h-5 w-5" />
                  Test Your Website Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  <Eye className="mr-2 h-5 w-5" />
                  View Live Demo
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600 mb-1">AI-Powered</div>
                <div className="text-gray-600 text-sm">Intelligent Optimization</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600 mb-1">60%</div>
                <div className="text-gray-600 text-sm">Revenue Share</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600 mb-1">∞</div>
                <div className="text-gray-600 text-sm">Customization</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-600 mb-1">99.9%</div>
                <div className="text-gray-600 text-sm">Uptime SLA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Core Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              CookieBot.ai combines cutting-edge AI technology with revenue generation to create 
              the most advanced cookie consent platform available.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg h-full">
                <CardHeader>
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-4">
                    <div className="text-blue-600">
                      {feature.icon}
                    </div>
                  </div>
                  <Badge variant="outline" className="w-fit mb-2">{feature.category}</Badge>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Frontend vs Backend Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Complete Platform</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frontend Freedom, Backend Power
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start free with powerful frontend features, then unlock professional backend capabilities 
              to maximize revenue and streamline management.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Frontend Features */}
            <div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Frontend Features</h3>
                <p className="text-gray-600">Available in free tier - perfect for getting started</p>
              </div>
              
              <div className="space-y-6">
                {frontendFeatures.map((feature, index) => (
                  <Card key={index} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <div className="text-green-600">
                            {feature.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                          <p className="text-gray-600 mb-3">{feature.description}</p>
                          <div className="grid grid-cols-2 gap-2">
                            {feature.features.map((item, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                <span className="text-xs text-gray-600">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Backend Features */}
            <div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Backend Features</h3>
                <p className="text-gray-600">Professional tier - unlock revenue and advanced management</p>
              </div>
              
              <div className="space-y-6">
                {backendFeatures.map((feature, index) => (
                  <Card key={index} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <div className="text-blue-600">
                            {feature.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                          <p className="text-gray-600 mb-3">{feature.description}</p>
                          <div className="grid grid-cols-2 gap-2">
                            {feature.features.map((item, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <CheckCircle className="h-3 w-3 text-blue-500" />
                                <span className="text-xs text-gray-600">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Compliance Scanner CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="text-center text-white max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              🔍 Free Compliance Scanner
            </Badge>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Test Your Website's Compliance
            </h2>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Get a comprehensive compliance report for your website. Our AI scanner checks GDPR, CCPA, 
              and LGPD requirements and provides actionable recommendations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Search className="h-8 w-8 mx-auto mb-3 opacity-80" />
                <h3 className="font-semibold mb-2">Deep Analysis</h3>
                <p className="text-sm opacity-80">Comprehensive website scan</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto mb-3 opacity-80" />
                <h3 className="font-semibold mb-2">Compliance Check</h3>
                <p className="text-sm opacity-80">GDPR, CCPA, LGPD coverage</p>
              </div>
              <div className="text-center">
                <Star className="h-8 w-8 mx-auto mb-3 opacity-80" />
                <h3 className="font-semibold mb-2">Actionable Report</h3>
                <p className="text-sm opacity-80">Detailed recommendations</p>
              </div>
            </div>

            <Link to="/scan">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Scan className="mr-2 h-5 w-5" />
                Start Free Compliance Scan
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Competitive Advantage</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why CookieBot.ai Outperforms Traditional Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our AI-powered platform compares to traditional cookie consent solutions
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <h3 className="font-bold text-lg mb-4 text-gray-500">Traditional Solutions</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li>❌ Static consent banners</li>
                      <li>❌ No revenue generation</li>
                      <li>❌ Limited customization</li>
                      <li>❌ Manual compliance updates</li>
                      <li>❌ Basic analytics</li>
                      <li>❌ No AI optimization</li>
                    </ul>
                  </div>
                  
                  <div className="text-center border-l border-r border-gray-200 px-8">
                    <h3 className="font-bold text-lg mb-4 text-blue-600">CookieBot.ai</h3>
                    <ul className="space-y-3 text-sm text-gray-900">
                      <li>✅ AI-powered optimization</li>
                      <li>✅ 60% revenue sharing</li>
                      <li>✅ Unlimited customization</li>
                      <li>✅ Automatic compliance</li>
                      <li>✅ Professional analytics</li>
                      <li>✅ Machine learning insights</li>
                    </ul>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-bold text-lg mb-4 text-gray-500">Enterprise Solutions</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li>⚠️ Expensive licensing</li>
                      <li>⚠️ Complex implementation</li>
                      <li>⚠️ No revenue features</li>
                      <li>⚠️ Vendor lock-in</li>
                      <li>⚠️ Slow support</li>
                      <li>⚠️ Limited flexibility</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Cookie Consent?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of websites already earning revenue with CookieBot.ai. 
              Start your free trial and experience the power of AI-driven consent management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/scan">
                <Button size="lg" variant="outline">
                  <Scan className="mr-2 h-5 w-5" />
                  Scan My Website
                </Button>
              </Link>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            14-day free trial • No credit card required • Setup in 5 minutes
          </p>
        </div>
      </section>
    </div>
  )
}

export default Features

