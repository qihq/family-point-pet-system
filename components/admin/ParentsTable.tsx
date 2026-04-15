"use client";

import { useState } from "react";

export type ParentRow = { id: string; name: string; email: string; createdAtISO: string; childrenCount: number };

export default function ParentsTable({ initial }: { initial: ParentRow[] }) {
  const [rows, setRows] = useState<ParentRow[]>(initial);

  async function resetPwd(id: string) {
    const pwd = prompt("请输入新密码：", "parent123");
    if (!pwd) return;
    const response = await fetch(`/api/admin/parents/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password: pwd }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) alert(data.error || "重置失败");
  }

  async function disable(id: string) {
    if (!confirm("确定禁用该家长账号？")) return;
    const response = await fetch(`/api/admin/parents/${id}`, { method: "DELETE", credentials: "include" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) {
      alert(data.error || "禁用失败");
      return;
    }
    setRows((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--a-border)" }}>
      <table className="w-full text-sm" style={{ background: "var(--a-card)", color: "var(--a-text)" }}>
        <thead style={{ color: "var(--a-muted)" }}>
          <tr>
            <th className="px-3 py-2 text-left">{`姓名`}</th>
            <th className="px-3 py-2 text-left">{`邮箱`}</th>
            <th className="px-3 py-2 text-left">{`注册时间`}</th>
            <th className="px-3 py-2 text-left">{`孩子数量`}</th>
            <th className="px-3 py-2 text-left">{`操作`}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((parent) => (
            <tr key={parent.id} className="border-t" style={{ borderColor: "var(--a-border)" }}>
              <td className="px-3 py-2">{parent.name}</td>
              <td className="px-3 py-2">{parent.email}</td>
              <td className="px-3 py-2">{parent.createdAtISO.replace("T", " ")}</td>
              <td className="px-3 py-2">{parent.childrenCount}</td>
              <td className="px-3 py-2">
                <button onClick={() => resetPwd(parent.id)} className="mr-2 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-500">{`重置密码`}</button>
                <button onClick={() => disable(parent.id)} className="rounded-md border border-red-500 bg-transparent px-3 py-1.5 text-sm font-medium text-red-300 transition hover:bg-red-500/15 hover:text-red-200">{`禁用`}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// codex-ok: 2026-04-15T13:14:00+08:00
