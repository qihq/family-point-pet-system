import { jwtVerify, SignJWT } from 'jose';
import { SessionUser, JWTPayload, LoginResult } from '@/types/auth';
import { Role } from '@prisma/client';

// JWT 密钥（从环境变量读取）
const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'default-secret-key-for-development-only'
);

// JWT 过期时间（7天）
const JWT_EXPIRES_IN = '7d';

export async function generateToken(payload: JWTPayload): Promise<string> {
  const token = await new SignJWT({
    userId: payload.userId,
    role: payload.role,
    familyId: payload.familyId,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(JWT_SECRET);

  return token;
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      userId: payload.userId as string,
      role: payload.role as Role,
      familyId: payload.familyId as string,
    };
  } catch {
    return null;
  }
}

export function createSessionUser(payload: JWTPayload, name: string): SessionUser {
  return {
    id: payload.userId,
    name,
    role: payload.role,
    familyId: payload.familyId,
  };
}

export function verifyPassword(input: string, stored: string): boolean {
  return input === stored;
}

export function verifyPin(input: string, stored: string): boolean {
  return input === stored;
}

export function createLoginSuccess(user: SessionUser): LoginResult {
  return {
    success: true,
    user,
  };
}

export function createLoginError(error: string): LoginResult {
  return {
    success: false,
    error,
  };
}

export function getTokenFromHeader(authHeader?: string | null): string | null {
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}
