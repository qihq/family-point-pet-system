import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireRequestAuth } from "@/lib/auth";
import { generateRecurringTasksForDate } from "@/server/services/recurring-task.service";

export async function POST(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.parent, Role.admin]);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  const body = await request.json().catch(() => ({}));
  const targetDate = body.date ? new Date(String(body.date)) : new Date();

  const result = await generateRecurringTasksForDate({
    date: targetDate,
    familyId: auth.payload.familyId,
  });

  return NextResponse.json({ success: true, data: result });
}
