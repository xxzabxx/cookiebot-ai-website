import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext'; // NEW: central auth
import {
  Button, Card, CardContent, CardDescription, CardHeader, CardTitle,
  Tabs, TabsContent, TabsList, TabsTrigger,
  Badge, Input, Label, Switch, Textarea,
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
  Alert, AlertDescription, Progress
} from './ui'; // OPTIONAL: adjust if you import individually
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  RefreshCw, TrendingUp, Users, MousePointer, DollarSign, Globe, CreditCard,
  CheckCircle, AlertCircle, Clock, Crown
} from 'lucide-react';

/**
 * CONFIG
 */
const API_BASE = 'https://cookiebot-ai-backend-production.up.railway.app/api';

/**
 * Safe JSON parse for plan.features
 */
const safeParse = (val, fallback) => {
  try {
    if (typeof val === 'string') return JSON.parse(val);
    if (Array.isArray(val)) return val;
    return fallback;
  } catch {
    return fallback;
  }
};

/**
 * Currency / percentage helpers
 */
const formatCurrency = (value = 0) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
const formatPercentage = (value = 0) => `${Number(value).toFixed(1)}%`;

/**
 * Centralized fetch helpers (GET / POST)
 */
async function apiRequest(path, { method = 'GET', body, token, signal } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const resp = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    signal
  });
  let json;
  try {
    json = await resp.json();
  } catch {
    json = null;
  }
  if (!resp.ok) {
    const msg =
      json?.error?.message ||
      json?.message ||
      json?.error ||
      `Request failed (${resp.status})`;
    throw new Error(msg);
  }
  return json;
}
const apiGet = (path, opts) => apiRequest(path, { ...opts, method: 'GET' });
const apiPost = (path, body, opts) => apiRequest(path, { ...opts, method: 'POST', body });

/**
 * Demo (unauth) data
 */
const demoData = {
  revenue: 2847.32,
  visitors: 125430,
  consent_rate: 78.5,
  websites: 12,
  recentActivity: [
    { date: '2025-07-09', visitors: 1890, consents: 1420, revenue: 74.2 },
    { date: '2025-07-08', visitors: 1720, consents: 1380, revenue: 67.8 },
    { date: '2025-07-07', visitors: 1650, consents: 1250, revenue: 61.3 }
  ],
  hourly_breakdown: [
    { hour: 0, visitors: 45, consents: 32, revenue: 1.6 },
    { hour: 1, visitors: 23, consents: 18, revenue: 0.9 },
    { hour: 2, visitors: 12, consents: 8, revenue: 0.4 },
    { hour: 3, visitors: 8, consents: 5, revenue: 0.25 },
    { hour: 4, visitors: 15, consents: 10, revenue: 0.5 },
    { hour: 5, visitors: 28, consents: 20, revenue: 1.0 },
    { hour: 6, visitors: 67, consents: 48, revenue: 2.4 },
    { hour: 7, visitors: 134, consents: 98, revenue: 4.9 },
    { hour: 8, visitors: 189, consents: 142, revenue: 7.1 },
    { hour: 9, visitors: 234, consents: 178, revenue: 8.9 },
    { hour: 10, visitors: 267, consents: 201, revenue: 10.05 },
    { hour: 11, visitors: 298, consents: 225, revenue: 11.25 }
  ],
  event_types: [
    { type: 'page_view', count: 1250, revenue: 12.5 },
    { type: 'consent_given', count: 890, revenue: 44.5 },
    { type: 'privacy_insight_click', count: 67, revenue: 10.05 },
    { type: 'form_submission', count: 34, revenue: 3.4 },
    { type: 'newsletter_signup', count: 23, revenue: 1.84 }
  ]
};

const colors = ['#007bff', '#28a745', '#ffc107', '#dc3545', '#17a2b8'];

const EnhancedDashboard = () => {
  const {
    user,
    isAuthenticated,
    authToken,        // ensure AuthContext exposes this (or derive from localStorage)
    error: authError,
    clearError
  } = useAuth();

  // UI / control state
  const [activeTab, setActiveTab] = useState('analytics');
  const [loading, setLoading] = useState(false);          // main analytics fetch
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [uiError, setUiError] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Data state
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [websiteMetrics, setWebsiteMetrics] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null); // reserved (granular analytics)
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [payoutMethods, setPayoutMethods] = useState([]);
  const [payoutHistory, setPayoutHistory] = useState([]);
  const [usage, setUsage] = useState(null);

  // Date & granularity
  const [dateRange, setDateRange] = useState({
    start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0]
  });
  const [granularity, setGranularity] = useState('daily');

  // Config for script
  const [config, setConfig] = useState({
    clientId: 'your-client-id',
    companyName: 'Your Company',
    logoUrl: '',
    bannerPosition: 'bottom',
    bannerStyle: 'modern',
    theme: 'light',
    primaryColor: '#007bff',
    backgroundColor: '#ffffff',
    textColor: '#333333',
    borderRadius: '8px',
    buttonStyle: 'default',
    jurisdiction: 'auto',
    autoBlock: true,
    granularConsent: true,
    showDeclineButton: true,
    consentExpiry: 365,
    enablePrivacyInsights: true,
    privacyInsightsFrequency: 3,
    privacyWidgetDelay: 3000,
    privacyWidgetDuration: 15000,
    revenueShare: 0.6,
    language: 'auto',
    compliance: {
      gdpr: true,
      ccpa: true,
      lgpd: false
    }
  });

  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [generatedScript, setGeneratedScript] = useState('');

  /**
   * Derived aggregated data
   */
  const currentData = useMemo(() => {
    if (isAuthenticated) {
      // combine dashboardSummary fallback
      return dashboardSummary || {
        revenue: 0, visitors: 0, consent_rate: 0, websites: [],
        recentActivity: []
      };
    }
    // demo
    return {
      ...demoData,
      websites: [{ id: 'demo', domain: 'demo-site.com', status: 'active' }]
    };
  }, [isAuthenticated, dashboardSummary]);

  const currentMetrics = useMemo(() => {
    if (isAuthenticated && websiteMetrics) {
      return {
        today_metrics: websiteMetrics.today_metrics || {},
        hourly_breakdown: websiteMetrics.hourly_breakdown || [],
        event_types: websiteMetrics.event_types || []
      };
    }
    // demo fallback
    return {
      today_metrics: {
        unique_visitors: demoData.visitors,
        consent_rate: demoData.consent_rate,
        total_revenue: demoData.revenue,
        privacy_clicks: 67
      },
      hourly_breakdown: demoData.hourly_breakdown,
      event_types: demoData.event_types
    };
  }, [isAuthenticated, websiteMetrics]);

  /**
   * Script generation
   */
  const generateScript = useCallback(() => {
    const attrs = {
      src: `${API_BASE.replace(/\/api$/, '')}/static/enhanced_cookiebot_ai_v3.js`,
      'data-cbid': config.clientId,
      'data-api-endpoint': API_BASE,
      'data-company-name': config.companyName,
      'data-logo-url': config.logoUrl || undefined,
      'data-banner-position': config.bannerPosition,
      'data-banner-style': config.bannerStyle,
      'data-theme': config.theme,
      'data-primary-color': config.primaryColor,
      'data-background-color': config.backgroundColor,
      'data-text-color': config.textColor,
      'data-border-radius': config.borderRadius,
      'data-button-style': config.buttonStyle,
      'data-jurisdiction': config.jurisdiction,
      'data-auto-block': config.autoBlock,
      'data-granular-consent': config.granularConsent,
      'data-show-decline-button': config.showDeclineButton,
      'data-consent-expiry': config.consentExpiry,
      'data-enable-privacy-insights': config.enablePrivacyInsights,
      'data-privacy-insights-frequency': config.privacyInsightsFrequency,
      'data-privacy-widget-delay': config.privacyWidgetDelay,
      'data-privacy-widget-duration': config.privacyWidgetDuration,
      'data-revenue-share': config.revenueShare,
      'data-language': config.language
    };

    const attrString = Object.entries(attrs)
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${k}="${String(v)}"`)
      .join('\n        ');

    return `<script ${attrString}>\n</script>`;
  }, [config]);

  useEffect(() => {
    setGeneratedScript(generateScript());
  }, [generateScript]);

  /**
   * API loaders (using helpers)
   */
  const loadDashboardSummary = useCallback(async () => {
    if (!authToken) return;
    setLoading(true);
    try {
      const data = await apiGet('/user/dashboard-summary', { token: authToken });
      setDashboardSummary(data);
      if (!selectedWebsite && data.websites?.length) {
        setSelectedWebsite(data.websites[0]);
      }
    } catch (e) {
      setUiError(e.message);
    } finally {
      setLoading(false);
    }
  }, [authToken, selectedWebsite]);

  const loadWebsiteMetrics = useCallback(async (websiteId) => {
    if (!authToken || !websiteId) return;
    try {
      const data = await apiGet(`/websites/${websiteId}/metrics`, { token: authToken });
      setWebsiteMetrics(data);
    } catch (e) {
      setUiError(e.message);
    }
  }, [authToken]);

  const loadAnalyticsData = useCallback(async (websiteId) => {
    if (!authToken || !websiteId) return;
    try {
      const params = new URLSearchParams({
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
        granularity
      }).toString();
      const data = await apiGet(`/websites/${websiteId}/analytics?${params}`, { token: authToken });
      setAnalyticsData(data);
    } catch (e) {
      // optional; not critical
    }
  }, [authToken, dateRange, granularity]);

  const loadUserProfile = useCallback(async () => {
    if (!authToken) return;
    try {
      const data = await apiGet('/auth/me', { token: authToken });
      // Assuming backend returns { user: {...} }
      setCurrentSubscription({
        tier: data.user?.subscription_tier,
        status: data.user?.subscription_status || 'active'
      });
    } catch (e) {
      setUiError(e.message);
    }
  }, [authToken]);

  const loadSubscriptionPlans = useCallback(async () => {
    try {
      const data = await apiGet('/billing/plans');
      setSubscriptionPlans(data.plans || []);
    } catch (e) {
      setUiError(e.message);
    }
  }, []);

  const loadPayoutMethods = useCallback(async () => {
    if (!authToken) return;
    try {
      const data = await apiGet('/payments/payout-methods', { token: authToken });
      setPayoutMethods(data.payout_methods || []);
    } catch (e) {
      setUiError(e.message);
    }
  }, [authToken]);

  const loadPayoutHistory = useCallback(async () => {
    if (!authToken) return;
    try {
      const data = await apiGet('/payments/payout-history', { token: authToken });
      setPayoutHistory(data.payouts || []);
    } catch (e) {
      setUiError(e.message);
    }
  }, [authToken]);

  const loadUsage = useCallback(async () => {
    if (!authToken) return;
    try {
      const data = await apiGet('/usage/current', { token: authToken });
      setUsage(data);
    } catch (e) {
      // silent optional
    }
  }, [authToken]);

  const handleUpgrade = async (planName) => {
    if (!authToken) return;
    setPaymentLoading(true);
    try {
      await apiPost('/billing/create-subscription', {
        plan_name: planName,
        payment_method_id: 'pm_card_visa'
      }, { token: authToken });

      setCurrentSubscription({ tier: planName, status: 'active' });
      setShowUpgradeModal(false);
      loadUserProfile();
    } catch (e) {
      setUiError(e.message);
    } finally {
      setPaymentLoading(false);
    }
  };

  const requestPayout = async (amount) => {
    if (!authToken) return;
    setPaymentLoading(true);
    try {
      await apiPost('/payments/request-payout', { amount }, { token: authToken });
      loadUserProfile();
      loadPayoutHistory();
    } catch (e) {
      setUiError(e.message);
    } finally {
      setPaymentLoading(false);
    }
  };

  /**
   * Initial load after auth becomes available
   */
  useEffect(() => {
    if (isAuthenticated && authToken) {
      loadUserProfile();
      loadSubscriptionPlans();
      loadPayoutMethods();
      loadPayoutHistory();
      loadUsage();
      loadDashboardSummary();
    }
  }, [
    isAuthenticated,
    authToken,
    loadUserProfile,
    loadSubscriptionPlans,
    loadPayoutMethods,
    loadUsage,
    loadPayoutHistory,
    loadDashboardSummary
  ]);

  /**
   * Auto refresh loop (30s) for analytics
   */
  useEffect(() => {
    if (!autoRefresh || !isAuthenticated) return;
    const id = setInterval(() => {
      if (activeTab === 'analytics') {
        loadDashboardSummary();
        if (selectedWebsite) loadWebsiteMetrics(selectedWebsite.id);
      }
    }, 30000);
    return () => clearInterval(id);
  }, [autoRefresh, isAuthenticated, activeTab, selectedWebsite, loadDashboardSummary, loadWebsiteMetrics]);

  /**
   * When website selection changes
   */
  const handleWebsiteSelect = (website) => {
    setSelectedWebsite(website);
    loadWebsiteMetrics(website.id);
    loadAnalyticsData(website.id);
  };

  /**
   * Script copy / download
   */
  const copyScript = async () => {
    try {
      await navigator.clipboard.writeText(generatedScript);
    } catch {
      setUiError('Failed to copy script');
    }
  };

  const downloadScript = () => {
    const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>CookieBot.ai Integration</title>
${generatedScript}
</head><body><h1>CookieBot.ai Integration</h1><p>The banner loads automatically.</p></body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cookiebot-ai-integration.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  /**
   * Live Preview (iframe)
   */
  const LivePreview = () => {
    const deviceClass =
      previewDevice === 'mobile' ? 'w-80 h-96'
        : previewDevice === 'tablet' ? 'w-96 h-80'
          : 'w-full h-96';

    const previewHTML = `<!DOCTYPE html><html><head><meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0" />
<title>CookieBot.ai Preview</title>
<style>
 body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
 background:linear-gradient(135deg,#667eea,#764ba2);min-height:100vh;
 display:flex;align-items:center;justify-content:center;padding:20px;}
 .preview-content{background:#fff;padding:40px;border-radius:12px;max-width:520px;
 box-shadow:0 10px 30px rgba(0,0,0,.2);text-align:center;}
 .features{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:20px;margin-top:30px;}
 .feature{background:#f8f9fa;padding:15px;border-radius:8px;font-size:14px;}
 .config-info{margin-top:20px;padding:15px;background:#e3f2fd;border-radius:8px;font-size:12px;color:#1565c0;}
</style>
</head><body>
  <div class="preview-content">
    <div style="font-size:48px;margin-bottom:20px;">🍪</div>
    <h1>${config.companyName}</h1>
    <p>Preview of your CookieBot.ai consent experience.</p>
    <p>Banner & Privacy Insights load with your settings.</p>
    <div class="features">
      <div class="feature"><strong>🛡️ Compliant</strong><br>${config.jurisdiction.toUpperCase()} Ready</div>
      <div class="feature"><strong>💰 Revenue</strong><br>${config.enablePrivacyInsights ? config.revenueShare * 100 + '% Share' : 'Disabled'}</div>
      <div class="feature"><strong>🎨 Theme</strong><br>${config.theme}</div>
      <div class="feature"><strong>📱 Responsive</strong><br>All Devices</div>
    </div>
    <div class="config-info">
      Position: ${config.bannerPosition} • Style: ${config.bannerStyle} • Insights: ${config.enablePrivacyInsights ? 'On' : 'Off'}
    </div>
  </div>
  <script src="${API_BASE.replace(/\/api$/, '')}/static/enhanced_cookiebot_ai_v3.js"
    data-cbid="${config.clientId}"
    data-api-endpoint="${API_BASE}"
    data-company-name="${config.companyName}"
    ${config.logoUrl ? `data-logo-url="${config.logoUrl}"` : ''}
    data-banner-position="${config.bannerPosition}"
    data-banner-style="${config.bannerStyle}"
    data-theme="${config.theme}"
    data-primary-color="${config.primaryColor}"
    data-background-color="${config.backgroundColor}"
    data-text-color="${config.textColor}"
    data-border-radius="${config.borderRadius}"
    data-button-style="${config.buttonStyle}"
    data-jurisdiction="${config.jurisdiction}"
    data-auto-block="${config.autoBlock}"
    data-granular-consent="${config.granularConsent}"
    data-show-decline-button="${config.showDeclineButton}"
    data-consent-expiry="${config.consentExpiry}"
    data-enable-privacy-insights="${config.enablePrivacyInsights}"
    data-privacy-insights-frequency="${config.privacyInsightsFrequency}"
    data-privacy-widget-delay="${config.privacyWidgetDelay}"
    data-privacy-widget-duration="${config.privacyWidgetDuration}"
    data-revenue-share="${config.revenueShare}"
    data-language="${config.language}"></script>
</body></html>`;

    return (
      <div className="relative bg-gray-100 rounded-lg overflow-hidden min-h-[400px]">
        <div className={`mx-auto ${deviceClass} bg-white relative overflow-hidden border rounded-lg`}>
          <iframe
            title="Cookie Banner Preview"
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            srcDoc={previewHTML}
          />
        </div>
      </div>
    );
  };

  /**
   * UI helpers
   */
  const dismissError = () => {
    setUiError(null);
    if (authError && clearError) clearError();
  };

  /**
   * Safe plan feature list
   */
  const renderPlanFeatures = (plan) => {
    const feats = safeParse(plan.features, []);
    return feats.map((feature, i) => (
      <div key={i} className="flex items-center">
        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
        <span>{feature}</span>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-24">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CookieBot.ai Dashboard</h1>
              <p className="text-gray-600 mt-1">
                {isAuthenticated
                  ? 'Manage your websites and track performance'
                  : 'Experience the power of CookieBot.ai'}
              </p>
              {!isAuthenticated && (
                <Badge className="mt-2 bg-blue-100 text-blue-800">
                  Demo Mode - Sign in for real data
                </Badge>
              )}
            </div>

            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={autoRefresh}
                    onCheckedChange={setAutoRefresh}
                    id="auto-refresh"
                  />
                  <Label htmlFor="auto-refresh" className="text-sm">Auto-refresh</Label>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={loading}
                  onClick={() => {
                    loadDashboardSummary();
                    if (selectedWebsite) loadWebsiteMetrics(selectedWebsite.id);
                  }}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            )}

            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Enhanced v3.0 + Phase 2 + Payments
            </Badge>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 gap-1">
            <TabsTrigger value="analytics" className="text-xs md:text-sm px-2">Analytics</TabsTrigger>
            <TabsTrigger value="revenue" className="text-xs md:text-sm px-2">Revenue</TabsTrigger>
            <TabsTrigger value="websites" className="text-xs md:text-sm px-2">Websites</TabsTrigger>
            <TabsTrigger value="billing" className="text-xs md:text-sm px-2">Billing</TabsTrigger>
            <TabsTrigger value="configuration" className="text-xs md:text-sm px-2">Config</TabsTrigger>
            <TabsTrigger value="compliance" className="text-xs md:text-sm px-2">Compliance</TabsTrigger>
            <TabsTrigger value="preview" className="text-xs md:text-sm px-2">Preview</TabsTrigger>
          </TabsList>

          {/* Analytics */}
            <TabsContent value="analytics" className="space-y-6">
              {isAuthenticated && currentData.websites && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      Website Selection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <Label>Select Website:</Label>
                      <Select
                        value={selectedWebsite?.id?.toString() || ''}
                        onValueChange={(val) => {
                          const site = currentData.websites.find(w => w.id.toString() === val);
                          if (site) handleWebsiteSelect(site);
                        }}
                      >
                        <SelectTrigger className="w-64">
                          <SelectValue placeholder="Choose a website" />
                        </SelectTrigger>
                        <SelectContent>
                          {currentData.websites.map(w => (
                            <SelectItem key={w.id} value={w.id.toString()}>
                              <div className="flex items-center justify-between w-full">
                                <span>{w.domain}</span>
                                <Badge variant={w.status === 'active' ? 'default' : 'secondary'}>
                                  {w.status}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Today's Visitors</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {currentMetrics.today_metrics.unique_visitors?.toLocaleString() ||
                        currentData.visitors?.toLocaleString() || '0'}
                    </div>
                    <p className="text-xs text-muted-foreground">+12% from yesterday</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Consent Rate</CardTitle>
                    <MousePointer className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatPercentage(
                        currentMetrics.today_metrics.consent_rate ||
                        currentData.consent_rate || 0
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">+2.1% from yesterday</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatCurrency(
                        currentMetrics.today_metrics.total_revenue ||
                        currentData.revenue || 0
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">+8.2% from yesterday</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Privacy Insights</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {currentMetrics.today_metrics.privacy_clicks || 67}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency((currentMetrics.today_metrics.privacy_clicks || 67) * 0.15)} earned
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Hourly Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Hourly Breakdown</CardTitle>
                  <CardDescription>Visitor traffic and consent patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={currentMetrics.hourly_breakdown}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" tickFormatter={(h) => `${h}:00`} />
                      <YAxis />
                      <Tooltip
                        labelFormatter={(h) => `${h}:00`}
                        formatter={(value, name) => [
                          name === 'revenue' ? formatCurrency(value) : value,
                          name === 'visitors' ? 'Visitors'
                            : name === 'consents' ? 'Consents' : 'Revenue'
                        ]}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="visitors" stackId="1" stroke="#007bff" fill="#007bff" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="consents" stackId="2" stroke="#28a745" fill="#28a745" fillOpacity={0.6} />
                      <Line type="monotone" dataKey="revenue" stroke="#ffc107" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Event Types & Revenue */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Types</CardTitle>
                    <CardDescription>Breakdown of user interactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={currentMetrics.event_types}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ type, count }) => `${type}: ${count}`}
                          outerRadius={80}
                          dataKey="count"
                        >
                          {currentMetrics.event_types.map((_, i) => (
                            <Cell key={i} fill={colors[i % colors.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [value, 'Count']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue by Event Type</CardTitle>
                    <CardDescription>Revenue breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={currentMetrics.event_types}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type" angle={-45} textAnchor="end" height={80} />
                        <YAxis tickFormatter={formatCurrency} />
                        <Tooltip formatter={(v) => [formatCurrency(v), 'Revenue']} />
                        <Bar dataKey="revenue" fill="#28a745" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest visitor & consent data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(currentData.recentActivity || []).map((a, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{a.date}</p>
                          <p className="text-sm text-gray-600">
                            {a.visitors} visitors, {a.consents} consents
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">{formatCurrency(a.revenue)}</p>
                          <p className="text-sm text-gray-600">Revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          {/* Revenue */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Insights Revenue</CardTitle>
                  <CardDescription>{config.revenueShare * 100}% of ad revenue goes to you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">Your Share ({config.revenueShare * 100}%)</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(currentData.revenue * config.revenueShare)}
                      </p>
                    </div>
                    <div className="text-green-600 text-3xl">📈</div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">
                        Platform Share ({(1 - config.revenueShare) * 100}%)
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        {formatCurrency(currentData.revenue * (1 - config.revenueShare))}
                      </p>
                    </div>
                    <div className="text-blue-600 text-3xl">🏢</div>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-sm text-yellow-800">
                    <strong>Revenue Frequency:</strong> Privacy Insights shown every {config.privacyInsightsFrequency} page views
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payout Information</CardTitle>
                  <CardDescription>Monthly payouts with $50 minimum</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Current Balance:</span>
                      <span className="font-medium">
                        {formatCurrency(currentData.revenue * config.revenueShare)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Minimum Payout:</span>
                      <span className="font-medium">$50.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next Payout:</span>
                      <span className="font-medium">End of Month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue Share:</span>
                      <span className="font-medium">{config.revenueShare * 100}%</span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    disabled={(currentData.revenue * config.revenueShare) < 50}
                    onClick={() => requestPayout(currentData.revenue * config.revenueShare)}
                  >
                    {(currentData.revenue * config.revenueShare) >= 50
                      ? 'Request Payout'
                      : 'Minimum Not Reached'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Daily revenue (last 30 days)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={currentData.recentActivity || demoData.recentActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={formatCurrency} />
                    <Tooltip formatter={(v) => [formatCurrency(v), 'Revenue']} />
                    <Line type="monotone" dataKey="revenue" stroke="#28a745" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Websites */}
          <TabsContent value="websites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Websites</CardTitle>
                <CardDescription>Manage websites using CookieBot.ai</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isAuthenticated ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🌐</div>
                      <p className="text-gray-600 mb-4">No websites added yet</p>
                      <Button>Add Your First Website</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {['example.com', 'mystore.com', 'blog.example.com'].map((domain, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{domain}</p>
                            <p className="text-sm text-gray-600">
                              Active • {Math.floor(Math.random() * 1000) + 500} visitors today
                            </p>
                          </div>
                          <Badge>Demo</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Crown className="h-5 w-5 mr-2" />
                  Subscription Status
                </CardTitle>
                <CardDescription>Manage your subscription</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div>
                    <p className="font-medium text-lg">
                      {currentSubscription?.tier || 'Free'} Plan
                    </p>
                    <p className="text-sm text-gray-600">
                      Status:{' '}
                      <Badge variant={currentSubscription?.status === 'active' ? 'default' : 'secondary'}>
                        {currentSubscription?.status || 'Active'}
                      </Badge>
                    </p>
                  </div>
                  <Button onClick={() => setShowUpgradeModal(true)}>
                    {currentSubscription?.tier === 'free' ? 'Upgrade Plan' : 'Change Plan'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {usage && (
              <Card>
                <CardHeader>
                  <CardTitle>Usage Overview</CardTitle>
                  <CardDescription>Current month usage and limits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Websites</span>
                        <span>{usage.usage?.websites_count || 0} / {usage.limits?.website_limit || '∞'}</span>
                      </div>
                      <Progress
                        value={usage.limits?.website_limit
                          ? (usage.usage?.websites_count || 0) / usage.limits.website_limit * 100
                          : 0}
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>API Calls</span>
                        <span>{usage.usage?.api_calls || 0} / {usage.limits?.api_call_limit || '∞'}</span>
                      </div>
                      <Progress
                        value={usage.limits?.api_call_limit
                          ? (usage.usage?.api_calls || 0) / usage.limits.api_call_limit * 100
                          : 0}
                        className="h-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payout Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payout Methods</CardTitle>
                <CardDescription>Manage how you receive payments</CardDescription>
