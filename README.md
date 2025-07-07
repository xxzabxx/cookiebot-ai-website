# 🍪 CookieBot.ai Enhanced - Advanced Cookie Consent Management Platform

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/yourusername/cookiebot-ai)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Deploy](https://img.shields.io/badge/deploy-netlify-00C7B7.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/cookiebot-ai)

A comprehensive, GDPR-compliant cookie consent management platform with advanced customization options, affiliate revenue system, and professional dashboard interface.

## 🚀 Enhanced Features (v2.0)

### **Advanced Layout Control**
- **Dialog Layout** - Floating window with customizable positioning
- **Bar Layout** - Full-width banner spanning the page
- **Position Control** - Top, bottom, or center positioning
- **Visual Effects** - Overlay backgrounds, slide-in animations, close icons

### **Professional Theme System**
- **Light Theme** - Clean, professional appearance
- **Dark Theme** - Modern dark mode styling  
- **Custom Theme** - Complete color control with color pickers
- **Custom Colors** - Background, text, accent, and button colors

### **Button Style Variations**
- **Default (CTA Style)** - Emphasizes the accept button
- **Solid (Equal Weight)** - All buttons have equal visual weight
- **Outline (Minimal)** - Clean, minimal button styling

### **Banner Type Options**
- **Multilevel** - Complete consent management with granular controls
- **Accept Only** - Simple acceptance banner
- **Accept/Decline** - Binary choice option
- **Inline Multilevel** - Compact multilevel options
- **CCPA** - California "Do Not Sell" compliance

### **Compliance & Legal**
- **GDPR** - European Union compliance
- **CCPA** - California Consumer Privacy Act
- **LGPD** - Brazil General Data Protection Law
- **Auto-detection** - Automatic jurisdiction detection
- **Multi-language** - Support for 6+ languages

### **Enhanced Dashboard**
- **Six-tab Interface** - Dashboard, Websites, Layout, Design, Compliance, Integration
- **Live Preview** - Real-time banner preview with responsive testing
- **Analytics** - Comprehensive consent and revenue tracking
- **Website Management** - Multi-site management interface

## 📦 What's Included

```
cookiebot-ai/
├── src/
│   └── cookiebot-ai.js          # Enhanced cookie consent script
├── dashboard/
│   ├── src/                     # React dashboard source
│   ├── dist/                    # Built dashboard (production-ready)
│   └── package.json             # Dashboard dependencies
├── examples/
│   ├── demo.html               # Comprehensive demo page
│   ├── enhanced-demo.html      # Advanced features demo
│   └── simple-test.html        # Basic implementation test
├── api/
│   └── src/                    # Flask API backend
└── docs/
    ├── DEPLOYMENT.md           # Deployment instructions
    ├── API.md                  # API documentation
    └── CUSTOMIZATION.md        # Customization guide
```

## 🚀 Quick Start

### 1. Basic Implementation

Add this script to your website's `<head>` section:

```html
<script src="https://cdn.cookiebot.ai/v2/cookiebot-ai.js" 
        data-cbid="your-client-id"
        data-company-name="Your Company"
        data-layout="dialog"
        data-position="bottom"
        data-theme="light">
</script>
```

### 2. Advanced Configuration

```html
<script src="https://cdn.cookiebot.ai/v2/cookiebot-ai.js" 
        data-cbid="your-client-id"
        data-company-name="Your Company"
        data-logo-url="https://yoursite.com/logo.png"
        data-layout="dialog"
        data-position="bottom"
        data-overlay="true"
        data-slide-in="true"
        data-theme="custom"
        data-button-style="default"
        data-banner-type="multilevel"
        data-show-close-icon="false"
        data-enable-affiliate-ads="true"
        data-auto-block="true"
        data-consent-expiry="365"
        data-jurisdiction="auto"
        data-language="auto"
        data-custom-colors='{"background":"#ffffff","text":"#333333","accent":"#667eea","buttonPrimary":"#667eea"}'>
</script>
```

### 3. JavaScript API

```javascript
// Initialize with configuration
const cookieBot = new CookieBotAI({
    clientId: 'your-client-id',
    companyName: 'Your Company',
    layout: 'dialog',
    position: 'bottom',
    theme: 'light',
    bannerType: 'multilevel',
    enableAffiliateAds: true,
    autoBlock: true
});

// Show the banner
cookieBot.showBanner();

// Check consent status
if (cookieBot.hasConsent('marketing')) {
    // Load marketing scripts
}

// Listen for consent changes
cookieBot.onConsentChange((consents) => {
    console.log('Consent updated:', consents);
});
```

## 🎨 Customization Options

### Layout Configuration
- `data-layout`: `"dialog"` | `"bar"`
- `data-position`: `"top"` | `"bottom"` | `"center"`
- `data-overlay`: `true` | `false`
- `data-slide-in`: `true` | `false`
- `data-show-close-icon`: `true` | `false`

### Theme & Design
- `data-theme`: `"light"` | `"dark"` | `"custom"`
- `data-button-style`: `"default"` | `"solid"` | `"outline"`
- `data-custom-colors`: JSON object with color configuration

### Banner Types
- `data-banner-type`: `"multilevel"` | `"accept-only"` | `"accept-decline"` | `"inline-multilevel"` | `"ccpa"`

### Compliance
- `data-jurisdiction`: `"auto"` | `"gdpr"` | `"ccpa"` | `"lgpd"`
- `data-language`: `"auto"` | `"en"` | `"es"` | `"fr"` | `"de"` | `"it"` | `"pt"`
- `data-consent-expiry`: `1-730` (days)

### Functionality
- `data-auto-block`: `true` | `false`
- `data-enable-affiliate-ads`: `true` | `false`

### Branding
- `data-company-name`: Company name string
- `data-logo-url`: URL to company logo

## 🏗️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Python 3.8+ (for API backend)

### Dashboard Development
```bash
cd dashboard
npm install
npm run dev
```

### API Backend
```bash
cd api
pip install -r requirements.txt
python src/main.py
```

### Build for Production
```bash
cd dashboard
npm run build
```

## 🚀 Deployment

### Netlify (Recommended)
1. Fork this repository
2. Connect to Netlify
3. Set build command: `cd dashboard && npm run build`
4. Set publish directory: `dashboard/dist`
5. Deploy!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/cookiebot-ai)

### Vercel
```bash
cd dashboard
vercel --prod
```

### GitHub Pages
```bash
cd dashboard
npm run build
# Push dist/ folder to gh-pages branch
```

## 📊 Dashboard Features

### Analytics Dashboard
- Real-time visitor tracking
- Consent rate monitoring
- Affiliate revenue tracking
- Performance metrics

### Website Management
- Multi-site management
- Individual site analytics
- Compliance status monitoring
- Revenue breakdown per site

### Configuration Interface
- Visual banner customization
- Live preview system
- Theme and color management
- Compliance settings

### Integration Tools
- Script code generation
- Copy/download functionality
- Implementation guides
- Testing tools

## 💰 Affiliate Revenue System

### How It Works
1. **Contextual Ads** - Non-intrusive ads in consent banners
2. **Revenue Sharing** - 60% to website owners, 40% to platform
3. **Real-time Tracking** - Live revenue monitoring
4. **Automated Payouts** - Monthly payment processing

### Revenue Optimization
- **Performance Analytics** - Track ad performance
- **A/B Testing** - Optimize ad placement
- **Targeting** - Contextual ad matching
- **Reporting** - Detailed revenue reports

## 🔒 Privacy & Compliance

### GDPR Compliance
- ✅ Explicit consent collection
- ✅ Granular consent categories
- ✅ Consent withdrawal options
- ✅ Data processing records
- ✅ Privacy policy integration

### CCPA Compliance
- ✅ "Do Not Sell" options
- ✅ California resident detection
- ✅ Opt-out mechanisms
- ✅ Consumer rights notices

### Technical Features
- ✅ Automatic script blocking
- ✅ Consent state management
- ✅ Cross-domain support
- ✅ Mobile optimization

## 🛠️ API Reference

### Consent Management
```javascript
// Check specific consent
cookieBot.hasConsent('marketing') // boolean

// Get all consents
cookieBot.getConsents() // object

// Update consent
cookieBot.updateConsent('marketing', true)

// Reset all consents
cookieBot.resetConsents()
```

### Event Handling
```javascript
// Consent change events
cookieBot.onConsentChange((consents) => {
    // Handle consent updates
});

// Banner events
cookieBot.onBannerShow(() => {
    // Banner displayed
});

cookieBot.onBannerHide(() => {
    // Banner hidden
});
```

## 📚 Documentation

- [Deployment Guide](docs/DEPLOYMENT.md)
- [API Documentation](docs/API.md)
- [Customization Guide](docs/CUSTOMIZATION.md)
- [Migration Guide](docs/MIGRATION.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆚 Comparison with Competitors

| Feature | CookieBot.ai Enhanced | Cookiebot | OneTrust | Termly |
|---------|----------------------|-----------|----------|--------|
| Layout Options | ✅ Dialog + Bar | ✅ Limited | ✅ Basic | ❌ Basic |
| Custom Themes | ✅ Full Control | ✅ Limited | ❌ Basic | ❌ None |
| Button Styles | ✅ 3 Options | ❌ Limited | ❌ Basic | ❌ None |
| Banner Types | ✅ 5 Types | ✅ 3 Types | ✅ 4 Types | ❌ 2 Types |
| Live Preview | ✅ Real-time | ❌ None | ❌ Basic | ❌ None |
| Affiliate Revenue | ✅ Built-in | ❌ None | ❌ None | ❌ None |
| Open Source | ✅ MIT License | ❌ Proprietary | ❌ Proprietary | ❌ Proprietary |
| Self-Hosted | ✅ Full Control | ❌ SaaS Only | ❌ SaaS Only | ❌ SaaS Only |

## 🎯 Roadmap

### v2.1 (Coming Soon)
- [ ] A/B testing framework
- [ ] Advanced analytics
- [ ] Custom CSS injection
- [ ] Webhook integrations

### v2.2 (Q2 2025)
- [ ] Multi-language interface
- [ ] Advanced targeting rules
- [ ] Integration marketplace
- [ ] White-label options

## 📞 Support

- **Documentation**: [docs.cookiebot.ai](https://docs.cookiebot.ai)
- **Issues**: [GitHub Issues](https://github.com/yourusername/cookiebot-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/cookiebot-ai/discussions)
- **Email**: support@cookiebot.ai

---

**Made with ❤️ for privacy-conscious developers**

