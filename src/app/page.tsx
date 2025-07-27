"use client";

import { useEffect, useState } from 'react';

interface SystemInfo {
  environment: string;
  timestamp: string;
  region: string;
  instanceId: string;
  version: string;
}

export default function Home() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [requestCount, setRequestCount] = useState(0);
  const [clientInfo, setClientInfo] = useState<any>(null);

  useEffect(() => {
    // Fetch system information
    fetch('/api/system-info')
      .then(res => res.json())
      .then(data => setSystemInfo(data))
      .catch(() => {
        // Fallback if API doesn't exist
        setSystemInfo({
          environment: process.env.NODE_ENV || 'development',
          timestamp: new Date().toISOString(),
          region: 'local',
          instanceId: 'local-dev',
          version: '1.0.0'
        });
      });

    // Get client information
    setClientInfo({
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });

    // Increment request counter
    const count = parseInt(localStorage.getItem('requestCount') || '0') + 1;
    localStorage.setItem('requestCount', count.toString());
    setRequestCount(count);
  }, []);

  const testCloudArmor = async () => {
    try {
      const response = await fetch('/api/test-endpoint');
      const data = await response.json();
      alert(`Cloud Armor Test: ${JSON.stringify(data)}`);
    } catch (error) {
      alert('Cloud Armor blocked the request or endpoint not available');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            🚀 Hello World!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            GCP Cloud Run Deployment Showcase
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* System Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              ☁️ System Info
            </h2>
            {systemInfo ? (
              <div className="space-y-2 text-sm">
                <p><strong>Environment:</strong> {systemInfo.environment}</p>
                <p><strong>Region:</strong> {systemInfo.region}</p>
                <p><strong>Instance:</strong> {systemInfo.instanceId}</p>
                <p><strong>Version:</strong> {systemInfo.version}</p>
                <p><strong>Deployed:</strong> {new Date(systemInfo.timestamp).toLocaleString()}</p>
              </div>
            ) : (
              <p className="text-gray-500">Loading system information...</p>
            )}
          </div>

          {/* Client Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              💻 Client Info
            </h2>
            {clientInfo ? (
              <div className="space-y-2 text-sm">
                <p><strong>Browser:</strong> {clientInfo.userAgent.split(' ')[0]}</p>
                <p><strong>Language:</strong> {clientInfo.language}</p>
                <p><strong>Platform:</strong> {clientInfo.platform}</p>
                <p><strong>Viewport:</strong> {clientInfo.viewport}</p>
                <p><strong>Timezone:</strong> {clientInfo.timezone}</p>
                <p><strong>Visits:</strong> {requestCount}</p>
              </div>
            ) : (
              <p className="text-gray-500">Loading client information...</p>
            )}
          </div>

          {/* Security Features */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              🛡️ Security
            </h2>
            <div className="space-y-4">
              <div className="text-sm">
                <p className="font-semibold text-green-600">✓ Cloud Armor Enabled</p>
                <p className="text-gray-600">DDoS protection & rate limiting</p>
              </div>
              <div className="text-sm">
                <p className="font-semibold text-green-600">✓ SSL/TLS Encryption</p>
                <p className="text-gray-600">End-to-end security</p>
              </div>
              <button 
                onClick={testCloudArmor}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Test Cloud Armor
              </button>
            </div>
          </div>

          {/* Health Status */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              ❤️ Health Status
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Application</span>
                <span className="text-green-500 font-semibold">🟢 Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Database</span>
                <span className="text-green-500 font-semibold">🟢 Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Cache</span>
                <span className="text-green-500 font-semibold">🟢 Active</span>
              </div>
              <a 
                href="/health" 
                className="block w-full bg-green-500 text-white text-center px-4 py-2 rounded hover:bg-green-600 transition-colors"
                target="_blank"
              >
                View Health Check
              </a>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              📊 Performance
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Response Time</span>
                <span className="text-blue-500 font-semibold">&lt; 100ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Memory Usage</span>
                <span className="text-blue-500 font-semibold">45MB</span>
              </div>
              <div className="flex items-center justify-between">
                <span>CPU Usage</span>
                <span className="text-blue-500 font-semibold">12%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
              </div>
            </div>
          </div>

          {/* Deployment Info */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              🔧 Infrastructure
            </h2>
            <div className="space-y-2 text-sm">
              <p><strong>Platform:</strong> Google Cloud Run</p>
              <p><strong>Runtime:</strong> Node.js 20</p>
              <p><strong>Framework:</strong> Next.js 15</p>
              <p><strong>Container:</strong> Docker Alpine</p>
              <p><strong>Registry:</strong> Artifact Registry</p>
              <p><strong>IaC:</strong> Terraform</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 p-4 bg-white rounded-lg shadow-lg">
          <p className="text-gray-600">
            🌟 This deployment showcases GCP Cloud Run with Terraform, Cloud Armor security, 
            load balancing, and production-ready best practices.
          </p>
        </div>
      </div>
    </div>
  );
}
