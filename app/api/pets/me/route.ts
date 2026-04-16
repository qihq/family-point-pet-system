export const dynamic = "force-dynamic";

import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

export async function GET(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.parent, Role.child, Role.admin]);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  try {
    const childIdParam = new URL(request.url).searchParams.get("childId") || undefined;
    const childId = auth.payload.role === Role.child ? auth.payload.userId : childIdParam;
    if (!childId) return NextResponse.json({ success: false, error: "缺少 childId" }, { status: 400 });

    if (auth.payload.role === Role.parent) {
      const child = await prisma.user.findFirst({
        where: { id: childId, role: Role.child, familyId: auth.payload.familyId },
        select: { id: true },
      });
      if (!child) return NextResponse.json({ success: false, error: "越权访问" }, { status: 403 });
    }

    let account = await prisma.pointAccount.findUnique({ where: { childId } });
    if (!account) account = await prisma.pointAccount.create({ data: { childId, balance: 0 } });

    let pet = await prisma.pet.findUnique({ where: { childId } });
    if (!pet) {
      pet = await prisma.pet.create({ data: { childId, name: "小暖暖" } });
    }

    const now = new Date();
    const lastDecay = new Date(pet.lastDecayAt || pet.updatedAt || now);
    const hours = Math.floor((now.getTime() - lastDecay.getTime()) / 3600000);
    if (hours > 0) {
      pet = await prisma.pet.update({
        where: { id: pet.id },
        data: {
          hunger: clamp(pet.hunger - Math.min(100, hours * 3)),
          thirst: clamp(pet.thirst - Math.min(100, hours * 4)),
          cleanliness: clamp(pet.cleanliness - Math.min(100, hours * 2)),
          mood: clamp(pet.mood - Math.min(100, Math.floor(hours * 1.5))),
          health: clamp(pet.health - Math.floor(hours / 4)),
          lastDecayAt: now,
        },
      });
    }

    return NextResponse.json({ success: true, data: { pet, account } });
  } catch (error: any) {
    console.error("获取宠物信息失败:", error);
    return NextResponse.json({ success: false, error: error.message || "获取宠物信息失败" }, { status: 500 });
  }
}
