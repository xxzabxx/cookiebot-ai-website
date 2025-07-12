import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { 
  ArrowLeft, 
  Shield, 
  Eye, 
  Database, 
  Globe, 
  Lock, 
  Users, 
  FileText 
} from 'lucide-react'

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - CookieBot.ai</title>
        <meta name="description" content="CookieBot.ai Privacy Policy - How we collect, use, and protect your personal information." />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4 py-16">
            <div className="flex items-center gap-4 mb-6">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <Shield className="h-12 w-12" />
              <h1 className="text-4xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-xl opacity-90 max-w-2xl">
              Your privacy is important to us. This policy explains how CookieBot.ai collects, uses, and protects your personal information.
            </p>
            <div className="mt-6 text-sm opacity-75">
              <p><strong>Effective Date:</strong> December 12, 2025</p>
              <p><strong>Last Updated:</strong> December 12, 2025</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            
            {/* Table of Contents */}
            <div className="bg-muted rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Table of Contents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <a href="#company-info" className="text-primary hover:underline">1. Company Information</a>
                <a href="#information-collection" className="text-primary hover:underline">2. Information We Collect</a>
                <a href="#information-use" className="text-primary hover:underline">3. How We Use Information</a>
                <a href="#information-sharing" className="text-primary hover:underline">4. Information Sharing</a>
                <a href="#data-retention" className="text-primary hover:underline">5. Data Retention</a>
                <a href="#data-security" className="text-primary hover:underline">6. Data Security</a>
                <a href="#your-rights" className="text-primary hover:underline">7. Your Rights</a>
                <a href="#cookies-tracking" className="text-primary hover:underline">8. Cookies and Tracking</a>
                <a href="#third-party-services" className="text-primary hover:underline">9. Third-Party Services</a>
                <a href="#international-transfers" className="text-primary hover:underline">10. International Data Transfers</a>
                <a href="#children-privacy" className="text-primary hover:underline">11. Children's Privacy</a>
                <a href="#california-privacy" className="text-primary hover:underline">12. California Privacy Rights</a>
                <a href="#gdpr-compliance" className="text-primary hover:underline">13. GDPR Compliance</a>
                <a href="#policy-changes" className="text-primary hover:underline">14. Policy Changes</a>
                <a href="#contact-us" className="text-primary hover:underline">15. Contact Information</a>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-3">
                <Eye className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Independent Platform Notice</h3>
                  <p className="text-blue-800">
                    <strong>CookieBot.ai is an independent platform</strong> operated by CookieBot.ai LLC. 
                    We are not affiliated with, endorsed by, or connected to Cookiebot.com, Usercentrics A/S, 
                    or any other cookie consent management providers. Any similarities in name or functionality 
                    are coincidental and do not imply any business relationship.
                  </p>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="prose prose-lg max-w-none">
              
              <section id="company-info" className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Globe className="h-6 w-6" />
                  1. Company Information
                </h2>
                
                <div className="bg-muted rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-3">Data Controller</h3>
                  <div className="space-y-2">
                    <p><strong>Company:</strong> CookieBot.ai LLC</p>
                    <p><strong>Address:</strong> [Address to be provided]</p>
                    <p><strong>Email:</strong> privacy@cookiebot.ai</p>
                    <p><strong>Data Protection Officer:</strong> dpo@cookiebot.ai</p>
                    <p><strong>Website:</strong> https://cookiebot.ai</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">
                  CookieBot.ai LLC ("we," "us," or "our") is the data controller responsible for your personal 
                  information. This Privacy Policy describes how we collect, use, disclose, and safeguard your 
                  information when you use our cookie consent management platform and related services.
                </p>
              </section>

              <section id="information-collection" className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Database className="h-6 w-6" />
                  2. Information We Collect
                </h2>
                
                <h3 className="text-xl font-semibold mb-4">2.1 Information You Provide</h3>
                <div className="bg-muted rounded-lg p-6 mb-6">
                  <ul className="space-y-2">
                    <li><strong>Account Information:</strong> Name, email address, company name, password</li>
                    <li><strong>Website Information:</strong> Domain names, website URLs, integration preferences</li>
                    <li><strong>Payment Information:</strong> Billing address, payment method details (processed by third-party providers)</li>
                    <li><strong>Communication Data:</strong> Messages, support requests, feedback</li>
                    <li><strong>Profile Data:</strong> Preferences, settings, customization choices</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold mb-4">2.2 Information We Collect Automatically</h3>
                <div className="bg-muted rounded-lg p-6 mb-6">
                  <ul className="space-y-2">
                    <li><strong>Usage Data:</strong> Pages visited, features used, time spent, click patterns</li>
                    <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                    <li><strong>Technical Data:</strong> Log files, error reports, performance metrics</li>
                    <li><strong>Analytics Data:</strong> User interactions, conversion rates, feature adoption</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold mb-4">2.3 Privacy Insights Data</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <p className="text-blue-800 mb-3">
                    <strong>Our Privacy Insights feature collects:</strong>
                  </p>
                  <ul className="space-y-2 text-blue-800">
                    <li><strong>Interaction Data:</strong> Clicks on privacy tips, engagement metrics</li>
                    <li><strong>Revenue Data:</strong> Generated revenue, sharing calculations</li>
                    <li><strong>Content Performance:</strong> Which privacy tips are most effective</li>
                    <li><strong>User Preferences:</strong> Language settings, content preferences</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold mb-4">2.4 Website Visitor Data (via Our Script)</h3>
                <div className="bg-muted rounded-lg p-6 mb-6">
                  <p className="mb-3">When our script is installed on customer websites, we may collect:</p>
                  <ul className="space-y-2">
                    <li><strong>Consent Records:</strong> User consent choices and timestamps</li>
                    <li><strong>Cookie Data:</strong> Types of cookies detected and blocked</li>
                    <li><strong>Compliance Data:</strong> GDPR/CCPA compliance status</li>
                    <li><strong>Anonymous Analytics:</strong> Aggregated usage statistics</li>
                  </ul>
                </div>
              </section>

              <section id="information-use" className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Users className="h-6 w-6" />
                  3. How We Use Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-muted rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">Service Provision</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Provide cookie consent management services</li>
                      <li>• Generate compliance reports and analytics</li>
                      <li>• Process Privacy Insights revenue sharing</li>
                      <li>• Maintain and improve platform functionality</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">Communication</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Send service updates and notifications</li>
                      <li>• Provide customer support</li>
                      <li>• Share important policy changes</li>
                      <li>• Send marketing communications (with consent)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">Legal Compliance</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Comply with legal obligations</li>
                      <li>• Respond to legal requests</li>
                      <li>• Protect our rights and interests</li>
                      <li>• Prevent fraud and abuse</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">Business Operations</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Process payments and billing</li>
                      <li>• Analyze usage patterns</li>
                      <li>• Improve our services</li>
                      <li>• Develop new features</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-4">3.1 Legal Basis for Processing (GDPR)</h3>
                <div className="bg-muted rounded-lg p-6 mb-6">
                  <ul className="space-y-3">
                    <li><strong>Contract Performance:</strong> Processing necessary to provide our services</li>
                    <li><strong>Legitimate Interests:</strong> Analytics, security, fraud prevention</li>
                    <li><strong>Legal Obligation:</strong> Compliance with applicable laws</li>
                    <li><strong>Consent:</strong> Marketing communications, optional features</li>
                  </ul>
                </div>
              </section>

              <section id="information-sharing" className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Lock className="h-6 w-6" />
                  4. Information Sharing
                </h2>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">We Do Not Sell Personal Information</h3>
                  <p className="text-red-800">
                    CookieBot.ai does not sell, rent, or trade your personal information to third parties for monetary consideration.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mb-4">4.1 When We Share Information</h3>
                <div className="space-y-4 mb-6">
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Service Providers</h4>
                    <p className="text-sm text-muted-foreground">
                      We share information with trusted third-party service providers who help us operate our platform, 
                      including hosting, payment processing, email delivery, and analytics services.
                    </p>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Legal Requirements</h4>
                    <p className="text-sm text-muted-foreground">
                      We may disclose information when required by law, court order, or government request, 
                      or to protect our rights, property, or safety.
                    </p>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Business Transfers</h4>
                    <p className="text-sm text-muted-foreground">
                      In the event of a merger, acquisition, or sale of assets, your information may be 
                      transferred as part of the business transaction.
                    </p>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Aggregated Data</h4>
                    <p className="text-sm text-muted-foreground">
                      We may share aggregated, anonymized data that cannot identify individual users 
                      for research, analytics, or business purposes.
                    </p>
                  </div>
                </div>
              </section>

              <section id="contact-us" className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">15. Contact Information</h2>
                
                <div className="bg-muted rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Privacy-Related Inquiries</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="mb-2"><strong>General Privacy Questions:</strong></p>
                      <p className="text-sm text-muted-foreground mb-4">privacy@cookiebot.ai</p>
                      
                      <p className="mb-2"><strong>Data Protection Officer:</strong></p>
                      <p className="text-sm text-muted-foreground">dpo@cookiebot.ai</p>
                    </div>
                    <div>
                      <p className="mb-2"><strong>Mailing Address:</strong></p>
                      <div className="text-sm text-muted-foreground">
                        <p>CookieBot.ai LLC</p>
                        <p>Privacy Department</p>
                        <p>[Address to be provided]</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-muted-foreground">
                      <strong>Response Time:</strong> We aim to respond to privacy inquiries within 5 business days. 
                      For formal data subject requests, we will respond within 30 days as required by law.
                    </p>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <div className="border-t pt-8 mt-12">
                <div className="bg-muted rounded-lg p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Last Updated:</strong> December 12, 2025 | <strong>Version:</strong> 1.0
                  </p>
                  <p className="text-sm text-muted-foreground">
                    This Privacy Policy is designed to comply with GDPR, CCPA, and other applicable privacy laws. 
                    We are committed to protecting your privacy and handling your personal information responsibly.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicy

