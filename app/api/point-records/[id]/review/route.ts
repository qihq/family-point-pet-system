import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { RecordStatus, Role, TransactionType } from "@prisma/client";
import { requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendReviewOutcomeNotificationToChild } from "@/lib/webpush";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await requireRequestAuth(request, [Role.parent, Role.admin]);
    if (!auth.ok) {
      return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    }

    const body = await request.json().catch(() => ({}));
    const action = String(body.action || "");

    const record = await prisma.pointRecord.findUnique({
      where: { id: params.id },
      include: { child: true, pointRule: true },
    });

    if (!record) {
      return NextResponse.json({ success: false, error: "记录不存在" }, { status: 404 });
    }
    if (auth.payload.role === Role.parent && record.child.familyId !== auth.payload.familyId) {
      return NextResponse.json({ success: false, error: "越权操作" }, { status: 403 });
    }

    if (action === "reject") {
      const updated = await prisma.pointRecord.update({
        where: { id: record.id },
        data: {
          status: RecordStatus.rejected,
          reviewedAt: new Date(),
          reviewNote: body.reason || "",
        },
      });

      void sendReviewOutcomeNotificationToChild({
        childId: record.childId,
        title: `积分申请「${record.pointRule?.name || "未命名规则"}」`,
        approved: false,
        url: "/child/records?tab=records&status=rejected",
        tag: "review-rule-result",
      });

      return NextResponse.json({ success: true, data: { record: updated } });
    }

    if (action === "approve") {
      const points = Math.max(1, Number(body.points || 0));
      if (!Number.isFinite(points) || points <= 0) {
        return NextResponse.json({ success: false, error: "积分必须为正整数" }, { status: 400 });
      }

      const result = await prisma.$transaction(async (tx) => {
        const updated = await tx.pointRecord.update({
          where: { id: record.id },
          data: {
            status: RecordStatus.approved,
            points,
            reviewedAt: new Date(),
            reviewNote: "家长通过",
          },
        });

        let account = await tx.pointAccount.findUnique({ where: { childId: record.childId } });
        if (!account) {
          account = await tx.pointAccount.create({ data: { childId: record.childId, balance: 0 } });
        }

        const newBalance = account.balance + points;
        await tx.pointTransaction.create({
          data: {
            accountId: account.id,
            type: TransactionType.earn,
            amount: points,
            balanceAfter: newBalance,
            sourceType: "task" as any,
            description: `家长审核：${record.pointRule?.name || ""}`,
          },
        });
        await tx.pointAccount.update({
          where: { id: account.id },
          data: {
            balance: newBalance,
            totalEarned: (account.totalEarned || 0) + points,
          },
        });

        return { updated, balance: newBalance };
      });

      await prisma.taskLog.create({
        data: {
          childId: record.childId,
          points,
          note: `rule-approve;rule=${String(record.pointRuleId || "")}`,
        },
      });
      await prisma.user.update({
        where: { id: record.childId },
        data: { totalEarnedPoints: { increment: points } },
      });

      void sendReviewOutcomeNotificationToChild({
        childId: record.childId,
        title: `积分申请「${record.pointRule?.name || "未命名规则"}」`,
        approved: true,
        points,
        url: "/child/records?tab=records&status=approved",
        tag: "review-rule-result",
      });

      revalidateTag(`child-stats-${record.childId}`);
      return NextResponse.json({ success: true, data: { record: result.updated, balance: result.balance } });
    }

    return NextResponse.json({ success: false, error: "不支持的动作" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "服务器错误" }, { status: 500 });
  }
}
