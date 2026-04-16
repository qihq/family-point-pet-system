export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const auth = await requireRequestAuth(request);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: auth.payload.userId },
      select: { id: true, name: true, role: true, familyId: true, avatarUrl: true },
    });
    if (!user) {
      return NextResponse.json({ success: false, error: "用户不存在" }, { status: 404 });
    }
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("查询当前用户失败:", error);
    return NextResponse.json({ success: false, error: "查询当前用户失败" }, { status: 500 });
  }
}
