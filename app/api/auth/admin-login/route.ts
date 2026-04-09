import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generateToken, verifyPassword, createSessionUser, createLoginSuccess, createLoginError } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: NextRequest){
  try{
    const raw = await request.text();
    let body: any = {};
    try{ body = raw? JSON.parse(raw) : {}; }catch{ body = {}; }

    const name = String(body.name||'').trim();
    const password = String(body.password||'').trim();
    if(!name || !password) return NextResponse.json(createLoginError('用户名和密码不能为空'), { status:400 });

    const user = await prisma.user.findFirst({ where: { name: { equals: name, mode: 'insensitive' } }, select: { id:true, name:true, familyId:true, password:true } });
    if(!user) return NextResponse.json(createLoginError('用户名不存在'), { status:401 });

    const isAdmin = user.name.toLowerCase()==='admin' || user.familyId==='system-family-id';
    if(!isAdmin) return NextResponse.json(createLoginError('非管理员账号'), { status:403 });

    if(!verifyPassword(password, user.password||'')) return NextResponse.json(createLoginError('密码错误'), { status:401 });

    const token = await generateToken({ userId: user.id, role: 'admin' as any, familyId: user.familyId });
    const sessionUser = createSessionUser({ userId: user.id, role: 'admin' as any, familyId: user.familyId }, user.name);
    const result = createLoginSuccess(sessionUser);

    return NextResponse.json({ ...result, token }, { status:200, headers:{ 'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800` } });
  }catch(err){
    console.error('管理员登录错误:', err);
    return NextResponse.json(createLoginError('登录失败，请稍后重试。'), { status:500 });
  }
}