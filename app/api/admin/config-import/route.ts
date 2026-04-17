export const dynamic = "force-dynamic";

import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireRequestAuth } from "@/lib/auth";
import { saveCosts } from "@/lib/pet-config";
import { prisma } from "@/lib/prisma";

type BackupPayload = {
  meta?: {
    type?: string;
    version?: number;
  };
  petCosts?: Partial<{ feed: number; water: number; clean: number; play: number }>;
  families?: any[];
  users?: any[];
  pointRules?: any[];
  pointRuleTargets?: any[];
  pointRecords?: any[];
  pointAccounts?: any[];
  pointTransactions?: any[];
  rewardItems?: any[];
  redeemLogs?: any[];
  recurringTasks?: any[];
  taskPlans?: any[];
  taskLogs?: any[];
  pets?: any[];
  petLogs?: any[];
  pushSubscriptions?: any[];
  systemConfig?: any[];
};

function asArray(value: unknown): any[] {
  return Array.isArray(value) ? value : [];
}

function toDate(value: any) {
  return new Date(value);
}

function toOptionalDate(value: any) {
  return value ? new Date(value) : null;
}

async function ensureSystemConfigTable(tx: { $executeRawUnsafe: typeof prisma.$executeRawUnsafe }) {
  await tx.$executeRawUnsafe(
    'CREATE TABLE IF NOT EXISTS "SystemConfig" (id SERIAL PRIMARY KEY, key TEXT UNIQUE NOT NULL, value TEXT, "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW())'
  );
}

export async function POST(request: NextRequest) {
  const auth = await requireRequestAuth(request, [Role.admin]);
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    const formData = await request.formData();
    const confirmText = String(formData.get("confirmText") || "").trim();
    if (confirmText !== "RESTORE") {
      return NextResponse.json({ success: false, error: "请输入确认词 RESTORE 再继续恢复" }, { status: 400 });
    }

    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: "请选择要恢复的备份 JSON 文件" }, { status: 400 });
    }

    const text = await file.text();
    let payload: BackupPayload;
    try {
      payload = JSON.parse(text) as BackupPayload;
    } catch {
      return NextResponse.json({ success: false, error: "备份文件不是有效的 JSON" }, { status: 400 });
    }

    if (payload.meta?.type !== "family-point-full-export") {
      return NextResponse.json(
        { success: false, error: "仅支持从全量备份文件恢复，请先使用管理员页导出的全量备份" },
        { status: 400 }
      );
    }

    const families = asArray(payload.families);
    const users = asArray(payload.users);
    if (families.length === 0) {
      return NextResponse.json({ success: false, error: "备份中没有家庭数据，无法恢复" }, { status: 400 });
    }
    if (!users.some((user) => user?.role === "admin")) {
      return NextResponse.json({ success: false, error: "备份中没有管理员账号，无法恢复" }, { status: 400 });
    }

    const pointRules = asArray(payload.pointRules);
    const pointRuleTargets = asArray(payload.pointRuleTargets);
    const pointRecords = asArray(payload.pointRecords);
    const pointAccounts = asArray(payload.pointAccounts);
    const pointTransactions = asArray(payload.pointTransactions);
    const rewardItems = asArray(payload.rewardItems);
    const redeemLogs = asArray(payload.redeemLogs);
    const recurringTasks = asArray(payload.recurringTasks);
    const taskPlans = asArray(payload.taskPlans);
    const taskLogs = asArray(payload.taskLogs);
    const pets = asArray(payload.pets);
    const petLogs = asArray(payload.petLogs);
    const pushSubscriptions = asArray(payload.pushSubscriptions);
    const systemConfig = asArray(payload.systemConfig);

    await prisma.$transaction(async (tx) => {
      await ensureSystemConfigTable(tx);

      await tx.pushSubscription.deleteMany();
      await tx.petLog.deleteMany();
      await tx.pet.deleteMany();
      await tx.taskLog.deleteMany();
      await tx.taskPlan.deleteMany();
      await tx.redeemLog.deleteMany();
      await tx.rewardItem.deleteMany();
      await tx.pointTransaction.deleteMany();
      await tx.pointRecord.deleteMany();
      await tx.pointRuleTarget.deleteMany();
      await tx.pointRule.deleteMany();
      await tx.pointAccount.deleteMany();
      await tx.recurringTask.deleteMany();
      await tx.user.deleteMany();
      await tx.family.deleteMany();
      await tx.$executeRawUnsafe('DELETE FROM "SystemConfig"');

      await tx.family.createMany({
        data: families.map((item) => ({
          id: item.id,
          name: item.name,
          createdAt: toDate(item.createdAt),
          updatedAt: toDate(item.updatedAt),
        })),
      });

      await tx.user.createMany({
        data: users.map((item) => ({
          id: item.id,
          name: item.name,
          role: item.role,
          pin: item.pin ?? null,
          password: item.password ?? null,
          familyId: item.familyId,
          avatarUrl: item.avatarUrl ?? null,
          isDeleted: Boolean(item.isDeleted),
          deletedAt: toOptionalDate(item.deletedAt),
          createdAt: toDate(item.createdAt),
          updatedAt: toDate(item.updatedAt),
          totalEarnedPoints: Number(item.totalEarnedPoints ?? 0),
          level: Number(item.level ?? 1),
          streak: Number(item.streak ?? 0),
          lastCheckIn: toOptionalDate(item.lastCheckIn),
        })),
      });

      if (pointAccounts.length > 0) {
        await tx.pointAccount.createMany({
          data: pointAccounts.map((item) => ({
            id: item.id,
            childId: item.childId,
            balance: Number(item.balance ?? 0),
            totalEarned: Number(item.totalEarned ?? 0),
            totalSpent: Number(item.totalSpent ?? 0),
            createdAt: toDate(item.createdAt),
            updatedAt: toDate(item.updatedAt),
          })),
        });
      }

      if (pointRules.length > 0) {
        await tx.pointRule.createMany({
          data: pointRules.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description ?? null,
            category: item.category,
            pointsType: item.pointsType,
            points: Number(item.points ?? 0),
            pointsMin: item.pointsMin == null ? null : Number(item.pointsMin),
            pointsMax: item.pointsMax == null ? null : Number(item.pointsMax),
            needApproval: Boolean(item.needApproval),
            frequency: item.frequency,
            maxTimes: item.maxTimes == null ? null : Number(item.maxTimes),
            enabled: item.enabled !== false,
            familyId: item.familyId,
            createdAt: toDate(item.createdAt),
            updatedAt: toDate(item.updatedAt),
          })),
        });
      }

      if (pointRuleTargets.length > 0) {
        await tx.pointRuleTarget.createMany({
          data: pointRuleTargets.map((item) => ({
            id: item.id,
            pointRuleId: item.pointRuleId,
            childId: item.childId,
          })),
        });
      }

      if (pointRecords.length > 0) {
        await tx.pointRecord.createMany({
          data: pointRecords.map((item) => ({
            id: item.id,
            childId: item.childId,
            pointRuleId: item.pointRuleId,
            status: item.status,
            points: Number(item.points ?? 0),
            description: item.description ?? null,
            imageUrl: item.imageUrl ?? null,
            submitNote: item.submitNote ?? null,
            reviewNote: item.reviewNote ?? null,
            reviewedById: item.reviewedById ?? null,
            reviewedAt: toOptionalDate(item.reviewedAt),
            createdAt: toDate(item.createdAt),
            updatedAt: toDate(item.updatedAt),
          })),
        });
      }

      if (pointTransactions.length > 0) {
        await tx.pointTransaction.createMany({
          data: pointTransactions.map((item) => ({
            id: item.id,
            accountId: item.accountId,
            type: item.type,
            amount: Number(item.amount ?? 0),
            balanceAfter: Number(item.balanceAfter ?? 0),
            sourceType: item.sourceType,
            sourceId: item.sourceId ?? null,
            description: item.description ?? null,
            createdAt: toDate(item.createdAt),
          })),
        });
      }

      if (rewardItems.length > 0) {
        await tx.rewardItem.createMany({
          data: rewardItems.map((item) => ({
            id: item.id,
            familyId: item.familyId,
            name: item.name,
            description: item.description ?? null,
            cost: Number(item.cost ?? 0),
            stock: item.stock == null ? null : Number(item.stock),
            enabled: item.enabled !== false,
            imageUrl: item.imageUrl ?? null,
            createdAt: toDate(item.createdAt),
            updatedAt: toDate(item.updatedAt),
          })),
        });
      }

      if (redeemLogs.length > 0) {
        await tx.redeemLog.createMany({
          data: redeemLogs.map((item) => ({
            id: item.id,
            childId: item.childId,
            rewardItemId: item.rewardItemId,
            quantity: Number(item.quantity ?? 1),
            pointsSpent: Number(item.pointsSpent ?? 0),
            note: item.note ?? null,
            createdAt: toDate(item.createdAt),
          })),
        });
      }

      if (recurringTasks.length > 0) {
        await tx.recurringTask.createMany({
          data: recurringTasks.map((item) => ({
            id: item.id,
            familyId: item.familyId,
            name: item.name,
            description: item.description ?? null,
            points: Number(item.points ?? 0),
            frequency: item.frequency,
            weekdays: item.weekdays ?? null,
            icon: item.icon ?? null,
            active: item.active !== false,
            createdAt: toDate(item.createdAt),
          })),
        });
      }

      if (taskPlans.length > 0) {
        await tx.taskPlan.createMany({
          data: taskPlans.map((item) => ({
            id: item.id,
            childId: item.childId,
            title: item.title,
            description: item.description ?? null,
            points: Number(item.points ?? 0),
            scheduledAt: toOptionalDate(item.scheduledAt),
            dueAt: toOptionalDate(item.dueAt),
            frequency: item.frequency ?? null,
            enabled: item.enabled !== false,
            createdAt: toDate(item.createdAt),
            updatedAt: toDate(item.updatedAt),
            category: item.category ?? null,
            durationMin: item.durationMin == null ? null : Number(item.durationMin),
            needApproval: Boolean(item.needApproval),
          })),
        });
      }

      if (taskLogs.length > 0) {
        await tx.taskLog.createMany({
          data: taskLogs.map((item) => ({
            id: item.id,
            taskPlanId: item.taskPlanId ?? null,
            childId: item.childId,
            points: Number(item.points ?? 0),
            note: item.note ?? null,
            category: item.category ?? null,
            createdAt: toDate(item.createdAt),
          })),
        });
      }

      if (pets.length > 0) {
        await tx.pet.createMany({
          data: pets.map((item) => ({
            id: item.id,
            childId: item.childId,
            name: item.name,
            modelUrl: item.modelUrl ?? null,
            stage: item.stage,
            level: Number(item.level ?? 1),
            exp: Number(item.exp ?? 0),
            status: item.status,
            hunger: Number(item.hunger ?? 80),
            thirst: Number(item.thirst ?? 80),
            cleanliness: Number(item.cleanliness ?? 80),
            mood: Number(item.mood ?? 80),
            health: Number(item.health ?? 100),
            lastDecayAt: toDate(item.lastDecayAt),
            lastFedAt: toOptionalDate(item.lastFedAt),
            lastWateredAt: toOptionalDate(item.lastWateredAt),
            lastCleanedAt: toOptionalDate(item.lastCleanedAt),
            lastPlayedAt: toOptionalDate(item.lastPlayedAt),
            totalCareCount: Number(item.totalCareCount ?? 0),
            createdAt: toDate(item.createdAt),
            updatedAt: toDate(item.updatedAt),
          })),
        });
      }

      if (petLogs.length > 0) {
        await tx.petLog.createMany({
          data: petLogs.map((item) => ({
            id: item.id,
            petId: item.petId,
            action: item.action,
            oldValue: item.oldValue == null ? null : Number(item.oldValue),
            newValue: item.newValue == null ? null : Number(item.newValue),
            pointsCost: item.pointsCost == null ? null : Number(item.pointsCost),
            description: item.description,
            createdAt: toDate(item.createdAt),
          })),
        });
      }

      if (pushSubscriptions.length > 0) {
        await tx.pushSubscription.createMany({
          data: pushSubscriptions.map((item) => ({
            id: item.id,
            userId: item.userId,
            familyId: item.familyId,
            endpoint: item.endpoint,
            p256dh: item.p256dh,
            auth: item.auth,
            createdAt: toDate(item.createdAt),
          })),
        });
      }

      for (const item of systemConfig) {
        await tx.$executeRawUnsafe(
          'INSERT INTO "SystemConfig" (id, key, value, "createdAt") VALUES ($1, $2, $3, $4)',
          Number(item.id),
          item.key,
          item.value ?? null,
          toDate(item.createdAt)
        );
      }

      await tx.$executeRawUnsafe(
        `SELECT setval(
          pg_get_serial_sequence('"SystemConfig"', 'id'),
          COALESCE((SELECT MAX(id) FROM "SystemConfig"), 1),
          true
        )`
      );
    });

    await saveCosts(payload.petCosts ?? {});

    return NextResponse.json({
      success: true,
      message: "全量备份已恢复完成",
      summary: {
        families: families.length,
        users: users.length,
        pointRules: pointRules.length,
        pointRecords: pointRecords.length,
        rewardItems: rewardItems.length,
        taskPlans: taskPlans.length,
        pets: pets.length,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "恢复备份失败" }, { status: 500 });
  }
}
