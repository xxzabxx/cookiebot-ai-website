import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { 
  Cookie, 
  Menu, 
  X, 
  ArrowRight, 
  Check, 
  Star, 
  Shield, 
  DollarSign, 
  BarChart3, 
  Palette,
  Zap,
  Globe,
  Users,
  TrendingUp,
  Lock,
  FileText,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Play,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Settings,
  Eye,
  Download,
  Code,
  Smartphone,
  Monitor,
  Tablet,
  Layout,
  Brush,
  MousePointer,
  Layers,
  Sliders,
  Target,
  Calendar
} from 'lucide-react'
import Documentation from './components/Documentation.jsx'
import EnhancedDashboard from './components/EnhancedDashboard.jsx'
import ComplianceScanner from './components/ComplianceScanner.jsx'
import './App.css'

// Import assets
import logoImg from './assets/logo.png'
import heroBgImg from './assets/hero-bg.png'
import dashboardPreviewImg from './assets/dashboard-preview.png'
import featuresIcon1 from './assets/features-icon-1.png'
import featuresIcon2 from './assets/features-icon-2.png'
import featuresIcon3 from './assets/features-icon-3.png'
import featuresIcon4 from './assets/features-icon-4.png'

// SEO Component for different pages
const SEOHead = ({ 
  title = "CookieBot.ai - Advanced Cookie Consent Management with Revenue Generation",
  description = "The only GDPR-compliant cookie consent platform with built-in monetization. Advanced customization, affiliate revenue system, and professional dashboard. Get 60% revenue share.",
  keywords = "cookie consent, GDPR compliance, cookie banner, privacy compliance, affiliate revenue, cookie management, CCPA, data privacy, consent management platform",
  canonical = "https://cookiebot.ai",
  ogImage = "https://cookiebot.ai/og-image.png"
}) => (
  <Helmet>
    {/* Primary Meta Tags */}
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="robots" content="index, follow" />
    <meta name="language" content="English" />
    <meta name="author" content="CookieBot.ai" />
    
    {/* Canonical URL */}
    <link rel="canonical" href={canonical} />
    
    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonical} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:site_name" content="CookieBot.ai" />
    
    {/* Twitter */}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={canonical} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={ogImage} />
    
    {/* Additional SEO */}
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#667eea" />
    
    {/* Structured Data */}
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "CookieBot.ai",
        "description": description,
        "url": "https://cookiebot.ai",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "127"
        },
        "publisher": {
          "@type": "Organization",
          "name": "CookieBot.ai",
          "url": "https://cookiebot.ai"
        }
      })}
    </script>
  </Helmet>
)

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logoImg} alt="CookieBot.ai Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-gray-900">CookieBot.ai</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
            <a href="/#customization" className="text-gray-700 hover:text-blue-600 transition-colors">Customization</a>
            <a href="/#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
            <Link to="/scan" className="text-gray-700 hover:text-blue-600 transition-colors">Scan</Link>
            <Link to="/docs" className="text-gray-700 hover:text-blue-600 transition-colors">Documentation</Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">Dashboard</Link>
            <a href="/#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            <Button variant="outline" size="sm">Sign In</Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Get Started Free
            </Button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/#features" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Features</a>
              <a href="/#customization" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Customization</a>
              <a href="/#pricing" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Pricing</a>
              <Link to="/scan" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Scan</Link>
              <Link to="/docs" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Documentation</Link>
              <Link to="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Dashboard</Link>
              <a href="/#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Contact</a>
              <div className="px-3 py-2 space-y-2">
                <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">Get Started Free</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Hero Section
const HeroSection = ({ onWatchDemo }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBgImg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-purple-900/80" />
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-white/20 text-white border-white/30">
            🚀 Enhanced v2.0 - Advanced Customization + Revenue System
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Cookie Consent
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}That Pays
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
            The only cookie consent platform with built-in monetization and advanced customization. 
            GDPR compliant, fully customizable themes, and revenue-generating affiliate system.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4"
              onClick={onWatchDemo}
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">60%</div>
              <div className="text-gray-300">Revenue Share</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-gray-300">GDPR Compliant</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">∞</div>
              <div className="text-gray-300">Customization Options</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Enhanced Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: featuresIcon1,
      title: "Advanced Layout Control",
      description: "Complete control over banner appearance with Dialog and Bar layouts, positioning options, visual effects, and responsive design.",
      highlights: ["Dialog & Bar Layouts", "Position Control", "Overlay Effects", "Slide-in Animations"]
    },
    {
      icon: featuresIcon2,
      title: "Professional Theme System",
      description: "Light, Dark, and Custom themes with complete color control, button style variations, and company branding integration.",
      highlights: ["3 Theme Options", "Custom Colors", "Button Styles", "Logo Integration"]
    },
    {
      icon: featuresIcon3,
      title: "Affiliate Revenue System",
      description: "Unique monetization through contextual advertisements. Earn 60% revenue share from every consent interaction with real-time tracking.",
      highlights: ["60% Revenue Share", "Contextual Ads", "Real-time Tracking", "Monthly Payouts"]
    },
    {
      icon: featuresIcon4,
      title: "Multi-Compliance Support",
      description: "Built-in support for GDPR, CCPA, and LGPD with automatic jurisdiction detection, granular consent controls, and legal record keeping.",
      highlights: ["GDPR + CCPA + LGPD", "Auto-detection", "Granular Controls", "Legal Records"]
    }
  ]

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4">Enhanced Features v2.0</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Succeed
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CookieBot.ai Enhanced v2.0 goes beyond traditional consent management with innovative features 
            that help you comply, customize, and monetize like never before.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img src={feature.icon} alt={`${feature.title} icon`} className="w-10 h-10" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {feature.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Explore All Features
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

// New Advanced Customization Section
const CustomizationSection = () => {
  const customizationFeatures = [
    {
      icon: <Layout className="h-8 w-8" />,
      title: "Layout Options",
      description: "Choose between Dialog (floating window) or Bar (full-width) layouts with flexible positioning.",
      options: ["Dialog Layout", "Bar Layout", "Top/Bottom/Center Position", "Overlay Backgrounds"]
    },
    {
      icon: <Brush className="h-8 w-8" />,
      title: "Theme System",
      description: "Professional themes with complete color control and custom branding integration.",
      options: ["Light Theme", "Dark Theme", "Custom Theme", "Color Pickers"]
    },
    {
      icon: <MousePointer className="h-8 w-8" />,
      title: "Button Styles",
      description: "Multiple button style variations to match your brand and user experience preferences.",
      options: ["Default (CTA)", "Solid (Equal)", "Outline (Minimal)", "Custom Colors"]
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: "Banner Types",
      description: "Five different banner types for various compliance needs and user experiences.",
      options: ["Multilevel", "Accept-only", "Accept/Decline", "Inline Multilevel", "CCPA"]
    },
    {
      icon: <Sliders className="h-8 w-8" />,
      title: "Visual Effects",
      description: "Enhanced visual effects and animations for better user engagement.",
      options: ["Slide-in Animations", "Close Icons", "Responsive Design", "Mobile Optimized"]
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Compliance Options",
      description: "Granular compliance controls with automatic jurisdiction detection.",
      options: ["GDPR", "CCPA", "LGPD", "Auto-detection"]
    }
  ]

  return (
    <section id="customization" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4">Advanced Customization</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Unmatched
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Customization
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CookieBot.ai Enhanced offers the most comprehensive customization options in the industry. 
            Match your brand perfectly with our advanced theming and layout system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {customizationFeatures.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg h-full">
              <CardHeader>
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-4">
                  <div className="text-blue-600">
                    {feature.icon}
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {feature.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{option}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Live Preview Dashboard</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            See your customizations in real-time with our live preview system. Test different themes, 
            layouts, and configurations instantly before deploying to your website.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Try Live Preview
            <Eye className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

// Enhanced Dashboard Section
const DashboardSection = () => {
  const dashboardFeatures = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Real-time Analytics",
      description: "Monitor consent rates, visitor tracking, and performance metrics in real-time."
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Revenue Tracking",
      description: "Track affiliate revenue, performance metrics, and automated payout processing."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Configuration Management",
      description: "Manage all customization options through an intuitive 6-tab interface."
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Integration Tools",
      description: "Generate integration code, copy scripts, and manage multiple websites."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Compliance Monitoring",
      description: "Monitor compliance status, consent records, and legal requirement adherence."
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Live Preview",
      description: "Preview banner changes in real-time with responsive design testing."
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4">Enhanced Dashboard v2.0</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Analytics
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Dashboard
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Monitor your consent performance, track revenue, and optimize your setup 
              with our comprehensive 6-tab analytics dashboard featuring live preview and advanced customization controls.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {dashboardFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <div className="text-green-600">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Try Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                View Demo
                <Play className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl transform rotate-3"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              <img 
                src={dashboardPreviewImg} 
                alt="CookieBot.ai Enhanced Dashboard v2.0 with 6-tab interface" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



// Enhanced Pricing Section
const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for small websites and testing",
      features: [
        "Up to 1,000 page views/month",
        "Basic consent management",
        "Standard customization",
        "Light & Dark themes",
        "Email support",
        "Basic analytics"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Professional",
      price: "$29",
      period: "per month",
      description: "Ideal for growing businesses",
      features: [
        "Up to 50,000 page views/month",
        "Advanced customization",
        "All theme options + custom colors",
        "Affiliate revenue system (60% share)",
        "Live preview dashboard",
        "Priority support",
        "Advanced analytics",
        "Multiple websites",
        "Custom branding & logo"
      ],
      cta: "Start 14-Day Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations",
      features: [
        "Unlimited page views",
        "White-label solution",
        "Custom theme development",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom integrations",
        "SLA guarantee",
        "Advanced reporting",
        "Multi-jurisdiction compliance"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4">Pricing</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, Transparent
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and scale as you grow. All plans include our enhanced customization features 
            and GDPR compliance. Professional plans include revenue sharing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-xl scale-105' : 'border shadow-lg'} transition-all duration-300 hover:shadow-xl`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-gray-600 ml-2">/{plan.period}</span>}
                </div>
                <CardDescription className="text-base">{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full mt-8 ${plan.popular 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                    : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            All plans include 14-day free trial • No setup fees • Cancel anytime
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      content: "CookieBot.ai Enhanced has transformed our compliance strategy. The revenue sharing feature actually makes our cookie consent profitable!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Web Developer",
      company: "Digital Agency",
      content: "The customization options are incredible. We can match any client's brand perfectly with the advanced theming system.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Compliance Officer",
      company: "E-commerce Plus",
      content: "Finally, a solution that handles GDPR, CCPA, and LGPD automatically. The dashboard makes compliance monitoring effortless.",
      rating: 5
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4">Testimonials</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Loved by
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Thousands
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of businesses who trust CookieBot.ai Enhanced for their 
            cookie consent management and revenue generation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Join thousands of websites already earning revenue with CookieBot.ai Enhanced. 
            Start your free trial today and see the difference advanced customization makes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4"
            >
              Schedule Demo
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-300" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-300" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-300" />
              <span>Setup in 5 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4">Contact</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get in
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Touch
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about CookieBot.ai Enhanced? Our team is here to help you 
            get started with advanced cookie consent management and revenue generation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-gray-600">support@cookiebot.ai</p>
                  <p className="text-gray-600">sales@cookiebot.ai</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600">Mon-Fri 9AM-6PM EST</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Office</h4>
                  <p className="text-gray-600">123 Tech Street</p>
                  <p className="text-gray-600">San Francisco, CA 94105</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors">
                  <Twitter className="h-5 w-5 text-gray-600" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors">
                  <Linkedin className="h-5 w-5 text-gray-600" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors">
                  <Github className="h-5 w-5 text-gray-600" />
                </a>
              </div>
            </div>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                We'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="Your company"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us about your project..."
                    rows={4}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Send Message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={logoImg} alt="CookieBot.ai Logo" className="h-8 w-8" />
              <span className="text-xl font-bold">CookieBot.ai</span>
            </div>
            <p className="text-gray-400 mb-4">
              The most advanced cookie consent platform with built-in revenue generation 
              and comprehensive customization options.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="/#customization" className="hover:text-white transition-colors">Customization</a></li>
              <li><a href="/#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/scan" className="hover:text-white transition-colors">Compliance Scanner</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 CookieBot.ai Enhanced. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
const App = () => {
  const [showDemo, setShowDemo] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <SEOHead />
        <Navigation />
        
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection onWatchDemo={() => setShowDemo(true)} />
              <FeaturesSection />
              <CustomizationSection />
              <DashboardSection />
              <PricingSection />
              <TestimonialsSection />
              <CTASection />
              <ContactSection />
            </>
          } />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/dashboard" element={<EnhancedDashboard />} />
          <Route path="/scan" element={<ComplianceScanner />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App

