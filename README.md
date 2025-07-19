# CookieBot.ai Frontend

A modern, modular React frontend for CookieBot.ai's AI-powered cookie consent management platform.

## 🚀 Features

- **Modular Dashboard**: Tab-based architecture with Analytics, Websites, Compliance, Revenue, Billing, and Settings
- **Modern Design**: Clean, professional UI with responsive design
- **Real-time Analytics**: Interactive charts and metrics
- **Revenue Sharing**: Built-in payout management system
- **Subscription Management**: Complete billing and plan management
- **Mobile Responsive**: Works perfectly on all devices

## 🛠️ Tech Stack

- **React 19** - Latest React with modern features
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - High-quality component library
- **Lucide React** - Beautiful icon library
- **Recharts** - Powerful charting library
- **React Router** - Client-side routing

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

## 🔧 Configuration

Create a `.env` file:

```env
VITE_API_BASE=https://your-backend-api-url.com
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   └── dashboard/      # Dashboard tab components
├── contexts/           # React contexts
├── lib/               # Utilities and API client
├── pages/             # Main page components
├── App.jsx            # Main app component
└── main.jsx           # Entry point
```

## 🎨 Dashboard Tabs

### Analytics
- Real-time visitor tracking
- Consent rate monitoring
- Performance metrics
- Interactive charts

### Websites
- Website management
- Integration code generation
- Status monitoring
- Performance tracking

### Compliance
- GDPR/CCPA compliance monitoring
- Cookie scanning results
- Compliance reports
- Issue tracking

### Revenue
- Earnings tracking
- Payout management
- Revenue share display
- Payment history

### Billing
- Subscription management
- Plan comparison
- Usage tracking
- Payment methods

### Settings
- Profile management
- Security settings
- API key management
- Data export

## 🔗 API Integration

The frontend integrates with the CookieBot.ai backend API:

- Authentication endpoints
- Website management
- Analytics data
- Compliance monitoring
- Billing and subscriptions
- User management

## 📱 Responsive Design

Optimized for all screen sizes:
- Desktop (1024px+)
- Tablet (768px-1023px)
- Mobile (320px-767px)

## 🧪 Demo Mode

Includes demo login functionality for testing:
- Click "Demo Login" on landing page
- Explore all features with mock data
- Perfect for development and testing

## 🚀 Deployment

### Netlify (Recommended)

1. Build command: `pnpm run build`
2. Publish directory: `dist`
3. Environment variables: `VITE_API_BASE`

### Manual Deployment

```bash
pnpm run build
# Upload dist/ folder to your hosting provider
```

## 🔒 Security

- JWT token authentication
- Protected routes
- Environment variable protection
- Input validation
- CORS handling

## 🎯 Key Components

- **Landing Page**: Modern marketing page with pricing
- **Authentication**: Login/register modal
- **Dashboard**: Tabbed interface with all features
- **Charts**: Interactive data visualizations
- **Forms**: Comprehensive form handling
- **Navigation**: Intuitive sidebar navigation

## 📊 Analytics Features

- Visitor tracking
- Consent rate analysis
- Revenue monitoring
- Performance metrics
- Real-time updates
- Historical data

## 💰 Revenue System

- Earnings dashboard
- Payout requests
- Payment history
- Revenue share tracking
- Multiple payment methods
- Automatic calculations

## 🛡️ Compliance Tools

- Cookie scanning
- GDPR compliance
- CCPA compliance
- Compliance reports
- Issue resolution
- Automated monitoring

## 🔧 Customization

Easy to customize:
- Update branding in components
- Modify colors in Tailwind config
- Add new dashboard tabs
- Extend API integration
- Custom styling options

## 📈 Performance

Optimized for performance:
- Code splitting
- Lazy loading
- Optimized builds
- Fast loading times
- Efficient rendering

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the CookieBot.ai platform.

---

Built with ❤️ for CookieBot.ai

