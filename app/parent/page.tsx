import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function statCard(label: string, value: string | number, hint: string) {
  return (
    <div className="rounded-2xl border border-[var(--p-border)] bg-[var(--p-card)] p-5 shadow-sm">
      <div className="text-sm text-[var(--p-muted)]">{label}</div>
      <div className="mt-2 text-3xl font-semibold">{value}</div>
      <div className="mt-2 text-sm text-[var(--p-muted)]">{hint}</div>
    </div>
  );
}

async function getParentDashboard() {
  const token = cookies().get("token")?.value;
  const payload = token ? await verifyToken(token) : null;
  if (!payload || (payload.role !== Role.parent && payload.role !== Role.admin)) {
    redirect("/login");
  }

  const familyId = payload.familyId;
  const [children, pendingLogs, rulesCount, rewardCount, recentPlans, weekPoints] = await Promise.all([
    prisma.user.findMany({
      where: { familyId, role: Role.child, isDeleted: false },
      select: { id: true, name: true, avatarUrl: true, streak: true, totalEarnedPoints: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.taskLog.findMany({
      where: { note: { contains: "pending-approval" }, child: { familyId } },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { child: { select: { name: true } }, taskPlan: { select: { title: true } } },
    }),
    prisma.pointRule.count({ where: { familyId, enabled: true } }),
    prisma.rewardItem.count({ where: { familyId, enabled: true } }),
    prisma.taskPlan.findMany({
      where: { child: { familyId }, enabled: true },
      orderBy: [{ scheduledAt: "asc" }, { createdAt: "desc" }],
      take: 6,
      include: { child: { select: { name: true } } },
    }),
    prisma.pointTransaction.aggregate({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 86400000) } },
      _sum: { amount: true },
    }),
  ]);

  return {
    children,
    pendingLogs,
    rulesCount,
    rewardCount,
    recentPlans,
    weekPoints: weekPoints._sum.amount || 0,
  };
}

export default async function ParentHome() {
  const { children, pendingLogs, rulesCount, rewardCount, recentPlans, weekPoints } = await getParentDashboard();

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] bg-[linear-gradient(135deg,#ffffff_0%,#f7f6f3_55%,#eef6ff_100%)] p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs uppercase tracking-[0.22em] text-[var(--p-muted)]">Family Overview</div>
            <h1 className="text-3xl font-semibold tracking-tight">把待审核、学习计划和孩子表现放到一屏里处理。</h1>
            <p className="text-sm leading-7 text-[var(--p-muted)]">
              当前已接入孩子任务、积分规则、奖励兑换和宠物成长。先从待审核记录和本周计划开始处理，最能快速形成日常闭环。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/parent/review" className="parent-primary-btn">进入审核台</Link>
            <Link href="/parent/children" className="parent-secondary-btn">管理家庭成员</Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCard("待审核任务", pendingLogs.length, "优先处理孩子刚提交的任务完成记录。")}
        {statCard("家庭成员", children.length, "当前家庭里可参与任务和奖励的孩子数量。")}
        {statCard("启用规则", rulesCount, "当前可被提交或审核的积分规则数量。")}
        {statCard("本周积分流动", weekPoints, "近 7 天积分收入与支出的总量。")}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-[var(--p-border)] bg-[var(--p-card)] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">待审核清单</h2>
              <p className="mt-1 text-sm text-[var(--p-muted)]">处理后会直接影响孩子的积分和成长反馈。</p>
            </div>
            <Link href="/parent/review" className="text-sm font-medium text-[var(--p-accent)]">查看全部</Link>
          </div>
          <div className="mt-5 space-y-3">
            {pendingLogs.length ? (
              pendingLogs.map((log) => (
                <div key={log.id} className="rounded-2xl border border-[var(--p-border)] bg-[var(--p-bg)] px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-medium">{log.taskPlan?.title || "自由任务"}</div>
                      <div className="mt-1 text-sm text-[var(--p-muted)]">{log.child.name} · {log.points} 积分</div>
                    </div>
                    <div className="rounded-full bg-[var(--primary-50)] px-3 py-1 text-xs text-[var(--p-accent)]">待审核</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-[var(--p-border)] px-4 py-6 text-sm text-[var(--p-muted)]">
                当前没有待审核任务，可以去完善规则或计划，让孩子端的体验更完整。
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--p-border)] bg-[var(--p-card)] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">孩子概览</h2>
              <p className="mt-1 text-sm text-[var(--p-muted)]">看看谁最近最活跃，谁需要更多奖励目标。</p>
            </div>
            <Link href="/parent/children" className="text-sm font-medium text-[var(--p-accent)]">管理孩子</Link>
          </div>
          <div className="mt-5 space-y-3">
            {children.length ? (
              children.map((child) => (
                <div key={child.id} className="flex items-center gap-4 rounded-2xl border border-[var(--p-border)] px-4 py-3">
                  {child.avatarUrl ? (
                    <Image
                      src={child.avatarUrl}
                      alt={`${child.name} 头像`}
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary-50)] text-sm font-semibold text-[var(--p-accent)]">
                      {child.name.slice(0, 1)}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">{child.name}</div>
                    <div className="mt-1 text-sm text-[var(--p-muted)]">累计积分 {child.totalEarnedPoints} · 连续打卡 {child.streak} 天</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-[var(--p-border)] px-4 py-6 text-sm text-[var(--p-muted)]">
                还没有孩子账号，先在家庭成员页新增一个孩子，主流程才会真正跑起来。
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--p-border)] bg-[var(--p-card)] p-5 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">近期计划与奖励状态</h2>
            <p className="mt-1 text-sm text-[var(--p-muted)]">这里能快速看出计划是否充足，奖励池是否有吸引力。</p>
          </div>
          <div className="text-sm text-[var(--p-muted)]">当前可兑换奖励 {rewardCount} 项</div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {recentPlans.length ? (
            recentPlans.map((plan) => (
              <div key={plan.id} className="rounded-2xl border border-[var(--p-border)] bg-[var(--p-bg)] px-4 py-4">
                <div className="font-medium">{plan.title}</div>
                <div className="mt-2 text-sm text-[var(--p-muted)]">{plan.child.name} · {plan.points} 积分</div>
                <div className="mt-2 text-xs text-[var(--p-muted)]">
                  {plan.frequency || "once"}
                  {plan.scheduledAt ? ` · ${new Date(plan.scheduledAt).toLocaleString("zh-CN")}` : ""}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-[var(--p-border)] px-4 py-6 text-sm text-[var(--p-muted)] md:col-span-2 xl:col-span-3">
              还没有可执行计划，建议先去学习计划页创建每日或每周任务，再结合积分规则和奖励形成稳定循环。
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
