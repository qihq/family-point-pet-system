import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PetCard } from "@/components/child/PetCard";
import TaskCard from "@/components/child/TaskCard";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-6 mb-2 text-lg font-extrabold" style={{ color: "var(--c-text)", fontFamily: "var(--font-display)" }}>{children}</h2>;
}

async function getData() {
  const token = cookies().get("token")?.value || null;
  const payload = token ? await verifyToken(token) : null;
  if (!payload || payload.role !== "child") {
    redirect("/login");
  }
  const child = await prisma.user.findUnique({ where: { id: payload.userId }, select: { id: true, name: true, familyId: true, streak: true, totalEarnedPoints: true, pet: true, avatarUrl: true } });
  if (!child) redirect("/login");

  const todayStart = new Date(); todayStart.setHours(0,0,0,0);
  const tasks = await prisma.taskPlan.findMany({ where: { childId: child.id, enabled: true }, orderBy: { createdAt: "desc" }, take: 8 });
  const logsToday = await prisma.taskLog.findMany({ where: { childId: child.id, createdAt: { gte: todayStart } }, select: { taskPlanId: true } });
  const doneSet = new Set(logsToday.map(l => l.taskPlanId || ""));

  const rewards = await prisma.rewardItem.findMany({ where: { familyId: child.familyId, enabled: true }, orderBy: { cost: "asc" }, take: 10 });

  const ths = [100, 300, 600, 1000];
  const level = child.pet?.level || 1;
  const xp = child.pet?.exp || 0;
  const xpToNext = ths[Math.min(level - 1, ths.length - 1)] || 100;

  return { child, tasks, doneSet, rewards, petView: { level, xp, xpToNext, hunger: child.pet?.hunger || 80, mood: child.pet?.mood || 80 } };
}

export default async function Page() {
  const cacheVAvatar = String(Date.now());
  const { child, tasks, doneSet, rewards, petView } = await getData();
  return (
    <div className="min-h-[calc(100vh-56px)] pb-24 px-4 pt-4" style={{ background: "var(--c-bg)" }}>
      <div className="mx-auto max-w-3xl">
        <div className="sticky top-0 z-10 -mx-4 px-4 py-3 bg-[var(--c-bg)]/90 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[var(--c-yellow)] flex items-center justify-center float-anim">
                {child.avatarUrl ? (
                  <img src={child.avatarUrl + (child.avatarUrl.includes('?') ? "&" : "?") + "v=" + cacheVAvatar} alt="avatar" className="w-9 h-9 rounded-full object-cover" />
                ) : (
                  <span aria-hidden>🐾</span>
                )}
              </div>
              <div>
                <div className="text-sm text-[var(--c-muted)]">{`欢迎回来`}</div>
                <div className="font-bold text-[var(--c-text)]">{child.name}</div>
              </div>
            </div>
            <div className="text-[var(--c-orange)] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>{child.totalEarnedPoints} {`积分`}</div>
          </div>
        </div>

        <div className="mt-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E6] text-[var(--c-orange)] font-semibold fire-pulse">🔥 {`连续打卡`} {child.streak} {`天`}</div>
        </div>

        <SectionTitle>{`我的宠物`}</SectionTitle>
        <PetCard name={"小橘猫"} level={petView.level} xp={petView.xp} xpToNext={petView.xpToNext} hunger={petView.hunger} mood={petView.mood} />

        <SectionTitle>{`今日任务`}</SectionTitle>
        <div className="space-y-3">
          {tasks.map((t, idx) => (
            <TaskCard
              key={t.id}
              id={t.id}
              name={t.title}
              desc={t.description || undefined}
              points={t.points}
              color={(idx % 4 === 0 ? "blue" : idx % 4 === 1 ? "green" : idx % 4 === 2 ? "purple" : "pink") as any}
              done={doneSet.has(t.id)}
            />
          ))}
        </div>

        <div className="mt-4">
          <button className="btn-3d w-full rounded-2xl bg-[var(--c-orange)] text-white py-3 font-extrabold" style={{ fontFamily: "var(--font-display)" }}>{`提交`}</button>
        </div>

        <SectionTitle>{`积分兑换`}</SectionTitle>
        <div className="flex gap-3 overflow-x-auto py-1">
          {rewards.map((r) => (
            <div key={r.id} className="shrink-0 w-40 rounded-2xl bg-[var(--c-card)] shadow-sm border border-[#f4e3d6]">
              <div className="h-24 bg-[#f8f3eb] rounded-t-2xl flex items-center justify-center">
                {r.imageUrl ? (
                  <img src={r.imageUrl} alt={r.name} className="w-full h-full object-cover rounded-t-2xl" />
                ) : (
                  <span aria-hidden>🎁</span>
                )}
              </div>
              <div className="p-3">
                <div className="font-semibold text-[var(--c-text)] truncate">{r.name}</div>
                <div className="text-xs text-[var(--c-muted)] truncate">{r.description || ""}</div>
                <div className="mt-1 text-[var(--c-orange)] font-bold">{r.cost} {`积分`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// codex-ok: 2026-04-13T17:27:36
