import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

const prisma = new PrismaClient();

async function ensureAdmin(request: NextRequest){
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if(!token) return { ok:false as const, status:401, error:'æœªç™»å½•' };
  const payload = await verifyToken(token);
  if(!payload) return { ok:false as const, status:401, error:'ç™»å½•å·²å¤±æ•ˆ' };
  if(String((payload as any).role||'').toLowerCase() !== 'admin') return { ok:false as const, status:403, error:'éœ€è¦ç®¡ç†å‘˜æƒé™' };
  return { ok:true as const, payload };
}

export async function GET(request: NextRequest){
  const auth = await ensureAdmin(request);
  if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
  const admin = await prisma.user.findUnique({ where:{ id: auth.payload.userId }, select:{ id:true, name:true, avatarUrl:true } });
  return NextResponse.json({ success:true, data: admin });
}

export async function PATCH(request: NextRequest){
  const auth = await ensureAdmin(request);
  if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
  const body = await request.json();
  const data:any = {};
  if(body.name!=null) data.name = String(body.name).trim();
  if(body.avatarUrl!=null) data.avatarUrl = String(body.avatarUrl);
  const updated = await prisma.user.update({ where:{ id: auth.payload.userId }, data });
  return NextResponse.json({ success:true, data:{ id:updated.id, name:updated.name, avatarUrl:updated.avatarUrl } });
}

export async function POST(request: NextRequest){
  // change password
  const auth = await ensureAdmin(request);
  if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
  const body = await request.json();
  const oldPassword = String(body.oldPassword||'');
  const newPassword = String(body.newPassword||'');
  if(!newPassword) return NextResponse.json({ success:false, error:'æ–°å¯†ç ä¸èƒ½ä¸ºç©º' }, { status:400 });
  const u = await prisma.user.findUnique({ where:{ id: auth.payload.userId } });
  if(!u) return NextResponse.json({ success:false, error:'ç”¨æˆ·ä¸å­˜åœ¨' }, { status:404 });
  if(u.password && u.password!==oldPassword) return NextResponse.json({ success:false, error:'æ—§å¯†ç ä¸æ­£ç¡®' }, { status:400 });
  await prisma.user.update({ where:{ id: u.id }, data:{ password:newPassword } });
  return NextResponse.json({ success:true });
}