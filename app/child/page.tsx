import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { PetCard } from "@/components/child/PetCard";
import TaskCard from "@/components/child/TaskCard";

type TaskCardColor = "green" | "purple" | "blue" | "pink";

const taskColors: TaskCardColor[] = ["blue", "green", "purple", "pink"];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-6 text-lg font-extrabold" style={{ color: "var(--c-text)", fontFamily: "var(--font-display)" }}>
      {children}
    </h2>
  );
}

async function getData() {
  const token = cookies().get("token")?.value || null;
  const payload = token ? await verifyToken(token) : null;
  if (!payload || payload.role !== "child") {
    redirect("/login");
  }

  const child = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      name: true,
      familyId: true,
      streak: true,
      totalEarnedPoints: true,
      avatarUrl: true,
      pet: true,
    },
  });
  if (!child) redirect("/login");

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [tasks, logsToday, rewards, recentRedeems] = await Promise.all([
    prisma.taskPlan.findMany({
      where: { childId: child.id, enabled: true },
      orderBy: [{ scheduledAt: "asc" }, { createdAt: "desc" }],
      take: 8,
    }),
    prisma.taskLog.findMany({
      where: { childId: child.id, createdAt: { gte: todayStart } },
      select: { taskPlanId: true, note: true },
    }),
    prisma.rewardItem.findMany({
      where: { familyId: child.familyId, enabled: true },
      orderBy: { cost: "asc" },
      take: 4,
    }),
    prisma.redeemLog.findMany({
      where: { childId: child.id },
      orderBy: { createdAt: "desc" },
      take: 3,
      include: { rewardItem: { select: { name: true } } },
    }),
  ]);

  const taskStatusMap = new Map<string, "done" | "pending">();
  for (const log of logsToday) {
    if (!log.taskPlanId) continue;
    if ((log.note || "").includes("pending-approval")) {
      if (!taskStatusMap.has(log.taskPlanId)) taskStatusMap.set(log.taskPlanId, "pending");
    } else {
      taskStatusMap.set(log.taskPlanId, "done");
    }
  }

  const thresholds = [100, 300, 600, 1000];
  const level = child.pet?.level || 1;
  const xp = child.pet?.exp || 0;
  const xpToNext = thresholds[Math.min(level - 1, thresholds.length - 1)] || 100;

  return {
    child,
    tasks,
    taskStatusMap,
    rewards,
    recentRedeems,
    petView: {
      level,
      xp,
      xpToNext,
      hunger: child.pet?.hunger || 80,
      mood: child.pet?.mood || 80,
    },
  };
}

export default async function ChildHome() {
  const { child, tasks, taskStatusMap, rewards, recentRedeems, petView } = await getData();

  return (
    <div className="min-h-[calc(100vh-56px)] px-4 pb-24 pt-4" style={{ background: "var(--c-bg)" }}>
      <div className="mx-auto max-w-3xl">
        <section className="rounded-[30px] bg-[linear-gradient(135deg,#fff7e0_0%,#fff1e7_55%,#ffffff_100%)] px-5 py-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--c-yellow)] text-lg font-bold text-[var(--c-text)]">
                {child.name.slice(0, 1)}
              </div>
              <div>
                <div className="text-sm text-[var(--c-muted)]">欢迎回来</div>
                <div className="text-xl font-bold text-[var(--c-text)]">{child.name}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-[var(--c-muted)]">累计积分</div>
              <div className="text-2xl font-extrabold text-[var(--c-orange)]" style={{ fontFamily: "var(--font-display)" }}>
                {child.totalEarnedPoints}
              </div>
            </div>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-sm font-semibold text-[var(--c-orange)]">
            连续打卡 {child.streak} 天
          </div>
        </section>

        <SectionTitle>我的宠物</SectionTitle>
        <div className="mt-3">
          <PetCard
            name={child.pet?.name || "小伙伴"}
            level={petView.level}
            xp={petView.xp}
            xpToNext={petView.xpToNext}
            hunger={petView.hunger}
            mood={petView.mood}
          />
        </div>

        <SectionTitle>今日任务</SectionTitle>
        <div className="mt-3 space-y-3">
          {tasks.length ? (
            tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                id={task.id}
                name={task.title}
                desc={task.description || undefined}
                points={task.points}
                color={taskColors[index % taskColors.length]}
                status={taskStatusMap.get(task.id) ?? "idle"}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-amber-200 bg-white/80 px-4 py-5 text-sm text-[var(--c-muted)]">
              今天还没有安排任务，去告诉家长帮你加一些挑战吧。
            </div>
          )}
        </div>

        <div className="mt-4">
          <Link
            href="/child/tasks"
            className="block rounded-2xl bg-[var(--c-orange)] py-3 text-center font-extrabold text-white shadow-[0_14px_30px_rgba(255,107,53,0.22)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            去任务中心
          </Link>
        </div>

        <SectionTitle>奖励目标</SectionTitle>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {rewards.length ? (
            rewards.map((reward) => (
              <div key={reward.id} className="rounded-2xl border border-[#f4e3d6] bg-[var(--c-card)] p-4 shadow-sm">
                <div className="text-sm text-[var(--c-muted)]">需要 {reward.cost} 积分</div>
                <div className="mt-2 font-semibold text-[var(--c-text)]">{reward.name}</div>
                <div className="mt-1 text-sm text-[var(--c-muted)]">{reward.description || "攒够积分后就能兑换。"}</div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-[#f4e3d6] bg-white/80 px-4 py-5 text-sm text-[var(--c-muted)] sm:col-span-2">
              还没有上架奖励，先和家长一起挑几个喜欢的目标吧。
            </div>
          )}
        </div>

        <SectionTitle>最近兑换</SectionTitle>
        <div className="mt-3 space-y-2">
          {recentRedeems.length ? (
            recentRedeems.map((redeem) => (
              <div key={redeem.id} className="rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-sm">
                <div className="font-medium text-[var(--c-text)]">{redeem.rewardItem.name}</div>
                <div className="mt-1 text-sm text-[var(--c-muted)]">
                  花费 {redeem.pointsSpent} 积分 · {new Date(redeem.createdAt).toLocaleDateString("zh-CN")}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-[#f4e3d6] bg-white/80 px-4 py-5 text-sm text-[var(--c-muted)]">
              还没有兑换记录，完成几个任务试试看。
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
