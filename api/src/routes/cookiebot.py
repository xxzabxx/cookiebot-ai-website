from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
import json
import random
import uuid

cookiebot_bp = Blueprint('cookiebot', __name__)

# Mock data storage (in production, this would be a database)
clients = {
    'demo-client-123': {
        'id': 'demo-client-123',
        'company_name': 'Demo Company',
        'logo_url': '',
        'primary_color': '#667eea',
        'banner_position': 'bottom',
        'enable_affiliate_ads': True,
        'auto_block': True,
        'consent_expiry': 365,
        'show_decline_button': True,
        'granular_consent': True,
        'created_at': '2025-01-01T00:00:00Z'
    }
}

websites = {
    'demo-client-123': [
        {
            'id': 1,
            'domain': 'example.com',
            'status': 'active',
            'visitors': 45230,
            'consent_rate': 82.1,
            'revenue': 1247.50,
            'last_scan': '2025-07-07T10:30:00Z'
        },
        {
            'id': 2,
            'domain': 'shop.example.com',
            'status': 'active',
            'visitors': 32100,
            'consent_rate': 76.8,
            'revenue': 892.30,
            'last_scan': '2025-07-07T09:15:00Z'
        },
        {
            'id': 3,
            'domain': 'blog.example.com',
            'status': 'warning',
            'visitors': 18900,
            'consent_rate': 71.2,
            'revenue': 456.80,
            'last_scan': '2025-07-06T14:20:00Z'
        }
    ]
}

# Mock affiliate ads database
affiliate_ads = [
    {
        'id': 'ad-001',
        'title': 'Privacy-First Analytics',
        'description': 'GDPR-compliant analytics platform',
        'image': 'https://via.placeholder.com/40x40/667eea/ffffff?text=PA',
        'url': 'https://example.com/privacy-analytics',
        'category': 'analytics',
        'cpc': 0.45
    },
    {
        'id': 'ad-002',
        'title': 'Secure Cloud Storage',
        'description': 'End-to-end encrypted file storage',
        'image': 'https://via.placeholder.com/40x40/10b981/ffffff?text=CS',
        'url': 'https://example.com/cloud-storage',
        'category': 'security',
        'cpc': 0.62
    },
    {
        'id': 'ad-003',
        'title': 'GDPR Compliance Tool',
        'description': 'Automated compliance management',
        'image': 'https://via.placeholder.com/40x40/f59e0b/ffffff?text=GC',
        'url': 'https://example.com/gdpr-tool',
        'category': 'compliance',
        'cpc': 0.78
    }
]

@cookiebot_bp.route('/analytics/<client_id>', methods=['GET'])
def get_analytics(client_id):
    """Get analytics data for a client"""
    if client_id not in clients:
        return jsonify({'error': 'Client not found'}), 404
    
    # Generate mock analytics data
    end_date = datetime.now()
    start_date = end_date - timedelta(days=7)
    
    daily_data = []
    for i in range(7):
        date = start_date + timedelta(days=i)
        daily_data.append({
            'date': date.strftime('%Y-%m-%d'),
            'consents': random.randint(1200, 1900),
            'revenue': round(random.uniform(40, 80), 2)
        })
    
    analytics = {
        'total_visitors': 125430,
        'consent_rate': 78.5,
        'affiliate_revenue': 2847.32,
        'active_websites': len(websites.get(client_id, [])),
        'daily_consents': daily_data,
        'consent_categories': [
            {'name': 'Necessary', 'value': 100, 'color': '#10b981'},
            {'name': 'Preferences', 'value': 65, 'color': '#3b82f6'},
            {'name': 'Statistics', 'value': 82, 'color': '#f59e0b'},
            {'name': 'Marketing', 'value': 45, 'color': '#ef4444'}
        ]
    }
    
    return jsonify(analytics)

@cookiebot_bp.route('/websites/<client_id>', methods=['GET'])
def get_websites(client_id):
    """Get websites for a client"""
    if client_id not in clients:
        return jsonify({'error': 'Client not found'}), 404
    
    return jsonify(websites.get(client_id, []))

@cookiebot_bp.route('/websites/<client_id>', methods=['POST'])
def add_website(client_id):
    """Add a new website for a client"""
    if client_id not in clients:
        return jsonify({'error': 'Client not found'}), 404
    
    data = request.get_json()
    if not data or 'domain' not in data:
        return jsonify({'error': 'Domain is required'}), 400
    
    if client_id not in websites:
        websites[client_id] = []
    
    new_website = {
        'id': len(websites[client_id]) + 1,
        'domain': data['domain'],
        'status': 'active',
        'visitors': 0,
        'consent_rate': 0,
        'revenue': 0,
        'last_scan': datetime.now().isoformat() + 'Z'
    }
    
    websites[client_id].append(new_website)
    return jsonify(new_website), 201

@cookiebot_bp.route('/config/<client_id>', methods=['GET'])
def get_config(client_id):
    """Get configuration for a client"""
    if client_id not in clients:
        return jsonify({'error': 'Client not found'}), 404
    
    return jsonify(clients[client_id])

@cookiebot_bp.route('/config/<client_id>', methods=['PUT'])
def update_config(client_id):
    """Update configuration for a client"""
    if client_id not in clients:
        return jsonify({'error': 'Client not found'}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    # Update configuration
    for key, value in data.items():
        if key in clients[client_id]:
            clients[client_id][key] = value
    
    return jsonify(clients[client_id])

@cookiebot_bp.route('/affiliate-ads', methods=['POST'])
def get_affiliate_ads():
    """Get contextual affiliate ads"""
    data = request.get_json()
    client_id = data.get('clientId')
    max_ads = data.get('maxAds', 2)
    context = data.get('context', {})
    
    if not client_id or client_id not in clients:
        return jsonify([])
    
    # Check if affiliate ads are enabled for this client
    if not clients[client_id].get('enable_affiliate_ads', False):
        return jsonify([])
    
    # Simple contextual matching (in production, this would be more sophisticated)
    selected_ads = random.sample(affiliate_ads, min(max_ads, len(affiliate_ads)))
    
    return jsonify(selected_ads)

@cookiebot_bp.route('/affiliate-click', methods=['POST'])
def track_affiliate_click():
    """Track affiliate ad clicks for revenue calculation"""
    data = request.get_json()
    client_id = data.get('clientId')
    ad_id = data.get('adId')
    
    if not client_id or not ad_id:
        return jsonify({'error': 'Missing required fields'}), 400
    
    if client_id not in clients:
        return jsonify({'error': 'Client not found'}), 404
    
    # Find the ad to get CPC
    ad = next((ad for ad in affiliate_ads if ad['id'] == ad_id), None)
    if not ad:
        return jsonify({'error': 'Ad not found'}), 404
    
    # Calculate revenue (60% goes to client, 40% to platform)
    revenue = ad['cpc'] * 0.6
    
    # In production, this would be stored in a database
    click_record = {
        'client_id': client_id,
        'ad_id': ad_id,
        'revenue': revenue,
        'timestamp': datetime.now().isoformat() + 'Z'
    }
    
    return jsonify({'success': True, 'revenue': revenue})

@cookiebot_bp.route('/cookie-scan', methods=['POST'])
def receive_cookie_scan():
    """Receive cookie scan data from client websites"""
    data = request.get_json()
    client_id = data.get('clientId')
    domain = data.get('domain')
    cookies = data.get('cookies', [])
    
    if not client_id or not domain:
        return jsonify({'error': 'Missing required fields'}), 400
    
    if client_id not in clients:
        return jsonify({'error': 'Client not found'}), 404
    
    # In production, this would be stored in a database for analysis
    scan_record = {
        'client_id': client_id,
        'domain': domain,
        'cookies': cookies,
        'timestamp': datetime.now().isoformat() + 'Z'
    }
    
    return jsonify({'success': True, 'cookies_detected': len(cookies)})

@cookiebot_bp.route('/consent-record', methods=['POST'])
def record_consent():
    """Record consent decisions from users"""
    data = request.get_json()
    client_id = data.get('clientId')
    domain = data.get('domain')
    consent = data.get('consent', {})
    
    if not client_id or not domain or not consent:
        return jsonify({'error': 'Missing required fields'}), 400
    
    if client_id not in clients:
        return jsonify({'error': 'Client not found'}), 404
    
    # In production, this would be stored in a database for compliance
    consent_record = {
        'client_id': client_id,
        'domain': domain,
        'consent': consent,
        'ip_hash': hash(request.remote_addr),  # Hashed for privacy
        'user_agent': request.headers.get('User-Agent'),
        'timestamp': datetime.now().isoformat() + 'Z'
    }
    
    return jsonify({'success': True})

@cookiebot_bp.route('/script/<client_id>', methods=['GET'])
def get_script(client_id):
    """Generate the JavaScript code for a client"""
    if client_id not in clients:
        return jsonify({'error': 'Client not found'}), 404
    
    config = clients[client_id]
    
    script_code = f"""<script src="https://cdn.cookiebot.ai/v1/cookiebot-ai.js" 
        data-cbid="{client_id}"
        data-company-name="{config['company_name']}"
        {f'data-logo-url="{config["logo_url"]}"' if config['logo_url'] else ''}
        data-enable-affiliate-ads="{str(config['enable_affiliate_ads']).lower()}"
        data-primary-color="{config['primary_color']}"
        data-banner-position="{config['banner_position']}"
        data-auto-block="{str(config['auto_block']).lower()}"
        data-consent-expiry="{config['consent_expiry']}"
        data-show-decline="{str(config['show_decline_button']).lower()}"
        data-granular-consent="{str(config['granular_consent']).lower()}">
</script>"""
    
    return jsonify({'script': script_code})

@cookiebot_bp.route('/revenue/<client_id>', methods=['GET'])
def get_revenue_data(client_id):
    """Get detailed revenue analytics for a client"""
    if client_id not in clients:
        return jsonify({'error': 'Client not found'}), 404
    
    # Generate mock revenue data
    end_date = datetime.now()
    start_date = end_date - timedelta(days=30)
    
    daily_revenue = []
    total_revenue = 0
    
    for i in range(30):
        date = start_date + timedelta(days=i)
        revenue = round(random.uniform(20, 100), 2)
        total_revenue += revenue
        daily_revenue.append({
            'date': date.strftime('%Y-%m-%d'),
            'revenue': revenue,
            'clicks': random.randint(50, 200)
        })
    
    revenue_data = {
        'total_revenue': round(total_revenue, 2),
        'revenue_share': 0.6,
        'next_payout': (datetime.now() + timedelta(days=25)).strftime('%Y-%m-%d'),
        'daily_revenue': daily_revenue,
        'top_performing_ads': [
            {'title': 'Privacy-First Analytics', 'revenue': 456.78, 'clicks': 1024},
            {'title': 'Secure Cloud Storage', 'revenue': 389.45, 'clicks': 892},
            {'title': 'GDPR Compliance Tool', 'revenue': 234.56, 'clicks': 567}
        ]
    }
    
    return jsonify(revenue_data)

@cookiebot_bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat() + 'Z',
        'version': '1.0.0'
    })

# CORS support
@cookiebot_bp.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

