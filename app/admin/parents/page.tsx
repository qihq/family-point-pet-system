"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRequireRole } from "@/lib/useRequireRole";

interface ParentRow {
  id: string;
  name: string;
  createdAt?: string;
}

type FormState = {
  id?: string;
  name: string;
  password: string;
};

type Notice = { tone: "success" | "error"; text: string } | null;

function emptyForm(): FormState {
  return { name: "", password: "" };
}

export default function AdminParentsPage() {
  useRequireRole("admin");

  const [rows, setRows] = useState<ParentRow[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState<Notice>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<ParentRow | null>(null);

  const isEdit = Boolean(form.id);
  const selectedRow = useMemo(
    () => rows.find((row) => row.id === selected) ?? null,
    [rows, selected]
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/parents?q=${encodeURIComponent(q)}`, {
        cache: "no-store",
        credentials: "include",
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "加载家长账户失败");
      }

      const nextRows = (data.data as ParentRow[]) || [];
      setRows(nextRows);
      setSelected((current) => {
        if (current && nextRows.some((row) => row.id === current)) return current;
        return nextRows[0]?.id || "";
      });

      setForm((current) => {
        if (current.id) {
          const matched = nextRows.find((row) => row.id === current.id);
          if (matched) return { id: matched.id, name: matched.name, password: "" };
        }
        const first = nextRows[0];
        return first ? { id: first.id, name: first.name, password: "" } : emptyForm();
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "网络错误");
    } finally {
      setLoading(false);
    }
  }, [q]);

  useEffect(() => {
    void load();
  }, [load]);

  function startCreate() {
    setSelected("");
    setDeleteTarget(null);
    setForm(emptyForm());
    setNotice(null);
  }

  function startEdit(row: ParentRow) {
    setSelected(row.id);
    setDeleteTarget(null);
    setForm({ id: row.id, name: row.name, password: "" });
    setNotice(null);
  }

  async function submit() {
    setSaving(true);
    setNotice(null);
    try {
      const payload = {
        name: form.name.trim(),
        password: form.password.trim() || undefined,
      };

      if (!payload.name) {
        throw new Error("请输入家长名称");
      }

      if (isEdit) {
        const response = await fetch(`/api/admin/parents/${form.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        const data = await response.json().catch(() => null);
        if (!response.ok || !data?.success) {
          throw new Error(data?.error || "保存失败");
        }
        setNotice({ tone: "success", text: "家长账户已更新" });
      } else {
        if (!payload.password) {
          throw new Error("请填写初始密码");
        }
        const response = await fetch("/api/admin/parents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        const data = await response.json().catch(() => null);
        if (!response.ok || !data?.success) {
          throw new Error(data?.error || "创建失败");
        }
        setNotice({ tone: "success", text: "家长账户已创建" });
      }

      await load();
    } catch (caught) {
      setNotice({
        tone: "error",
        text: caught instanceof Error ? caught.message : "操作失败",
      });
    } finally {
      setSaving(false);
    }
  }

  async function removeCurrent() {
    if (!deleteTarget) return;

    setSaving(true);
    setNotice(null);
    try {
      const response = await fetch(`/api/admin/parents/${deleteTarget.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "删除失败");
      }

      const deletedName = deleteTarget.name;
      setDeleteTarget(null);
      startCreate();
      setNotice({ tone: "success", text: `已删除家长“${deletedName}”` });
      await load();
    } catch (caught) {
      setNotice({
        tone: "error",
        text: caught instanceof Error ? caught.message : "删除失败",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--a-bg)", color: "var(--a-text)" }}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-3">
        <section
          className="overflow-hidden rounded-2xl lg:col-span-2"
          style={{ background: "var(--a-card)", border: "1px solid var(--a-border)" }}
        >
          <div className="flex flex-wrap items-center gap-2 border-b p-4" style={{ borderColor: "var(--a-border)" }}>
            <input
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="搜索家长名称"
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none sm:w-64"
              style={{ borderColor: "var(--a-border)", background: "transparent", color: "var(--a-text)" }}
            />
            <button
              onClick={() => void load()}
              className="rounded-xl px-3 py-2 text-sm text-white"
              style={{ background: "var(--a-accent)" }}
            >
              搜索
            </button>
            <div className="flex-1" />
            <button
              onClick={startCreate}
              className="rounded-xl px-3 py-2 text-sm text-white"
              style={{ background: "var(--a-accent)" }}
            >
              新增家长
            </button>
          </div>

          {loading ? (
            <div className="p-6 text-sm">加载中…</div>
          ) : error ? (
            <div className="p-6 text-sm" style={{ color: "var(--a-danger)" }}>
              {error}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead style={{ color: "var(--a-muted)" }}>
                  <tr>
                    <th className="px-4 py-3 text-left">家长名称</th>
                    <th className="px-4 py-3 text-left">创建时间</th>
                    <th className="px-4 py-3 text-left">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td className="px-4 py-10 text-center" colSpan={3} style={{ color: "var(--a-muted)" }}>
                        暂无家长账户
                      </td>
                    </tr>
                  ) : (
                    rows.map((row) => (
                      <tr
                        key={row.id}
                        className="border-t"
                        style={{
                          borderColor: "var(--a-border)",
                          background: selected === row.id ? "rgba(251, 191, 36, 0.08)" : "transparent",
                        }}
                      >
                        <td className="px-4 py-3 font-medium">{row.name}</td>
                        <td className="px-4 py-3" style={{ color: "var(--a-muted)" }}>
                          {row.createdAt ? new Date(row.createdAt).toLocaleString() : "—"}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => startEdit(row)}
                              className="rounded-lg border px-3 py-1.5"
                              style={{ borderColor: "var(--a-border)" }}
                            >
                              编辑
                            </button>
                            <button
                              onClick={() => setDeleteTarget(row)}
                              className="rounded-lg border px-3 py-1.5"
                              style={{ borderColor: "var(--a-danger)", color: "var(--a-danger)" }}
                            >
                              删除
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <aside className="space-y-4">
          <section
            className="rounded-2xl p-4"
            style={{ background: "var(--a-card)", border: "1px solid var(--a-border)" }}
          >
            <div className="mb-1 text-lg font-semibold">{isEdit ? "编辑家长" : "新增家长"}</div>
            <p className="mb-4 text-sm" style={{ color: "var(--a-muted)" }}>
              {selectedRow
                ? `当前选中：${selectedRow.name}`
                : "创建后系统会自动分配新的家庭空间。"}
            </p>

            {notice && (
              <div
                className="mb-4 rounded-xl px-3 py-2 text-sm"
                style={{
                  background: notice.tone === "success" ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
                  color: notice.tone === "success" ? "#065f46" : "#991b1b",
                }}
              >
                {notice.text}
              </div>
            )}

            <div className="space-y-3">
              <label className="block text-sm">
                家长名称
                <input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  className="mt-1 w-full rounded-xl border px-3 py-2 outline-none"
                  style={{ borderColor: "var(--a-border)", background: "transparent", color: "var(--a-text)" }}
                />
              </label>

              <label className="block text-sm">
                {isEdit ? "重置密码（可选）" : "初始密码"}
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                  placeholder={isEdit ? "留空表示不修改" : "至少输入一个初始密码"}
                  className="mt-1 w-full rounded-xl border px-3 py-2 outline-none"
                  style={{ borderColor: "var(--a-border)", background: "transparent", color: "var(--a-text)" }}
                />
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={isEdit ? startCreate : () => setForm(emptyForm())}
                  className="rounded-xl border px-3 py-2 text-sm"
                  style={{ borderColor: "var(--a-border)" }}
                >
                  {isEdit ? "切换为新建" : "清空"}
                </button>
                <button
                  onClick={() => void submit()}
                  disabled={saving}
                  className="rounded-xl px-3 py-2 text-sm text-white disabled:opacity-60"
                  style={{ background: "var(--a-accent)" }}
                >
                  {saving ? "保存中…" : "保存"}
                </button>
              </div>
            </div>
          </section>

          {deleteTarget && (
            <section
              className="rounded-2xl p-4"
              style={{ background: "rgba(127, 29, 29, 0.08)", border: "1px solid rgba(239, 68, 68, 0.25)" }}
            >
              <div className="text-sm font-semibold">确认删除家长</div>
              <p className="mt-2 text-sm" style={{ color: "var(--a-muted)" }}>
                将删除“{deleteTarget.name}”及其账号，操作不可恢复。
              </p>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="rounded-xl border px-3 py-2 text-sm"
                  style={{ borderColor: "var(--a-border)" }}
                >
                  取消
                </button>
                <button
                  onClick={() => void removeCurrent()}
                  disabled={saving}
                  className="rounded-xl bg-red-600 px-3 py-2 text-sm text-white disabled:opacity-60"
                >
                  {saving ? "删除中…" : "确认删除"}
                </button>
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
