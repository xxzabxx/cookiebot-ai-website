import React, { useState, Suspense, lazy } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  BarChart3, 
  Globe, 
  Shield, 
  DollarSign, 
  CreditCard, 
  Settings,
  LogOut,
  User,
  Bell,
  Palette,
  Code
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Lazy load tab components for better performance
const AnalyticsTab = lazy(() => import('../components/dashboard/AnalyticsTab'));
const WebsitesTab = lazy(() => import('../components/dashboard/WebsitesTab'));
const ComplianceTab = lazy(() => import('../components/dashboard/ComplianceTab'));
const RevenueTab = lazy(() => import('../components/dashboard/RevenueTab'));
const BillingTab = lazy(() => import('../components/dashboard/BillingTab'));
const SettingsTab = lazy(() => import('../components/dashboard/SettingsTab'));
const CustomizationTab = lazy(() => import('../components/dashboard/CustomizationTab'));
const ScriptTab = lazy(() => import('../components/dashboard/ScriptTab'));

const TabLoadingSkeleton = () => (
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
    <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
  </div>
);

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('analytics');

  const tabs = [
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: BarChart3, 
      component: AnalyticsTab,
      description: 'View your website analytics and performance metrics'
    },
    { 
      id: 'websites', 
      label: 'Websites', 
      icon: Globe, 
      component: WebsitesTab,
      description: 'Manage your websites and integration settings'
    },
    { 
      id: 'customization', 
      label: 'Customization', 
      icon: Palette, 
      component: CustomizationTab,
      description: 'Customize your cookie banner appearance and behavior'
    },
    { 
      id: 'script', 
      label: 'Script', 
      icon: Code, 
      component: ScriptTab,
      description: 'Get your integration script and implementation guide'
    },
    { 
      id: 'compliance', 
      label: 'Compliance', 
      icon: Shield, 
      component: ComplianceTab,
      description: 'Scan and monitor compliance status'
    },
    { 
      id: 'revenue', 
      label: 'Revenue', 
      icon: DollarSign, 
      component: RevenueTab,
      description: 'Track earnings and manage payouts'
    },
    { 
      id: 'billing', 
      label: 'Billing', 
      icon: CreditCard, 
      component: BillingTab,
      description: 'Manage subscription and payment methods'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings, 
      component: SettingsTab,
      description: 'Account settings and preferences'
    },
  ];

  const handleLogout = async () => {
    await logout();
  };

  const getUserInitials = () => {
    if (!user) return 'U';
    return `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase();
  };

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CookieBot.ai</h1>
                <p className="text-sm text-gray-500">Dashboard</p>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.first_name} {user?.last_name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.subscription_tier} Plan
                  </p>
                </div>
                <Avatar>
                  <AvatarFallback className="bg-blue-600 text-white">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </div>

              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Tab Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {currentTab?.label}
            </h2>
            <p className="text-gray-600">
              {currentTab?.description}
            </p>
          </div>

          {/* Tab Content */}
          <Suspense fallback={<TabLoadingSkeleton />}>
            {activeTab === 'analytics' && <AnalyticsTab />}
            {activeTab === 'websites' && <WebsitesTab />}
            {activeTab === 'customization' && <CustomizationTab />}
            {activeTab === 'script' && <ScriptTab />}
            {activeTab === 'compliance' && <ComplianceTab />}
            {activeTab === 'revenue' && <RevenueTab />}
            {activeTab === 'billing' && <BillingTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

