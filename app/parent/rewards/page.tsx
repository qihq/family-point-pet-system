/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRequireRole } from "@/lib/useRequireRole";

interface RewardItem {
  id: string;
  name: string;
  description?: string | null;
  cost: number;
  stock?: number | null;
  enabled: boolean;
  imageUrl?: string | null;
  createdAt: string;
}

interface RedeemHistoryItem {
  id: string;
  createdAt: string;
  quantity: number;
  pointsSpent: number;
  childName: string;
  rewardName: string;
  note?: string | null;
}

type Notice = { tone: "success" | "error"; text: string } | null;

async function parseJSON(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

export default function ParentRewardsPage() {
  useRequireRole("parent");

  const [rows, setRows] = useState<RewardItem[]>([]);
  const [history, setHistory] = useState<RedeemHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<Notice>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<RewardItem | null>(null);
  const [cacheV] = useState(() => String(Date.now()));

  const lowStockCount = useMemo(
    () => rows.filter((item) => item.stock != null && item.stock <= 3).length,
    [rows]
  );

  async function load() {
    setLoading(true);
    try {
      const [rewardResponse, historyResponse] = await Promise.all([
        fetch("/api/rewards", { cache: "no-store", credentials: "include" }),
        fetch("/api/rewards/history?childId=all&limit=10", { cache: "no-store", credentials: "include" }),
      ]);
      const rewardData = await parseJSON(rewardResponse);
      const historyData = await parseJSON(historyResponse);

      if (!rewardResponse.ok || !rewardData?.success) {
        throw new Error(rewardData?.error || "获取奖励失败");
      }
      if (!historyResponse.ok || !historyData?.success) {
        throw new Error(historyData?.error || "获取兑换记录失败");
      }

      setRows(rewardData.data as RewardItem[]);
      setHistory(historyData.data?.logs || []);
      setNotice(null);
    } catch (error: any) {
      setNotice({ tone: "error", text: error.message || "加载失败" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function openCreate() {
    setEditing(null);
    setShowForm(true);
  }

  function openEdit(row: RewardItem) {
    setEditing(row);
    setShowForm(true);
  }

  async function save(form: any) {
    setNotice(null);
    try {
      const { imageFile, ...payload } = form || {};
      const url = editing ? `/api/rewards/${editing.id}` : "/api/rewards";
      const method = editing ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await parseJSON(response);
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "保存失败");
      }

      const id = editing ? editing.id : data.data?.id;
      if (id && imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        await fetch(`/api/rewards/${id}/image`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });
      }

      setShowForm(false);
      setEditing(null);
      setNotice({ tone: "success", text: editing ? "奖励已更新" : "奖励已创建" });
      await load();
    } catch (error: any) {
      setNotice({ tone: "error", text: error.message || "保存失败" });
    }
  }

  async function toggle(row: RewardItem) {
    setNotice(null);
    try {
      const response = await fetch(`/api/rewards/${row.id}/toggle`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await parseJSON(response);
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "状态更新失败");
      }
      await load();
    } catch (error: any) {
      setNotice({ tone: "error", text: error.message || "状态更新失败" });
    }
  }

  async function remove(row: RewardItem) {
    if (!confirm(`确定删除奖励“${row.name}”吗？`)) return;
    setNotice(null);
    try {
      const response = await fetch(`/api/rewards/${row.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await parseJSON(response);
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "删除失败");
      }
      setNotice({ tone: "success", text: "奖励已删除" });
      await load();
    } catch (error: any) {
      setNotice({ tone: "error", text: error.message || "删除失败" });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text)]">奖励管理</h1>
            <p className="mt-1 text-sm text-gray-500">同时查看库存状态和兑换记录，奖励闭环会更清楚。</p>
          </div>
          <button onClick={openCreate} className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white">
            新建奖励
          </button>
        </div>

        {notice && (
          <div
            className="rounded-xl px-4 py-3 text-sm"
            style={{
              background: notice.tone === "success" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
              color: notice.tone === "success" ? "#065f46" : "#991b1b",
            }}
          >
            {notice.text}
          </div>
        )}

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-500">奖励总数</div>
            <div className="mt-2 text-2xl font-semibold text-gray-900">{rows.length}</div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-500">启用中</div>
            <div className="mt-2 text-2xl font-semibold text-gray-900">{rows.filter((item) => item.enabled).length}</div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-500">低库存提醒</div>
            <div className="mt-2 text-2xl font-semibold text-gray-900">{lowStockCount}</div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="border-b px-5 py-4">
              <h2 className="text-lg font-semibold text-gray-900">奖励库存</h2>
            </div>
            {loading ? (
              <div className="px-5 py-8 text-sm text-gray-500">加载中…</div>
            ) : rows.length === 0 ? (
              <div className="px-5 py-8 text-sm text-gray-500">还没有配置奖励</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-500">
                    <tr>
                      <th className="px-4 py-3 text-left">图片</th>
                      <th className="px-4 py-3 text-left">名称</th>
                      <th className="px-4 py-3 text-left">所需积分</th>
                      <th className="px-4 py-3 text-left">库存</th>
                      <th className="px-4 py-3 text-left">状态</th>
                      <th className="px-4 py-3 text-left">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.id} className="border-t">
                        <td className="px-4 py-3">
                          {row.imageUrl ? (
                            <img src={`${row.imageUrl}${row.imageUrl.includes("?") ? "&" : "?"}v=${cacheV}`} alt={row.name} className="h-12 w-12 rounded object-cover" />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-100 text-xs text-gray-400">无图</div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{row.name}</div>
                          <div className="mt-1 text-xs text-gray-500">{row.description || "未填写说明"}</div>
                        </td>
                        <td className="px-4 py-3">{row.cost}</td>
                        <td className={`px-4 py-3 ${row.stock != null && row.stock <= 3 ? "text-rose-600" : ""}`}>
                          {row.stock == null ? "不限" : row.stock}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2 py-0.5 text-xs ${row.enabled ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>
                            {row.enabled ? "启用" : "停用"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-3">
                            <button onClick={() => openEdit(row)} className="text-blue-600 hover:text-blue-800">编辑</button>
                            <button onClick={() => void toggle(row)} className="text-amber-600 hover:text-amber-800">启停</button>
                            <button onClick={() => void remove(row)} className="text-rose-600 hover:text-rose-800">删除</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">最近兑换记录</h2>
            <p className="mt-1 text-sm text-gray-500">用来判断奖励是否真的有吸引力，以及库存是否需要补充。</p>
            <div className="mt-5 space-y-3">
              {history.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-200 px-4 py-6 text-sm text-gray-500">
                  还没有兑换记录
                </div>
              ) : (
                history.map((item) => (
                  <div key={item.id} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-medium text-gray-900">{item.rewardName}</div>
                        <div className="mt-1 text-sm text-gray-500">
                          {item.childName} · 数量 {item.quantity} · 消耗 {item.pointsSpent} 积分
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString("zh-CN")}
                      </div>
                    </div>
                    {item.note && <div className="mt-2 text-xs text-gray-500">{item.note}</div>}
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {showForm && (
          <RewardFormModal
            initial={editing || undefined}
            onClose={() => {
              setShowForm(false);
              setEditing(null);
            }}
            onSave={save}
          />
        )}
      </div>
    </div>
  );
}

function RewardFormModal({ initial, onClose, onSave }: { initial?: RewardItem; onClose: () => void; onSave: (form: any) => void }) {
  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [cost, setCost] = useState<number>(initial?.cost ?? 100);
  const [stock, setStock] = useState<number | null>(initial?.stock ?? null);
  const [enabled, setEnabled] = useState<boolean>(initial?.enabled ?? true);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
        <div className="text-lg font-semibold text-gray-900">{initial ? "编辑奖励" : "新建奖励"}</div>
        <div className="mt-4 space-y-3">
          <label className="block text-sm text-gray-700">
            名称
            <input value={name} onChange={(event) => setName(event.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2" />
          </label>
          <label className="block text-sm text-gray-700">
            说明
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} className="mt-1 min-h-[80px] w-full rounded-xl border px-3 py-2" />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm text-gray-700">
              所需积分
              <input type="number" min={1} value={cost} onChange={(event) => setCost(Math.max(1, Number(event.target.value || 1)))} className="mt-1 w-full rounded-xl border px-3 py-2" />
            </label>
            <label className="block text-sm text-gray-700">
              库存
              <input
                type="number"
                value={stock == null ? "" : String(stock)}
                onChange={(event) => setStock(event.target.value === "" ? null : Number(event.target.value))}
                className="mt-1 w-full rounded-xl border px-3 py-2"
              />
            </label>
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={enabled} onChange={(event) => setEnabled(event.target.checked)} />
            启用
          </label>
          <label className="block text-sm text-gray-700">
            图片
            <input type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files?.[0] || null)} className="mt-1 w-full text-sm" />
          </label>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-700">取消</button>
          <button
            disabled={submitting}
            onClick={async () => {
              setSubmitting(true);
              await onSave({ name, description, cost, stock, enabled, imageFile });
              setSubmitting(false);
            }}
            className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm text-white disabled:opacity-60"
          >
            {submitting ? "保存中…" : "保存"}
          </button>
        </div>
      </div>
    </div>
  );
}
