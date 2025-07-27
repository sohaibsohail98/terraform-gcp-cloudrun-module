import { NextResponse } from 'next/server';

export async function GET() {
  const systemInfo = {
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    region: process.env.GOOGLE_CLOUD_REGION || 'local',
    instanceId: process.env.CLOUD_RUN_INSTANCE_ID || 'local-dev',
    version: process.env.npm_package_version || '1.0.0',
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    deployment: {
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'local-project',
      service: process.env.K_SERVICE || 'hello-world-app',
      revision: process.env.K_REVISION || 'local-revision'
    }
  };

  return NextResponse.json(systemInfo);
}