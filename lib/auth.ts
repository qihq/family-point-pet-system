import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";
import { jwtVerify, SignJWT } from "jose";
import type { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";
import type { JWTPayload, LoginResult, SessionUser } from "@/types/auth";

const TOKEN_COOKIE_NAME = "token";
const TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const SCRYPT_PREFIX = "scrypt";

type RequestAuthResult =
  | { ok: true; payload: JWTPayload; token: string }
  | { ok: false; status: number; error: string };

function getJwtSecret(): Uint8Array {
  const secret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is required");
  }
  return new TextEncoder().encode(secret);
}

function safeCompareText(input: string, stored: string): boolean {
  const inputBuffer = Buffer.from(input);
  const storedBuffer = Buffer.from(stored);
  if (inputBuffer.length !== storedBuffer.length) {
    return false;
  }
  return timingSafeEqual(inputBuffer, storedBuffer);
}

function parseHashedSecret(stored: string) {
  const [scheme, saltHex, hashHex] = stored.split("$");
  if (scheme !== SCRYPT_PREFIX || !saltHex || !hashHex) {
    return null;
  }
  return {
    salt: Buffer.from(saltHex, "hex"),
    hash: Buffer.from(hashHex, "hex"),
  };
}

function hashSecret(secret: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(secret, salt, 64);
  return `${SCRYPT_PREFIX}$${salt.toString("hex")}$${hash.toString("hex")}`;
}

function verifySecret(input: string, stored: string): boolean {
  if (!stored) {
    return false;
  }

  const parsed = parseHashedSecret(stored);
  if (!parsed) {
    return safeCompareText(input, stored);
  }

  const computed = scryptSync(input, parsed.salt, parsed.hash.length);
  return timingSafeEqual(computed, parsed.hash);
}

export async function generateToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({
    userId: payload.userId,
    role: payload.role,
    familyId: payload.familyId,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
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

export function hashPassword(password: string): string {
  return hashSecret(password.trim());
}

export function hashPin(pin: string): string {
  return hashSecret(pin.trim());
}

export function verifyPassword(input: string, stored: string): boolean {
  return verifySecret(input.trim(), stored.trim());
}

export function verifyPin(input: string, stored: string): boolean {
  return verifySecret(input.trim(), stored.trim());
}

export function isLegacySecret(stored?: string | null): boolean {
  return !!stored && !stored.startsWith(`${SCRYPT_PREFIX}$`);
}

export function createLoginSuccess(user: SessionUser): LoginResult {
  return { success: true, user };
}

export function createLoginError(error: string): LoginResult {
  return { success: false, error };
}

export function getTokenFromHeader(authHeader?: string | null): string | null {
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.slice("Bearer ".length).trim();
  return token || null;
}

export function getTokenFromRequest(request: Pick<NextRequest, "headers" | "cookies">): string | null {
  return getTokenFromHeader(request.headers.get("authorization")) || request.cookies.get(TOKEN_COOKIE_NAME)?.value || null;
}

export async function requireRequestAuth(
  request: Pick<NextRequest, "headers" | "cookies">,
  allowedRoles?: Role[]
): Promise<RequestAuthResult> {
  const token = getTokenFromRequest(request);
  if (!token) {
    return { ok: false, status: 401, error: "未登录" };
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return { ok: false, status: 401, error: "登录已失效" };
  }

  if (allowedRoles && !allowedRoles.includes(payload.role)) {
    return { ok: false, status: 403, error: "权限不足" };
  }

  return { ok: true, payload, token };
}

function shouldUseSecureCookie(request?: Pick<NextRequest, "headers" | "nextUrl">) {
  const override = process.env.COOKIE_SECURE;
  if (override === "true") {
    return true;
  }
  if (override === "false") {
    return false;
  }

  const forwardedProto = request?.headers.get("x-forwarded-proto")?.split(",")[0]?.trim().toLowerCase();
  if (forwardedProto) {
    return forwardedProto === "https";
  }

  const protocol = request?.nextUrl?.protocol?.toLowerCase();
  if (protocol) {
    return protocol === "https:";
  }

  return process.env.NODE_ENV === "production";
}

export function setSessionCookie(
  response: NextResponse,
  token: string,
  request?: Pick<NextRequest, "headers" | "nextUrl">
) {
  response.cookies.set({
    name: TOKEN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: shouldUseSecureCookie(request),
    path: "/",
    maxAge: TOKEN_MAX_AGE_SECONDS,
  });
  return response;
}

export function clearSessionCookie(response: NextResponse, request?: Pick<NextRequest, "headers" | "nextUrl">) {
  response.cookies.set({
    name: TOKEN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: shouldUseSecureCookie(request),
    path: "/",
    maxAge: 0,
  });
  return response;
}

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
