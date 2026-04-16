import { PointsType, Frequency } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export interface CreatePointRuleInput {
  name: string;
  description?: string;
  category: string;
  pointsType: PointsType;
  points: number;
  pointsMin?: number;
  pointsMax?: number;
  needApproval?: boolean;
  frequency: Frequency;
  maxTimes?: number;
  enabled?: boolean;
  familyId: string;
  targetChildIds?: string[];
}

export interface UpdatePointRuleInput {
  name?: string;
  description?: string;
  category?: string;
  pointsType?: PointsType;
  points?: number;
  pointsMin?: number;
  pointsMax?: number;
  needApproval?: boolean;
  frequency?: Frequency;
  maxTimes?: number;
  enabled?: boolean;
  targetChildIds?: string[];
}

export interface ListPointRulesParams {
  familyId: string;
  category?: string;
  enabled?: boolean;
  childId?: string;
  page?: number;
  pageSize?: number;
}

export async function createPointRule(input: CreatePointRuleInput) {
  if (!input.name?.trim()) throw new Error('规则名称不能为空');
  if (!input.category?.trim()) throw new Error('分类不能为空');
  if (input.pointsType === 'fixed') {
    if (input.points < 0) throw new Error('积分不能为负数');
  } else {
    if (input.pointsMin == null || input.pointsMax == null) throw new Error('范围积分需要设置最小与最大');
    if (input.pointsMin > input.pointsMax) throw new Error('最小不能大于最大');
    if (input.pointsMin < 0) throw new Error('积分不能为负数');
  }

  const rule = await prisma.pointRule.create({
    data: {
      name: input.name.trim(),
      description: input.description?.trim(),
      category: input.category.trim(),
      pointsType: input.pointsType,
      points: input.points,
      pointsMin: input.pointsMin,
      pointsMax: input.pointsMax,
      needApproval: input.needApproval ?? false,
      frequency: input.frequency,
      maxTimes: input.maxTimes,
      enabled: input.enabled ?? true,
      familyId: input.familyId,
      targets: input.targetChildIds && input.targetChildIds.length > 0
        ? { create: input.targetChildIds.map((childId) => ({ childId })) }
        : undefined,
    },
    include: { targets: true },
  });
  return rule;
}

export async function updatePointRule(ruleId: string, input: UpdatePointRuleInput) {
  const existingRule = await prisma.pointRule.findUnique({ where: { id: ruleId }, include: { targets: true } });
  if (!existingRule) throw new Error('规则不存在');

  if (input.name !== undefined && input.name.trim() === '') throw new Error('规则名称不能为空');
  if (input.category !== undefined && input.category.trim() === '') throw new Error('分类不能为空');
  if (input.points !== undefined && input.points < 0) throw new Error('积分不能为负数');

  if (input.pointsType === 'range' || (input.pointsType === undefined && existingRule.pointsType === 'range')) {
    const pointsMin = input.pointsMin ?? existingRule.pointsMin;
    const pointsMax = input.pointsMax ?? existingRule.pointsMax;
    if (pointsMin != null && pointsMax != null) {
      if (pointsMin > pointsMax) throw new Error('最小不能大于最大');
      if (pointsMin < 0) throw new Error('积分不能为负数');
    }
  }

  const rule = await prisma.$transaction(async (tx) => {
    const r = await tx.pointRule.update({
      where: { id: ruleId },
      data: {
        name: input.name?.trim(),
        description: input.description?.trim(),
        category: input.category?.trim(),
        pointsType: input.pointsType,
        points: input.points,
        pointsMin: input.pointsMin,
        pointsMax: input.pointsMax,
        needApproval: input.needApproval,
        frequency: input.frequency,
        maxTimes: input.maxTimes,
        enabled: input.enabled,
      },
    });

    if (input.targetChildIds !== undefined) {
      await tx.pointRuleTarget.deleteMany({ where: { pointRuleId: ruleId } });
      if (input.targetChildIds.length > 0) {
        await tx.pointRuleTarget.createMany({ data: input.targetChildIds.map((childId) => ({ pointRuleId: ruleId, childId })) });
      }
    }
    return r;
  });

  return await prisma.pointRule.findUnique({ where: { id: ruleId }, include: { targets: true } });
}

export async function togglePointRuleEnabled(ruleId: string, familyId: string) {
  const rule = await prisma.pointRule.findFirst({ where: { id: ruleId, familyId } });
  if (!rule) throw new Error('规则不存在或无权限');
  return prisma.pointRule.update({ where: { id: ruleId }, data: { enabled: !rule.enabled }, include: { targets: true } });
}

export async function duplicatePointRule(ruleId: string, familyId: string) {
  const original = await prisma.pointRule.findFirst({ where: { id: ruleId, familyId }, include: { targets: true } });
  if (!original) throw new Error('规则不存在或无权限');
  const newRule = await prisma.pointRule.create({
    data: {
      name: `${original.name}_copy`,
      description: original.description,
      category: original.category,
      pointsType: original.pointsType,
      points: original.points,
      pointsMin: original.pointsMin,
      pointsMax: original.pointsMax,
      needApproval: original.needApproval,
      frequency: original.frequency,
      maxTimes: original.maxTimes,
      enabled: original.enabled,
      familyId: original.familyId,
      targets: original.targets.length > 0 ? { create: original.targets.map((t) => ({ childId: t.childId })) } : undefined,
    },
    include: { targets: true },
  });
  return newRule;
}

export async function listPointRules(params: ListPointRulesParams) {
  const { familyId, category, enabled, childId, page = 1, pageSize = 20 } = params;
  const where: any = { familyId };
  if (category) where.category = category;
  if (enabled !== undefined) where.enabled = enabled;
  if (childId) {
    where.OR = [
      { targets: { none: {} } },
      { targets: { some: { childId } } },
    ];
  }
  const total = await prisma.pointRule.count({ where });
  const rules = await prisma.pointRule.findMany({
    where,
    include: { targets: true },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  return { rules, pagination: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) } };
}
