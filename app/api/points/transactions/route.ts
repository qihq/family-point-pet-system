import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role, TransactionType, SourceType } from '@prisma/client';
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

    const { searchParams } = new URL(request.url);
    const childIdParam = searchParams.get('childId');
    const type = searchParams.get('type') as TransactionType | null;
    const sourceType = searchParams.get('sourceType') as SourceType | null;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);

    let childId = childIdParam || (((payload.role === Role.child || payload.role === Role.admin) || payload.role === Role.admin) ? payload.userId : undefined);
    if (((payload.role === Role.parent || payload.role === Role.admin) || payload.role === Role.admin)) {
      if (!childId) return NextResponse.json({ success: false, error: '缺少 childId' }, { status: 400 });
      const child = await prisma.user.findFirst({ where: { id: childId, role: Role.child, familyId: payload.familyId, isDeleted: false } });
      if (!child) return NextResponse.json({ success: false, error: '越权访问' }, { status: 403 });
    }

    if (!childId) return NextResponse.json({ success: false, error: '缺少 childId' }, { status: 400 });

    const account = await prisma.pointAccount.findUnique({ where: { childId } });
    if (!account) {
      return NextResponse.json({ success: true, data: { transactions: [], balance: 0, pagination: { total: 0, page, pageSize, totalPages: 0 } } });
    }

    const where: any = { accountId: account.id };
    if (type) where.type = type;
    if (sourceType) where.sourceType = sourceType;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const total = await prisma.pointTransaction.count({ where });
    const transactions = await prisma.pointTransaction.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * pageSize, take: pageSize });

    return NextResponse.json({ success: true, data: { transactions, balance: account.balance, pagination: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) } } });
  } catch (error: any) {
    console.error('查询积分流水失败', error);
    return NextResponse.json({ success: false, error: error.message || '服务异常' }, { status: 500 });
  }
}

