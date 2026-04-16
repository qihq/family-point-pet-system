"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRequireRole } from "@/lib/useRequireRole";

type Tx = {
  id: string;
  createdAt: string;
  type: "spend" | "earn";
  sourceType: string;
  amount: number;
  balanceAfter: number;
  description?: string;
  childId: string;
  childName: string;
};

type Summary = {
  count: number;
  earnTotal: number;
  spendTotal: number;
  net: number;
  children: Array<{ childId: string; childName: string; earn: number; spend: number; count: number }>;
};

type ReportResponse = {
  transactions: Tx[];
  summary: Summary;
  comparison: null | {
    previous: Summary;
    delta: { earnTotal: number; spendTotal: number; net: number; count: number };
    label: string;
  };
};

export default function ReportPage() {
  useRequireRole("parent");

  const [kids, setKids] = useState<{ id: string; name: string }[]>([]);
  const [childId, setChildId] = useState("all");
  const [type, setType] = useState("all");
  const [sourceType, setSourceType] = useState("all");
  const [start, setStart] = useState(() => new Date(Date.now() - 6 * 86400000).toISOString().slice(0, 10));
  const [end, setEnd] = useState(() => new Date().toISOString().slice(0, 10));
  const [rows, setRows] = useState<Tx[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [comparison, setComparison] = useState<ReportResponse["comparison"]>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const initialized = useRef(false);

  useEffect(() => {
    fetch("/api/family/children", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) setKids(data.data || []);
      })
      .catch(() => {});
  }, []);

  const query = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (childId !== "all") params.set("childId", childId);
      if (type !== "all") params.set("type", type);
      if (sourceType !== "all") params.set("sourceType", sourceType);
      if (start) params.set("startDate", start);
      if (end) params.set("endDate", end);
      params.set("compare", "previous");

      const response = await fetch(`/api/reports/points?${params.toString()}`, {
        credentials: "include",
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "查询报表失败");
      }

      const payload = data.data as ReportResponse;
      setRows(payload.transactions || []);
      setSummary(payload.summary);
      setComparison(payload.comparison || null);
    } catch (caught: any) {
      setError(caught.message || "查询报表失败");
    } finally {
      setLoading(false);
    }
  }, [childId, end, sourceType, start, type]);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    void query();
  }, [query]);

  function exportCsv() {
    const params = new URLSearchParams();
    if (childId !== "all") params.set("childId", childId);
    if (type !== "all") params.set("type", type);
    if (sourceType !== "all") params.set("sourceType", sourceType);
    if (start) params.set("startDate", start);
    if (end) params.set("endDate", end);
    params.set("format", "csv");
    window.open(`/api/reports/points?${params.toString()}`, "_blank");
  }

  const summaryCards = useMemo(
    () => [
      { label: "收入", value: summary?.earnTotal ?? 0, delta: comparison?.delta.earnTotal ?? 0 },
      { label: "支出", value: summary?.spendTotal ?? 0, delta: comparison?.delta.spendTotal ?? 0 },
      { label: "净增长", value: summary?.net ?? 0, delta: comparison?.delta.net ?? 0 },
      { label: "记录数", value: summary?.count ?? 0, delta: comparison?.delta.count ?? 0 },
    ],
    [comparison, summary]
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">积分报表</h1>
          <p className="mt-1 text-sm text-gray-500">支持按孩子、交易类型、来源和日期范围筛选，并自动对比上一周期。</p>
        </div>

        <section className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-2 lg:grid-cols-5">
          <label className="text-sm text-gray-700">
            孩子
            <select value={childId} onChange={(event) => setChildId(event.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2">
              <option value="all">全部孩子</option>
              {kids.map((kid) => (
                <option key={kid.id} value={kid.id}>
                  {kid.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-gray-700">
            类型
            <select value={type} onChange={(event) => setType(event.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2">
              <option value="all">全部</option>
              <option value="earn">收入</option>
              <option value="spend">支出</option>
            </select>
          </label>

          <label className="text-sm text-gray-700">
            来源
            <select value={sourceType} onChange={(event) => setSourceType(event.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2">
              <option value="all">全部来源</option>
              <option value="task">任务</option>
              <option value="manual">手动</option>
              <option value="pet">宠物</option>
            </select>
          </label>

          <label className="text-sm text-gray-700">
            开始日期
            <input type="date" value={start} onChange={(event) => setStart(event.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2" />
          </label>

          <label className="text-sm text-gray-700">
            结束日期
            <input type="date" value={end} onChange={(event) => setEnd(event.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2" />
          </label>

          <div className="flex gap-2 md:col-span-2 lg:col-span-5">
            <button
              onClick={() => void query()}
              disabled={loading}
              className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {loading ? "查询中…" : "查询报表"}
            </button>
            <button onClick={exportCsv} className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
              导出 CSV
            </button>
          </div>
        </section>

        {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <div key={card.label} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="text-sm text-gray-500">{card.label}</div>
              <div className="mt-2 text-2xl font-semibold text-gray-900">{card.value}</div>
              <div className={`mt-2 text-sm ${card.delta >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                对比上周期 {card.delta >= 0 ? "+" : ""}{card.delta}
              </div>
            </div>
          ))}
        </section>

        {comparison && (
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">周期对比</h2>
            <p className="mt-1 text-sm text-gray-500">当前筛选条件将自动与上一段等长时间区间对比。上一周期：{comparison.label}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {(summary?.children || []).map((child) => {
                const previous = comparison.previous.children.find((item) => item.childId === child.childId);
                const currentNet = child.earn - child.spend;
                const previousNet = (previous?.earn || 0) - (previous?.spend || 0);
                return (
                  <div key={child.childId} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                    <div className="font-medium text-gray-900">{child.childName}</div>
                    <div className="mt-1 text-sm text-gray-500">当前净增长 {currentNet}，上一周期 {previousNet}</div>
                    <div className={`mt-2 text-sm ${(currentNet - previousNet) >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                      差值 {(currentNet - previousNet) >= 0 ? "+" : ""}{currentNet - previousNet}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="border-b px-5 py-4">
            <h2 className="text-lg font-semibold text-gray-900">明细记录</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-4 py-3 text-left">时间</th>
                  <th className="px-4 py-3 text-left">孩子</th>
                  <th className="px-4 py-3 text-left">类型</th>
                  <th className="px-4 py-3 text-left">来源</th>
                  <th className="px-4 py-3 text-left">金额</th>
                  <th className="px-4 py-3 text-left">余额</th>
                  <th className="px-4 py-3 text-left">说明</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      当前筛选条件下没有记录
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => (
                    <tr key={row.id} className="border-t">
                      <td className="px-4 py-3">{new Date(row.createdAt).toLocaleString("zh-CN")}</td>
                      <td className="px-4 py-3">{row.childName}</td>
                      <td className="px-4 py-3">{row.type === "earn" ? "收入" : "支出"}</td>
                      <td className="px-4 py-3">{row.sourceType}</td>
                      <td className={`px-4 py-3 ${row.type === "earn" ? "text-emerald-600" : "text-rose-600"}`}>
                        {row.type === "earn" ? "+" : "-"}
                        {row.amount}
                      </td>
                      <td className="px-4 py-3">{row.balanceAfter}</td>
                      <td className="px-4 py-3 text-gray-500">{row.description || "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
