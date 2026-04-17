import { RecordStatus, Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { planOccursOnDate } from "@/lib/task-progress";
import { addDays, dateKey, monthRange, trailingDayRange, weekRange } from "@/lib/time";

function approvedRecordWhere(childId: string, start: Date, end: Date) {
  return {
    childId,
    status: RecordStatus.approved,
    points: { gt: 0 },
    OR: [{ reviewedAt: { gte: start, lte: end } }, { reviewedAt: null, createdAt: { gte: start, lte: end } }],
  };
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const auth = await requireRequestAuth(request, [Role.parent, Role.child, Role.admin]);
    if (!auth.ok) {
      return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    }

    const resolvedParams = await params;
    const childId = resolvedParams.id;

    if (auth.payload.role === Role.child && auth.payload.userId !== childId) {
      return NextResponse.json({ success: false, error: "无权限" }, { status: 403 });
    }

    if (auth.payload.role !== Role.admin) {
      const child = await prisma.user.findUnique({
        where: { id: childId },
        select: { familyId: true },
      });
      if (!child || child.familyId !== auth.payload.familyId) {
        return NextResponse.json({ success: false, error: "无权限" }, { status: 403 });
      }
    }

    const { searchParams } = new URL(request.url);
    const range = String(searchParams.get("range") || "14");
    const days = Math.max(1, parseInt(range, 10)) || 14;
    const { start, end, dates } = trailingDayRange(days);
    const month = monthRange();
    const week = weekRange();

    const [earnedLogs, approvedRecords, allEarnTask, allEarnRule, monthEarnTask, monthEarnRule, weekEarnTask, weekEarnRule, plans, completedLogs, redeems] = await Promise.all([
      prisma.taskLog.findMany({
        where: {
          childId,
          points: { gt: 0 },
          createdAt: { gte: start, lte: end },
          NOT: { note: { startsWith: "rule-" } },
        },
        select: {
          id: true,
          createdAt: true,
          points: true,
          taskPlan: { select: { title: true } },
        },
      }),
      prisma.pointRecord.findMany({
        where: approvedRecordWhere(childId, start, end),
        select: {
          id: true,
          createdAt: true,
          reviewedAt: true,
          points: true,
          pointRule: { select: { name: true } },
        },
      }),
      prisma.taskLog.aggregate({
        where: { childId, points: { gt: 0 }, NOT: { note: { startsWith: "rule-" } } },
        _sum: { points: true },
      }),
      prisma.pointRecord.aggregate({
        where: { childId, status: RecordStatus.approved, points: { gt: 0 } },
        _sum: { points: true },
      }),
      prisma.taskLog.aggregate({
        where: {
          childId,
          points: { gt: 0 },
          createdAt: { gte: month.start, lte: month.end },
          NOT: { note: { startsWith: "rule-" } },
        },
        _sum: { points: true },
      }),
      prisma.pointRecord.aggregate({
        where: approvedRecordWhere(childId, month.start, month.end),
        _sum: { points: true },
      }),
      prisma.taskLog.aggregate({
        where: {
          childId,
          points: { gt: 0 },
          createdAt: { gte: week.start, lte: week.end },
          NOT: { note: { startsWith: "rule-" } },
        },
        _sum: { points: true },
      }),
      prisma.pointRecord.aggregate({
        where: approvedRecordWhere(childId, week.start, week.end),
        _sum: { points: true },
      }),
      prisma.taskPlan.findMany({
        where: { childId, enabled: true },
        select: { id: true, frequency: true, scheduledAt: true },
      }),
      prisma.taskLog.findMany({
        where: {
          childId,
          taskPlanId: { not: null },
          createdAt: { gte: start, lte: end },
        },
        select: { taskPlanId: true, createdAt: true, note: true },
      }),
      prisma.redeemLog.findMany({
        where: { childId },
        orderBy: { createdAt: "desc" },
        take: 10,
        include: { rewardItem: { select: { name: true } } },
      }),
    ]);

    const dailyMap = new Map<string, number>();
    for (const key of dates) {
      dailyMap.set(key, 0);
    }

    for (const log of earnedLogs) {
      const key = dateKey(log.createdAt);
      dailyMap.set(key, (dailyMap.get(key) || 0) + (log.points || 0));
    }

    for (const record of approvedRecords) {
      const effectiveAt = record.reviewedAt || record.createdAt;
      const key = dateKey(effectiveAt);
      dailyMap.set(key, (dailyMap.get(key) || 0) + (record.points || 0));
    }

    let expectedCount = 0;
    for (let offset = 0; offset < days; offset += 1) {
      const currentDay = addDays(start, offset);
      for (const plan of plans) {
        if (planOccursOnDate(plan, currentDay)) {
          expectedCount += 1;
        }
      }
    }

    const completedKeys = new Set<string>();
    for (const log of completedLogs) {
      if (!log.taskPlanId || (log.note || "").startsWith("rejected")) {
        continue;
      }
      completedKeys.add(`${log.taskPlanId}-${dateKey(log.createdAt)}`);
    }

    const activities = [
      ...earnedLogs.map((log) => ({
        id: `task-${log.id}`,
        kind: "plan" as const,
        title: log.taskPlan?.title || "任务完成",
        points: log.points || 0,
        createdAt: log.createdAt.toISOString(),
      })),
      ...approvedRecords.map((record) => ({
        id: `rule-${record.id}`,
        kind: "rule" as const,
        title: record.pointRule?.name || "积分规则",
        points: record.points || 0,
        createdAt: (record.reviewedAt || record.createdAt).toISOString(),
      })),
    ]
      .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
      .slice(0, 8);

    return NextResponse.json({
      success: true,
      data: {
        series: dates.map((date) => ({ date, points: dailyMap.get(date) || 0 })),
        stats: {
          week: (weekEarnTask._sum.points || 0) + (weekEarnRule._sum.points || 0),
          month: (monthEarnTask._sum.points || 0) + (monthEarnRule._sum.points || 0),
          total: (allEarnTask._sum.points || 0) + (allEarnRule._sum.points || 0),
        },
        donut: {
          completed: completedKeys.size,
          todo: Math.max(0, expectedCount - completedKeys.size),
        },
        activities,
        redeems: redeems.map((redeem) => ({
          id: redeem.id,
          name: redeem.rewardItem?.name || "",
          pointsSpent: redeem.pointsSpent,
          quantity: redeem.quantity,
          createdAt: redeem.createdAt.toISOString(),
        })),
      },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "服务器错误" },
      { status: 500 }
    );
  }
}
