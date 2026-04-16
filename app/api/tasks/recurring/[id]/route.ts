import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireRequestAuth(request, [Role.parent, Role.admin]);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  const body = await request.json().catch(() => ({}));
  const existing = await prisma.recurringTask.findFirst({
    where: { id: params.id, familyId: auth.payload.familyId },
  });
  if (!existing) {
    return NextResponse.json({ success: false, error: "周期任务不存在" }, { status: 404 });
  }

  const updated = await prisma.recurringTask.update({
    where: { id: existing.id },
    data: {
      active: body.active != null ? Boolean(body.active) : undefined,
      name: body.name != null ? String(body.name).trim() : undefined,
      description: body.description != null ? String(body.description).trim() || null : undefined,
      points: body.points != null ? Math.max(1, Number(body.points)) : undefined,
      frequency: body.frequency != null ? String(body.frequency) : undefined,
      weekdays: body.weekdays != null ? JSON.stringify(body.weekdays) : undefined,
    },
  });

  return NextResponse.json({ success: true, data: updated });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireRequestAuth(request, [Role.parent, Role.admin]);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  const existing = await prisma.recurringTask.findFirst({
    where: { id: params.id, familyId: auth.payload.familyId },
    select: { id: true },
  });
  if (!existing) {
    return NextResponse.json({ success: false, error: "周期任务不存在" }, { status: 404 });
  }

  await prisma.recurringTask.delete({ where: { id: existing.id } });
  return NextResponse.json({ success: true });
}
