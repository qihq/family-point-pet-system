export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import { createPointRule, listPointRules } from '@/server/services/point-rule.service';
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

// GET 规则列表
export async function GET(request: NextRequest) {
  try {
    const auth = await verifyRequestAuth(request);
    if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

    const { payload } = auth as { success: true; payload: any };
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);

    if (payload.role === Role.parent || payload.role === Role.admin) {
      // 家长：查看家庭全部规则（不受 enabled/childId 过滤）
      const result = await listPointRules({ familyId: payload.familyId, category, page, pageSize });
      return NextResponse.json({ success: true, data: result });
    }

    // 孩子：只看启用且对其开放的规则
    const result = await listPointRules({
      familyId: payload.familyId,
      category,
      enabled: true,
      childId: payload.userId,
      page,
      pageSize,
    });
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('查询规则失败:', error);
    return NextResponse.json({ success: false, error: error.message || '查询规则失败' }, { status: 500 });
  }
}

// POST 新建规则（仅家长/管理员）
export async function POST(request: NextRequest) {
  try {
    const auth = await verifyRequestAuth(request);
    if (!auth.success) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

    const { payload } = auth as { success: true; payload: any };
    if (payload.role !== Role.parent && payload.role !== Role.admin) return NextResponse.json({ success: false, error: '仅限家长操作' }, { status: 403 });

    const body = await request.json();
    const rule = await createPointRule({
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
      familyId: payload.familyId,
      targetChildIds: body.applyToAll ? [] : body.targetChildIds,
    });

    return NextResponse.json({ success: true, data: rule, message: '创建成功' });
  } catch (error: any) {
    console.error('新建规则出错:', error);
    return NextResponse.json({ success: false, error: error.message || '新建规则失败' }, { status: 400 });
  }
}
