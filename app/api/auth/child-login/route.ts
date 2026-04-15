import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { generateToken, verifyPin, createSessionUser, createLoginSuccess, createLoginError, checkPinRateLimit } from "@/lib/auth";

interface ChildCredentials { name: string; pin: string }

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<ChildCredentials>;
    const name = String(body.name || "").trim();
    const pin = String(body.pin || "").trim();
    if (!name || !pin) {
      return NextResponse.json(createLoginError("姓名和 PIN 不能为空"), { status: 400 });
    }

    const ipHeader = request.headers.get("x-forwarded-for") || "";
    const ip = (ipHeader.split(",")[0] || request.headers.get("x-real-ip") || "unknown").toString().trim();
    const rl = checkPinRateLimit(ip);
    if (!rl.ok) {
      return NextResponse.json(createLoginError("尝试过多，请稍后再试"), { status: 429, headers: { "Retry-After": String(Math.ceil((rl.retryAfterMs || 0) / 1000)) } });
    }

    const user = await prisma.user.findFirst({ where: { role: Role.child, name: { equals: name, mode: "insensitive" }, isDeleted: false } });
    if (!user) {
      return NextResponse.json(createLoginError("用户不存在"), { status: 401 });
    }
    if (!verifyPin(pin, user.pin || "")) {
      return NextResponse.json(createLoginError("PIN 错误"), { status: 401 });
    }

    const token = await generateToken({ userId: user.id, role: user.role, familyId: user.familyId });
    const sessionUser = createSessionUser({ userId: user.id, role: user.role, familyId: user.familyId }, user.name);
    const result = createLoginSuccess(sessionUser);

    return NextResponse.json({ ...result, token }, { status: 200, headers: { "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800` } });
  } catch (error) {
    return NextResponse.json(createLoginError("登录失败，请稍后再试。"), { status: 500 });
  }
}

// codex-ok: 2026-04-10T12:05:00+08:00