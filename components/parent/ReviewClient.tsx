"use client";

import useSWR from "swr";
import { useCallback, useMemo, useState } from "react";
import Link from "next/link";

export type ReviewItem = {
  id: string;
  kind: "plan" | "rule";
  childName: string;
  childAvatar?: string | null;
  title: string;
  createdAt: string;
  pointsPreview: number;
};

function timeAgo(input: string | number | Date) {
  const d = new Date(input);
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return `${diff}${"秒前"}`;
  if (diff < 3600) return `${Math.floor(diff / 60)}${"分钟前"}`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}${"小时前"}`;
  return `${Math.floor(diff / 86400)}${"天前"}`;
}

const fetcher = async (): Promise<ReviewItem[]> => {
  const [rt, rr] = await Promise.all([
    fetch("/api/tasks/pending", { credentials: "include", cache: "no-store" }),
    fetch("/api/point-records?status=pending&pageSize=100", { credentials: "include", cache: "no-store" }),
  ]);
  const dt = await rt.json().catch(() => ({ success: false, data: [] }));
  const dr = await rr.json().catch(() => ({ success: false, data: { records: [] } }));
  const a: ReviewItem[] = (Array.isArray(dt.data) ? dt.data : []).map((x: any) => ({
    id: x.id,
    kind: "plan" as const,
    childName: x.child?.name || "",
    childAvatar: x.child?.avatarUrl || null,
    title: x.taskPlan?.title || "-",
    createdAt: x.createdAt,
    pointsPreview: x.pointsPreview || 0,
  }));
  const b: ReviewItem[] = (((dr.data || {}).records) || []).map((x: any) => ({
    id: x.id,
    kind: "rule" as const,
    childName: x.child?.name || "",
    childAvatar: x.child?.avatarUrl || null,
    title: x.pointRule?.name || "-",
    createdAt: x.createdAt,
    pointsPreview: x.pointRule?.points || 0,
  }));
  return [...a, ...b].sort((m, n) => new Date(n.createdAt).getTime() - new Date(m.createdAt).getTime());
};

export default function ReviewClient({ initial }: { initial: ReviewItem[] }) {
  const { data, mutate, isLoading } = useSWR<ReviewItem[]>("parent-review-pending", fetcher, { fallbackData: initial });
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({});
  const items = data || [];
  const count = items.length;

  const approveOne = useCallback(async (item: ReviewItem) => {
    setLoadingIds((m) => ({ ...m, [item.id]: true }));
    const rollback = items;
    try {
      // optimistic remove
      await mutate(items.filter((x) => x.id !== item.id), { revalidate: false });
      const body: any = { action: "approve", points: item.pointsPreview || 0 };
      const url = item.kind === "plan" ? `/api/tasks/pending/${item.id}` : `/api/point-records/${item.id}/review`;
      const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(body) });
      const d = await r.json(); if (!r.ok || !d.success) throw new Error(d.error || "操作失败");
      // success, revalidate softly
      await mutate();
    } catch (e: any) {
      alert(e.message || "操作失败");
      await mutate(rollback, { revalidate: false });
    } finally {
      setLoadingIds((m) => ({ ...m, [item.id]: false }));
    }
  }, [items, mutate]);

  const rejectOne = useCallback(async (item: ReviewItem) => {
    setLoadingIds((m) => ({ ...m, [item.id]: true }));
    const rollback = items;
    try {
      await mutate(items.filter((x) => x.id !== item.id), { revalidate: false });
      const body: any = { action: "reject" };
      const url = item.kind === "plan" ? `/api/tasks/pending/${item.id}` : `/api/point-records/${item.id}/review`;
      const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(body) });
      const d = await r.json(); if (!r.ok || !d.success) throw new Error(d.error || "操作失败");
      await mutate();
    } catch (e: any) {
      alert(e.message || "操作失败");
      await mutate(rollback, { revalidate: false });
    } finally {
      setLoadingIds((m) => ({ ...m, [item.id]: false }));
    }
  }, [items, mutate]);

  const approveAll = useCallback(async () => {
    if (items.length === 0) return;
    const confirmAll = confirm(`${"确定批准所有待审核记录？"} (${items.length})`);
    if (!confirmAll) return;
    const rollback = items;
    await mutate([], { revalidate: false });
    try {
      await Promise.all(items.map((it) => {
        const body: any = { action: "approve", points: it.pointsPreview || 0 };
        const url = it.kind === "plan" ? `/api/tasks/pending/${it.id}` : `/api/point-records/${it.id}/review`;
        return fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(body) }).then(async (r) => {
          const d = await r.json().catch(() => ({})); if (!r.ok || !d.success) throw new Error(d.error || "操作失败");
        });
      }));
      await mutate();
    } catch (e: any) {
      alert(e.message || "批量操作失败，已回滚");
      await mutate(rollback, { revalidate: false });
    }
  }, [items, mutate]);

  const content = useMemo(() => {
    if (isLoading) return <div className="mt-6 text-[var(--p-muted)]">{`加载中…`}</div>;
    if (!items.length) {
      return (
        <div className="mt-10 flex flex-col items-center text-center text-[var(--p-muted)]">
          <div className="text-6xl mb-3">🕊️</div>
          <div className="text-lg">{`暂无待审核任务，孩子们都很棒！`}</div>
        </div>
      );
    }
    return (
      <div className="space-y-3 mt-4">
        {items.map((it) => (
          <div key={it.id} className="bg-[var(--p-card)] border border-[var(--p-border)] rounded-[var(--p-radius)] p-3 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: "#E7F0FE" }}>
                <span className="text-sm" aria-hidden>{(it.childName || "?").slice(0, 1)}</span>
              </div>
              <div className="min-w-0">
                <div className="text-[var(--p-text)] font-semibold truncate">{it.title}</div>
                <div className="text-xs text-[var(--p-muted)] truncate">{it.childName} · {timeAgo(it.createdAt)}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-blue-600 font-bold">+{it.pointsPreview || 0}</div>
              <div className="flex items-center gap-2">
                <button onClick={() => approveOne(it)} disabled={!!loadingIds[it.id]} className="px-3 py-1.5 rounded-md bg-emerald-600 text-white text-sm disabled:opacity-60">
                  {loadingIds[it.id] ? "…" : "✓ 批准"}
                </button>
                <button onClick={() => rejectOne(it)} disabled={!!loadingIds[it.id]} className="px-3 py-1.5 rounded-md bg-red-50 text-red-700 border border-red-200 text-sm disabled:opacity-60">
                  {loadingIds[it.id] ? "…" : "✗ 拒绝"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }, [items, isLoading, loadingIds, approveOne, rejectOne]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-[var(--p-text)]">{`待审核`}</h1>
          <span className="inline-flex items-center justify-center w-5 h-5 text-[10px] rounded-full bg-red-500 text-white">{count}</span>
        </div>
        <div>
          <button onClick={approveAll} disabled={!items.length} className="px-3 py-1.5 rounded-md bg-[var(--p-accent)] text-white text-sm disabled:opacity-50">
            {`全部批准`}
          </button>
        </div>
      </div>
      {content}
    </div>
  );
}

// codex-ok: 2026-04-10T13:05:00+08:00