import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Brain, 
  Target, 
  Users, 
  TrendingUp,
  CheckCircle,
  Star,
  Award,
  Lightbulb,
  Rocket,
  Globe,
  Lock,
  BarChart3,
  Cpu,
  Bot,
  Sparkles
} from 'lucide-react'

const About = () => {
  const stats = [
    { number: "10,000+", label: "Websites Protected", icon: <Shield className="h-6 w-6" /> },
    { number: "99.9%", label: "Uptime Guarantee", icon: <Zap className="h-6 w-6" /> },
    { number: "50+", label: "Countries Served", icon: <Globe className="h-6 w-6" /> },
    { number: "24/7", label: "AI-Powered Support", icon: <Bot className="h-6 w-6" /> }
  ]

  const values = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-First Innovation",
      description: "We leverage artificial intelligence to provide smarter, more efficient cookie consent management that adapts to user behavior and regulatory changes."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Privacy by Design",
      description: "Built from the ground up with privacy at its core, ensuring complete GDPR, CCPA, and LGPD compliance while respecting user choice."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Revenue Generation",
      description: "Unique monetization through Privacy Insights - the only platform that turns compliance into a revenue stream with our 60/40 sharing model."
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Continuous Innovation",
      description: "Constantly evolving with new AI features, compliance updates, and user experience improvements to stay ahead of the curve."
    }
  ]

  const differentiators = [
    {
      title: "AI-Powered Intelligence",
      description: "Unlike traditional solutions, our AI continuously learns and optimizes consent rates while ensuring compliance.",
      icon: <Cpu className="h-6 w-6" />
    },
    {
      title: "Revenue Generation",
      description: "The only platform that generates revenue through Privacy Insights while maintaining user trust and compliance.",
      icon: <BarChart3 className="h-6 w-6" />
    },
    {
      title: "Advanced Customization",
      description: "Unlimited theming options, custom layouts, and brand integration that goes far beyond basic cookie banners.",
      icon: <Sparkles className="h-6 w-6" />
    },
    {
      title: "Independent Platform",
      description: "Built as an independent, AI-first solution - not affiliated with legacy providers like Cookiebot.com.",
      icon: <Rocket className="h-6 w-6" />
    }
  ]

  const timeline = [
    {
      year: "2024",
      title: "AI Revolution Begins",
      description: "CookieBot.ai launches with groundbreaking AI-powered consent management and Privacy Insights monetization."
    },
    {
      year: "2024 Q2",
      title: "Advanced Customization",
      description: "Released comprehensive theming system with unlimited customization options and live preview capabilities."
    },
    {
      year: "2024 Q3",
      title: "Global Expansion",
      description: "Expanded to serve 50+ countries with multi-language support and regional compliance features."
    },
    {
      year: "2024 Q4",
      title: "Enterprise Solutions",
      description: "Launched white-label solutions and enterprise-grade features for large-scale deployments."
    }
  ]

  const team = [
    {
      name: "AI Development Team",
      role: "Artificial Intelligence Engineers",
      description: "Specialists in machine learning, natural language processing, and privacy technology.",
      icon: <Brain className="h-8 w-8" />
    },
    {
      name: "Privacy Experts",
      role: "Legal & Compliance Specialists",
      description: "GDPR, CCPA, and LGPD experts ensuring our platform meets all regulatory requirements.",
      icon: <Shield className="h-8 w-8" />
    },
    {
      name: "UX/UI Designers",
      role: "User Experience Team",
      description: "Creating intuitive, beautiful interfaces that maximize consent rates and user satisfaction.",
      icon: <Target className="h-8 w-8" />
    },
    {
      name: "Customer Success",
      role: "Support & Success Team",
      description: "AI-enhanced support specialists helping customers maximize their revenue and compliance.",
      icon: <Users className="h-8 w-8" />
    }
  ]

  return (
    <>
      <Helmet>
        <title>About CookieBot.ai - AI-Powered Cookie Consent Management Platform</title>
        <meta name="description" content="Learn about CookieBot.ai's AI-powered cookie consent platform. Independent, innovative, and revenue-generating solution for GDPR compliance and privacy management." />
        <meta name="keywords" content="about cookiebot.ai, AI cookie consent, GDPR compliance platform, privacy management, artificial intelligence, independent platform" />
        <link rel="canonical" href="https://cookiebot.ai/about" />
        
        <meta property="og:title" content="About CookieBot.ai - AI-Powered Cookie Consent Innovation" />
        <meta property="og:description" content="Discover how CookieBot.ai revolutionizes cookie consent with AI technology, revenue generation, and advanced customization." />
        <meta property="og:url" content="https://cookiebot.ai/about" />
        
        <meta name="twitter:title" content="About CookieBot.ai - AI-Powered Cookie Consent" />
        <meta name="twitter:description" content="Revolutionary AI-powered cookie consent platform with revenue generation and advanced customization." />
      </Helmet>

      <div className="min-h-screen bg-white pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4">About CookieBot.ai</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Revolutionizing Cookie Consent with
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}Artificial Intelligence
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We're not just another cookie consent platform. CookieBot.ai is an AI-first, 
                independent solution that transforms compliance into opportunity through innovative 
                technology and revenue generation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Your Journey
                </Button>
                <Button size="lg" variant="outline">
                  <Brain className="mr-2 h-5 w-5" />
                  Explore AI Features
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <div className="text-blue-600">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4">Our Mission</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Making Privacy Profitable and
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {" "}AI-Enhanced
                    </span>
                  </h2>
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    Traditional cookie consent platforms treat compliance as a necessary burden. 
                    We see it as an opportunity to educate users, build trust, and generate revenue 
                    through our revolutionary Privacy Insights system.
                  </p>
                  <p className="text-lg text-gray-600 mb-8">
                    Our AI-powered platform doesn't just ensure compliance - it optimizes user 
                    experience, maximizes consent rates, and creates new revenue streams while 
                    maintaining the highest privacy standards.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>AI-optimized consent experiences</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Revenue generation through Privacy Insights</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Complete independence from legacy providers</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                          <div className="text-blue-600">
                            {value.icon}
                          </div>
                        </div>
                        <h3 className="font-bold mb-2">{value.title}</h3>
                        <p className="text-gray-600 text-sm">{value.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Differentiators Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4">What Makes Us Different</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Beyond Traditional Cookie Consent
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're not affiliated with Cookiebot.com or any legacy provider. CookieBot.ai 
                is built from the ground up as an AI-first, revenue-generating platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {differentiators.map((diff, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <div className="text-blue-600">
                          {diff.icon}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{diff.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{diff.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-4">
                    <Award className="h-12 w-12 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Independent & AI-Powered</h3>
                  <p className="text-lg text-gray-700 mb-6">
                    Unlike traditional providers, CookieBot.ai is an independent platform built 
                    specifically for the AI era. We're not constrained by legacy architecture 
                    or outdated approaches to privacy compliance.
                  </p>
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Experience the Difference
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4">Our Journey</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Innovation Timeline</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From AI-powered launch to global expansion, see how we're revolutionizing 
                cookie consent management.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <Card className="flex-1 border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-3">
                          <Badge variant="outline">{item.year}</Badge>
                          <h3 className="text-xl font-bold">{item.title}</h3>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4">Our Team</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                AI Experts & Privacy Specialists
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our diverse team combines artificial intelligence expertise with deep privacy 
                knowledge to create the most advanced cookie consent platform available.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <div className="text-blue-600">
                        {member.icon}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Experience AI-Powered Cookie Consent?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Join thousands of websites already benefiting from our AI-enhanced platform. 
                Start generating revenue while ensuring perfect compliance.
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
                  <Brain className="mr-2 h-5 w-5" />
                  Explore AI Features
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>AI-powered optimization</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Revenue generation included</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Independent platform</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default About

