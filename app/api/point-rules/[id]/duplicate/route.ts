export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import { Role } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { duplicatePointRule } from '@/server/services/point-rule.service';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

async function verifyRequestAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if (!token) return { success: false as const, error: '未登录', status: 401 };
  const payload = await verifyToken(token);
  if (!payload) return { success: false as const, error: '登录已失效', status: 401 };
  return { success: true as const, payload };
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await verifyRequestAuth(request);
    if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    const { payload } = auth as { success: true; payload: any };
    if (payload.role !== Role.parent && payload.role !== Role.admin) return NextResponse.json({ success: false, error: '仅限家长操作' }, { status: 403 });

    const id = params.id;
    // 校验归属
    const exists = await prisma.pointRule.findFirst({ where: { id, familyId: payload.familyId }, select: { id: true } });
    if (!exists) return NextResponse.json({ success: false, error: '规则不存在或无权限' }, { status: 404 });

    const newRule = await duplicatePointRule(id, payload.familyId);
    return NextResponse.json({ success: true, data: newRule });
  } catch (error: any) {
    console.error('复制规则失败:', error);
    return NextResponse.json({ success: false, error: error.message || '复制失败' }, { status: 400 });
  }
}
