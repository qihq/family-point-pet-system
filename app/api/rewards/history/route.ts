import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.parent, Role.child, Role.admin]);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  const url = new URL(request.url);
  const childIdParam = url.searchParams.get("childId");
  const rewardItemId = url.searchParams.get("rewardItemId");
  const limit = Math.max(1, Number(url.searchParams.get("limit") || 20));

  let childIds: string[] = [];
  if (auth.payload.role === Role.child) {
    childIds = [auth.payload.userId];
  } else if (childIdParam && childIdParam !== "all") {
    childIds = [childIdParam];
  } else {
    const children = await prisma.user.findMany({
      where: { familyId: auth.payload.familyId, role: Role.child, isDeleted: false },
      select: { id: true },
    });
    childIds = children.map((child) => child.id);
  }

  if (!childIds.length) {
    return NextResponse.json({
      success: true,
      data: { logs: [], summary: { totalRedeems: 0, totalPointsSpent: 0, totalQuantity: 0, byReward: [] } },
    });
  }

  const logs = await prisma.redeemLog.findMany({
    where: {
      childId: { in: childIds },
      rewardItemId: rewardItemId || undefined,
      rewardItem: auth.payload.role === Role.admin ? undefined : { familyId: auth.payload.familyId },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      child: { select: { id: true, name: true } },
      rewardItem: { select: { id: true, name: true } },
    },
  });

  const byReward = new Map<string, { rewardItemId: string; rewardName: string; quantity: number; pointsSpent: number }>();
  let totalQuantity = 0;
  let totalPointsSpent = 0;

  for (const log of logs) {
    totalQuantity += log.quantity;
    totalPointsSpent += log.pointsSpent;
    const current = byReward.get(log.rewardItemId) || {
      rewardItemId: log.rewardItemId,
      rewardName: log.rewardItem.name,
      quantity: 0,
      pointsSpent: 0,
    };
    current.quantity += log.quantity;
    current.pointsSpent += log.pointsSpent;
    byReward.set(log.rewardItemId, current);
  }

  return NextResponse.json({
    success: true,
    data: {
      logs: logs.map((log) => ({
        id: log.id,
        createdAt: log.createdAt,
        quantity: log.quantity,
        pointsSpent: log.pointsSpent,
        note: log.note,
        childId: log.childId,
        childName: log.child.name,
        rewardItemId: log.rewardItemId,
        rewardName: log.rewardItem.name,
      })),
      summary: {
        totalRedeems: logs.length,
        totalPointsSpent,
        totalQuantity,
        byReward: Array.from(byReward.values()).sort((a, b) => b.quantity - a.quantity),
      },
    },
  });
}
