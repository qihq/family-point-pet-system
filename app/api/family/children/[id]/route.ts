import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';
import { promises as fs } from 'node:fs';
import { join, extname } from 'node:path';

const prisma = new PrismaClient();

async function ensureParentOrAdmin(request: NextRequest){
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if (!token) return { ok:false as const, status:401, error:'未登录' };
  const payload = await verifyToken(token);
  if (!payload) return { ok:false as const, status:401, error:'登录已失效' };
  if(String((payload as any).role||'')==='child') return { ok:false as const, status:403, error:'仅限家长或管理员' };
  return { ok:true as const, payload };
}

export async function GET(request: NextRequest, { params }:{ params:{ id:string } }){
  const auth = await ensureParentOrAdmin(request);
  if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
  const id = params.id;
  const u = await prisma.user.findFirst({ where:{ id, role: 'child' as any }, select:{ id:true, name:true, pin:true, avatarUrl:true, familyId:true } });
  if(!u) return NextResponse.json({ success:false, error:'孩子不存在' }, { status:404 });
  return NextResponse.json({ success:true, data:u });
}

export async function PATCH(request: NextRequest, { params }:{ params:{ id:string } }){
  try{
    const auth = await ensureParentOrAdmin(request);
    if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
    const id = params.id;
    const existing = await prisma.user.findFirst({ where:{ id, role: 'child' as any }, select:{ id:true, familyId:true } });
    if(!existing) return NextResponse.json({ success:false, error:'孩子不存在' }, { status:404 });

    const ct = request.headers.get('content-type')||'';
    let name: string|undefined, pin: string|undefined, avatarFile: File|null = null;
    if(ct.includes('multipart/form-data')){
      const form = await request.formData();
      name = form.get('name')? String(form.get('name')): undefined;
      pin = form.get('pin')? String(form.get('pin')): undefined;
      avatarFile = (form.get('avatar') as File) || null;
    }else{
      const body = await request.json().catch(()=>({}));
      name = body.name!=null? String(body.name): undefined;
      pin = body.pin!=null? String(body.pin): undefined;
    }

    const data:any = {};
    if(name!==undefined) data.name = name.trim();
    if(pin!==undefined) data.pin = pin.trim();

    if(avatarFile){
      const buf = Buffer.from(await avatarFile.arrayBuffer());
      const ext = (extname(avatarFile.name)||'.png').toLowerCase();
      const dir = join(process.cwd(), 'public', 'uploads', 'avatars');
      await fs.mkdir(dir, { recursive: true });
      const filename = `${id}${ext}`;
      await fs.writeFile(join(dir, filename), buf);
      data.avatarUrl = `/uploads/avatars/${filename}`;
    }

    const updated = await prisma.user.update({ where:{ id }, data });
    return NextResponse.json({ success:true, data:{ id: updated.id, name: updated.name, pin: updated.pin, avatarUrl: updated.avatarUrl } });
  } catch (e:any){
    return NextResponse.json({ success:false, error: e?.message || '更新失败' }, { status:500 });
  }
}

export async function PUT(request: NextRequest, ctx: { params: { id: string } }){
  try{
    const auth = await ensureParentOrAdmin(request);
    if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
    const id = ctx.params.id;
    const existing = await prisma.user.findFirst({ where:{ id, role: 'child' as any }, select:{ id:true, familyId:true } });
    if(!existing) return NextResponse.json({ success:false, error:'孩子不存在' }, { status:404 });

    const ct = request.headers.get('content-type')||'';
    let name: string|undefined, pin: string|undefined, avatarFile: File|null = null, avatarBase64: string|undefined;
    if(ct.includes('multipart/form-data')){
      const form = await request.formData();
      name = form.get('name')? String(form.get('name')): undefined;
      pin = form.get('pin')? String(form.get('pin')): undefined;
      avatarFile = (form.get('avatar') as File) || null;
      avatarBase64 = form.get('avatarBase64')? String(form.get('avatarBase64')): undefined;
    }else{
      const body = await request.json().catch(()=>({}));
      name = body.name!=null? String(body.name): undefined;
      pin = body.pin!=null? String(body.pin): undefined;
      avatarBase64 = body.avatarBase64!=null? String(body.avatarBase64): undefined;
    }

    const data:any = {};
    if(name!==undefined) data.name = name.trim();
    if(pin!==undefined) data.pin = pin.trim();

    if(avatarFile || avatarBase64){
      let buf: Buffer;
      let ext = '.png';
      if(avatarFile){
        buf = Buffer.from(await avatarFile.arrayBuffer());
        ext = (extname(avatarFile.name)||'.png').toLowerCase();
      } else {
        const m = avatarBase64!.match(/^data:(.*?);base64,(.*)$/);
        const mime = m? (m[1]||'') : '';
        const b64 = m? m[2] : avatarBase64!;
        if(mime.includes('jpeg') || mime.includes('jpg')) ext = '.jpg';
        else if(mime.includes('png')) ext = '.png';
        buf = Buffer.from(b64, 'base64');
      }
      const dir = join(process.cwd(), 'public', 'uploads', 'avatars');
      await fs.mkdir(dir, { recursive: true });
      const filename = `${id}${ext}`;
      await fs.writeFile(join(dir, filename), buf);
      data.avatarUrl = `/uploads/avatars/${filename}`;
    }

    const updated = await prisma.user.update({ where:{ id }, data });
    return NextResponse.json({ success:true, data:{ id: updated.id, name: updated.name, pin: updated.pin, avatarUrl: updated.avatarUrl } });
  } catch (e:any){
    return NextResponse.json({ success:false, error: e?.message || '更新失败' }, { status:500 });
  }
}
