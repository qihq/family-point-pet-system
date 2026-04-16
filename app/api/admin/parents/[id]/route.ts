import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword, requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireRequestAuth(request, [Role.admin]);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  try {
    const user = await prisma.user.findFirst({
      where: { id: params.id, role: Role.parent },
      select: { id: true, name: true, familyId: true, createdAt: true },
    });
    if (!user) return NextResponse.json({ success: false, error: "家长不存在" }, { status: 404 });
    return NextResponse.json({ success: true, data: user });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "服务器异常" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireRequestAuth(request, [Role.admin]);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  try {
    const body = await request.json().catch(() => ({}));
    const name = body.name != null ? String(body.name).trim() : undefined;
    const password = body.password != null ? String(body.password).trim() : undefined;

    const existing = await prisma.user.findFirst({
      where: { id: params.id, role: Role.parent },
      select: { id: true },
    });
    if (!existing) return NextResponse.json({ success: false, error: "家长不存在" }, { status: 404 });

    if (name) {
      const duplicate = await prisma.user.findFirst({
        where: { id: { not: params.id }, name: { equals: name, mode: "insensitive" } },
        select: { id: true },
      });
      if (duplicate) {
        return NextResponse.json({ success: false, error: "用户名已存在" }, { status: 409 });
      }
    }

    const updated = await prisma.user.update({
      where: { id: params.id },
      data: {
        name: name ?? undefined,
        password: password ? hashPassword(password) : undefined,
      },
      select: { id: true, name: true },
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "服务器异常" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireRequestAuth(request, [Role.admin]);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  try {
    const existing = await prisma.user.findFirst({
      where: { id: params.id, role: Role.parent },
      select: { id: true },
    });
    if (!existing) return NextResponse.json({ success: false, error: "家长不存在" }, { status: 404 });

    await prisma.user.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "服务器异常" }, { status: 500 });
  }
}
