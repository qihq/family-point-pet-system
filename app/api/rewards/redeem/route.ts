import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { Role, SourceType } from "@prisma/client";
import { requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { spendPoints } from "@/server/services/points.service";

export async function POST(request: NextRequest) {
  try {
    const auth = await requireRequestAuth(request, [Role.parent, Role.child, Role.admin]);
    if (!auth.ok) {
      return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    }

    const { payload } = auth;
    const body = await request.json().catch(() => ({}));

    const rewardItemId = String(body.rewardItemId || "");
    const quantity = Math.max(1, Number(body.quantity || 1));
    let childId: string | undefined = body.childId ? String(body.childId) : undefined;
    if (payload.role === Role.child) childId = payload.userId;

    if (!rewardItemId || !childId) {
      return NextResponse.json({ success: false, error: "缺少必要参数" }, { status: 400 });
    }

    const [item, child] = await Promise.all([
      prisma.rewardItem.findUnique({ where: { id: rewardItemId } }),
      prisma.user.findUnique({ where: { id: childId }, select: { id: true, familyId: true } }),
    ]);

    if (!item || !item.enabled) {
      return NextResponse.json({ success: false, error: "奖品不存在或已停用" }, { status: 404 });
    }
    if (!child) {
      return NextResponse.json({ success: false, error: "孩子不存在" }, { status: 404 });
    }
    if (payload.role === Role.parent && child.familyId !== payload.familyId) {
      return NextResponse.json({ success: false, error: "无权为其他家庭兑换奖励" }, { status: 403 });
    }

    const cost = item.cost * quantity;

    const result = await prisma.$transaction(async (tx) => {
      if (item.stock != null) {
        const fresh = await tx.rewardItem.findUnique({
          where: { id: item.id },
          select: { stock: true },
        });
        const left = fresh?.stock ?? 0;
        if (left < quantity) throw new Error("库存不足");

        await tx.rewardItem.update({
          where: { id: item.id },
          data: { stock: left - quantity },
        });
      }

      const spend = await spendPoints({
        childId: child.id,
        amount: cost,
        sourceType: SourceType.manual,
        description: `兑换奖品：${item.name} x${quantity}`,
      });

      const log = await tx.redeemLog.create({
        data: {
          childId: child.id,
          rewardItemId: item.id,
          quantity,
          pointsSpent: cost,
          note: body.note || null,
        },
      });

      return { spend, log };
    });

    revalidateTag(`child-stats-${child.id}`);
    return NextResponse.json({
      success: true,
      data: { balance: result.spend.balance, redeem: result.log },
    });
  } catch (caught: any) {
    const message = String(caught?.message || "兑换失败");
    if (message.includes("库存不足")) {
      return NextResponse.json({ success: false, error: "库存不足" }, { status: 409 });
    }
    if (message.includes("余额不足") || message.includes("积分不足")) {
      return NextResponse.json({ success: false, error: "积分不足" }, { status: 409 });
    }
    return NextResponse.json({ success: false, error: "兑换失败" }, { status: 400 });
  }
}
