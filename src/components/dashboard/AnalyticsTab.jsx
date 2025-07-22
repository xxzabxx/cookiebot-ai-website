import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  Globe, 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Calendar,
  RefreshCw,
  Zap,
  Info,
  CheckCircle,
  BarChart3,
  Eye,
  MousePointer,
  Clock
} from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

const AnalyticsTab = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [approach, setApproach] = useState('detecting');
  const [realTimeData, setRealTimeData] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    
    // Set up real-time updates for unified approach
    if (api.isUnifiedSupported(user)) {
      const interval = setInterval(fetchRealTimeData, 30000); // Every 30 seconds
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use enhanced API method that automatically chooses the best approach
      const response = await api.getAnalyticsData(user, { days: 30 });
      
      setDashboardData(response.data);
      setApproach(response.approach || 'legacy');
      setLastUpdated(new Date());
      
      // If unified approach is available, fetch additional unified data
      if (api.isUnifiedSupported(user)) {
        try {
          const unifiedBreakdown = await api.getUnifiedWebsiteBreakdown(user.api_key, 30);
          setDashboardData(prev => ({
            ...prev,
            website_breakdown: unifiedBreakdown.data.website_breakdown,
            unified_metrics: unifiedBreakdown.data.summary
          }));
        } catch (unifiedError) {
          console.warn('Failed to fetch unified breakdown:', unifiedError);
        }
      }
      
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRealTimeData = async () => {
    if (!api.isUnifiedSupported(user)) return;
    
    try {
      const response = await api.getUnifiedRealTimeStats(user.api_key);
      setRealTimeData(response.data);
    } catch (err) {
      console.warn('Failed to fetch real-time data:', err);
    }
  };

  // Enhanced mock data for demonstration
  const mockData = {
    total_websites: 3,
    total_visitors_today: 1247,
    total_revenue_today: 89.50,
    average_consent_rate: 73.2,
    approach: 'unified',
    website_breakdown: [
      {
        domain: 'example.com',
        total_events: 450,
        unique_visitors: 320,
        revenue: 45.20,
        consent_rate: 75.5
      },
      {
        domain: 'shop.example.com', 
        total_events: 380,
        unique_visitors: 280,
        revenue: 32.10,
        consent_rate: 71.2
      },
      {
        domain: 'blog.example.com',
        total_events: 220,
        unique_visitors: 180,
        revenue: 12.20,
        consent_rate: 78.8
      }
    ],
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
        event_type: 'consent_given',
        website_domain: 'blog.example.com',
        created_at: new Date(Date.now() - 600000).toISOString(),
        consent_given: true,
        revenue_generated: 0.15
      }
    ]
  };

  const data = dashboardData || mockData;

  // Enhanced chart data with unified metrics
  const dailyData = [
    { date: 'Mon', visitors: 120, revenue: 15.50, consent_rate: 75, websites: 2 },
    { date: 'Tue', visitors: 150, revenue: 22.30, consent_rate: 72, websites: 3 },
    { date: 'Wed', visitors: 180, revenue: 28.90, consent_rate: 78, websites: 3 },
    { date: 'Thu', visitors: 200, revenue: 35.20, consent_rate: 74, websites: 3 },
    { date: 'Fri', visitors: 250, revenue: 42.10, consent_rate: 76, websites: 3 },
    { date: 'Sat', visitors: 180, revenue: 28.50, consent_rate: 71, websites: 3 },
    { date: 'Sun', visitors: 160, revenue: 25.80, consent_rate: 73, websites: 3 }
  ];

  const consentData = [
    { name: 'Consent Given', value: data.average_consent_rate, color: '#10B981' },
    { name: 'Consent Denied', value: 100 - data.average_consent_rate, color: '#EF4444' }
  ];

  const MetricCard = ({ title, value, change, icon: Icon, color = 'blue', subtitle, realTime }) => {
    const isPositive = change > 0;
    const colorClasses = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600'
    };

    return (
      <Card className="relative overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium text-gray-600">{title}</p>
                {realTime && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                    Live
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              {subtitle && (
                <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
              )}
              {change !== undefined && (
                <div className="flex items-center mt-2">
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
          {realTime && (
            <div className="absolute top-2 right-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const WebsiteBreakdownCard = ({ website }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-gray-900">{website.domain}</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {website.consent_rate.toFixed(1)}% consent
          </Badge>
        </div>
        
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">{website.unique_visitors}</div>
            <div className="text-xs text-gray-500">Visitors</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">${website.revenue.toFixed(2)}</div>
            <div className="text-xs text-gray-500">Revenue</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">{website.total_events}</div>
            <div className="text-xs text-gray-500">Events</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
      {/* Header with Unified Status */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            Overview
            {approach === 'unified' && (
              <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Unified Analytics
              </Badge>
            )}
          </h3>
          <p className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
            {approach === 'unified' && ' • Real-time data across all websites'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchDashboardData} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          {approach === 'unified' && (
            <Button variant="outline" size="sm" onClick={fetchRealTimeData}>
              <Activity className="w-4 h-4 mr-2" />
              Real-time
            </Button>
          )}
        </div>
      </div>

      {/* Unified Analytics Info */}
      {approach === 'unified' && (
        <Alert className="border-green-200 bg-green-50">
          <Zap className="h-4 w-4" />
          <AlertDescription className="text-green-800">
            <strong>🚀 Unified Analytics Active!</strong> Your data is aggregated across all websites using your API key. 
            This provides faster queries, real-time updates, and cross-website insights.
          </AlertDescription>
        </Alert>
      )}

      {/* Error State */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">
            Failed to load analytics data: {error}
            <Button variant="outline" size="sm" className="mt-2 ml-2" onClick={fetchDashboardData}>
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Enhanced Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Websites"
          value={data.total_websites}
          change={12}
          icon={Globe}
          color="blue"
          subtitle={approach === 'unified' ? 'Auto-registered' : 'Managed'}
          realTime={approach === 'unified'}
        />
        <MetricCard
          title="Visitors Today"
          value={data.total_visitors_today.toLocaleString()}
          change={8.5}
          icon={Users}
          color="green"
          subtitle={approach === 'unified' ? 'Across all domains' : 'Total count'}
          realTime={approach === 'unified'}
        />
        <MetricCard
          title="Revenue Today"
          value={`$${data.total_revenue_today.toFixed(2)}`}
          change={15.3}
          icon={DollarSign}
          color="purple"
          subtitle={approach === 'unified' ? 'Unified tracking' : 'Total earned'}
          realTime={approach === 'unified'}
        />
        <MetricCard
          title="Consent Rate"
          value={`${data.average_consent_rate.toFixed(1)}%`}
          change={-2.1}
          icon={TrendingUp}
          color="orange"
          subtitle={approach === 'unified' ? 'Cross-website avg' : 'Overall rate'}
          realTime={approach === 'unified'}
        />
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Multi-Website Visitors Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              {approach === 'unified' ? 'Unified Daily Visitors' : 'Daily Visitors'}
            </CardTitle>
            <CardDescription>
              {approach === 'unified' 
                ? 'Aggregated visitor count across all your websites' 
                : 'Visitor count over the last 7 days'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.1}
                />
                {approach === 'unified' && (
                  <Area 
                    type="monotone" 
                    dataKey="websites" 
                    stroke="#10B981" 
                    fill="#10B981" 
                    fillOpacity={0.1}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Enhanced Revenue Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              {approach === 'unified' ? 'Unified Revenue Trend' : 'Revenue Trend'}
            </CardTitle>
            <CardDescription>
              {approach === 'unified' 
                ? 'Combined revenue across all your websites' 
                : 'Daily revenue over the last 7 days'
              }
            </CardDescription>
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

      {/* Website Breakdown Section (Enhanced for Unified) */}
      {approach === 'unified' && data.website_breakdown && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Website Performance Breakdown
            </CardTitle>
            <CardDescription>
              Individual performance metrics for each of your websites
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.website_breakdown.map((website, index) => (
                <WebsiteBreakdownCard key={index} website={website} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Consent Rate Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MousePointer className="w-5 h-5" />
              {approach === 'unified' ? 'Unified Consent Distribution' : 'Consent Distribution'}
            </CardTitle>
            <CardDescription>
              {approach === 'unified' 
                ? 'Consent rates across all your websites' 
                : 'Overall consent vs denial rate'
              }
            </CardDescription>
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

        {/* Enhanced Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              {approach === 'unified' ? 'Real-time Activity Feed' : 'Recent Activity'}
              {approach === 'unified' && realTimeData && (
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Live
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              {approach === 'unified' 
                ? 'Live events across all your websites' 
                : 'Latest events across all your websites'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {data.recent_activity.length > 0 ? (
                data.recent_activity.map((activity, index) => (
                  <ActivityItem key={index} activity={activity} />
                ))
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No recent activity</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Activity will appear here once your websites start receiving traffic
                  </p>
                </div>
              )}
            </div>
            
            {approach === 'unified' && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Updates automatically every 30 seconds</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Live</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Unified Analytics Benefits */}
      {approach === 'unified' && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Info className="w-5 h-5" />
              🚀 Unified Analytics Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-800">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Cross-Website Insights</span>
                </div>
                <p className="text-blue-700 text-xs ml-6">
                  See performance across all your domains in one view
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-800">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Real-time Updates</span>
                </div>
                <p className="text-blue-700 text-xs ml-6">
                  Live data updates every 30 seconds automatically
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-800">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Faster Performance</span>
                </div>
                <p className="text-blue-700 text-xs ml-6">
                  Optimized queries using your unified API key
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
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnalyticsTab;

