import webpush from "web-push";
import { prisma } from "@/lib/prisma";

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || "";
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || "";
const VAPID_EMAIL = process.env.VAPID_EMAIL || "";

let configured = false;
function ensureConfigured() {
  if (configured) return;
  if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY && VAPID_EMAIL) {
    try {
      webpush.setVapidDetails(`mailto:${VAPID_EMAIL}`, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
      configured = true;
    } catch {}
  }
}

export async function sendToSubscription(sub: { endpoint: string; keys: { p256dh: string; auth: string } }, payload: any) {
  ensureConfigured();
  if (!configured) return;
  try {
    await webpush.sendNotification(sub as any, JSON.stringify(payload));
  } catch {}
}

export async function sendReviewNotificationToFamily(familyId: string, childName: string, taskTitle: string) {
  ensureConfigured();
  if (!configured) return;
  try {
    const parents = await prisma.user.findMany({ where: { familyId, role: "parent" }, select: { id: true } });
    const parentIds = parents.map((p) => p.id);
    if (!parentIds.length) return;
    const subs = await prisma.pushSubscription.findMany({ where: { userId: { in: parentIds } }, select: { endpoint: true, p256dh: true, auth: true } });
    const payload = { title: "🎯 新任务待审核", body: `${childName} 完成了「${taskTitle}」，去看看吧！` };
    await Promise.all(subs.map((s) => sendToSubscription({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload)));
  } catch {}
}

export function getPublicVapidKey(): string {
  return VAPID_PUBLIC_KEY || "";
}

// codex-ok: 2026-04-10T15:40:00+08:00