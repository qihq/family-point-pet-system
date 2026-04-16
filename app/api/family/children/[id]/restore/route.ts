import { NextRequest, NextResponse } from "next/server";
import { Role } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getTokenFromHeader, verifyToken } from "@/lib/auth";

async function ensureParent(request: NextRequest){
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if(!token) return { ok:false as const, status:401, error:'未登录' };
  const payload = await verifyToken(token);
  if(!payload) return { ok:false as const, status:401, error:'登录已失效' };
  if(String((payload as any).role||'')!=='parent' && String((payload as any).role||'')!=='admin') return { ok:false as const, status:403, error:'仅限家长/管理员' };
  return { ok:true as const, payload };
}

export async function POST(request: NextRequest, { params }:{ params:{ id:string } }){
  const auth = await ensureParent(request);
  if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
  const row = await prisma.user.findUnique({ where:{ id: params.id } });
  if(!row || row.role !== Role.child) return NextResponse.json({ success:false, error:'孩子不存在' }, { status:404 });
  await prisma.user.update({ where:{ id: row.id }, data:{ isDeleted:false, deletedAt: null } });
  return NextResponse.json({ success:true });
}
