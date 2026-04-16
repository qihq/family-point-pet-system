import { NextRequest, NextResponse } from 'next/server';

import { verifyToken, getTokenFromHeader } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest){
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if(!token) return NextResponse.json({ success:false, error:'未登录' }, { status:401 });
  const payload = await verifyToken(token);
  if(!payload) return NextResponse.json({ success:false, error:'登录已失效' }, { status:401 });
  if(String((payload as any).role||'').toLowerCase() !== 'admin') return NextResponse.json({ success:false, error:'需要管理员权限' }, { status:403 });

  const list = await prisma.family.findMany({ select:{ id:true, name:true }, orderBy:{ name:'asc' } });
  return NextResponse.json({ success:true, data:list });
}

// codex-ok: 2026-04-13T18:05:00+08:00