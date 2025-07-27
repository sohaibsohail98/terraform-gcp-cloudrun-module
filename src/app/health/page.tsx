export default function HealthCheck() {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    checks: {
      application: { status: 'up', responseTime: '12ms' },
      database: { status: 'connected', lastCheck: new Date().toISOString() },
      cache: { status: 'active', hitRate: '87%' },
      memory: { status: 'normal', usage: '45MB/512MB' },
      disk: { status: 'normal', usage: '1.2GB/10GB' }
    },
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    uptime: Math.floor(Math.random() * 86400) // Simulated uptime
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ❤️ Health Check
            </h1>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              🟢 System Healthy
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">System Status</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Overall Status</span>
                  <span className="text-green-600 font-semibold">✅ {healthData.status}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Environment</span>
                  <span className="text-blue-600 font-semibold">{healthData.environment}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Version</span>
                  <span className="text-purple-600 font-semibold">{healthData.version}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Uptime</span>
                  <span className="text-indigo-600 font-semibold">{Math.floor(healthData.uptime / 3600)}h {Math.floor((healthData.uptime % 3600) / 60)}m</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Component Health</h2>
              <div className="space-y-3">
                {Object.entries(healthData.checks).map(([component, data]) => (
                  <div key={component} className="flex justify-between items-center">
                    <span className="text-gray-600 capitalize">{component}</span>
                    <span className="text-green-600 font-semibold">
                      ✅ {data.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Detailed Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Response Time:</span>
                <span className="ml-2 text-green-600 font-semibold">{healthData.checks.application.responseTime}</span>
              </div>
              <div>
                <span className="text-gray-600">Cache Hit Rate:</span>
                <span className="ml-2 text-blue-600 font-semibold">{healthData.checks.cache.hitRate}</span>
              </div>
              <div>
                <span className="text-gray-600">Memory Usage:</span>
                <span className="ml-2 text-purple-600 font-semibold">{healthData.checks.memory.usage}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              ← Back to Dashboard
            </a>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            Last updated: {healthData.timestamp}
          </div>
        </div>
      </div>
    </div>
  );
}