import { Button } from './ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs.jsx'
import { Badge } from './ui/badge.jsx'
import { Input } from './ui/input.jsx'
import { Label } from './ui/label.jsx'
import { Switch } from './ui/switch.jsx'
import { Textarea } from './ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog.jsx'
import { Alert, AlertDescription } from './ui/alert.jsx'
import { Progress } from './ui/progress.jsx'
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { RefreshCw, TrendingUp, Users, MousePointer, DollarSign, Globe, Calendar, Download, CreditCard, Settings, CheckCircle, AlertCircle, Clock } from 'lucide-react'

// Enhanced Dashboard with Complete V3 Script Configuration + Phase 2 Analytics + Payment System
// INTEGRATED: Payment system components seamlessly added to existing working dashboard
// PRESERVED: All existing functionality including Phase 2 analytics and V3 script configuration

const EnhancedDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Phase 2: Real-time data states
  const [dashboardSummary, setDashboardSummary] = useState(null)
  const [selectedWebsite, setSelectedWebsite] = useState(null)
  const [websiteMetrics, setWebsiteMetrics] = useState(null)
  const [analyticsData, setAnalyticsData] = useState(null)
  const [dateRange, setDateRange] = useState({
    start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0]
  })
  const [granularity, setGranularity] = useState('daily')
  const [autoRefresh, setAutoRefresh] = useState(true)
  
  // Payment System States (NEW)
  const [user, setUser] = useState(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [payoutMethods, setPayoutMethods] = useState([])
  const [payoutHistory, setPayoutHistory] = useState([])
  const [usage, setUsage] = useState(null)
  const [adminStats, setAdminStats] = useState(null)
  
  // Enhanced Configuration State - Maps to V3 Script Attributes
  const [config, setConfig] = useState({
    // Basic Configuration
    clientId: 'your-client-id',
    companyName: 'Your Company',
    logoUrl: '',
    
    // Banner Configuration (V3 Enhanced)
    bannerPosition: 'bottom', // top, bottom, center
    bannerStyle: 'modern', // modern, classic, minimal
    theme: 'light', // light, dark, custom
    
    // Styling Configuration (NEW in V3)
    primaryColor: '#007bff',
    backgroundColor: '#ffffff',
    textColor: '#333333',
    borderRadius: '8px',
    
    // Compliance Configuration (V3 Enhanced)
    jurisdiction: 'gdpr', // gdpr, ccpa, lgpd, all
    autoBlock: true,
    granularConsent: true,
    declineButton: true,
    
    // Privacy Insights Configuration (V3 Enhanced)
    privacyInsights: true,
    insightsFrequency: 'daily', // daily, weekly, monthly
    revenueShare: 60, // 50%, 60%, 70%
    insightsTiming: 'after_consent', // immediate, after_consent, delayed
    insightsDuration: 30, // seconds
    
    // Advanced V3 Features
    customCss: '',
    buttonStyle: 'rounded', // rounded, square, pill
    animationStyle: 'slide', // slide, fade, bounce
    mobileOptimized: true,
    language: 'en',
    
    // Demo Data for Sales
    demoMode: false,
    demoVisitors: 1250,
    demoConsentRate: 78,
    demoRevenue: 156.78
  })

  // Websites state for demo
  const [websites, setWebsites] = useState([
    {
      id: 1,
      domain: 'example.com',
      status: 'active',
      visitors_today: 1250,
      consent_rate: 78.5,
      revenue_today: 156.78,
      integration_code: 'CB_12345'
    },
    {
      id: 2,
      domain: 'shop.example.com',
      status: 'active',
      visitors_today: 890,
      consent_rate: 82.1,
      revenue_today: 234.56,
      integration_code: 'CB_67890'
    }
  ])

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
      fetchUserData()
      fetchPaymentData()
      fetchUsage()
      if (activeTab === 'analytics') {
        fetchDashboardData()
      }
    }
  }, [])

  // Auto-refresh for Phase 2 analytics
  useEffect(() => {
    let interval
    if (autoRefresh && activeTab === 'analytics' && isAuthenticated) {
      interval = setInterval(() => {
        fetchDashboardData()
      }, 30000) // Refresh every 30 seconds
    }
    return () => clearInterval(interval)
  }, [autoRefresh, activeTab, isAuthenticated])

  // Payment System Functions (NEW)
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/user/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const userData = await response.json()
      setUser(userData)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const fetchPaymentData = async () => {
    try {
      const token = localStorage.getItem('token')
      
      const [methodsRes, historyRes] = await Promise.all([
        fetch('/api/payments/payout-methods', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/payments/payout-history', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ])

      const methodsData = await methodsRes.json()
      const historyData = await historyRes.json()

      setPayoutMethods(methodsData.payout_methods || [])
      setPayoutHistory(historyData.payouts || [])
    } catch (error) {
      console.error('Error fetching payment data:', error)
    }
  }

  const fetchUsage = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/usage/current', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setUsage(data)
    } catch (error) {
      console.error('Error fetching usage:', error)
    }
  }

  const fetchAdminStats = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/dashboard-stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setAdminStats(data)
    } catch (error) {
      console.error('Error fetching admin stats:', error)
    }
  }

  const handleUpgrade = async (planName) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/billing/create-subscription', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          plan_name: planName,
          payment_method_id: 'pm_card_visa' // This would come from Stripe Elements
        })
      })

      if (response.ok) {
        const data = await response.json()
        alert('Subscription created successfully!')
        fetchUserData()
        setShowUpgradeModal(false)
      } else {
        const error = await response.json()
        alert(`Upgrade failed: ${error.error}`)
      }
    } catch (error) {
      console.error('Upgrade failed:', error)
      alert('Upgrade failed')
    }
  }

  const requestPayout = async () => {
    if (!user?.revenue_balance || user.revenue_balance < 50) {
      alert('Minimum payout amount is $50.00')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/payments/request-payout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: user.revenue_balance })
      })

      if (response.ok) {
        alert('Payout requested successfully!')
        fetchPaymentData()
        fetchUserData()
      } else {
        const error = await response.json()
        alert(`Payout failed: ${error.error}`)
      }
    } catch (error) {
      console.error('Payout request failed:', error)
      alert('Payout request failed')
    }
  }

  // Phase 2: Enhanced data fetching functions
  const fetchDashboardData = async () => {
    if (!isAuthenticated) return
    
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      
      // Fetch dashboard summary
      const summaryResponse = await fetch('/api/analytics/dashboard-summary', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const summaryData = await summaryResponse.json()
      setDashboardSummary(summaryData)
      
      // If a website is selected, fetch its metrics
      if (selectedWebsite) {
        const metricsResponse = await fetch(`/api/analytics/website-metrics?website_id=${selectedWebsite}&start_date=${dateRange.start_date}&end_date=${dateRange.end_date}&granularity=${granularity}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const metricsData = await metricsResponse.json()
        setWebsiteMetrics(metricsData)
        
        const analyticsResponse = await fetch(`/api/analytics/detailed?website_id=${selectedWebsite}&start_date=${dateRange.start_date}&end_date=${dateRange.end_date}&granularity=${granularity}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const analyticsDataResponse = await analyticsResponse.json()
        setAnalyticsData(analyticsDataResponse)
      }
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  // Generate V3 Script with ALL Configuration Options
  const generateV3Script = () => {
    return `<!-- CookieBot.ai V3 Enhanced Script -->
<script>
(function() {
  window.CookieBotAI = {
    // Basic Configuration
    clientId: '${config.clientId}',
    companyName: '${config.companyName}',
    logoUrl: '${config.logoUrl}',
    
    // Banner Configuration (V3 Enhanced)
    bannerPosition: '${config.bannerPosition}',
    bannerStyle: '${config.bannerStyle}',
    theme: '${config.theme}',
    
    // Styling Configuration (NEW in V3)
    primaryColor: '${config.primaryColor}',
    backgroundColor: '${config.backgroundColor}',
    textColor: '${config.textColor}',
    borderRadius: '${config.borderRadius}',
    
    // Compliance Configuration (V3 Enhanced)
    jurisdiction: '${config.jurisdiction}',
    autoBlock: ${config.autoBlock},
    granularConsent: ${config.granularConsent},
    declineButton: ${config.declineButton},
    
    // Privacy Insights Configuration (V3 Enhanced)
    privacyInsights: ${config.privacyInsights},
    insightsFrequency: '${config.insightsFrequency}',
    revenueShare: ${config.revenueShare},
    insightsTiming: '${config.insightsTiming}',
    insightsDuration: ${config.insightsDuration},
    
    // Advanced V3 Features
    customCss: \`${config.customCss}\`,
    buttonStyle: '${config.buttonStyle}',
    animationStyle: '${config.animationStyle}',
    mobileOptimized: ${config.mobileOptimized},
    language: '${config.language}',
    
    // Demo Mode (for sales presentations)
    demoMode: ${config.demoMode},
    demoVisitors: ${config.demoVisitors},
    demoConsentRate: ${config.demoConsentRate},
    demoRevenue: ${config.demoRevenue}
  };
  
  // Load the enhanced V3 script
  var script = document.createElement('script');
  script.src = 'https://cdn.cookiebot-ai.com/v3/enhanced.js';
  script.async = true;
  document.head.appendChild(script);
})();
</script>`
  }

  // Helper functions for payment system
  const getPlanDetails = (tier) => {
    const plans = {
      free: { name: 'Free', price: 0, websites: 1, share: 0, color: 'gray' },
      starter: { name: 'Starter', price: 19, websites: 3, share: 50, color: 'blue' },
      professional: { name: 'Professional', price: 49, websites: 10, share: 60, color: 'purple' },
      enterprise: { name: 'Enterprise', price: 149, websites: '∞', share: 70, color: 'green' }
    }
    return plans[tier] || plans.free
  }

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'secondary',
      processing: 'default',
      completed: 'default',
      failed: 'destructive'
    }
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>
  }

  // Check if user is admin
  const isAdmin = user?.is_admin

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Login Required</CardTitle>
            <CardDescription>Please log in to access the dashboard</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">CookieBot.ai Dashboard</h1>
        <p className="text-gray-600">Complete privacy compliance and revenue optimization platform</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="websites">Websites</TabsTrigger>
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          {isAdmin && <TabsTrigger value="admin">Admin</TabsTrigger>}
        </TabsList>

        {/* Analytics Tab - Phase 2 Enhanced */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Real-Time Analytics</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={autoRefresh}
                  onCheckedChange={setAutoRefresh}
                />
                <Label>Auto-refresh</Label>
              </div>
              <Button onClick={fetchDashboardData} disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          {/* Website Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Website</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedWebsite} onValueChange={setSelectedWebsite}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Choose a website" />
                </SelectTrigger>
                <SelectContent>
                  {websites.map((website) => (
                    <SelectItem key={website.id} value={website.id.toString()}>
                      {website.domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Dashboard Summary */}
          {dashboardSummary && (
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{dashboardSummary.total_visitors?.toLocaleString() || '0'}</p>
                      <p className="text-sm text-gray-600">Total Visitors</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <MousePointer className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">{dashboardSummary.consent_rate?.toFixed(1) || '0'}%</p>
                      <p className="text-sm text-gray-600">Consent Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">${dashboardSummary.total_revenue?.toFixed(2) || '0.00'}</p>
                      <p className="text-sm text-gray-600">Total Revenue</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold">{dashboardSummary.active_websites || '0'}</p>
                      <p className="text-sm text-gray-600">Active Websites</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Analytics Charts */}
          {analyticsData && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visitor Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData.visitor_trends || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="visitors" stroke="#8884d8" />
                      <Line type="monotone" dataKey="consents" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={analyticsData.revenue_trends || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="revenue" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analyticsData.event_types || []}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {(analyticsData.event_types || []).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hourly Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData.hourly_breakdown || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="events" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Revenue Tab - Enhanced with Payout Management */}
        <TabsContent value="revenue" className="space-y-6">
          <h2 className="text-2xl font-bold">Revenue & Payouts</h2>
          
          {/* Balance Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Your Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-green-600">${user?.revenue_balance?.toFixed(2) || '0.00'}</p>
                  <p className="text-sm text-gray-600">Available Balance</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold">$0.00</p>
                  <p className="text-sm text-gray-600">Pending Payouts</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold">
                    ${payoutHistory.filter(p => p.status === 'completed').reduce((sum, p) => sum + parseFloat(p.amount), 0).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">Total Paid Out</p>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <Button 
                  onClick={requestPayout}
                  disabled={!user?.revenue_balance || user.revenue_balance < 50}
                >
                  Request Payout
                </Button>
                <Button variant="outline">
                  Setup Payout Method
                </Button>
              </div>

              {user?.revenue_balance < 50 && (
                <Alert className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Minimum payout amount is $50.00. You need ${(50 - (user?.revenue_balance || 0)).toFixed(2)} more to request a payout.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Payout History */}
          <Card>
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
              <CardDescription>Track your payment history</CardDescription>
            </CardHeader>
            <CardContent>
              {payoutHistory.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">No payouts yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {payoutHistory.map((payout) => (
                    <div key={payout.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">${parseFloat(payout.amount).toFixed(2)}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(payout.requested_at).toLocaleDateString()} • {payout.provider}
                        </p>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(payout.status)}
                        {payout.status === 'completed' && (
                          <p className="text-sm text-gray-600 mt-1">
                            Net: ${parseFloat(payout.net_amount).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Websites Tab */}
        <TabsContent value="websites" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Websites</h2>
            <Button>Add Website</Button>
          </div>

          <div className="grid gap-4">
            {websites.map((website) => (
              <Card key={website.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{website.domain}</h3>
                      <p className="text-sm text-gray-600">Integration Code: {website.integration_code}</p>
                    </div>
                    <Badge variant={website.status === 'active' ? 'default' : 'secondary'}>
                      {website.status}
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <p className="text-xl font-bold">{website.visitors_today}</p>
                      <p className="text-sm text-gray-600">Visitors Today</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <p className="text-xl font-bold">{website.consent_rate}%</p>
                      <p className="text-sm text-gray-600">Consent Rate</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <p className="text-xl font-bold">${website.revenue_today}</p>
                      <p className="text-sm text-gray-600">Revenue Today</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Configuration Tab */}
        <TabsContent value="config" className="space-y-6">
          <h2 className="text-2xl font-bold">V3 Script Configuration</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="clientId">Client ID</Label>
                  <Input
                    id="clientId"
                    value={config.clientId}
                    onChange={(e) => setConfig({...config, clientId: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={config.companyName}
                    onChange={(e) => setConfig({...config, companyName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="logoUrl">Logo URL</Label>
                  <Input
                    id="logoUrl"
                    value={config.logoUrl}
                    onChange={(e) => setConfig({...config, logoUrl: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Banner Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Banner Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="bannerPosition">Position</Label>
                  <Select value={config.bannerPosition} onValueChange={(value) => setConfig({...config, bannerPosition: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bannerStyle">Style</Label>
                  <Select value={config.bannerStyle} onValueChange={(value) => setConfig({...config, bannerStyle: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={config.theme} onValueChange={(value) => setConfig({...config, theme: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Styling Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Styling</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <Input
                    id="primaryColor"
                    type="color"
                    value={config.primaryColor}
                    onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="backgroundColor">Background Color</Label>
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={config.backgroundColor}
                    onChange={(e) => setConfig({...config, backgroundColor: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="textColor">Text Color</Label>
                  <Input
                    id="textColor"
                    type="color"
                    value={config.textColor}
                    onChange={(e) => setConfig({...config, textColor: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Insights Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Privacy Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="privacyInsights"
                    checked={config.privacyInsights}
                    onCheckedChange={(checked) => setConfig({...config, privacyInsights: checked})}
                  />
                  <Label htmlFor="privacyInsights">Enable Privacy Insights</Label>
                </div>
                <div>
                  <Label htmlFor="revenueShare">Revenue Share (%)</Label>
                  <Select value={config.revenueShare.toString()} onValueChange={(value) => setConfig({...config, revenueShare: parseInt(value)})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50">50%</SelectItem>
                      <SelectItem value="60">60%</SelectItem>
                      <SelectItem value="70">70%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="insightsFrequency">Frequency</Label>
                  <Select value={config.insightsFrequency} onValueChange={(value) => setConfig({...config, insightsFrequency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Generated Script */}
          <Card>
            <CardHeader>
              <CardTitle>Generated V3 Script</CardTitle>
              <CardDescription>Copy this script to your website</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generateV3Script()}
                readOnly
                className="min-h-[300px] font-mono text-sm"
              />
              <div className="flex gap-2 mt-4">
                <Button onClick={() => navigator.clipboard.writeText(generateV3Script())}>
                  Copy Script
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <h2 className="text-2xl font-bold">Compliance Management</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Compliance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="jurisdiction">Jurisdiction</Label>
                <Select value={config.jurisdiction} onValueChange={(value) => setConfig({...config, jurisdiction: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gdpr">GDPR (EU)</SelectItem>
                    <SelectItem value="ccpa">CCPA (California)</SelectItem>
                    <SelectItem value="lgpd">LGPD (Brazil)</SelectItem>
                    <SelectItem value="all">All Jurisdictions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="autoBlock"
                  checked={config.autoBlock}
                  onCheckedChange={(checked) => setConfig({...config, autoBlock: checked})}
                />
                <Label htmlFor="autoBlock">Auto-block tracking until consent</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="granularConsent"
                  checked={config.granularConsent}
                  onCheckedChange={(checked) => setConfig({...config, granularConsent: checked})}
                />
                <Label htmlFor="granularConsent">Granular consent categories</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="declineButton"
                  checked={config.declineButton}
                  onCheckedChange={(checked) => setConfig({...config, declineButton: checked})}
                />
                <Label htmlFor="declineButton">Show decline button</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab - NEW */}
        <TabsContent value="billing" className="space-y-6">
          <h2 className="text-2xl font-bold">Billing & Subscription</h2>
          
          {/* Subscription Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Your Subscription
              </CardTitle>
              <CardDescription>Manage your billing and subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Plan */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getPlanDetails(user?.subscription_tier).color}>
                      {getPlanDetails(user?.subscription_tier).name}
                    </Badge>
                    {user?.subscription_status === 'active' && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {user?.subscription_status === 'past_due' && <AlertCircle className="h-4 w-4 text-red-500" />}
                  </div>
                  <p className="text-2xl font-bold">${getPlanDetails(user?.subscription_tier).price}/month</p>
                  <p className="text-sm text-gray-600">
                    {getPlanDetails(user?.subscription_tier).websites} websites • {getPlanDetails(user?.subscription_tier).share}% revenue share
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Next billing</p>
                  <p className="font-medium">{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Usage Stats */}
              {usage && (
                <div className="space-y-4">
                  <h4 className="font-medium">This Month's Usage</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Websites</span>
                        <span>{usage.usage?.websites_used || 0}/{usage.limits?.website_limit || getPlanDetails(user?.subscription_tier).websites}</span>
                      </div>
                      <Progress 
                        value={((usage.usage?.websites_used || 0) / (usage.limits?.website_limit || getPlanDetails(user?.subscription_tier).websites)) * 100} 
                        className="h-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>API Calls</span>
                        <span>{usage.usage?.api_calls_used || 0}/{usage.limits?.api_call_limit || 100000}</span>
                      </div>
                      <Progress 
                        value={((usage.usage?.api_calls_used || 0) / (usage.limits?.api_call_limit || 100000)) * 100} 
                        className="h-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Support Tickets</span>
                        <span>{usage.usage?.support_tickets_used || 0}/{usage.limits?.support_ticket_limit || 5}</span>
                      </div>
                      <Progress 
                        value={((usage.usage?.support_tickets_used || 0) / (usage.limits?.support_ticket_limit || 5)) * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Upgrade Prompt */}
              {user?.subscription_tier !== 'enterprise' && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900">Ready to earn more?</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Upgrade to get higher revenue share and more features
                  </p>
                  <Button onClick={() => setShowUpgradeModal(true)} size="sm">
                    Upgrade Plan
                  </Button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Billing
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Live Preview</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Desktop</Button>
              <Button variant="outline" size="sm">Tablet</Button>
              <Button variant="outline" size="sm">Mobile</Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <iframe
                src="data:text/html;charset=utf-8,<!DOCTYPE html><html><head><title>Preview</title></head><body><h1>CookieBot.ai Preview</h1><p>Your enhanced V3 script will appear here</p><script>" + encodeURIComponent(generateV3Script()) + "</script></body></html>"
                className="w-full h-96 border-0"
                title="CookieBot.ai Preview"
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admin Tab - NEW */}
        {isAdmin && (
          <TabsContent value="admin" className="space-y-6">
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            
            {/* Admin Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{adminStats?.user_stats?.total_users || 0}</p>
                      <p className="text-sm text-gray-600">Total Users</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">{adminStats?.user_stats?.paid_users || 0}</p>
                      <p className="text-sm text-gray-600">Paid Users</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">$0</p>
                      <p className="text-sm text-gray-600">Monthly Revenue</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold">$0</p>
                      <p className="text-sm text-gray-600">Total Payouts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>System Overview</CardTitle>
                <CardDescription>Monitor platform performance and user activity</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Admin features will be available here</p>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {/* Plan Upgrade Modal */}
      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Upgrade Your Plan</DialogTitle>
            <DialogDescription>
              Choose a plan that fits your needs and start earning more
            </DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {[
              {
                name: 'starter',
                title: 'Starter',
                price: 19,
                websites: 3,
                share: 50,
                features: ['Privacy Insights', 'Basic Analytics', 'Email Support'],
                popular: false
              },
              {
                name: 'professional',
                title: 'Professional',
                price: 49,
                websites: 10,
                share: 60,
                features: ['Everything in Starter', 'Custom Branding', 'Priority Support', 'Advanced Analytics'],
                popular: true
              },
              {
                name: 'enterprise',
                title: 'Enterprise',
                price: 149,
                websites: '∞',
                share: 70,
                features: ['Everything in Professional', 'White-label Solution', 'API Access', 'Dedicated Support'],
                popular: false
              }
            ].map((plan) => (
              <Card 
                key={plan.name}
                className={`cursor-pointer transition-all ${plan.popular ? 'border-blue-500' : ''}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{plan.title}</CardTitle>
                    {plan.popular && <Badge>Popular</Badge>}
                  </div>
                  <div className="text-3xl font-bold">${plan.price}<span className="text-sm font-normal">/month</span></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Websites</span>
                      <span className="font-medium">{plan.websites}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue Share</span>
                      <span className="font-medium">{plan.share}%</span>
                    </div>
                  </div>
                  <ul className="space-y-1 text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-4"
                    onClick={() => handleUpgrade(plan.name)}
                  >
                    Choose {plan.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setShowUpgradeModal(false)}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EnhancedDashboard

