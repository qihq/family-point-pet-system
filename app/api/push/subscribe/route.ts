import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, getTokenFromHeader } from "@/lib/auth";
import { getPublicVapidKey } from "@/lib/webpush";

export async function GET() {
  return NextResponse.json({ success: true, publicKey: getPublicVapidKey() });
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = getTokenFromHeader(authHeader) || request.cookies.get("token")?.value || "";
    if (!token) return NextResponse.json({ success: false, error: "未登录" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ success: false, error: "登录已失效" }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const sub = body?.subscription || body;
    const endpoint = String(sub?.endpoint || "");
    const p256dh = String(sub?.keys?.p256dh || "");
    const auth = String(sub?.keys?.auth || "");
    if (!endpoint || !p256dh || !auth) {
      return NextResponse.json({ success: false, error: "无效的订阅" }, { status: 400 });
    }

    await prisma.pushSubscription.upsert({
      where: { endpoint },
      create: { endpoint, p256dh, auth, userId: payload.userId, familyId: payload.familyId },
      update: { p256dh, auth, userId: payload.userId, familyId: payload.familyId },
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || "服务器错误" }, { status: 500 });
  }
}

// codex-ok: 2026-04-10T15:45:00+08:00