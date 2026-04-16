"use client";

import { useState } from "react";

type RecurringTaskItem = {
  id: string;
  name: string;
  description: string | null;
  points: number;
  frequency: string;
  weekdays: string | null;
  active: boolean;
  createdAt: string;
};

type Notice = { tone: "success" | "error"; text: string } | null;

const weekdayLabels = ["一", "二", "三", "四", "五", "六", "日"];

function formatWeekdays(raw: string | null) {
  if (!raw) return "每天";
  try {
    const values = JSON.parse(raw) as number[];
    if (!Array.isArray(values) || !values.length) return "每天";
    return values.map((value) => `周${weekdayLabels[(value - 1 + 7) % 7]}`).join(" / ");
  } catch {
    return "每天";
  }
}

export default function RecurringTasksManager({ initial }: { initial: RecurringTaskItem[] }) {
  const [items, setItems] = useState(initial);
  const [notice, setNotice] = useState<Notice>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    points: 10,
    frequency: "daily",
    weekdays: [] as number[],
  });

  async function refresh() {
    const response = await fetch("/api/tasks/recurring", {
      cache: "no-store",
      credentials: "include",
    });
    const data = await response.json().catch(() => null);
    if (!response.ok || !data?.success) {
      throw new Error(data?.error || "刷新周期任务失败");
    }
    setItems(data.data || []);
  }

  async function createTask() {
    setLoading(true);
    setNotice(null);
    try {
      const response = await fetch("/api/tasks/recurring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          points: form.points,
          frequency: form.frequency,
          weekdays: form.weekdays,
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "创建周期任务失败");
      }
      setForm({ name: "", description: "", points: 10, frequency: "daily", weekdays: [] });
      setNotice({ tone: "success", text: "周期任务已保存" });
      await refresh();
    } catch (error: any) {
      setNotice({ tone: "error", text: error.message || "创建周期任务失败" });
    } finally {
      setLoading(false);
    }
  }

  async function generateToday() {
    setLoading(true);
    setNotice(null);
    try {
      const response = await fetch("/api/tasks/recurring/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({}),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "生成今日任务失败");
      }
      setNotice({ tone: "success", text: `已生成 ${data.data?.created || 0} 条今日任务` });
    } catch (error: any) {
      setNotice({ tone: "error", text: error.message || "生成今日任务失败" });
    } finally {
      setLoading(false);
    }
  }

  async function toggleTask(task: RecurringTaskItem) {
    setLoading(true);
    setNotice(null);
    try {
      const response = await fetch(`/api/tasks/recurring/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ active: !task.active }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "更新状态失败");
      }
      await refresh();
    } catch (error: any) {
      setNotice({ tone: "error", text: error.message || "更新状态失败" });
    } finally {
      setLoading(false);
    }
  }

  async function removeTask(task: RecurringTaskItem) {
    if (!confirm(`确定删除周期任务“${task.name}”吗？`)) return;
    setLoading(true);
    setNotice(null);
    try {
      const response = await fetch(`/api/tasks/recurring/${task.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "删除周期任务失败");
      }
      setNotice({ tone: "success", text: "周期任务已删除" });
      await refresh();
    } catch (error: any) {
      setNotice({ tone: "error", text: error.message || "删除周期任务失败" });
    } finally {
      setLoading(false);
    }
  }

  function toggleWeekday(day: number) {
    setForm((current) => ({
      ...current,
      weekdays: current.weekdays.includes(day)
        ? current.weekdays.filter((item) => item !== day)
        : [...current.weekdays, day].sort((a, b) => a - b),
    }));
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[var(--p-border)] bg-[var(--p-card)] p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--p-text)]">循环任务</h1>
            <p className="mt-1 text-sm text-[var(--p-muted)]">
              把每天或每周重复出现的任务沉淀成模板，再一键生成今天的执行项。
            </p>
          </div>
          <button
            onClick={() => void generateToday()}
            disabled={loading}
            className="rounded-xl bg-[var(--p-accent)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? "处理中…" : "立即生成今天任务"}
          </button>
        </div>

        {notice && (
          <div
            className="mt-4 rounded-xl px-4 py-3 text-sm"
            style={{
              background: notice.tone === "success" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
              color: notice.tone === "success" ? "#065f46" : "#991b1b",
            }}
          >
            {notice.text}
          </div>
        )}

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <label className="text-sm text-[var(--p-text)]">
            任务名称
            <input
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className="mt-1 w-full rounded-xl border px-3 py-2"
            />
          </label>
          <label className="text-sm text-[var(--p-text)]">
            积分
            <input
              type="number"
              min={1}
              value={form.points}
              onChange={(event) => setForm((current) => ({ ...current, points: Math.max(1, Number(event.target.value || 1)) }))}
              className="mt-1 w-full rounded-xl border px-3 py-2"
            />
          </label>
          <label className="text-sm text-[var(--p-text)] md:col-span-2">
            描述
            <input
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              className="mt-1 w-full rounded-xl border px-3 py-2"
            />
          </label>
          <label className="text-sm text-[var(--p-text)]">
            频率
            <select
              value={form.frequency}
              onChange={(event) => setForm((current) => ({ ...current, frequency: event.target.value }))}
              className="mt-1 w-full rounded-xl border px-3 py-2"
            >
              <option value="daily">每天</option>
              <option value="weekly">每周</option>
            </select>
          </label>
          <div className="text-sm text-[var(--p-text)]">
            生效星期
            <div className="mt-1 flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <button
                  key={day}
                  onClick={() => toggleWeekday(day)}
                  type="button"
                  className={`rounded-full border px-3 py-1 text-xs ${form.weekdays.includes(day) ? "bg-[var(--p-accent)] text-white" : "bg-white text-[var(--p-text)]"}`}
                >
                  周{weekdayLabels[day - 1]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => void createTask()}
            disabled={loading || !form.name.trim()}
            className="rounded-xl bg-[var(--p-accent)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            保存模板
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--p-border)] bg-[var(--p-card)] p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[var(--p-text)]">当前模板</h2>
            <p className="mt-1 text-sm text-[var(--p-muted)]">启用中的模板会在每日生成时自动扩散为今天的任务。</p>
          </div>
          <div className="text-sm text-[var(--p-muted)]">共 {items.length} 条</div>
        </div>

        <div className="mt-5 space-y-3">
          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[var(--p-border)] px-4 py-6 text-sm text-[var(--p-muted)]">
              还没有配置循环任务，先创建一个每天或每周模板。
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="rounded-xl border border-[var(--p-border)] bg-[var(--p-bg)] px-4 py-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-[var(--p-text)]">{item.name}</div>
                      <span className={`rounded-full px-2 py-0.5 text-xs ${item.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>
                        {item.active ? "启用中" : "已停用"}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-[var(--p-muted)]">{item.description || "未填写说明"}</div>
                    <div className="mt-2 text-xs text-[var(--p-muted)]">
                      {item.frequency === "weekly" ? "每周" : "每天"} · {formatWeekdays(item.weekdays)} · +{item.points} 积分
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => void toggleTask(item)}
                      className="rounded-lg border border-[var(--p-border)] px-3 py-1.5 text-sm"
                    >
                      {item.active ? "停用" : "启用"}
                    </button>
                    <button
                      onClick={() => void removeTask(item)}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600"
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
