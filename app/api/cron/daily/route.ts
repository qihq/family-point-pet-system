export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Frequency } from "@prisma/client";
import { logger } from "@/lib/logger";

function utcDayRange(d = new Date()) {
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth();
  const day = d.getUTCDate();
  const start = new Date(Date.UTC(y, m, day, 0, 0, 0, 0));
  const end = new Date(Date.UTC(y, m, day, 23, 59, 59, 999));
  const key = `${y}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return { start, end, key };
}

function utcWeekdayMon1To7(d = new Date()) {
  // JS: 0=Sun..6=Sat => convert to Mon=1..Sun=7
  const wd = d.getUTCDay();
  return ((wd + 6) % 7) + 1;
}

export async function GET() {
  const { start, end, key } = utcDayRange(new Date());
  let created = 0;
  const tasks = await prisma.recurringTask.findMany({ where: { active: true } });
  const todayWd = utcWeekdayMon1To7(new Date());
  for (const t of tasks) {
    const applies = (() => {
      if (t.frequency === "daily") {
        if (!t.weekdays) return true;
      }
      if (t.frequency === "weekly" || t.weekdays) {
        try {
          const arr = JSON.parse(t.weekdays || "[]");
          if (Array.isArray(arr) && arr.length) {
            return arr.includes(todayWd);
          }
        } catch {}
      }
      return t.frequency === "daily"; // default for daily without weekdays
    })();
    if (!applies) continue;

    const children = await prisma.user.findMany({ where: { role: "child", familyId: t.familyId, isDeleted: false }, select: { id: true } });
    for (const c of children) {
      const exists = await prisma.taskPlan.findFirst({ where: { childId: c.id, title: t.name, scheduledAt: { gte: start, lte: end } }, select: { id: true } });
      if (exists) continue;
      await prisma.taskPlan.create({
        data: {
          childId: c.id,
          title: t.name,
          description: t.description || undefined,
          points: t.points,
          scheduledAt: start,
          frequency: (t.frequency === "weekly" ? Frequency.weekly : Frequency.daily),
          enabled: true,
        },
      });
      created++;
    }
  }
  logger.info("cron/daily", key, "created", created);
  return NextResponse.json({ success: true, date: key, created });
}

// codex-ok: 2026-04-10T14:18:00+08:00