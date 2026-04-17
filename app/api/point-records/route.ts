import { NextRequest, NextResponse } from "next/server";
import { RecordStatus, Role, SourceType, TransactionType } from "@prisma/client";
import { requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendReviewNotificationToFamily } from "@/lib/webpush";

function dayRange(date: Date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

function weekRange(date: Date) {
  const weekday = (date.getDay() + 6) % 7;
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - weekday);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

function monthRange(date: Date) {
  return {
    start: new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0),
    end: new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999),
  };
}

async function countChildrenForParent(familyId: string) {
  const children = await prisma.user.findMany({
    where: { familyId, role: Role.child },
    select: { id: true },
  });
  return children.map((child) => child.id);
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireRequestAuth(request, [Role.child]);
    if (!auth.ok) {
      return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    }

    const body = await request.json().catch(() => ({}));
    const ruleId = String(body.pointRuleId || "");
    if (!ruleId) {
      return NextResponse.json({ success: false, error: "缺少 pointRuleId" }, { status: 400 });
    }

    const [rule, child] = await Promise.all([
      prisma.pointRule.findUnique({
        where: { id: ruleId },
        include: { targets: true },
      }),
      prisma.user.findUnique({
        where: { id: auth.payload.userId },
        select: { familyId: true, name: true },
      }),
    ]);

    if (!rule) {
      return NextResponse.json({ success: false, error: "规则不存在" }, { status: 404 });
    }
    if (!child || child.familyId !== rule.familyId) {
      return NextResponse.json({ success: false, error: "越权提交" }, { status: 403 });
    }
    if (!rule.enabled) {
      return NextResponse.json({ success: false, error: "规则已禁用" }, { status: 400 });
    }
    if (rule.targets.length > 0 && !rule.targets.some((target) => target.childId === auth.payload.userId)) {
      return NextResponse.json({ success: false, error: "规则未对该孩子开放" }, { status: 403 });
    }

    const now = new Date();
    const maxTimes = rule.maxTimes == null ? 1 : Number(rule.maxTimes);
    let range: { start: Date; end: Date } | null = null;
    let limitLabel = "";

    if (rule.frequency === "once") {
      const count = await prisma.pointRecord.count({
        where: {
          childId: auth.payload.userId,
          pointRuleId: ruleId,
          status: { in: [RecordStatus.pending, RecordStatus.approved] },
        },
      });
      const limit = Number.isFinite(maxTimes) ? Math.max(1, maxTimes) : 1;
      if (count >= limit) {
        return NextResponse.json({ success: false, error: `该规则最多可提交 ${limit} 次` }, { status: 400 });
      }
    } else if (rule.frequency === "daily") {
      range = dayRange(now);
      limitLabel = "本日";
    } else if (rule.frequency === "weekly") {
      range = weekRange(now);
      limitLabel = "本周";
    } else if (rule.frequency === "monthly") {
      range = monthRange(now);
      limitLabel = "本月";
    }

    if (range) {
      const count = await prisma.pointRecord.count({
        where: {
          childId: auth.payload.userId,
          pointRuleId: ruleId,
          createdAt: { gte: range.start, lte: range.end },
          status: { in: [RecordStatus.pending, RecordStatus.approved] },
        },
      });
      const limit = Number.isFinite(maxTimes) ? Math.max(1, maxTimes) : 1;
      if (count >= limit) {
        return NextResponse.json({ success: false, error: `${limitLabel}提交已达上限（${limit} 次）` }, { status: 400 });
      }
    }

    if (rule.needApproval) {
      const record = await prisma.pointRecord.create({
        data: {
          childId: auth.payload.userId,
          pointRuleId: ruleId,
          description: body.description,
          imageUrl: body.imageUrl,
          submitNote: body.submitNote,
          status: RecordStatus.pending,
          points: 0,
        },
      });

      try {
        await sendReviewNotificationToFamily(child.familyId, child.name || "", rule.name);
      } catch {}

      return NextResponse.json({ success: true, data: record, message: "已提交，待审核" });
    }

    const award = rule.pointsType === "fixed" ? rule.points || 0 : rule.points ?? rule.pointsMin ?? 0;
    if (award <= 0) {
      return NextResponse.json({ success: false, error: "该规则未配置有效积分" }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      const record = await tx.pointRecord.create({
        data: {
          childId: auth.payload.userId,
          pointRuleId: ruleId,
          description: body.description,
          imageUrl: body.imageUrl,
          submitNote: body.submitNote,
          status: RecordStatus.approved,
          points: award,
          reviewedAt: now,
          reviewNote: "自动入账",
        },
      });

      await tx.taskLog.create({
        data: {
          childId: auth.payload.userId,
          points: award,
          note: `rule-auto-approve;record=${record.id};rule=${rule.id}`,
          createdAt: now,
        },
      });

      let account = await tx.pointAccount.findUnique({ where: { childId: auth.payload.userId } });
      if (!account) {
        account = await tx.pointAccount.create({ data: { childId: auth.payload.userId, balance: 0 } });
      }

      const balanceAfter = (account.balance || 0) + award;
      await tx.pointTransaction.create({
        data: {
          accountId: account.id,
          type: TransactionType.earn,
          amount: award,
          balanceAfter,
          sourceType: SourceType.task,
          description: `规则：${rule.name}`,
        },
      });
      await tx.pointAccount.update({
        where: { id: account.id },
        data: {
          balance: balanceAfter,
          totalEarned: (account.totalEarned || 0) + award,
        },
      });
      await tx.user.update({
        where: { id: auth.payload.userId },
        data: { totalEarnedPoints: { increment: award } },
      });

      return { record, balance: balanceAfter };
    });

    return NextResponse.json({
      success: true,
      data: { record: result.record, balance: result.balance },
      message: "已自动入账",
    });
  } catch (error: any) {
    console.error("提交积分记录失败", error);
    return NextResponse.json({ success: false, error: error.message || "提交失败" }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const auth = await requireRequestAuth(request, [Role.parent, Role.child, Role.admin]);
    if (!auth.ok) {
      return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    }

    const { searchParams } = new URL(request.url);
    const status = (searchParams.get("status") as RecordStatus | null) || RecordStatus.pending;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const pageSize = Math.max(1, parseInt(searchParams.get("pageSize") || "20", 10));
    const childIdParam = searchParams.get("childId");

    const where: Record<string, unknown> = { status };

    if (auth.payload.role === Role.parent) {
      const childIds = await countChildrenForParent(auth.payload.familyId);
      where.childId = childIdParam ? childIdParam : { in: childIds };
    } else if (auth.payload.role === Role.child) {
      where.childId = auth.payload.userId;
    } else if (childIdParam) {
      where.childId = childIdParam;
    }

    const total = await prisma.pointRecord.count({ where });
    const records = await prisma.pointRecord.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        childId: true,
        pointRuleId: true,
        status: true,
        points: true,
        description: true,
        imageUrl: true,
        submitNote: true,
        reviewNote: true,
        reviewedAt: true,
        createdAt: true,
        child: { select: { id: true, name: true, avatarUrl: true } },
        pointRule: { select: { id: true, name: true, points: true, pointsType: true, category: true } },
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        records,
        pagination: {
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      },
    });
  } catch (error: any) {
    console.error("获取积分记录失败", error);
    return NextResponse.json({ success: false, error: error.message || "服务器错误" }, { status: 500 });
  }
}
