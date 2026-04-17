import { cookies } from "next/headers";
import Link from "next/link";
import { RecordStatus, Role } from "@prisma/client";
import ThemeController from "@/components/ThemeController";
import PushInit from "@/components/parent/PushInit";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ParentLogoutButton } from "./_logout";
import "@/styles/parent-theme.css";

async function getPendingReviewCount() {
  const token = cookies().get("token")?.value || null;
  const payload = token ? await verifyToken(token) : null;
  if (!payload || (payload.role !== Role.parent && payload.role !== Role.admin)) {
    return 0;
  }

  const [taskCount, ruleCount] = await Promise.all([
    prisma.taskLog.count({
      where: { note: { contains: "pending-approval" }, child: { familyId: payload.familyId } },
    }),
    prisma.pointRecord.count({
      where: { status: RecordStatus.pending, child: { familyId: payload.familyId } },
    }),
  ]);

  return taskCount + ruleCount;
}

function badgeLabel(value: number) {
  return value > 99 ? "99+" : String(value);
}

export default async function ParentLayout({ children }: { children: React.ReactNode }) {
  const pendingReviewCount = await getPendingReviewCount();
  const navItems = [
    { href: "/parent", label: "总览", icon: "🏠" },
    { href: "/parent/review", label: "待审核", icon: "📝", badge: pendingReviewCount },
    { href: "/parent/plans", label: "学习计划", icon: "📚" },
    { href: "/parent/point-rules", label: "积分规则", icon: "🗂️" },
    { href: "/parent/rewards", label: "奖品管理", icon: "🎁" },
    { href: "/parent/settings", label: "设置", icon: "⚙️" },
  ];

  return (
    <>
      <ThemeController theme="parent" />
      <div className="min-h-screen bg-[var(--p-bg)] text-[var(--p-text)]" style={{ fontFamily: "var(--font-body)" }}>
        <aside className="fixed inset-y-0 left-0 hidden w-[248px] border-r border-[var(--p-border)] bg-[var(--p-card)] md:flex">
          <div className="flex flex-1 flex-col p-5">
            <div className="mb-6">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--p-muted)]">Parent Workspace</div>
              <div className="mt-2 text-xl font-semibold">家长中心</div>
            </div>
            <nav className="flex flex-1 flex-col gap-1.5">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-[var(--primary-50)]">
                  <span aria-hidden>{item.icon}</span>
                  <span className="flex items-center gap-2">
                    <span>{item.label}</span>
                    {item.badge ? (
                      <span className="rounded-full bg-rose-500 px-2 py-0.5 text-xs font-semibold text-white">
                        {badgeLabel(item.badge)}
                      </span>
                    ) : null}
                  </span>
                </Link>
              ))}
            </nav>
            <ParentLogoutButton />
          </div>
        </aside>

        <div className="min-h-screen md:pl-[248px]">
          <main className="mx-auto max-w-6xl px-4 pb-24 pt-4 md:px-6 md:pb-8 md:pt-6">{children}</main>
        </div>

        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--p-border)] bg-[var(--p-card)]/95 backdrop-blur md:hidden">
          <div className="grid grid-cols-4 py-2 text-center text-[11px]">
            {navItems.slice(0, 4).map((item) => (
              <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 px-1 py-1 text-[var(--p-muted)]">
                <span className="relative text-lg" aria-hidden>
                  {item.icon}
                  {item.badge ? (
                    <span className="absolute -right-3 -top-1 rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white">
                      {badgeLabel(item.badge)}
                    </span>
                  ) : null}
                </span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
        <PushInit publicKey={process.env.VAPID_PUBLIC_KEY || ""} />
      </div>
    </>
  );
}
