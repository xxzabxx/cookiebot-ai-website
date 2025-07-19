import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { 
  DollarSign, 
  TrendingUp, 
  Wallet, 
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

const RevenueTab = () => {
  const { user } = useAuth();
  const [revenueData, setRevenueData] = useState(null);
  const [payoutHistory, setPayoutHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('');
  const [payoutMethod, setPayoutMethod] = useState('');

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getRevenueData();
      setRevenueData(response.data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch revenue data:', err);
      
      // Mock data for demonstration
      setRevenueData({
        total_earnings: 1247.85,
        available_balance: 892.30,
        pending_balance: 355.55,
        revenue_share_percentage: 60,
        monthly_earnings: [
          { month: 'Jan', earnings: 145.20 },
          { month: 'Feb', earnings: 189.45 },
          { month: 'Mar', earnings: 234.60 },
          { month: 'Apr', earnings: 198.75 },
          { month: 'May', earnings: 267.30 },
          { month: 'Jun', earnings: 212.55 }
        ],
        daily_earnings: [
          { date: '2025-01-13', earnings: 12.45 },
          { date: '2025-01-14', earnings: 18.90 },
          { date: '2025-01-15', earnings: 15.30 },
          { date: '2025-01-16', earnings: 22.10 },
          { date: '2025-01-17', earnings: 19.75 },
          { date: '2025-01-18', earnings: 25.40 },
          { date: '2025-01-19', earnings: 28.90 }
        ]
      });
      
      setPayoutHistory([
        {
          id: '1',
          amount: 500.00,
          method: 'stripe',
          status: 'completed',
          requested_at: '2025-01-10T10:00:00Z',
          processed_at: '2025-01-12T14:30:00Z'
        },
        {
          id: '2',
          amount: 250.00,
          method: 'paypal',
          status: 'pending',
          requested_at: '2025-01-18T16:20:00Z',
          processed_at: null
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestPayout = async (e) => {
    e.preventDefault();
    if (!payoutAmount || !payoutMethod) return;

    try {
      const response = await api.requestPayout({
        amount: parseFloat(payoutAmount),
        method: payoutMethod
      });
      
      setPayoutHistory([response.data.payout, ...payoutHistory]);
      setShowPayoutModal(false);
      setPayoutAmount('');
      setPayoutMethod('');
      
      // Update available balance
      setRevenueData(prev => ({
        ...prev,
        available_balance: prev.available_balance - parseFloat(payoutAmount),
        pending_balance: prev.pending_balance + parseFloat(payoutAmount)
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-green-100 text-green-800', label: 'Completed', icon: CheckCircle },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending', icon: Clock },
      failed: { color: 'bg-red-100 text-red-800', label: 'Failed', icon: AlertCircle }
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

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'stripe':
        return <CreditCard className="w-4 h-4" />;
      case 'paypal':
        return <Wallet className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const MetricCard = ({ title, value, change, icon: Icon, color = 'blue' }) => {
    const isPositive = change > 0;
    const colorClasses = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600'
    };

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              {change !== undefined && (
                <div className="flex items-center mt-1">
                  {isPositive ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600 mr-1" />
                  )}
                  <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.abs(change)}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              )}
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
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
      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Earnings"
          value={`$${revenueData?.total_earnings.toFixed(2)}`}
          change={23.5}
          icon={DollarSign}
          color="green"
        />
        <MetricCard
          title="Available Balance"
          value={`$${revenueData?.available_balance.toFixed(2)}`}
          change={12.8}
          icon={Wallet}
          color="blue"
        />
        <MetricCard
          title="Pending Balance"
          value={`$${revenueData?.pending_balance.toFixed(2)}`}
          change={-5.2}
          icon={Clock}
          color="orange"
        />
      </div>

      {/* Revenue Share Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Revenue Share Program
          </CardTitle>
          <CardDescription>
            You earn {revenueData?.revenue_share_percentage}% of revenue generated from privacy insights on your websites
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">How it works:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Users on your website can opt-in to share anonymized privacy insights</li>
              <li>• We aggregate this data to provide valuable market research</li>
              <li>• You earn {revenueData?.revenue_share_percentage}% of the revenue from these insights</li>
              <li>• Payments are processed weekly with a minimum payout of $50</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Earnings Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Earnings</CardTitle>
            <CardDescription>Revenue trend over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData?.monthly_earnings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Earnings']} />
                <Line 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Daily Earnings Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Earnings</CardTitle>
            <CardDescription>Revenue over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData?.daily_earnings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })} />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Earnings']}
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <Bar dataKey="earnings" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Payout Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Payout */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Request Payout
              <Dialog open={showPayoutModal} onOpenChange={setShowPayoutModal}>
                <DialogTrigger asChild>
                  <Button disabled={revenueData?.available_balance < 50}>
                    <Plus className="w-4 h-4 mr-2" />
                    Request Payout
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request Payout</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleRequestPayout} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        min="50"
                        max={revenueData?.available_balance}
                        placeholder="50.00"
                        value={payoutAmount}
                        onChange={(e) => setPayoutAmount(e.target.value)}
                        required
                      />
                      <p className="text-sm text-gray-500">
                        Minimum payout: $50.00 | Available: ${revenueData?.available_balance.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="method">Payment Method</Label>
                      <Select value={payoutMethod} onValueChange={setPayoutMethod} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stripe">Stripe (Bank Transfer)</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button type="submit" className="flex-1">
                        Request Payout
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowPayoutModal(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardTitle>
            <CardDescription>
              Minimum payout amount is $50. Payouts are processed within 3-5 business days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {revenueData?.available_balance < 50 ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You need at least $50 in available balance to request a payout. 
                  Current balance: ${revenueData?.available_balance.toFixed(2)}
                </AlertDescription>
              </Alert>
            ) : (
              <div className="text-center py-8">
                <Wallet className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  ${revenueData?.available_balance.toFixed(2)} Available
                </p>
                <p className="text-gray-500">Ready for payout</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payout History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Payout History
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardTitle>
            <CardDescription>
              Your recent payout requests and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payoutHistory.length > 0 ? (
                payoutHistory.map((payout) => (
                  <div key={payout.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getPaymentMethodIcon(payout.method)}
                      <div>
                        <p className="font-medium">${payout.amount.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(payout.requested_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(payout.status)}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No payout history yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
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
    </div>
  );
};

export default RevenueTab;

