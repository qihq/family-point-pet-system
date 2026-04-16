import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import ThemeController from "@/components/ThemeController";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import { verifyToken } from "@/lib/auth";
import "@/styles/admin-theme.css";

const navItems = [
  { href: "/admin", label: "总览", icon: "📊" },
  { href: "/admin/parents", label: "家长账户", icon: "👨‍👩‍👧" },
  { href: "/admin/profile", label: "管理员资料", icon: "🪪" },
  { href: "/admin/system", label: "系统", icon: "⚙️" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get("token")?.value || "";
  const payload = token ? await verifyToken(token) : null;
  if (!payload || payload.role !== "admin") {
    redirect("/login");
  }

  return (
    <>
      <ThemeController theme="admin" />
      <div className="min-h-screen bg-[var(--a-bg)] text-[var(--a-text)]" style={{ fontFamily: "var(--font-body)" }}>
        <aside className="fixed inset-y-0 left-0 hidden w-[248px] border-r border-[var(--a-border)] bg-[var(--a-card)] md:flex">
          <div className="flex flex-1 flex-col p-5">
            <div className="mb-6">
              <div className="text-xs uppercase tracking-[0.22em] text-[var(--a-muted)]">Admin Console</div>
              <div className="mt-2 text-xl font-semibold">系统运维台</div>
            </div>
            <nav className="flex flex-1 flex-col gap-1.5">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-white/5">
                  <span aria-hidden>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
            <AdminLogoutButton />
          </div>
        </aside>

        <div className="min-h-screen md:pl-[248px]">
          <main className="mx-auto max-w-6xl px-4 pb-24 pt-4 md:px-6 md:pb-8 md:pt-6">{children}</main>
        </div>

        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--a-border)] bg-[var(--a-card)]/95 backdrop-blur md:hidden">
          <div className="grid grid-cols-4 py-2 text-center text-[11px]">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 px-1 py-1 text-[var(--a-muted)]">
                <span className="text-lg" aria-hidden>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
