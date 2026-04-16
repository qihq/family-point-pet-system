export const dynamic = "force-dynamic";

import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {
  checkPinRateLimit,
  createLoginError,
  createLoginSuccess,
  createSessionUser,
  generateToken,
  hashPin,
  isLegacySecret,
  setSessionCookie,
  verifyPin,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface ChildCredentials {
  name: string;
  pin: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<ChildCredentials>;
    const name = String(body.name || "").trim();
    const pin = String(body.pin || "").trim();
    if (!name || !pin) {
      return NextResponse.json(createLoginError("用户名和 PIN 不能为空"), { status: 400 });
    }

    const ipHeader = request.headers.get("x-forwarded-for") || "";
    const ip = (ipHeader.split(",")[0] || request.headers.get("x-real-ip") || "unknown").toString().trim();
    const rateLimit = checkPinRateLimit(ip);
    if (!rateLimit.ok) {
      return NextResponse.json(createLoginError("尝试次数过多，请稍后再试"), {
        status: 429,
        headers: { "Retry-After": String(Math.ceil((rateLimit.retryAfterMs || 0) / 1000)) },
      });
    }

    const user = await prisma.user.findFirst({
      where: { role: Role.child, name: { equals: name, mode: "insensitive" }, isDeleted: false },
      select: { id: true, name: true, role: true, familyId: true, pin: true },
    });
    if (!user || !user.pin || !verifyPin(pin, user.pin)) {
      return NextResponse.json(createLoginError("用户名或 PIN 错误"), { status: 401 });
    }

    if (isLegacySecret(user.pin)) {
      await prisma.user.update({ where: { id: user.id }, data: { pin: hashPin(pin) } });
    }

    const token = await generateToken({ userId: user.id, role: user.role, familyId: user.familyId });
    const response = NextResponse.json(
      { ...createLoginSuccess(createSessionUser({ userId: user.id, role: user.role, familyId: user.familyId }, user.name)), token },
      { status: 200 }
    );
    return setSessionCookie(response, token);
  } catch (error) {
    console.error("孩子登录失败:", error);
    return NextResponse.json(createLoginError("登录失败，请稍后再试。"), { status: 500 });
  }
}
