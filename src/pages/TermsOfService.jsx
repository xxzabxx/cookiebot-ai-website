import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { 
  ArrowLeft, 
  Scale, 
  AlertTriangle, 
  DollarSign, 
  Shield, 
  FileText, 
  Gavel, 
  Globe 
} from 'lucide-react'

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - CookieBot.ai</title>
        <meta name="description" content="CookieBot.ai Terms of Service - Legal terms and conditions for using our platform." />
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
              <Scale className="h-12 w-12" />
              <h1 className="text-4xl font-bold">Terms of Service</h1>
            </div>
            <p className="text-xl opacity-90 max-w-2xl">
              Legal terms and conditions governing your use of the CookieBot.ai platform and services.
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
                <a href="#agreement" className="text-primary hover:underline">1. Agreement and Acceptance</a>
                <a href="#service-description" className="text-primary hover:underline">2. Service Description</a>
                <a href="#account-management" className="text-primary hover:underline">3. Account Management</a>
                <a href="#billing" className="text-primary hover:underline">4. Billing and Payments</a>
                <a href="#acceptable-use" className="text-primary hover:underline">5. Acceptable Use Policy</a>
                <a href="#intellectual-property" className="text-primary hover:underline">6. Intellectual Property</a>
                <a href="#limitation-liability" className="text-primary hover:underline">7. Limitation of Liability</a>
                <a href="#disclaimers" className="text-primary hover:underline">8. Disclaimers</a>
                <a href="#indemnification" className="text-primary hover:underline">9. Indemnification</a>
                <a href="#termination" className="text-primary hover:underline">10. Termination</a>
                <a href="#modifications" className="text-primary hover:underline">11. Modifications</a>
                <a href="#dispute-resolution" className="text-primary hover:underline">12. Dispute Resolution</a>
                <a href="#general-provisions" className="text-primary hover:underline">13. General Provisions</a>
                <a href="#contact" className="text-primary hover:underline">14. Contact Information</a>
              </div>
            </div>

            {/* Important Notices */}
            <div className="space-y-4 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <Globe className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Independent Platform Notice</h3>
                    <p className="text-blue-800">
                      <strong>CookieBot.ai is an independent platform</strong> operated by CookieBot.ai LLC. 
                      We are not affiliated with, endorsed by, or connected to Cookiebot.com, Usercentrics A/S, 
                      or any other cookie consent management providers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-900 mb-2">No Refund Policy</h3>
                    <p className="text-red-800">
                      <strong>ALL FEES ARE FINAL AND NON-REFUNDABLE.</strong> By using our services, 
                      you acknowledge and agree to this no-refund policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="prose prose-lg max-w-none">
              
              <section id="agreement" className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Gavel className="h-6 w-6" />
                  1. Agreement and Acceptance
                </h2>
                
                <div className="bg-muted rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-3">1.1 Binding Agreement</h3>
                  <p className="text-muted-foreground mb-4">
                    These Terms of Service ("Terms") constitute a legally binding agreement between you 
                    ("Customer," "you," or "your") and CookieBot.ai LLC ("CookieBot.ai," "we," "us," or "our"). 
                    By accessing, using, or subscribing to our services, you agree to be bound by these Terms.
                  </p>
                </div>

                <div className="bg-muted rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-3">1.2 Acceptance Methods</h3>
                  <p className="text-muted-foreground mb-3">You accept these Terms by:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Creating an account on our platform</li>
                    <li>• Clicking "I Accept" or similar buttons</li>
                    <li>• Using our services in any manner</li>
                    <li>• Implementing our script on your website</li>
                  </ul>
                </div>

                <div className="bg-muted rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3">1.3 Authority to Accept</h3>
                  <p className="text-muted-foreground">
                    By accepting these Terms, you represent that you have the legal authority to bind 
                    yourself or the entity you represent to this agreement.
                  </p>
                </div>
              </section>

              <section id="service-description" className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">2. Service Description</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-muted rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">Core Services</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Cookie consent management platform</li>
                      <li>• Website compliance scanning</li>
                      <li>• Customizable consent banners</li>
                      <li>• Analytics and reporting dashboard</li>
                      <li>• API access and integration tools</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">Privacy Insights Feature</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Educational privacy content delivery</li>
                      <li>• Revenue generation through sponsored content</li>
                      <li>• 60/40 revenue sharing (customer/platform)</li>
                      <li>• Compliance with advertising standards</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-3">Service Evolution</h3>
                  <p className="text-yellow-800">
                    <strong>We reserve the right to:</strong> Add new features, modify existing functionality, 
                    discontinue features with reasonable notice, and update our technology stack and infrastructure 
                    at our sole discretion.
                  </p>
                </div>
              </section>

              <section id="billing" className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  4. Billing and Payments
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-muted rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">Starter Plan</h3>
                    <p className="text-2xl font-bold text-primary mb-2">Free</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Basic cookie consent</li>
                      <li>• Limited customization</li>
                      <li>• Community support</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">Professional Plan</h3>
                    <p className="text-2xl font-bold text-primary mb-2">Paid</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Advanced features</li>
                      <li>• Privacy Insights revenue sharing</li>
                      <li>• Priority support</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">Enterprise Plan</h3>
                    <p className="text-2xl font-bold text-primary mb-2">Custom</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Custom pricing</li>
                      <li>• Dedicated support</li>
                      <li>• SLA guarantees</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-red-900 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    NO REFUND POLICY
                  </h3>
                  <div className="text-red-800">
                    <p className="font-semibold mb-3">ALL FEES ARE FINAL AND NON-REFUNDABLE. This includes:</p>
                    <ul className="space-y-2">
                      <li>• Subscription fees</li>
                      <li>• Setup fees</li>
                      <li>• Overage charges</li>
                      <li>• Cancelled services</li>
                      <li>• Unused portions of prepaid services</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3">Revenue Sharing (Privacy Insights)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-primary mb-2">Customer Share: 60%</p>
                      <p className="text-sm text-muted-foreground">Revenue generated from Privacy Insights interactions on your websites</p>
                    </div>
                    <div>
                      <p className="font-semibold text-primary mb-2">Platform Share: 40%</p>
                      <p className="text-sm text-muted-foreground">Platform operations, content creation, and infrastructure costs</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      <strong>Payment Schedule:</strong> Monthly payments for amounts over $50. 
                      Revenue calculations are transparent and auditable through your dashboard.
                    </p>
                  </div>
                </div>
              </section>

              <section id="limitation-liability" className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Shield className="h-6 w-6" />
                  7. Limitation of Liability
                </h2>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">Maximum Liability Cap</h3>
                  <p className="text-red-800 font-semibold">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY TO YOU FOR ANY CLAIMS 
                    ARISING FROM OR RELATED TO THESE TERMS OR OUR SERVICES SHALL NOT EXCEED THE AMOUNT 
                    YOU PAID TO US IN THE 12 MONTHS PRECEDING THE CLAIM.
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">Excluded Damages</h3>
                  <p className="text-red-800 font-semibold mb-3">WE SHALL NOT BE LIABLE FOR:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-red-800">
                    <ul className="space-y-2">
                      <li>• <strong>Indirect or consequential damages</strong></li>
                      <li>• <strong>Lost profits or revenue</strong></li>
                      <li>• <strong>Data loss or corruption</strong></li>
                      <li>• <strong>Business interruption</strong></li>
                    </ul>
                    <ul className="space-y-2">
                      <li>• <strong>Regulatory fines or penalties</strong></li>
                      <li>• <strong>Third-party claims</strong></li>
                      <li>• <strong>Punitive damages</strong></li>
                      <li>• <strong>Legal fees and costs</strong></li>
                    </ul>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3">Service Availability Disclaimer</h3>
                  <p className="text-muted-foreground mb-3">We do not guarantee:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Uninterrupted service availability</li>
                    <li>• Error-free operation</li>
                    <li>• Compatibility with all systems</li>
                    <li>• Specific performance metrics</li>
                    <li>• Particular revenue generation amounts</li>
                  </ul>
                </div>
              </section>

              <section id="disclaimers" className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">8. Disclaimers</h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">"AS IS" Service Disclaimer</h3>
                    <p className="text-gray-800 font-semibold mb-3">
                      OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
                      EXPRESS OR IMPLIED, INCLUDING:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
                      <ul className="space-y-2">
                        <li>• <strong>MERCHANTABILITY</strong></li>
                        <li>• <strong>FITNESS FOR A PARTICULAR PURPOSE</strong></li>
                        <li>• <strong>NON-INFRINGEMENT</strong></li>
                      </ul>
                      <ul className="space-y-2">
                        <li>• <strong>ACCURACY OR COMPLETENESS</strong></li>
                        <li>• <strong>SECURITY OR PRIVACY</strong></li>
                        <li>• <strong>UNINTERRUPTED OPERATION</strong></li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-orange-900 mb-3">Compliance Disclaimer</h3>
                    <p className="text-orange-800 font-semibold">
                      WE DO NOT GUARANTEE THAT USE OF OUR SERVICES WILL ENSURE COMPLIANCE WITH ANY SPECIFIC 
                      LAWS OR REGULATIONS. You are solely responsible for ensuring your privacy practices 
                      comply with applicable laws including GDPR, CCPA, and other privacy regulations.
                    </p>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-purple-900 mb-3">Revenue Generation Disclaimer</h3>
                    <p className="text-purple-800 font-semibold">
                      WE MAKE NO GUARANTEES REGARDING REVENUE GENERATION THROUGH PRIVACY INSIGHTS. 
                      Revenue depends on various factors including website traffic, user engagement, 
                      market conditions, and content performance.
                    </p>
                  </div>
                </div>
              </section>

              <section id="contact" className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">14. Contact Information</h2>
                
                <div className="bg-muted rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Legal Inquiries</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="mb-2"><strong>Terms of Service Questions:</strong></p>
                      <p className="text-sm text-muted-foreground mb-4">legal@cookiebot.ai</p>
                      
                      <p className="mb-2"><strong>Subject Line:</strong></p>
                      <p className="text-sm text-muted-foreground">Terms of Service Inquiry</p>
                    </div>
                    <div>
                      <p className="mb-2"><strong>Mailing Address:</strong></p>
                      <div className="text-sm text-muted-foreground">
                        <p>CookieBot.ai LLC</p>
                        <p>Legal Department</p>
                        <p>[Address to be provided]</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-muted-foreground">
                      <strong>Response Time:</strong> We aim to respond to legal inquiries within 5 business days.
                    </p>
                  </div>
                </div>
              </section>

              {/* Important Final Notice */}
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mt-12">
                <h3 className="font-bold text-red-800 text-lg mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6" />
                  IMPORTANT NOTICE
                </h3>
                <p className="text-red-800 font-semibold">
                  BY USING COOKIEBOT.AI SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, 
                  AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE. IF YOU DO NOT AGREE TO THESE TERMS, 
                  DO NOT USE OUR SERVICES.
                </p>
              </div>

              {/* Footer */}
              <div className="border-t pt-8 mt-8">
                <div className="bg-muted rounded-lg p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Last Updated:</strong> December 12, 2025 | <strong>Version:</strong> 1.0
                  </p>
                  <p className="text-sm text-muted-foreground">
                    These Terms of Service are designed to protect CookieBot.ai's interests while providing 
                    clear guidelines for service usage. The terms include comprehensive liability limitations, 
                    no-refund policies, and broad discretionary rights for platform modifications and management.
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

export default TermsOfService

