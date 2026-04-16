import { NextRequest, NextResponse } from "next/server";
import { requireRequestAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPublicVapidKey } from "@/lib/webpush";

export async function GET() {
  return NextResponse.json({ success: true, publicKey: getPublicVapidKey() });
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireRequestAuth(request);
    if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });

    const body = await request.json().catch(() => ({}));
    const subscription = body?.subscription || body;
    const endpoint = String(subscription?.endpoint || "");
    const p256dh = String(subscription?.keys?.p256dh || "");
    const authKey = String(subscription?.keys?.auth || "");

    if (!endpoint || !p256dh || !authKey) {
      return NextResponse.json({ success: false, error: "无效的订阅信息" }, { status: 400 });
    }

    await prisma.pushSubscription.upsert({
      where: { endpoint },
      create: { endpoint, p256dh, auth: authKey, userId: auth.payload.userId, familyId: auth.payload.familyId },
      update: { p256dh, auth: authKey, userId: auth.payload.userId, familyId: auth.payload.familyId },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "服务器错误" }, { status: 500 });
  }
}
