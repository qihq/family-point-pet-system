import { NextRequest, NextResponse } from 'next/server';
import { Role } from '@prisma/client';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';
import { getCosts, saveCosts } from '@/lib/pet-config';

async function ensureParent(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if (!token) return { ok: false as const, status: 401, error: '未登录' };
  const payload = await verifyToken(token);
  if (!payload) return { ok: false as const, status: 401, error: '登录已失效' };
  if (payload.role !== Role.parent && payload.role !== Role.admin) return { ok: false as const, status: 403, error: '仅限家长/管理员' };
  return { ok: true as const };
}

export async function GET() {
  const c = await getCosts();
  return NextResponse.json({ success: true, data: c });
}

export async function PUT(request: NextRequest) {
  const auth = await ensureParent(request);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  try {
    const body = await request.json();
    const costs = await saveCosts({ feed: body.feed, water: body.water, clean: body.clean, play: body.play });
    return NextResponse.json({ success: true, data: costs });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message || '保存失败' }, { status: 500 });
  }
}
