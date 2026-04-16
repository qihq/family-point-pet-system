import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword, requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.admin]);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  try {
    const search = new URL(request.url).searchParams.get("q")?.trim();
    const list = await prisma.user.findMany({
      where: { role: Role.parent, name: search ? { contains: search, mode: "insensitive" } : undefined },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, familyId: true, avatarUrl: true, createdAt: true },
    });
    return NextResponse.json({ success: true, data: list });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "服务器异常" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.admin]);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  try {
    const body = await request.json().catch(() => ({}));
    const name = String(body.name || "").trim();
    const password = String(body.password || "").trim();
    let familyId = String(body.familyId || "").trim();

    if (!name || !password) {
      return NextResponse.json({ success: false, error: "name/password 必填" }, { status: 400 });
    }

    const duplicate = await prisma.user.findFirst({ where: { name: { equals: name, mode: "insensitive" } }, select: { id: true } });
    if (duplicate) {
      return NextResponse.json({ success: false, error: "用户名已存在" }, { status: 409 });
    }

    if (!familyId) {
      const family = await prisma.family.create({ data: { name: `${name} 的家庭` } });
      familyId = family.id;
    }

    const created = await prisma.user.create({
      data: { name, password: hashPassword(password), role: Role.parent, familyId },
      select: { id: true, name: true, familyId: true },
    });
    return NextResponse.json({ success: true, data: created });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "服务器异常" }, { status: 500 });
  }
}
