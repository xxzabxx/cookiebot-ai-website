import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../contexts/AuthContext';

const DemoLogin = () => {
  const { login } = useAuth();

  const handleDemoLogin = async () => {
    // Simulate a successful login with mock user data
    const mockUser = {
      id: 1,
      email: 'demo@cookiebot.ai',
      first_name: 'Demo',
      last_name: 'User',
      company: 'CookieBot.ai',
      subscription_tier: 'basic',
      created_at: new Date().toISOString()
    };

    // Simulate setting user in context
    localStorage.setItem('authToken', 'demo_token_123');
    
    // Manually trigger user state update
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        onClick={handleDemoLogin}
        className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
      >
        Demo Login
      </Button>
    </div>
  );
};

export default DemoLogin;

