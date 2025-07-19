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
  Clock
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

  useEffect(() => {
    fetchWebsites();
  }, []);

  const fetchWebsites = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getWebsites();
      setWebsites(response.data.websites);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch websites:', err);
      // Mock data for demonstration
      setWebsites([
        {
          id: 1,
          domain: 'example.com',
          client_id: 'cb_a1b2c3d4e5f6g7h8',
          status: 'active',
          visitors_today: 245,
          consent_rate: 78.5,
          revenue_today: 15.25,
          created_at: '2025-01-15T10:30:00Z',
          integration_code: `<!-- CookieBot.ai Integration -->
<script>
(function() {
  var cb = window.CookieBot = window.CookieBot || {};
  cb.clientId = 'cb_a1b2c3d4e5f6g7h8';
  cb.apiUrl = 'https://cookiebot-ai-backend-production.up.railway.app/api/public';
  
  var script = document.createElement('script');
  script.src = cb.apiUrl + '/script.js';
  script.async = true;
  document.head.appendChild(script);
})();
</script>`
        },
        {
          id: 2,
          domain: 'shop.example.com',
          client_id: 'cb_x9y8z7w6v5u4t3s2',
          status: 'pending',
          visitors_today: 89,
          consent_rate: 72.1,
          revenue_today: 8.90,
          created_at: '2025-01-18T14:20:00Z',
          integration_code: `<!-- CookieBot.ai Integration -->
<script>
(function() {
  var cb = window.CookieBot = window.CookieBot || {};
  cb.clientId = 'cb_x9y8z7w6v5u4t3s2';
  cb.apiUrl = 'https://cookiebot-ai-backend-production.up.railway.app/api/public';
  
  var script = document.createElement('script');
  script.src = cb.apiUrl + '/script.js';
  script.async = true;
  document.head.appendChild(script);
})();
</script>`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWebsite = async (e) => {
    e.preventDefault();
    if (!newWebsiteDomain.trim()) return;

    try {
      setAddingWebsite(true);
      const response = await api.createWebsite({ domain: newWebsiteDomain.trim() });
      setWebsites([...websites, response.data.website]);
      setNewWebsiteDomain('');
      setShowAddModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setAddingWebsite(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active', icon: CheckCircle },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending', icon: Clock },
      inactive: { color: 'bg-gray-100 text-gray-800', label: 'Inactive', icon: AlertCircle }
    };

    const config = statusConfig[status] || statusConfig.inactive;
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
          Client ID: {website.client_id}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{website.visitors_today}</div>
            <div className="text-xs text-gray-500 flex items-center justify-center">
              <Users className="w-3 h-3 mr-1" />
              Visitors Today
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{website.consent_rate.toFixed(1)}%</div>
            <div className="text-xs text-gray-500 flex items-center justify-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              Consent Rate
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">${website.revenue_today.toFixed(2)}</div>
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
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="space-y-6">
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
                  Enter your website domain without http:// or https://
                </p>
              </div>
              <div className="flex space-x-2">
                <Button type="submit" disabled={addingWebsite} className="flex-1">
                  {addingWebsite ? 'Adding...' : 'Add Website'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
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

      {/* Upgrade Notice */}
      {!canAddWebsite() && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You've reached your website limit for the {user?.subscription_tier} plan. 
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
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Website
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Integration Code Modal */}
      <Dialog open={showCodeModal} onOpenChange={setShowCodeModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Integration Code for {selectedWebsite?.domain}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Copy this code and paste it in your website's &lt;head&gt; section:</Label>
              <div className="relative mt-2">
                <Textarea
                  value={selectedWebsite?.integration_code || ''}
                  readOnly
                  className="font-mono text-sm min-h-[200px]"
                />
                <Button
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(selectedWebsite?.integration_code || '')}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                After adding this code to your website, it may take up to 24 hours for data to appear in your dashboard.
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

