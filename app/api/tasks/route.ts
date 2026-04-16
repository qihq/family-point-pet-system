import { Frequency, Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildTaskProgressMap, getTaskWindow } from "@/lib/task-progress";

export async function GET(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.parent, Role.child, Role.admin]);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  const url = new URL(request.url);
  const deleted = url.searchParams.get("deleted");
  const filterDeleted = deleted === "all" ? {} : { enabled: deleted === "true" ? false : true };

  const list = await prisma.taskPlan.findMany({
    where: {
      ...filterDeleted,
      child: {
        familyId: auth.payload.familyId,
        id: auth.payload.role === Role.child ? auth.payload.userId : undefined,
      },
    },
    orderBy: [{ scheduledAt: "asc" }, { createdAt: "desc" }],
  });

  if (auth.payload.role !== Role.child || list.length === 0) {
    return NextResponse.json({ success: true, data: list });
  }

  const windows = list.map((plan) => getTaskWindow(plan.frequency, new Date()));
  const earliestStart = windows.reduce(
    (earliest, window) => (window.start < earliest ? window.start : earliest),
    windows[0].start
  );

  const logs = await prisma.taskLog.findMany({
    where: {
      childId: auth.payload.userId,
      taskPlanId: { in: list.map((plan) => plan.id) },
      createdAt: { gte: earliestStart },
    },
    select: {
      taskPlanId: true,
      createdAt: true,
      note: true,
      points: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const statusMap = buildTaskProgressMap(list, logs);
  const enriched = list.map((plan) => ({
    ...plan,
    status: statusMap[plan.id] || "idle",
  }));

  return NextResponse.json({ success: true, data: enriched });
}

export async function POST(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.parent, Role.child, Role.admin]);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  const body = await request.json();
  const data: {
    childId?: string;
    title: string;
    description: string | null;
    points: number;
    scheduledAt: Date | null;
    dueAt: Date | null;
    frequency: Frequency | null;
    enabled: boolean;
    category: string | null;
    durationMin: number | null;
    needApproval: boolean;
  } = {
    childId: body.childId,
    title: (body.title || "").trim(),
    description: body.description || null,
    points: Number(body.points || 0),
    scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : null,
    dueAt: body.dueAt ? new Date(body.dueAt) : null,
    frequency: (body.frequency as Frequency | null) || null,
    enabled: body.enabled !== false,
    category: body.category || null,
    durationMin:
      body.durationMin === undefined || body.durationMin === null || body.durationMin === ""
        ? null
        : Number(body.durationMin),
    needApproval: body.needApproval !== false,
  };

  if (!data.childId && auth.payload.role === Role.child) {
    data.childId = auth.payload.userId;
  }

  if (!data.title) {
    return NextResponse.json({ success: false, error: "title 必填" }, { status: 400 });
  }
  if (!data.childId) {
    return NextResponse.json({ success: false, error: "childId 必填" }, { status: 400 });
  }

  const child = await prisma.user.findFirst({
    where: { id: data.childId, familyId: auth.payload.familyId },
    select: { id: true },
  });
  if (!child) {
    return NextResponse.json({ success: false, error: "越权访问" }, { status: 403 });
  }

  const created = await prisma.taskPlan.create({
    data: {
      childId: data.childId,
      title: data.title,
      description: data.description,
      points: data.points,
      scheduledAt: data.scheduledAt,
      dueAt: data.dueAt,
      frequency: data.frequency,
      enabled: data.enabled,
      category: data.category,
      durationMin: data.durationMin,
      needApproval: data.needApproval,
    },
  });
  return NextResponse.json({ success: true, data: created });
}
