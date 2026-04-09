import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

const prisma = new PrismaClient();

async function verifyRequestAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if (!token) return { success: false as const, error: '未登录', status: 401 };
  const payload = await verifyToken(token);
  if (!payload) return { success: false as const, error: '登录已失效', status: 401 };
  return { success: true as const, payload };
}

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyRequestAuth(request);
    if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    const { payload } = auth;
    if (payload.role !== Role.parent && payload.role !== Role.admin) {
      return NextResponse.json({ success: false, error: '仅限家长操作' }, { status: 403 });
    }

    const url = new URL(request.url);
    const deletedFlag = url.searchParams.get('deleted');
    const deletedFilter: any = (deletedFlag === 'all') ? {} : { isDeleted: deletedFlag === 'true' };
    const familyId = payload.role === Role.admin ? (url.searchParams.get('familyId') || payload.familyId) : payload.familyId;

    const children = await prisma.user.findMany({
      where: { familyId, role: Role.child, ...deletedFilter },
      select: { id: true, name: true, avatarUrl: true, isDeleted: true, createdAt: true },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ success: true, data: children });
  } catch (error: any) {
    console.error('查询孩子列表失败:', error);
    return NextResponse.json({ success: false, error: error.message || '服务异常' }, { status: 500 });
  }
}