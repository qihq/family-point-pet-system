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

export async function PATCH(request: NextRequest, { params }:{ params:{ id:string } }){
  const auth = await ensureAuth(request);
  if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
  const { payload } = auth;
  if(payload.role !== Role.parent && payload.role !== Role.admin){
    return NextResponse.json({ success:false, error:'仅限家长或管理员操作' }, { status:403 });
  }
  const id = params.id;
  const item = await prisma.rewardItem.findUnique({ where:{ id } });
  if(!item) return NextResponse.json({ success:false, error:'奖品不存在' }, { status:404 });
  const updated = await prisma.rewardItem.update({ where:{ id }, data:{ enabled: !item.enabled } });
  return NextResponse.json({ success:true, data: updated });
}