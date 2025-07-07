# 🚀 CookieBot.ai Enhanced - Deployment Guide

This guide covers deploying the enhanced CookieBot.ai platform with all advanced customization features.

## 📋 Prerequisites

- Node.js 18+ and npm
- Git
- GitHub account
- Netlify account (recommended) or Vercel/Heroku

## 🏗️ Project Structure

```
cookiebot-ai/
├── dashboard/                   # React dashboard (main application)
│   ├── src/                    # Source code
│   ├── dist/                   # Built files (auto-generated)
│   ├── package.json            # Dependencies
│   └── vite.config.js          # Build configuration
├── src/                        # Enhanced cookie script
│   └── cookiebot-ai.js         # Main script file
├── examples/                   # Demo pages
│   ├── demo.html              # Comprehensive demo
│   ├── enhanced-demo.html     # Advanced features demo
│   └── simple-test.html       # Basic test
├── api/                        # Flask backend (optional)
│   └── src/                   # API source code
└── docs/                       # Documentation
```

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)

#### Quick Deploy
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/cookiebot-ai)

#### Manual Deployment

1. **Fork the Repository**
   ```bash
   # Fork on GitHub, then clone
   git clone https://github.com/yourusername/cookiebot-ai.git
   cd cookiebot-ai
   ```

2. **Install Dependencies**
   ```bash
   cd dashboard
   npm install
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Deploy to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set build settings:
     - **Build command**: `cd dashboard && npm run build`
     - **Publish directory**: `dashboard/dist`
   - Click "Deploy site"

5. **Configure Custom Domain** (Optional)
   - In Netlify dashboard, go to "Domain settings"
   - Add your custom domain (e.g., `cookiebot.ai`)
   - Configure DNS records as instructed

#### Netlify Configuration File

Create `netlify.toml` in the root directory:

```toml
[build]
  base = "dashboard"
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/src/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, POST, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

### Option 2: Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd dashboard
   vercel --prod
   ```

3. **Configure vercel.json**
   ```json
   {
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/static-build",
         "config": {
           "distDir": "dist"
         }
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/index.html"
       }
     ]
   }
   ```

### Option 3: GitHub Pages

1. **Build the Project**
   ```bash
   cd dashboard
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   # Install gh-pages
   npm install -g gh-pages
   
   # Deploy
   gh-pages -d dist
   ```

3. **Configure GitHub Pages**
   - Go to repository settings
   - Enable GitHub Pages
   - Set source to `gh-pages` branch

### Option 4: Self-Hosted (VPS/Dedicated Server)

#### Using Nginx

1. **Build the Project**
   ```bash
   cd dashboard
   npm run build
   ```

2. **Copy Files to Server**
   ```bash
   scp -r dist/* user@yourserver.com:/var/www/cookiebot-ai/
   ```

3. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name cookiebot.ai www.cookiebot.ai;
       root /var/www/cookiebot-ai;
       index index.html;

       # Handle SPA routing
       location / {
           try_files $uri $uri/ /index.html;
       }

       # Cache static assets
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }

       # CORS headers for API
       location /src/ {
           add_header Access-Control-Allow-Origin *;
           add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
           add_header Access-Control-Allow-Headers "Content-Type";
       }
   }
   ```

4. **SSL Certificate** (Let's Encrypt)
   ```bash
   sudo certbot --nginx -d cookiebot.ai -d www.cookiebot.ai
   ```

## 🔧 Environment Configuration

### Environment Variables

Create `.env` file in the dashboard directory:

```env
# API Configuration
VITE_API_BASE_URL=https://api.cookiebot.ai
VITE_CDN_BASE_URL=https://cdn.cookiebot.ai

# Analytics
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
VITE_HOTJAR_ID=HOTJAR_ID

# Feature Flags
VITE_ENABLE_AFFILIATE_ADS=true
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_API_BACKEND=false

# Branding
VITE_APP_NAME=CookieBot.ai Enhanced
VITE_APP_VERSION=2.0.0
```

### Production Environment

For production deployment, ensure:

```env
NODE_ENV=production
VITE_API_BASE_URL=https://your-production-api.com
VITE_CDN_BASE_URL=https://your-cdn.com
```

## 📡 CDN Setup (Optional)

### Using Cloudflare

1. **Upload Script to CDN**
   ```bash
   # Upload cookiebot-ai.js to your CDN
   curl -X POST "https://api.cloudflare.com/client/v4/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/values/cookiebot-ai.js" \
        -H "Authorization: Bearer {api_token}" \
        -H "Content-Type: application/javascript" \
        --data-binary @src/cookiebot-ai.js
   ```

2. **Configure CDN URL**
   Update script references to use CDN:
   ```html
   <script src="https://cdn.cookiebot.ai/v2/cookiebot-ai.js"></script>
   ```

### Using AWS CloudFront

1. **Upload to S3**
   ```bash
   aws s3 cp src/cookiebot-ai.js s3://your-bucket/v2/cookiebot-ai.js
   ```

2. **Configure CloudFront Distribution**
   - Create distribution pointing to S3 bucket
   - Set appropriate cache headers
   - Configure CORS policies

## 🔒 Security Configuration

### Content Security Policy

Add CSP headers to your deployment:

```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://cdn.cookiebot.ai;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    connect-src 'self' https://api.cookiebot.ai;
    font-src 'self' data:;
">
```

### HTTPS Configuration

Ensure all deployments use HTTPS:

1. **Netlify**: Automatic HTTPS with Let's Encrypt
2. **Vercel**: Automatic HTTPS
3. **Self-hosted**: Configure SSL certificates

## 📊 Monitoring & Analytics

### Performance Monitoring

1. **Google Analytics**
   ```javascript
   // Add to dashboard
   gtag('config', 'GA_MEASUREMENT_ID');
   ```

2. **Sentry Error Tracking**
   ```bash
   npm install @sentry/react
   ```

3. **Uptime Monitoring**
   - Use services like Pingdom or UptimeRobot
   - Monitor main dashboard and API endpoints

### Log Aggregation

For production deployments:

```javascript
// Add structured logging
console.log(JSON.stringify({
    level: 'info',
    message: 'Banner displayed',
    userId: 'user-123',
    timestamp: new Date().toISOString()
}));
```

## 🚀 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: dashboard/package-lock.json
    
    - name: Install dependencies
      run: |
        cd dashboard
        npm ci
    
    - name: Build
      run: |
        cd dashboard
        npm run build
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v2.0
      with:
        publish-dir: './dashboard/dist'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 🧪 Testing Deployment

### Pre-deployment Checklist

- [ ] Dashboard builds without errors
- [ ] All routes work correctly
- [ ] Cookie script loads and functions
- [ ] Live preview system works
- [ ] All customization options function
- [ ] Mobile responsiveness verified
- [ ] HTTPS configured
- [ ] CDN configured (if applicable)
- [ ] Analytics tracking works
- [ ] Error monitoring configured

### Testing Commands

```bash
# Build and test locally
cd dashboard
npm run build
npm run preview

# Test cookie script
cd examples
python -m http.server 8000
# Visit http://localhost:8000/demo.html
```

### Smoke Tests

After deployment, verify:

1. **Dashboard loads**: Visit your deployed URL
2. **All tabs work**: Test Dashboard, Layout, Design, Compliance, Integration
3. **Live preview**: Test banner preview functionality
4. **Script generation**: Verify integration code generation
5. **Cookie script**: Test on a sample website

## 🔄 Updates & Maintenance

### Updating the Platform

1. **Pull latest changes**
   ```bash
   git pull origin main
   ```

2. **Update dependencies**
   ```bash
   cd dashboard
   npm update
   ```

3. **Rebuild and deploy**
   ```bash
   npm run build
   # Deploy using your chosen method
   ```

### Version Management

Use semantic versioning:
- **Major**: Breaking changes (2.0.0 → 3.0.0)
- **Minor**: New features (2.0.0 → 2.1.0)
- **Patch**: Bug fixes (2.0.0 → 2.0.1)

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Routing Issues**
   - Ensure SPA routing is configured
   - Check redirect rules in hosting platform

3. **CORS Errors**
   - Configure proper CORS headers
   - Check API endpoint configurations

4. **Performance Issues**
   - Enable gzip compression
   - Configure proper caching headers
   - Use CDN for static assets

### Support Resources

- **Documentation**: Check README.md and docs/
- **Issues**: GitHub Issues for bug reports
- **Discussions**: GitHub Discussions for questions
- **Email**: support@cookiebot.ai

---

**Deployment successful? 🎉 Your enhanced CookieBot.ai platform is now live!**

