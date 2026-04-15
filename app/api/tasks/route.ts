import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role, Frequency } from '@prisma/client';
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

export async function GET(request: NextRequest){
  const auth = await ensureAuth(request);
  if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
  const { payload } = auth;
  const url = new URL(request.url);
  const deleted = url.searchParams.get('deleted'); // 'true' | 'false' | 'all'
  const familyId = payload.familyId;
  const filterDeleted = (deleted === 'all') ? {} : { enabled: deleted === 'true' ? false : true };
  const list = await prisma.taskPlan.findMany({ where: { ...filterDeleted, child: { familyId, id: (payload.role===Role.child? payload.userId : undefined) } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ success:true, data:list });
}

export async function POST(request: NextRequest){
  const auth = await ensureAuth(request);
  if(!auth.ok) return NextResponse.json({ success:false, error:auth.error }, { status:auth.status });
  const { payload } = auth;
  if(payload.role !== Role.parent && payload.role !== Role.admin && payload.role !== Role.child){
    return NextResponse.json({ success:false, error:'仅限家长/管理员/孩子' }, { status:403 });
  }
  const body = await request.json();
  const data: any = {
    childId: body.childId,
    title: (body.title||'').trim(),
    description: (body.description||'')||null,
    points: Number(body.points||0),
    scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : null,
    dueAt: body.dueAt ? new Date(body.dueAt) : null,
    frequency: body.frequency as Frequency | null,
    enabled: body.enabled !== false,
    category: body.category || null,
    durationMin: (body.durationMin===undefined||body.durationMin===null||body.durationMin==='')? null : Number(body.durationMin),
    needApproval: (body.needApproval !== false),
  };// 孩子创建时自动指向本人
  if(!data.childId && payload.role === Role.child){ data.childId = payload.userId; }
  if(!data.title) return NextResponse.json({ success:false, error:'title 必填' }, { status:400 });
  if(!data.childId) return NextResponse.json({ success:false, error:'childId 必填' }, { status:400 });
  // 权限：该 child 必须属于当前家庭
  const child = await prisma.user.findFirst({ where:{ id:data.childId, familyId: payload.familyId } });
  if(!child) return NextResponse.json({ success:false, error:'越权访问' }, { status:403 });
  const created = await prisma.taskPlan.create({ data });
  return NextResponse.json({ success:true, data: created });
}

// codex-ok: 2026-04-13T18:07:00+08:00