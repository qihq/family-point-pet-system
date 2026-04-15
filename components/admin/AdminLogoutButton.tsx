"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function onClick() {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch {}
    router.push("/login");
  }

  return <button onClick={onClick} className="mt-auto rounded-md border px-3 py-2 text-sm transition hover:bg-white/5" style={{ borderColor: "var(--a-border)", color: "var(--a-text)", background: "transparent" }}>{`退出登录`}</button>;
}

// codex-ok: 2026-04-15T13:14:00+08:00
