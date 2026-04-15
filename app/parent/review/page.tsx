import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ReviewClient, { ReviewItem } from "@/components/parent/ReviewClient";

async function getInitial(): Promise<ReviewItem[]> {
  const token = cookies().get("token")?.value || null;
  const payload = token ? await verifyToken(token) : null;
  if (!payload || (payload.role !== "parent" && payload.role !== "admin")) {
    redirect("/login");
  }
  const familyId = payload.familyId;
  // pending TaskLog (note contains 'pending-approval')
  const taskLogs = await prisma.taskLog.findMany({
    where: { note: { contains: "pending-approval" }, child: { familyId } },
    include: { taskPlan: { select: { title: true, points: true } }, child: { select: { id: true, name: true, avatarUrl: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  // pending PointRecord
  const pointRecords = await prisma.pointRecord.findMany({
    where: { status: "pending", child: { familyId } },
    include: { pointRule: { select: { name: true, points: true } }, child: { select: { id: true, name: true, avatarUrl: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  const a: ReviewItem[] = taskLogs.map((x) => ({ id: x.id, kind: "plan", childName: x.child?.name || "", childAvatar: x.child?.avatarUrl || null, title: x.taskPlan?.title || "-", createdAt: x.createdAt.toISOString(), pointsPreview: x.taskPlan?.points || 0 }));
  const b: ReviewItem[] = pointRecords.map((x) => ({ id: x.id, kind: "rule", childName: x.child?.name || "", childAvatar: x.child?.avatarUrl || null, title: x.pointRule?.name || "-", createdAt: x.createdAt.toISOString(), pointsPreview: (x.pointRule as any)?.points || 0 }));
  return [...a, ...b].sort((m, n) => new Date(n.createdAt).getTime() - new Date(m.createdAt).getTime());
}

export default async function Page() {
  const initial = await getInitial();
  return (
    <div className="min-h-[calc(100vh-56px)] px-4 pt-4 pb-20" style={{ background: "var(--p-bg)" }}>
      <div className="mx-auto max-w-4xl">
        <ReviewClient initial={initial} />
      </div>
    </div>
  );
}

// codex-ok: 2026-04-10T13:06:00+08:00