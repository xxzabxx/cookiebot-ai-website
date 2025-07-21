import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
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
  RefreshCw
} from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

const WebsitesTab = () => {
  const { user } = useAuth();
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [newWebsiteDomain, setNewWebsiteDomain] = useState('');
  const [addingWebsite, setAddingWebsite] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchWebsites();
  }, []);

  const fetchWebsites = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Add pagination parameters that backend expects
      const response = await api.request('/api/websites?page=1&per_page=50&sort_by=created_at&sort_order=desc');
      
      if (response.success) {
        setWebsites(response.data.websites || []);
      } else {
        throw new Error(response.message || 'Failed to fetch websites');
      }
    } catch (err) {
      console.error('Failed to fetch websites:', err);
      setError('Failed to retrieve websites');
      
      // For development - remove this when backend is working
      setWebsites([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWebsite = async (e) => {
    e.preventDefault();
    if (!newWebsiteDomain.trim()) return;

    try {
      setAddingWebsite(true);
      setError(null);
      
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
      
      // Create website via API with proper data structure
      const response = await api.request('/api/websites', {
        method: 'POST',
        body: {
          domain: cleanDomain
        }
      });
      
      if (response.success) {
        // Add the new website to the list
        setWebsites(prev => [...prev, response.data.website]);
        setNewWebsiteDomain('');
        setShowAddModal(false);
        
        // Show success message
        console.log('Website added successfully:', response.data.website);
      } else {
        throw new Error(response.message || 'Failed to create website');
      }
    } catch (err) {
      console.error('Failed to add website:', err);
      
      // Handle specific error types
      if (err.status === 422) {
        setError('Invalid domain format. Please enter a valid domain (e.g., example.com)');
      } else if (err.status === 409) {
        setError('This domain is already registered');
      } else if (err.status === 402) {
        setError('Website limit reached. Please upgrade your plan to add more websites.');
      } else {
        setError(err.message || 'Failed to add website. Please try again.');
      }
    } finally {
      setAddingWebsite(false);
    }
  };

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

  const getWebsiteLimit = () => {
    const limits = {
      free: 1,
      basic: 5,
      pro: 25,
      enterprise: -1
    };
    return limits[user?.subscription_tier] || 1;
  };

  const canAddWebsite = () => {
    const limit = getWebsiteLimit();
    return limit === -1 || websites.length < limit;
  };

  const generateIntegrationCode = (website) => {
    return `<!-- CookieBot.ai Integration -->
<script>
window.cookieBotConfig = {
  apiKey: '${user?.apiKey || 'cb_live_' + Math.random().toString(36).substr(2, 32)}',
  websiteId: '${website.id}',
  clientId: '${website.client_id}',
  userId: '${user?.id}',
  domain: window.location.hostname,
  version: 'v3',
  autoShow: true,
  compliance: {
    gdpr: true,
    ccpa: true,
    lgpd: true
  }
};

// Universal script that works on any website
(function() {
  function loadCookieBot() {
    if (window.CookieBotLoaded) return;
    window.CookieBotLoaded = true;
    
    var script = document.createElement('script');
    script.src = 'https://cookiebot-ai-backend-production.up.railway.app/static/enhanced_cookiebot_ai_v3.js';
    document.head.appendChild(script);
  }
  
  if (document.readyState === 'complete') {
    loadCookieBot();
  } else {
    window.addEventListener('load', loadCookieBot);
    document.addEventListener('DOMContentLoaded', loadCookieBot);
    setTimeout(loadCookieBot, 2000);
  }
})();
</script>
<!-- End CookieBot.ai Integration -->`;
  };

  const WebsiteCard = ({ website }) => (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">{website.domain}</CardTitle>
          </div>
          {getStatusBadge(website.status)}
        </div>
        <CardDescription className="text-sm text-gray-500">
          Website ID: {website.id} • Client ID: {website.client_id}
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
            Get Code
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
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
          <h3 className="text-lg font-semibold text-gray-900">Your Websites</h3>
          <p className="text-sm text-gray-500">
            {websites.length} of {getWebsiteLimit() === -1 ? '∞' : getWebsiteLimit()} websites
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchWebsites}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          
          <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
            <DialogTrigger asChild>
              <Button disabled={!canAddWebsite()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Website
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Website</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddWebsite} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="domain">Website Domain</Label>
                  <Input
                    id="domain"
                    placeholder="example.com"
                    value={newWebsiteDomain}
                    onChange={(e) => setNewWebsiteDomain(e.target.value)}
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Enter your website domain without http:// or https:// (e.g., example.com)
                  </p>
                </div>
                
                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-red-800">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="flex space-x-2">
                  <Button type="submit" disabled={addingWebsite} className="flex-1">
                    {addingWebsite ? 'Adding...' : 'Add Website'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => {
                    setShowAddModal(false);
                    setError(null);
                    setNewWebsiteDomain('');
                  }}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Error Alert */}
      {error && !showAddModal && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Upgrade Notice */}
      {!canAddWebsite() && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You've reached your website limit for the {user?.subscription_tier || 'free'} plan. 
            <Button variant="link" className="p-0 h-auto ml-1">
              Upgrade your plan
            </Button> to add more websites.
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
            <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No websites yet</h3>
            <p className="text-gray-500 mb-4">
              Add your first website to start tracking cookie consent and compliance.
            </p>
            <Button onClick={() => setShowAddModal(true)} disabled={!canAddWebsite()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Website
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Integration Code Modal */}
      <Dialog open={showCodeModal} onOpenChange={setShowCodeModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Integration Code for {selectedWebsite?.domain}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Copy this code and paste it anywhere in your website's HTML:</Label>
              <div className="relative mt-2">
                <Textarea
                  value={selectedWebsite ? generateIntegrationCode(selectedWebsite) : ''}
                  readOnly
                  className="font-mono text-sm min-h-[300px]"
                />
                <Button
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(selectedWebsite ? generateIntegrationCode(selectedWebsite) : '')}
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-green-800">
                <strong>Website ID: {selectedWebsite?.id}</strong> - This unique ID will track analytics for this specific website.
              </AlertDescription>
            </Alert>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                After adding this code to your website, it may take a few minutes for data to appear in your dashboard.
                The script works on any website platform (WordPress, Shopify, React, HTML, etc.).
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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WebsitesTab;

