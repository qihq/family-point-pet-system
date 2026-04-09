import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import { generateToken, verifyPassword, createSessionUser, createLoginSuccess, createLoginError } from '@/lib/auth';
import { ParentCredentials } from '@/types/auth';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body: ParentCredentials = await request.json();
    const name = (body.name||'').trim();
    const password = (body.password||'').trim();

    if (!name || !password) {
      return NextResponse.json(createLoginError('ç”¨æˆ·åå’Œå¯†ç ä¸èƒ½ä¸ºç©º'), { status: 400 });
    }

    const user = await prisma.user.findFirst({ where: { role: Role.parent, name: { equals: name, mode: 'insensitive' } } });
    if (!user) {
      return NextResponse.json(createLoginError('ç”¨æˆ·åä¸å­˜åœ¨'), { status: 401 });
    }

    if (!verifyPassword(password, user.password || '')) {
      return NextResponse.json(createLoginError('å¯†ç é”™è¯¯'), { status: 401 });
    }

    const token = await generateToken({ userId: user.id, role: user.role, familyId: user.familyId });
    const sessionUser = createSessionUser({ userId: user.id, role: user.role, familyId: user.familyId }, user.name);
    const result = createLoginSuccess(sessionUser);

    return NextResponse.json(
      { ...result, token },
      { status: 200, headers: { 'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800` } }
    );
  } catch (error) {
    console.error('å®¶é•¿ç™»å½•é”™è¯¯:', error);
    return NextResponse.json(createLoginError('ç™»å½•å¤±è´¥ï¼Œè¯·ç¨åŽé‡è¯•ã€‚'), { status: 500 });
  }
}
