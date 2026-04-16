export const dynamic = "force-dynamic";

import { Role, SourceType, TransactionType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.parent, Role.child, Role.admin]);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  try {
    const searchParams = new URL(request.url).searchParams;
    const type = searchParams.get("type") as TransactionType | null;
    const sourceType = searchParams.get("sourceType") as SourceType | null;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("pageSize") || 20);

    let childId = searchParams.get("childId") || undefined;
    if (auth.payload.role === Role.child) {
      childId = auth.payload.userId;
    }
    if (!childId) {
      return NextResponse.json({ success: false, error: "缺少 childId" }, { status: 400 });
    }

    const child = await prisma.user.findFirst({
      where: {
        id: childId,
        role: Role.child,
        familyId: auth.payload.role === Role.admin ? undefined : auth.payload.familyId,
        isDeleted: false,
      },
      select: { id: true },
    });
    if (!child) {
      return NextResponse.json({ success: false, error: "越权访问" }, { status: 403 });
    }

    const account = await prisma.pointAccount.findUnique({ where: { childId } });
    if (!account) {
      return NextResponse.json({
        success: true,
        data: { transactions: [], balance: 0, pagination: { total: 0, page, pageSize, totalPages: 0 } },
      });
    }

    const where: {
      accountId: string;
      type?: TransactionType;
      sourceType?: SourceType;
      createdAt?: { gte?: Date; lte?: Date };
    } = { accountId: account.id };
    if (type) where.type = type;
    if (sourceType) where.sourceType = sourceType;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const total = await prisma.pointTransaction.count({ where });
    const transactions = await prisma.pointTransaction.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return NextResponse.json({
      success: true,
      data: {
        transactions,
        balance: account.balance,
        pagination: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
      },
    });
  } catch (error: any) {
    console.error("查询积分流水失败", error);
    return NextResponse.json({ success: false, error: error.message || "服务异常" }, { status: 500 });
  }
}
