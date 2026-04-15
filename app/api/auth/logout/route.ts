import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({}, { status: 200, headers: { 'Set-Cookie': 'token=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict' } });
}
