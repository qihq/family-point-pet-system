"use server";

import { prisma } from "@/lib/prisma";
import { applyTaskPetGrowth, type PetGrowthResult } from "@/server/services/pet-growth.service";

type Category = "study" | "exercise" | "chore" | string;

function startOfDay(date: Date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function endOfDay(date: Date) {
  const value = new Date(date);
  value.setHours(23, 59, 59, 999);
  return value;
}

function isYesterday(last: Date | null, now = new Date()) {
  if (!last) return false;
  const a = startOfDay(last);
  const b = startOfDay(now);
  return Math.floor((b.getTime() - a.getTime()) / 86400000) === 1;
}

function isToday(last: Date | null, now = new Date()) {
  return !!last && startOfDay(last).getTime() === startOfDay(now).getTime();
}

function weekendMultiplier(date = new Date()) {
  const day = date.getDay();
  return day === 0 || day === 6 ? 1.5 : 1.0;
}

function streakMultiplier(streak: number) {
  if (streak >= 30) return 2.0;
  if (streak >= 7) return 1.5;
  if (streak >= 3) return 1.2;
  return 1.0;
}

function roundPoints(value: number) {
  return Math.max(0, Math.round(value));
}

function categoryTag(category?: Category) {
  return category ? `category=${category}` : "";
}

async function ensurePointAccount(childId: string) {
  let account = await prisma.pointAccount.findUnique({ where: { childId } });
  if (!account) {
    account = await prisma.pointAccount.create({ data: { childId, balance: 0 } });
  }
  return account;
}

async function checkComboBonus(args: { childId: string; date?: Date }) {
  const now = args.date ? new Date(args.date) : new Date();
  const start = startOfDay(now);
  const end = endOfDay(now);

  const [logs, existingCombo] = await Promise.all([
    prisma.taskLog.findMany({
      where: { childId: args.childId, createdAt: { gte: start, lte: end } },
      select: { note: true },
    }),
    prisma.taskLog.findFirst({
      where: {
        childId: args.childId,
        createdAt: { gte: start, lte: end },
        note: { contains: "combo-bonus" },
      },
    }),
  ]);

  if (existingCombo) return { applied: false, bonus: 0 };

  const hasCategory = (category: string) => logs.some((log) => (log.note || "").includes(`category=${category}`));
  if (!(hasCategory("study") && hasCategory("exercise") && hasCategory("chore"))) {
    return { applied: false, bonus: 0 };
  }

  const bonus = 20;
  await prisma.$transaction(async (tx) => {
    await tx.taskLog.create({
      data: { childId: args.childId, points: bonus, note: "combo-bonus", createdAt: now },
    });
    await tx.user.update({
      where: { id: args.childId },
      data: { totalEarnedPoints: { increment: bonus } },
    });
    await tx.pointAccount.update({
      where: { childId: args.childId },
      data: { balance: { increment: bonus }, totalEarned: { increment: bonus } },
    });
  });

  return { applied: true, bonus };
}

async function checkLevelUp(args: { childId: string }) {
  const child = await prisma.user.findUnique({
    where: { id: args.childId },
    select: { totalEarnedPoints: true, level: true },
  });
  if (!child) throw new Error("孩子不存在");

  const thresholds = [100, 300, 600, 1000];
  let targetLevel = 1;
  for (const threshold of thresholds) {
    if ((child.totalEarnedPoints || 0) >= threshold) targetLevel += 1;
  }

  if (targetLevel !== child.level) {
    await prisma.user.update({ where: { id: args.childId }, data: { level: targetLevel } });
  }

  return { level: targetLevel };
}

export async function completeTask(args: {
  childId: string;
  taskPlanId?: string;
  basePoints?: number;
  category?: Category;
  note?: string;
  when?: Date;
}): Promise<{
  points: number;
  appliedMultipliers: { streak: number; weekend: number; first: number };
  comboApplied: boolean;
  comboBonus: number;
  newLevel: number;
  petGrowth: PetGrowthResult;
}> {
  const now = args.when ? new Date(args.when) : new Date();
  const child = await prisma.user.findUnique({ where: { id: args.childId } });
  if (!child) throw new Error("孩子不存在");

  const basePoints =
    typeof args.basePoints === "number"
      ? args.basePoints
      : args.taskPlanId
        ? (await prisma.taskPlan.findUnique({ where: { id: args.taskPlanId }, select: { points: true } }))?.points || 0
        : 0;

  const streakBefore = isYesterday(child.lastCheckIn, now)
    ? child.streak
    : isToday(child.lastCheckIn, now)
      ? child.streak
      : 0;
  const streakMul = streakMultiplier(streakBefore);
  const weekendMul = weekendMultiplier(now);

  let firstMul = 1.0;
  if (args.taskPlanId) {
    const firstLog = await prisma.taskLog.findFirst({
      where: { childId: args.childId, taskPlanId: args.taskPlanId },
      select: { id: true },
    });
    if (!firstLog) firstMul = 2.0;
  }

  const gained = roundPoints(basePoints * streakMul * weekendMul * firstMul);

  await prisma.$transaction(async (tx) => {
    await ensurePointAccount(args.childId);

    const noteParts = [
      categoryTag(args.category),
      `base=${basePoints}`,
      `streakMul=${streakMul}`,
      `weekendMul=${weekendMul}`,
      `firstMul=${firstMul}`,
    ].filter(Boolean);
    if (args.note) noteParts.push(args.note);

    await tx.taskLog.create({
      data: {
        childId: args.childId,
        taskPlanId: args.taskPlanId,
        points: gained,
        note: noteParts.join(";"),
        createdAt: now,
      },
    });

    const nextStreak = isToday(child.lastCheckIn, now)
      ? child.streak
      : isYesterday(child.lastCheckIn, now)
        ? child.streak + 1
        : 1;

    await tx.user.update({
      where: { id: args.childId },
      data: {
        totalEarnedPoints: (child.totalEarnedPoints || 0) + gained,
        lastCheckIn: now,
        streak: nextStreak,
      },
    });

    await tx.pointAccount.update({
      where: { childId: args.childId },
      data: {
        balance: { increment: gained },
        totalEarned: { increment: gained },
      },
    });
  });

  const combo = await checkComboBonus({ childId: args.childId, date: now });
  const level = await checkLevelUp({ childId: args.childId });
  const petGrowth = await applyTaskPetGrowth({
    childId: args.childId,
    points: gained + combo.bonus,
  });

  return {
    points: gained,
    appliedMultipliers: { streak: streakMul, weekend: weekendMul, first: firstMul },
    comboApplied: combo.applied,
    comboBonus: combo.bonus,
    newLevel: level.level,
    petGrowth,
  };
}

export async function deductPoints(args: { childId: string; amount: number; reason?: string; when?: Date }) {
  const now = args.when ? new Date(args.when) : new Date();
  if (args.amount <= 0) return { deducted: 0 };

  const start = startOfDay(now);
  const end = endOfDay(now);
  const [account, aggregate] = await Promise.all([
    ensurePointAccount(args.childId),
    prisma.taskLog.aggregate({
      where: {
        childId: args.childId,
        createdAt: { gte: start, lte: end },
        points: { gt: 0 },
      },
      _sum: { points: true },
    }),
  ]);

  const earnedToday = aggregate._sum.points || 0;
  const maxDeduct = Math.floor(earnedToday * 0.1);
  const deducted = Math.min(args.amount, maxDeduct, account.balance);
  if (deducted <= 0) return { deducted: 0 };

  await prisma.$transaction(async (tx) => {
    await tx.pointAccount.update({
      where: { childId: args.childId },
      data: {
        balance: { decrement: deducted },
        totalSpent: { increment: deducted },
      },
    });
    await tx.taskLog.create({
      data: {
        childId: args.childId,
        points: -deducted,
        note: (`deduct=${deducted};${args.reason || ""}`).trim(),
        createdAt: now,
      },
    });
  });

  const after = await prisma.pointAccount.findUnique({
    where: { childId: args.childId },
    select: { balance: true },
  });

  return { deducted, balance: after?.balance ?? 0 };
}

export { checkComboBonus, checkLevelUp };

export async function getWeeklyCalendar(args: { childId: string; weekStart?: Date | string }) {
  const base = args.weekStart ? new Date(args.weekStart) : new Date();
  const weekday = (base.getDay() + 6) % 7;
  const weekStart = startOfDay(
    new Date(base.getFullYear(), base.getMonth(), base.getDate() - weekday)
  );
  const weekEnd = endOfDay(
    new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6)
  );

  const logs = await prisma.taskLog.findMany({
    where: { childId: args.childId, createdAt: { gte: weekStart, lte: weekEnd } },
    select: { createdAt: true, points: true },
    orderBy: { createdAt: "asc" },
  });

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    return { date: date.toISOString().slice(0, 10), count: 0, points: 0 };
  });

  for (const log of logs) {
    const key = log.createdAt.toISOString().slice(0, 10);
    const day = days.find((entry) => entry.date === key);
    if (!day) continue;
    day.count += 1;
    day.points += log.points || 0;
  }

  return { weekStart: days[0].date, days };
}
