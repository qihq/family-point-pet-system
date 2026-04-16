import { revalidateTag } from "next/cache";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { completeTask } from "@/lib/actions/taskActions";
import { sendTaskPendingNotificationToFamily } from "@/lib/webpush";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireRequestAuth(request, [Role.child, Role.parent, Role.admin]);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  const plan = await prisma.taskPlan.findUnique({
    where: { id: params.id },
    include: { child: { select: { id: true, name: true, familyId: true } } },
  });

  if (!plan) {
    return NextResponse.json({ success: false, error: "任务不存在" }, { status: 404 });
  }
  if (!plan.enabled) {
    return NextResponse.json({ success: false, error: "任务已停用" }, { status: 400 });
  }
  if (auth.payload.role !== Role.admin && plan.child.familyId !== auth.payload.familyId) {
    return NextResponse.json({ success: false, error: "越权操作" }, { status: 403 });
  }
  if (auth.payload.role === Role.child && plan.childId !== auth.payload.userId) {
    return NextResponse.json({ success: false, error: "不能替其他孩子完成任务" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const childId = plan.childId;

  if (plan.frequency === "daily" || plan.frequency === "once") {
    const now = new Date();
    const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const dayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    const existing = await prisma.taskLog.findFirst({
      where: {
        childId,
        taskPlanId: plan.id,
        createdAt: { gte: dayStart, lte: dayEnd },
      },
      select: { id: true },
    });
    if (existing) {
      return NextResponse.json({ success: false, error: "今天已经完成过这个任务" }, { status: 409 });
    }
  }

  if (plan.frequency === "weekly") {
    const now = new Date();
    const weekday = (now.getDay() + 6) % 7;
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - weekday, 0, 0, 0, 0);
    const weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6, 23, 59, 59, 999);
    const existing = await prisma.taskLog.findFirst({
      where: {
        childId,
        taskPlanId: plan.id,
        createdAt: { gte: weekStart, lte: weekEnd },
      },
      select: { id: true },
    });
    if (existing) {
      return NextResponse.json({ success: false, error: "本周已经完成过这个任务" }, { status: 409 });
    }
  }

  if (plan.needApproval) {
    await prisma.taskLog.create({
      data: {
        childId,
        taskPlanId: plan.id,
        points: 0,
        category: body.category || plan.category || null,
        note: "pending-approval",
      },
    });

    void sendTaskPendingNotificationToFamily(plan.child.familyId, plan.child.name, plan.title);
    revalidateTag(`child-stats-${childId}`);

    return NextResponse.json({
      success: true,
      data: { status: "pending", points: 0 },
      message: "已提交审核，等待家长确认",
    });
  }

  try {
    const result = await completeTask({
      childId,
      taskPlanId: plan.id,
      basePoints: plan.points,
      category: body.category || plan.category || undefined,
    });

    revalidateTag(`child-stats-${childId}`);
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "服务器错误" }, { status: 500 });
  }
}
