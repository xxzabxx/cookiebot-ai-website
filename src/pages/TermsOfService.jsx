import React from 'react'
import { FileText, Scale, Shield, AlertTriangle, DollarSign, Users } from 'lucide-react'

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These terms govern your use of CookieBot.ai and our services. 
              Please read them carefully before using our platform.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: January 19, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Scale className="w-6 h-6 text-blue-600" />
                Agreement to Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms of Service ("Terms") constitute a legally binding agreement between you and 
                CookieBot.ai ("Company," "we," "our," or "us") regarding your use of our website, 
                services, and applications (collectively, the "Service"). By accessing or using our 
                Service, you agree to be bound by these Terms. If you do not agree to these Terms, 
                you may not access or use the Service.
              </p>
            </div>

            {/* Acceptance */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                By creating an account, accessing, or using our Service, you acknowledge that you have 
                read, understood, and agree to be bound by these Terms and our Privacy Policy. These 
                Terms apply to all users of the Service, including browsers, customers, and contributors.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of any 
                material changes via email or through our Service. Your continued use of the Service 
                after such modifications constitutes acceptance of the updated Terms.
              </p>
            </div>

            {/* Description of Service */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-600" />
                Description of Service
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                CookieBot.ai provides an AI-powered cookie consent management platform that helps 
                websites comply with privacy regulations while generating revenue through our 
                Privacy Insights system. Our Service includes:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>Cookie consent banner customization and deployment</li>
                <li>Compliance monitoring and reporting</li>
                <li>Privacy Insights revenue generation</li>
                <li>Analytics and performance tracking</li>
                <li>API access and integration tools</li>
                <li>Customer support and documentation</li>
              </ul>
            </div>

            {/* User Accounts */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-purple-600" />
                User Accounts and Registration
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Creation</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                To access certain features of our Service, you must create an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your account information</li>
                <li>Keep your login credentials secure and confidential</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Eligibility</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You must be at least 18 years old and have the legal capacity to enter into contracts 
                to use our Service. By creating an account, you represent and warrant that you meet 
                these requirements.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Termination</h3>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to suspend or terminate your account at any time for violation 
                of these Terms or for any other reason at our sole discretion. You may also terminate 
                your account at any time through your account settings.
              </p>
            </div>

            {/* Acceptable Use */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                Acceptable Use Policy
              </h2>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                You agree to use our Service only for lawful purposes and in accordance with these Terms. 
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit harmful, offensive, or illegal content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt our Service</li>
                <li>Use our Service for spam or unsolicited communications</li>
                <li>Reverse engineer or attempt to extract source code</li>
                <li>Use automated tools to access our Service without permission</li>
              </ul>
            </div>

            {/* Payment Terms */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-green-600" />
                Payment Terms and Billing
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Subscription Plans</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our Service is offered through various subscription plans. By subscribing to a paid plan, 
                you agree to pay the applicable fees as described on our pricing page.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Payment Processing</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Payments are processed through secure third-party payment processors. You authorize us 
                to charge your chosen payment method for all applicable fees.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Refunds and Cancellations</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You may cancel your subscription at any time. Cancellations take effect at the end of 
                your current billing period. We do not provide refunds for partial months of service.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Privacy Insights Revenue</h3>
              <p className="text-gray-600 leading-relaxed">
                For users participating in our Privacy Insights revenue program, payments are made 
                monthly based on verified revenue generation. Revenue sharing terms are outlined 
                in your account dashboard and are subject to minimum payout thresholds.
              </p>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Rights</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Service and its original content, features, and functionality are owned by 
                CookieBot.ai and are protected by international copyright, trademark, patent, 
                trade secret, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Rights</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Subject to these Terms, we grant you a limited, non-exclusive, non-transferable 
                license to access and use our Service for your internal business purposes.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">User Content</h3>
              <p className="text-gray-600 leading-relaxed">
                You retain ownership of any content you submit to our Service. By submitting content, 
                you grant us a worldwide, royalty-free license to use, modify, and display such 
                content in connection with providing our Service.
              </p>
            </div>

            {/* Privacy and Data */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and Data Protection</h2>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                Your privacy is important to us. Our collection and use of personal information 
                is governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
              <p className="text-gray-600 leading-relaxed">
                You are responsible for ensuring that your use of our Service complies with applicable 
                data protection laws, including GDPR, CCPA, and LGPD. We provide tools to help you 
                maintain compliance, but ultimate responsibility lies with you.
              </p>
            </div>

            {/* Disclaimers */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimers and Warranties</h2>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                OUR SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
                WHETHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE</li>
                <li>NON-INFRINGEMENT OF THIRD-PARTY RIGHTS</li>
                <li>UNINTERRUPTED OR ERROR-FREE OPERATION</li>
                <li>ACCURACY OR COMPLETENESS OF CONTENT</li>
                <li>SECURITY OF DATA TRANSMISSION</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                We do not warrant that our Service will meet your specific requirements or that 
                any defects will be corrected.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL COOKIEBOT.AI BE LIABLE 
                FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING 
                BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>Loss of profits, data, or business opportunities</li>
                <li>Business interruption or system downtime</li>
                <li>Cost of substitute services</li>
                <li>Regulatory fines or penalties</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                Our total liability for any claims arising from these Terms or your use of our 
                Service shall not exceed the amount you paid us in the twelve months preceding 
                the claim.
              </p>
            </div>

            {/* Indemnification */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
              
              <p className="text-gray-600 leading-relaxed">
                You agree to indemnify, defend, and hold harmless CookieBot.ai and its officers, 
                directors, employees, and agents from any claims, damages, losses, or expenses 
                arising from your use of our Service, violation of these Terms, or infringement 
                of any third-party rights.
              </p>
            </div>

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law and Disputes</h2>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                These Terms are governed by the laws of the State of California, without regard 
                to conflict of law principles. Any disputes arising from these Terms or your use 
                of our Service shall be resolved through binding arbitration in San Francisco, California.
              </p>
              <p className="text-gray-600 leading-relaxed">
                You waive any right to participate in class action lawsuits or class-wide arbitration 
                against us.
              </p>
            </div>

            {/* Severability */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Severability and Entire Agreement</h2>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                If any provision of these Terms is found to be unenforceable, the remaining provisions 
                will continue in full force and effect. These Terms, together with our Privacy Policy, 
                constitute the entire agreement between you and CookieBot.ai regarding your use of our Service.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-12 p-6 bg-blue-50 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> legal@cookiebot.ai</p>
                <p><strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default TermsOfService

