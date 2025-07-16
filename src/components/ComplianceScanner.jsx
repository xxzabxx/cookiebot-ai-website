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
      const response = await fetch(`cookiebot-ai-backend-production.up.railway.app${endpoint}`, {
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
        setScanResults(statusData.results)
        setIsScanning(false)
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
      case 'high': return 'text-red-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  if (isScanning) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Analyzing</h2>
            <p className="text-gray-600">{scanMessage}</p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-medium text-gray-700">{scanProgress}% Complete</span>
                </div>
                <Progress value={scanProgress} className="w-full" />
                {scanId && (
                  <div className="text-center text-sm text-gray-500">
                    Scan ID: {scanId}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (scanResults) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Compliance Report Complete</h2>
            <p className="text-gray-600">Analysis for {scanResults?.domain}</p>
          </div>

          <div className="grid gap-8">
            {/* Overall Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Overall Compliance Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2">
                    <span className={getScoreColor(scanResults?.compliance_score || 0)}>
                      {scanResults?.compliance_score || 0}
                    </span>
                    <span className="text-2xl text-gray-400">/100</span>
                  </div>
                  <Badge className={getScoreBadgeColor(scanResults?.compliance_score || 0)}>
                    {(scanResults?.compliance_score || 0) >= 80 ? 'Compliant' :
                     (scanResults?.compliance_score || 0) >= 60 ? 'Partially Compliant' : 'Non-Compliant'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Potential */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Revenue Potential
                </CardTitle>
                <CardDescription>
                  Estimated revenue impact from improved compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly Potential</h3>
                    <p className="text-3xl font-bold text-green-600">
                      ${scanResults?.potential_earnings || 0}
                    </p>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Annual Potential</h3>
                    <p className="text-3xl font-bold text-blue-600">
                      ${scanResults?.annual_earnings || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Globe className="w-5 h-5" />
                    GDPR Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">
                      <span className={getScoreColor(scanResults?.compliance_breakdown?.gdpr?.score || 0)}>
                        {scanResults?.compliance_breakdown?.gdpr?.score || 0}
                      </span>
                      <span className="text-lg text-gray-400">/100</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Comprehensive analysis of your website's compliance with GDPR, CCPA, and LGPD regulations.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Cookie className="w-5 h-5" />
                    Cookie Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">
                      <span className={getScoreColor(scanResults?.compliance_breakdown?.ccpa?.score || 0)}>
                        {scanResults?.compliance_breakdown?.ccpa?.score || 0}
                      </span>
                      <span className="text-lg text-gray-400">/100</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Detailed breakdown of all cookies and tracking scripts found on your website.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Zap className="w-5 h-5" />
                    Revenue Potential
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">
                      <span className={getScoreColor(scanResults?.compliance_breakdown?.lgpd?.score || 0)}>
                        {scanResults?.compliance_breakdown?.lgpd?.score || 0}
                      </span>
                      <span className="text-lg text-gray-400">/100</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      See how much you could earn by turning your cookie consent into a revenue stream.
                    </p>
                  </div>
                </CardContent>
              </Card>
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

            {/* Action Buttons */}
            <div className="text-center space-x-4">
              <Button 
                onClick={() => {
                  setUrl('')
                  setEmail('')
                  setScanResults(null)
                  setError(null)
                  setScanProgress(0)
                  setScanMessage('')
                  setScanId(null)
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Scan Another Website
              </Button>
              <Button variant="outline">
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Free Compliance Scanner
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Analyze your website's compliance with GDPR, CCPA, and other privacy regulations. 
            Get detailed insights and revenue impact analysis.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Website Compliance Analysis
            </CardTitle>
            <CardDescription>
              Enter your website URL and email to receive a comprehensive compliance report
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleScan} className="space-y-6">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL
                </label>
                <Input
                  type="text"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
                <p className="mt-2 text-sm text-gray-500">
                  We'll send your compliance report to this email address
                </p>
              </div>

              <Button
                type="submit"
                disabled={isScanning}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Start Free Compliance Scan
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
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

