"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRequireRole } from "@/lib/useRequireRole";

type Status = "pending" | "approved" | "rejected";
type Tab = "records" | "redeems";

type PointRecordRow = {
  id: string;
  createdAt: string;
  points: number;
  description?: string | null;
  reviewNote?: string | null;
  pointRule?: { name?: string | null };
};

type RedeemRow = {
  id: string;
  createdAt: string;
  rewardName: string;
  quantity: number;
  pointsSpent: number;
  note?: string | null;
};

type RedeemSummary = {
  totalRedeems: number;
  totalPointsSpent: number;
  totalQuantity: number;
};

async function readJson(response: Response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

export default function ChildRecordsPage() {
  useRequireRole("child");

  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = (searchParams.get("tab") as Tab) || "records";
  const initialStatus = (searchParams.get("status") as Status) || "pending";

  const [tab, setTab] = useState<Tab>(initialTab);
  const [status, setStatus] = useState<Status>(initialStatus);
  const [recordRows, setRecordRows] = useState<PointRecordRow[]>([]);
  const [redeemRows, setRedeemRows] = useState<RedeemRow[]>([]);
  const [redeemSummary, setRedeemSummary] = useState<RedeemSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const currentTab = (searchParams.get("tab") as Tab) || "records";
    const currentStatus = (searchParams.get("status") as Status) || "pending";
    if (currentTab === tab && (tab !== "records" || currentStatus === status)) return;

    const next = new URLSearchParams();
    next.set("tab", tab);
    if (tab === "records") next.set("status", status);
    router.replace(`/child/records?${next.toString()}`, { scroll: false });
  }, [router, searchParams, status, tab]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");

      try {
        if (tab === "records") {
          const response = await fetch(`/api/point-records?status=${status}&pageSize=50`, {
            cache: "no-store",
            credentials: "include",
          });
          const data = await readJson(response);
          if (!response.ok || !data?.success) {
            throw new Error(data?.error || "获取记录失败");
          }
          setRecordRows(data.data?.records || []);
          return;
        }

        const response = await fetch("/api/rewards/history?limit=50", {
          cache: "no-store",
          credentials: "include",
        });
        const data = await readJson(response);
        if (!response.ok || !data?.success) {
          throw new Error(data?.error || "获取兑换记录失败");
        }
        setRedeemRows(data.data?.logs || []);
        setRedeemSummary(data.data?.summary || null);
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "网络错误");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [status, tab]);

  const headline = useMemo(() => {
    if (tab === "redeems") {
      return {
        title: "兑换记录",
        description: "这里会记录你兑换过什么，也能看到一共花掉了多少积分。",
      };
    }

    return {
      title: status === "pending" ? "等待审核" : status === "approved" ? "已通过记录" : "未通过记录",
      description: "家长处理完成后，这里会马上更新，推送通知也会同步送达。",
    };
  }, [status, tab]);

  return (
    <div className="min-h-screen bg-[var(--c-bg)] px-4 py-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="rounded-[30px] bg-[linear-gradient(135deg,#fff6d9_0%,#fff2e6_55%,#ffffff_100%)] p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-[#b45309]">
                我的记录
              </div>
              <h1 className="mt-3 text-3xl font-extrabold text-[var(--c-text)]" style={{ fontFamily: "var(--font-display)" }}>
                {headline.title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--c-muted)]">{headline.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTab("records")}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  tab === "records" ? "bg-[var(--c-orange)] text-white" : "bg-white text-[var(--c-text)]"
                }`}
              >
                审核结果
              </button>
              <button
                onClick={() => setTab("redeems")}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  tab === "redeems" ? "bg-[var(--c-orange)] text-white" : "bg-white text-[var(--c-text)]"
                }`}
              >
                兑换记录
              </button>
            </div>
          </div>

          {tab === "records" && (
            <div className="mt-5 flex flex-wrap gap-2">
              {(["pending", "approved", "rejected"] as Status[]).map((value) => (
                <button
                  key={value}
                  onClick={() => setStatus(value)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    status === value ? "bg-white text-[var(--c-text)] shadow-sm" : "text-[var(--c-muted)]"
                  }`}
                >
                  {value === "pending" ? "待审核" : value === "approved" ? "已通过" : "未通过"}
                </button>
              ))}
            </div>
          )}
        </section>

        {tab === "redeems" && redeemSummary && !loading && !error && (
          <section className="grid gap-4 md:grid-cols-3">
            <Metric label="兑换次数" value={redeemSummary.totalRedeems} hint="累计成功兑换" />
            <Metric label="兑换数量" value={redeemSummary.totalQuantity} hint="一共换走了多少件" />
            <Metric label="花掉积分" value={redeemSummary.totalPointsSpent} hint="奖励池消费总额" />
          </section>
        )}

        {error && (
          <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl bg-white px-5 py-8 text-sm text-gray-500 shadow-sm">加载中…</div>
        ) : tab === "records" ? (
          recordRows.length === 0 ? (
            <EmptyState text="当前筛选下还没有记录，完成新的任务后再来看看。" />
          ) : (
            <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
              <div className="border-b border-gray-100 px-5 py-4">
                <h2 className="text-lg font-semibold text-[var(--c-text)]">审核记录</h2>
              </div>
              <div className="space-y-3 p-4">
                {recordRows.map((row) => (
                  <article key={row.id} className="rounded-2xl border border-[#f5e2d2] bg-[#fffdfa] p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="font-semibold text-[var(--c-text)]">{row.pointRule?.name || "未命名规则"}</div>
                        <div className="mt-1 text-sm text-gray-500">{new Date(row.createdAt).toLocaleString("zh-CN")}</div>
                      </div>
                      <div className="rounded-full bg-[#fff2e3] px-3 py-1 text-sm font-semibold text-[var(--c-orange)]">
                        {status === "approved" ? `+${row.points || 0}` : row.points || 0}
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">{row.description || "这次没有补充说明。"}</div>
                    {row.reviewNote && (
                      <div className="mt-3 rounded-2xl bg-[#fff8ef] px-4 py-3 text-sm text-gray-600">
                        家长反馈：{row.reviewNote}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )
        ) : redeemRows.length === 0 ? (
          <EmptyState text="还没有兑换记录，攒够积分后来换一个喜欢的奖励吧。" />
        ) : (
          <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-4">
              <h2 className="text-lg font-semibold text-[var(--c-text)]">最近兑换</h2>
            </div>
            <div className="space-y-3 p-4">
              {redeemRows.map((row) => (
                <article key={row.id} className="rounded-2xl border border-[#f5e2d2] bg-[#fffdfa] p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="font-semibold text-[var(--c-text)]">{row.rewardName || "未命名奖励"}</div>
                      <div className="mt-1 text-sm text-gray-500">{new Date(row.createdAt).toLocaleString("zh-CN")}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-rose-600">-{row.pointsSpent} 积分</div>
                      <div className="mt-1 text-xs text-gray-500">数量 {row.quantity}</div>
                    </div>
                  </div>
                  {row.note && <div className="mt-3 text-sm text-gray-600">{row.note}</div>}
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function Metric({ label, value, hint }: { label: string; value: string | number; hint: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="text-xs uppercase tracking-[0.18em] text-gray-500">{label}</div>
      <div className="mt-2 text-2xl font-extrabold text-[var(--c-text)]" style={{ fontFamily: "var(--font-display)" }}>
        {value}
      </div>
      <div className="mt-2 text-xs text-gray-500">{hint}</div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-[#f5d8b9] bg-white/80 px-6 py-10 text-center text-sm text-[var(--c-muted)]">
      {text}
    </div>
  );
}
