// Enhanced API client for CookieBot.ai with unified API key support
const API_BASE = import.meta.env.VITE_API_BASE || 'https://cookiebot-ai-backend-production.up.railway.app';

class APIClient {
  constructor() {
    this.baseURL = API_BASE;
    this.token = localStorage.getItem('authToken');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new APIError(data.error?.message || data.message || 'Request failed', response.status, data);
      }

      return data;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError('Network error occurred', 0, { originalError: error });
    }
  }

  // Authentication methods
  async register(userData) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: userData,
    });
  }

  async login(credentials) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: credentials,
    });
  }

  async refreshToken() {
    return this.request('/api/auth/refresh', {
      method: 'POST',
    });
  }

  async getCurrentUser() {
    return this.request('/api/auth/me');
  }

  async updateProfile(profileData) {
    return this.request('/api/auth/me', {
      method: 'PUT',
      body: profileData,
    });
  }

  async logout() {
    return this.request('/api/auth/logout', {
      method: 'POST',
    });
  }

  // Website methods
  async getWebsites(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/websites${queryString ? `?${queryString}` : ''}`);
  }

  async createWebsite(websiteData) {
    return this.request('/api/websites', {
      method: 'POST',
      body: websiteData,
    });
  }

  async getWebsite(websiteId) {
    return this.request(`/api/websites/${websiteId}`);
  }

  async updateWebsite(websiteId, websiteData) {
    return this.request(`/api/websites/${websiteId}`, {
      method: 'PUT',
      body: websiteData,
    });
  }

  async deleteWebsite(websiteId) {
    return this.request(`/api/websites/${websiteId}`, {
      method: 'DELETE',
    });
  }

  // Enhanced Analytics methods with unified API key support
  async getDashboardSummary(days = 30) {
    const queryString = new URLSearchParams({ days }).toString();
    return this.request(`/api/analytics/dashboard-summary${queryString ? `?${queryString}` : ''}`);
  }

  // NEW: Unified analytics methods
  async getUnifiedDashboardSummary(apiKey, days = 30) {
    return this.request('/api/analytics/unified-summary', {
      method: 'POST',
      body: { api_key: apiKey, days }
    });
  }

  async getUnifiedAnalytics(apiKey, params = {}) {
    return this.request('/api/analytics/unified', {
      method: 'POST',
      body: { api_key: apiKey, ...params }
    });
  }

  async migrateToUnified() {
    return this.request('/api/analytics/migrate-to-unified', {
      method: 'POST'
    });
  }

  async getWebsiteAnalytics(websiteId, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/analytics/websites/${websiteId}${queryString ? `?${queryString}` : ''}`);
  }

  async getAnalyticsEvents(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/analytics/events${queryString ? `?${queryString}` : ''}`);
  }

  async exportAnalytics(exportData) {
    return this.request('/api/analytics/export', {
      method: 'POST',
      body: exportData
    });
  }

  // Enhanced Public API methods for unified approach
  async registerWebsiteUnified(apiKey, domain, referrer = '') {
    return this.request('/api/public/register-website', {
      method: 'POST',
      body: { api_key: apiKey, domain, referrer }
    });
  }

  async trackEventUnified(apiKey, domain, eventData) {
    return this.request('/api/public/track', {
      method: 'POST',
      body: { 
        api_key: apiKey, 
        domain,
        ...eventData 
      }
    });
  }

  async getUnifiedDashboardSummaryPublic(apiKey, days = 30) {
    return this.request('/api/public/dashboard-summary', {
      method: 'POST',
      body: { api_key: apiKey, days }
    });
  }

  async getWebsiteStatus(identifier) {
    return this.request(`/api/public/status/${identifier}`);
  }

  // Compliance methods
  async startComplianceScan(url) {
    return this.request('/api/compliance/real-scan', {
      method: 'POST',
      body: { url },
    });
  }

  async getComplianceScan(scanId) {
    return this.request(`/api/compliance/scan/${scanId}`);
  }

  // Billing methods
  async getSubscriptionPlans() {
    return this.request('/api/billing/plans');
  }

  async subscribe(subscriptionData) {
    return this.request('/api/billing/subscribe', {
      method: 'POST',
      body: subscriptionData,
    });
  }

  async getSubscription() {
    return this.request('/api/billing/subscription');
  }

  async cancelSubscription() {
    return this.request('/api/billing/cancel-subscription', {
      method: 'POST',
    });
  }

  // Privacy insights methods
  async getRevenueData() {
    return this.request('/api/privacy-insights/revenue');
  }

  async requestPayout(payoutData) {
    return this.request('/api/privacy-insights/payout', {
      method: 'POST',
      body: payoutData,
    });
  }

  // Contact method
  async submitContact(contactData) {
    return this.request('/api/contact', {
      method: 'POST',
      body: contactData,
    });
  }

  // Health check
  async getHealth() {
    return this.request('/api/health');
  }

  // NEW: Utility methods for unified approach
  async testUnifiedConnection(apiKey) {
    try {
      const response = await this.getUnifiedDashboardSummary(apiKey, 1);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async validateApiKey(apiKey) {
    try {
      const response = await this.getWebsiteStatus(apiKey);
      return { valid: true, data: response };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }

  // NEW: Batch operations for unified approach
  async batchTrackEvents(apiKey, events) {
    return this.request('/api/public/batch-track', {
      method: 'POST',
      body: { 
        api_key: apiKey,
        events 
      }
    });
  }

  // NEW: Enhanced analytics with unified support
  async getUnifiedRevenueAnalytics(apiKey, params = {}) {
    return this.request('/api/analytics/unified-revenue', {
      method: 'POST',
      body: { api_key: apiKey, ...params }
    });
  }

  async getUnifiedConsentAnalytics(apiKey, params = {}) {
    return this.request('/api/analytics/unified-consent', {
      method: 'POST',
      body: { api_key: apiKey, ...params }
    });
  }

  async getUnifiedTrafficAnalytics(apiKey, params = {}) {
    return this.request('/api/analytics/unified-traffic', {
      method: 'POST',
      body: { api_key: apiKey, ...params }
    });
  }

  // NEW: Real-time unified analytics
  async getUnifiedRealTimeStats(apiKey) {
    return this.request('/api/analytics/unified-realtime', {
      method: 'POST',
      body: { api_key: apiKey }
    });
  }

  // NEW: Unified website management
  async getUnifiedWebsites(apiKey) {
    return this.request('/api/analytics/unified-websites', {
      method: 'POST',
      body: { api_key: apiKey }
    });
  }

  async getUnifiedWebsiteBreakdown(apiKey, days = 30) {
    return this.request('/api/analytics/unified-breakdown', {
      method: 'POST',
      body: { api_key: apiKey, days }
    });
  }

  // NEW: Advanced unified features
  async getUnifiedComparisonData(apiKey, compareParams = {}) {
    return this.request('/api/analytics/unified-comparison', {
      method: 'POST',
      body: { api_key: apiKey, ...compareParams }
    });
  }

  async getUnifiedTrendAnalysis(apiKey, trendParams = {}) {
    return this.request('/api/analytics/unified-trends', {
      method: 'POST',
      body: { api_key: apiKey, ...trendParams }
    });
  }

  async getUnifiedPerformanceMetrics(apiKey) {
    return this.request('/api/analytics/unified-performance', {
      method: 'POST',
      body: { api_key: apiKey }
    });
  }

  // NEW: Unified export capabilities
  async exportUnifiedAnalytics(apiKey, exportParams = {}) {
    return this.request('/api/analytics/unified-export', {
      method: 'POST',
      body: { api_key: apiKey, ...exportParams }
    });
  }

  // NEW: Unified configuration management
  async getUnifiedConfiguration(apiKey) {
    return this.request('/api/config/unified', {
      method: 'POST',
      body: { api_key: apiKey }
    });
  }

  async updateUnifiedConfiguration(apiKey, configData) {
    return this.request('/api/config/unified', {
      method: 'PUT',
      body: { api_key: apiKey, ...configData }
    });
  }

  // NEW: Unified monitoring and alerts
  async getUnifiedAlerts(apiKey) {
    return this.request('/api/alerts/unified', {
      method: 'POST',
      body: { api_key: apiKey }
    });
  }

  async createUnifiedAlert(apiKey, alertData) {
    return this.request('/api/alerts/unified', {
      method: 'POST',
      body: { api_key: apiKey, ...alertData }
    });
  }

  // Helper method to determine if user has unified support
  isUnifiedSupported(user) {
    return user && user.api_key && user.api_key.startsWith('cb_api_');
  }

  // Helper method to get the appropriate analytics method
  async getAnalyticsData(user, params = {}) {
    if (this.isUnifiedSupported(user)) {
      try {
        return await this.getUnifiedDashboardSummary(user.api_key, params.days);
      } catch (error) {
        console.warn('Unified analytics failed, falling back to legacy:', error);
        return await this.getDashboardSummary(params.days);
      }
    } else {
      return await this.getDashboardSummary(params.days);
    }
  }

  // Helper method for progressive enhancement
  async enhanceWithUnified(user, legacyData) {
    if (!this.isUnifiedSupported(user)) {
      return legacyData;
    }

    try {
      const unifiedData = await this.getUnifiedDashboardSummary(user.api_key);
      return {
        ...legacyData,
        unified: unifiedData.data,
        approach: 'unified',
        enhanced: true
      };
    } catch (error) {
      console.warn('Failed to enhance with unified data:', error);
      return {
        ...legacyData,
        approach: 'legacy',
        enhanced: false
      };
    }
  }
}

class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

export const api = new APIClient();
export { APIError };

