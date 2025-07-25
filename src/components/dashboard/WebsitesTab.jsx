import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { 
  Globe, 
  Users, 
  TrendingUp, 
  Copy, 
  ExternalLink,
  Settings,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  Code,
  Zap,
  Info,
  Rocket,
  BarChart3,
  DollarSign
} from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

const WebsitesTab = () => {
  const { user } = useAuth();
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [copied, setCopied] = useState(false);
  const [approach, setApproach] = useState('detecting');

  useEffect(() => {
    fetchWebsites();
  }, []);

  const fetchWebsites = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if user has unified support
      if (api.isUnifiedSupported(user)) {
        try {
          // Try unified approach first
          const response = await api.getUnifiedWebsites(user.api_key);
          setWebsites(response.data.websites || []);
          setApproach('unified');
        } catch (unifiedError) {
          console.warn('Unified websites fetch failed, falling back to legacy:', unifiedError);
          // Fallback to legacy approach
          const response = await api.getWebsites({
            page: 1,
            per_page: 50,
            sort_by: 'created_at',
            sort_order: 'desc'
          });
          
          if (response.success) {
            setWebsites(response.data.websites || []);
            setApproach('legacy');
          } else {
            throw new Error(response.message || 'Failed to fetch websites');
          }
        }
      } else {
        // Use legacy API method
        const response = await api.getWebsites({
          page: 1,
          per_page: 50,
          sort_by: 'created_at',
          sort_order: 'desc'
        });
        
        if (response.success) {
          setWebsites(response.data.websites || []);
          setApproach('legacy');
        } else {
          throw new Error(response.message || 'Failed to fetch websites');
        }
      }
      
    } catch (err) {
      console.error('Failed to fetch websites:', err);
      setError('Failed to retrieve websites');
      setWebsites([]);
      setApproach('error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWebsite = async (websiteId) => {
    if (!confirm('Are you sure you want to delete this website? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await api.deleteWebsite(websiteId);
      
      if (response.success) {
        setWebsites(prev => prev.filter(w => w.id !== websiteId));
      } else {
        throw new Error(response.message || 'Failed to delete website');
      }
    } catch (err) {
      console.error('Failed to delete website:', err);
      setError(err.message || 'Failed to delete website');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active', icon: CheckCircle },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending', icon: Clock },
      inactive: { color: 'bg-gray-100 text-gray-800', label: 'Inactive', icon: AlertCircle }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} flex items-center space-x-1`}>
        <Icon className="w-3 h-3" />
        <span>{config.label}</span>
      </Badge>
    );
  };

  const generateUnifiedScript = () => {
    const userApiKey = user?.api_key || `cb_api_${Math.random().toString(36).substr(2, 32)}`;
    
    return `<!-- CookieBot.ai Unified Script -->
<script>
(function() {
    // Configure CookieBot with your unified API key
    window.CookieBot = {
        apiKey: '${userApiKey}',
        apiUrl: 'https://cookiebot-ai-backend-production.up.railway.app/api/public'
    };
    
    // Load the CookieBot tracking script
    var script = document.createElement('script');
    script.src = window.CookieBot.apiUrl + '/script.js';
    script.async = true;
    script.onload = function() {
        console.log('CookieBot: Unified tracking script loaded successfully');
    };
    document.head.appendChild(script);
})();
</script>
<!-- End CookieBot.ai Unified Script -->`;
  };

  const WebsiteCard = ({ website }) => (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">{website.domain}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(website.status)}
            {approach === 'unified' && (
              <Badge className="bg-green-100 text-green-700 text-xs">
                <Zap className="w-3 h-3 mr-1" />
                Unified
              </Badge>
            )}
          </div>
        </div>
        <CardDescription className="text-sm text-gray-500">
          {approach === 'unified' 
            ? `Auto-registered via API key • Domain: ${website.domain}`
            : `Auto-registered • Client ID: ${website.client_id || 'N/A'}`
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{website.visitors_today || 0}</div>
            <div className="text-xs text-gray-500 flex items-center justify-center">
              <Users className="w-3 h-3 mr-1" />
              Visitors Today
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {website.consent_rate ? parseFloat(website.consent_rate).toFixed(1) : '0.0'}%
            </div>
            <div className="text-xs text-gray-500 flex items-center justify-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              Consent Rate
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              ${website.revenue_today ? parseFloat(website.revenue_today).toFixed(2) : '0.00'}
            </div>
            <div className="text-xs text-gray-500">Revenue Today</div>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => {
              setSelectedWebsite(website);
              setShowCodeModal(true);
            }}
          >
            <Copy className="w-4 h-4 mr-2" />
            Get Script
          </Button>
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-red-600 hover:text-red-700"
            onClick={() => handleDeleteWebsite(website.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-12 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            Your Websites
            {approach === 'unified' && (
              <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Unified
              </Badge>
            )}
          </h3>
          <p className="text-sm text-gray-500">
            {websites.length} websites {approach === 'unified' ? 'managed via unified API key' : 'auto-registered from your script deployments'}
          </p>
        </div>
        
        <Button variant="outline" onClick={fetchWebsites}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Unified Approach Info */}
      {approach === 'unified' && (
        <Alert className="border-green-200 bg-green-50">
          <Rocket className="h-4 w-4" />
          <AlertDescription className="text-green-800">
            <strong>🚀 Unified Management Active!</strong> Your websites are managed via your unified API key. 
            Deploy the same script on any website and it will automatically appear here!
          </AlertDescription>
        </Alert>
      )}

      {/* Legacy Auto-Registration Info */}
      {approach === 'legacy' && (
        <Alert className="border-blue-200 bg-blue-50">
          <Zap className="h-4 w-4" />
          <AlertDescription className="text-blue-800">
            <strong>🚀 Auto-Registration Active!</strong> Websites automatically appear here when you deploy the CookieBot script. 
            Get your script from the <Button variant="link" className="p-0 h-auto text-blue-600 underline">Script tab</Button>.
          </AlertDescription>
        </Alert>
      )}

      {/* Websites Grid */}
      {websites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websites.map((website) => (
            <WebsiteCard key={website.id} website={website} />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <div className="max-w-md mx-auto">
              <Rocket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Deploy Your Unified Script to See Websites</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Your websites will automatically appear here once you deploy the unified CookieBot script. 
                No manual setup required!
              </p>
              
              {/* Quick Deploy Section */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center justify-center">
                  <Rocket className="w-4 h-4 mr-2 text-blue-600" />
                  Quick Deploy
                </h4>
                <div className="text-left space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-600 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">1</span>
                    <span className="text-gray-700">Go to the <strong>Script tab</strong> to get your unified script</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-600 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">2</span>
                    <span className="text-gray-700">Copy and paste it anywhere in your website's HTML</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-600 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">3</span>
                    <span className="text-gray-700">Your website will automatically appear here!</span>
                  </div>
                </div>
              </div>

              {/* Universal Script Preview */}
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-400 text-xs font-mono">Unified Script Preview</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(generateUnifiedScript())}
                    className="text-gray-400 hover:text-white h-6 px-2"
                  >
                    {copied ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
                <pre className="text-gray-300 text-xs overflow-x-auto max-h-32">
                  <code>{generateUnifiedScript().substring(0, 300)}...</code>
                </pre>
              </div>

              <Button asChild className="w-full">
                <a href="#script" onClick={() => {
                  // Trigger script tab navigation if available
                  const scriptTab = document.querySelector('[data-tab="script"]');
                  if (scriptTab) scriptTab.click();
                }}>
                  <Rocket className="w-4 h-4 mr-2" />
                  Get Your Unified Script Now
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Integration Code Modal */}
      {showCodeModal && selectedWebsite && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Unified Script for {selectedWebsite.domain}</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowCodeModal(false)}>
                  ×
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Copy this unified script and paste it anywhere in your website's HTML:
                  </label>
                  <div className="relative">
                    <Textarea
                      value={generateUnifiedScript()}
                      readOnly
                      className="font-mono text-sm min-h-[300px] bg-gray-50"
                    />
                    <Button
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(generateUnifiedScript())}
                    >
                      {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                
                <Alert className="border-green-200 bg-green-50">
                  <Rocket className="h-4 w-4" />
                  <AlertDescription className="text-green-800">
                    <strong>Unified Script Benefits:</strong> This script works on all your websites, enables auto-registration, and provides unified analytics.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    This script works on any platform: WordPress, Shopify, React, HTML, etc. 
                    After deployment, analytics will appear in your dashboard within minutes.
                  </AlertDescription>
                </Alert>

                <div className="flex space-x-2">
                  <Button asChild className="flex-1">
                    <a href="https://docs.cookiebot.ai/integration" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Documentation
                    </a>
                  </Button>
                  <Button variant="outline" onClick={() => setShowCodeModal(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unified Benefits Section */}
      {approach === 'unified' && websites.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Info className="w-5 h-5" />
              🚀 Unified Management Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-800">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Single Script for All Websites</span>
                </div>
                <p className="text-blue-700 text-xs ml-6">
                  Use the same script across all your domains
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-800">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Auto-Discovery</span>
                </div>
                <p className="text-blue-700 text-xs ml-6">
                  New websites automatically appear when script is deployed
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-800">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Unified Analytics</span>
                </div>
                <p className="text-blue-700 text-xs ml-6">
                  Cross-website insights and aggregated reporting
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-800">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Simplified Management</span>
                </div>
                <p className="text-blue-700 text-xs ml-6">
                  Manage all websites from one unified dashboard
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WebsitesTab;

