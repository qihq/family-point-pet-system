import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: '未登录' }, { status: 401 });

    const payload = await verifyToken(token || '');
    if (!payload) return NextResponse.json({ error: '登录已失效' }, { status: 401 });

    // 以令牌为准的角色/身份
    let user: any = { id: payload.userId, name: '', role: (payload as any).role, familyId: payload.familyId };

    // 尝试读取数据库完善 name 等信息；失败也不影响会话可用性
    try{
      const dbUser = await prisma.user.findUnique({ where: { id: payload.userId }, select: { id:true, name:true, role:true, familyId:true } });
      if(dbUser){ user = { ...user, name: dbUser.name || user.name }; }
    }catch(err){ /* 忽略 DB 异常，返回最小会话 */ }

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.error('查询当前用户失败', error);
    // 最后兜底：即便出现未知异常，也按未登录处理，避免 500 造成前端“乱码”或白屏
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }
}