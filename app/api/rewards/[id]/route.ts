import { NextRequest, NextResponse } from 'next/server';
import { Role } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

async function ensureAuth(request: NextRequest){
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if (!token) return { ok: false as const, status: 401, error: '未登录' };
  const payload = await verifyToken(token);
  if (!payload) return { ok: false as const, status: 401, error: '登录已失效' };
  return { ok: true as const, payload };
}

export async function PUT(request: NextRequest, { params }:{ params:{ id:string } }){
  const auth = await ensureAuth(request);
  if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
  const { payload } = auth;
  if(payload.role !== Role.parent && payload.role !== Role.admin){
    return NextResponse.json({ success:false, error:'仅限家长或管理员操作' }, { status:403 });
  }
  const id = params.id;
  const body = await request.json();
  const data:any = {
    name: String(body.name||'').trim(),
    description: body.description ?? null,
    cost: Number(body.cost||0),
    stock: (body.stock===undefined || body.stock===null || body.stock==='')? null : Number(body.stock),
    enabled: body.enabled!==false,
  };
  if(!data.name || data.cost<=0) return NextResponse.json({ success:false, error:'名称或积分不合法' }, { status:400 });
  const updated = await prisma.rewardItem.update({ where:{ id }, data });
  return NextResponse.json({ success:true, data: updated });
}

export async function DELETE(request: NextRequest, { params }:{ params:{ id:string } }){
  const auth = await ensureAuth(request);
  if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
  const { payload } = auth;
  if(payload.role !== Role.parent && payload.role !== Role.admin){
    return NextResponse.json({ success:false, error:'仅限家长或管理员操作' }, { status:403 });
  }
  const id = params.id;
  await prisma.rewardItem.delete({ where:{ id } });
  return NextResponse.json({ success:true });
}