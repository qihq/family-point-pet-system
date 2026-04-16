"use client";

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRequireRole } from "@/lib/useRequireRole";

interface RewardItem {
  id: string;
  name: string;
  description?: string | null;
  cost: number;
  stock?: number | null;
  enabled: boolean;
  imageUrl?: string | null;
}

type Notice = { tone: "success" | "error"; text: string } | null;

export default function ChildRewardsPage() {
  useRequireRole("child");

  const [items, setItems] = useState<RewardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<Notice>(null);
  const [selected, setSelected] = useState<RewardItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const loadRewards = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/rewards", {
        cache: "no-store",
        credentials: "include",
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "获取奖品失败");
      }
      setItems(((data.data as RewardItem[]) || []).filter((item) => item.enabled));
      setNotice(null);
    } catch (caught) {
      setNotice({
        tone: "error",
        text: caught instanceof Error ? caught.message : "网络错误",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRewards();
  }, [loadRewards]);

  const totalCost = useMemo(() => (selected ? selected.cost * quantity : 0), [quantity, selected]);

  async function submitRedeem() {
    if (!selected) return;

    setSubmitting(true);
    setNotice(null);
    try {
      const response = await fetch("/api/rewards/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ rewardItemId: selected.id, quantity }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "兑换失败");
      }

      setSelected(null);
      setQuantity(1);
      setNotice({ tone: "success", text: `已提交“${selected.name}”兑换请求` });
      await loadRewards();
    } catch (caught) {
      setNotice({
        tone: "error",
        text: caught instanceof Error ? caught.message : "兑换失败",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text)]">奖励兑换</h1>
            <p className="mt-1 text-sm text-gray-500">选择想要的奖励，确认数量后即可发起兑换。</p>
          </div>
        </div>

        {notice && (
          <div
            className="mt-4 rounded-2xl px-4 py-3 text-sm"
            style={{
              background: notice.tone === "success" ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
              color: notice.tone === "success" ? "#065f46" : "#991b1b",
            }}
          >
            {notice.text}
          </div>
        )}

        {loading ? (
          <div className="mt-6 text-sm text-gray-500">加载中…</div>
        ) : items.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-white p-6 text-sm text-gray-500 shadow-sm">暂无可兑换奖励</div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="h-40 w-full object-cover" />
                ) : (
                  <div className="flex h-40 items-center justify-center bg-gray-100 text-sm text-gray-400">暂无图片</div>
                )}

                <div className="space-y-3 p-4">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{item.name}</div>
                    <div className="mt-1 min-h-[2.5rem] text-sm text-gray-500">{item.description || "暂未填写说明"}</div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">所需积分</span>
                    <span className="font-semibold text-rose-600">{item.cost}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">库存</span>
                    <span>{item.stock == null ? "不限" : item.stock}</span>
                  </div>

                  <button
                    onClick={() => {
                      setSelected(item);
                      setQuantity(1);
                    }}
                    className="w-full rounded-xl bg-[var(--primary)] px-3 py-2 text-white hover:bg-[var(--primary-600)]"
                  >
                    兑换这个奖励
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-xl">
            <div className="text-xl font-semibold text-gray-900">确认兑换</div>
            <p className="mt-2 text-sm text-gray-500">
              你正在兑换 <span className="font-medium text-gray-900">{selected.name}</span>。
            </p>

            <label className="mt-4 block text-sm text-gray-600">
              数量
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(event) => setQuantity(Math.max(1, Number(event.target.value || 1)))}
                className="mt-1 w-full rounded-xl border px-3 py-2"
              />
            </label>

            <div className="mt-4 rounded-2xl bg-gray-50 px-4 py-3 text-sm text-gray-600">
              总计将消耗 <span className="font-semibold text-rose-600">{totalCost}</span> 积分
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelected(null);
                  setQuantity(1);
                }}
                className="rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-700"
              >
                取消
              </button>
              <button
                onClick={() => void submitRedeem()}
                disabled={submitting}
                className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm text-white disabled:opacity-60"
              >
                {submitting ? "提交中…" : "确认兑换"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
