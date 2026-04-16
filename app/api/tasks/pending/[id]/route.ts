import { revalidateTag } from "next/cache";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { applyTaskPetGrowth } from "@/server/services/pet-growth.service";
import { sendReviewOutcomeNotificationToChild } from "@/lib/webpush";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireRequestAuth(request, [Role.parent, Role.admin]);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  const body = await request.json().catch(() => ({}));
  const action = String(body.action || "").toLowerCase();
  if (action !== "approve" && action !== "reject") {
    return NextResponse.json({ success: false, error: "action 必须为 approve 或 reject" }, { status: 400 });
  }

  const log = await prisma.taskLog.findUnique({
    where: { id: params.id },
    include: {
      taskPlan: { select: { title: true, points: true } },
      child: { select: { familyId: true, name: true } },
    },
  });

  if (!log) {
    return NextResponse.json({ success: false, error: "记录不存在" }, { status: 404 });
  }
  if (auth.payload.role !== Role.admin && log.child.familyId !== auth.payload.familyId) {
    return NextResponse.json({ success: false, error: "越权访问" }, { status: 403 });
  }
  if (!(log.note || "").includes("pending-approval")) {
    return NextResponse.json({ success: false, error: "该记录不是待审核状态" }, { status: 400 });
  }

  if (action === "reject") {
    await prisma.taskLog.update({
      where: { id: log.id },
      data: { note: `rejected${body.reason ? `;reason=${String(body.reason)}` : ""}` },
    });
    void sendReviewOutcomeNotificationToChild({
      childId: log.childId,
      title: `任务「${log.taskPlan?.title || "自由任务"}」`,
      approved: false,
      url: "/child/records?tab=records&status=rejected",
      tag: "review-task-result",
    });
    revalidateTag(`child-stats-${log.childId}`);
    return NextResponse.json({ success: true, data: { action: "rejected" } });
  }

  const points = typeof body.points === "number" && body.points > 0
    ? Math.floor(body.points)
    : (log.taskPlan?.points ?? 0);

  const result = await prisma.$transaction(async (tx) => {
    await tx.taskLog.update({
      where: { id: log.id },
      data: { points, note: "approved" },
    });
    await tx.user.update({
      where: { id: log.childId },
      data: { totalEarnedPoints: { increment: points } },
    });
    await tx.pointAccount.upsert({
      where: { childId: log.childId },
      create: { childId: log.childId, balance: points, totalEarned: points },
      update: { balance: { increment: points }, totalEarned: { increment: points } },
    });
    return { points };
  });

  const petGrowth = await applyTaskPetGrowth({ childId: log.childId, points });
  void sendReviewOutcomeNotificationToChild({
    childId: log.childId,
    title: `任务「${log.taskPlan?.title || "自由任务"}」`,
    approved: true,
    points: result.points,
    url: "/child/tasks",
    tag: "review-task-result",
  });
  revalidateTag(`child-stats-${log.childId}`);

  return NextResponse.json({
    success: true,
    data: { action: "approved", points: result.points, petGrowth },
  });
}
