export const dynamic = "force-dynamic";

import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {
  createLoginError,
  createLoginSuccess,
  createSessionUser,
  generateToken,
  hashPassword,
  isLegacySecret,
  setSessionCookie,
  verifyPassword,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const name = String(body.name || "").trim();
    const password = String(body.password || "").trim();
    if (!name || !password) {
      return NextResponse.json(createLoginError("用户名和密码不能为空"), { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: { role: Role.admin, name: { equals: name, mode: "insensitive" } },
      select: { id: true, name: true, role: true, familyId: true, password: true },
    });
    if (!user || !user.password || !verifyPassword(password, user.password)) {
      return NextResponse.json(createLoginError("用户名或密码错误"), { status: 401 });
    }

    if (isLegacySecret(user.password)) {
      await prisma.user.update({ where: { id: user.id }, data: { password: hashPassword(password) } });
    }

    const token = await generateToken({ userId: user.id, role: user.role, familyId: user.familyId });
    const response = NextResponse.json(
      { ...createLoginSuccess(createSessionUser({ userId: user.id, role: user.role, familyId: user.familyId }, user.name)), token },
      { status: 200 }
    );
    return setSessionCookie(response, token, request);
  } catch (error) {
    console.error("管理员登录失败:", error);
    return NextResponse.json(createLoginError("登录失败，请稍后重试。"), { status: 500 });
  }
}
