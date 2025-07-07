import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { AlertTriangle, CheckCircle, XCircle, Search, Globe, Shield, Eye, Cookie, Zap } from 'lucide-react'

const ComplianceScanner = () => {
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [scanResults, setScanResults] = useState(null)
  const [scanProgress, setScanProgress] = useState(0)

  const handleScan = async (e) => {
    e.preventDefault()
    
    if (!url || !email) {
      alert('Please enter both website URL and email address')
      return
    }

    setIsScanning(true)
    setScanProgress(0)
    
    // Simulate scanning process with progress
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
    }

    // Generate mock scan results based on URL
    const mockResults = generateMockResults(url)
    setScanResults(mockResults)
    setIsScanning(false)
  }

  const generateMockResults = (url) => {
    const domain = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
    
    // Generate realistic but varied results
    const cookieCount = Math.floor(Math.random() * 20) + 5
    const trackingScripts = Math.floor(Math.random() * 8) + 2
    const complianceScore = Math.floor(Math.random() * 40) + 30 // 30-70% to show room for improvement
    
    const issues = [
      'Missing cookie consent banner',
      'Tracking cookies set before consent',
      'No privacy policy link in consent banner',
      'Missing granular consent options',
      'Third-party scripts loading without consent',
      'No cookie categorization',
      'Consent not properly recorded',
      'Missing opt-out mechanisms'
    ]

    const detectedIssues = issues.slice(0, Math.floor(Math.random() * 4) + 3)
    
    const potentialEarnings = Math.floor((cookieCount * trackingScripts * 50) + Math.random() * 300) + 200

    return {
      domain,
      complianceScore,
      cookieCount,
      trackingScripts,
      issues: detectedIssues,
      potentialEarnings,
      scanDate: new Date().toLocaleDateString(),
      recommendations: [
        'Implement proper cookie consent management',
        'Add granular consent categories',
        'Ensure scripts load only after consent',
        'Implement proper consent recording',
        'Add clear privacy policy links'
      ]
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

  if (scanResults) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Compliance Scan Results</h2>
              <p className="text-gray-600">Scan completed for {scanResults.domain}</p>
            </div>

            {/* Overall Score */}
            <Card className="mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Compliance Score</CardTitle>
                <div className={`text-6xl font-bold ${getScoreColor(scanResults.complianceScore)}`}>
                  {scanResults.complianceScore}%
                </div>
                <Badge className={getScoreBadgeColor(scanResults.complianceScore)}>
                  {scanResults.complianceScore >= 80 ? 'Good' : scanResults.complianceScore >= 60 ? 'Needs Improvement' : 'Poor'}
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
                  <div className="text-2xl font-bold">{scanResults.cookieCount}</div>
                  <p className="text-xs text-gray-600">Including tracking and analytics cookies</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Eye className="h-4 w-4 text-purple-600" />
                  <CardTitle className="text-sm font-medium ml-2">Tracking Scripts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{scanResults.trackingScripts}</div>
                  <p className="text-xs text-gray-600">Third-party tracking technologies</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Zap className="h-4 w-4 text-green-600" />
                  <CardTitle className="text-sm font-medium ml-2">Earning Potential</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">${scanResults.potentialEarnings}/mo</div>
                  <p className="text-xs text-gray-600">With CookieBot.ai affiliate system</p>
                </CardContent>
              </Card>
            </div>

            {/* Issues Found */}
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
                    <div key={index} className="flex items-center p-3 bg-red-50 rounded-lg">
                      <XCircle className="h-4 w-4 text-red-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{issue}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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
                      <li>• Compliance issues present</li>
                      <li>• Missing revenue opportunities</li>
                      <li>• Potential GDPR fines risk</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">With CookieBot.ai</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Earn ${scanResults.potentialEarnings}/month from consent</li>
                      <li>• Full GDPR compliance</li>
                      <li>• 5-minute setup process</li>
                      <li>• 60% revenue share guarantee</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      Annual Revenue Potential: ${(scanResults.potentialEarnings * 12).toLocaleString()}
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

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-blue-100 text-blue-800">
              Free Compliance Scan
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Is Your Website GDPR Compliant?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get a free compliance scan and discover how much you could earn from cookie consent
            </p>
          </div>

          {!isScanning ? (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Search className="h-5 w-5 mr-2" />
                  Free Website Compliance Scan
                </CardTitle>
                <CardDescription>
                  Enter your website URL and email to receive a detailed compliance report
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleScan} className="space-y-4">
                  <div>
                    <Input
                      type="url"
                      placeholder="https://yourwebsite.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="text-lg p-6"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-lg p-6"
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full text-lg py-6">
                    <Globe className="h-5 w-5 mr-2" />
                    Scan My Website
                  </Button>
                </form>
                <p className="text-sm text-gray-500 mt-4">
                  Free scan • Instant results • No spam, ever
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Scanning Your Website...</CardTitle>
                <CardDescription>
                  This may take a few moments while we analyze your site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={scanProgress} className="w-full" />
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm text-gray-600">
                    {scanProgress < 20 && 'Analyzing website structure...'}
                    {scanProgress >= 20 && scanProgress < 40 && 'Detecting cookies and tracking scripts...'}
                    {scanProgress >= 40 && scanProgress < 60 && 'Checking GDPR compliance...'}
                    {scanProgress >= 60 && scanProgress < 80 && 'Evaluating consent mechanisms...'}
                    {scanProgress >= 80 && 'Generating compliance report...'}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">GDPR Compliance Check</h3>
              <p className="text-gray-600">
                Comprehensive analysis of your website's privacy compliance status
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Revenue Potential</h3>
              <p className="text-gray-600">
                Discover how much you could earn from cookie consent with our affiliate system
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Actionable Insights</h3>
              <p className="text-gray-600">
                Get specific recommendations to improve compliance and maximize earnings
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComplianceScanner

