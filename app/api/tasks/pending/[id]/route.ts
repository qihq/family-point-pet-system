import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: NextRequest, { params }:{ params:{ id:string } }){
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if(!token) return NextResponse.json({ success:false, error:'未登录' }, { status:401 });
  const payload = await verifyToken(token); if(!payload) return NextResponse.json({ success:false, error:'登录已失效' }, { status:401 });
  if(payload.role !== Role.parent && payload.role !== Role.admin) return NextResponse.json({ success:false, error:'仅限家长/管理员' }, { status:403 });
  const body = await request.json().catch(()=>({}));
  const action = String(body.action||'').toLowerCase();
  if(action!=='approve' && action!=='reject') return NextResponse.json({ success:false, error:'action 需为 approve/reject' }, { status:400 });

  const row = await prisma.taskLog.findUnique({ where:{ id: params.id }, include:{ taskPlan:true, child:true } });
  if(!row) return NextResponse.json({ success:false, error:'记录不存在' }, { status:404 });
  if(row.child.familyId !== payload.familyId && payload.role!==Role.admin) return NextResponse.json({ success:false, error:'越权' }, { status:403 });
  if(!(row.note||'').includes('pending-approval')) return NextResponse.json({ success:false, error:'该记录非待审状态' }, { status:400 });

  if(action==='reject'){
    const updated = await prisma.taskLog.update({ where:{ id: row.id }, data:{ note: 'rejected' } });
    revalidateTag('child-stats-'+row.childId);
    return NextResponse.json({ success:true, data:{ action:'rejected' } });
  }

  // approve: 更新当前 TaskLog 的 points、note，并同步账户与孩子总积分
  const give = typeof body.points==='number' && body.points>0 ? Math.floor(body.points) : (row.taskPlan?.points ?? 0);
  const result = await prisma.$transaction(async (tx)=>{
    const updated = await tx.taskLog.update({ where:{ id: row.id }, data:{ points: give, note: 'approved' } });
    await tx.user.update({ where:{ id: row.childId }, data:{ totalEarnedPoints: { increment: give } } });
    await tx.pointAccount.update({ where:{ childId: row.childId }, data:{ balance:{ increment: give }, totalEarned:{ increment: give } } });
    return updated;
  });
  revalidateTag('child-stats-'+row.childId);
  return NextResponse.json({ success:true, data:{ action:'approved', points: give } });
}

// codex-ok: 2026-04-13T17:40:17.6912450+08:00