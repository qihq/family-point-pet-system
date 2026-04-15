import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';

const prisma = new PrismaClient();

function clamp(value: number) { return Math.max(0, Math.min(100, value)); }

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = getTokenFromHeader(authHeader) || request.cookies.get('token')?.value || '';
    if (!token) return NextResponse.json({ success: false, error: '未登录' }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ success: false, error: '登录已失效' }, { status: 401 });

    const url = new URL(request.url);
    const qpChildId = url.searchParams.get('childId') || undefined;
    let childId = qpChildId;
    if (payload.role === Role.child) childId = payload.userId; // 孩子固定看自己的
    if (!childId) return NextResponse.json({ success: false, error: '缺少 childId' }, { status: 400 });

    // 权限：家长仅能访问本家庭；管理员放行
    if (payload.role === Role.parent) {
      const child = await prisma.user.findFirst({ where: { id: childId, role: Role.child, familyId: payload.familyId } });
      if (!child) return NextResponse.json({ success: false, error: '越权访问' }, { status: 403 });
    }

    // 账号与宠物
    let account = await prisma.pointAccount.findUnique({ where: { childId } });
    if (!account) account = await prisma.pointAccount.create({ data: { childId, balance: 0 } });

    let pet = await prisma.pet.findUnique({ where: { childId } });
    if (!pet) pet = await prisma.pet.create({ data: { childId, name: '小暖暖' } as any });

    // 基于 lastDecayAt 的被动衰减（每小时）
    const now = new Date();
    const last = new Date(pet.lastDecayAt || pet.updatedAt || now);
    const hours = Math.floor((now.getTime() - last.getTime()) / 3600000);
    if (hours > 0) {
      const dh = Math.min(100, hours * 3);   // 饥饿下降
      const dt = Math.min(100, hours * 4);   // 口渴下降
      const dc = Math.min(100, hours * 2);   // 清洁下降
      const dm = Math.min(100, Math.floor(hours * 1.5)); // 心情下降
      const newPet = await prisma.pet.update({
        where: { id: pet.id },
        data: {
          hunger: clamp(pet.hunger - dh),
          thirst: clamp(pet.thirst - dt),
          cleanliness: clamp(pet.cleanliness - dc),
          mood: clamp(pet.mood - dm),
          health: clamp(pet.health - Math.floor(hours / 4)),
          lastDecayAt: now,
        },
      });
      pet = newPet;
    }

    return NextResponse.json({ success: true, data: { pet, account } });
  } catch (error: any) {
    console.error('获取宠物信息失败:', error);
    return NextResponse.json({ success: false, error: error.message || '获取宠物信息失败' }, { status: 500 });
  }
}