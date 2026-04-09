import { Role } from '@prisma/client';
import { NextResponse } from 'next/server';
import { SessionUser } from '@/types/auth';

export function requireParent(user: SessionUser | null): { success: boolean; error?: string; status?: number } {
  if (!user) return { success: false, error: '未登录', status: 401 };
  if (user.role !== Role.parent) return { success: false, error: '仅限家长操作', status: 403 };
  return { success: true };
}

export function requireChild(user: SessionUser | null): { success: boolean; error?: string; status?: number } {
  if (!user) return { success: false, error: '未登录', status: 401 };
  if (user.role !== Role.child) return { success: false, error: '仅限孩子操作', status: 403 };
  return { success: true };
}

export function requireFamilyAccess(
  user: SessionUser | null,
  targetFamilyId: string,
  targetChildId?: string | null,
): { success: boolean; error?: string; status?: number } {
  if (!user) return { success: false, error: '未登录', status: 401 };
  if (user.familyId !== targetFamilyId) return { success: false, error: '越权访问', status: 403 };
  if (user.role === Role.child && targetChildId && user.id !== targetChildId) {
    return { success: false, error: '越权访问', status: 403 };
  }
  return { success: true };
}

export function forbiddenResponse(message: string = '禁止访问') {
  return NextResponse.json({ error: message }, { status: 403 });
}
