export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import { updatePointRule } from '@/server/services/point-rule.service';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

const prisma = new PrismaClient();

async function verifyRequestAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
  if (!token) return { success: false as const, error: '未登录', status: 401 };
  const payload = await verifyToken(token);
  if (!payload) return { success: false as const, error: '登录已失效', status: 401 };
  return { success: true as const, payload };
}

// 获取规则详情（仅家长/管理员）
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await verifyRequestAuth(request);
    if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    const { payload } = auth as { success: true; payload: any };
    if (payload.role !== Role.parent && payload.role !== Role.admin) return NextResponse.json({ success: false, error: '仅限家长操作' }, { status: 403 });

    const id = params.id;
    const rule = await prisma.pointRule.findFirst({ where: { id, familyId: payload.familyId }, include: { targets: true } });
    if (!rule) return NextResponse.json({ success: false, error: '规则不存在或无权限' }, { status: 404 });
    return NextResponse.json({ success: true, data: rule });
  } catch (error: any) {
    console.error('获取规则详情失败:', error);
    return NextResponse.json({ success: false, error: error.message || '获取失败' }, { status: 500 });
  }
}

// 更新规则（仅家长/管理员）
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await verifyRequestAuth(request);
    if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    const { payload } = auth as { success: true; payload: any };
    if (payload.role !== Role.parent && payload.role !== Role.admin) return NextResponse.json({ success: false, error: '仅限家长操作' }, { status: 403 });

    const id = params.id;
    // 校验权限：确保规则属于该家庭
    const exists = await prisma.pointRule.findFirst({ where: { id, familyId: payload.familyId }, select: { id: true } });
    if (!exists) return NextResponse.json({ success: false, error: '规则不存在或无权限' }, { status: 404 });

    const body = await request.json();
    const updated = await updatePointRule(id, {
      name: body.name,
      description: body.description,
      category: body.category,
      pointsType: body.pointsType,
      points: body.points,
      pointsMin: body.pointsMin,
      pointsMax: body.pointsMax,
      needApproval: body.needApproval,
      frequency: body.frequency,
      maxTimes: body.maxTimes,
      enabled: body.enabled,
      targetChildIds: body.applyToAll ? [] : body.targetChildIds,
    });
    return NextResponse.json({ success: true, data: updated, message: '保存成功' });
  } catch (error: any) {
    console.error('更新规则失败:', error);
    return NextResponse.json({ success: false, error: error.message || '更新失败' }, { status: 400 });
  }
}

// 删除规则（仅家长/管理员）
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await verifyRequestAuth(request);
    if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    const { payload } = auth as { success: true; payload: any };
    if (payload.role !== Role.parent && payload.role !== Role.admin) return NextResponse.json({ success: false, error: '仅限家长操作' }, { status: 403 });

    const id = params.id;
    const rule = await prisma.pointRule.findFirst({ where: { id, familyId: payload.familyId }, select: { id: true } });
    if (!rule) return NextResponse.json({ success: false, error: '规则不存在或无权限' }, { status: 404 });

    await prisma.$transaction(async (tx) => {
      await tx.pointRuleTarget.deleteMany({ where: { pointRuleId: id } });
      await tx.pointRule.delete({ where: { id } });
    });
    return NextResponse.json({ success: true, message: '已删除' });
  } catch (error: any) {
    console.error('删除规则失败:', error);
    return NextResponse.json({ success: false, error: error.message || '删除失败' }, { status: 400 });
  }
}
