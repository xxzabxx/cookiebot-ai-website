import React from 'react'
import { Users, Target, Award, Globe, Brain, Shield, DollarSign, Zap } from 'lucide-react'

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">CookieBot.ai</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're revolutionizing cookie consent management with AI-powered technology 
              that turns compliance into revenue while protecting user privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At CookieBot.ai, we believe that privacy compliance shouldn't be a burden—it should be an opportunity. 
                Our mission is to transform the way websites handle cookie consent by combining cutting-edge AI technology 
                with innovative monetization strategies.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We're building the first and only cookie consent platform that actually generates revenue for website owners 
                while ensuring complete compliance with global privacy regulations like GDPR, CCPA, and LGPD.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Our Goal</h3>
                  <p className="text-gray-600">Make privacy compliance profitable and effortless for every website</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why We Started CookieBot.ai</h3>
              <p className="text-blue-100 mb-6">
                Traditional cookie consent solutions are expensive, complex, and provide no value beyond compliance. 
                We saw an opportunity to change that by creating a platform that not only ensures compliance but 
                actually helps websites generate revenue.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">60%</div>
                  <div className="text-blue-100 text-sm">Revenue Share</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-blue-100 text-sm">GDPR Compliant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at CookieBot.ai
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Innovation</h3>
              <p className="text-gray-600 text-sm">
                We leverage cutting-edge AI technology to solve complex privacy challenges in innovative ways.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Privacy First</h3>
              <p className="text-gray-600 text-sm">
                User privacy is at the core of everything we build. Compliance isn't just a feature—it's our foundation.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Value Creation</h3>
              <p className="text-gray-600 text-sm">
                We believe compliance should create value, not just cost. Our platform turns privacy into profit.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Simplicity</h3>
              <p className="text-gray-600 text-sm">
                Complex problems deserve simple solutions. We make advanced technology accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A diverse team of experts in AI, privacy law, and web technology working together 
              to revolutionize cookie consent management.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Engineering Team</h3>
              <p className="text-gray-600">
                World-class engineers with expertise in AI, machine learning, and scalable web technologies.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy Experts</h3>
              <p className="text-gray-600">
                Legal and compliance specialists ensuring our platform meets the highest privacy standards globally.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Globe className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Business Development</h3>
              <p className="text-gray-600">
                Strategic thinkers focused on creating value for our customers and building sustainable partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Technology</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on cutting-edge AI and modern web technologies to deliver unmatched performance and reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">AI-Powered Intelligence</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <Brain className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Smart Optimization</h4>
                    <p className="text-gray-600">Machine learning algorithms continuously optimize consent rates and user experience.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <Globe className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Jurisdiction Detection</h4>
                    <p className="text-gray-600">Automatic detection of user location and applicable privacy regulations.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                    <Zap className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Real-time Analytics</h4>
                    <p className="text-gray-600">Advanced analytics and insights to help you understand and optimize performance.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Platform Statistics</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-blue-400">99.9%</div>
                  <div className="text-gray-300 text-sm">Uptime</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">&lt;50KB</div>
                  <div className="text-gray-300 text-sm">Bundle Size</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400">Global</div>
                  <div className="text-gray-300 text-sm">CDN</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400">24/7</div>
                  <div className="text-gray-300 text-sm">Monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Recognition</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our innovative approach to privacy compliance has been recognized by industry leaders and organizations worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-200 rounded-xl">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Privacy Innovation Award</h3>
              <p className="text-gray-600 text-sm">
                Recognized for breakthrough innovation in privacy technology and user experience.
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">GDPR Compliance Excellence</h3>
              <p className="text-gray-600 text-sm">
                Certified for exceptional compliance standards and privacy protection measures.
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Technology Leader</h3>
              <p className="text-gray-600 text-sm">
                Leading the industry in AI-powered privacy solutions and intelligent optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join the Privacy Revolution
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Be part of the future of cookie consent management. Start earning revenue 
            from your privacy compliance today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

