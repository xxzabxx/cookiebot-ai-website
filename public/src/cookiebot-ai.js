/**
 * CookieBot.ai - Enhanced Cookie Consent Management Platform
 * Version: 2.0.0
 * Author: Manus AI
 * License: MIT
 * 
 * Enhanced Features:
 * - Advanced layout options (Dialog/Bar with overlay)
 * - Comprehensive theme system (Light/Dark/Custom)
 * - Button style variations (Default/Solid/Outline)
 * - Multiple banner types (Multilevel/Accept-only/CCPA)
 * - Professional animations and effects
 * - Enhanced responsive behavior
 */

(function(window, document) {
    'use strict';

    // Prevent multiple initializations
    if (window.CookieBotAI) {
        return;
    }

    /**
     * Enhanced CookieBot.ai Class
     */
    class CookieBotAI {
        constructor(config = {}) {
            this.version = '2.0.0';
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
         * Enhanced configuration with advanced customization options
         */
        mergeConfig(userConfig) {
            const defaultConfig = {
                // Basic configuration
                domain: window.location.hostname,
                apiEndpoint: 'https://api.cookiebot.ai',
                clientId: null,
                
                // Layout Configuration
                layout: 'dialog', // 'dialog' | 'bar'
                position: 'bottom', // 'top' | 'bottom' | 'center'
                overlay: true, // Semi-transparent background overlay
                slideIn: true, // Animation effect
                
                // Theme Configuration
                theme: 'light', // 'light' | 'dark' | 'custom'
                customColors: {
                    background: '#ffffff',
                    text: '#333333',
                    accent: '#007bff',
                    buttonPrimary: '#007bff',
                    buttonSecondary: '#6c757d',
                    overlayColor: 'rgba(0, 0, 0, 0.5)'
                },
                
                // Button Configuration
                buttonStyle: 'default', // 'default' | 'solid' | 'outline'
                
                // Banner Type
                bannerType: 'multilevel', // 'multilevel' | 'accept-only' | 'accept-decline' | 'inline-multilevel' | 'ccpa'
                
                // Advanced Options
                showCloseIcon: false,
                checkboxDefaults: {
                    preferences: false,
                    statistics: false,
                    marketing: false
                },
                
                // Legacy options (maintained for compatibility)
                bannerPosition: 'bottom', // Mapped to position
                bannerStyle: 'modern', // Mapped to theme
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
                
                // Responsive breakpoints
                mobileBreakpoint: 600,
                tabletBreakpoint: 1280,
                
                // Callbacks
                onConsentGiven: null,
                onConsentChanged: null,
                onBannerShown: null,
                onBannerHidden: null
            };

            // Map legacy options to new structure
            const mergedConfig = Object.assign({}, defaultConfig, userConfig);
            
            // Handle legacy mapping
            if (userConfig.bannerPosition && !userConfig.position) {
                mergedConfig.position = userConfig.bannerPosition;
            }
            if (userConfig.bannerStyle && !userConfig.theme) {
                mergedConfig.theme = userConfig.bannerStyle === 'modern' ? 'light' : userConfig.bannerStyle;
            }
            if (userConfig.primaryColor && !userConfig.customColors?.accent) {
                mergedConfig.customColors.accent = userConfig.primaryColor;
                mergedConfig.customColors.buttonPrimary = userConfig.primaryColor;
            }

            return mergedConfig;
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
         * Enhanced cookie detection (same as before)
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
         * Cookie categorization (same as before)
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

            return 'preferences';
        }

        /**
         * Script categorization (same as before)
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
         * Extract script name (same as before)
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
         * Load affiliate ads (same as before)
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
         * Enhanced banner display logic
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
         * Jurisdiction detection (same as before)
         */
        detectJurisdiction() {
            if (this.config.jurisdiction !== 'auto') {
                return this.config.jurisdiction;
            }

            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            
            if (timezone.includes('Europe/')) return 'gdpr';
            if (timezone.includes('America/Los_Angeles') || timezone.includes('America/New_York')) return 'ccpa';
            if (timezone.includes('America/Sao_Paulo')) return 'lgpd';
            
            return 'gdpr';
        }

        /**
         * Language detection (same as before)
         */
        detectLanguage() {
            if (this.config.language !== 'auto') {
                return this.config.language;
            }
            
            return navigator.language || navigator.userLanguage || 'en';
        }

        /**
         * Enhanced banner display with layout options
         */
        async showConsentBanner() {
            if (this.bannerVisible) return;

            // Create overlay if enabled
            if (this.config.overlay && this.config.layout === 'dialog') {
                this.createOverlay();
            }

            const banner = this.createBannerElement();
            document.body.appendChild(banner);
            
            // Animate banner appearance based on configuration
            setTimeout(() => {
                banner.classList.add('cba-banner-visible');
                if (this.config.slideIn) {
                    banner.classList.add('cba-banner-slide-in');
                }
            }, 100);

            this.bannerVisible = true;
            this.trigger('bannerShown');
        }

        /**
         * Create overlay element
         */
        createOverlay() {
            const overlay = document.createElement('div');
            overlay.id = 'cookiebot-ai-overlay';
            overlay.className = 'cba-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: ${this.getThemeColors().overlayColor};
                z-index: 999998;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(overlay);
            
            // Animate overlay appearance
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 50);
        }

        /**
         * Enhanced banner element creation
         */
        createBannerElement() {
            const banner = document.createElement('div');
            banner.id = 'cookiebot-ai-banner';
            
            // Build CSS classes based on configuration
            const classes = [
                'cba-banner',
                `cba-layout-${this.config.layout}`,
                `cba-position-${this.config.position}`,
                `cba-theme-${this.config.theme}`,
                `cba-buttons-${this.config.buttonStyle}`,
                `cba-type-${this.config.bannerType}`
            ];
            
            banner.className = classes.join(' ');
            banner.innerHTML = this.generateBannerHTML();
            this.attachBannerEvents(banner);
            
            return banner;
        }

        /**
         * Get theme-specific colors
         */
        getThemeColors() {
            const themes = {
                light: {
                    background: '#ffffff',
                    text: '#333333',
                    accent: '#007bff',
                    buttonPrimary: '#007bff',
                    buttonSecondary: '#6c757d',
                    overlayColor: 'rgba(0, 0, 0, 0.5)',
                    border: '#e9ecef'
                },
                dark: {
                    background: '#2d3748',
                    text: '#ffffff',
                    accent: '#63b3ed',
                    buttonPrimary: '#63b3ed',
                    buttonSecondary: '#a0aec0',
                    overlayColor: 'rgba(0, 0, 0, 0.7)',
                    border: '#4a5568'
                },
                custom: this.config.customColors
            };

            return themes[this.config.theme] || themes.light;
        }

        /**
         * Enhanced banner HTML generation
         */
        generateBannerHTML() {
            const jurisdiction = this.detectJurisdiction();
            const language = this.detectLanguage();
            const texts = this.getLocalizedTexts(language, jurisdiction);
            const colors = this.getThemeColors();
            
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

            let closeIconHTML = '';
            if (this.config.showCloseIcon) {
                closeIconHTML = `
                    <button class="cba-close-button" id="cba-close" aria-label="Close">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 7.293l2.146-2.147a.5.5 0 01.708.708L8.707 8l2.147 2.146a.5.5 0 01-.708.708L8 8.707l-2.146 2.147a.5.5 0 01-.708-.708L7.293 8 5.146 5.854a.5.5 0 01.708-.708L8 7.293z"/>
                        </svg>
                    </button>
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

            // Generate consent options based on banner type
            let consentOptionsHTML = '';
            if (this.shouldShowConsentOptions()) {
                consentOptionsHTML = this.generateConsentOptionsHTML(texts);
            }

            // Generate buttons based on banner type
            const buttonsHTML = this.generateButtonsHTML(texts);

            return `
                <div class="cba-banner-content">
                    ${closeIconHTML}
                    ${logoHTML}
                    <div class="cba-main-content">
                        <div class="cba-message">
                            <h3 class="cba-title">${texts.title}</h3>
                            <p class="cba-description">${texts.description}</p>
                        </div>
                        
                        ${consentOptionsHTML}
                        ${affiliateHTML}
                        
                        <div class="cba-buttons">
                            ${buttonsHTML}
                        </div>
                    </div>
                </div>
                <style>
                    ${this.generateEnhancedCSS()}
                </style>
            `;
        }

        /**
         * Check if consent options should be shown based on banner type
         */
        shouldShowConsentOptions() {
            return ['multilevel', 'inline-multilevel'].includes(this.config.bannerType) && 
                   this.config.granularConsent;
        }

        /**
         * Generate consent options HTML based on banner type
         */
        generateConsentOptionsHTML(texts) {
            if (this.config.bannerType === 'inline-multilevel') {
                return ''; // Options shown in second level
            }

            if (this.config.bannerType === 'ccpa') {
                return `
                    <div class="cba-ccpa-options">
                        <label class="cba-checkbox-label">
                            <input type="checkbox" id="cba-do-not-sell" class="cba-checkbox">
                            <span class="cba-checkmark"></span>
                            ${texts.doNotSell}
                        </label>
                    </div>
                `;
            }

            return `
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
                            <input type="checkbox" id="cba-preferences" class="cba-checkbox" ${this.config.checkboxDefaults.preferences ? 'checked' : ''}>
                            <span class="cba-checkmark"></span>
                            ${texts.preferences}
                        </label>
                    </div>
                    <div class="cba-consent-category">
                        <label class="cba-checkbox-label">
                            <input type="checkbox" id="cba-statistics" class="cba-checkbox" ${this.config.checkboxDefaults.statistics ? 'checked' : ''}>
                            <span class="cba-checkmark"></span>
                            ${texts.statistics}
                        </label>
                    </div>
                    <div class="cba-consent-category">
                        <label class="cba-checkbox-label">
                            <input type="checkbox" id="cba-marketing" class="cba-checkbox" ${this.config.checkboxDefaults.marketing ? 'checked' : ''}>
                            <span class="cba-checkmark"></span>
                            ${texts.marketing}
                        </label>
                    </div>
                </div>
            `;
        }

        /**
         * Generate buttons HTML based on banner type
         */
        generateButtonsHTML(texts) {
            switch (this.config.bannerType) {
                case 'accept-only':
                    return `<button class="cba-button cba-button-accept" id="cba-accept">${texts.accept}</button>`;
                
                case 'accept-decline':
                    return `
                        <button class="cba-button cba-button-decline" id="cba-decline">${texts.decline}</button>
                        <button class="cba-button cba-button-accept" id="cba-accept">${texts.accept}</button>
                    `;
                
                case 'inline-multilevel':
                    return `
                        <button class="cba-button cba-button-customize" id="cba-customize">${texts.customize}</button>
                        <button class="cba-button cba-button-accept" id="cba-accept">${texts.accept}</button>
                    `;
                
                case 'ccpa':
                    return `<button class="cba-button cba-button-save" id="cba-save">${texts.savePreferences}</button>`;
                
                default: // multilevel
                    let buttons = '';
                    if (this.config.showDeclineButton) {
                        buttons += `<button class="cba-button cba-button-decline" id="cba-decline">${texts.decline}</button>`;
                    }
                    buttons += `<button class="cba-button cba-button-save" id="cba-save">${texts.savePreferences}</button>`;
                    buttons += `<button class="cba-button cba-button-accept" id="cba-accept">${texts.accept}</button>`;
                    return buttons;
            }
        }

        /**
         * Enhanced localized texts with new options
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
                    customize: 'Customize >',
                    doNotSell: 'Do Not Sell My Personal Information',
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
                    customize: 'Personalizar >',
                    doNotSell: 'No Vender Mi Información Personal',
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
                    customize: 'Personnaliser >',
                    doNotSell: 'Ne Pas Vendre Mes Informations',
                    affiliateHeader: 'Recommandé pour vous',
                    learnMore: 'En Savoir Plus'
                }
            };

            const langCode = language.split('-')[0];
            return texts[langCode] || texts.en;
        }

        /**
         * Enhanced CSS generation with advanced styling
         */
        generateEnhancedCSS() {
            const colors = this.getThemeColors();
            
            return `
                /* Base Banner Styles */
                #cookiebot-ai-banner {
                    position: fixed;
                    z-index: 999999;
                    background: ${colors.background};
                    color: ${colors.text};
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    font-size: 14px;
                    line-height: 1.5;
                    opacity: 0;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                }
                
                /* Layout: Dialog */
                #cookiebot-ai-banner.cba-layout-dialog {
                    max-width: 500px;
                    border-radius: 12px;
                    padding: 24px;
                    margin: 20px;
                }
                
                #cookiebot-ai-banner.cba-layout-dialog.cba-position-bottom {
                    bottom: 0;
                    right: 0;
                    transform: translateY(100%);
                }
                
                #cookiebot-ai-banner.cba-layout-dialog.cba-position-top {
                    top: 0;
                    right: 0;
                    transform: translateY(-100%);
                }
                
                #cookiebot-ai-banner.cba-layout-dialog.cba-position-center {
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0.9);
                }
                
                /* Layout: Bar */
                #cookiebot-ai-banner.cba-layout-bar {
                    left: 0;
                    right: 0;
                    max-width: none;
                    border-radius: 0;
                    padding: 16px 24px;
                    margin: 0;
                }
                
                #cookiebot-ai-banner.cba-layout-bar.cba-position-bottom {
                    bottom: 0;
                    transform: translateY(100%);
                }
                
                #cookiebot-ai-banner.cba-layout-bar.cba-position-top {
                    top: 0;
                    transform: translateY(-100%);
                }
                
                /* Visible State */
                #cookiebot-ai-banner.cba-banner-visible {
                    opacity: 1;
                }
                
                #cookiebot-ai-banner.cba-banner-visible.cba-layout-dialog.cba-position-bottom,
                #cookiebot-ai-banner.cba-banner-visible.cba-layout-dialog.cba-position-top,
                #cookiebot-ai-banner.cba-banner-visible.cba-layout-bar {
                    transform: translateY(0);
                }
                
                #cookiebot-ai-banner.cba-banner-visible.cba-layout-dialog.cba-position-center {
                    transform: translate(-50%, -50%) scale(1);
                }
                
                /* Slide-in Animation */
                #cookiebot-ai-banner.cba-banner-slide-in {
                    animation: cbaSlideIn 0.4s ease-out;
                }
                
                @keyframes cbaSlideIn {
                    0% { transform: translateY(100%); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                
                /* Overlay */
                .cba-overlay {
                    pointer-events: none;
                }
                
                /* Close Button */
                .cba-close-button {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    background: none;
                    border: none;
                    color: ${colors.text};
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 4px;
                    opacity: 0.6;
                    transition: opacity 0.2s ease;
                }
                
                .cba-close-button:hover {
                    opacity: 1;
                    background: rgba(0,0,0,0.1);
                }
                
                /* Logo Styles */
                .cba-logo {
                    margin-bottom: 16px;
                    text-align: center;
                }
                
                .cba-logo-img {
                    max-height: 40px;
                    max-width: 150px;
                }
                
                .cba-logo-text {
                    font-weight: bold;
                    font-size: 16px;
                    color: ${colors.accent};
                }
                
                /* Content Styles */
                .cba-banner-content {
                    position: relative;
                }
                
                .cba-title {
                    margin: 0 0 12px 0;
                    font-size: 18px;
                    font-weight: 600;
                    color: ${colors.accent};
                }
                
                .cba-description {
                    margin: 0 0 16px 0;
                    color: ${colors.text};
                    opacity: 0.9;
                    line-height: 1.6;
                }
                
                /* Consent Options */
                .cba-consent-options {
                    margin: 16px 0;
                    display: grid;
                    gap: 12px;
                }
                
                .cba-consent-category {
                    display: flex;
                    align-items: center;
                }
                
                .cba-checkbox-label {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    width: 100%;
                }
                
                .cba-checkbox {
                    margin-right: 12px;
                    width: 18px;
                    height: 18px;
                    accent-color: ${colors.accent};
                }
                
                /* CCPA Options */
                .cba-ccpa-options {
                    margin: 16px 0;
                    padding: 16px;
                    background: rgba(0,0,0,0.05);
                    border-radius: 8px;
                    border-left: 4px solid ${colors.accent};
                }
                
                /* Affiliate Section */
                .cba-affiliate-section {
                    margin: 16px 0;
                    padding: 16px;
                    background: rgba(0,0,0,0.03);
                    border-radius: 8px;
                    border: 1px solid ${colors.border};
                }
                
                .cba-affiliate-header {
                    font-weight: 600;
                    margin-bottom: 12px;
                    font-size: 14px;
                    color: ${colors.accent};
                }
                
                .cba-affiliate-ad {
                    display: flex;
                    align-items: center;
                    margin: 12px 0;
                    padding: 12px;
                    background: ${colors.background};
                    border-radius: 6px;
                    border: 1px solid ${colors.border};
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                
                .cba-affiliate-ad:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }
                
                .cba-ad-image {
                    width: 48px;
                    height: 48px;
                    border-radius: 6px;
                    margin-right: 12px;
                    object-fit: cover;
                }
                
                .cba-ad-content {
                    flex: 1;
                }
                
                .cba-ad-title {
                    font-weight: 600;
                    font-size: 13px;
                    margin-bottom: 4px;
                    color: ${colors.text};
                }
                
                .cba-ad-description {
                    font-size: 12px;
                    opacity: 0.8;
                    margin-bottom: 6px;
                    color: ${colors.text};
                }
                
                .cba-ad-link {
                    font-size: 12px;
                    color: ${colors.accent};
                    text-decoration: none;
                    font-weight: 600;
                    transition: opacity 0.2s ease;
                }
                
                .cba-ad-link:hover {
                    opacity: 0.8;
                }
                
                /* Button Container */
                .cba-buttons {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                    margin-top: 20px;
                }
                
                /* Base Button Styles */
                .cba-button {
                    padding: 12px 20px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.2s ease;
                    flex: 1;
                    min-width: 100px;
                    text-align: center;
                }
                
                /* Button Style: Default */
                .cba-buttons-default .cba-button-accept {
                    background: ${colors.buttonPrimary};
                    color: white;
                    border: 2px solid ${colors.buttonPrimary};
                }
                
                .cba-buttons-default .cba-button-decline,
                .cba-buttons-default .cba-button-save,
                .cba-buttons-default .cba-button-customize {
                    background: transparent;
                    color: ${colors.text};
                    border: 2px solid ${colors.border};
                }
                
                /* Button Style: Solid */
                .cba-buttons-solid .cba-button {
                    background: ${colors.accent};
                    color: white;
                    border: 2px solid ${colors.accent};
                }
                
                /* Button Style: Outline */
                .cba-buttons-outline .cba-button {
                    background: transparent;
                    color: ${colors.accent};
                    border: 2px solid ${colors.accent};
                }
                
                /* Button Hover Effects */
                .cba-button:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                }
                
                .cba-buttons-default .cba-button-accept:hover {
                    background: ${colors.buttonPrimary};
                    opacity: 0.9;
                }
                
                .cba-buttons-default .cba-button-decline:hover,
                .cba-buttons-default .cba-button-save:hover,
                .cba-buttons-default .cba-button-customize:hover {
                    background: rgba(0,0,0,0.05);
                }
                
                .cba-buttons-solid .cba-button:hover {
                    opacity: 0.9;
                }
                
                .cba-buttons-outline .cba-button:hover {
                    background: ${colors.accent};
                    color: white;
                }
                
                /* Responsive Design */
                @media (max-width: ${this.config.tabletBreakpoint}px) {
                    #cookiebot-ai-banner.cba-layout-bar {
                        /* Convert bar to dialog on tablet */
                        position: fixed;
                        bottom: 20px;
                        left: 20px;
                        right: 20px;
                        max-width: none;
                        border-radius: 12px;
                        padding: 20px;
                    }
                }
                
                @media (max-width: ${this.config.mobileBreakpoint}px) {
                    #cookiebot-ai-banner {
                        /* Mobile optimizations */
                        left: 10px !important;
                        right: 10px !important;
                        bottom: 10px !important;
                        top: auto !important;
                        max-width: none !important;
                        margin: 0 !important;
                        border-radius: 12px !important;
                        padding: 16px !important;
                        transform: translateY(100%) !important;
                    }
                    
                    #cookiebot-ai-banner.cba-banner-visible {
                        transform: translateY(0) !important;
                    }
                    
                    .cba-buttons {
                        flex-direction: column;
                        gap: 8px;
                    }
                    
                    .cba-button {
                        min-width: auto;
                        padding: 14px 20px;
                    }
                    
                    .cba-consent-options {
                        gap: 8px;
                    }
                    
                    .cba-title {
                        font-size: 16px;
                    }
                    
                    .cba-description {
                        font-size: 13px;
                    }
                }
                
                /* Theme-specific adjustments */
                #cookiebot-ai-banner.cba-theme-dark {
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                }
                
                #cookiebot-ai-banner.cba-theme-dark .cba-affiliate-section {
                    background: rgba(255,255,255,0.05);
                    border-color: rgba(255,255,255,0.1);
                }
                
                #cookiebot-ai-banner.cba-theme-dark .cba-affiliate-ad {
                    background: rgba(255,255,255,0.05);
                    border-color: rgba(255,255,255,0.1);
                }
                
                #cookiebot-ai-banner.cba-theme-dark .cba-close-button:hover {
                    background: rgba(255,255,255,0.1);
                }
            `;
        }

        /**
         * Enhanced event attachment with new button types
         */
        attachBannerEvents(banner) {
            const acceptBtn = banner.querySelector('#cba-accept');
            const declineBtn = banner.querySelector('#cba-decline');
            const saveBtn = banner.querySelector('#cba-save');
            const customizeBtn = banner.querySelector('#cba-customize');
            const closeBtn = banner.querySelector('#cba-close');
            
            if (acceptBtn) {
                acceptBtn.addEventListener('click', () => this.acceptAll());
            }
            
            if (declineBtn) {
                declineBtn.addEventListener('click', () => this.declineAll());
            }
            
            if (saveBtn) {
                saveBtn.addEventListener('click', () => this.savePreferences());
            }
            
            if (customizeBtn) {
                customizeBtn.addEventListener('click', () => this.showCustomizeOptions());
            }
            
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.hideBanner());
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
         * Show customize options for inline multilevel
         */
        showCustomizeOptions() {
            // This would expand the banner to show granular options
            // For now, we'll treat it like save preferences
            this.savePreferences();
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
         * Enhanced save preferences with CCPA support
         */
        savePreferences() {
            const banner = document.getElementById('cookiebot-ai-banner');
            
            if (this.config.bannerType === 'ccpa') {
                const doNotSell = banner.querySelector('#cba-do-not-sell')?.checked || false;
                this.consent = {
                    necessary: true,
                    preferences: !doNotSell,
                    statistics: !doNotSell,
                    marketing: !doNotSell,
                    method: 'explicit',
                    timestamp: new Date().toISOString(),
                    ccpaOptOut: doNotSell
                };
            } else {
                this.consent = {
                    necessary: true,
                    preferences: banner.querySelector('#cba-preferences')?.checked || false,
                    statistics: banner.querySelector('#cba-statistics')?.checked || false,
                    marketing: banner.querySelector('#cba-marketing')?.checked || false,
                    method: 'explicit',
                    timestamp: new Date().toISOString()
                };
            }
            
            this.saveConsent();
            this.applyConsent();
            this.hideBanner();
            this.trigger('consentGiven', this.consent);
        }

        /**
         * Enhanced banner hiding with overlay removal
         */
        hideBanner() {
            const banner = document.getElementById('cookiebot-ai-banner');
            const overlay = document.getElementById('cookiebot-ai-overlay');
            
            if (banner) {
                banner.classList.remove('cba-banner-visible');
                setTimeout(() => {
                    banner.remove();
                }, 300);
            }
            
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                }, 300);
            }
            
            this.bannerVisible = false;
            this.trigger('bannerHidden');
        }

        // All other methods remain the same as the original implementation
        // (applyConsent, deleteCookie, saveConsent, loadStoredConsent, etc.)
        
        /**
         * Apply consent preferences to cookies and scripts
         */
        applyConsent() {
            if (!this.config.autoBlock) return;

            this.cookies.forEach(cookie => {
                if (cookie.category === 'necessary') return;
                
                const hasConsent = this.consent[cookie.category];
                
                if (cookie.type === 'script' && !hasConsent) {
                    if (cookie.element) {
                        cookie.element.type = 'text/plain';
                        cookie.element.setAttribute('data-cookiebot-blocked', 'true');
                    }
                } else if (cookie.type === 'script' && hasConsent) {
                    if (cookie.element && cookie.element.hasAttribute('data-cookiebot-blocked')) {
                        cookie.element.type = 'text/javascript';
                        cookie.element.removeAttribute('data-cookiebot-blocked');
                    }
                }
                
                if (!hasConsent && !cookie.type) {
                    this.deleteCookie(cookie.name);
                }
            });
        }

        deleteCookie(name) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
        }

        saveConsent() {
            try {
                localStorage.setItem('cookiebot-ai-consent', JSON.stringify(this.consent));
            } catch (e) {
                const consentData = encodeURIComponent(JSON.stringify(this.consent));
                document.cookie = `cookiebot-ai-consent=${consentData}; expires=${new Date(Date.now() + this.config.consentExpiry * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
            }
        }

        loadStoredConsent() {
            try {
                const stored = localStorage.getItem('cookiebot-ai-consent');
                if (stored) {
                    this.consent = Object.assign(this.consent, JSON.parse(stored));
                    return;
                }
            } catch (e) {
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

            const callbackName = `on${event.charAt(0).toUpperCase() + event.slice(1)}`;
            if (this.config[callbackName] && typeof this.config[callbackName] === 'function') {
                try {
                    this.config[callbackName](data);
                } catch (e) {
                    console.error('Config callback error:', e);
                }
            }
        }

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

    // Enhanced auto-initialization with backward compatibility
    const script = document.currentScript || document.querySelector('script[data-cbid]');
    if (script) {
        const config = {};
        
        // Extract configuration from script attributes
        if (script.dataset.cbid) config.clientId = script.dataset.cbid;
        if (script.dataset.apiEndpoint) config.apiEndpoint = script.dataset.apiEndpoint;
        
        // Layout options
        if (script.dataset.layout) config.layout = script.dataset.layout;
        if (script.dataset.position) config.position = script.dataset.position;
        if (script.dataset.overlay) config.overlay = script.dataset.overlay === 'true';
        if (script.dataset.slideIn) config.slideIn = script.dataset.slideIn === 'true';
        
        // Theme options
        if (script.dataset.theme) config.theme = script.dataset.theme;
        if (script.dataset.buttonStyle) config.buttonStyle = script.dataset.buttonStyle;
        if (script.dataset.bannerType) config.bannerType = script.dataset.bannerType;
        
        // Legacy compatibility
        if (script.dataset.bannerPosition) config.position = script.dataset.bannerPosition;
        if (script.dataset.primaryColor) {
            config.customColors = config.customColors || {};
            config.customColors.accent = script.dataset.primaryColor;
            config.customColors.buttonPrimary = script.dataset.primaryColor;
        }
        
        // Logo and branding
        if (script.dataset.logoUrl) config.logoUrl = script.dataset.logoUrl;
        if (script.dataset.companyName) config.companyName = script.dataset.companyName;
        if (script.dataset.enableAffiliateAds) config.enableAffiliateAds = script.dataset.enableAffiliateAds === 'true';
        
        // Advanced options
        if (script.dataset.showCloseIcon) config.showCloseIcon = script.dataset.showCloseIcon === 'true';
        
        // Initialize Enhanced CookieBot.ai
        window.CookieBotAI = new CookieBotAI(config);
    } else {
        // Expose class for manual initialization
        window.CookieBotAI = CookieBotAI;
    }

})(window, document);

