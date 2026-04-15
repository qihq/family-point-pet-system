import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, getTokenFromHeader } from "@/lib/auth";

function utcDayRangeDays(days: number) {
  const end = new Date();
  const y = end.getUTCFullYear(), m = end.getUTCMonth(), d = end.getUTCDate();
  const endUtc = new Date(Date.UTC(y, m, d, 23, 59, 59, 999));
  const startUtc = new Date(endUtc.getTime() - (days - 1) * 86400000);
  const dates: string[] = [];
  for (let i = 0; i < days; i++) {
    const t = new Date(startUtc.getTime() + i * 86400000);
    const key = `${t.getUTCFullYear()}-${String(t.getUTCMonth() + 1).padStart(2, "0")}-${String(t.getUTCDate()).padStart(2, "0")}`;
    dates.push(key);
  }
  return { startUtc, endUtc, dates };
}

function utcWeekRange(now = new Date()) {
  const wd = (now.getUTCDay() + 6) % 7; // 0..6 Mon..Sun offset
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
  start.setUTCDate(start.getUTCDate() - wd);
  const end = new Date(start); end.setUTCDate(start.getUTCDate() + 6); end.setUTCHours(23,59,59,999);
  return { start, end };
}

function utcMonthRange(now = new Date()) {
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0));
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999));
  return { start, end };
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = getTokenFromHeader(authHeader) || request.cookies.get("token")?.value || "";
    if (!token) return NextResponse.json({ success: false, error: "未登录" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ success: false, error: "登录已失效" }, { status: 401 });

    const childId = params.id;
    if (payload.role === "child" && payload.userId !== childId) {
      return NextResponse.json({ success: false, error: "无权限" }, { status: 403 });
    }
    if (payload.role === "parent") {
      const child = await prisma.user.findUnique({ where: { id: childId }, select: { familyId: true } });
      if (!child || child.familyId !== payload.familyId) return NextResponse.json({ success: false, error: "无权限" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const range = String(searchParams.get("range") || "14d");
    const days = Math.max(1, parseInt(range)) || 14;
    const { startUtc, endUtc, dates } = utcDayRangeDays(days);

    // Earned points per day from PointTransaction
    const txs = await prisma.taskLog.findMany({ where: { childId, points: { gt: 0 }, createdAt: { gte: startUtc, lte: endUtc } }, select: { createdAt: true, points: true } });
    const dailyMap = new Map<string, number>();
    for (const k of dates) dailyMap.set(k, 0);
    for (const t of txs) {
      const dt = t.createdAt;
      const key = `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, "0")}-${String(dt.getUTCDate()).padStart(2, "0")}`;
      dailyMap.set(key, (dailyMap.get(key) || 0) + (t.points || 0));
    }
    const series = dates.map((d) => ({ date: d, points: dailyMap.get(d) || 0 }));

    const { start: wStart, end: wEnd } = utcWeekRange();
    const { start: mStart, end: mEnd } = utcMonthRange();
    const [weekEarn, monthEarn, allEarn] = await Promise.all([
      prisma.taskLog.aggregate({ where: { childId, points: { gt: 0 }, createdAt: { gte: wStart, lte: wEnd } }, _sum: { points: true } }),
      prisma.taskLog.aggregate({ where: { childId, points: { gt: 0 }, createdAt: { gte: mStart, lte: mEnd } }, _sum: { points: true } }),
      prisma.taskLog.aggregate({ where: { childId, points: { gt: 0 } }, _sum: { points: true } }),
    ]);

    // Completed vs todo within range using TaskPlan & TaskLog
    const plans = await prisma.taskPlan.findMany({ where: { childId, scheduledAt: { gte: startUtc, lte: endUtc } }, select: { id: true } });
    const planIds = new Set(plans.map((p) => p.id));
    const logs = await prisma.taskLog.findMany({ where: { childId, createdAt: { gte: startUtc, lte: endUtc }, taskPlanId: { not: null }, points: { gt: 0 } }, select: { taskPlanId: true } });
    const completedIds = new Set(logs.map((l) => l.taskPlanId || ""));
    let completedCount = 0; for (const id of completedIds) if (planIds.has(id)) completedCount++;
    const uncompletedCount = Math.max(0, plans.length - completedCount);

    const redeems = await prisma.redeemLog.findMany({ where: { childId }, orderBy: { createdAt: "desc" }, take: 10, include: { rewardItem: { select: { name: true } } } });

    return NextResponse.json({
      success: true,
      data: {
        series,
        stats: {
          week: (weekEarn._sum.points || 0),
          month: (monthEarn._sum.points || 0),
          total: (allEarn._sum.points || 0),
        },
        donut: { completed: completedCount, todo: uncompletedCount },
        redeems: redeems.map((r) => ({ id: r.id, name: r.rewardItem?.name || "", pointsSpent: r.pointsSpent, quantity: r.quantity, createdAt: r.createdAt.toISOString() })),
      },
    });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || "服务器错误" }, { status: 500 });
  }
}

// codex-ok: 2026-04-13T17:46:13.4761629+08:00
// codex-ok: 2026-04-13T17:46:13.4761629+08:00
