import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import { access, readdir } from 'fs/promises';
import { join } from 'path';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

const prisma = new PrismaClient();

async function ensureAuth(request: NextRequest){
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if (!token) return { ok: false as const, status: 401, error: 'unauthenticated' };
  const payload = await verifyToken(token);
  if (!payload) return { ok: false as const, status: 401, error: 'session_expired' };
  return { ok: true as const, payload };
}

export async function GET(request: NextRequest){
  const auth = await ensureAuth(request);
  if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
  const { payload } = auth;
  const items = await prisma.rewardItem.findMany({ where:{ familyId: payload.familyId, ...(((payload.role === Role.parent || payload.role === Role.admin) || payload.role === Role.admin)? {} : { enabled: true }) }, orderBy:{ createdAt:'desc' } });
  const base = join(process.cwd(), 'public', 'uploads', 'rewards');
  async function exists(p: string){ try{ await access(p); return true; } catch{ return false; } }
  const withImg: any[] = [];
  for(const it of items as any[]){
    let imageUrl: string | null = (it as any).imageUrl || null;
    if(!imageUrl){
      const png = join(base, `${it.id}.png`);
      const jpg = join(base, `${it.id}.jpg`);
      if(await exists(png)) imageUrl = `/uploads/rewards/${it.id}.png`;
      else if(await exists(jpg)) imageUrl = `/uploads/rewards/${it.id}.jpg`;
      else {
        try{
          const files = await readdir(base);
          const found = files.find(f => f.startsWith(`${it.id}-`) && (f.endsWith('.png') || f.endsWith('.jpg')));
          if(found) imageUrl = `/uploads/rewards/${found}`;
        }catch{}
      }
    }
    withImg.push({ ...it, imageUrl });
  }
  return NextResponse.json({ success:true, data: withImg });
}

export async function POST(request: NextRequest){
  const auth = await ensureAuth(request);
  if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
  const { payload } = auth; if(((payload.role !== Role.parent && payload.role !== Role.admin) && payload.role !== Role.admin)) return NextResponse.json({ success:false, error:'forbidden' }, { status:403 });
  const body = await request.json();
  const data:any = {
    familyId: payload.familyId,
    name: String(body.name||'').trim(),
    description: body.description ?? null,
    cost: Number(body.cost||0),
    stock: (body.stock===undefined || body.stock===null || body.stock==='')? null : Number(body.stock),
    enabled: body.enabled!==false,
  };
  if(!data.name || data.cost<=0) return NextResponse.json({ success:false, error:'invalid_name_or_cost' }, { status:400 });
  const created = await prisma.rewardItem.create({ data: (data as any) });
  return NextResponse.json({ success:true, data: created });
}