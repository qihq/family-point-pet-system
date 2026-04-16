import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.parent, Role.admin]);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  const rows = await prisma.taskLog.findMany({
    where: {
      note: { contains: "pending-approval" },
      child: auth.payload.role === Role.admin ? undefined : { familyId: auth.payload.familyId },
    },
    include: {
      taskPlan: { select: { title: true, points: true } },
      child: { select: { id: true, name: true, avatarUrl: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    success: true,
    data: rows.map((row) => ({
      id: row.id,
      createdAt: row.createdAt,
      child: row.child,
      taskPlan: row.taskPlan,
      pointsPreview: row.taskPlan?.points ?? 0,
    })),
  });
}
