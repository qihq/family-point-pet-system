import Link from "next/link";
import "@/styles/admin-theme.css";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const items = [
    { href: "/admin", label: "总览", icon: "📊" },
    { href: "/admin/parents", label: "家长账号", icon: "👨‍👩‍👧" },
    { href: "/admin/logs", label: "操作日志", icon: "📰" },
    { href: "/admin/system", label: "系统", icon: "⚙️" },
  ];
  const adminTitle = "Admin 控制台";
  return (
    <div lang="zh-CN" data-theme="admin">
      <div className="min-h-screen" style={{ background: 'var(--a-bg)', color: 'var(--a-text)', fontFamily: 'var(--font-body)' }}>
        <aside className="hidden md:flex fixed inset-y-0 left-0 w-[240px]" style={{ background: 'var(--a-card)', borderRight: '1px solid var(--a-border)' }}>
          <div className="flex-1 flex flex-col p-4">
            <div className="text-lg font-bold mb-4">{adminTitle}</div>
            <nav className="flex-1 space-y-1">
              {items.map((it)=> (
                <Link key={it.href} href={it.href} className="block px-3 py-2 rounded-md hover:opacity-90" style={{ color: 'var(--a-text)', background: 'transparent' }}>
                  <span className="mr-2" aria-hidden>{it.icon}</span>
                  <span className="align-middle">{it.label}</span>
                </Link>
              ))}
            </nav>
            <div className="mt-4"><AdminLogoutButton /></div>
          </div>
        </aside>
        <div className="md:pl-[240px] min-h-screen">
          <main className="mx-auto max-w-6xl px-4 pb-16 md:pb-6 pt-4">{children}</main>
        </div>
        <nav className="md:hidden fixed bottom-0 left-0 right-0" style={{ background: 'var(--a-card)', borderTop: '1px solid var(--a-border)' }}>
          <div className="grid grid-cols-4 py-2 text-center text-xs">
            {items.map((it)=> (
              <Link key={it.href} href={it.href} className="px-1" style={{ color: 'var(--a-muted)' }}>
                <div className="flex flex-col items-center">
                  <span className="text-lg" aria-hidden>{it.icon}</span>
                  <span className="mt-0.5">{it.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

// codex-ok: 2026-04-13T17:08:19