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
// In-memory rate limiter for PIN login: 10 attempts per 5 minutes per IP
const pinAttempts = new Map<string, { count: number; resetAt: number }>();

export function checkPinRateLimit(ip: string, windowMs = 5 * 60 * 1000, limit = 10) {
  const now = Date.now();
  const entry = pinAttempts.get(ip);
  if (!entry || now >= entry.resetAt) {
    pinAttempts.set(ip, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, resetAt: now + windowMs };
  }
  if (entry.count >= limit) {
    return { ok: false, remaining: 0, retryAfterMs: Math.max(0, entry.resetAt - now), resetAt: entry.resetAt };
  }
  entry.count += 1;
  return { ok: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}

// codex-ok: 2026-04-10T10:38:00+08:00