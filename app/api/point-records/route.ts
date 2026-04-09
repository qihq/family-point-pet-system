import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role, RecordStatus } from '@prisma/client';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

const prisma = new PrismaClient();

async function verifyRequestAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if (!token) return { success: false as const, error: '未登录', status: 401 };
  const payload = await verifyToken(token);
  if (!payload) return { success: false as const, error: '登录已失效', status: 401 };
  return { success: true as const, payload };
}

// 孩子提交积分记录（needApproval=true 进入待审核；否则直接入账）
export async function POST(request: NextRequest) {
  try {
    const auth = await verifyRequestAuth(request);
    if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    const { payload } = auth;
    if (payload.role !== Role.child) return NextResponse.json({ success: false, error: '仅限孩子提交' }, { status: 403 });

    const body = await request.json();
    const ruleId: string = String(body.pointRuleId || '');
    if (!ruleId) return NextResponse.json({ success: false, error: '缺少 pointRuleId' }, { status: 400 });

    // 读取规则并校验权限/可用性
    const rule = await prisma.pointRule.findUnique({ where: { id: ruleId }, include: { targets: true } });
    if (!rule) return NextResponse.json({ success: false, error: '规则不存在' }, { status: 404 });
    const child = await prisma.user.findUnique({ where: { id: payload.userId }, select: { familyId: true, name: true } });
    if (!child || child.familyId !== rule.familyId) return NextResponse.json({ success: false, error: '越权提交' }, { status: 403 });
    if (!rule.enabled) return NextResponse.json({ success: false, error: '规则已禁用' }, { status: 400 });
    if (rule.targets && rule.targets.length > 0 && !rule.targets.some(t => t.childId === payload.userId)) {
      return NextResponse.json({ success: false, error: '规则未对该孩子开放' }, { status: 403 });
    }

    // 频率/上限校验
    const freq = (rule as any).frequency as string | null;
    const maxTimes = (rule as any).maxTimes == null ? 1 : Number((rule as any).maxTimes);
    const now = new Date();
    const startOfDay = (d: Date) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
    const endOfDay = (d: Date) => { const x = new Date(d); x.setHours(23, 59, 59, 999); return x; };
    const startOfWeek = (d: Date) => { const wd = (d.getDay() + 6) % 7; const x = new Date(d); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - wd); return x; };
    const endOfWeek = (d: Date) => { const x = startOfWeek(d); x.setDate(x.getDate() + 6); x.setHours(23, 59, 59, 999); return x; };
    const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0);
    const endOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);

    let allowed = true; let reason = '';
    if (freq === 'unlimited') {
      allowed = true;
    } else if (freq === 'once') {
      const cnt = await prisma.pointRecord.count({ where: { childId: payload.userId, pointRuleId: ruleId, status: { in: [ 'pending', 'approved' ] } } });
      const limit = Number.isFinite(maxTimes) ? Math.max(1, maxTimes) : 1;
      if (cnt >= limit) { allowed = false; reason = `该规则最多可提交 ${limit} 次`; }
    } else {
      let rangeStart = startOfDay(now), rangeEnd = endOfDay(now);
      if (freq === 'weekly') { rangeStart = startOfWeek(now); rangeEnd = endOfWeek(now); }
      if (freq === 'monthly') { rangeStart = startOfMonth(now); rangeEnd = endOfMonth(now); }
      const cnt = await prisma.pointRecord.count({ where: { childId: payload.userId, pointRuleId: ruleId, createdAt: { gte: rangeStart, lte: rangeEnd }, status: { in: [ 'pending', 'approved' ] } } });
      const limit = Number.isFinite(maxTimes) ? Math.max(1, maxTimes) : 1;
      if (cnt >= limit) {
        const label = freq === 'daily' ? '本日' : (freq === 'weekly' ? '本周' : '本月');
        allowed = false; reason = `${label}提交已达上限（${limit} 次）`;
      }
    }
    if (!allowed) return NextResponse.json({ success: false, error: reason }, { status: 400 });

    if (rule.needApproval) {
      const record = await prisma.pointRecord.create({
        data: {
          childId: payload.userId,
          pointRuleId: ruleId,
          description: body.description,
          imageUrl: body.imageUrl,
          submitNote: body.submitNote,
          status: RecordStatus.pending,
          points: 0,
        },
      });
      return NextResponse.json({ success: true, data: record, message: '已提交，待审核' });
    }

    const award = (rule.pointsType === 'fixed') ? (rule.points || 0) : (rule.points ?? rule.pointsMin ?? 0);
    if (award <= 0) return NextResponse.json({ success: false, error: '该规则未配置有效积分' }, { status: 400 });

    const result = await prisma.$transaction(async (tx) => {
      const rec = await tx.pointRecord.create({
        data: {
          childId: payload.userId,
          pointRuleId: ruleId,
          description: body.description,
          imageUrl: body.imageUrl,
          submitNote: body.submitNote,
          status: RecordStatus.approved,
          points: award,
          reviewedAt: new Date(),
          reviewNote: '自动入账',
        },
      });
      let acc = await tx.pointAccount.findUnique({ where: { childId: payload.userId } });
      if (!acc) acc = await tx.pointAccount.create({ data: { childId: payload.userId, balance: 0 } });
      const newBalance = (acc.balance || 0) + award;
      await tx.pointTransaction.create({ data: { accountId: acc.id, type: 'earn' as any, amount: award, balanceAfter: newBalance, sourceType: 'task' as any, description: `规则：${rule.name}` } });
      await tx.pointAccount.update({ where: { id: acc.id }, data: { balance: newBalance, totalEarned: (acc.totalEarned || 0) + award } });
      return { record: rec, balance: newBalance };
    });

    return NextResponse.json({ success: true, data: { record: result.record, balance: result.balance }, message: '已自动入账' });
  } catch (error: any) {
    console.error('提交积分记录失败', error);
    return NextResponse.json({ success: false, error: error.message || '提交失败' }, { status: 400 });
  }
}

// 列表（父母/孩子）
export async function GET(request: NextRequest) {
  try {
    const auth = await verifyRequestAuth(request);
    if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    const { payload } = auth;

    const { searchParams } = new URL(request.url);
    const status = (searchParams.get('status') as any) || 'pending';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);
    const childIdParam = searchParams.get('childId');

    const where: any = { status };

    if (payload.role === 'parent') {
      const children = await prisma.user.findMany({ where: { familyId: payload.familyId, role: 'child' }, select: { id: true } });
      const childIds = children.map(c => c.id);
      where.childId = childIdParam || { in: childIds };
    } else {
      where.childId = payload.userId;
    }

    const total = await prisma.pointRecord.count({ where });
    const records = await prisma.pointRecord.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: { id:true, childId:true, pointRuleId:true, status:true, points:true, description:true, imageUrl:true, submitNote:true, reviewedAt:true, createdAt:true, child: { select: { id:true, name:true, avatarUrl:true } }, pointRule: { select: { id:true, name:true, points:true, pointsType:true, category:true } } },
    });

    return NextResponse.json({ success: true, data: { records, pagination: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) } } });
  } catch (error: any) {
    console.error('获取积分记录失败', error);
    return NextResponse.json({ success: false, error: error.message || '服务器错误' }, { status: 500 });
  }
}