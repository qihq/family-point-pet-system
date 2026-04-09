import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

const prisma = new PrismaClient();

async function ensureAdmin(request: NextRequest){
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if(!token) return { ok:false as const, status:401, error:'未登录' };
  const payload = await verifyToken(token);
  if(!payload) return { ok:false as const, status:401, error:'登录已失效' };
  if(String((payload as any).role||'').toLowerCase() !== 'admin') return { ok:false as const, status:403, error:'需要管理员权限' };
  return { ok:true as const, payload };
}

export async function GET(request: NextRequest){
  try{
    const auth = await ensureAdmin(request);
    if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get('q')||'').trim();
    const list = await prisma.user.findMany({
      where:{ role: Role.parent, name: q? { contains:q, mode:'insensitive' } : undefined },
      orderBy:{ createdAt:'desc' },
      select:{ id:true, name:true, familyId:true, avatarUrl:true, createdAt:true }
    });
    return NextResponse.json({ success:true, data:list });
  } catch(e:any){
    return NextResponse.json({ success:false, error: e?.message || '服务器异常' }, { status:500 });
  }
}

export async function POST(request: NextRequest){
  try{
    const auth = await ensureAdmin(request);
    if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
    const body = await request.json().catch(()=> ({}));
    const name = String(body.name||'').trim();
    const password = String(body.password||'');
    let familyId = String(body.familyId||'').trim();
    if(!name || !password) return NextResponse.json({ success:false, error:'name/password 必填' }, { status:400 });
    if(!familyId){
      const def = await prisma.family.upsert({ where:{ id:'default-family-id' }, update:{}, create:{ id:'default-family-id', name:'默认家庭' } });
      familyId = def.id;
    }
    const dup = await prisma.user.findFirst({ where:{ name: { equals:name, mode:'insensitive' } } });
    if(dup) return NextResponse.json({ success:false, error:'用户名已存在' }, { status:409 });

    const created = await prisma.user.create({ data:{ name, password, role: Role.parent, familyId } });
    return NextResponse.json({ success:true, data: { id: created.id, name: created.name, familyId: created.familyId } });
  } catch(e:any){
    return NextResponse.json({ success:false, error: e?.message || '服务器异常' }, { status:500 });
  }
}
