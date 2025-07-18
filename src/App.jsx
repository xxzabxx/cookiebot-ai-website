import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import {
  Menu,
  X,
  ArrowRight,
  Check,
  Star,
  Shield,
  DollarSign,
  BarChart3,
  Layout,
  Brush,
  MousePointer,
  Layers,
  Sliders,
  Target,
  Calendar,
  LogOut,
  User,
  Eye,
  Play,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react'
import Documentation from './components/Documentation.jsx'
import EnhancedDashboard from './components/EnhancedDashboard.jsx'
import ComplianceScanner from './components/ComplianceScanner.jsx'
import AuthProvider, { useAuth } from './components/AuthContext.jsx'
import AuthModal from './components/AuthModal.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Contact from './pages/Contact'
import About from './pages/About'
import Features from './pages/Features'
import UnderConstructionBanner from './components/UnderConstructionBanner'
import { api } from '@/lib/api'
import './App.css'

/* Assets */
import logoImg from './assets/logo.png'
import heroBgImg from './assets/hero-bg.png'
import dashboardPreviewImg from './assets/dashboard-preview.png'
import featuresIcon1 from './assets/features-icon-1.png'
import featuresIcon2 from './assets/features-icon-2.png'
import featuresIcon3 from './assets/features-icon-3.png'
import featuresIcon4 from './assets/features-icon-4.png'

/* ------------ SEO HEAD ------------ */
const SEOHead = ({
  title = 'Cookie Consent Management Platform | CookieBot.ai - AI-Powered GDPR Compliance',
  description = 'The first and only AI-powered cookie consent platform with built-in monetization. Advanced GDPR compliance, intelligent optimization, and Privacy Insights revenue system. Get 60% revenue share.',
  keywords = 'AI cookie consent, GDPR compliance, cookie management platform, consent management system, privacy compliance software, automated consent management, AI-powered privacy, cookie banner, CCPA compliance, LGPD compliance, privacy insights, revenue generating consent, intelligent consent management, machine learning privacy, automated compliance',
  canonical = 'https://cookiebot.ai',
  ogImage = 'https://cookiebot.ai/og-image.png'
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="robots" content="index, follow" />
    <meta name="language" content="English" />
    <meta name="author" content="CookieBot.ai" />
    <link rel="canonical" href={canonical} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonical} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:site_name" content="CookieBot.ai" />
    <meta property="og:locale" content="en_US" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={canonical} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={ogImage} />
    <meta property="twitter:creator" content="@CookieBotAI" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#667eea" />
    <meta name="msapplication-TileColor" content="#667eea" />
    <scr
