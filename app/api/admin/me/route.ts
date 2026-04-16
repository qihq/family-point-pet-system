export const dynamic = "force-dynamic";

import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword, requireRequestAuth, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.admin]);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  const admin = await prisma.user.findUnique({
    where: { id: auth.payload.userId },
    select: { id: true, name: true, avatarUrl: true },
  });
  return NextResponse.json({ success: true, data: admin });
}

export async function PATCH(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.admin]);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  const body = await request.json().catch(() => ({}));
  const data: { name?: string; avatarUrl?: string | null } = {};
  if (body.name != null) data.name = String(body.name).trim();
  if (body.avatarUrl != null) data.avatarUrl = String(body.avatarUrl || "").trim() || null;

  const updated = await prisma.user.update({
    where: { id: auth.payload.userId },
    data,
    select: { id: true, name: true, avatarUrl: true },
  });
  return NextResponse.json({ success: true, data: updated });
}

export async function POST(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.admin]);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  const body = await request.json().catch(() => ({}));
  const oldPassword = String(body.oldPassword || "");
  const newPassword = String(body.newPassword || "").trim();
  if (!newPassword) {
    return NextResponse.json({ success: false, error: "新密码不能为空" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: auth.payload.userId },
    select: { id: true, password: true },
  });
  if (!user) {
    return NextResponse.json({ success: false, error: "用户不存在" }, { status: 404 });
  }
  if (user.password && !verifyPassword(oldPassword, user.password)) {
    return NextResponse.json({ success: false, error: "旧密码不正确" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashPassword(newPassword) },
  });
  return NextResponse.json({ success: true });
}
