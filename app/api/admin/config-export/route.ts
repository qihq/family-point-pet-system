export const dynamic = "force-dynamic";

import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireRequestAuth } from "@/lib/auth";
import { getCosts } from "@/lib/pet-config";
import { prisma } from "@/lib/prisma";

type SystemConfigRow = {
  id: number;
  key: string;
  value: string | null;
  createdAt: Date;
};

async function loadSystemConfig(): Promise<SystemConfigRow[]> {
  try {
    return await prisma.$queryRawUnsafe<SystemConfigRow[]>(
      'SELECT id, key, value, "createdAt" FROM "SystemConfig" ORDER BY id ASC'
    );
  } catch {
    return [];
  }
}

export async function GET(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.admin]);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const [
      families,
      users,
      pointRules,
      pointRuleTargets,
      pointRecords,
      pointAccounts,
      pointTransactions,
      rewardItems,
      redeemLogs,
      recurringTasks,
      taskPlans,
      taskLogs,
      pets,
      petLogs,
      pushSubscriptions,
      petCosts,
      systemConfig,
    ] = await Promise.all([
      prisma.family.findMany({
        orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      }),
      prisma.user.findMany({
        orderBy: [{ role: "asc" }, { createdAt: "asc" }, { id: "asc" }],
      }),
      prisma.pointRule.findMany({
        orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      }),
      prisma.pointRuleTarget.findMany({
        orderBy: [{ pointRuleId: "asc" }, { childId: "asc" }, { id: "asc" }],
      }),
      prisma.pointRecord.findMany({
        orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      }),
      prisma.pointAccount.findMany({
        orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      }),
      prisma.pointTransaction.findMany({
        orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      }),
      prisma.rewardItem.findMany({
        orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      }),
      prisma.redeemLog.findMany({
        orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      }),
      prisma.recurringTask.findMany({
        orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      }),
      prisma.taskPlan.findMany({
        orderBy: [{ childId: "asc" }, { createdAt: "asc" }, { id: "asc" }],
      }),
      prisma.taskLog.findMany({
        orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      }),
      prisma.pet.findMany({
        orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      }),
      prisma.petLog.findMany({
        orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      }),
      prisma.pushSubscription.findMany({
        orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      }),
      getCosts(),
      loadSystemConfig(),
    ]);

    const exportedAt = new Date();
    const payload = {
      meta: {
        exportedAt: exportedAt.toISOString(),
        exportedBy: auth.payload.userId,
        timezone: process.env.TZ || "Asia/Shanghai",
        type: "family-point-full-export",
        version: 2,
        scope: "full-backup",
        includesSensitiveData: true,
        excludesBinaryUploads: true,
      },
      summary: {
        families: families.length,
        users: users.length,
        pointRules: pointRules.length,
        pointRuleTargets: pointRuleTargets.length,
        pointRecords: pointRecords.length,
        pointAccounts: pointAccounts.length,
        pointTransactions: pointTransactions.length,
        rewardItems: rewardItems.length,
        redeemLogs: redeemLogs.length,
        recurringTasks: recurringTasks.length,
        taskPlans: taskPlans.length,
        taskLogs: taskLogs.length,
        pets: pets.length,
        petLogs: petLogs.length,
        pushSubscriptions: pushSubscriptions.length,
        systemConfig: systemConfig.length,
      },
      warnings: [
        "This export contains sensitive data, including password hashes, PIN hashes, push subscription keys, and full business records.",
        "Uploaded binary files are not embedded in this JSON. If you use local uploads, back up the uploads directory separately.",
      ],
      petCosts,
      families,
      users,
      pointRules,
      pointRuleTargets,
      pointRecords,
      pointAccounts,
      pointTransactions,
      rewardItems,
      redeemLogs,
      recurringTasks,
      taskPlans,
      taskLogs,
      pets,
      petLogs,
      pushSubscriptions,
      systemConfig,
    };

    const filename = `family-point-full-export_${exportedAt.toISOString().slice(0, 19).replace(/[:T]/g, "-")}.json`;

    return new NextResponse(JSON.stringify(payload, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "导出备份失败" }, { status: 500 });
  }
}
