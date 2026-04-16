import { Frequency } from "@prisma/client";
import { prisma } from "@/lib/prisma";

function utcDayRange(date = new Date()) {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth();
  const d = date.getUTCDate();
  const start = new Date(Date.UTC(y, m, d, 0, 0, 0, 0));
  const end = new Date(Date.UTC(y, m, d, 23, 59, 59, 999));
  const key = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  return { start, end, key };
}

function utcWeekdayMon1To7(date = new Date()) {
  return ((date.getUTCDay() + 6) % 7) + 1;
}

export function recurringTaskAppliesOnDate(
  task: { frequency: string; weekdays: string | null },
  date = new Date()
) {
  if (task.frequency === "daily" && !task.weekdays) return true;

  if (task.frequency === "weekly" || task.weekdays) {
    try {
      const days = JSON.parse(task.weekdays || "[]");
      if (Array.isArray(days) && days.length) {
        return days.includes(utcWeekdayMon1To7(date));
      }
    } catch {}
  }

  return task.frequency === "daily";
}

export async function generateRecurringTasksForDate(args?: { date?: Date; familyId?: string }) {
  const targetDate = args?.date ?? new Date();
  const { start, end, key } = utcDayRange(targetDate);
  let created = 0;

  const recurringTasks = await prisma.recurringTask.findMany({
    where: {
      active: true,
      familyId: args?.familyId,
    },
    orderBy: { createdAt: "desc" },
  });

  for (const task of recurringTasks) {
    if (!recurringTaskAppliesOnDate(task, targetDate)) continue;

    const children = await prisma.user.findMany({
      where: { role: "child", familyId: task.familyId, isDeleted: false },
      select: { id: true },
    });

    for (const child of children) {
      const exists = await prisma.taskPlan.findFirst({
        where: {
          childId: child.id,
          title: task.name,
          scheduledAt: { gte: start, lte: end },
        },
        select: { id: true },
      });
      if (exists) continue;

      await prisma.taskPlan.create({
        data: {
          childId: child.id,
          title: task.name,
          description: task.description || undefined,
          points: task.points,
          scheduledAt: start,
          frequency: task.frequency === "weekly" ? Frequency.weekly : Frequency.daily,
          enabled: true,
          needApproval: true,
        },
      });
      created += 1;
    }
  }

  return { dateKey: key, created };
}
