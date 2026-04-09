import { NextRequest, NextResponse } from 'next/server';
import { Role, SourceType } from '@prisma/client';
import { earnPoints } from '@/server/services/points.service';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

async function verifyRequestAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if (!token) return { success: false as const, error: '未登录', status: 401 };
  const payload = await verifyToken(token);
  if (!payload) return { success: false as const, error: '登录已失效', status: 401 };
  return { success: true as const, payload };
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyRequestAuth(request);
    if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    const { payload } = auth;
    if (((payload.role !== Role.parent && payload.role !== Role.admin) && payload.role !== Role.admin)) return NextResponse.json({ success: false, error: '仅限家长操作' }, { status: 403 });

    const body = await request.json();
    const result = await earnPoints({
      childId: body.childId,
      amount: body.amount,
      sourceType: SourceType.manual,
      description: body.reason || '手动加分',
    });

    return NextResponse.json({ success: true, message: '已加分', data: { balance: result.balance, transaction: result.transaction } });
  } catch (error: any) {
    console.error('手动加分失败', error);
    return NextResponse.json({ success: false, error: error.message || '操作失败' }, { status: 500 });
  }
}
