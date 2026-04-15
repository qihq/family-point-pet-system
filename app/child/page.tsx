import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PetCard } from "@/components/child/PetCard";
import TaskCard from "@/components/child/TaskCard";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-2 mt-6 text-lg font-extrabold" style={{ color: "var(--c-text)", fontFamily: "var(--font-display)" }}>{children}</h2>;
}

async function getData() {
  const token = cookies().get("token")?.value || null;
  const payload = token ? await verifyToken(token) : null;
  if (!payload || payload.role !== "child") {
    redirect("/login");
  }

  const child = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, name: true, familyId: true, streak: true, totalEarnedPoints: true, pet: true, avatarUrl: true },
  });
  if (!child) redirect("/login");

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const tasks = await prisma.taskPlan.findMany({
    where: { childId: child.id, enabled: true },
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  const logsToday = await prisma.taskLog.findMany({
    where: { childId: child.id, createdAt: { gte: todayStart } },
    select: { taskPlanId: true, note: true },
  });

  const taskStatusMap = new Map<string, "done" | "pending">();
  for (const log of logsToday) {
    if (!log.taskPlanId) continue;
    if ((log.note || "").includes("pending-approval")) {
      if (!taskStatusMap.has(log.taskPlanId)) {
        taskStatusMap.set(log.taskPlanId, "pending");
      }
    } else {
      taskStatusMap.set(log.taskPlanId, "done");
    }
  }

  const rewards = await prisma.rewardItem.findMany({
    where: { familyId: child.familyId, enabled: true },
    orderBy: { cost: "asc" },
    take: 10,
  });

  const thresholds = [100, 300, 600, 1000];
  const level = child.pet?.level || 1;
  const xp = child.pet?.exp || 0;
  const xpToNext = thresholds[Math.min(level - 1, thresholds.length - 1)] || 100;

  return {
    child,
    tasks,
    taskStatusMap,
    rewards,
    petView: {
      level,
      xp,
      xpToNext,
      hunger: child.pet?.hunger || 80,
      mood: child.pet?.mood || 80,
    },
  };
}

export default async function Page() {
  const cacheVAvatar = String(Date.now());
  const { child, tasks, taskStatusMap, rewards, petView } = await getData();

  return (
    <div className="min-h-[calc(100vh-56px)] px-4 pb-24 pt-4" style={{ background: "var(--c-bg)" }}>
      <div className="mx-auto max-w-3xl">
        <div className="sticky top-0 z-10 -mx-4 bg-[var(--c-bg)]/90 px-4 py-3 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="float-anim flex h-9 w-9 items-center justify-center rounded-full bg-[var(--c-yellow)]">
                {child.avatarUrl ? (
                  <img src={child.avatarUrl + (child.avatarUrl.includes("?") ? "&" : "?") + "v=" + cacheVAvatar} alt="avatar" className="h-9 w-9 rounded-full object-cover" />
                ) : (
                  <span aria-hidden>{`🐾`}</span>
                )}
              </div>
              <div>
                <div className="text-sm text-[var(--c-muted)]">{`欢迎回来`}</div>
                <div className="font-bold text-[var(--c-text)]">{child.name}</div>
              </div>
            </div>
            <div className="font-extrabold text-[var(--c-orange)]" style={{ fontFamily: "var(--font-display)" }}>{`${child.totalEarnedPoints} 积分`}</div>
          </div>
        </div>

        <div className="mt-3">
          <div className="fire-pulse inline-flex items-center gap-2 rounded-full bg-[#FFF0E6] px-3 py-1 font-semibold text-[var(--c-orange)]">{`🔥 连续打卡 ${child.streak} 天`}</div>
        </div>

        <SectionTitle>{`我的宠物`}</SectionTitle>
        <PetCard name={"小橘猫"} level={petView.level} xp={petView.xp} xpToNext={petView.xpToNext} hunger={petView.hunger} mood={petView.mood} />

        <SectionTitle>{`今日任务`}</SectionTitle>
        <div className="space-y-3">
          {tasks.map((task, idx) => (
            <TaskCard
              key={task.id}
              id={task.id}
              name={task.title}
              desc={task.description || undefined}
              points={task.points}
              color={(idx % 4 === 0 ? "blue" : idx % 4 === 1 ? "green" : idx % 4 === 2 ? "purple" : "pink") as const}
              status={taskStatusMap.get(task.id) ?? "idle"}
            />
          ))}
        </div>

        <div className="mt-4">
          <Link href="/child/tasks" className="btn-3d block w-full rounded-2xl bg-[var(--c-orange)] py-3 text-center font-extrabold text-white" style={{ fontFamily: "var(--font-display)" }}>{`前往任务中心`}</Link>
        </div>

        <SectionTitle>{`积分兑换`}</SectionTitle>
        <div className="flex gap-3 overflow-x-auto py-1">
          {rewards.map((reward) => (
            <div key={reward.id} className="w-40 shrink-0 rounded-2xl border border-[#f4e3d6] bg-[var(--c-card)] shadow-sm">
              <div className="flex h-24 items-center justify-center rounded-t-2xl bg-[#f8f3eb]">
                {reward.imageUrl ? (
                  <img src={reward.imageUrl} alt={reward.name} className="h-full w-full rounded-t-2xl object-cover" />
                ) : (
                  <span aria-hidden>{`🎁`}</span>
                )}
              </div>
              <div className="p-3">
                <div className="truncate font-semibold text-[var(--c-text)]">{reward.name}</div>
                <div className="truncate text-xs text-[var(--c-muted)]">{reward.description || ""}</div>
                <div className="mt-1 font-bold text-[var(--c-orange)]">{`${reward.cost} 积分`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// codex-ok: 2026-04-15T13:12:00+08:00
