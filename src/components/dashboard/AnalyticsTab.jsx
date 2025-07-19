import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Globe, 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Calendar,
  RefreshCw
} from 'lucide-react';
import { api } from '../../lib/api';

const AnalyticsTab = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getDashboardSummary();
      setDashboardData(response.data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for demonstration when API is not available
  const mockData = {
    total_websites: 3,
    total_visitors_today: 1247,
    total_revenue_today: 89.50,
    average_consent_rate: 73.2,
    recent_activity: [
      {
        event_type: 'consent_given',
        website_domain: 'example.com',
        created_at: new Date().toISOString(),
        consent_given: true,
        revenue_generated: 0.25
      },
      {
        event_type: 'banner_shown',
        website_domain: 'shop.example.com',
        created_at: new Date(Date.now() - 300000).toISOString(),
        consent_given: null,
        revenue_generated: 0
      },
      {
        event_type: 'consent_denied',
        website_domain: 'blog.example.com',
        created_at: new Date(Date.now() - 600000).toISOString(),
        consent_given: false,
        revenue_generated: 0
      }
    ]
  };

  const data = dashboardData || mockData;

  // Sample chart data
  const dailyData = [
    { date: 'Mon', visitors: 120, revenue: 15.50, consent_rate: 75 },
    { date: 'Tue', visitors: 150, revenue: 22.30, consent_rate: 72 },
    { date: 'Wed', visitors: 180, revenue: 28.90, consent_rate: 78 },
    { date: 'Thu', visitors: 200, revenue: 35.20, consent_rate: 74 },
    { date: 'Fri', visitors: 250, revenue: 42.10, consent_rate: 76 },
    { date: 'Sat', visitors: 180, revenue: 28.50, consent_rate: 71 },
    { date: 'Sun', visitors: 160, revenue: 25.80, consent_rate: 73 }
  ];

  const consentData = [
    { name: 'Consent Given', value: data.average_consent_rate, color: '#10B981' },
    { name: 'Consent Denied', value: 100 - data.average_consent_rate, color: '#EF4444' }
  ];

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
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                  )}
                  <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.abs(change)}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs yesterday</span>
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

  const ActivityItem = ({ activity }) => {
    const getEventIcon = (eventType) => {
      switch (eventType) {
        case 'consent_given':
          return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
        case 'consent_denied':
          return <div className="w-2 h-2 bg-red-500 rounded-full"></div>;
        case 'banner_shown':
          return <div className="w-2 h-2 bg-blue-500 rounded-full"></div>;
        default:
          return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>;
      }
    };

    const getEventText = (activity) => {
      switch (activity.event_type) {
        case 'consent_given':
          return `User gave consent on ${activity.website_domain}`;
        case 'consent_denied':
          return `User denied consent on ${activity.website_domain}`;
        case 'banner_shown':
          return `Cookie banner shown on ${activity.website_domain}`;
        default:
          return `Activity on ${activity.website_domain}`;
      }
    };

    const timeAgo = (date) => {
      const now = new Date();
      const activityDate = new Date(date);
      const diffInMinutes = Math.floor((now - activityDate) / (1000 * 60));
      
      if (diffInMinutes < 1) return 'Just now';
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    };

    return (
      <div className="flex items-start space-x-3 py-3">
        <div className="flex items-center justify-center w-6 h-6 mt-0.5">
          {getEventIcon(activity.event_type)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900">{getEventText(activity)}</p>
          <p className="text-xs text-gray-500">{timeAgo(activity.created_at)}</p>
        </div>
        {activity.revenue_generated > 0 && (
          <Badge variant="secondary" className="text-xs">
            +${activity.revenue_generated.toFixed(2)}
          </Badge>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
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
      {/* Header with Refresh */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Overview</h3>
          <p className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchDashboardData} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Error State */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-800">Failed to load analytics data: {error}</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={fetchDashboardData}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Websites"
          value={data.total_websites}
          change={12}
          icon={Globe}
          color="blue"
        />
        <MetricCard
          title="Visitors Today"
          value={data.total_visitors_today.toLocaleString()}
          change={8.5}
          icon={Users}
          color="green"
        />
        <MetricCard
          title="Revenue Today"
          value={`$${data.total_revenue_today.toFixed(2)}`}
          change={15.3}
          icon={DollarSign}
          color="purple"
        />
        <MetricCard
          title="Consent Rate"
          value={`${data.average_consent_rate.toFixed(1)}%`}
          change={-2.1}
          icon={TrendingUp}
          color="orange"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Visitors Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Visitors</CardTitle>
            <CardDescription>Visitor count over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visitors" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Daily revenue over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Consent Rate Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Consent Distribution</CardTitle>
            <CardDescription>Overall consent vs denial rate</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={consentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {consentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Consent Given</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Consent Denied</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest events across all your websites</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {data.recent_activity.length > 0 ? (
                data.recent_activity.map((activity, index) => (
                  <ActivityItem key={index} activity={activity} />
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsTab;

