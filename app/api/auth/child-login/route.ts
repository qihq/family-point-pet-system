import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import {
  generateToken,
  verifyPin,
  createSessionUser,
  createLoginSuccess,
  createLoginError,
} from '@/lib/auth';
import { ChildCredentials } from '@/types/auth';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body: ChildCredentials = await request.json();
    const name = (body.name||'').trim();
    const pin = (body.pin||'').trim();
    if (!name || !pin) {
      return NextResponse.json(createLoginError('åå­—å’Œ PIN ç ä¸èƒ½ä¸ºç©º'), { status: 400 });
    }

    const user = await prisma.user.findFirst({ where: { role: Role.child, name: { equals: name, mode: "insensitive" }, isDeleted: false },
    });

    if (!user) {
      return NextResponse.json(createLoginError('ç”¨æˆ·ä¸å­˜åœ¨'), { status: 401 });
    }

    if (!verifyPin(pin, user.pin || '')) {
      return NextResponse.json(createLoginError('PIN ç é”™è¯¯'), { status: 401 });
    }

    const token = await generateToken({
      userId: user.id,
      role: user.role,
      familyId: user.familyId,
    });

    const sessionUser = createSessionUser(
      { userId: user.id, role: user.role, familyId: user.familyId },
      user.name
    );
    const result = createLoginSuccess(sessionUser);

    return NextResponse.json(
      { ...result, token },
      {
        status: 200,
        headers: {
          'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`,
        },
      }
    );
  } catch (error) {
    console.error('å­©å­ç™»å½•é”™è¯¯:', error);
    return NextResponse.json(createLoginError('ç™»å½•å¤±è´¥ï¼Œè¯·ç¨åŽé‡è¯•ã€‚'), { status: 500 });
  }
}


