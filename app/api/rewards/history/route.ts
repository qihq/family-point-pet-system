import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

const prisma = new PrismaClient();

async function ensureAuth(request: NextRequest){
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if (!token) return { ok: false as const, status: 401, error: '未登录' };
  const payload = await verifyToken(token);
  if (!payload) return { ok: false as const, status: 401, error: '登录已失效' };
  return { ok: true as const, payload };
}

export async function GET(request: NextRequest){
  const auth = await ensureAuth(request);
  if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
  const { payload } = auth;
  const url = new URL(request.url);
  let childId = url.searchParams.get('childId') || undefined;
  if(payload.role === Role.child) childId = payload.userId;
  if(!childId) return NextResponse.json({ success:false, error:'缺少 childId' }, { status:400 });

  // 访问控制：家长限本家庭；管理员放行
  if(payload.role === Role.parent){
    const child = await prisma.user.findUnique({ where:{ id: childId }, select:{ familyId:true } });
    if(!child || child.familyId !== payload.familyId){
      return NextResponse.json({ success:false, error:'越权访问' }, { status:403 });
    }
  }

  const logs = await prisma.redeemLog.findMany({
    where:{ childId },
    orderBy:{ createdAt:'desc' },
    include:{ rewardItem:{ select:{ name:true } } }
  });
  const rows = logs.map(l=>({ id:l.id, createdAt:l.createdAt, quantity:l.quantity, pointsSpent:l.pointsSpent, rewardName:l.rewardItem?.name||'', note:l.note||null }));
  return NextResponse.json({ success:true, data: rows });
}