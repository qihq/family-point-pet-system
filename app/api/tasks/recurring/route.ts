import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function parseBody(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return request.json().catch(() => ({}));
  }

  const form = await request.formData();
  const weekdays = form.getAll("weekday").map((value) => Number(value));
  return {
    name: form.get("name"),
    points: form.get("points"),
    description: form.get("description"),
    frequency: form.get("frequency"),
    weekdays: weekdays.length ? weekdays : undefined,
    icon: form.get("icon"),
  };
}

export async function GET(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.parent, Role.admin]);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  const list = await prisma.recurringTask.findMany({
    where: { familyId: auth.payload.familyId },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ success: true, data: list });
}

export async function POST(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.parent, Role.admin]);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  const body = await parseBody(request);
  const name = String(body.name || "").trim();
  const points = Number(body.points || 0);
  const frequency = String(body.frequency || "daily").toLowerCase();
  const weekdays = Array.isArray(body.weekdays) && body.weekdays.length ? JSON.stringify(body.weekdays) : null;

  if (!name || !Number.isFinite(points) || points <= 0) {
    return NextResponse.json({ success: false, error: "name/points 无效" }, { status: 400 });
  }
  if (frequency !== "daily" && frequency !== "weekly") {
    return NextResponse.json({ success: false, error: "frequency 需要为 daily/weekly" }, { status: 400 });
  }

  const created = await prisma.recurringTask.create({
    data: {
      familyId: auth.payload.familyId,
      name,
      description: body.description != null ? String(body.description) : undefined,
      points: Math.floor(points),
      frequency,
      weekdays,
      icon: body.icon != null ? String(body.icon) : undefined,
      active: true,
    },
  });
  return NextResponse.json({ success: true, data: created });
}
