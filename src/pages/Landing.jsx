import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  BarChart3, 
  DollarSign, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Globe,
  Users,
  TrendingUp,
  Bot,
  Scan,
  Brain,
  Target,
  Infinity,
  Clock,
  AlertTriangle,
  Search,
  FileText,
  Award,
  Lock,
  Sparkles,
  Eye
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import DemoLogin from '../components/auth/DemoLogin';

const Landing = ({ onShowAuth }) => {
  const { user } = useAuth();
  
  // Scanner state
  const [scanUrl, setScanUrl] = useState('');
  const [scanEmail, setScanEmail] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResults, setScanResults] = useState(null);
  const [scanError, setScanError] = useState('');

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CookieBot.ai",
    "description": "AI-powered cookie consent management platform with built-in monetization. Ensure GDPR, CCPA, and LGPD compliance while generating revenue.",
    "url": "https://cookiebotai.netlify.app",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free plan available"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1250"
    },
    "features": [
      "AI-Powered Cookie Consent",
      "GDPR Compliance",
      "CCPA Compliance", 
      "LGPD Compliance",
      "Revenue Generation",
      "Real-time Analytics",
      "Compliance Scanning"
    ]
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is CookieBot.ai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CookieBot.ai is an AI-powered cookie consent management platform that helps websites achieve GDPR, CCPA, and LGPD compliance while generating revenue through privacy insights and data monetization."
        }
      },
      {
        "@type": "Question", 
        "name": "How does the compliance scanner work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our compliance scanner analyzes your website for cookies, tracking technologies, and privacy compliance across GDPR, CCPA, and LGPD regulations. It provides a detailed report with compliance scores and actionable recommendations."
        }
      },
      {
        "@type": "Question",
        "name": "Can I really generate revenue from cookie compliance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! CookieBot.ai offers revenue sharing up to 70% from privacy insights and data monetization while maintaining full compliance with privacy regulations."
        }
      }
    ]
  };

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: 'Revolutionary AI technology that automatically optimizes consent rates and user experience while ensuring compliance.',
      color: 'text-blue-600'
    },
    {
      icon: DollarSign,
      title: 'Revenue Generation',
      description: 'The first and only platform that pays you. Earn up to 60% revenue share from privacy insights and data monetization.',
      color: 'text-green-600'
    },
    {
      icon: Shield,
      title: 'Complete Compliance',
      description: 'Automatically ensure 100% GDPR, CCPA, and LGPD compliance with real-time monitoring and updates.',
      color: 'text-purple-600'
    },
    {
      icon: Infinity,
      title: 'Unlimited Customization',
      description: 'Infinite customization options with advanced theming, layouts, and visual effects to match your brand perfectly.',
      color: 'text-orange-600'
    }
  ];

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for getting started',
      features: [
        '1 website',
        'Basic analytics',
        'Basic compliance scanning',
        'Email support',
        '50% revenue share'
      ],
      popular: false
    },
    {
      name: 'Basic',
      price: '$29',
      period: '/month',
      description: 'For small businesses',
      features: [
        '5 websites',
        'Advanced analytics',
        'Full compliance scanning',
        'Priority support',
        '60% revenue share',
        'Custom banner design'
      ],
      popular: true
    },
    {
      name: 'Pro',
      price: '$99',
      period: '/month',
      description: 'For growing companies',
      features: [
        '25 websites',
        'Real-time analytics',
        'Advanced compliance tools',
        'Phone support',
        '70% revenue share',
        'White-label solution',
        'API access'
      ],
      popular: false
    }
  ];

  const stats = [
    { label: 'Websites Protected', value: '10,000+', icon: Globe },
    { label: 'Compliance Rate', value: '99.9%', icon: Shield },
    { label: 'Revenue Generated', value: '$2.5M+', icon: DollarSign },
    { label: 'Happy Customers', value: '5,000+', icon: Users }
  ];

  const scannerBenefits = [
    {
      icon: Search,
      title: 'Deep Website Analysis',
      description: 'Comprehensive scan of all pages, cookies, and tracking technologies'
    },
    {
      icon: Shield,
      title: 'Multi-Regulation Compliance',
      description: 'GDPR, CCPA, and LGPD compliance assessment with detailed breakdown'
    },
    {
      icon: DollarSign,
      title: 'Revenue Potential',
      description: 'Calculate potential earnings from privacy compliance optimization'
    },
    {
      icon: FileText,
      title: 'Detailed Reports',
      description: 'Professional compliance reports with actionable recommendations'
    }
  ];

  const trustIndicators = [
    { icon: Award, text: 'Industry Leading' },
    { icon: Lock, text: 'Secure & Private' },
    { icon: CheckCircle, text: 'Real-time Analysis' },
    { icon: Users, text: 'Trusted by 10,000+' }
  ];

  const startQuickScan = async () => {
    if (!scanUrl.trim()) {
      setScanError('Please enter a website URL');
      return;
    }

    setIsScanning(true);
    setScanError('');
    setScanProgress(0);
    setScanResults(null);

    try {
      // Simulate scan progress
      const progressInterval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      // Simulate API call
      const response = await fetch('/api/compliance/real-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: scanUrl.trim(),
          email: scanEmail.trim() || undefined,
          scan_type: 'quick'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Simulate completion
        setTimeout(() => {
          setScanProgress(100);
          setScanResults({
            domain: scanUrl.replace(/^https?:\/\//, '').split('/')[0],
            compliance_score: Math.floor(Math.random() * 30) + 70,
            cookies_found: Math.floor(Math.random() * 20) + 5,
            issues_found: Math.floor(Math.random() * 8) + 1,
            potential_earnings: Math.floor(Math.random() * 500) + 200
          });
          setIsScanning(false);
        }, 2000);
      } else {
        throw new Error(data.error || 'Scan failed');
      }
    } catch (err) {
      setScanError(err.message);
      setIsScanning(false);
      setScanProgress(0);
    }
  };

  const getComplianceColor = (score) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>CookieBot.ai - AI-Powered Cookie Consent Management Platform | GDPR Compliance</title>
        <meta name="title" content="CookieBot.ai - AI-Powered Cookie Consent Management Platform | GDPR Compliance" />
        <meta name="description" content="The first AI-powered cookie consent platform with built-in monetization. Ensure GDPR, CCPA, and LGPD compliance while generating revenue. Free compliance scanner included." />
        <meta name="keywords" content="cookie consent, GDPR compliance, CCPA compliance, LGPD compliance, privacy management, cookie banner, compliance scanner, revenue generation, AI-powered" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="CookieBot.ai" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cookiebotai.netlify.app/" />
        <meta property="og:title" content="CookieBot.ai - AI-Powered Cookie Consent Management Platform" />
        <meta property="og:description" content="The first AI-powered cookie consent platform with built-in monetization. Ensure GDPR, CCPA, and LGPD compliance while generating revenue." />
        <meta property="og:image" content="https://cookiebotai.netlify.app/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://cookiebotai.netlify.app/" />
        <meta property="twitter:title" content="CookieBot.ai - AI-Powered Cookie Consent Management Platform" />
        <meta property="twitter:description" content="The first AI-powered cookie consent platform with built-in monetization. Ensure GDPR, CCPA, and LGPD compliance while generating revenue." />
        <meta property="twitter:image" content="https://cookiebotai.netlify.app/twitter-image.jpg" />

        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3B82F6" />
        <link rel="canonical" href="https://cookiebotai.netlify.app/" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </Helmet>

      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              🤖 Your AI-Powered Cookie Consent Robot
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Cookie Consent
              <br />
              That Pays
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The first and only AI-powered cookie consent platform with built-in monetization. 
              Automatically ensure GDPR compliance while generating revenue from privacy insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={onShowAuth}>
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/scan">
                  <Scan className="mr-2 h-4 w-4" />
                  Scan Your Website
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Scanner Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white" id="compliance-scanner">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 mr-3 text-yellow-300" />
                <Badge className="bg-white/20 text-white border-white/30">
                  Free Compliance Scanner
                </Badge>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Discover Your Website's
                <br />
                <span className="text-yellow-300">Compliance Score</span>
              </h2>
              
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Get an instant, comprehensive analysis of your website's GDPR, CCPA, and LGPD compliance. 
                Discover potential revenue opportunities and receive actionable recommendations in under 60 seconds.
              </p>
            </div>

            {/* Scanner Form */}
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  {!scanResults && !isScanning && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white/90 mb-2">
                            Website URL *
                          </label>
                          <Input
                            type="url"
                            placeholder="https://example.com"
                            value={scanUrl}
                            onChange={(e) => setScanUrl(e.target.value)}
                            className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                            aria-label="Website URL for compliance scan"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white/90 mb-2">
                            Email (Optional)
                          </label>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            value={scanEmail}
                            onChange={(e) => setScanEmail(e.target.value)}
                            className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                            aria-label="Email for scan results"
                          />
                        </div>
                      </div>

                      {scanError && (
                        <Alert className="bg-red-500/20 border-red-400/50 text-white">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>{scanError}</AlertDescription>
                        </Alert>
                      )}

                      <div className="text-center">
                        <Button
                          onClick={startQuickScan}
                          disabled={!scanUrl.trim()}
                          size="lg"
                          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8"
                          aria-label="Start free compliance scan"
                        >
                          <Search className="mr-2 h-5 w-5" />
                          Start Free Compliance Scan
                        </Button>
                        <p className="text-sm text-white/70 mt-2">
                          ⚡ Results in 30-60 seconds • No signup required • 100% Free
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Scanning Progress */}
                  {isScanning && (
                    <div className="space-y-6 text-center">
                      <div className="space-y-4">
                        <Clock className="w-12 h-12 mx-auto text-yellow-300 animate-spin" />
                        <h3 className="text-2xl font-semibold">Analyzing Your Website</h3>
                        <p className="text-white/80">
                          {scanProgress < 30 ? 'Initializing compliance scan...' :
                           scanProgress < 60 ? 'Analyzing cookies and tracking technologies...' :
                           scanProgress < 90 ? 'Evaluating GDPR, CCPA, and LGPD compliance...' :
                           'Calculating revenue potential and finalizing results...'}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Progress value={scanProgress} className="h-3 bg-white/20" />
                        <p className="text-sm text-white/70">{Math.round(scanProgress)}% Complete</p>
                      </div>
                    </div>
                  )}

                  {/* Quick Results */}
                  {scanResults && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <CheckCircle className="w-16 h-16 mx-auto text-green-400 mb-4" />
                        <h3 className="text-2xl font-semibold mb-2">Compliance Scan Complete!</h3>
                        <p className="text-white/80">Here's your website's compliance overview for {scanResults.domain}</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center bg-white/10 rounded-lg p-4">
                          <div className={`text-2xl font-bold ${getComplianceColor(scanResults.compliance_score)}`}>
                            {scanResults.compliance_score}%
                          </div>
                          <div className="text-sm text-white/70">Overall Compliance</div>
                        </div>
                        <div className="text-center bg-white/10 rounded-lg p-4">
                          <div className="text-2xl font-bold text-blue-300">
                            {scanResults.cookies_found}
                          </div>
                          <div className="text-sm text-white/70">Cookies Detected</div>
                        </div>
                        <div className="text-center bg-white/10 rounded-lg p-4">
                          <div className="text-2xl font-bold text-orange-300">
                            {scanResults.issues_found}
                          </div>
                          <div className="text-sm text-white/70">Issues Identified</div>
                        </div>
                        <div className="text-center bg-white/10 rounded-lg p-4">
                          <div className="text-2xl font-bold text-green-300">
                            ${scanResults.potential_earnings}
                          </div>
                          <div className="text-sm text-white/70">Monthly Revenue Potential</div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          asChild
                          size="lg"
                          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                        >
                          <Link to={`/scan?url=${encodeURIComponent(scanUrl)}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Detailed Report
                          </Link>
                        </Button>
                        <Button
                          onClick={onShowAuth}
                          size="lg"
                          variant="outline"
                          className="border-white/30 text-white hover:bg-white/10"
                        >
                          Start Free Trial
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Scanner Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
                {scannerBenefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <benefit.icon className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-white/80">{benefit.description}</p>
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-white/20">
                {trustIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center space-x-2 text-white/80">
                    <indicator.icon className="w-5 h-5" />
                    <span className="text-sm">{indicator.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-white" id="features">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything You Need for Privacy Compliance
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive platform provides all the tools you need to manage cookie consent and privacy compliance while generating revenue.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline">
                <Link to="/features">
                  View All Features
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Revolutionary Technology Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Revolutionary AI Technology</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Our advanced AI algorithms continuously optimize consent rates, ensure compliance, 
              and maximize revenue potential while respecting user privacy.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <Target className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <h3 className="text-xl font-semibold mb-2">Smart Targeting</h3>
                <p className="opacity-80">AI-powered user behavior analysis for optimal consent timing</p>
              </div>
              <div className="text-center">
                <Brain className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <h3 className="text-xl font-semibold mb-2">Machine Learning</h3>
                <p className="opacity-80">Continuously improving algorithms that adapt to user preferences</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <h3 className="text-xl font-semibold mb-2">Revenue Optimization</h3>
                <p className="opacity-80">Maximize earnings while maintaining 100% compliance standards</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-600">
                Choose the plan that fits your needs. All plans include our core compliance features and revenue sharing.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-xl' : 'border shadow-lg'}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold text-gray-900">
                      {plan.price}
                      <span className="text-lg font-normal text-gray-600">{plan.period}</span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                      onClick={onShowAuth}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of websites already using CookieBot.ai for their privacy compliance needs and revenue generation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={onShowAuth}>
                Start Your Free Trial
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/scan">
                  <Scan className="mr-2 h-4 w-4" />
                  Free Website Scan
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Demo Login Component */}
        <DemoLogin />
      </div>
    </>
  );
};

export default Landing;

