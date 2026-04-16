import { Frequency } from "@prisma/client";

export type TaskProgressStatus = "idle" | "pending" | "done";

type PlanLike = {
  id: string;
  frequency?: Frequency | null;
  scheduledAt?: Date | null;
};

type LogLike = {
  taskPlanId?: string | null;
  createdAt: Date;
  note?: string | null;
  points?: number | null;
};

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
}

function endOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}

function startOfWeek(date: Date) {
  const weekday = (date.getDay() + 6) % 7;
  const start = startOfDay(date);
  start.setDate(start.getDate() - weekday);
  return start;
}

function endOfWeek(date: Date) {
  const end = startOfWeek(date);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

export function getTaskWindow(frequency?: Frequency | null, now = new Date()) {
  switch (frequency) {
    case "weekly":
      return { start: startOfWeek(now), end: endOfWeek(now) };
    case "monthly":
      return { start: startOfMonth(now), end: endOfMonth(now) };
    case "daily":
    case "once":
    case "unlimited":
    case null:
    case undefined:
    default:
      return { start: startOfDay(now), end: endOfDay(now) };
  }
}

export function resolveTaskProgressStatus(logs: LogLike[]): TaskProgressStatus {
  if (logs.length === 0) {
    return "idle";
  }

  const latest = [...logs].sort((left, right) => right.createdAt.getTime() - left.createdAt.getTime())[0];
  const note = latest.note || "";

  if (note.includes("pending-approval")) {
    return "pending";
  }

  if (note.startsWith("rejected")) {
    return "idle";
  }

  return "done";
}

export function buildTaskProgressMap(plans: PlanLike[], logs: LogLike[], now = new Date()) {
  const logMap = new Map<string, LogLike[]>();

  for (const log of logs) {
    if (!log.taskPlanId) {
      continue;
    }
    const current = logMap.get(log.taskPlanId) || [];
    current.push(log);
    logMap.set(log.taskPlanId, current);
  }

  const statusMap: Record<string, TaskProgressStatus> = {};

  for (const plan of plans) {
    const window = getTaskWindow(plan.frequency, now);
    const relevantLogs = (logMap.get(plan.id) || []).filter(
      (log) => log.createdAt >= window.start && log.createdAt <= window.end
    );
    statusMap[plan.id] = resolveTaskProgressStatus(relevantLogs);
  }

  return statusMap;
}

export function planOccursOnDate(
  plan: Pick<PlanLike, "frequency" | "scheduledAt">,
  date: Date
) {
  const target = startOfDay(date);

  switch (plan.frequency) {
    case "daily":
      return true;
    case "weekly": {
      const scheduled = plan.scheduledAt ? new Date(plan.scheduledAt) : null;
      const weekday = scheduled ? scheduled.getDay() : 1;
      return target.getDay() === weekday;
    }
    case "monthly": {
      const scheduled = plan.scheduledAt ? new Date(plan.scheduledAt) : null;
      const dayOfMonth = scheduled ? scheduled.getDate() : 1;
      return target.getDate() === dayOfMonth;
    }
    case "once":
      return plan.scheduledAt ? startOfDay(new Date(plan.scheduledAt)).getTime() === target.getTime() : false;
    case "unlimited":
    case null:
    case undefined:
    default:
      return false;
  }
}
