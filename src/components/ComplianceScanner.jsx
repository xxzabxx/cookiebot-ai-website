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
  const [scanId, setScanId] = useState(null)

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
    setScanId(null)

    try {
      // Start the real compliance scan
      const response = await fetch('https://cookiebot-ai-backend.vercel.app/api/compliance/real-scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, email })
      })

      if (!response.ok) {
        throw new Error('Failed to start scan')
      }

      const startResult = await response.json()
      setScanId(startResult.scan_id)
      setScanMessage(startResult.message || 'Scan started...')

      // Start polling for results
      pollScanStatus(startResult.scan_id)

    } catch (error) {
      console.error('Scan error:', error)
      setError(error.message)
      setIsScanning(false)
    }
  }

  const pollScanStatus = async (scanId) => {
    try {
      const response = await fetch(`https://cookiebot-ai-backend.vercel.app/api/compliance/real-scan/${scanId}/status`)
      
      if (!response.ok) {
        throw new Error('Failed to get scan status')
      }

      const statusData = await response.json()
      
      // Update progress and message
      setScanProgress(statusData.progress || 0)
      setScanMessage(statusData.message || 'Scanning...')

      if (statusData.status === 'completed' && statusData.results) {
        // Scan completed successfully
        setScanResults(statusData.results)
        setIsScanning(false)
        setScanProgress(100)
        setScanMessage('Scan completed!')
      } else if (statusData.status === 'failed') {
        // Scan failed
        throw new Error(statusData.error || 'Scan failed')
      } else {
        // Still running, continue polling
        setTimeout(() => pollScanStatus(scanId), 2000) // Poll every 2 seconds
      }

    } catch (error) {
      console.error('Polling error:', error)
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
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <RefreshCw className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-spin" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Scanning Your Website</h2>
          <p className="text-gray-600">
            Analyzing {url} for GDPR, CCPA, and LGPD compliance...
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">{scanMessage}</span>
                <span className="text-sm font-medium text-gray-700">{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="w-full" />
            </div>
            <p className="text-sm text-gray-500 text-center">
              This may take 30-60 seconds depending on your website complexity
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (scanResults) {
    const { compliance_score, issues, cookies, potential_earnings, annual_earnings } = scanResults
    const scoreRating = compliance_score >= 80 ? 'Excellent' : compliance_score >= 60 ? 'Good' : 'Poor'

    return (
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Compliance Scan Results</h2>
          <p className="text-gray-600 mb-2">Scan completed for {scanResults.url}</p>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">Real Scan</Badge>
        </div>

        {/* Main Score */}
        <Card className="mb-8">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Compliance Score</h3>
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(compliance_score)}`}>
              {compliance_score}%
            </div>
            <Badge className={getScoreBadgeColor(compliance_score)}>
              {scoreRating}
            </Badge>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Cookie className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{cookies?.length || 0}</div>
              <p className="text-sm text-gray-600">Including tracking and analytics cookies</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{issues?.length || 0}</div>
              <p className="text-sm text-gray-600">Compliance violations detected</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">${potential_earnings}/mo</div>
              <p className="text-sm text-gray-600">With CookieBot.ai affiliate system</p>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Issues */}
        {issues && issues.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Compliance Issues Found
              </CardTitle>
              <CardDescription>
                These issues could result in GDPR violations and potential fines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issues.map((issue, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(issue.severity)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{issue.title}</h4>
                      <Badge variant="outline" className={getSeverityColor(issue.severity)}>
                        {issue.severity}
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">{issue.description}</p>
                    <p className="text-sm font-medium">
                      <strong>Recommendation:</strong> {issue.recommendation}
                    </p>
                    {issue.regulation && (
                      <p className="text-xs text-gray-500 mt-1">
                        Regulation: {issue.regulation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cookies Analysis */}
        {cookies && cookies.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5 text-blue-500" />
                Cookies Analysis
              </CardTitle>
              <CardDescription>
                Cookies detected on your website and their categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cookies.map((cookie, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{cookie.name}</div>
                      <div className="text-sm text-gray-600">{cookie.purpose}</div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        cookie.category === 'necessary' ? 'bg-green-100 text-green-800' :
                        cookie.category === 'statistics' ? 'bg-blue-100 text-blue-800' :
                        cookie.category === 'marketing' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {cookie.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Revenue Opportunity */}
        <Card className="mb-8 bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              💰 Revenue Opportunity
            </CardTitle>
            <CardDescription className="text-green-700">
              Turn your compliance solution into a revenue stream
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-800 mb-3">Current Situation</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Paying for cookie consent: $29-99/month</li>
                  <li>• {issues?.length || 0} compliance issues present</li>
                  <li>• Missing revenue opportunities</li>
                  <li>• Potential GDPR fines risk</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-3">With CookieBot.ai</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Earn ${potential_earnings}/month from consent</li>
                  <li>• Full GDPR compliance</li>
                  <li>• 5-minute setup process</li>
                  <li>• 60% revenue share guarantee</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-800">
                  Annual Revenue Potential: ${annual_earnings || (potential_earnings * 12)}
                </div>
                <div className="text-sm text-green-600 mt-1">
                  vs. paying $348 annually for traditional cookie consent
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="text-center">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Fix These Issues AND Start Earning?
            </h3>
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
            <Button 
              variant="link" 
              onClick={() => {
                setScanResults(null)
                setUrl('')
                setEmail('')
              }}
              className="mt-4"
            >
              Scan Another Website
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Free GDPR Compliance Scanner</h1>
        <p className="text-xl text-gray-600">
          Discover compliance issues on your website and see how much you could earn with our revenue-sharing cookie consent platform
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Search className="h-6 w-6 text-blue-500" />
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
                type="text"
                placeholder="Enter your website URL (e.g., example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Enter your email for the detailed report"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isScanning}
            >
              <Search className="h-4 w-4 mr-2" />
              Start Compliance Scan
            </Button>
          </form>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            ✓ Free scan • ✓ No credit card required • ✓ Real results
          </div>
        </CardContent>
      </Card>

      <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
        <div>
          <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">GDPR Compliance</h3>
          <p className="text-gray-600">Comprehensive analysis of your website's compliance with GDPR, CCPA, and LGPD regulations.</p>
        </div>
        <div>
          <Eye className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Cookie Analysis</h3>
          <p className="text-gray-600">Detailed breakdown of all cookies and tracking scripts found on your website.</p>
        </div>
        <div>
          <Zap className="h-12 w-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue Potential</h3>
          <p className="text-gray-600">See how much you could earn by turning your cookie consent into a revenue stream.</p>
        </div>
      </div>
    </div>
  )
}

export default ComplianceScanner


