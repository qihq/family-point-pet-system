import { ParentLogoutButton } from './_logout';
import Link from "next/link";
import "@/styles/parent-theme.css";
import PushInit from "@/components/parent/PushInit";

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  const items = [
    { href: "/parent", label: "总览", icon: "🏠" },
    { href: "/parent/point-rules", label: "任务管理", icon: "🗂️" },
    { href: "/parent/review", label: "积分审核", icon: "📝" },
    { href: "/parent/rewards", label: "奖品管理", icon: "🎁" },
    { href: "/parent/plans", label: "学习计划", icon: "📚" },
    { href: "/parent/settings", label: "账号设置", icon: "⚙️" },
  ];
  return (
    <html lang="zh-CN" data-theme="parent">
      <body className="min-h-screen" style={{ fontFamily: "var(--font-body)" }}>
        {/* Sidebar (desktop) */}
        <aside className="hidden md:flex fixed inset-y-0 left-0 w-[240px] bg-[var(--p-card)] border-r border-[var(--p-border)]">
          <div className="flex-1 flex flex-col p-4">
            <div className="text-lg font-bold text-[var(--p-text)] mb-4">{`家长中心`}</div>
            <nav className="flex-1 space-y-1 text-[var(--p-text)]">
              {items.map((it) => (
                <Link key={it.href} href={it.href} className="block px-3 py-2 rounded-md hover:bg-gray-100">
                  <span className="mr-2" aria-hidden>{it.icon}</span>
                  <span className="align-middle">{it.label}</span>
                </Link>
              ))}
            </nav>
            <div className="mt-4"><ParentLogoutButton /></div>
          </div>
        </aside>

        {/* Main content */}
        <div className="md:pl-[240px] min-h-screen bg-[var(--p-bg)] text-[var(--p-text)]">
          <main className="mx-auto max-w-6xl px-4 pb-16 md:pb-6 pt-4">{children}</main>
        </div>

        {/* Bottom tabs (mobile) */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--p-card)] border-t border-[var(--p-border)] backdrop-blur">
          <div className="grid grid-cols-5 py-2 text-center text-xs">
            {items.slice(0,5).map((it) => (
              <Link key={it.href} href={it.href} className="px-1">
                <div className="flex flex-col items-center">
                  <span className="text-lg" aria-hidden>{it.icon}</span>
                  <span className="mt-0.5 text-[var(--p-muted)]">{it.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </nav>

        {/* SW + Push registration */}
        <PushInit publicKey={process.env.VAPID_PUBLIC_KEY as string || ""} />
      </body>
    </html>
  );
}

// codex-ok: 2026-04-10T15:55:00+08:00