import HealthStatus from "@/components/admin/HealthStatus";
import ParentsTable, { ParentRow } from "@/components/admin/ParentsTable";
import { prisma } from "@/lib/prisma";

function StatCard({ label, value, hint }: { label: string; value: string | number; hint: string }) {
  return (
    <div className="rounded-2xl border p-5" style={{ background: "var(--a-card)", borderColor: "var(--a-border)" }}>
      <div className="text-sm" style={{ color: "var(--a-muted)" }}>{label}</div>
      <div className="mt-2 text-3xl font-semibold">{value}</div>
      <div className="mt-2 text-sm" style={{ color: "var(--a-muted)" }}>{hint}</div>
    </div>
  );
}

function startOfDay(date: Date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function endOfDay(date: Date) {
  const value = new Date(date);
  value.setHours(23, 59, 59, 999);
  return value;
}

function startOfWeek(date: Date) {
  const weekday = (date.getDay() + 6) % 7;
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  value.setDate(value.getDate() - weekday);
  return value;
}

function endOfWeek(date: Date) {
  const value = startOfWeek(date);
  value.setDate(value.getDate() + 6);
  value.setHours(23, 59, 59, 999);
  return value;
}

async function getStats() {
  const now = new Date();
  const [parentCount, activeChildren, todayCompleted, weekFlow] = await Promise.all([
    prisma.user.count({ where: { role: "parent" } }),
    prisma.taskLog.groupBy({
      by: ["childId"],
      where: { createdAt: { gte: new Date(Date.now() - 7 * 86400000) } },
      _count: { childId: true },
    }).then((groups) => groups.length),
    prisma.taskLog.count({ where: { createdAt: { gte: startOfDay(now), lte: endOfDay(now) } } }),
    prisma.pointTransaction.aggregate({
      where: { createdAt: { gte: startOfWeek(now), lte: endOfWeek(now) } },
      _sum: { amount: true },
    }).then((value) => value._sum.amount || 0),
  ]);
  return { parentCount, activeChildren, todayCompleted, weekFlow };
}

async function getParents(): Promise<ParentRow[]> {
  const parents = await prisma.user.findMany({
    where: { role: "parent" },
    orderBy: { createdAt: "desc" },
    take: 12,
    select: { id: true, name: true, createdAt: true, familyId: true },
  });
  const childrenByFamily = await prisma.user.groupBy({
    by: ["familyId"],
    where: { role: "child" },
    _count: { familyId: true },
  });
  const countByFamily = new Map(childrenByFamily.map((item) => [item.familyId, item._count.familyId] as const));
  return parents.map((parent) => ({
    id: parent.id,
    name: parent.name,
    email: "-",
    createdAtISO: parent.createdAt.toISOString(),
    childrenCount: countByFamily.get(parent.familyId) || 0,
  }));
}

async function getRecentOperations() {
  const [taskLogs, redeems] = await Promise.all([
    prisma.taskLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { child: { select: { name: true } }, taskPlan: { select: { title: true } } },
    }),
    prisma.redeemLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { child: { select: { name: true } }, rewardItem: { select: { name: true } } },
    }),
  ]);

  return [
    ...taskLogs.map((log) => ({
      id: `task-${log.id}`,
      actor: log.child.name,
      action: `完成任务 ${log.taskPlan?.title || "自由任务"}`,
      time: log.createdAt.toISOString(),
    })),
    ...redeems.map((log) => ({
      id: `redeem-${log.id}`,
      actor: log.child.name,
      action: `兑换奖励 ${log.rewardItem.name}`,
      time: log.createdAt.toISOString(),
    })),
  ]
    .sort((a, b) => (a.time > b.time ? -1 : 1))
    .slice(0, 8);
}

export default async function AdminHome() {
  const [stats, parents, logs] = await Promise.all([getStats(), getParents(), getRecentOperations()]);

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border p-6" style={{ background: "linear-gradient(135deg,#111 0%,#171717 60%,#0f2746 100%)", borderColor: "var(--a-border)" }}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.24em]" style={{ color: "var(--a-muted)" }}>System Overview</div>
            <h1 className="text-3xl font-semibold">把系统健康、账户变化和业务动态放在同一张运维面板里。</h1>
            <p className="max-w-2xl text-sm leading-7" style={{ color: "var(--a-muted)" }}>
              现在可以直接看到家长账号规模、孩子活跃度、今日任务完成和积分流动，再配合下面的最近操作帮助你快速排查问题。
            </p>
          </div>
          <HealthStatus />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="家长账户" value={stats.parentCount} hint="当前系统中已创建的家长账号数量。" />
        <StatCard label="近 7 天活跃孩子" value={stats.activeChildren} hint="最近 7 天至少产生过一次任务日志。" />
        <StatCard label="今日完成任务" value={stats.todayCompleted} hint="从任务日志直接统计出来的完成数量。" />
        <StatCard label="本周积分流动" value={stats.weekFlow} hint="近一周积分收入和支出的总流量。" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="mb-3 text-xl font-semibold">家长账户</h2>
          <ParentsTable initial={parents} />
        </div>
        <div className="rounded-2xl border p-5" style={{ background: "var(--a-card)", borderColor: "var(--a-border)" }}>
          <h2 className="text-xl font-semibold">最近操作</h2>
          <p className="mt-1 text-sm" style={{ color: "var(--a-muted)" }}>任务完成和奖励兑换会优先展示，帮助快速了解系统是否在正常运转。</p>
          <div className="mt-5 space-y-3">
            {logs.length ? (
              logs.map((log) => (
                <div key={log.id} className="rounded-2xl border px-4 py-3" style={{ borderColor: "var(--a-border)" }}>
                  <div className="font-medium">{log.actor}</div>
                  <div className="mt-1 text-sm" style={{ color: "var(--a-muted)" }}>{log.action}</div>
                  <div className="mt-2 text-xs" style={{ color: "var(--a-muted)" }}>
                    {new Date(log.time).toLocaleString("zh-CN")}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed px-4 py-6 text-sm" style={{ borderColor: "var(--a-border)", color: "var(--a-muted)" }}>
                还没有近期操作记录，先从创建家长和孩子账号开始。
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
