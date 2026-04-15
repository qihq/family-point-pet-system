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
export async function POST(request: NextRequest) {
  try {
    const auth = await verifyRequestAuth(request);
    if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    const { payload } = auth;
    if (payload.role !== Role.parent && payload.role !== Role.admin) {
      return NextResponse.json({ success: false, error: '仅限家长操作' }, { status: 403 });
    }
    const body = await request.json().catch(()=>({}));
    const name = String(body.name||'').trim();
    const pin  = body.pin? String(body.pin).trim() : null;
    if(!name) return NextResponse.json({ success:false, error:'姓名必填' }, { status:400 });

    // 家庭归属
    const familyId = payload.familyId;

    // 唯一名检查
    const exists = await prisma.user.findFirst({ where:{ name: { equals: name, mode:'insensitive' } } });
    if(exists) return NextResponse.json({ success:false, error:'该名字已存在，请更换' }, { status:409 });

    const created = await prisma.$transaction(async (tx)=>{
      const child = await tx.user.create({ data: { name, role: Role.child, pin, familyId } });
      await tx.pointAccount.create({ data: { childId: child.id, balance: 0, totalEarned: 0, totalSpent: 0 } as any });
      await tx.pet.create({ data: { childId: child.id, name: '小宠', stage: 'baby' as any } });
      return child;
    });

    return NextResponse.json({ success:true, data: { id: created.id, name: created.name } });
  } catch (e:any) {
    return NextResponse.json({ success:false, error: e?.message || '创建失败' }, { status:500 });
  }
}
