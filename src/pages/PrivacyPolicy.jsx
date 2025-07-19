import React from 'react'
import { Shield, Eye, Lock, Database, Globe, Users } from 'lucide-react'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your information when you use CookieBot.ai.
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
                <Eye className="w-6 h-6 text-blue-600" />
                Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed">
                CookieBot.ai ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you visit our website 
                and use our services. Please read this privacy policy carefully. If you do not agree with the 
                terms of this privacy policy, please do not access the site or use our services.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-green-600" />
                Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>Register for an account</li>
                <li>Use our compliance scanner</li>
                <li>Contact us for support</li>
                <li>Subscribe to our newsletter</li>
                <li>Participate in surveys or promotions</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                When you visit our website, we may automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring website</li>
                <li>Pages viewed and time spent</li>
                <li>Device identifiers</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cookies and Tracking Technologies</h3>
              <p className="text-gray-600 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience on our website. 
                You can control cookie preferences through your browser settings or our cookie consent banner.
              </p>
            </div>

            {/* How We Use Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-purple-600" />
                How We Use Your Information
              </h2>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>Providing and maintaining our services</li>
                <li>Processing your transactions and managing your account</li>
                <li>Sending you technical notices and support messages</li>
                <li>Responding to your comments and questions</li>
                <li>Analyzing usage patterns to improve our services</li>
                <li>Detecting and preventing fraud and abuse</li>
                <li>Complying with legal obligations</li>
                <li>Marketing our services (with your consent)</li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-orange-600" />
                Information Sharing and Disclosure
              </h2>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Providers</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may share your information with trusted third-party service providers who assist us in operating 
                our website and providing our services, such as hosting, analytics, and payment processing.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Legal Requirements</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may disclose your information if required to do so by law or in response to valid requests 
                by public authorities (e.g., a court or government agency).
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Business Transfers</h3>
              <p className="text-gray-600 leading-relaxed">
                In the event of a merger, acquisition, or sale of assets, your information may be transferred 
                as part of that transaction.
              </p>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-red-600" />
                Data Security
              </h2>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication</li>
                <li>Employee training on data protection</li>
                <li>Incident response procedures</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                However, no method of transmission over the internet or electronic storage is 100% secure. 
                While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </div>

            {/* International Transfers */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-teal-600" />
                International Data Transfers
              </h2>
              
              <p className="text-gray-600 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure that such transfers comply with applicable data protection laws and implement 
                appropriate safeguards to protect your information.
              </p>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy Rights</h2>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Rectification:</strong> Request correction of inaccurate information</li>
                <li><strong>Erasure:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your information</li>
                <li><strong>Restriction:</strong> Request limitation of processing</li>
                <li><strong>Objection:</strong> Object to processing of your information</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for processing</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </div>

            {/* Retention */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
              
              <p className="text-gray-600 leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes 
                for which it was collected, comply with legal obligations, resolve disputes, and enforce 
                our agreements. When we no longer need your information, we will securely delete or anonymize it.
              </p>
            </div>

            {/* Children's Privacy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              
              <p className="text-gray-600 leading-relaxed">
                Our services are not intended for children under the age of 13. We do not knowingly collect 
                personal information from children under 13. If we become aware that we have collected 
                personal information from a child under 13, we will take steps to delete such information.
              </p>
            </div>

            {/* Updates */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
              
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                We encourage you to review this Privacy Policy periodically.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-12 p-6 bg-blue-50 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> privacy@cookiebot.ai</p>
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

export default PrivacyPolicy

