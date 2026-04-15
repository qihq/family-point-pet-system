import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, getTokenFromHeader } from "@/lib/auth";

async function ensureParentOrAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = getTokenFromHeader(authHeader) || request.cookies.get("token")?.value || "";
  if (!token) return { ok: false as const, status: 401, error: "未登录" };
  const payload = await verifyToken(token);
  if (!payload) return { ok: false as const, status: 401, error: "登录已失效" };
  if (payload.role !== "parent" && payload.role !== "admin") {
    return { ok: false as const, status: 403, error: "需要家长或管理员权限" };
  }
  return { ok: true as const, payload };
}

export async function GET(request: NextRequest) {
  const auth = await ensureParentOrAdmin(request);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  const { payload } = auth;
  const list = await prisma.recurringTask.findMany({ where: { familyId: payload.familyId }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ success: true, data: list });
}

export async function POST(request: NextRequest) {
  const auth = await ensureParentOrAdmin(request);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  const { payload } = auth;

  let body: any = {};
  const ctype = request.headers.get("content-type") || "";
  if (ctype.includes("application/json")) {
    body = await request.json().catch(() => ({}));
  } else {
    const fd = await request.formData();
    const weekdaysAll = fd.getAll("weekday").map(String);
    body = {
      name: fd.get("name"),
      points: fd.get("points"),
      description: fd.get("description"),
      frequency: fd.get("frequency"),
      weekdays: weekdaysAll.length ? weekdaysAll.map((x: any) => Number(x)) : undefined,
      icon: fd.get("icon"),
    };
  }

  const name = String(body.name || "").trim();
  const points = Number(body.points || 0);
  const frequency = String(body.frequency || "daily").toLowerCase();
  const weekdays = body.weekdays != null ? JSON.stringify(body.weekdays) : null;
  const description = body.description != null ? String(body.description) : undefined;
  const icon = body.icon != null ? String(body.icon) : undefined;

  if (!name || !Number.isFinite(points) || points <= 0) {
    return NextResponse.json({ success: false, error: "name/points 无效" }, { status: 400 });
  }
  if (frequency !== "daily" && frequency !== "weekly") {
    return NextResponse.json({ success: false, error: "frequency 需为 daily/weekly" }, { status: 400 });
  }

  const created = await prisma.recurringTask.create({
    data: { familyId: payload.familyId, name, description, points: Math.floor(points), frequency, weekdays, icon, active: true },
  });
  return NextResponse.json({ success: true, data: created });
}

// codex-ok: 2026-04-10T14:40:00+08:00