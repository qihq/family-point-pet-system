import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';
import { spendPoints } from '@/server/services/points.service';

const prisma = new PrismaClient();

async function ensureAuth(request: NextRequest){
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if (!token) return { ok: false as const, status: 401, error: '未登录' };
  const payload = await verifyToken(token);
  if (!payload) return { ok: false as const, status: 401, error: '登录已失效' };
  return { ok: true as const, payload };
}

export async function POST(request: NextRequest){
  try{
    const auth = await ensureAuth(request);
    if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
    const { payload } = auth;
    const body = await request.json();

    const rewardItemId: string = String(body.rewardItemId||'');
    const quantity: number = Math.max(1, Number(body.quantity||1));
    let childId: string | undefined = body.childId ? String(body.childId) : undefined;
    if(payload.role === Role.child) childId = payload.userId;
    if(!rewardItemId || !childId) return NextResponse.json({ success:false, error:'缺少参数' }, { status:400 });

    const [item, child] = await Promise.all([
      prisma.rewardItem.findUnique({ where:{ id: rewardItemId } }),
      prisma.user.findUnique({ where:{ id: childId }, select:{ id:true, familyId:true } }),
    ]);

    if(!item || !item.enabled) return NextResponse.json({ success:false, error:'奖品未找到或已禁用' }, { status:404 });
    if(!child) return NextResponse.json({ success:false, error:'孩子不存在' }, { status:404 });
    if(payload.role === Role.parent && child.familyId !== payload.familyId) return NextResponse.json({ success:false, error:'越权访问' }, { status:403 });

    const cost = item.cost * quantity;

    const result = await prisma.$transaction(async (tx) => {
      // 库存校验与扣减（null 表示不限量）
      if(item.stock != null){
        const fresh = await tx.rewardItem.findUnique({ where:{ id: item.id }, select:{ stock:true } });
        const left = fresh?.stock ?? 0;
        if(left < quantity) throw new Error('库存不足');
        await tx.rewardItem.update({ where:{ id:item.id }, data:{ stock: left - quantity } });
      }
      // 扣积分
      const spend = await spendPoints({ childId: child.id, amount: cost, sourceType: 'manual' as any, description: `兑换奖品：${item.name} x${quantity}` });
      // 记录兑换
      const log = await tx.redeemLog.create({ data: { childId: child.id, rewardItemId: item.id, quantity, pointsSpent: cost, note: body.note||null } });
      return { spend, log };
    });

    revalidateTag('child-stats-'+child.id); return NextResponse.json({ success:true, data: { balance: result.spend.balance, redeem: result.log } });
  }catch(e:any){
    const msg = String(e?.message||'兑换失败');
    if(msg.includes('库存不足')) return NextResponse.json({ success:false, error:'库存不足' }, { status:409 });
    if(msg.includes('余额不足') || msg.includes('积分不足')) return NextResponse.json({ success:false, error:'积分不足' }, { status:409 });
    return NextResponse.json({ success:false, error: '兑换失败' }, { status:400 });
  }
}// codex-ok: 2026-04-14T12:06:30+08:00
