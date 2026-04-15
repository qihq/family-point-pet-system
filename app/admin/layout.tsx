import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import "@/styles/admin-theme.css";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get("token")?.value || "";
  const payload = token ? await verifyToken(token) : null;
  if (!payload || payload.role !== "admin") {
    redirect("/login");
  }

  const items = [
    { href: "/admin", label: "总览", icon: "📊" },
    { href: "/admin/parents", label: "家长账号", icon: "👨‍👩‍👧" },
    { href: "/admin/logs", label: "操作日志", icon: "📰" },
    { href: "/admin/system", label: "系统", icon: "⚙️" },
  ];

  return (
    <div lang="zh-CN" data-theme="admin">
      <div className="min-h-screen" style={{ background: "var(--a-bg)", color: "var(--a-text)", fontFamily: "var(--font-body)" }}>
        <aside className="fixed inset-y-0 left-0 hidden w-[240px] md:flex" style={{ background: "var(--a-card)", borderRight: "1px solid var(--a-border)" }}>
          <div className="flex flex-1 flex-col p-4">
            <div className="mb-4 text-lg font-bold">{`Admin 控制台`}</div>
            <nav className="flex-1 space-y-1">
              {items.map((item) => (
                <Link key={item.href} href={item.href} className="block rounded-md px-3 py-2 hover:bg-white/5" style={{ color: "var(--a-text)" }}>
                  <span className="mr-2" aria-hidden>{item.icon}</span>
                  <span className="align-middle">{item.label}</span>
                </Link>
              ))}
            </nav>
            <div className="mt-4">
              <AdminLogoutButton />
            </div>
          </div>
        </aside>

        <div className="min-h-screen md:pl-[240px]">
          <main className="mx-auto max-w-6xl px-4 pb-16 pt-4 md:pb-6">{children}</main>
        </div>

        <nav className="fixed bottom-0 left-0 right-0 md:hidden" style={{ background: "var(--a-card)", borderTop: "1px solid var(--a-border)" }}>
          <div className="grid grid-cols-4 py-2 text-center text-xs">
            {items.map((item) => (
              <Link key={item.href} href={item.href} className="px-1" style={{ color: "var(--a-muted)" }}>
                <div className="flex flex-col items-center">
                  <span className="text-lg" aria-hidden>{item.icon}</span>
                  <span className="mt-0.5">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

// codex-ok: 2026-04-15T13:14:00+08:00
