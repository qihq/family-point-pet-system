"use client";

import { useState } from "react";

export type ParentRow = { id: string; name: string; email: string; createdAtISO: string; childrenCount: number };

export default function ParentsTable({ initial }: { initial: ParentRow[] }) {
  const [rows, setRows] = useState<ParentRow[]>(initial);

  async function resetPwd(id: string) {
    const pwd = prompt("输入新密码：", "parent123");
    if (!pwd) return;
    const r = await fetch(`/api/admin/parents/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ password: pwd }) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok || !d.success) alert(d.error || "重置失败");
  }

  async function disable(id: string) {
    if (!confirm("确定禁用该家长账号？")) return;
    const r = await fetch(`/api/admin/parents/${id}`, { method: "DELETE", credentials: "include" });
    const d = await r.json().catch(() => ({}));
    if (!r.ok || !d.success) { alert(d.error || "禁用失败"); return; }
    setRows((xs) => xs.filter((x) => x.id !== id));
  }

  return (
    <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--a-border)" }}>
      <table className="w-full text-sm" style={{ background: "var(--a-card)", color: "var(--a-text)" }}>
        <thead style={{ color: "var(--a-muted)" }}>
          <tr>
            <th className="text-left px-3 py-2">{`姓名`}</th>
            <th className="text-left px-3 py-2">{`邮箱`}</th>
            <th className="text-left px-3 py-2">{`注册时间`}</th>
            <th className="text-left px-3 py-2">{`孩子数量`}</th>
            <th className="text-left px-3 py-2">{`操作`}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id} className="border-t" style={{ borderColor: "var(--a-border)" }}>
              <td className="px-3 py-2">{p.name}</td>
              <td className="px-3 py-2">{p.email}</td>
              <td className="px-3 py-2">{p.createdAtISO.replace("T", " ")}</td>
              <td className="px-3 py-2">{p.childrenCount}</td>
              <td className="px-3 py-2">
                <button onClick={() => resetPwd(p.id)} className="px-2 py-1 rounded-md mr-2" style={{ background: "var(--a-accent)", color: "white" }}>{`重置密码`}</button>
                <button onClick={() => disable(p.id)} className="px-2 py-1 rounded-md" style={{ background: "#1f2937", color: "#fca5a5", border: "1px solid #ef4444" }}>{`禁用`}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// codex-ok: 2026-04-10T13:45:00+08:00