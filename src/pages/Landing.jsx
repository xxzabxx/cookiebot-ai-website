import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Infinity
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import DemoLogin from '../components/auth/DemoLogin';

const Landing = ({ onShowAuth }) => {
  const { user } = useAuth();

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

  return (
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

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
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
              Choose the plan that fits your needs. All plans include our core compliance features.
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
            Join thousands of websites already using CookieBot.ai for their privacy compliance needs.
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
  );
};

export default Landing;
