import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { AlertTriangle, CheckCircle, XCircle, Search, Globe, Shield, Eye, Cookie, Zap, RefreshCw } from 'lucide-react'

const ComplianceScanner = () => {
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [scanResults, setScanResults] = useState(null)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanMessage, setScanMessage] = useState('')
  const [error, setError] = useState(null)

  const handleScan = async (e) => {
    e.preventDefault()
    
    if (!url || !email) {
      alert('Please enter both website URL and email address')
      return
    }

    setIsScanning(true)
    setScanProgress(0)
    setScanMessage('Initializing scan...')
    setError(null)
    setScanResults(null)
    
    try {
      // Simulate progress for demo
      const progressSteps = [
        { step: 20, message: 'Analyzing website structure...' },
        { step: 40, message: 'Detecting cookies and tracking scripts...' },
        { step: 60, message: 'Checking GDPR compliance...' },
        { step: 80, message: 'Evaluating consent mechanisms...' },
        { step: 100, message: 'Generating compliance report...' }
      ]

      for (const { step, message } of progressSteps) {
        await new Promise(resolve => setTimeout(resolve, 800))
        setScanProgress(step)
        setScanMessage(message)
      }

      // Call real backend API
      const response = await fetch('/api/compliance/demo-scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, email })
      })

      if (!response.ok) {
        throw new Error('Scan failed')
      }

      const results = await response.json()
      setScanResults(results)
      setIsScanning(false)
      
    } catch (error) {
      console.error('Scan error:', error)
      setError(error.message)
      setIsScanning(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBadgeColor = (score) => {
    if (score >= 80) return 'bg-green-100 text-green-800'
    if (score >= 60) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50'
      case 'high': return 'text-orange-600 bg-orange-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-blue-600 bg-blue-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  if (isScanning) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <RefreshCw className="h-16 w-16 mx-auto text-blue-600 animate-spin mb-4" />
              <h2 className="text-3xl font-bold mb-4">Scanning Your Website</h2>
              <p className="text-gray-600 mb-6">
                Analyzing {url} for GDPR, CCPA, and LGPD compliance...
              </p>
            </div>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Progress value={scanProgress} className="w-full" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{scanMessage}</span>
                    <span>{scanProgress}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-gray-500">
              This may take 30-60 seconds depending on your website complexity
            </p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <XCircle className="h-16 w-16 mx-auto text-red-600 mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-red-600">Scan Failed</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button 
              onClick={() => {
                setError(null)
                setScanResults(null)
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Try Again
            </Button>
          </div>
        </div>
      </section>
    )
  }

  if (scanResults) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Compliance Scan Results</h2>
              <p className="text-gray-600">Scan completed for {scanResults.domain}</p>
              {scanResults.scan_id && scanResults.scan_id.startsWith('demo_') && (
                <Badge className="mt-2 bg-blue-100 text-blue-800">Demo Scan</Badge>
              )}
            </div>

            {/* Overall Score */}
            <Card className="mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Compliance Score</CardTitle>
                <div className={`text-6xl font-bold ${getScoreColor(scanResults.compliance_score)}`}>
                  {scanResults.compliance_score}%
                </div>
                <Badge className={getScoreBadgeColor(scanResults.compliance_score)}>
                  {scanResults.compliance_score >= 80 ? 'Good' : scanResults.compliance_score >= 60 ? 'Needs Improvement' : 'Poor'}
                </Badge>
              </CardHeader>
            </Card>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Cookie className="h-4 w-4 text-blue-600" />
                  <CardTitle className="text-sm font-medium ml-2">Cookies Detected</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{scanResults.cookies?.length || 0}</div>
                  <p className="text-xs text-gray-600">Including tracking and analytics cookies</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <CardTitle className="text-sm font-medium ml-2">Issues Found</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{scanResults.issues?.length || 0}</div>
                  <p className="text-xs text-gray-600">Compliance violations detected</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Zap className="h-4 w-4 text-green-600" />
                  <CardTitle className="text-sm font-medium ml-2">Earning Potential</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">${scanResults.potential_earnings || 0}/mo</div>
                  <p className="text-xs text-gray-600">With CookieBot.ai affiliate system</p>
                </CardContent>
              </Card>
            </div>

            {/* Issues Found */}
            {scanResults.issues && scanResults.issues.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                    Compliance Issues Found
                  </CardTitle>
                  <CardDescription>
                    These issues could result in GDPR violations and potential fines
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {scanResults.issues.map((issue, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(issue.severity)}`}>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{issue.title}</h4>
                          <Badge className={`${getSeverityColor(issue.severity)} border-0`}>
                            {issue.severity}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">{issue.description}</p>
                        <p className="text-sm font-medium">
                          <strong>Recommendation:</strong> {issue.recommendation}
                        </p>
                        {issue.regulation && (
                          <p className="text-xs mt-1 opacity-75">
                            Regulation: {issue.regulation.toUpperCase()}
                            {issue.article && ` - ${issue.article}`}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Cookies Analysis */}
            {scanResults.cookies && scanResults.cookies.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Cookie className="h-5 w-5 text-blue-500 mr-2" />
                    Cookies Analysis
                  </CardTitle>
                  <CardDescription>
                    Cookies detected on your website and their categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {scanResults.cookies.map((cookie, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{cookie.name}</p>
                          <p className="text-sm text-gray-600">{cookie.purpose}</p>
                        </div>
                        <Badge className={
                          cookie.category === 'necessary' ? 'bg-green-100 text-green-800' :
                          cookie.category === 'statistics' ? 'bg-blue-100 text-blue-800' :
                          cookie.category === 'marketing' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {cookie.category}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Revenue Opportunity */}
            <Card className="mb-8 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">💰 Revenue Opportunity</CardTitle>
                <CardDescription className="text-green-700">
                  Turn your compliance solution into a revenue stream
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Current Situation</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Paying for cookie consent: $29-99/month</li>
                      <li>• {scanResults.issues?.length || 0} compliance issues present</li>
                      <li>• Missing revenue opportunities</li>
                      <li>• Potential GDPR fines risk</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">With CookieBot.ai</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Earn ${scanResults.potential_earnings || 0}/month from consent</li>
                      <li>• Full GDPR compliance</li>
                      <li>• 5-minute setup process</li>
                      <li>• 60% revenue share guarantee</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      Annual Revenue Potential: ${((scanResults.potential_earnings || 0) * 12).toLocaleString()}
                    </div>
                    <p className="text-sm text-green-700">
                      vs. paying ${29 * 12} annually for traditional cookie consent
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="text-center">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4">Ready to Fix These Issues AND Start Earning?</h3>
                <p className="text-gray-600 mb-6">
                  Get full GDPR compliance plus revenue generation with CookieBot.ai
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Start Free Trial
                  </Button>
                  <Button size="lg" variant="outline">
                    Schedule Demo
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Free migration • 14-day trial • No credit card required
                </p>
              </CardContent>
            </Card>

            {/* Scan Again */}
            <div className="text-center mt-8">
              <Button 
                variant="outline" 
                onClick={() => {
                  setScanResults(null)
                  setUrl('')
                  setEmail('')
                }}
              >
                Scan Another Website
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Initial form
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free GDPR Compliance Scanner
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover compliance issues on your website and see how much you could earn 
              with our revenue-sharing cookie consent platform
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Search className="h-6 w-6 mr-2 text-blue-600" />
                Scan Your Website
              </CardTitle>
              <CardDescription>
                Get a detailed compliance report in under 60 seconds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleScan} className="space-y-4">
                <div>
                  <Input
                    type="url"
                    placeholder="Enter your website URL (e.g., example.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="text-center"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Enter your email for the detailed report"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-center"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Start Compliance Scan
                  </Button>
                </div>
              </form>
              
              <div className="mt-6 text-sm text-gray-500">
                <p>✓ Free scan • ✓ No credit card required • ✓ Instant results</p>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">GDPR Compliance</h3>
              <p className="text-gray-600">
                Comprehensive analysis of GDPR, CCPA, and LGPD compliance requirements
              </p>
            </div>
            <div className="text-center">
              <Eye className="h-12 w-12 mx-auto text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Cookie Analysis</h3>
              <p className="text-gray-600">
                Detailed breakdown of all cookies and tracking technologies on your site
              </p>
            </div>
            <div className="text-center">
              <Zap className="h-12 w-12 mx-auto text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Revenue Potential</h3>
              <p className="text-gray-600">
                See how much you could earn by monetizing your cookie consent banner
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComplianceScanner

