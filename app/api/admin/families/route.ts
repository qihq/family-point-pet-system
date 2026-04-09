import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest){
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if(!token) return NextResponse.json({ success:false, error:'æœªç™»å½•' }, { status:401 });
  const payload = await verifyToken(token);
  if(!payload) return NextResponse.json({ success:false, error:'ç™»å½•å·²å¤±æ•ˆ' }, { status:401 });
  if(String((payload as any).role||'').toLowerCase() !== 'admin') return NextResponse.json({ success:false, error:'éœ€è¦ç®¡ç†å‘˜æƒé™' }, { status:403 });

  const list = await prisma.family.findMany({ select:{ id:true, name:true }, orderBy:{ name:'asc' } });
  return NextResponse.json({ success:true, data:list });
}