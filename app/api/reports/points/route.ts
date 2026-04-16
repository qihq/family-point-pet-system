export const dynamic = "force-dynamic";

import { Role, SourceType, TransactionType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function escapeCsv(value: string) {
  if (value.includes(",") || value.includes('"') || value.includes("\n") || value.includes("\r")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function normalizeDateRange(startDate?: string | null, endDate?: string | null) {
  const end = endDate ? new Date(endDate) : new Date();
  const start = startDate ? new Date(startDate) : new Date(end.getTime() - 6 * 86400000);
  const rangeStart = new Date(start);
  rangeStart.setHours(0, 0, 0, 0);
  const rangeEnd = new Date(end);
  rangeEnd.setHours(23, 59, 59, 999);
  return { rangeStart, rangeEnd };
}

function previousRange(start: Date, end: Date) {
  const duration = end.getTime() - start.getTime();
  const prevEnd = new Date(start.getTime() - 1);
  const prevStart = new Date(prevEnd.getTime() - duration);
  return { prevStart, prevEnd };
}

export async function GET(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.parent, Role.admin]);
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

  const params = new URL(request.url).searchParams;
  const childId = params.get("childId");
  const type = params.get("type") as TransactionType | null;
  const sourceType = params.get("sourceType") as SourceType | null;
  const format = params.get("format");
  const compare = params.get("compare");
  const { rangeStart, rangeEnd } = normalizeDateRange(params.get("startDate"), params.get("endDate"));

  const children = await prisma.user.findMany({
    where: {
      familyId: auth.payload.familyId,
      role: Role.child,
      id: childId && childId !== "all" ? childId : undefined,
    },
    select: { id: true, name: true },
  });

  if (!children.length) {
    return NextResponse.json({ success: true, data: { transactions: [], summary: null, comparison: null } });
  }

  const accounts = await prisma.pointAccount.findMany({
    where: { childId: { in: children.map((child) => child.id) } },
    select: { id: true, childId: true },
  });

  const childIdByAccountId = new Map(accounts.map((account) => [account.id, account.childId] as const));
  const childNameById = new Map(children.map((child) => [child.id, child.name] as const));

  const createWhere = (start: Date, end: Date) => ({
    accountId: { in: accounts.map((account) => account.id) },
    type: type || undefined,
    sourceType: sourceType || undefined,
    createdAt: { gte: start, lte: end },
  });

  const currentRows = await prisma.pointTransaction.findMany({
    where: createWhere(rangeStart, rangeEnd),
    orderBy: { createdAt: "desc" },
  });

  const rows = currentRows.map((transaction) => {
    const resolvedChildId = childIdByAccountId.get(transaction.accountId) || "";
    return {
      id: transaction.id,
      createdAt: transaction.createdAt,
      type: transaction.type,
      sourceType: transaction.sourceType,
      amount: transaction.amount,
      balanceAfter: transaction.balanceAfter,
      description: transaction.description || "",
      childId: resolvedChildId,
      childName: childNameById.get(resolvedChildId) || "",
    };
  });

  const summarize = (items: typeof rows) => {
    const summary = {
      count: items.length,
      earnTotal: 0,
      spendTotal: 0,
      net: 0,
      children: new Map<string, { childId: string; childName: string; earn: number; spend: number; count: number }>(),
    };

    for (const item of items) {
      const isEarn = item.type === TransactionType.earn;
      if (isEarn) summary.earnTotal += item.amount;
      else summary.spendTotal += item.amount;

      const childSummary = summary.children.get(item.childId) || {
        childId: item.childId,
        childName: item.childName,
        earn: 0,
        spend: 0,
        count: 0,
      };
      if (isEarn) childSummary.earn += item.amount;
      else childSummary.spend += item.amount;
      childSummary.count += 1;
      summary.children.set(item.childId, childSummary);
    }

    return {
      count: summary.count,
      earnTotal: summary.earnTotal,
      spendTotal: summary.spendTotal,
      net: summary.earnTotal - summary.spendTotal,
      children: Array.from(summary.children.values()).sort((a, b) => (b.earn - b.spend) - (a.earn - a.spend)),
    };
  };

  const currentSummary = summarize(rows);
  let comparison: null | {
    previous: ReturnType<typeof summarize>;
    delta: { earnTotal: number; spendTotal: number; net: number; count: number };
    label: string;
  } = null;

  if (compare === "previous") {
    const { prevStart, prevEnd } = previousRange(rangeStart, rangeEnd);
    const previousRowsRaw = await prisma.pointTransaction.findMany({
      where: createWhere(prevStart, prevEnd),
      orderBy: { createdAt: "desc" },
    });
    const previousRows = previousRowsRaw.map((transaction) => {
      const resolvedChildId = childIdByAccountId.get(transaction.accountId) || "";
      return {
        id: transaction.id,
        createdAt: transaction.createdAt,
        type: transaction.type,
        sourceType: transaction.sourceType,
        amount: transaction.amount,
        balanceAfter: transaction.balanceAfter,
        description: transaction.description || "",
        childId: resolvedChildId,
        childName: childNameById.get(resolvedChildId) || "",
      };
    });
    const previousSummary = summarize(previousRows);
    comparison = {
      previous: previousSummary,
      delta: {
        earnTotal: currentSummary.earnTotal - previousSummary.earnTotal,
        spendTotal: currentSummary.spendTotal - previousSummary.spendTotal,
        net: currentSummary.net - previousSummary.net,
        count: currentSummary.count - previousSummary.count,
      },
      label: `${prevStart.toLocaleDateString("zh-CN")} - ${prevEnd.toLocaleDateString("zh-CN")}`,
    };
  }

  if (format === "csv") {
    const header = ["childId", "childName", "createdAt", "type", "sourceType", "amount", "balanceAfter", "description"].join(",");
    const body = rows
      .map((row) =>
        [
          row.childId,
          escapeCsv(row.childName),
          new Date(row.createdAt).toISOString(),
          row.type,
          row.sourceType,
          row.amount,
          row.balanceAfter,
          escapeCsv(row.description),
        ].join(",")
      )
      .join("\r\n");
    return new NextResponse(`\uFEFF${header}\r\n${body}\r\n`, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename=points_report_${Date.now()}.csv`,
      },
    });
  }

  return NextResponse.json({
    success: true,
    data: {
      transactions: rows,
      summary: currentSummary,
      comparison,
      filters: {
        rangeStart,
        rangeEnd,
      },
    },
  });
}
