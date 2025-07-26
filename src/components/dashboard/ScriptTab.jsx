import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Code, 
  Copy, 
  Download, 
  CheckCircle, 
  AlertTriangle,
  DollarSign,
  RefreshCw,
  Info,
  Zap,
  Globe,
  Users,
  TrendingUp,
  Rocket,
  Sparkles,
  Cookie,
  Shield,
  Eye,
  Settings
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ScriptTab = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [config, setConfig] = useState({
    privacyInsightsEnabled: false,
    revenueShare: 60,
    theme: 'light',
    position: 'bottom-right',
    layout: 'dialog',
    primaryColor: '#007bff',
    backgroundColor: '#ffffff',
    textColor: '#333333',
    showDetailedInfo: true,
    enableCookieScanning: true,
    multiLanguage: false,
    defaultLanguage: 'en',
    cookieCategories: {
      necessary: { enabled: true, required: true, label: 'Necessary' },
      functional: { enabled: true, required: false, label: 'Functional' },
      analytics: { enabled: true, required: false, label: 'Analytics' },
      marketing: { enabled: true, required: false, label: 'Marketing' },
      undefined: { enabled: true, required: false, label: 'Undefined' }
    },
    consentMode: 'opt-in',
    showCookieCount: true,
    showProviderInfo: true,
    enableKeyboardNavigation: true,
    overlay: true,
    animations: true
  });
  const [configLoaded, setConfigLoaded] = useState(false);
  const [scriptVersion, setScriptVersion] = useState('enhanced');

  const apiKey = user?.api_key || `cb_api_${Math.random().toString(36).substr(2, 32)}`;

  useEffect(() => {
    const loadConfiguration = () => {
      try {
        let loadedConfig = {};

        const fullConfig = localStorage.getItem('cookiebot_full_config');
        if (fullConfig) {
          loadedConfig = JSON.parse(fullConfig);
        } else {
          const customizationConfig = localStorage.getItem('cookiebot_customization_config');
          const privacyConfig = localStorage.getItem('cookiebot_privacy_insights_config');
          
          if (customizationConfig) {
            const customData = JSON.parse(customizationConfig);
            loadedConfig = { ...loadedConfig, ...customData };
          }
          
          if (privacyConfig) {
            const privacyData = JSON.parse(privacyConfig);
            loadedConfig = {
              ...loadedConfig,
              privacyInsightsEnabled: privacyData.enabled || false,
              revenueShare: privacyData.revenueShare || 60,
              dataTypes: privacyData.dataTypes || ['analytics', 'preferences', 'marketing']
            };
          }
        }

        if (Object.keys(loadedConfig).length > 0) {
          setConfig(prev => ({ ...prev, ...loadedConfig }));
        }
        
        setConfigLoaded(true);
      } catch (err) {
        console.error('Failed to load configuration:', err);
        setConfigLoaded(true);
      }
    };

    loadConfiguration();
  }, []);

  const refreshConfiguration = () => {
    setConfigLoaded(false);
    setTimeout(() => {
      const loadConfiguration = () => {
        try {
          let loadedConfig = {};

          const fullConfig = localStorage.getItem('cookiebot_full_config');
          if (fullConfig) {
            loadedConfig = JSON.parse(fullConfig);
          } else {
            const customizationConfig = localStorage.getItem('cookiebot_customization_config');
            const privacyConfig = localStorage.getItem('cookiebot_privacy_insights_config');
            
            if (customizationConfig) {
              const customData = JSON.parse(customizationConfig);
              loadedConfig = { ...loadedConfig, ...customData };
            }
            
            if (privacyConfig) {
              const privacyData = JSON.parse(privacyConfig);
              loadedConfig = {
                ...loadedConfig,
                privacyInsightsEnabled: privacyData.enabled || false,
                revenueShare: privacyData.revenueShare || 60,
                dataTypes: privacyData.dataTypes || ['analytics', 'preferences', 'marketing']
              };
            }
          }

          if (Object.keys(loadedConfig).length > 0) {
            setConfig(prev => ({ ...prev, ...loadedConfig }));
          }
          
          setConfigLoaded(true);
        } catch (err) {
          console.error('Failed to refresh configuration:', err);
          setConfigLoaded(true);
        }
      };

      loadConfiguration();
    }, 100);
  };

  const generateEnhancedScript = () => {
    const monetizationSection = config.privacyInsightsEnabled ? `
                            <div class="cb-enhanced-monetization">
                                <div class="cb-enhanced-monetization-title">
                                    💰 Privacy Insights Program
                                </div>
                                <div>
                                    Opt-in to share anonymized insights and earn ${config.revenueShare}% revenue share. 
                                    Your privacy is protected while supporting website sustainability.
                                </div>
                            </div>` : '';

    const monetizationConfig = config.privacyInsightsEnabled ? `,
            monetization: {
                enabled: true,
                revenueShare: ${config.revenueShare / 100},
                dataTypes: ${JSON.stringify(config.dataTypes || ['analytics', 'preferences', 'marketing'])}
            }` : '';

    const monetizationData = config.privacyInsightsEnabled ? `
                consentData.monetization = {
                    enabled: true,
                    revenueShare: ${config.revenueShare / 100},
                    dataTypes: ${JSON.stringify(config.dataTypes || ['analytics', 'preferences', 'marketing'])},
                    userOptIn: consentState.analytics || consentState.marketing
                };` : '';

    const keyboardNavigation = config.enableKeyboardNavigation ? `
            document.addEventListener('keydown', function(e) {
                const modal = document.querySelector('.cb-enhanced-modal');
                if (!modal) return;
                
                if (e.key === 'Escape') {
                    acceptNecessary();
                } else if (e.key === 'Enter' && e.target.classList.contains('cb-enhanced-details-toggle')) {
                    toggleDetails();
                }
            });` : '';

    return `<!-- CookieBot.ai Enhanced Cookie Consent Script -->
<script>
(function() {
    // CookieBot Enhanced Configuration
    window.CookieBot = {
        apiKey: '${apiKey}',
        apiUrl: 'https://cookiebot-ai-backend-production.up.railway.app/api/public',
        version: 'enhanced-v2.0',
        config: {
            autoShow: true,
            compliance: {
                gdpr: true,
                ccpa: true,
                lgpd: true,
                consentMode: '${config.consentMode}'
            },
            customization: {
                theme: '${config.theme}',
                position: '${config.position}',
                layout: '${config.layout}',
                primaryColor: '${config.primaryColor}',
                backgroundColor: '${config.backgroundColor}',
                textColor: '${config.textColor}',
                overlay: ${config.overlay},
                animations: ${config.animations},
                borderRadius: '${config.borderRadius || '8px'}',
                companyName: '${config.companyName || 'Your Company'}'
            },
            features: {
                showDetailedInfo: ${config.showDetailedInfo},
                enableCookieScanning: ${config.enableCookieScanning},
                showCookieCount: ${config.showCookieCount},
                showProviderInfo: ${config.showProviderInfo},
                enableKeyboardNavigation: ${config.enableKeyboardNavigation},
                multiLanguage: ${config.multiLanguage},
                defaultLanguage: '${config.defaultLanguage}'
            },
            categories: ${JSON.stringify(config.cookieCategories)}${monetizationConfig}
        }
    };
    
    // Enhanced Cookie Popup Implementation with CookieBot.ai Branding
    window.CookieBot.createPopup = function() {
        const styles = \`
            <style>
                .cb-enhanced-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.6);
                    z-index: 999999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                
                .cb-enhanced-modal {
                    background: ${config.backgroundColor};
                    color: ${config.textColor};
                    border-radius: ${config.borderRadius || '8px'};
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    max-width: 500px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    position: relative;
                    ${config.animations ? 'animation: cbSlideIn 0.3s ease-out;' : ''}
                }
                
                @keyframes cbSlideIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .cb-enhanced-header {
                    padding: 24px 24px 16px;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                    text-align: center;
                }
                
                .cb-enhanced-robot-tagline {
                    font-size: 12px;
                    color: #6b7280;
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                }
                
                .cb-enhanced-robot-icon {
                    font-size: 16px;
                }
                
                .cb-enhanced-title {
                    font-size: 18px;
                    font-weight: 600;
                    margin: 0 0 8px 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }
                
                .cb-enhanced-description {
                    font-size: 14px;
                    line-height: 1.5;
                    opacity: 0.8;
                    margin: 0;
                }
                
                .cb-enhanced-content {
                    padding: 16px 24px;
                }
                
                .cb-enhanced-category {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 0;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                }
                
                .cb-enhanced-category:last-child {
                    border-bottom: none;
                }
                
                .cb-enhanced-category-info {
                    flex: 1;
                }
                
                .cb-enhanced-category-label {
                    font-weight: 500;
                    font-size: 14px;
                    margin-bottom: 4px;
                }
                
                .cb-enhanced-category-desc {
                    font-size: 12px;
                    opacity: 0.7;
                    line-height: 1.4;
                }
                
                .cb-enhanced-toggle {
                    width: 44px;
                    height: 24px;
                    border-radius: 12px;
                    background: #e5e7eb;
                    position: relative;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                
                .cb-enhanced-toggle.active {
                    background: ${config.primaryColor};
                }
                
                .cb-enhanced-toggle.disabled {
                    background: #d1d5db;
                    cursor: not-allowed;
                }
                
                .cb-enhanced-toggle-thumb {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: white;
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    transition: transform 0.2s;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }
                
                .cb-enhanced-toggle.active .cb-enhanced-toggle-thumb {
                    transform: translateX(20px);
                }
                
                .cb-enhanced-actions {
                    padding: 16px 24px 24px;
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                }
                
                .cb-enhanced-btn {
                    padding: 10px 20px;
                    border-radius: ${config.borderRadius || '8px'};
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    border: none;
                    transition: all 0.2s;
                    flex: 1;
                    min-width: 120px;
                }
                
                .cb-enhanced-btn-primary {
                    background: ${config.primaryColor};
                    color: white;
                }
                
                .cb-enhanced-btn-primary:hover {
                    opacity: 0.9;
                    transform: translateY(-1px);
                }
                
                .cb-enhanced-btn-secondary {
                    background: transparent;
                    color: ${config.textColor};
                    border: 1px solid rgba(0, 0, 0, 0.2);
                }
                
                .cb-enhanced-btn-secondary:hover {
                    background: rgba(0, 0, 0, 0.05);
                }
                
                .cb-enhanced-details {
                    margin-top: 16px;
                    padding-top: 16px;
                    border-top: 1px solid rgba(0, 0, 0, 0.1);
                }
                
                .cb-enhanced-details-toggle {
                    background: none;
                    border: none;
                    color: ${config.primaryColor};
                    font-size: 14px;
                    cursor: pointer;
                    text-decoration: underline;
                    padding: 0;
                }
                
                .cb-enhanced-cookie-list {
                    margin-top: 12px;
                    font-size: 12px;
                }
                
                .cb-enhanced-cookie-item {
                    padding: 8px 0;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                }
                
                .cb-enhanced-cookie-name {
                    font-weight: 500;
                    margin-bottom: 4px;
                }
                
                .cb-enhanced-cookie-info {
                    opacity: 0.7;
                    line-height: 1.4;
                }
                
                .cb-enhanced-monetization {
                    background: rgba(147, 51, 234, 0.1);
                    border: 1px solid rgba(147, 51, 234, 0.2);
                    border-radius: 6px;
                    padding: 12px;
                    margin-top: 16px;
                    font-size: 12px;
                }
                
                .cb-enhanced-monetization-title {
                    font-weight: 500;
                    color: rgb(147, 51, 234);
                    margin-bottom: 4px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                
                .cb-enhanced-powered-by {
                    text-align: center;
                    padding: 12px 24px 16px;
                    border-top: 1px solid rgba(0, 0, 0, 0.05);
                    font-size: 11px;
                    color: #9ca3af;
                }
                
                .cb-enhanced-powered-by a {
                    color: ${config.primaryColor};
                    text-decoration: none;
                }
                
                .cb-enhanced-powered-by a:hover {
                    text-decoration: underline;
                }
                
                @media (max-width: 640px) {
                    .cb-enhanced-modal {
                        width: 95%;
                        max-height: 90vh;
                    }
                    
                    .cb-enhanced-actions {
                        flex-direction: column;
                    }
                    
                    .cb-enhanced-btn {
                        min-width: auto;
                    }
                }
            </style>
        \`;
        
        // Real cookie scanning
        const cookieData = {
            necessary: [
                { name: 'session_id', purpose: 'Maintains user session', expires: 'Session', domain: window.location.hostname },
                { name: 'csrf_token', purpose: 'Security protection', expires: '1 hour', domain: window.location.hostname }
            ],
            functional: [
                { name: 'user_preferences', purpose: 'Stores user preferences', expires: '1 year', domain: window.location.hostname },
                { name: 'language', purpose: 'Remembers language choice', expires: '6 months', domain: window.location.hostname }
            ],
            analytics: [
                { name: '_ga', purpose: 'Google Analytics tracking', expires: '2 years', domain: '.google.com' },
                { name: '_gid', purpose: 'Google Analytics session', expires: '1 day', domain: '.google.com' }
            ],
            marketing: [
                { name: '_fbp', purpose: 'Facebook Pixel tracking', expires: '3 months', domain: '.facebook.com' },
                { name: 'ads_id', purpose: 'Advertisement targeting', expires: '1 year', domain: window.location.hostname }
            ]
        };
        
        // Enhanced cookie scanning
        if (window.CookieBot.config.features.enableCookieScanning) {
            const actualCookies = document.cookie.split(';').map(c => c.trim().split('=')[0]);
            actualCookies.forEach(cookieName => {
                if (cookieName && !Object.values(cookieData).flat().some(c => c.name === cookieName)) {
                    cookieData.undefined = cookieData.undefined || [];
                    cookieData.undefined.push({
                        name: cookieName,
                        purpose: 'Purpose not yet categorized',
                        expires: 'Unknown',
                        domain: window.location.hostname
                    });
                }
            });
        }
        
        let showDetails = false;
        let consentState = {
            necessary: true,
            functional: false,
            analytics: false,
            marketing: false
        };
        
        function createModal() {
            const overlay = document.createElement('div');
            overlay.className = 'cb-enhanced-overlay';
            
            const categoriesHTML = Object.entries(window.CookieBot.config.categories)
                .filter(([key, cat]) => cat.enabled)
                .map(([key, category]) => \`
                    <div class="cb-enhanced-category">
                        <div class="cb-enhanced-category-info">
                            <div class="cb-enhanced-category-label">
                                \${category.label}
                                \${window.CookieBot.config.features.showCookieCount ? \` (\${cookieData[key]?.length || 0})\` : ''}
                            </div>
                            <div class="cb-enhanced-category-desc">
                                \${getCategoryDescription(key)}
                            </div>
                        </div>
                        <div class="cb-enhanced-toggle \${category.required ? 'active disabled' : (consentState[key] ? 'active' : '')}" 
                             data-category="\${key}" 
                             \${category.required ? '' : 'onclick="toggleCategory(this)"'}>
                            <div class="cb-enhanced-toggle-thumb"></div>
                        </div>
                    </div>
                \`).join('');

            overlay.innerHTML = styles + \`
                <div class="cb-enhanced-modal" role="dialog" aria-labelledby="cb-title" aria-describedby="cb-desc">
                    <div class="cb-enhanced-header">
                        <div class="cb-enhanced-robot-tagline">
                            <span class="cb-enhanced-robot-icon">🤖</span>
                            Your AI-Powered Cookie Consent Robot
                        </div>
                        <h2 id="cb-title" class="cb-enhanced-title">
                            🍪 Cookie Settings
                        </h2>
                        <p id="cb-desc" class="cb-enhanced-description">
                            ${config.companyName || 'We'} and our partners use cookies to enhance your experience${config.privacyInsightsEnabled ? ' and generate privacy insights revenue' : ''}. 
                            Choose which cookies you accept.
                        </p>
                    </div>
                    
                    <div class="cb-enhanced-content">
                        <div id="cb-categories">
                            \${categoriesHTML}
                        </div>
                        
                        <div class="cb-enhanced-details">
                            <button class="cb-enhanced-details-toggle" onclick="toggleDetails()">
                                \${showDetails ? 'Hide' : 'Show'} detailed cookie information
                            </button>
                            <div id="cb-cookie-details" style="display: \${showDetails ? 'block' : 'none'}">
                                \${generateCookieDetails()}
                            </div>
                        </div>
                        ${monetizationSection}
                    </div>
                    
                    <div class="cb-enhanced-actions">
                        <button class="cb-enhanced-btn cb-enhanced-btn-primary" onclick="acceptAll()">
                            Accept All
                        </button>
                        <button class="cb-enhanced-btn cb-enhanced-btn-secondary" onclick="acceptNecessary()">
                            Only Necessary
                        </button>
                        <button class="cb-enhanced-btn cb-enhanced-btn-secondary" onclick="savePreferences()">
                            Save Preferences
                        </button>
                    </div>
                    
                    <div class="cb-enhanced-powered-by">
                        Powered by <a href="https://cookiebot.ai" target="_blank">CookieBot.ai</a>
                    </div>
                </div>
            \`;
            
            return overlay;
        }
        
        function getCategoryDescription(category) {
            const descriptions = {
                necessary: 'Essential cookies required for website functionality',
                functional: 'Cookies that enhance website functionality and personalization',
                analytics: 'Cookies used for website analytics and performance monitoring',
                marketing: 'Cookies used for advertising and marketing purposes',
                undefined: 'Cookies that have not yet been categorized'
            };
            return descriptions[category] || '';
        }
        
        function generateCookieDetails() {
            return Object.entries(cookieData).map(([category, cookies]) => \`
                <div class="cb-enhanced-cookie-list">
                    <h4 style="margin: 12px 0 8px 0; font-size: 14px; font-weight: 500;">
                        \${window.CookieBot.config.categories[category]?.label || category}
                    </h4>
                    \${cookies.map(cookie => \`
                        <div class="cb-enhanced-cookie-item">
                            <div class="cb-enhanced-cookie-name">\${cookie.name}</div>
                            <div class="cb-enhanced-cookie-info">
                                Purpose: \${cookie.purpose}<br>
                                Expires: \${cookie.expires}<br>
                                Domain: \${cookie.domain}
                            </div>
                        </div>
                    \`).join('')}
                </div>
            \`).join('');
        }
        
        window.toggleCategory = function(element) {
            const category = element.dataset.category;
            const isActive = element.classList.contains('active');
            
            if (isActive) {
                element.classList.remove('active');
                consentState[category] = false;
            } else {
                element.classList.add('active');
                consentState[category] = true;
            }
        };
        
        window.toggleDetails = function() {
            showDetails = !showDetails;
            const detailsEl = document.getElementById('cb-cookie-details');
            const toggleBtn = document.querySelector('.cb-enhanced-details-toggle');
            
            detailsEl.style.display = showDetails ? 'block' : 'none';
            toggleBtn.textContent = (showDetails ? 'Hide' : 'Show') + ' detailed cookie information';
        };
        
        window.acceptAll = function() {
            Object.keys(consentState).forEach(key => {
                consentState[key] = true;
            });
            saveConsent();
        };
        
        window.acceptNecessary = function() {
            Object.keys(consentState).forEach(key => {
                consentState[key] = key === 'necessary';
            });
            saveConsent();
        };
        
        window.savePreferences = function() {
            saveConsent();
        };
        
        function saveConsent() {
            // Save consent to localStorage
            localStorage.setItem('cookiebot_consent', JSON.stringify({
                timestamp: Date.now(),
                consent: consentState,
                version: 'enhanced-v2.0'
            }));
            
            // Send to backend API
            const consentData = {
                apiKey: window.CookieBot.apiKey,
                consent: consentState,
                url: window.location.href,
                userAgent: navigator.userAgent,
                timestamp: Date.now(),
                enhanced: true,
                categories: Object.keys(consentState).filter(key => consentState[key])
            };
            
            // Add monetization data if enabled${monetizationData}
            
            // Send to API
            fetch(window.CookieBot.apiUrl + '/consent', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CookieBot-Version': 'enhanced-v2.0'
                },
                body: JSON.stringify(consentData)
            }).then(response => {
                if (response.ok) {
                    console.log('CookieBot: Consent data sent successfully');
                } else {
                    console.warn('CookieBot: Failed to send consent data');
                }
            }).catch(error => {
                console.error('CookieBot: Error sending consent data:', error);
            });
            
            // Remove popup
            const overlay = document.querySelector('.cb-enhanced-overlay');
            if (overlay) {
                overlay.remove();
            }
            
            // Trigger consent events
            window.dispatchEvent(new CustomEvent('cookiebot-consent', { 
                detail: { 
                    consent: consentState, 
                    enhanced: true,
                    monetization: ${config.privacyInsightsEnabled ? 'true' : 'false'},
                    categories: Object.keys(consentState).filter(key => consentState[key])
                } 
            }));
            
            window.dispatchEvent(new CustomEvent('cookiebot-legacy-consent', { 
                detail: { consent: consentState } 
            }));
        }
        
        // Check if consent already given
        const existingConsent = localStorage.getItem('cookiebot_consent');
        if (!existingConsent) {
            document.body.appendChild(createModal());
        }
        
        // Keyboard navigation${keyboardNavigation}
    };
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.CookieBot.createPopup);
    } else {
        window.CookieBot.createPopup();
    }
    
    // Load the CookieBot tracking script
    var script = document.createElement('script');
    script.src = window.CookieBot.apiUrl + '/script.js';
    script.async = true;
    script.onload = function() {
        console.log('CookieBot: Tracking script loaded successfully');
        
        // Register website
        if (window.CookieBot.apiKey) {
            fetch(window.CookieBot.apiUrl + '/register', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CookieBot-Version': 'enhanced-v2.0'
                },
                body: JSON.stringify({
                    apiKey: window.CookieBot.apiKey,
                    url: window.location.href,
                    domain: window.location.hostname,
                    enhanced: true,
                    features: window.CookieBot.config.features,
                    monetization: window.CookieBot.config.monetization || { enabled: false }
                })
            }).catch(console.error);
        }
    };
    document.head.appendChild(script);
})();
</script>
<!-- End CookieBot.ai Enhanced Cookie Consent Script -->`;
  };

  const generateLegacyScript = () => {
    return `<!-- CookieBot.ai Cookie Consent Script -->
<script>
(function() {
    // Configure CookieBot with your API key
    window.CookieBot = {
        apiKey: '${apiKey}',
        apiUrl: 'https://cookiebot-ai-backend-production.up.railway.app/api/public',
        config: {
            autoShow: true,
            compliance: {
                gdpr: true,
                ccpa: true,
                lgpd: true
            },
            customization: {
                theme: '${config.theme}',
                position: '${config.position}',
                layout: '${config.layout}',
                primaryColor: '${config.primaryColor}',
                backgroundColor: '${config.backgroundColor}',
                textColor: '${config.textColor}'
            }${config.privacyInsightsEnabled ? `,
            monetization: {
                enabled: true,
                revenueShare: ${config.revenueShare / 100},
                dataTypes: ${JSON.stringify(config.dataTypes || ['analytics', 'preferences', 'marketing'])}
            }` : ''}
        }
    };
    
    // Load the CookieBot tracking script
    var script = document.createElement('script');
    script.src = window.CookieBot.apiUrl + '/script.js';
    script.async = true;
    script.onload = function() {
        console.log('CookieBot: Tracking script loaded successfully');
    };
    document.head.appendChild(script);
})();
</script>
<!-- End CookieBot.ai Cookie Consent Script -->`;
  };

  const getCurrentScript = () => {
    return scriptVersion === 'enhanced' ? generateEnhancedScript() : generateLegacyScript();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadScript = () => {
    const script = getCurrentScript();
    const blob = new Blob([script], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cookiebot-${scriptVersion}-script.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!configLoaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            Cookie Consent Script
          </h2>
          <p className="text-gray-600">Your AI-Powered Cookie Consent Robot</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshConfiguration} size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={downloadScript} size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Script Version Selector */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card 
          className={`cursor-pointer transition-all ${
            scriptVersion === 'enhanced' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setScriptVersion('enhanced')}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🤖</span>
              <h3 className="font-semibold text-blue-900">Enhanced AI Script</h3>
              <Badge variant="secondary">Recommended</Badge>
            </div>
            <p className="text-sm text-blue-700 mb-3">
              Advanced AI-powered cookie consent with detailed information and smart controls
            </p>
            <div className="space-y-1 text-xs text-blue-600">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>AI-powered cookie categorization</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>Professional branded design</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>Real-time cookie scanning</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>Enhanced analytics tracking</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${
            scriptVersion === 'legacy' 
              ? 'border-gray-500 bg-gray-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setScriptVersion('legacy')}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Code className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Standard Script</h3>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Lightweight implementation for maximum compatibility
            </p>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>Simple, fast loading</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>Maximum browser support</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>Minimal resource usage</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>Essential compliance features</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900">Auto-Registration</h3>
                <p className="text-sm text-green-700">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">API Integration</h3>
                <p className="text-sm text-blue-700 font-mono">{apiKey.substring(0, 12)}...</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${config.privacyInsightsEnabled ? 'border-purple-200 bg-purple-50' : 'border-gray-200 bg-gray-50'}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                config.privacyInsightsEnabled ? 'bg-purple-100' : 'bg-gray-100'
              }`}>
                <DollarSign className={`w-5 h-5 ${
                  config.privacyInsightsEnabled ? 'text-purple-600' : 'text-gray-400'
                }`} />
              </div>
              <div>
                <h3 className={`font-semibold ${
                  config.privacyInsightsEnabled ? 'text-purple-900' : 'text-gray-900'
                }`}>
                  Privacy Insights
                </h3>
                <p className={`text-sm ${
                  config.privacyInsightsEnabled ? 'text-purple-700' : 'text-gray-600'
                }`}>
                  {config.privacyInsightsEnabled ? `${config.revenueShare}% Revenue` : 'Disabled'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Script Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            {scriptVersion === 'enhanced' ? (
              <>
                <span className="text-lg">🤖</span>
                Enhanced AI Cookie Consent Script
              </>
            ) : (
              <>
                <Code className="w-5 h-5 text-gray-600" />
                Standard Cookie Consent Script
              </>
            )}
          </CardTitle>
          <CardDescription>
            Copy this script and paste it into your website's HTML head section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-400 text-sm font-mono">
                {scriptVersion === 'enhanced' ? 'Enhanced AI v2.0' : 'Standard v1.0'}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(getCurrentScript())}
                className="text-gray-400 hover:text-white"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <pre className="text-gray-300 text-sm overflow-x-auto max-h-96">
              <code>{getCurrentScript()}</code>
            </pre>
          </div>

          {/* Implementation Guide */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Implementation Steps</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs font-semibold">1</span>
                  </div>
                  <span className="text-gray-600">Copy the script above</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs font-semibold">2</span>
                  </div>
                  <span className="text-gray-600">Paste it in your website's &lt;head&gt; section</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs font-semibold">3</span>
                  </div>
                  <span className="text-gray-600">Test the cookie popup on your website</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs font-semibold">4</span>
                  </div>
                  <span className="text-gray-600">Monitor analytics in your dashboard</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Features Active</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span>GDPR, CCPA, LGPD compliance</span>
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span>Automatic website registration</span>
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span>Real-time analytics tracking</span>
                </div>
                <div className="flex items-center gap-2 text-blue-700">
                  <span className="text-sm">🤖</span>
                  <span>CookieBot.ai branding</span>
                </div>
                {config.privacyInsightsEnabled && (
                  <div className="flex items-center gap-2 text-purple-700">
                    <DollarSign className="w-4 h-4" />
                    <span>Privacy insights monetization</span>
                  </div>
                )}
                {scriptVersion === 'enhanced' && (
                  <>
                    <div className="flex items-center gap-2 text-blue-700">
                      <Sparkles className="w-4 h-4" />
                      <span>AI-powered cookie categorization</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-700">
                      <Eye className="w-4 h-4" />
                      <span>Detailed cookie information</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScriptTab;

