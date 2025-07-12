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
      // Use the same API endpoint pattern as the working homepage form
      const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'https://cookiebot-ai-backend.vercel.app'
      
      const response = await fetch(`${apiEndpoint}/api/contact`, {
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
      description: "Get help from our support team",
      contact: "support@cookiebot.ai",
      availability: "24/7 Response"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Sales Inquiries", 
      description: "Questions about plans and pricing",
      contact: "sales@cookiebot.ai",
      availability: "Mon-Fri 9AM-6PM EST"
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: "Technical Support",
      description: "Implementation and integration help",
      contact: "tech@cookiebot.ai", 
      availability: "24/7 Priority Support"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Compliance Questions",
      description: "GDPR, CCPA, and legal compliance",
      contact: "compliance@cookiebot.ai",
      availability: "Mon-Fri 8AM-8PM EST"
    }
  ]

  const faqs = [
    {
      question: "How quickly can I get CookieBot.ai set up?",
      answer: "Most websites can be set up in under 5 minutes. Simply add our script tag to your website and configure your preferences through our dashboard."
    },
    {
      question: "Do you support GDPR, CCPA, and other privacy laws?",
      answer: "Yes! CookieBot.ai automatically detects visitor jurisdiction and applies the appropriate privacy regulations including GDPR, CCPA, LGPD, and more."
    },
    {
      question: "How does the revenue sharing system work?",
      answer: "Our unique Privacy Insights feature displays educational content after consent. You earn 60% of revenue from user interactions, with transparent tracking and monthly payouts."
    },
    {
      question: "Can I customize the appearance to match my brand?",
      answer: "Absolutely! Our advanced theming system offers complete customization including colors, fonts, layouts, button styles, and even custom CSS for perfect brand matching."
    },
    {
      question: "What's the difference between CookieBot.ai and other solutions?",
      answer: "We're the only platform offering built-in monetization through Privacy Insights, advanced AI-powered customization, and comprehensive multi-jurisdiction compliance in one solution."
    },
    {
      question: "Do you offer enterprise solutions?",
      answer: "Yes! We provide white-label solutions, custom integrations, dedicated support, and enterprise-grade SLAs for large organizations."
    }
  ]

  return (
    <div className="min-h-screen bg-white pt-20">
      <Helmet>
        <title>Contact Us - CookieBot.ai | Get Help with Cookie Consent Management</title>
        <meta name="description" content="Contact CookieBot.ai for support, sales inquiries, or technical questions. Our team is here to help you with GDPR compliance and revenue generation." />
        <meta name="keywords" content="contact cookiebot.ai, cookie consent support, GDPR help, technical support, sales inquiries" />
        <link rel="canonical" href="https://cookiebot.ai/contact" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4">Contact Us</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get in
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Touch
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our team of cookie consent experts is here to help you implement GDPR compliance, 
            maximize revenue generation, and create the perfect user experience for your website.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <span>Average response time: 2 hours</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>24/7 priority support available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Multiple Ways to Reach Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the contact method that works best for your needs. Our specialized teams 
              are ready to provide expert assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md">
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
                  <div className="space-y-2">
                    <div className="font-semibold text-blue-600">{method.contact}</div>
                    <div className="text-sm text-gray-500">{method.availability}</div>
                  </div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Send Us a Message</h2>
              <p className="text-xl text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                {showSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 text-green-800">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-semibold">Message sent successfully!</span>
                    </div>
                    <p className="text-green-700 mt-1">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                  </div>
                )}

                {showError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2 text-red-800">
                      <AlertCircle className="h-5 w-5" />
                      <span className="font-semibold">Error sending message</span>
                    </div>
                    <p className="text-red-700 mt-1">{errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Your full name"
                        required
                        disabled={isSubmitting}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your@email.com"
                        required
                        disabled={isSubmitting}
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Company/Organization
                      </label>
                      <Input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        placeholder="Your company name"
                        disabled={isSubmitting}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Inquiry Type
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({...formData, inquiryType: e.target.value})}
                        disabled={isSubmitting}
                        className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="sales">Sales & Pricing</option>
                        <option value="technical">Technical Support</option>
                        <option value="compliance">Compliance Questions</option>
                        <option value="partnership">Partnership Opportunities</option>
                        <option value="billing">Billing & Account</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject
                    </label>
                    <Input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="Brief subject line"
                      disabled={isSubmitting}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us about your project, questions, or how we can help you..."
                      rows={6}
                      required
                      disabled={isSubmitting}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-semibold"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>Send Message</span>
                        <ArrowRight className="h-5 w-5" />
                      </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about CookieBot.ai and our services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Still have questions? We're here to help!
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => document.querySelector('form').scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Our Team
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Visit Our Office</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Address</h3>
                <p className="text-gray-600 text-center">
                  123 Tech Street<br />
                  San Francisco, CA 94105<br />
                  United States
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center mb-4">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Phone</h3>
                <p className="text-gray-600 text-center">
                  +1 (555) 123-4567<br />
                  Mon-Fri 9AM-6PM EST<br />
                  24/7 Emergency Support
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
                <p className="text-gray-600 text-center">
                  Monday - Friday<br />
                  9:00 AM - 6:00 PM EST<br />
                  Weekend Support Available
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

