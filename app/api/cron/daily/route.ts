export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { generateRecurringTasksForDate } from "@/server/services/recurring-task.service";

export async function GET() {
  const result = await generateRecurringTasksForDate();
  logger.info("cron/daily", result.dateKey, "created", result.created);
  return NextResponse.json({ success: true, date: result.dateKey, created: result.created });
}
