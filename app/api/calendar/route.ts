import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { planOccursOnDate } from "@/lib/task-progress";

function toDateOnly(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
}

function endOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}

function addDays(date: Date, days: number) {
  const value = new Date(date);
  value.setDate(value.getDate() + days);
  return value;
}

export async function GET(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.parent, Role.child, Role.admin]);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  const { searchParams } = new URL(request.url);
  const from = new Date(searchParams.get("from") || "");
  const to = new Date(searchParams.get("to") || "");
  if (Number.isNaN(+from) || Number.isNaN(+to)) {
    return NextResponse.json({ success: false, error: "参数错误" }, { status: 400 });
  }

  const children = await prisma.user.findMany({
    where: {
      familyId: auth.payload.familyId,
      role: Role.child,
      ...(auth.payload.role === Role.child ? { id: auth.payload.userId } : {}),
    },
    select: { id: true, name: true },
  });
  const childIds = children.map((child) => child.id);

  const [logs, plans] = await Promise.all([
    prisma.taskLog.findMany({
      where: { childId: { in: childIds }, createdAt: { gte: from, lte: to } },
      include: {
        taskPlan: { select: { id: true, title: true, category: true, durationMin: true, frequency: true } },
        child: { select: { name: true } },
      },
      orderBy: { createdAt: "asc" },
    }),
    prisma.taskPlan.findMany({
      where: { childId: { in: childIds } },
      select: {
        id: true,
        childId: true,
        title: true,
        points: true,
        category: true,
        durationMin: true,
        frequency: true,
        scheduledAt: true,
        enabled: true,
      },
    }),
  ]);

  const dayCount = Math.max(1, Math.round((toDateOnly(to).getTime() - toDateOnly(from).getTime()) / 86400000) + 1);
  const planned: Array<{
    id: string;
    date: string;
    title: string;
    childId: string;
    childName: string;
    points: number;
    category: string | null;
    duration: number | null;
    isPlanned: boolean;
    taskPlanId: string;
    enabled: boolean;
  }> = [];

  for (const plan of plans) {
    for (let index = 0; index < dayCount; index += 1) {
      const day = addDays(from, index);
      if (!planOccursOnDate(plan, day)) {
        continue;
      }

      planned.push({
        id: `plan-${plan.id}-${day.toISOString().slice(0, 10)}`,
        date: day.toISOString(),
        title: plan.title,
        childId: plan.childId,
        childName: children.find((child) => child.id === plan.childId)?.name || "",
        points: 0,
        category: plan.category || null,
        duration: plan.durationMin ?? null,
        isPlanned: true,
        taskPlanId: plan.id,
        enabled: plan.enabled,
      });
    }
  }

  const done = logs.map((log) => ({
    id: log.id,
    date: log.createdAt.toISOString(),
    title: log.taskPlan?.title || "自由任务",
    childName: log.child.name,
    childId: log.childId,
    points: log.points,
    category: log.category || log.taskPlan?.category || null,
    duration: log.taskPlan?.durationMin ?? null,
    isPending: (log.note || "").includes("pending-approval"),
    taskPlanId: log.taskPlan?.id || null,
    enabled: true,
  }));

  const doneKey = new Set(done.map((item) => (item.taskPlanId ? `${item.taskPlanId}-${item.date.slice(0, 10)}` : `log-${item.id}`)));
  const filteredPlanned = planned.filter((item) => !doneKey.has(`${item.taskPlanId}-${item.date.slice(0, 10)}`));

  return NextResponse.json({ success: true, data: [...done, ...filteredPlanned] });
}
