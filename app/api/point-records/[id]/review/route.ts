import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role, RecordStatus, TransactionType } from '@prisma/client';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

const prisma = new PrismaClient();

async function ensureAuth(request: NextRequest){
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if (!token) return { ok: false as const, status: 401, error: '未登录' };
  const payload = await verifyToken(token);
  if (!payload) return { ok: false as const, status: 401, error: '登录已失效' };
  return { ok: true as const, payload };
}

export async function POST(request: NextRequest, { params }:{ params:{ id:string } }){
  try{
    const auth = await ensureAuth(request);
    if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
    const { payload } = auth;
    if(payload.role !== Role.parent && payload.role !== Role.admin){
      return NextResponse.json({ success:false, error:'仅限家长或管理员' }, { status:403 });
    }

    const id = params.id;
    const body = await request.json().catch(()=>({}));
    const action = String(body.action||'');

    const rec = await prisma.pointRecord.findUnique({ where:{ id }, include:{ child:true, pointRule:true } });
    if(!rec) return NextResponse.json({ success:false, error:'记录不存在' }, { status:404 });
    if(payload.role === Role.parent && rec.child.familyId !== payload.familyId){
      return NextResponse.json({ success:false, error:'越权操作' }, { status:403 });
    }

    if(action==='reject'){
      const updated = await prisma.pointRecord.update({ where:{ id }, data:{ status: RecordStatus.rejected, reviewedAt: new Date(), reviewNote: body.reason||'' } });
      return NextResponse.json({ success:true, data:{ record: updated } });
    }

    if(action==='approve'){
      const points = Math.max(1, Number(body.points||0));
      if(!Number.isFinite(points) || points<=0){
        return NextResponse.json({ success:false, error:'积分必须为正整数' }, { status:400 });
      }
      const result = await prisma.$transaction(async(tx)=>{
        const updated = await tx.pointRecord.update({ where:{ id }, data:{ status: RecordStatus.approved, points, reviewedAt: new Date(), reviewNote: '家长通过' } });
        let acc = await tx.pointAccount.findUnique({ where:{ childId: rec.childId } });
        if(!acc) acc = await tx.pointAccount.create({ data:{ childId: rec.childId, balance: 0 } });
        const newBalance = acc.balance + points;
        await tx.pointTransaction.create({ data:{ accountId: acc.id, type: TransactionType.earn, amount: points, balanceAfter: newBalance, sourceType: 'task' as any, description: `家长审核：${rec.pointRule?.name||''}` } });
        await tx.pointAccount.update({ where:{ id: acc.id }, data:{ balance: newBalance, totalEarned: (acc.totalEarned||0)+points } });
        return { updated, balance:newBalance };
      });
      await prisma.taskLog.create({ data: { childId: rec.childId, points, note: 'rule-approve;rule=' + String(rec.pointRuleId || '') } });
      await prisma.user.update({ where: { id: rec.childId }, data: { totalEarnedPoints: { increment: points } } });
      revalidateTag('child-stats-'+rec.childId);
      return NextResponse.json({ success:true, data:{ record: result.updated, balance: result.balance } });
    }

    return NextResponse.json({ success:false, error:'不支持的动作' }, { status:400 });
  }catch(e:any){
    return NextResponse.json({ success:false, error: e.message||'服务器错误' }, { status:500 });
  }
}