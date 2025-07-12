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
      description: "Automatically complies with GDPR, CCPA, LGPD, and emerging privacy laws with intelligent geo-detection and adaptive consent flows.",
      features: ["GDPR compliance", "CCPA support", "LGPD coverage", "Auto geo-detection"],
      category: "Legal Compliance"
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Advanced Customization Engine",
      description: "Industry-leading customization with unlimited themes, layouts, and branding options. Match any brand perfectly with our visual editor.",
      features: ["Unlimited themes", "Custom CSS support", "Brand matching", "Live preview editor"],
      category: "Customization"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Professional Analytics Dashboard",
      description: "Comprehensive 6-tab dashboard with real-time analytics, revenue tracking, compliance monitoring, and performance optimization tools.",
      features: ["Real-time analytics", "Revenue tracking", "Compliance reports", "Performance insights"],
      category: "Analytics"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning-Fast Performance",
      description: "Optimized for speed with <50KB bundle size, lazy loading, CDN delivery, and minimal impact on your website's performance.",
      features: ["<50KB bundle size", "CDN delivery", "Lazy loading", "99.9% uptime"],
      category: "Performance"
    }
  ]

  const frontendFeatures = [
    {
      icon: <Layers className="h-8 w-8" />,
      title: "Layout & Positioning",
      description: "Complete control over banner appearance and positioning",
      items: ["Dialog & Bar layouts", "Top/Bottom/Center positioning", "Overlay effects", "Slide-in animations", "Responsive design"]
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Theme System",
      description: "Professional themes with unlimited customization",
      items: ["Light, Dark, Custom themes", "Unlimited color options", "Custom fonts & typography", "Logo integration", "CSS override support"]
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Button Styles",
      description: "Multiple button variations for optimal user experience",
      items: ["Default (CTA) style", "Solid (Equal) buttons", "Outline (Minimal) design", "Custom color schemes", "Hover effects"]
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Banner Types",
      description: "Five different banner types for various compliance needs",
      items: ["Multilevel consent", "Accept-only banners", "Accept/Decline options", "Inline multilevel", "CCPA-specific banners"]
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Optimization",
      description: "Perfect mobile experience with touch-friendly design",
      items: ["Touch-optimized buttons", "Mobile-responsive layouts", "Swipe gestures", "Adaptive text sizing", "iOS/Android compatibility"]
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Developer Tools",
      description: "Advanced tools for developers and agencies",
      items: ["JavaScript API", "Event callbacks", "Custom integrations", "Webhook support", "White-label options"]
    }
  ]

  const backendFeatures = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Real-Time Analytics",
      description: "Comprehensive analytics and reporting dashboard",
      items: ["Consent rate tracking", "Visitor analytics", "Geographic insights", "Device & browser stats", "Conversion funnels"]
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Revenue Management",
      description: "Complete revenue tracking and payout system",
      items: ["60% revenue share", "Real-time earnings", "Monthly payouts", "Performance metrics", "Tax reporting"]
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Configuration Management",
      description: "Centralized control for all your websites",
      items: ["Multi-website management", "Bulk configuration", "Template system", "Version control", "Rollback capabilities"]
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Compliance Monitoring",
      description: "Automated compliance tracking and reporting",
      items: ["GDPR compliance reports", "Consent record keeping", "Legal documentation", "Audit trails", "Violation alerts"]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration",
      description: "Multi-user access with role-based permissions",
      items: ["Team member invites", "Role-based access", "Activity logging", "Approval workflows", "Client management"]
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Enterprise Features",
      description: "Advanced features for large organizations",
      items: ["White-label solutions", "Custom integrations", "Dedicated support", "SLA guarantees", "Priority processing"]
    }
  ]

  const aiDifferentiators = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Intelligent Consent Optimization",
      description: "AI analyzes user behavior patterns to optimize consent rates and user experience automatically."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Predictive Compliance",
      description: "Machine learning predicts regulatory changes and automatically updates compliance requirements."
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Smart Content Generation",
      description: "AI generates personalized privacy insights content based on user demographics and interests."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Automated A/B Testing",
      description: "Continuous optimization through AI-powered testing of layouts, colors, and messaging."
    }
  ]

  return (
    <div className="min-h-screen bg-white pt-20">
      <Helmet>
        <title>Features - CookieBot.ai | AI-Powered Cookie Consent Management Platform</title>
        <meta name="description" content="Discover CookieBot.ai's comprehensive features: AI-powered consent optimization, revenue generation, GDPR compliance, advanced customization, and professional analytics dashboard." />
        <meta name="keywords" content="cookie consent features, AI-powered consent, GDPR compliance, revenue generation, privacy insights, consent management, cookie banner customization, analytics dashboard" />
        <link rel="canonical" href="https://cookiebot.ai/features" />
        <meta property="og:title" content="Features - CookieBot.ai | AI-Powered Cookie Consent Platform" />
        <meta property="og:description" content="The only cookie consent platform with AI optimization and built-in revenue generation. Explore our comprehensive feature set." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cookiebot.ai/features" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            🤖 Your AI-Powered Cookie Consent Robot
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Features That
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Generate Revenue
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            The only AI-powered cookie consent platform that turns compliance into profit. 
            Unlike traditional solutions, CookieBot.ai combines intelligent optimization, 
            revenue generation, and enterprise-grade customization in one powerful platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/scan">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Scan className="mr-2 h-5 w-5" />
                Scan Your Website Now
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              <Eye className="mr-2 h-5 w-5" />
              View Live Demo
            </Button>
          </div>
          
          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">60%</div>
              <div className="text-gray-600">Revenue Share</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">&lt;50KB</div>
              <div className="text-gray-600">Bundle Size</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">∞</div>
              <div className="text-gray-600">Customization</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Differentiators */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">🤖 AI-Powered Technology</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our AI-Powered Consent Robot?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlike static cookie consent solutions, CookieBot.ai uses artificial intelligence 
              to continuously optimize performance, maximize revenue, and ensure compliance automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {aiDifferentiators.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <div className="text-blue-600">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-600 mb-6">
              Ready to see how our AI can optimize your cookie consent?
            </p>
            <Link to="/scan">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Search className="mr-2 h-5 w-5" />
                Free Website Compliance Scan
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Core Platform</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              CookieBot.ai Enhanced v2.0 goes beyond traditional consent management with 
              innovative features that help you comply, customize, and monetize like never before.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <div className="text-blue-600">
                        {feature.icon}
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Frontend Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Frontend Experience</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Unmatched Customization & User Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create the perfect cookie consent experience with our industry-leading 
              customization options and user-friendly design tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {frontendFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-green-600">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.items.map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Backend Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Backend Platform</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Professional Dashboard & Management Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful backend features that make CookieBot.ai the choice for professionals, 
              agencies, and enterprises who need advanced control and insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {backendFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-purple-600">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.items.map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-6">
              Unlock the full potential of your cookie consent with our professional dashboard
            </p>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <BarChart3 className="mr-2 h-5 w-5" />
              Try Dashboard Free
            </Button>
          </div>
        </div>
      </section>

      {/* Compliance Scanner CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Scan className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Not Sure If Your Website Is Compliant?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get a free, comprehensive compliance scan of your website. Our AI-powered scanner 
              checks for GDPR, CCPA, and LGPD compliance issues and provides actionable recommendations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Clock className="h-8 w-8 mx-auto mb-3 opacity-80" />
                <h3 className="font-semibold mb-2">30-Second Scan</h3>
                <p className="text-sm opacity-80">Quick and comprehensive analysis</p>
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
                    <ul className="space-y-3 text-sm text-gray-800">
                      <li>✅ AI-powered optimization</li>
                      <li>✅ 60% revenue sharing</li>
                      <li>✅ Unlimited customization</li>
                      <li>✅ Automatic compliance</li>
                      <li>✅ Advanced analytics</li>
                      <li>✅ Continuous learning</li>
                    </ul>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-bold text-lg mb-4 text-gray-500">Other "Premium" Tools</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li>⚠️ Expensive monthly fees</li>
                      <li>⚠️ Complex setup process</li>
                      <li>⚠️ Limited integrations</li>
                      <li>⚠️ No monetization</li>
                      <li>⚠️ Slow support</li>
                      <li>⚠️ Vendor lock-in</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Cookie Consent?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of websites already earning revenue with CookieBot.ai. 
            Start your free trial today and experience the difference AI makes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/scan">
              <Button size="lg" variant="outline">
                <Scan className="mr-2 h-5 w-5" />
                Scan My Website
              </Button>
            </Link>
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

