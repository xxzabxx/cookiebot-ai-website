/**
 * CookieBot.ai - Advanced Cookie Consent Management Platform
 * Version: 1.0.0
 * Author: Manus AI
 * License: MIT
 * 
 * Features:
 * - Automatic cookie detection and categorization
 * - GDPR, CCPA, LGPD compliance
 * - Affiliate advertising integration
 * - Company logo customization
 * - Real-time analytics
 */

(function(window, document) {
    'use strict';

    // Prevent multiple initializations
    if (window.CookieBotAI) {
        return;
    }

    /**
     * Main CookieBot.ai Class
     */
    class CookieBotAI {
        constructor(config = {}) {
            this.version = '1.0.0';
            this.config = this.mergeConfig(config);
            this.consent = {
                necessary: true,
                preferences: false,
                statistics: false,
                marketing: false,
                method: null,
                timestamp: null
            };
            this.cookies = [];
            this.isInitialized = false;
            this.bannerVisible = false;
            this.affiliateAds = [];
            
            // Event system
            this.events = {};
            
            // Initialize the system
            this.init();
        }

        /**
         * Merge user configuration with defaults
         */
        mergeConfig(userConfig) {
            const defaultConfig = {
                // Basic configuration
                domain: window.location.hostname,
                apiEndpoint: 'https://api.cookiebot.ai',
                clientId: null,
                
                // Banner configuration
                bannerPosition: 'bottom',
                bannerStyle: 'modern',
                showLogo: true,
                logoUrl: null,
                companyName: '',
                
                // Consent configuration
                autoBlock: true,
                consentExpiry: 365, // days
                showDeclineButton: true,
                granularConsent: true,
                
                // Affiliate advertising
                enableAffiliateAds: true,
                maxAffiliateAds: 2,
                affiliateRevShare: 0.6,
                
                // Compliance
                jurisdiction: 'auto', // auto, gdpr, ccpa, lgpd
                language: 'auto',
                
                // Styling
                primaryColor: '#007bff',
                backgroundColor: '#ffffff',
                textColor: '#333333',
                borderRadius: '8px',
                
                // Callbacks
                onConsentGiven: null,
                onConsentChanged: null,
                onBannerShown: null,
                onBannerHidden: null
            };

            return Object.assign({}, defaultConfig, userConfig);
        }

        /**
         * Initialize the cookie consent system
         */
        async init() {
            if (this.isInitialized) return;

            try {
                // Load existing consent
                this.loadStoredConsent();
                
                // Detect cookies on the page
                await this.detectCookies();
                
                // Load affiliate ads if enabled
                if (this.config.enableAffiliateAds) {
                    await this.loadAffiliateAds();
                }
                
                // Check if consent is needed
                if (this.shouldShowBanner()) {
                    await this.showConsentBanner();
                }
                
                // Apply consent preferences
                this.applyConsent();
                
                this.isInitialized = true;
                this.trigger('initialized');
                
            } catch (error) {
                console.error('CookieBot.ai initialization failed:', error);
            }
        }

        /**
         * Detect cookies and tracking scripts on the page
         */
        async detectCookies() {
            const detectedCookies = [];
            
            // Scan existing cookies
            document.cookie.split(';').forEach(cookie => {
                const [name, value] = cookie.trim().split('=');
                if (name && value) {
                    detectedCookies.push({
                        name: name,
                        value: value,
                        category: this.categorizeCookie(name),
                        domain: window.location.hostname,
                        path: '/',
                        secure: window.location.protocol === 'https:',
                        httpOnly: false
                    });
                }
            });

            // Scan for tracking scripts
            const scripts = document.querySelectorAll('script[src]');
            scripts.forEach(script => {
                const src = script.src;
                const category = this.categorizeScript(src);
                if (category !== 'necessary') {
                    detectedCookies.push({
                        name: this.extractScriptName(src),
                        type: 'script',
                        src: src,
                        category: category,
                        element: script
                    });
                }
            });

            this.cookies = detectedCookies;
            
            // Send detection data to API if configured
            if (this.config.clientId) {
                await this.sendCookieData();
            }
        }

        /**
         * Categorize cookies based on name patterns
         */
        categorizeCookie(cookieName) {
            const patterns = {
                necessary: [
                    /^(PHPSESSID|JSESSIONID|ASP\.NET_SessionId|__RequestVerificationToken)$/i,
                    /^(csrf|xsrf)_?token$/i,
                    /^(auth|session|login)_?/i
                ],
                preferences: [
                    /^(lang|language|locale|timezone|theme|currency)_?/i,
                    /^(user_?preferences|settings)_?/i
                ],
                statistics: [
                    /^(_ga|_gid|_gat|__utm)/i,
                    /^(analytics|stats|tracking)_?/i,
                    /^(_hjSessionUser|_hjSession)/i
                ],
                marketing: [
                    /^(_fbp|_fbc|fr)/i,
                    /^(ads|marketing|campaign)_?/i,
                    /^(__gads|__gpi)/i
                ]
            };

            for (const [category, regexList] of Object.entries(patterns)) {
                if (regexList.some(regex => regex.test(cookieName))) {
                    return category;
                }
            }

            return 'preferences'; // Default category for unknown cookies
        }

        /**
         * Categorize scripts based on URL patterns
         */
        categorizeScript(scriptSrc) {
            const patterns = {
                statistics: [
                    /google-analytics\.com/i,
                    /googletagmanager\.com/i,
                    /hotjar\.com/i,
                    /mixpanel\.com/i
                ],
                marketing: [
                    /facebook\.net/i,
                    /connect\.facebook\.net/i,
                    /doubleclick\.net/i,
                    /googlesyndication\.com/i,
                    /adsystem\.amazon/i
                ]
            };

            for (const [category, regexList] of Object.entries(patterns)) {
                if (regexList.some(regex => regex.test(scriptSrc))) {
                    return category;
                }
            }

            return 'necessary';
        }

        /**
         * Extract script name from URL
         */
        extractScriptName(url) {
            try {
                const urlObj = new URL(url);
                const hostname = urlObj.hostname;
                
                if (hostname.includes('google-analytics')) return 'Google Analytics';
                if (hostname.includes('googletagmanager')) return 'Google Tag Manager';
                if (hostname.includes('facebook')) return 'Facebook Pixel';
                if (hostname.includes('hotjar')) return 'Hotjar';
                if (hostname.includes('mixpanel')) return 'Mixpanel';
                
                return hostname;
            } catch (e) {
                return 'Unknown Script';
            }
        }

        /**
         * Load affiliate advertisements
         */
        async loadAffiliateAds() {
            if (!this.config.enableAffiliateAds || !this.config.clientId) {
                return;
            }

            try {
                const response = await fetch(`${this.config.apiEndpoint}/affiliate-ads`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        clientId: this.config.clientId,
                        domain: this.config.domain,
                        maxAds: this.config.maxAffiliateAds,
                        context: {
                            url: window.location.href,
                            title: document.title,
                            language: this.detectLanguage()
                        }
                    })
                });

                if (response.ok) {
                    this.affiliateAds = await response.json();
                }
            } catch (error) {
                console.warn('Failed to load affiliate ads:', error);
            }
        }

        /**
         * Check if consent banner should be shown
         */
        shouldShowBanner() {
            // Don't show if consent already given and not expired
            if (this.consent.timestamp) {
                const expiryDate = new Date(this.consent.timestamp);
                expiryDate.setDate(expiryDate.getDate() + this.config.consentExpiry);
                if (new Date() < expiryDate) {
                    return false;
                }
            }

            // Check jurisdiction requirements
            const jurisdiction = this.detectJurisdiction();
            if (jurisdiction === 'none') {
                return false;
            }

            return true;
        }

        /**
         * Detect user's jurisdiction for compliance
         */
        detectJurisdiction() {
            if (this.config.jurisdiction !== 'auto') {
                return this.config.jurisdiction;
            }

            // This would typically use IP geolocation
            // For demo purposes, we'll use a simple heuristic
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            
            if (timezone.includes('Europe/')) return 'gdpr';
            if (timezone.includes('America/Los_Angeles') || timezone.includes('America/New_York')) return 'ccpa';
            if (timezone.includes('America/Sao_Paulo')) return 'lgpd';
            
            return 'gdpr'; // Default to GDPR for maximum compliance
        }

        /**
         * Detect user's language
         */
        detectLanguage() {
            if (this.config.language !== 'auto') {
                return this.config.language;
            }
            
            return navigator.language || navigator.userLanguage || 'en';
        }

        /**
         * Show the consent banner
         */
        async showConsentBanner() {
            if (this.bannerVisible) return;

            const banner = this.createBannerElement();
            document.body.appendChild(banner);
            
            // Animate banner appearance
            setTimeout(() => {
                banner.classList.add('cba-banner-visible');
            }, 100);

            this.bannerVisible = true;
            this.trigger('bannerShown');
        }

        /**
         * Create the consent banner HTML element
         */
        createBannerElement() {
            const banner = document.createElement('div');
            banner.id = 'cookiebot-ai-banner';
            banner.className = `cba-banner cba-banner-${this.config.bannerPosition} cba-banner-${this.config.bannerStyle}`;
            
            banner.innerHTML = this.generateBannerHTML();
            this.attachBannerEvents(banner);
            
            return banner;
        }

        /**
         * Generate banner HTML content
         */
        generateBannerHTML() {
            const jurisdiction = this.detectJurisdiction();
            const language = this.detectLanguage();
            const texts = this.getLocalizedTexts(language, jurisdiction);
            
            let logoHTML = '';
            if (this.config.showLogo && (this.config.logoUrl || this.config.companyName)) {
                logoHTML = `
                    <div class="cba-logo">
                        ${this.config.logoUrl ? 
                            `<img src="${this.config.logoUrl}" alt="${this.config.companyName}" class="cba-logo-img">` :
                            `<span class="cba-logo-text">${this.config.companyName}</span>`
                        }
                    </div>
                `;
            }

            let affiliateHTML = '';
            if (this.affiliateAds.length > 0) {
                affiliateHTML = `
                    <div class="cba-affiliate-section">
                        <div class="cba-affiliate-header">${texts.affiliateHeader}</div>
                        <div class="cba-affiliate-ads">
                            ${this.affiliateAds.map(ad => `
                                <div class="cba-affiliate-ad" data-ad-id="${ad.id}">
                                    <img src="${ad.image}" alt="${ad.title}" class="cba-ad-image">
                                    <div class="cba-ad-content">
                                        <div class="cba-ad-title">${ad.title}</div>
                                        <div class="cba-ad-description">${ad.description}</div>
                                        <a href="${ad.url}" class="cba-ad-link" target="_blank" rel="noopener">${texts.learnMore}</a>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            return `
                <div class="cba-banner-content">
                    ${logoHTML}
                    <div class="cba-main-content">
                        <div class="cba-message">
                            <h3 class="cba-title">${texts.title}</h3>
                            <p class="cba-description">${texts.description}</p>
                        </div>
                        
                        ${this.config.granularConsent ? `
                            <div class="cba-consent-options">
                                <div class="cba-consent-category">
                                    <label class="cba-checkbox-label">
                                        <input type="checkbox" checked disabled class="cba-checkbox">
                                        <span class="cba-checkmark"></span>
                                        ${texts.necessary}
                                    </label>
                                </div>
                                <div class="cba-consent-category">
                                    <label class="cba-checkbox-label">
                                        <input type="checkbox" id="cba-preferences" class="cba-checkbox">
                                        <span class="cba-checkmark"></span>
                                        ${texts.preferences}
                                    </label>
                                </div>
                                <div class="cba-consent-category">
                                    <label class="cba-checkbox-label">
                                        <input type="checkbox" id="cba-statistics" class="cba-checkbox">
                                        <span class="cba-checkmark"></span>
                                        ${texts.statistics}
                                    </label>
                                </div>
                                <div class="cba-consent-category">
                                    <label class="cba-checkbox-label">
                                        <input type="checkbox" id="cba-marketing" class="cba-checkbox">
                                        <span class="cba-checkmark"></span>
                                        ${texts.marketing}
                                    </label>
                                </div>
                            </div>
                        ` : ''}
                        
                        ${affiliateHTML}
                        
                        <div class="cba-buttons">
                            ${this.config.showDeclineButton ? 
                                `<button class="cba-button cba-button-decline" id="cba-decline">${texts.decline}</button>` : 
                                ''
                            }
                            <button class="cba-button cba-button-accept" id="cba-accept">${texts.accept}</button>
                            ${this.config.granularConsent ? 
                                `<button class="cba-button cba-button-save" id="cba-save">${texts.savePreferences}</button>` : 
                                ''
                            }
                        </div>
                    </div>
                </div>
                <style>
                    ${this.generateBannerCSS()}
                </style>
            `;
        }

        /**
         * Get localized text strings
         */
        getLocalizedTexts(language, jurisdiction) {
            const texts = {
                en: {
                    title: 'We value your privacy',
                    description: 'We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
                    necessary: 'Necessary',
                    preferences: 'Preferences',
                    statistics: 'Statistics',
                    marketing: 'Marketing',
                    accept: 'Accept All',
                    decline: 'Decline',
                    savePreferences: 'Save Preferences',
                    affiliateHeader: 'Recommended for you',
                    learnMore: 'Learn More'
                },
                es: {
                    title: 'Valoramos tu privacidad',
                    description: 'Utilizamos cookies para mejorar tu experiencia de navegación, servir anuncios o contenido personalizado y analizar nuestro tráfico.',
                    necessary: 'Necesarias',
                    preferences: 'Preferencias',
                    statistics: 'Estadísticas',
                    marketing: 'Marketing',
                    accept: 'Aceptar Todo',
                    decline: 'Rechazar',
                    savePreferences: 'Guardar Preferencias',
                    affiliateHeader: 'Recomendado para ti',
                    learnMore: 'Saber Más'
                },
                fr: {
                    title: 'Nous respectons votre vie privée',
                    description: 'Nous utilisons des cookies pour améliorer votre expérience de navigation, diffuser des publicités personnalisées et analyser notre trafic.',
                    necessary: 'Nécessaires',
                    preferences: 'Préférences',
                    statistics: 'Statistiques',
                    marketing: 'Marketing',
                    accept: 'Tout Accepter',
                    decline: 'Refuser',
                    savePreferences: 'Sauvegarder',
                    affiliateHeader: 'Recommandé pour vous',
                    learnMore: 'En Savoir Plus'
                }
            };

            const langCode = language.split('-')[0];
            return texts[langCode] || texts.en;
        }

        /**
         * Generate CSS for the banner
         */
        generateBannerCSS() {
            return `
                #cookiebot-ai-banner {
                    position: fixed;
                    z-index: 999999;
                    background: ${this.config.backgroundColor};
                    color: ${this.config.textColor};
                    border-radius: ${this.config.borderRadius};
                    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    font-size: 14px;
                    line-height: 1.5;
                    max-width: 500px;
                    opacity: 0;
                    transform: translateY(100%);
                    transition: all 0.3s ease;
                    padding: 20px;
                    margin: 20px;
                }
                
                #cookiebot-ai-banner.cba-banner-bottom {
                    bottom: 0;
                    right: 0;
                }
                
                #cookiebot-ai-banner.cba-banner-top {
                    top: 0;
                    right: 0;
                }
                
                #cookiebot-ai-banner.cba-banner-visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .cba-logo {
                    margin-bottom: 15px;
                    text-align: center;
                }
                
                .cba-logo-img {
                    max-height: 40px;
                    max-width: 150px;
                }
                
                .cba-logo-text {
                    font-weight: bold;
                    font-size: 16px;
                    color: ${this.config.primaryColor};
                }
                
                .cba-title {
                    margin: 0 0 10px 0;
                    font-size: 16px;
                    font-weight: 600;
                    color: ${this.config.primaryColor};
                }
                
                .cba-description {
                    margin: 0 0 15px 0;
                    color: ${this.config.textColor};
                    opacity: 0.8;
                }
                
                .cba-consent-options {
                    margin: 15px 0;
                }
                
                .cba-consent-category {
                    margin: 8px 0;
                }
                
                .cba-checkbox-label {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    font-size: 13px;
                }
                
                .cba-checkbox {
                    margin-right: 8px;
                }
                
                .cba-affiliate-section {
                    margin: 15px 0;
                    padding: 15px;
                    background: rgba(0,0,0,0.05);
                    border-radius: 6px;
                }
                
                .cba-affiliate-header {
                    font-weight: 600;
                    margin-bottom: 10px;
                    font-size: 13px;
                    color: ${this.config.primaryColor};
                }
                
                .cba-affiliate-ad {
                    display: flex;
                    align-items: center;
                    margin: 10px 0;
                    padding: 10px;
                    background: white;
                    border-radius: 4px;
                    border: 1px solid rgba(0,0,0,0.1);
                }
                
                .cba-ad-image {
                    width: 40px;
                    height: 40px;
                    border-radius: 4px;
                    margin-right: 10px;
                    object-fit: cover;
                }
                
                .cba-ad-content {
                    flex: 1;
                }
                
                .cba-ad-title {
                    font-weight: 600;
                    font-size: 12px;
                    margin-bottom: 2px;
                }
                
                .cba-ad-description {
                    font-size: 11px;
                    opacity: 0.7;
                    margin-bottom: 4px;
                }
                
                .cba-ad-link {
                    font-size: 11px;
                    color: ${this.config.primaryColor};
                    text-decoration: none;
                    font-weight: 500;
                }
                
                .cba-buttons {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                    margin-top: 15px;
                }
                
                .cba-button {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    flex: 1;
                    min-width: 80px;
                }
                
                .cba-button-accept {
                    background: ${this.config.primaryColor};
                    color: white;
                }
                
                .cba-button-accept:hover {
                    opacity: 0.9;
                }
                
                .cba-button-decline {
                    background: transparent;
                    color: ${this.config.textColor};
                    border: 1px solid rgba(0,0,0,0.2);
                }
                
                .cba-button-decline:hover {
                    background: rgba(0,0,0,0.05);
                }
                
                .cba-button-save {
                    background: transparent;
                    color: ${this.config.primaryColor};
                    border: 1px solid ${this.config.primaryColor};
                }
                
                .cba-button-save:hover {
                    background: ${this.config.primaryColor};
                    color: white;
                }
                
                @media (max-width: 600px) {
                    #cookiebot-ai-banner {
                        left: 0;
                        right: 0;
                        max-width: none;
                        margin: 0;
                        border-radius: 0;
                    }
                    
                    .cba-buttons {
                        flex-direction: column;
                    }
                }
            `;
        }

        /**
         * Attach event listeners to banner elements
         */
        attachBannerEvents(banner) {
            const acceptBtn = banner.querySelector('#cba-accept');
            const declineBtn = banner.querySelector('#cba-decline');
            const saveBtn = banner.querySelector('#cba-save');
            
            if (acceptBtn) {
                acceptBtn.addEventListener('click', () => this.acceptAll());
            }
            
            if (declineBtn) {
                declineBtn.addEventListener('click', () => this.declineAll());
            }
            
            if (saveBtn) {
                saveBtn.addEventListener('click', () => this.savePreferences());
            }

            // Track affiliate ad clicks
            const affiliateAds = banner.querySelectorAll('.cba-affiliate-ad');
            affiliateAds.forEach(ad => {
                const link = ad.querySelector('.cba-ad-link');
                if (link) {
                    link.addEventListener('click', (e) => {
                        const adId = ad.dataset.adId;
                        this.trackAffiliateClick(adId);
                    });
                }
            });
        }

        /**
         * Accept all cookies
         */
        acceptAll() {
            this.consent = {
                necessary: true,
                preferences: true,
                statistics: true,
                marketing: true,
                method: 'explicit',
                timestamp: new Date().toISOString()
            };
            
            this.saveConsent();
            this.applyConsent();
            this.hideBanner();
            this.trigger('consentGiven', this.consent);
        }

        /**
         * Decline all non-necessary cookies
         */
        declineAll() {
            this.consent = {
                necessary: true,
                preferences: false,
                statistics: false,
                marketing: false,
                method: 'explicit',
                timestamp: new Date().toISOString()
            };
            
            this.saveConsent();
            this.applyConsent();
            this.hideBanner();
            this.trigger('consentGiven', this.consent);
        }

        /**
         * Save granular preferences
         */
        savePreferences() {
            const banner = document.getElementById('cookiebot-ai-banner');
            
            this.consent = {
                necessary: true,
                preferences: banner.querySelector('#cba-preferences')?.checked || false,
                statistics: banner.querySelector('#cba-statistics')?.checked || false,
                marketing: banner.querySelector('#cba-marketing')?.checked || false,
                method: 'explicit',
                timestamp: new Date().toISOString()
            };
            
            this.saveConsent();
            this.applyConsent();
            this.hideBanner();
            this.trigger('consentGiven', this.consent);
        }

        /**
         * Hide the consent banner
         */
        hideBanner() {
            const banner = document.getElementById('cookiebot-ai-banner');
            if (banner) {
                banner.classList.remove('cba-banner-visible');
                setTimeout(() => {
                    banner.remove();
                }, 300);
            }
            
            this.bannerVisible = false;
            this.trigger('bannerHidden');
        }

        /**
         * Apply consent preferences to cookies and scripts
         */
        applyConsent() {
            if (!this.config.autoBlock) return;

            this.cookies.forEach(cookie => {
                if (cookie.category === 'necessary') return;
                
                const hasConsent = this.consent[cookie.category];
                
                if (cookie.type === 'script' && !hasConsent) {
                    // Disable script by changing type
                    if (cookie.element) {
                        cookie.element.type = 'text/plain';
                        cookie.element.setAttribute('data-cookiebot-blocked', 'true');
                    }
                } else if (cookie.type === 'script' && hasConsent) {
                    // Re-enable script
                    if (cookie.element && cookie.element.hasAttribute('data-cookiebot-blocked')) {
                        cookie.element.type = 'text/javascript';
                        cookie.element.removeAttribute('data-cookiebot-blocked');
                    }
                }
                
                if (!hasConsent && !cookie.type) {
                    // Remove non-consented cookies
                    this.deleteCookie(cookie.name);
                }
            });
        }

        /**
         * Delete a cookie
         */
        deleteCookie(name) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
        }

        /**
         * Save consent to localStorage
         */
        saveConsent() {
            try {
                localStorage.setItem('cookiebot-ai-consent', JSON.stringify(this.consent));
            } catch (e) {
                // Fallback to cookie storage
                const consentData = encodeURIComponent(JSON.stringify(this.consent));
                document.cookie = `cookiebot-ai-consent=${consentData}; expires=${new Date(Date.now() + this.config.consentExpiry * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
            }
        }

        /**
         * Load stored consent
         */
        loadStoredConsent() {
            try {
                const stored = localStorage.getItem('cookiebot-ai-consent');
                if (stored) {
                    this.consent = Object.assign(this.consent, JSON.parse(stored));
                    return;
                }
            } catch (e) {
                // Try cookie fallback
                const cookies = document.cookie.split(';');
                for (let cookie of cookies) {
                    const [name, value] = cookie.trim().split('=');
                    if (name === 'cookiebot-ai-consent') {
                        try {
                            this.consent = Object.assign(this.consent, JSON.parse(decodeURIComponent(value)));
                        } catch (e) {
                            console.warn('Failed to parse stored consent');
                        }
                        break;
                    }
                }
            }
        }

        /**
         * Track affiliate ad clicks
         */
        async trackAffiliateClick(adId) {
            if (!this.config.clientId) return;

            try {
                await fetch(`${this.config.apiEndpoint}/affiliate-click`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        clientId: this.config.clientId,
                        adId: adId,
                        domain: this.config.domain,
                        timestamp: new Date().toISOString()
                    })
                });
            } catch (error) {
                console.warn('Failed to track affiliate click:', error);
            }
        }

        /**
         * Send cookie detection data to API
         */
        async sendCookieData() {
            try {
                await fetch(`${this.config.apiEndpoint}/cookie-scan`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        clientId: this.config.clientId,
                        domain: this.config.domain,
                        cookies: this.cookies,
                        timestamp: new Date().toISOString()
                    })
                });
            } catch (error) {
                console.warn('Failed to send cookie data:', error);
            }
        }

        /**
         * Event system methods
         */
        on(event, callback) {
            if (!this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push(callback);
        }

        trigger(event, data) {
            if (this.events[event]) {
                this.events[event].forEach(callback => {
                    try {
                        callback(data);
                    } catch (e) {
                        console.error('Event callback error:', e);
                    }
                });
            }

            // Call config callbacks
            const callbackName = `on${event.charAt(0).toUpperCase() + event.slice(1)}`;
            if (this.config[callbackName] && typeof this.config[callbackName] === 'function') {
                try {
                    this.config[callbackName](data);
                } catch (e) {
                    console.error('Config callback error:', e);
                }
            }
        }

        /**
         * Public API methods
         */
        renew() {
            this.consent.timestamp = null;
            this.saveConsent();
            if (this.shouldShowBanner()) {
                this.showConsentBanner();
            }
        }

        getConsent() {
            return Object.assign({}, this.consent);
        }

        hasConsent(category) {
            return this.consent[category] === true;
        }

        getCookies() {
            return [...this.cookies];
        }
    }

    // Auto-initialize if configuration is provided
    const script = document.currentScript || document.querySelector('script[data-cbid]');
    if (script) {
        const config = {};
        
        // Extract configuration from script attributes
        if (script.dataset.cbid) config.clientId = script.dataset.cbid;
        if (script.dataset.apiEndpoint) config.apiEndpoint = script.dataset.apiEndpoint;
        if (script.dataset.bannerPosition) config.bannerPosition = script.dataset.bannerPosition;
        if (script.dataset.primaryColor) config.primaryColor = script.dataset.primaryColor;
        if (script.dataset.logoUrl) config.logoUrl = script.dataset.logoUrl;
        if (script.dataset.companyName) config.companyName = script.dataset.companyName;
        if (script.dataset.enableAffiliateAds) config.enableAffiliateAds = script.dataset.enableAffiliateAds === 'true';
        
        // Initialize CookieBot.ai
        window.CookieBotAI = new CookieBotAI(config);
    } else {
        // Expose class for manual initialization
        window.CookieBotAI = CookieBotAI;
    }

})(window, document);

