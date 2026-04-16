import { PetStage, Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { hashPin, requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.parent, Role.admin]);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  try {
    const url = new URL(request.url);
    const deletedFlag = url.searchParams.get("deleted");
    const familyId = auth.payload.role === Role.admin ? url.searchParams.get("familyId") || auth.payload.familyId : auth.payload.familyId;
    const deletedFilter = deletedFlag === "all" ? {} : { isDeleted: deletedFlag === "true" };
    const children = await prisma.user.findMany({
      where: { familyId, role: Role.child, ...deletedFilter },
      select: { id: true, name: true, avatarUrl: true, isDeleted: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ success: true, data: children });
  } catch (error: any) {
    console.error("查询孩子列表失败:", error);
    return NextResponse.json({ success: false, error: error.message || "服务异常" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.parent, Role.admin]);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  try {
    const body = await request.json().catch(() => ({}));
    const name = String(body.name || "").trim();
    const pin = body.pin ? String(body.pin).trim() : null;
    if (!name) {
      return NextResponse.json({ success: false, error: "姓名必填" }, { status: 400 });
    }

    const duplicate = await prisma.user.findFirst({ where: { name: { equals: name, mode: "insensitive" } }, select: { id: true } });
    if (duplicate) {
      return NextResponse.json({ success: false, error: "该名字已存在，请更换" }, { status: 409 });
    }

    const child = await prisma.$transaction(async (tx) => {
      const created = await tx.user.create({
        data: {
          name,
          role: Role.child,
          pin: pin ? hashPin(pin) : null,
          familyId: auth.payload.familyId,
        },
      });
      await tx.pointAccount.create({ data: { childId: created.id, balance: 0, totalEarned: 0, totalSpent: 0 } });
      await tx.pet.create({ data: { childId: created.id, name: "小宠", stage: PetStage.baby } });
      return created;
    });

    return NextResponse.json({ success: true, data: { id: child.id, name: child.name } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "创建失败" }, { status: 500 });
  }
}
