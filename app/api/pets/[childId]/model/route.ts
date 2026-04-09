import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';
import { join, dirname } from 'node:path';
import { promises as fs } from 'node:fs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest, { params }: { params: { childId: string } }){
  try{
    const authHeader = request.headers.get('authorization');
    const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
    const payload = token ? (await verifyToken(token)) : null;
    if(!payload) return NextResponse.json({ success:false, error:'未登录' }, { status:401 });

    const { childId } = params;
    // 权限：孩子只能给自己上传；家长需同家庭；管理员放行
    if(payload.role === Role.child && payload.userId !== childId){
      return NextResponse.json({ success:false, error:'越权操作' }, { status:403 });
    }
    if(payload.role === Role.parent){
      const child = await prisma.user.findFirst({ where:{ id: childId, role: Role.child, familyId: payload.familyId } });
      if(!child) return NextResponse.json({ success:false, error:'越权操作' }, { status:403 });
    }

    const form = await request.formData();
    const file = form.get('file') as File | null;
    if(!file) return NextResponse.json({ success:false, error:'缺少文件' }, { status:400 });

    const arrayBuffer = await file.arrayBuffer();
    const buf = Buffer.from(arrayBuffer);
    const dir = join(process.cwd(), 'public', 'uploads', 'pets');
    await fs.mkdir(dir, { recursive: true });
    const filename = `${childId}.glb`;
    const full = join(dir, filename);
    await fs.writeFile(full, buf);

    // 记录模型 URL（相对 /public）
    const url = `/uploads/pets/${filename}`;
    await prisma.pet.upsert({
      where:{ childId },
      create:{ childId, name: '小暖暖', modelUrl: url } as any,
      update:{ modelUrl: url },
    });

    return NextResponse.json({ success:true, data:{ url } });
  }catch(e:any){
    return NextResponse.json({ success:false, error: e.message||'上传失败' }, { status:500 });
  }
}