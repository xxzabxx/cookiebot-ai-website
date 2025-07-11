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

  // Simple API call function with manual token handling
  const makeApiCall = async (endpoint, options = {}) => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await fetch(`https://cookiebot-ai-backend.vercel.app${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
          ...options.headers
        },
        ...options
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API call failed:', error)
      throw error
    }
  }

  // Check if user is logged in
  const isLoggedIn = () => {
    return !!localStorage.getItem('authToken')
  }

  const pollScanStatus = async (scanId) => {
    try {
      const statusData = await makeApiCall(`/api/compliance/real-scan/${scanId}/status`)
      
      setScanProgress(statusData.progress || 0)
      setScanMessage(statusData.message || 'Processing...')
      
      if (statusData.status === 'completed') {
        setScanResults(statusData)
        return true
      } else if (statusData.status === 'failed') {
        throw new Error(statusData.error || 'Scan failed')
      }
      
      return false
    } catch (statusError) {
      console.error('Status polling error:', statusError)
      throw statusError
    }
  }

  const handleScan = async (e) => {
    e.preventDefault()
    
    if (!url || !email) {
      alert('Please enter both website URL and email address')
      return
    }

    // Check if user is logged in
    if (!isLoggedIn()) {
      setError('Please log in to use the compliance scanner')
      return
    }

    setIsScanning(true)
    setScanProgress(0)
    setScanMessage('Initializing scan...')
    setError(null)
    setScanResults(null)
    setScanId(null)

    try {
      setScanMessage('Starting compliance analysis...')
      const scanResponse = await makeApiCall('/api/compliance/real-scan', {
        method: 'POST',
        body: JSON.stringify({ url, email })
      })

      const newScanId = scanResponse.scan_id
      setScanId(newScanId)
      setScanMessage('Scan started successfully...')
      setScanProgress(10)

      // Poll for scan completion
      let completed = false
      let attempts = 0
      const maxAttempts = 30 // 60 seconds max (2 seconds * 30)

      while (!completed && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 2000)) // Wait 2 seconds
        attempts++

        try {
          completed = await pollScanStatus(newScanId)
        } catch (statusError) {
          console.error('Status polling error:', statusError)
          // Continue polling unless it's a critical error
          if (attempts >= maxAttempts) {
            throw statusError
          }
        }
      }

      if (!completed) {
        throw new Error('Scan timeout - please try again')
      }

    } catch (error) {
      console.error('Scan error:', error)
      setError(error.message || 'Scan failed')
      setIsScanning(false)
      setScanProgress(0)
      setScanMessage('')
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

  // FIXED: Added proper conditional rendering for scanning state
  if (isScanning) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <RefreshCw className="h-16 w-16 mx-auto text-blue-600 animate-spin-slow mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Analyzing</h2>
              <p className="text-gray-600">{scanMessage}</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Progress value={scanProgress} className="mb-4" />
              <p className="text-sm text-gray-500">{scanProgress}% Complete</p>
              {scanId && (
                <p className="text-xs text-gray-400 mt-2">Scan ID: {scanId}</p>
              )}
            </div>
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
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <XCircle className="h-16 w-16 mx-auto text-red-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Scan Failed</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <Button
                onClick={() => {
                  setError(null)
                  setScanResults(null)
                  setScanProgress(0)
                  setScanMessage('')
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Try Again
              </Button>
            </div>
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
            {/* Header */}
            <div className="text-center mb-12">
              <CheckCircle className="h-16 w-16 mx-auto text-green-600 mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Compliance Report Complete</h2>
              <p className="text-gray-600">Analysis for <span className="font-semibold">{scanResults.results?.domain}</span></p>
            </div>

            {/* Overall Score */}
            <Card className="mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Overall Compliance Score</CardTitle>
                <div className={`text-6xl font-bold ${getScoreColor(scanResults.results?.compliance_score)}`}>
                  {scanResults.results?.compliance_score}/100
                </div>
                <Badge className={getScoreBadgeColor(scanResults.results?.compliance_score)}>
                  {scanResults.results?.compliance_score >= 80 ? 'Compliant' : 
                   scanResults.results?.compliance_score >= 60 ? 'Partially Compliant' : 'Non-Compliant'}
                </Badge>
              </CardHeader>
            </Card>

            {/* Framework Breakdown */}
            {scanResults.results?.compliance_breakdown && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Compliance Framework Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {Object.entries(scanResults.results.compliance_breakdown).map(([framework, data]) => (
                      <div key={framework} className="text-center p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">{framework.toUpperCase()}</h3>
                        <div className={`text-3xl font-bold ${getScoreColor(data.score)}`}>
                          {data.score}/100
                        </div>
                        <Badge className={getScoreBadgeColor(data.score)}>
                          {data.status}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-2">{data.issues} issues found</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Revenue Potential */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Revenue Potential
                </CardTitle>
                {scanResults.results?.revenue_note && (
                  <CardDescription className="text-sm text-gray-500 italic">
                    {scanResults.results.revenue_note}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Monthly Potential</h3>
                    <div className="text-3xl font-bold text-green-600">
                      ${scanResults.results?.monthly_revenue}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Annual Potential</h3>
                    <div className="text-3xl font-bold text-blue-600">
                      ${scanResults.results?.annual_revenue}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="text-center">
              <Button
                onClick={() => {
                  setScanResults(null)
                  setUrl('')
                  setEmail('')
                  setError(null)
                  setScanProgress(0)
                  setScanMessage('')
                }}
                className="bg-blue-600 hover:bg-blue-700 mr-4"
              >
                Scan Another Website
              </Button>
              <Button variant="outline">
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // DEFAULT: Show the scan form
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <Search className="h-16 w-16 mx-auto text-blue-600 mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Free GDPR Compliance Scanner
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover compliance issues on your website and see how much you could earn with our revenue-sharing cookie consent platform
            </p>
          </div>

          <Card className="max-w-2xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Globe className="h-5 w-5" />
                Scan Your Website
              </CardTitle>
              <CardDescription>
                Get a detailed compliance report in under 60 seconds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleScan} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter your website URL (e.g., example.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full"
                />
                <Input
                  type="email"
                  placeholder="Enter your email for the detailed report"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isScanning || !isLoggedIn()}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Start Compliance Scan
                </Button>
                {!isLoggedIn() && (
                  <p className="text-sm text-red-600">
                    Please log in to use the compliance scanner
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              Free scan
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              No credit card required
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              Real results
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <Shield className="h-12 w-12 mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">GDPR Compliance</h3>
            <p className="text-gray-600">
              Comprehensive analysis of your website's compliance with GDPR, CCPA, and LGPD regulations.
            </p>
          </div>
          <div className="text-center">
            <Eye className="h-12 w-12 mx-auto text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Cookie Analysis</h3>
            <p className="text-gray-600">
              Detailed breakdown of all cookies and tracking scripts found on your website.
            </p>
          </div>
          <div className="text-center">
            <Zap className="h-12 w-12 mx-auto text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Revenue Potential</h3>
            <p className="text-gray-600">
              See how much you could earn by turning your cookie consent into a revenue stream.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComplianceScanner

