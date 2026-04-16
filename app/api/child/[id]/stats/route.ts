import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { planOccursOnDate } from "@/lib/task-progress";

function utcDayRangeDays(days: number) {
  const end = new Date();
  const y = end.getUTCFullYear();
  const m = end.getUTCMonth();
  const d = end.getUTCDate();
  const endUtc = new Date(Date.UTC(y, m, d, 23, 59, 59, 999));
  const startUtc = new Date(endUtc.getTime() - (days - 1) * 86400000);
  const dates: string[] = [];

  for (let i = 0; i < days; i += 1) {
    const current = new Date(startUtc.getTime() + i * 86400000);
    dates.push(
      `${current.getUTCFullYear()}-${String(current.getUTCMonth() + 1).padStart(2, "0")}-${String(
        current.getUTCDate()
      ).padStart(2, "0")}`
    );
  }

  return { startUtc, endUtc, dates };
}

function utcWeekRange(now = new Date()) {
  const weekday = (now.getUTCDay() + 6) % 7;
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
  start.setUTCDate(start.getUTCDate() - weekday);
  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 6);
  end.setUTCHours(23, 59, 59, 999);
  return { start, end };
}

function utcMonthRange(now = new Date()) {
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0));
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999));
  return { start, end };
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
    const { startUtc, endUtc, dates } = utcDayRangeDays(days);

    const [earnedLogs, allEarn, monthEarn, weekEarn, plans, completedLogs, redeems] = await Promise.all([
      prisma.taskLog.findMany({
        where: { childId, points: { gt: 0 }, createdAt: { gte: startUtc, lte: endUtc } },
        select: { createdAt: true, points: true },
      }),
      prisma.taskLog.aggregate({
        where: { childId, points: { gt: 0 } },
        _sum: { points: true },
      }),
      prisma.taskLog.aggregate({
        where: { childId, points: { gt: 0 }, createdAt: { gte: utcMonthRange().start, lte: utcMonthRange().end } },
        _sum: { points: true },
      }),
      prisma.taskLog.aggregate({
        where: { childId, points: { gt: 0 }, createdAt: { gte: utcWeekRange().start, lte: utcWeekRange().end } },
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
          createdAt: { gte: startUtc, lte: endUtc },
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
      const key = `${log.createdAt.getUTCFullYear()}-${String(log.createdAt.getUTCMonth() + 1).padStart(2, "0")}-${String(
        log.createdAt.getUTCDate()
      ).padStart(2, "0")}`;
      dailyMap.set(key, (dailyMap.get(key) || 0) + (log.points || 0));
    }

    let expectedCount = 0;
    for (let offset = 0; offset < days; offset += 1) {
      const currentDay = new Date(startUtc.getTime() + offset * 86400000);
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
      const dateKey = log.createdAt.toISOString().slice(0, 10);
      completedKeys.add(`${log.taskPlanId}-${dateKey}`);
    }

    return NextResponse.json({
      success: true,
      data: {
        series: dates.map((date) => ({ date, points: dailyMap.get(date) || 0 })),
        stats: {
          week: weekEarn._sum.points || 0,
          month: monthEarn._sum.points || 0,
          total: allEarn._sum.points || 0,
        },
        donut: {
          completed: completedKeys.size,
          todo: Math.max(0, expectedCount - completedKeys.size),
        },
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
