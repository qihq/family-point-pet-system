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

// 获取单个家长
export async function GET(request: NextRequest, { params }: { params: { id:string } }){
  try{
    const auth = await ensureAdmin(request);
    if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
    const id = params.id;
    const user = await prisma.user.findFirst({ where:{ id, role: Role.parent }, select:{ id:true, name:true, familyId:true, createdAt:true } });
    if(!user) return NextResponse.json({ success:false, error:'家长不存在' }, { status:404 });
    return NextResponse.json({ success:true, data:user });
  } catch(e:any){
    return NextResponse.json({ success:false, error: e?.message || '服务器异常' }, { status:500 });
  }
}

// 更新家长
export async function PATCH(request: NextRequest, { params }: { params: { id:string } }){
  try{
    const auth = await ensureAdmin(request);
    if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
    const id = params.id;
    const body = await request.json().catch(()=> ({}));
    const name = body.name!=null? String(body.name).trim(): undefined;
    const password = body.password!=null? String(body.password).trim(): undefined;

    const existing = await prisma.user.findFirst({ where:{ id, role: Role.parent }, select:{ id:true, name:true } });
    if(!existing) return NextResponse.json({ success:false, error:'家长不存在' }, { status:404 });

    if(name){
      const dup = await prisma.user.findFirst({ where:{ id: { not:id }, name: { equals:name, mode:'insensitive' } } });
      if(dup) return NextResponse.json({ success:false, error:'用户名已存在' }, { status:409 });
    }

    const updated = await prisma.user.update({ where:{ id }, data:{ name: name ?? undefined, password: password ?? undefined } });
    return NextResponse.json({ success:true, data:{ id: updated.id, name: updated.name } });
  } catch(e:any){
    return NextResponse.json({ success:false, error: e?.message || '服务器异常' }, { status:500 });
  }
}

// 删除家长
export async function DELETE(request: NextRequest, { params }: { params: { id:string } }){
  try{
    const auth = await ensureAdmin(request);
    if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
    const id = params.id;
    const existing = await prisma.user.findFirst({ where:{ id, role: Role.parent }, select:{ id:true } });
    if(!existing) return NextResponse.json({ success:false, error:'家长不存在' }, { status:404 });
    await prisma.user.delete({ where:{ id } });
    return NextResponse.json({ success:true });
  } catch(e:any){
    return NextResponse.json({ success:false, error: e?.message || '服务器异常' }, { status:500 });
  }
}
