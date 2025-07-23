import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { AlertTriangle, CheckCircle, XCircle, Search, Globe, Shield, Eye, Cookie, Zap, RefreshCw, Download, TrendingUp, DollarSign, AlertCircle } from 'lucide-react'

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
      const response = await fetch(`${import.meta.env.VITE_API_BASE}${endpoint}`, {
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
      setError('Please enter both website URL and email address')
      return
    }

    // Validate URL format
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`)
    } catch {
      setError('Please enter a valid website URL')
      return
    }

    setIsScanning(true)
    setScanProgress(0)
    setScanMessage('Initializing comprehensive compliance scan...')
    setError(null)
    setScanResults(null)
    setScanId(null)

    try {
      setScanMessage('Analyzing website structure...')
      setScanProgress(10)
      
      const scanResponse = await makeApiCall('/api/compliance/real-scan', {
        method: 'POST',
        body: JSON.stringify({ 
          url: url.startsWith('http') ? url : `https://${url}`, 
          email,
          scan_type: 'comprehensive'
        })
      })

      const newScanId = scanResponse.scan_id
      setScanId(newScanId)
      setScanMessage('Crawling website pages...')
      setScanProgress(25)

      // Enhanced polling with better progress tracking
      let completed = false
      let attempts = 0
      const maxAttempts = 60 // 2 minutes max (2 seconds * 60)

      const progressMessages = [
        'Analyzing cookies and tracking scripts...',
        'Checking GDPR compliance requirements...',
        'Evaluating CCPA compliance status...',
        'Assessing LGPD compliance measures...',
        'Calculating revenue potential...',
        'Generating compliance recommendations...',
        'Finalizing comprehensive report...'
      ]

      while (!completed && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 2000)) // Wait 2 seconds
        attempts++

        // Update progress message based on time elapsed
        const messageIndex = Math.min(Math.floor(attempts / 8), progressMessages.length - 1)
        setScanMessage(progressMessages[messageIndex])

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
        throw new Error('Scan timeout - your website is taking longer than expected to analyze. Please try again.')
      }

    } catch (error) {
      console.error('Scan error:', error)
      setError(error.message || 'Scan failed - please check your website URL and try again')
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const downloadReport = async () => {
    if (!scanResults || !scanId) return
    
    try {
      const response = await makeApiCall(`/api/compliance/real-scan/${scanId}/report`, {
        method: 'GET'
      })
      
      // Create and download PDF report
      const blob = new Blob([response], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `compliance-report-${scanResults.domain}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
      setError('Failed to download report - please try again')
    }
  }

  if (isScanning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <RefreshCw className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Analyzing Your Website</h2>
            <p className="text-xl text-gray-600 mb-2">{scanMessage}</p>
            <p className="text-sm text-gray-500">This comprehensive scan analyzes GDPR, CCPA, and LGPD compliance</p>
          </div>

          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-700">Scan Progress</span>
                  <span className="text-lg font-medium text-gray-700">{scanProgress}% Complete</span>
                </div>
                <Progress value={scanProgress} className="w-full h-3" />
                
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Shield className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                    <p className="text-sm font-medium text-gray-700">GDPR Analysis</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Globe className="w-8 h-8 mx-auto text-green-600 mb-2" />
                    <p className="text-sm font-medium text-gray-700">CCPA Compliance</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Zap className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                    <p className="text-sm font-medium text-gray-700">Revenue Analysis</p>
                  </div>
                </div>

                {scanId && (
                  <div className="text-center text-sm text-gray-500 mt-6">
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Compliance Analysis Complete</h2>
            <p className="text-xl text-gray-600">Comprehensive report for <span className="font-semibold">{scanResults?.domain}</span></p>
          </div>

          <div className="grid gap-8">
            {/* Overall Score Card */}
            <Card className="bg-white shadow-xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex items-center justify-center gap-3 text-2xl">
                  <Shield className="w-8 h-8" />
                  Overall Compliance Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-8">
                  <div className="text-8xl font-bold mb-4">
                    <span className={getScoreColor(scanResults?.compliance_score || 0)}>
                      {scanResults?.compliance_score || 0}
                    </span>
                    <span className="text-3xl text-gray-400">/100</span>
                  </div>
                  <Badge className={`${getScoreBadgeColor(scanResults?.compliance_score || 0)} text-lg px-4 py-2`}>
                    {(scanResults?.compliance_score || 0) >= 80 ? 'Fully Compliant' :
                     (scanResults?.compliance_score || 0) >= 60 ? 'Partially Compliant' : 'Non-Compliant'}
                  </Badge>
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-4 gap-6 mt-8">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Cookie className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{scanResults?.cookies_found || 0}</div>
                    <div className="text-sm text-gray-600">Cookies Found</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <AlertCircle className="w-8 h-8 mx-auto text-red-600 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{scanResults?.issues_found || 0}</div>
                    <div className="text-sm text-gray-600">Issues Found</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{scanResults?.pages_scanned || 0}</div>
                    <div className="text-sm text-gray-600">Pages Scanned</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{scanResults?.improvement_potential || 0}%</div>
                    <div className="text-sm text-gray-600">Improvement Potential</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Potential Card */}
            <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-white">
                  <DollarSign className="w-8 h-8" />
                  Revenue Potential Analysis
                </CardTitle>
                <CardDescription className="text-green-100">
                  Estimated revenue impact from improved compliance and monetization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-3">Monthly Revenue Potential</h3>
                    <p className="text-4xl font-bold">
                      {formatCurrency(scanResults?.potential_earnings || 0)}
                    </p>
                    <p className="text-sm opacity-90 mt-2">Based on current traffic and optimization</p>
                  </div>
                  <div className="text-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-3">Annual Revenue Potential</h3>
                    <p className="text-4xl font-bold">
                      {formatCurrency(scanResults?.annual_earnings || 0)}
                    </p>
                    <p className="text-sm opacity-90 mt-2">Projected yearly earnings with CookieBot.ai</p>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                  <h4 className="text-lg font-semibold mb-4">Revenue Breakdown</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{scanResults?.revenue_breakdown?.consent_optimization || '45'}%</div>
                      <div className="text-sm opacity-90">Consent Optimization</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{scanResults?.revenue_breakdown?.data_insights || '35'}%</div>
                      <div className="text-sm opacity-90">Data Insights</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{scanResults?.revenue_breakdown?.compliance_premium || '20'}%</div>
                      <div className="text-sm opacity-90">Compliance Premium</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Regulation Compliance Breakdown */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Globe className="w-6 h-6 text-blue-600" />
                    GDPR Compliance
                  </CardTitle>
                  <CardDescription>European Union General Data Protection Regulation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold mb-2">
                      <span className={getScoreColor(scanResults?.compliance_breakdown?.gdpr?.score || 0)}>
                        {scanResults?.compliance_breakdown?.gdpr?.score || 0}
                      </span>
                      <span className="text-xl text-gray-400">/100</span>
                    </div>
                    <Badge className={getScoreBadgeColor(scanResults?.compliance_breakdown?.gdpr?.score || 0)}>
                      {(scanResults?.compliance_breakdown?.gdpr?.score || 0) >= 80 ? 'Compliant' : 'Needs Improvement'}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Cookie Consent</span>
                      <Badge variant={scanResults?.compliance_breakdown?.gdpr?.cookie_consent ? 'default' : 'destructive'}>
                        {scanResults?.compliance_breakdown?.gdpr?.cookie_consent ? 'Present' : 'Missing'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Privacy Policy</span>
                      <Badge variant={scanResults?.compliance_breakdown?.gdpr?.privacy_policy ? 'default' : 'destructive'}>
                        {scanResults?.compliance_breakdown?.gdpr?.privacy_policy ? 'Present' : 'Missing'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Data Processing</span>
                      <Badge variant={scanResults?.compliance_breakdown?.gdpr?.data_processing ? 'default' : 'destructive'}>
                        {scanResults?.compliance_breakdown?.gdpr?.data_processing ? 'Compliant' : 'Issues'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Shield className="w-6 h-6 text-green-600" />
                    CCPA Compliance
                  </CardTitle>
                  <CardDescription>California Consumer Privacy Act</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold mb-2">
                      <span className={getScoreColor(scanResults?.compliance_breakdown?.ccpa?.score || 0)}>
                        {scanResults?.compliance_breakdown?.ccpa?.score || 0}
                      </span>
                      <span className="text-xl text-gray-400">/100</span>
                    </div>
                    <Badge className={getScoreBadgeColor(scanResults?.compliance_breakdown?.ccpa?.score || 0)}>
                      {(scanResults?.compliance_breakdown?.ccpa?.score || 0) >= 80 ? 'Compliant' : 'Needs Improvement'}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Do Not Sell</span>
                      <Badge variant={scanResults?.compliance_breakdown?.ccpa?.do_not_sell ? 'default' : 'destructive'}>
                        {scanResults?.compliance_breakdown?.ccpa?.do_not_sell ? 'Present' : 'Missing'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Consumer Rights</span>
                      <Badge variant={scanResults?.compliance_breakdown?.ccpa?.consumer_rights ? 'default' : 'destructive'}>
                        {scanResults?.compliance_breakdown?.ccpa?.consumer_rights ? 'Present' : 'Missing'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Data Categories</span>
                      <Badge variant={scanResults?.compliance_breakdown?.ccpa?.data_categories ? 'default' : 'destructive'}>
                        {scanResults?.compliance_breakdown?.ccpa?.data_categories ? 'Disclosed' : 'Missing'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Eye className="w-6 h-6 text-purple-600" />
                    LGPD Compliance
                  </CardTitle>
                  <CardDescription>Brazilian General Data Protection Law</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold mb-2">
                      <span className={getScoreColor(scanResults?.compliance_breakdown?.lgpd?.score || 0)}>
                        {scanResults?.compliance_breakdown?.lgpd?.score || 0}
                      </span>
                      <span className="text-xl text-gray-400">/100</span>
                    </div>
                    <Badge className={getScoreBadgeColor(scanResults?.compliance_breakdown?.lgpd?.score || 0)}>
                      {(scanResults?.compliance_breakdown?.lgpd?.score || 0) >= 80 ? 'Compliant' : 'Needs Improvement'}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Consent Basis</span>
                      <Badge variant={scanResults?.compliance_breakdown?.lgpd?.consent_basis ? 'default' : 'destructive'}>
                        {scanResults?.compliance_breakdown?.lgpd?.consent_basis ? 'Present' : 'Missing'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Data Controller</span>
                      <Badge variant={scanResults?.compliance_breakdown?.lgpd?.data_controller ? 'default' : 'destructive'}>
                        {scanResults?.compliance_breakdown?.lgpd?.data_controller ? 'Identified' : 'Missing'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Rights Notice</span>
                      <Badge variant={scanResults?.compliance_breakdown?.lgpd?.rights_notice ? 'default' : 'destructive'}>
                        {scanResults?.compliance_breakdown?.lgpd?.rights_notice ? 'Present' : 'Missing'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            {scanResults?.recommendations && scanResults.recommendations.length > 0 && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Zap className="w-6 h-6 text-orange-600" />
                    Compliance Recommendations
                  </CardTitle>
                  <CardDescription>
                    Priority actions to improve your compliance score and revenue potential
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scanResults.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${getSeverityColor(rec.severity)}`}></div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{rec.title}</h4>
                          <p className="text-gray-600 text-sm mb-2">{rec.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {rec.severity} priority
                            </Badge>
                            {rec.revenue_impact && (
                              <Badge variant="outline" className="text-xs text-green-600">
                                +{formatCurrency(rec.revenue_impact)} potential
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Scan Another Website
                </Button>
                <Button 
                  onClick={downloadReport}
                  size="lg"
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Full Report
                </Button>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Start Earning Revenue
                </Button>
              </div>
              <p className="text-sm text-gray-500 max-w-2xl mx-auto">
                Ready to turn your compliance into revenue? CookieBot.ai can help you earn up to 
                {formatCurrency(scanResults?.potential_earnings || 0)} per month while ensuring 100% compliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            🔍 Free Comprehensive Analysis
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Free Website Compliance Scanner
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get a comprehensive analysis of your website's compliance with GDPR, CCPA, and LGPD regulations. 
            Discover your revenue potential and receive actionable recommendations.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Search className="w-6 h-6" />
              Start Your Free Compliance Scan
            </CardTitle>
            <CardDescription>
              Enter your website details below to receive a comprehensive compliance analysis and revenue potential report
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleScan} className="space-y-6">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL *
                </label>
                <Input
                  type="text"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com or example.com"
                  className="text-lg py-3"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Enter your website URL (with or without https://)
                </p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="text-lg py-3"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  We'll send your detailed compliance report to this email address
                </p>
              </div>

              <Button
                type="submit"
                disabled={isScanning}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-4"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Your Website...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Start Free Compliance Scan
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                100% Free
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                No Credit Card
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Instant Results
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Multi-Regulation Analysis</h3>
            <p className="text-gray-600">
              Comprehensive compliance check for GDPR, CCPA, LGPD, and other major privacy regulations worldwide.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Eye className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Deep Cookie Analysis</h3>
            <p className="text-gray-600">
              Detailed breakdown of all cookies, tracking scripts, and third-party integrations found on your website.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Revenue Potential</h3>
            <p className="text-gray-600">
              Discover how much you could earn by turning your cookie consent into a revenue stream with our platform.
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-4">Trusted by 10,000+ websites worldwide</p>
          <div className="flex items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="text-sm">Global Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="text-sm">99.9% Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="text-sm">Real-time Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComplianceScanner

