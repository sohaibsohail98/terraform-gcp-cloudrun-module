import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Cloud Armor test endpoint working',
    timestamp: new Date().toISOString(),
    status: 'success',
    rateLimit: {
      applied: true,
      threshold: 50,
      window: '60 seconds'
    }
  });
}

export async function POST() {
  return NextResponse.json({
    message: 'POST request processed successfully',
    timestamp: new Date().toISOString(),
    cloudArmor: 'Active protection'
  });
}