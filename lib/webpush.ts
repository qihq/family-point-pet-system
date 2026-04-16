import webpush from "web-push";
import { prisma } from "@/lib/prisma";

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || "";
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || "";
const VAPID_EMAIL = process.env.VAPID_EMAIL || "";

let configured = false;

function ensureConfigured() {
  if (configured) return;
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY || !VAPID_EMAIL) return;

  try {
    webpush.setVapidDetails(`mailto:${VAPID_EMAIL}`, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
    configured = true;
  } catch {}
}

type PushPayload = {
  title: string;
  body: string;
  url?: string;
  tag?: string;
};

export async function sendToSubscription(
  subscription: { endpoint: string; keys: { p256dh: string; auth: string } },
  payload: PushPayload
) {
  ensureConfigured();
  if (!configured) return;

  try {
    await webpush.sendNotification(subscription as any, JSON.stringify(payload));
  } catch {}
}

export async function sendFamilyNotification(familyId: string, payload: PushPayload, role: "parent" | "child" | "admin" | "all" = "parent") {
  ensureConfigured();
  if (!configured) return;

  const users = await prisma.user.findMany({
    where: {
      familyId,
      role: role === "all" ? undefined : role,
    },
    select: { id: true },
  });

  if (!users.length) return;

  const subscriptions = await prisma.pushSubscription.findMany({
    where: { userId: { in: users.map((user) => user.id) } },
    select: { endpoint: true, p256dh: true, auth: true },
  });

  await Promise.all(
    subscriptions.map((subscription) =>
      sendToSubscription(
        { endpoint: subscription.endpoint, keys: { p256dh: subscription.p256dh, auth: subscription.auth } },
        payload
      )
    )
  );
}

export async function sendUserNotification(userId: string, payload: PushPayload) {
  ensureConfigured();
  if (!configured) return;

  const subscriptions = await prisma.pushSubscription.findMany({
    where: { userId },
    select: { endpoint: true, p256dh: true, auth: true },
  });

  if (!subscriptions.length) return;

  await Promise.all(
    subscriptions.map((subscription) =>
      sendToSubscription(
        { endpoint: subscription.endpoint, keys: { p256dh: subscription.p256dh, auth: subscription.auth } },
        payload
      )
    )
  );
}

export async function sendReviewNotificationToFamily(familyId: string, childName: string, taskTitle: string) {
  return sendFamilyNotification(
    familyId,
    {
      title: "新的积分审核",
      body: `${childName} 提交了“${taskTitle}”，等待家长处理。`,
      url: "/parent/review",
      tag: "review-rule",
    },
    "parent"
  );
}

export async function sendTaskPendingNotificationToFamily(familyId: string, childName: string, taskTitle: string) {
  return sendFamilyNotification(
    familyId,
    {
      title: "新的任务待审核",
      body: `${childName} 完成了“${taskTitle}”，现在可以去审核了。`,
      url: "/parent/review",
      tag: "review-task",
    },
    "parent"
  );
}

export async function sendReviewOutcomeNotificationToChild(args: {
  childId: string;
  title: string;
  approved: boolean;
  points?: number;
  url?: string;
  tag: string;
}) {
  const body = args.approved
    ? `${args.title} 已通过${args.points ? `，获得 ${args.points} 积分` : ""}。`
    : `${args.title} 本次未通过，去看看家长的反馈吧。`;

  return sendUserNotification(args.childId, {
    title: args.approved ? "审核已通过" : "审核结果已更新",
    body,
    url: args.url || "/child/records",
    tag: args.tag,
  });
}

export function getPublicVapidKey() {
  return VAPID_PUBLIC_KEY;
}
