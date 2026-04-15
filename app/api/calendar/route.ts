import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role, Frequency } from '@prisma/client';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

const prisma = new PrismaClient();

function toDateOnly(d: Date){ const x=new Date(d); x.setHours(0,0,0,0); return x; }
function addDays(d:Date,n:number){ const x=new Date(d); x.setDate(x.getDate()+n); return x; }
function inSameDay(a:Date,b:Date){ return toDateOnly(a).getTime()===toDateOnly(b).getTime(); }

export async function GET(request: NextRequest){
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if(!token) return NextResponse.json({ success:false, error:'未登录' }, { status:401 });
  const payload = await verifyToken(token);
  if(!payload) return NextResponse.json({ success:false, error:'登录已失效' }, { status:401 });

  const url = new URL(request.url);
  const from = new Date(url.searchParams.get('from') || '');
  const to   = new Date(url.searchParams.get('to')   || '');
  if (isNaN(+from) || isNaN(+to)) {
    return NextResponse.json({ success: false, error: '参数错误' }, { status: 400 });
  }

  // 本家庭的孩子
  const children = await prisma.user.findMany({
    where: { familyId: payload.familyId, role: Role.child },
    select: { id: true, name: true },
  });
  const childIds = children.map(c => c.id);

  // 已完成日志（用于热力图和覆盖计划）
  const logs = await prisma.taskLog.findMany({
    where: { childId: { in: childIds }, createdAt: { gte: from, lte: to } },
    include: { taskPlan: { select: { id:true, title:true, category:true, durationMin:true, frequency:true } }, child: { select: { name:true } } },
    orderBy: { createdAt: 'asc' },
  });

  // 计划（用于展开为一周的“计划事件”）
  const plans = await prisma.taskPlan.findMany({
    where: { childId: { in: childIds } },
    select: { id:true, childId:true, title:true, points:true, category:true, durationMin:true, frequency:true, scheduledAt:true, enabled:true },
  });

  // 将本周每天展开计划事件（仅 daily / weekly；once 只在 scheduledAt 当天；未设置 scheduledAt 的 weekly 默认周一）
  const dayCount = Math.max(1, Math.round((toDateOnly(to).getTime()-toDateOnly(from).getTime())/86400000)+1);
  const planned: any[] = [];
  for(const p of plans){
    const freq = (p.frequency as any) as Frequency | null;
    for(let i=0;i<dayCount;i++){
      const day = addDays(from,i);
      const wd = (day.getDay()+6)%7; // 0=Mon
      let should = false;
      if(freq==='daily') should = true;
      else if(freq==='weekly'){
        if(p.scheduledAt){ const swd=(new Date(p.scheduledAt)).getDay(); should = wd===((swd+6)%7); }
        else should = wd===0; // 默认周一
      } else if(freq==='once' && p.scheduledAt){ should = inSameDay(day, new Date(p.scheduledAt)); }
      if(should){ planned.push({
        id: `plan-${p.id}-${day.toISOString().slice(0,10)}`,
        date: day.toISOString(),
        title: p.title,
        childId: p.childId,
        childName: children.find(c=>c.id===p.childId)?.name || '',
        points: 0,
        category: p.category||null,
        duration: p.durationMin??null,
        isPlanned: true, taskPlanId: p.id, enabled: p.enabled,
      }); }
    }
  }

  // 将“已完成”的日志映射，覆盖同日同计划的 planned 事件
  const done = logs.map(l=>({
    id: l.id,
    date: l.createdAt.toISOString(),
    title: l.taskPlan?.title || '自由任务',
    childName: l.child.name,
    childId: l.childId,
    points: l.points,
    category: (l as any).category || l.taskPlan?.category || null,
    duration: l.taskPlan?.durationMin ?? null,
    isPending: (l.note||'').includes('pending-approval'),
    taskPlanId: l.taskPlan?.id || null,
    enabled: true,
  }));

  // 去重：如果同一天同计划已经有“完成”记录，则不再返回该 planned 事件
  const doneKey = new Set(done.map(d=> (d.taskPlanId? `${d.taskPlanId}-${d.date.slice(0,10)}` : `log-${d.id}`)));
  const filteredPlanned = planned.filter(e=>{
    const key = `${(e as any).taskPlanId|| e.id.split('plan-')[1]?.split('-')[0] || ''}-${e.date.slice(0,10)}`;
    return !doneKey.has(key);
  });

  const data = [...done, ...filteredPlanned];
  return NextResponse.json({ success:true, data });
}

// codex-ok: 2026-04-15T12:21:00+08:00

