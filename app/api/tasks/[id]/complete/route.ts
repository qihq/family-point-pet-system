import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';
import { completeTask } from '@/lib/actions/taskActions';

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // 1. 认证
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if (!token) return NextResponse.json({ success: false, error: '未登录' }, { status: 401 });
  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ success: false, error: '登录已失效' }, { status: 401 });

  // 2. 只有孩子或家长可以完成任务
  if (payload.role !== Role.child && payload.role !== Role.parent) {
    return NextResponse.json({ success: false, error: '权限不足' }, { status: 403 });
  }

  // 3. 查找任务计划
  const plan = await prisma.taskPlan.findUnique({
    where: { id: params.id },
    include: { child: true },
  });
  if (!plan) return NextResponse.json({ success: false, error: '任务不存在' }, { status: 404 });
  if (!plan.enabled) return NextResponse.json({ success: false, error: '任务已禁用' }, { status: 400 });

  // 4. 家庭边界校验
  if (plan.child.familyId !== payload.familyId) {
    return NextResponse.json({ success: false, error: '越权操作' }, { status: 403 });
  }

  // 5. 确定 childId（本阶段固定为任务所属孩子）
  const body = await request.json().catch(() => ({} as any));
  const childId = plan.childId;

  // 6. 频率检查：daily/once 当天仅一次
  if (plan.frequency === 'daily' || plan.frequency === 'once') {
    const today = new Date();
    const dayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
    const dayEnd   = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
    const existing = await prisma.taskLog.findFirst({
      where: {
        childId,
        taskPlanId: plan.id,
        createdAt: { gte: dayStart, lte: dayEnd },
      },
    });
    if (existing) {
      return NextResponse.json({ success: false, error: '今天已完成过该任务' }, { status: 409 });
    }
  }

  // 7. weekly：本周仅一次
  if (plan.frequency === 'weekly') {
    const now = new Date();
    const weekday = ((now.getDay() + 6) % 7);
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - weekday, 0, 0, 0, 0);
    const weekEnd   = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6, 23, 59, 59, 999);
    const existing = await prisma.taskLog.findFirst({
      where: { childId, taskPlanId: plan.id, createdAt: { gte: weekStart, lte: weekEnd } },
    });
    if (existing) {
      return NextResponse.json({ success: false, error: '本周已完成过该任务' }, { status: 409 });
    }
  }

  // 8. 需要审核的任务：写入待审状态，不立即给分
  if (plan.needApproval) {
    await prisma.taskLog.create({
      data: {
        childId,
        taskPlanId: plan.id,
        points: 0,
        category: body.category || plan.category || null,
        note: 'pending-approval',
      },
    });
    revalidateTag('child-stats-'+childId); return NextResponse.json({ success: true, data: { status: 'pending', points: 0 } });
  }

  // 9. 正常完成：调用 completeTask（含事务、加成与等级校验）
  try {
    const result = await completeTask({
      childId,
      taskPlanId: plan.id,
      basePoints: plan.points,
      category: body.category || plan.category || undefined,
    });
    revalidateTag('child-stats-'+childId); return NextResponse.json({ success: true, data: result });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message || '服务器错误' }, { status: 500 });
  }
}

// codex-ok: 2026-04-13T17:43:10.9838514+08:00
