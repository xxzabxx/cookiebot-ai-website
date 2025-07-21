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
  Code, 
  Users, 
  TrendingUp, 
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock
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
  const [addError, setAddError] = useState(null);

  // Fetch websites with proper pagination parameters
  const fetchWebsites = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Add required pagination parameters that backend expects
      const response = await api.request('/api/websites', {
        method: 'GET',
        params: {
          page: 1,
          per_page: 50,
          sort_by: 'created_at',
          sort_order: 'desc'
        }
      });
      
      if (response.success && response.data) {
        setWebsites(response.data.websites || []);
      } else {
        throw new Error(response.message || 'Failed to fetch websites');
      }
    } catch (err) {
      console.error('Failed to fetch websites:', err);
      setError('Failed to retrieve websites');
      setWebsites([]);
    } finally {
      setLoading(false);
    }
  };

  // Add website with proper validation
  const handleAddWebsite = async () => {
    if (!newWebsiteDomain.trim()) {
      setAddError('Please enter a domain name');
      return;
    }

    try {
      setAddingWebsite(true);
      setAddError(null);

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

      // Send request with exact format backend expects
      const response = await api.request('/api/websites', {
        method: 'POST',
        body: {
          domain: cleanDomain  // Only send domain field as backend expects
        }
      });

      if (response.success && response.data) {
        // Add new website to list
        setWebsites(prev => [response.data, ...prev]);
        setNewWebsiteDomain('');
        setShowAddModal(false);
      } else {
        throw new Error(response.message || 'Failed to add website');
      }
    } catch (err) {
      console.error('Failed to add website:', err);
      
      // Handle specific error types
      if (err.message.includes('422')) {
        setAddError('Invalid domain format. Please enter a valid domain (e.g., example.com)');
      } else if (err.message.includes('402')) {
        setAddError('Website limit reached. Please upgrade your plan to add more websites.');
      } else if (err.message.includes('409')) {
        setAddError('This domain is already registered. Please use a different domain.');
      } else {
        setAddError(err.message || 'Failed to add website');
      }
    } finally {
      setAddingWebsite(false);
    }
  };

  // Delete website
  const handleDeleteWebsite = async (websiteId) => {
    if (!confirm('Are you sure you want to delete this website? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await api.request(`/api/websites/${websiteId}`, {
        method: 'DELETE'
      });

      if (response.success) {
        setWebsites(prev => prev.filter(w => w.id !== websiteId));
      } else {
        throw new Error(response.message || 'Failed to delete website');
      }
    } catch (err) {
      console.error('Failed to delete website:', err);
      alert('Failed to delete website: ' + err.message);
    }
  };

  // Get website limit based on subscription
  const getWebsiteLimit = () => {
    if (!user?.subscription_tier) return 1;
    
    switch (user.subscription_tier) {
      case 'free': return 1;
      case 'basic': return 5;
      case 'pro': return 25;
      case 'enterprise': return -1; // Unlimited
      default: return 1;
    }
  };

  // Check if user can add more websites
  const canAddWebsite = () => {
    const limit = getWebsiteLimit();
    return limit === -1 || websites.length < limit;
  };

  // Copy integration code to clipboard
  const copyIntegrationCode = (website) => {
    const integrationCode = `<!-- CookieBot.ai V3 Script -->
<script>
  window.cookieBotConfig = {
    apiKey: '${user?.apiKey || 'your_api_key_here'}',
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
    }
  };
</script>
<script src="https://cookiebot-ai-backend-production.up.railway.app/static/enhanced_cookiebot_ai_v3.js"></script>`;

    navigator.clipboard.writeText(integrationCode).then(() => {
      alert('Integration code copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy to clipboard');
    });
  };

  // Load websites on component mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchWebsites();
    }
  }, [isAuthenticated]);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Active' },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, text: 'Pending' },
      inactive: { color: 'bg-gray-100 text-gray-800', icon: AlertCircle, text: 'Inactive' }
    };

    const config = statusConfig[status] || statusConfig.inactive;
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {config.text}
      </Badge>
    );
  };

  // Loading skeleton
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
            <span className="text-sm text-gray-500">Loading...</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-8 bg-gray-200 rounded"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 bg-gray-200 rounded flex-1"></div>
                      <div className="h-8 bg-gray-200 rounded w-8"></div>
                      <div className="h-8 bg-gray-200 rounded w-8"></div>
                    </div>
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
      {/* Header */}
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

      {/* Websites List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Your Websites</h3>
          <span className="text-sm text-gray-500">
            {websites.length} of {getWebsiteLimit() === -1 ? '∞' : getWebsiteLimit()} websites
          </span>
        </div>

        {/* Error State */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Website Limit Warning */}
        {!canAddWebsite() && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-yellow-700">
                  <AlertCircle className="w-4 h-4" />
                  You've reached your website limit for the free plan.
                </div>
                <Button variant="outline" size="sm">
                  Upgrade your plan
                </Button>
              </div>
              <p className="text-sm text-yellow-600 mt-1">
                to add more websites.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Websites Grid */}
        {websites.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="p-12 text-center">
              <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No websites yet</h3>
              <p className="text-gray-600 mb-4">
                Add your first website to start tracking cookie consent and compliance.
              </p>
              <Button 
                onClick={() => setShowAddModal(true)}
                disabled={!canAddWebsite()}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Website
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {websites.map((website) => (
              <Card key={website.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Website Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="font-semibold">{website.domain}</h4>
                          <p className="text-sm text-gray-500">
                            Website ID: {website.id} • Client ID: {website.client_id}
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={website.status} />
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="flex items-center justify-center gap-1 text-blue-600">
                          <Users className="w-4 h-4" />
                          <span className="font-bold">{website.visitors_today || 0}</span>
                        </div>
                        <p className="text-xs text-gray-500">Visitors Today</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center gap-1 text-green-600">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-bold">{website.consent_rate || 0}%</span>
                        </div>
                        <p className="text-xs text-gray-500">Consent Rate</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center gap-1 text-purple-600">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-bold">${website.revenue_today || '0.00'}</span>
                        </div>
                        <p className="text-xs text-gray-500">Revenue Today</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => copyIntegrationCode(website)}
                      >
                        <Code className="w-4 h-4 mr-2" />
                        Get Code
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteWebsite(website.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Website</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Website Domain</label>
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
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {addError}
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
                    setAddError(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsitesTab;

