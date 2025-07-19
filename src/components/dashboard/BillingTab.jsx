import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  CreditCard, 
  CheckCircle, 
  Crown, 
  Zap,
  Users,
  Globe,
  Shield,
  TrendingUp,
  Calendar,
  Download,
  AlertCircle,
  Star
} from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

const BillingTab = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [plans, setPlans] = useState([]);
  const [billingHistory, setBillingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    fetchBillingData();
  }, []);

  const fetchBillingData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [subscriptionResponse, plansResponse] = await Promise.all([
        api.getSubscription(),
        api.getSubscriptionPlans()
      ]);
      
      setSubscription(subscriptionResponse.data);
      setPlans(plansResponse.data.plans);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch billing data:', err);
      
      // Mock data for demonstration
      setSubscription({
        tier: 'basic',
        status: 'active',
        current_period_start: '2025-01-01T00:00:00Z',
        current_period_end: '2025-02-01T00:00:00Z',
        websites_used: 3,
        websites_limit: 5,
        monthly_visitors: 12450,
        monthly_visitors_limit: 50000,
        amount: 29.00,
        currency: 'USD'
      });
      
      setPlans([
        {
          id: 'free',
          name: 'Free',
          price: 0,
          currency: 'USD',
          interval: 'month',
          features: {
            websites: 1,
            monthly_visitors: 10000,
            analytics: 'basic',
            compliance_scanning: 'basic',
            support: 'email',
            revenue_share: 50,
            custom_banner: false,
            api_access: false
          },
          popular: false
        },
        {
          id: 'basic',
          name: 'Basic',
          price: 29,
          currency: 'USD',
          interval: 'month',
          features: {
            websites: 5,
            monthly_visitors: 50000,
            analytics: 'advanced',
            compliance_scanning: 'full',
            support: 'priority',
            revenue_share: 60,
            custom_banner: true,
            api_access: false
          },
          popular: true
        },
        {
          id: 'pro',
          name: 'Pro',
          price: 99,
          currency: 'USD',
          interval: 'month',
          features: {
            websites: 25,
            monthly_visitors: 250000,
            analytics: 'real-time',
            compliance_scanning: 'advanced',
            support: 'phone',
            revenue_share: 70,
            custom_banner: true,
            api_access: true
          },
          popular: false
        }
      ]);
      
      setBillingHistory([
        {
          id: '1',
          amount: 29.00,
          currency: 'USD',
          status: 'paid',
          invoice_date: '2025-01-01T00:00:00Z',
          period_start: '2025-01-01T00:00:00Z',
          period_end: '2025-02-01T00:00:00Z'
        },
        {
          id: '2',
          amount: 29.00,
          currency: 'USD',
          status: 'paid',
          invoice_date: '2024-12-01T00:00:00Z',
          period_start: '2024-12-01T00:00:00Z',
          period_end: '2025-01-01T00:00:00Z'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (planId) => {
    try {
      const response = await api.subscribe({ plan_id: planId });
      // Handle successful subscription
      setShowUpgradeModal(false);
      fetchBillingData(); // Refresh data
    } catch (err) {
      setError(err.message);
    }
  };

  const getUsagePercentage = (used, limit) => {
    if (limit === -1) return 0; // Unlimited
    return Math.min((used / limit) * 100, 100);
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getPlanIcon = (planName) => {
    switch (planName.toLowerCase()) {
      case 'free':
        return <Users className="w-5 h-5" />;
      case 'basic':
        return <Zap className="w-5 h-5" />;
      case 'pro':
        return <Crown className="w-5 h-5" />;
      default:
        return <Star className="w-5 h-5" />;
    }
  };

  const PlanCard = ({ plan, isCurrentPlan = false }) => (
    <Card className={`relative ${plan.popular ? 'border-blue-500 shadow-lg' : 'border-gray-200'} ${isCurrentPlan ? 'bg-blue-50' : ''}`}>
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
          Most Popular
        </Badge>
      )}
      
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          {getPlanIcon(plan.name)}
        </div>
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <div className="flex items-baseline justify-center">
          <span className="text-3xl font-bold">${plan.price}</span>
          <span className="text-gray-600">/{plan.interval}</span>
        </div>
        {isCurrentPlan && (
          <Badge className="bg-green-100 text-green-800">Current Plan</Badge>
        )}
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-3 mb-6">
          <li className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
            <span>{plan.features.websites === -1 ? 'Unlimited' : plan.features.websites} websites</span>
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
            <span>{plan.features.monthly_visitors.toLocaleString()} monthly visitors</span>
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
            <span className="capitalize">{plan.features.analytics} analytics</span>
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
            <span className="capitalize">{plan.features.compliance_scanning} compliance scanning</span>
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
            <span>{plan.features.revenue_share}% revenue share</span>
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
            <span className="capitalize">{plan.features.support} support</span>
          </li>
          {plan.features.custom_banner && (
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
              <span>Custom banner design</span>
            </li>
          )}
          {plan.features.api_access && (
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
              <span>API access</span>
            </li>
          )}
        </ul>
        
        {isCurrentPlan ? (
          <Button className="w-full" disabled>
            Current Plan
          </Button>
        ) : (
          <Button 
            className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
            variant={plan.popular ? 'default' : 'outline'}
            onClick={() => {
              setSelectedPlan(plan);
              setShowUpgradeModal(true);
            }}
          >
            {plan.price === 0 ? 'Downgrade' : 'Upgrade'}
          </Button>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Current Subscription
          </CardTitle>
          <CardDescription>
            Your current plan and usage details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                {getPlanIcon(subscription?.tier)}
                <h3 className="text-lg font-semibold capitalize">{subscription?.tier} Plan</h3>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">${subscription?.amount}/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next billing:</span>
                  <span className="font-medium">
                    {new Date(subscription?.current_period_end).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Websites Used</span>
                  <span className={getUsageColor(getUsagePercentage(subscription?.websites_used, subscription?.websites_limit))}>
                    {subscription?.websites_used} / {subscription?.websites_limit === -1 ? '∞' : subscription?.websites_limit}
                  </span>
                </div>
                <Progress 
                  value={getUsagePercentage(subscription?.websites_used, subscription?.websites_limit)} 
                  className="h-2"
                />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Monthly Visitors</span>
                  <span className={getUsageColor(getUsagePercentage(subscription?.monthly_visitors, subscription?.monthly_visitors_limit))}>
                    {subscription?.monthly_visitors.toLocaleString()} / {subscription?.monthly_visitors_limit.toLocaleString()}
                  </span>
                </div>
                <Progress 
                  value={getUsagePercentage(subscription?.monthly_visitors, subscription?.monthly_visitors_limit)} 
                  className="h-2"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Plans</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard 
              key={plan.id} 
              plan={plan} 
              isCurrentPlan={plan.id === subscription?.tier}
            />
          ))}
        </div>
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Billing History
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardTitle>
          <CardDescription>
            Your recent invoices and payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {billingHistory.length > 0 ? (
              billingHistory.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(invoice.invoice_date).toLocaleDateString()} - 
                        {new Date(invoice.period_start).toLocaleDateString()} to {new Date(invoice.period_end).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">Paid</Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No billing history yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Modal */}
      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedPlan?.price === 0 ? 'Downgrade' : 'Upgrade'} to {selectedPlan?.name} Plan
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                ${selectedPlan?.price}/{selectedPlan?.interval}
              </div>
              <p className="text-gray-600">
                {selectedPlan?.price === 0 
                  ? 'Downgrade to the free plan' 
                  : `Upgrade to unlock more features and higher limits`
                }
              </p>
            </div>
            
            {selectedPlan?.price > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You will be charged ${selectedPlan?.price} immediately and then monthly on the same date.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="flex space-x-2">
              <Button 
                className="flex-1" 
                onClick={() => handleUpgrade(selectedPlan?.id)}
              >
                {selectedPlan?.price === 0 ? 'Downgrade' : 'Upgrade'} Now
              </Button>
              <Button variant="outline" onClick={() => setShowUpgradeModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Error Alert */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default BillingTab;

