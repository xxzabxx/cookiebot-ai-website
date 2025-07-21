import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Globe, 
  Plus, 
  RefreshCw, 
  Settings, 
  Trash2, 
  Copy, 
  ExternalLink,
  Users,
  TrendingUp,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../lib/api';

const WebsitesTab = () => {
  const { user, isAuthenticated } = useAuth();
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWebsiteDomain, setNewWebsiteDomain] = useState('');
  const [addingWebsite, setAddingWebsite] = useState(false);
  const [addError, setAddError] = useState('');

  // Demo data for non-authenticated users
  const demoWebsites = [
    {
      id: 'demo-1',
      domain: 'example.com',
      client_id: 'cb_demo1234567890abcdef',
      status: 'active',
      visitors_today: 245,
      consent_rate: 78.5,
      revenue_today: 15.25,
      isDemo: true
    },
    {
      id: 'demo-2', 
      domain: 'shop.example.com',
      client_id: 'cb_demo0987654321fedcba',
      status: 'pending',
      visitors_today: 89,
      consent_rate: 72.1,
      revenue_today: 8.90,
      isDemo: true
    }
  ];

  useEffect(() => {
    if (isAuthenticated) {
      fetchWebsites();
    } else {
      // Show demo data for non-authenticated users
      setWebsites(demoWebsites);
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchWebsites = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Add proper pagination parameters that the backend expects
      const response = await api.getWebsites({
        page: 1,
        per_page: 50,
        sort_by: 'created_at',
        sort_order: 'desc'
      });
      
      if (response.success && response.data) {
        setWebsites(response.data.websites || []);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Failed to fetch websites:', error);
      setError('Failed to retrieve websites');
      setWebsites([]); // Clear websites on error, don't show demo data when authenticated
    } finally {
      setLoading(false);
    }
  };

  const handleAddWebsite = async () => {
    if (!newWebsiteDomain.trim()) {
      setAddError('Please enter a domain name');
      return;
    }

    try {
      setAddingWebsite(true);
      setAddError('');

      // Enhanced domain cleaning and validation
      let cleanDomain = newWebsiteDomain.trim()
        .replace(/^https?:\/\//, '') // Remove protocol
        .replace(/^www\./, '')       // Remove www
        .replace(/\/$/, '')          // Remove trailing slash
        .toLowerCase();              // Convert to lowercase

      // Basic validation
      if (!cleanDomain || cleanDomain.length < 3) {
        throw new Error('Please enter a valid domain name');
      }

      // Format validation
      const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
      if (!domainRegex.test(cleanDomain)) {
        throw new Error('Please enter a valid domain format (e.g., example.com)');
      }

      // Create website with proper data structure that backend expects
      const websiteData = {
        domain: cleanDomain
      };

      const response = await api.createWebsite(websiteData);
      
      if (response.success && response.data) {
        // Add the new website to the list
        setWebsites(prev => [response.data.website, ...prev]);
        setShowAddModal(false);
        setNewWebsiteDomain('');
        setAddError('');
      } else {
        throw new Error(response.error?.message || 'Failed to create website');
      }
    } catch (error) {
      console.error('Failed to add website:', error);
      
      // Handle specific error types
      if (error.status === 422) {
        setAddError('Invalid domain format. Please enter a valid domain (e.g., example.com)');
      } else if (error.status === 409) {
        setAddError('This domain is already registered');
      } else if (error.status === 402) {
        setAddError('Website limit reached. Please upgrade your plan to add more websites.');
      } else {
        setAddError(error.message || 'Failed to add website. Please try again.');
      }
    } finally {
      setAddingWebsite(false);
    }
  };

  const handleDeleteWebsite = async (websiteId) => {
    if (!confirm('Are you sure you want to delete this website?')) {
      return;
    }

    try {
      await api.deleteWebsite(websiteId);
      setWebsites(prev => prev.filter(w => w.id !== websiteId));
    } catch (error) {
      console.error('Failed to delete website:', error);
      alert('Failed to delete website. Please try again.');
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800'
    };

    return (
      <Badge className={variants[status] || 'bg-gray-100 text-gray-800'}>
        {getStatusIcon(status)}
        <span className="ml-1 capitalize">{status}</span>
      </Badge>
    );
  };

  const getWebsiteLimit = () => {
    if (!user) return 1;
    
    const limits = {
      free: 1,
      basic: 5,
      pro: 25,
      enterprise: -1 // unlimited
    };
    
    return limits[user.subscription_tier] || 1;
  };

  const canAddWebsite = () => {
    if (!isAuthenticated) return false;
    const limit = getWebsiteLimit();
    return limit === -1 || websites.length < limit;
  };

  const generateIntegrationCode = (website) => {
    if (!user) return '';
    
    return `<!-- CookieBot.ai V3 Script -->
<script>
  window.cookieBotConfig = {
    apiKey: '${user?.apiKey || 'cb_live_your_api_key_here'}',
    websiteId: '${website.id}',
    clientId: '${website.client_id}',
    userId: '${user?.id}',
    domain: window.location.hostname,
    version: 'v3',
    
    privacyInsights: true,
    revenueShare: 0.6,
    
    autoShow: true,
    compliance: {
      gdpr: true,
      ccpa: true,
      lgpd: true
    },
    customization: {
      theme: 'light',
      position: 'bottom-right',
      layout: 'dialog',
      primaryColor: '#007bff',
      backgroundColor: '#ffffff',
      textColor: '#333333'
    },
    monetization: {
      enabled: true,
      revenueShare: 0.6,
      dataTypes: ["analytics","preferences","marketing"]
    }
  };
</script>
<script src="https://cookiebot-ai-backend-production.up.railway.app/static/enhanced_cookiebot_ai_v3.js"></script>`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Websites</h2>
            <p className="text-gray-600">Manage your websites and integration settings</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" disabled>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button disabled>
              <Plus className="w-4 h-4 mr-2" />
              Add Website
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your Websites</h3>
          </div>
          
          {/* Loading skeletons */}
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-6"></div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="h-6 bg-gray-200 rounded w-full mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                    <div className="text-center">
                      <div className="h-6 bg-gray-200 rounded w-full mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                    <div className="text-center">
                      <div className="h-6 bg-gray-200 rounded w-full mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-gray-200 rounded flex-1"></div>
                    <div className="h-8 bg-gray-200 rounded w-8"></div>
                    <div className="h-8 bg-gray-200 rounded w-8"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Websites</h2>
          <p className="text-gray-600">Manage your websites and integration settings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchWebsites}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button 
            onClick={() => setShowAddModal(true)}
            disabled={!canAddWebsite()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Website
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {isAuthenticated ? 'Your Websites' : 'Sample Websites'}
          </h3>
          <span className="text-sm text-gray-500">
            {websites.length} of {getWebsiteLimit() === -1 ? '∞' : getWebsiteLimit()} websites
          </span>
        </div>

        {/* Demo Mode Notice */}
        {!isAuthenticated && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-medium text-blue-900">Demo Mode</h4>
                  <p className="text-sm text-blue-700">
                    You're viewing sample data. Sign in to manage your real websites and get integration codes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {error && isAuthenticated && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-800">{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Website Limit Warning */}
        {isAuthenticated && !canAddWebsite() && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <span className="text-yellow-800">
                    You've reached your website limit for the free plan.
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  Upgrade your plan
                </Button>
              </div>
              <p className="text-sm text-yellow-700 mt-2">
                to add more websites.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Websites Grid */}
        {websites.length === 0 && !error ? (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="p-12 text-center">
              <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No websites yet</h3>
              <p className="text-gray-600 mb-4">
                Add your first website to start tracking cookie consent and compliance.
              </p>
              {canAddWebsite() && (
                <Button onClick={() => setShowAddModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Website
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {websites.map((website) => (
              <Card key={website.id} className={website.isDemo ? 'border-blue-200 bg-blue-50' : ''}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-gray-600" />
                      <h4 className="font-semibold">{website.domain}</h4>
                      {website.isDemo && (
                        <Badge className="bg-blue-100 text-blue-800">
                          Demo
                        </Badge>
                      )}
                    </div>
                    {getStatusBadge(website.status)}
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    Website ID: {website.id} • Client ID: {website.client_id}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-lg font-semibold">{website.visitors_today}</span>
                      </div>
                      <p className="text-xs text-gray-500">Visitors Today</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-lg font-semibold">{website.consent_rate}%</span>
                      </div>
                      <p className="text-xs text-gray-500">Consent Rate</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <DollarSign className="w-4 h-4 text-purple-600" />
                        <span className="text-lg font-semibold">${website.revenue_today}</span>
                      </div>
                      <p className="text-xs text-gray-500">Revenue Today</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        if (website.isDemo) {
                          alert('Sign in to get real integration codes');
                          return;
                        }
                        copyToClipboard(generateIntegrationCode(website));
                      }}
                      disabled={website.isDemo}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Get Code
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={website.isDemo}
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteWebsite(website.id)}
                      disabled={website.isDemo}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add Website Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Add New Website</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setShowAddModal(false);
                    setNewWebsiteDomain('');
                    setAddError('');
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Website Domain
                </label>
                <Input
                  placeholder="example.com"
                  value={newWebsiteDomain}
                  onChange={(e) => setNewWebsiteDomain(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddWebsite()}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Enter your website domain without http:// or https:// (e.g., example.com)
                </p>
              </div>

              {addError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-800">{addError}</span>
                </div>
              )}

              <div className="flex gap-2">
                <Button 
                  onClick={handleAddWebsite}
                  disabled={addingWebsite}
                  className="flex-1"
                >
                  {addingWebsite ? 'Adding...' : 'Add Website'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setShowAddModal(false);
                    setNewWebsiteDomain('');
                    setAddError('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WebsitesTab;

