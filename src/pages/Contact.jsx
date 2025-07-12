import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  CheckCircle,
  AlertCircle,
  Twitter,
  Linkedin,
  Github,
  MessageSquare,
  Headphones,
  Zap,
  Shield
} from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setShowError(false)
    setShowSuccess(false)
    
    try {
      const apiEndpoint = process.env.NODE_ENV === 'production' 
        ? 'https://your-backend.vercel.app/api/contact'  // Replace with your actual Vercel backend URL
        : 'http://localhost:5000/api/contact'
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      const result = await response.json()
      
      if (response.ok && result.success) {
        setShowSuccess(true)
        setFormData({ 
          name: '', 
          email: '', 
          company: '', 
          subject: '', 
          message: '', 
          inquiryType: 'general' 
        })
        
        setTimeout(() => {
          setShowSuccess(false)
        }, 5000)
      } else {
        setErrorMessage(result.error || 'An error occurred while sending your message.')
        setShowError(true)
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setErrorMessage('Unable to send message. Please check your internet connection and try again.')
      setShowError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      description: "Get help with technical questions and account issues",
      contact: "info@cookiebot.ai",
      responseTime: "Within 24 hours"
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: "Sales Inquiries",
      description: "Learn about our AI-powered cookie consent solutions",
      contact: "sales@cookiebot.ai",
      responseTime: "Within 4 hours"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy & Legal",
      description: "Questions about compliance and data protection",
      contact: "legal@cookiebot.ai",
      responseTime: "Within 48 hours"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Technical Support",
      description: "Integration help and troubleshooting",
      contact: "support@cookiebot.ai",
      responseTime: "Within 12 hours"
    }
  ]

  const faqs = [
    {
      question: "How is CookieBot.ai different from Cookiebot.com?",
      answer: "CookieBot.ai is an AI-powered, independent platform that offers advanced customization, revenue generation through Privacy Insights, and cutting-edge artificial intelligence features. We're not affiliated with Cookiebot.com."
    },
    {
      question: "What makes your solution AI-powered?",
      answer: "Our platform uses artificial intelligence for automatic compliance detection, intelligent consent optimization, and personalized privacy insights that generate revenue while educating users."
    },
    {
      question: "How quickly can I get started?",
      answer: "You can be up and running in under 5 minutes. Simply sign up, customize your banner, copy the integration code, and paste it into your website."
    },
    {
      question: "Do you offer custom enterprise solutions?",
      answer: "Yes! We provide white-label solutions, custom integrations, and dedicated support for enterprise clients. Contact our sales team for more information."
    }
  ]

  return (
    <>
      <Helmet>
        <title>Contact Us - CookieBot.ai | AI-Powered Cookie Consent Support</title>
        <meta name="description" content="Get in touch with CookieBot.ai's AI-powered support team. Technical help, sales inquiries, and compliance questions answered within 24 hours." />
        <meta name="keywords" content="contact cookiebot.ai, cookie consent support, AI customer service, GDPR help, technical support" />
        <link rel="canonical" href="https://cookiebot.ai/contact" />
        
        <meta property="og:title" content="Contact CookieBot.ai - AI-Powered Cookie Consent Support" />
        <meta property="og:description" content="Get expert help with AI-powered cookie consent management. Fast response times and comprehensive support." />
        <meta property="og:url" content="https://cookiebot.ai/contact" />
        
        <meta name="twitter:title" content="Contact CookieBot.ai - AI-Powered Support" />
        <meta name="twitter:description" content="Get expert help with AI-powered cookie consent management. Fast response times and comprehensive support." />
      </Helmet>

      <div className="min-h-screen bg-white pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4">Contact Support</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get Expert
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}AI Support
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Our AI-powered support team is here to help you maximize your cookie consent 
              management and revenue generation. Get answers fast with expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <MessageSquare className="mr-2 h-5 w-5" />
                Start Conversation
              </Button>
              <Button size="lg" variant="outline">
                <Clock className="mr-2 h-5 w-5" />
                View Response Times
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Multiple Ways to Reach Us</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choose the best contact method for your needs. Our AI-enhanced support 
                system ensures you get the right expert for your question.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <div className="text-blue-600">
                        {method.icon}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-blue-600 mb-2">{method.contact}</p>
                    <p className="text-sm text-gray-500">{method.responseTime}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Send Us a Message</h2>
                <p className="text-xl text-gray-600">
                  Fill out the form below and our AI-powered support system will route 
                  your inquiry to the right specialist.
                </p>
              </div>

              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  {/* Success Message */}
                  {showSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <p className="text-green-800 font-medium">Message sent successfully!</p>
                      </div>
                      <p className="text-green-700 text-sm mt-1">
                        Thank you for contacting us. Our AI system has routed your message to the appropriate specialist.
                      </p>
                    </div>
                  )}

                  {/* Error Message */}
                  {showError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <p className="text-red-800 font-medium">Error sending message</p>
                      </div>
                      <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name *</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Your full name"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="your@email.com"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Company</label>
                        <Input
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          placeholder="Your company name"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Inquiry Type</label>
                        <select
                          value={formData.inquiryType}
                          onChange={(e) => setFormData({...formData, inquiryType: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          disabled={isSubmitting}
                        >
                          <option value="general">General Question</option>
                          <option value="sales">Sales Inquiry</option>
                          <option value="technical">Technical Support</option>
                          <option value="billing">Billing Question</option>
                          <option value="partnership">Partnership</option>
                          <option value="legal">Legal/Compliance</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Subject *</label>
                      <Input
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        placeholder="Brief description of your inquiry"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Message *</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Please provide details about your question or request..."
                        rows={6}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Quick answers to common questions about our AI-powered cookie consent platform.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Office Information */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    AI-Powered Support
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {" "}24/7
                    </span>
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Our artificial intelligence system ensures your questions reach the right 
                    expert quickly. Get faster, more accurate support with our AI-enhanced 
                    customer service platform.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>AI-powered inquiry routing</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Expert human specialists</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Fast response times</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Comprehensive documentation</span>
                    </div>
                  </div>
                </div>

                <Card className="border-0 shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold mb-6">Connect With Us</h3>
                    
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Mail className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Primary Contact</h4>
                          <p className="text-gray-600">info@cookiebot.ai</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Clock className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Response Time</h4>
                          <p className="text-gray-600">Within 24 hours</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Shield className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">AI-Enhanced</h4>
                          <p className="text-gray-600">Intelligent support routing</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold mb-4">Follow Our Updates</h4>
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
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Contact

