// API client for CookieBot.ai backend
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

  // Analytics methods
  async getDashboardSummary() {
    return this.request('/api/analytics/dashboard-summary');
  }

  async getWebsiteAnalytics(websiteId, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/analytics/websites/${websiteId}${queryString ? `?${queryString}` : ''}`);
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

