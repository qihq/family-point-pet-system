import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';
import { writeFile } from 'fs/promises';
import { join, extname } from 'path';

const prisma = new PrismaClient();

function filename(id:string, ext:string){ return `/uploads/avatars/${id}${ext}`; }

export async function POST(request: NextRequest){
  try{
    const authHeader = request.headers.get('authorization');
    const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
    if(!token) return NextResponse.json({ success:false, error:'未登录' }, { status:401 });
    const payload = await verifyToken(token); if(!payload) return NextResponse.json({ success:false, error:'登录已失效' }, { status:401 });
    if(payload.role !== Role.admin) return NextResponse.json({ success:false, error:'需要管理员权限' }, { status:403 });

    const form = await request.formData();
    const file = form.get('file') as File | null;
    if(!file) return NextResponse.json({ success:false, error:'缺少文件' }, { status:400 });
    const arrBuf = await file.arrayBuffer();
    const ext = (extname(file.name)||'.png').toLowerCase().replace(/[^.a-z0-9]/g,'');
    const rel = filename(payload.userId, ext).replace(/^\//, '');
    const targetAbs = join(process.cwd(), 'public', rel);
    const { dirname } = await import('path');
    const { mkdir } = await import('fs/promises');
    await mkdir(dirname(targetAbs), { recursive: true });
    await writeFile(targetAbs, Buffer.from(arrBuf));
    await prisma.user.update({ where:{ id: payload.userId }, data:{ avatarUrl: targetRel } });
    return NextResponse.json({ success:true, data:{ url: targetRel } });
  } catch (e:any){
    return NextResponse.json({ success:false, error: e?.message || '服务器异常' }, { status:500 });
  }
}
