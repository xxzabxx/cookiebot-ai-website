import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Clock,
  ExternalLink,
  Cookie,
  Eye,
  RefreshCw
} from 'lucide-react';
import { api } from '../../lib/api';

const ComplianceTab = () => {
  const [scanUrl, setScanUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [currentScan, setCurrentScan] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock scan history for demonstration
    setScanHistory([
      {
        id: '1',
        url: 'https://example.com',
        status: 'completed',
        compliance_score: 85,
        cookies_found: 12,
        scripts_found: 8,
        created_at: '2025-01-19T10:30:00Z',
        completed_at: '2025-01-19T10:33:30Z'
      },
      {
        id: '2',
        url: 'https://shop.example.com',
        status: 'completed',
        compliance_score: 72,
        cookies_found: 18,
        scripts_found: 15,
        created_at: '2025-01-18T14:20:00Z',
        completed_at: '2025-01-18T14:25:10Z'
      }
    ]);
  }, []);

  const handleStartScan = async (e) => {
    e.preventDefault();
    if (!scanUrl.trim()) return;

    try {
      setScanning(true);
      setError(null);
      
      const response = await api.startComplianceScan(scanUrl);
      setCurrentScan({
        id: response.data.scan_id,
        url: scanUrl,
        status: 'running',
        progress: 0
      });
      
      // Poll for scan results
      pollScanStatus(response.data.scan_id);
      
    } catch (err) {
      setError(err.message);
      setScanning(false);
      
      // Mock scan for demonstration
      const mockScanId = Date.now().toString();
      setCurrentScan({
        id: mockScanId,
        url: scanUrl,
        status: 'running',
        progress: 0
      });
      
      // Simulate scan progress
      simulateScanProgress(mockScanId);
    }
  };

  const simulateScanProgress = (scanId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Complete the scan with mock results
        setTimeout(() => {
          const completedScan = {
            id: scanId,
            url: scanUrl,
            status: 'completed',
            compliance_score: Math.floor(Math.random() * 30) + 70,
            cookies_found: Math.floor(Math.random() * 20) + 5,
            scripts_found: Math.floor(Math.random() * 15) + 3,
            created_at: new Date().toISOString(),
            completed_at: new Date().toISOString(),
            results: {
              cookies: [
                {
                  name: '_ga',
                  domain: '.example.com',
                  category: 'statistics',
                  service: 'google-analytics',
                  purpose: 'Google Analytics tracking',
                  consent_required: true
                },
                {
                  name: '_fbp',
                  domain: '.example.com',
                  category: 'marketing',
                  service: 'facebook-pixel',
                  purpose: 'Facebook advertising',
                  consent_required: true
                }
              ],
              tracking_services: [
                {
                  service_id: 'google-analytics',
                  name: 'Google Analytics',
                  category: 'statistics',
                  privacy_policy: 'https://policies.google.com/privacy'
                }
              ],
              recommendations: [
                'Implement cookie consent banner for non-essential cookies',
                'Update privacy policy to include Google Analytics usage',
                'Consider implementing cookie categorization'
              ]
            }
          };
          
          setCurrentScan(completedScan);
          setScanHistory([completedScan, ...scanHistory]);
          setScanning(false);
          setScanUrl('');
        }, 1000);
      } else {
        setCurrentScan(prev => ({ ...prev, progress }));
      }
    }, 500);
  };

  const pollScanStatus = async (scanId) => {
    try {
      const response = await api.getComplianceScan(scanId);
      const scanData = response.data;
      
      setCurrentScan(scanData);
      
      if (scanData.status === 'completed') {
        setScanning(false);
        setScanHistory([scanData, ...scanHistory]);
        setScanUrl('');
      } else if (scanData.status === 'running') {
        setTimeout(() => pollScanStatus(scanId), 2000);
      } else {
        setScanning(false);
        setError('Scan failed');
      }
    } catch (err) {
      setScanning(false);
      setError(err.message);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score) => {
    if (score >= 80) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    if (score >= 60) return <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>;
    return <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>;
  };

  const ScanResultCard = ({ scan }) => (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center">
              <Shield className="w-5 h-5 mr-2 text-blue-600" />
              {new URL(scan.url).hostname}
            </CardTitle>
            <CardDescription>
              Scanned on {new Date(scan.created_at).toLocaleDateString()}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getScoreColor(scan.compliance_score)}`}>
              {scan.compliance_score}%
            </div>
            {getScoreBadge(scan.compliance_score)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-xl font-semibold text-gray-900">{scan.cookies_found}</div>
            <div className="text-sm text-gray-500 flex items-center justify-center">
              <Cookie className="w-4 h-4 mr-1" />
              Cookies Found
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl font-semibold text-gray-900">{scan.scripts_found}</div>
            <div className="text-sm text-gray-500 flex items-center justify-center">
              <Eye className="w-4 h-4 mr-1" />
              Scripts Found
            </div>
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full">
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </CardContent>
    </Card>
  );

  const ScanProgress = ({ scan }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
          Scanning {new URL(scan.url).hostname}
        </CardTitle>
        <CardDescription>
          Analyzing cookies, scripts, and compliance status...
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={scan.progress} className="w-full" />
          <div className="text-center text-sm text-gray-600">
            {Math.round(scan.progress)}% complete
          </div>
          <div className="text-xs text-gray-500 space-y-1">
            <div>✓ Loading website</div>
            <div>✓ Detecting cookies</div>
            <div className={scan.progress > 60 ? '' : 'text-gray-400'}>
              {scan.progress > 60 ? '✓' : '○'} Analyzing tracking scripts
            </div>
            <div className={scan.progress > 80 ? '' : 'text-gray-400'}>
              {scan.progress > 80 ? '✓' : '○'} Generating compliance report
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Scan Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Start Compliance Scan
          </CardTitle>
          <CardDescription>
            Analyze any website for GDPR, CCPA, and LGPD compliance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleStartScan} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="scan-url">Website URL</Label>
              <Input
                id="scan-url"
                type="url"
                placeholder="https://example.com"
                value={scanUrl}
                onChange={(e) => setScanUrl(e.target.value)}
                disabled={scanning}
                required
              />
            </div>
            
            <Button type="submit" disabled={scanning || !scanUrl.trim()}>
              {scanning ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Start Scan
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Current Scan Progress */}
      {currentScan && currentScan.status === 'running' && (
        <ScanProgress scan={currentScan} />
      )}

      {/* Completed Current Scan */}
      {currentScan && currentScan.status === 'completed' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Latest Scan Results</h3>
          <ScanResultCard scan={currentScan} />
        </div>
      )}

      {/* Scan History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Scan History</h3>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {scanHistory.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scanHistory.map((scan) => (
              <ScanResultCard key={scan.id} scan={scan} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No scans yet</h3>
              <p className="text-gray-500 mb-4">
                Start your first compliance scan to analyze cookie usage and privacy compliance.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Compliance Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
            Compliance Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">GDPR Compliance</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Obtain explicit consent for non-essential cookies</li>
                <li>• Provide clear cookie categorization</li>
                <li>• Allow users to withdraw consent easily</li>
                <li>• Maintain detailed privacy policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">CCPA Compliance</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Provide "Do Not Sell" option</li>
                <li>• Disclose data collection practices</li>
                <li>• Honor user deletion requests</li>
                <li>• Implement opt-out mechanisms</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceTab;

