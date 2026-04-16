import { Role, SourceType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { earnPoints } from "@/server/services/points.service";

function childWhere(role: Role, familyId: string, childId: string) {
  return role === Role.admin ? { id: childId, role: Role.child } : { id: childId, role: Role.child, familyId };
}

export async function POST(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.parent, Role.admin]);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  try {
    const body = await request.json().catch(() => ({}));
    const childId = String(body.childId || "");
    const amount = Number(body.amount || 0);
    const reason = String(body.reason || "手动加分");

    if (!childId || !Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ success: false, error: "childId 和 amount 必填" }, { status: 400 });
    }

    const child = await prisma.user.findFirst({ where: childWhere(auth.payload.role, auth.payload.familyId, childId), select: { id: true } });
    if (!child) {
      return NextResponse.json({ success: false, error: "无权操作该孩子" }, { status: 403 });
    }

    const result = await earnPoints({ childId, amount, sourceType: SourceType.manual, description: reason });
    return NextResponse.json({ success: true, message: "已加分", data: result });
  } catch (error: any) {
    console.error("手动加分失败", error);
    return NextResponse.json({ success: false, error: error.message || "操作失败" }, { status: 500 });
  }
}
