import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest){
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if(!token) return NextResponse.json({ success:false, error:'未登录' }, { status:401 });
  const payload = await verifyToken(token); if(!payload) return NextResponse.json({ success:false, error:'登录已失效' }, { status:401 });
  if(payload.role !== Role.parent && payload.role !== Role.admin) return NextResponse.json({ success:false, error:'仅限家长/管理员' }, { status:403 });
  const rows = await prisma.taskLog.findMany({
    where: { note: { contains: 'pending-approval' }, child: { familyId: payload.familyId } },
    include: { taskPlan: { select: { title:true, points:true } }, child: { select: { id:true, name:true, avatarUrl:true } } },
    orderBy: { createdAt: 'desc' }
  });
  const data = rows.map(r=> ({ id:r.id, createdAt: r.createdAt, child: r.child, taskPlan: r.taskPlan, pointsPreview: r.taskPlan?.points ?? 0 }));
  return NextResponse.json({ success:true, data });
}

// codex-ok: 2026-04-09T16:59:33