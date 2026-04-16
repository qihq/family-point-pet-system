"use client";

import { useEffect, useState } from "react";
import { Frequency, PointsType } from "@prisma/client";
import PointRuleForm, { PointRuleFormData } from "@/components/parent/point-rule-form";

interface PointRule {
  id: string;
  name: string;
  description?: string | null;
  category: string;
  pointsType: PointsType;
  points: number;
  pointsMin?: number | null;
  pointsMax?: number | null;
  needApproval: boolean;
  frequency: Frequency;
  maxTimes?: number | null;
  enabled: boolean;
  targets?: Array<{ childId: string }>;
}

export default function ParentPointRulesPage() {
  const [list, setList] = useState<PointRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<PointRule | null>(null);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/point-rules", { cache: "no-store", credentials: "include" });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "获取规则失败");
      setList(data.data.rules || []);
    } catch (err: any) {
      setError(err.message || "网络错误");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditing(null);
    setShowForm(true);
  }

  async function openEdit(rule: PointRule) {
    try {
      const response = await fetch(`/api/point-rules/${rule.id}`, { cache: "no-store", credentials: "include" });
      const data = await response.json();
      if (response.ok && data.success) {
        setEditing(data.data as PointRule);
        setShowForm(true);
      }
    } catch {}
  }

  async function submit(form: PointRuleFormData) {
    try {
      const url = editing ? `/api/point-rules/${editing.id}` : "/api/point-rules";
      const method = editing ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "保存失败");
      setShowForm(false);
      setEditing(null);
      await load();
    } catch (err: any) {
      alert(err.message || "保存失败");
    }
  }

  async function toggle(rule: PointRule) {
    try {
      const response = await fetch(`/api/point-rules/${rule.id}/toggle`, { method: "PATCH", credentials: "include" });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "操作失败");
      await load();
    } catch (err: any) {
      alert(err.message || "操作失败");
    }
  }

  async function remove(rule: PointRule) {
    if (!confirm(`确定要删除规则“${rule.name}”吗？`)) return;
    try {
      const response = await fetch(`/api/point-rules/${rule.id}`, { method: "DELETE", credentials: "include" });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "删除失败");
      await load();
    } catch (err: any) {
      alert(err.message || "删除失败");
    }
  }

  const categoryText: Record<string, string> = { self_care: "自理", chores: "家务", study: "学习", other: "其他" };
  const freqText: Record<string, string> = { daily: "每天", weekly: "每周", monthly: "每月", once: "一次", unlimited: "不限次数" };
  const initialData: Partial<PointRuleFormData> | undefined = editing
    ? {
        name: editing.name,
        description: editing.description ?? "",
        category: editing.category,
        pointsType: editing.pointsType,
        points: editing.points,
        pointsMin: editing.pointsMin ?? undefined,
        pointsMax: editing.pointsMax ?? undefined,
        needApproval: editing.needApproval,
        frequency: editing.frequency,
        maxTimes: editing.maxTimes ?? undefined,
        enabled: editing.enabled,
        targetChildIds: editing.targets?.map((target) => target.childId) ?? [],
        applyToAll: !editing.targets?.length,
      }
    : undefined;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[var(--text)]">积分规则</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">把任务频率、积分、审核要求和适用孩子统一管理起来。</p>
        </div>
        <button onClick={openCreate} className="rounded-xl bg-[var(--primary)] px-4 py-2.5 font-medium text-white hover:bg-[var(--primary-600)]">
          新建规则
        </button>
      </div>

      {loading ? <div className="rounded-2xl bg-white p-6 text-gray-500 shadow-sm">加载中...</div> : null}
      {error ? <div className="rounded-2xl bg-white p-6 text-red-600 shadow-sm">{error}</div> : null}
      {!loading && !error ? (
        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">名称</th>
                <th className="px-4 py-3 text-left">分类</th>
                <th className="px-4 py-3 text-left">频率</th>
                <th className="px-4 py-3 text-left">积分</th>
                <th className="px-4 py-3 text-left">状态</th>
                <th className="px-4 py-3 text-left">操作</th>
              </tr>
            </thead>
            <tbody>
              {list.map((rule) => (
                <tr key={rule.id} className="border-t">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{rule.name}</div>
                    <div className="mt-1 text-xs text-gray-500">{rule.description || "无补充描述"}</div>
                  </td>
                  <td className="px-4 py-3">{categoryText[rule.category] || rule.category}</td>
                  <td className="px-4 py-3">{freqText[String(rule.frequency)] || rule.frequency}</td>
                  <td className="px-4 py-3">{rule.pointsType === "fixed" ? rule.points : `${rule.pointsMin ?? 0} ~ ${rule.pointsMax ?? 0}`}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs ${rule.enabled ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {rule.enabled ? "启用" : "停用"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => openEdit(rule)} className="text-blue-600 hover:text-blue-800">编辑</button>
                    <button onClick={() => toggle(rule)} className="ml-4 text-amber-600 hover:text-amber-800">启停</button>
                    <button onClick={() => remove(rule)} className="ml-4 text-rose-600 hover:text-rose-800">删除</button>
                  </td>
                </tr>
              ))}
              {list.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-500">当前还没有规则，先创建一条高频任务试试。</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      ) : null}

      {showForm ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/45 p-4">
          <div className="w-full max-w-2xl rounded-[28px] bg-white p-5 shadow-2xl">
            <PointRuleForm
              initialData={initialData}
              onSubmit={submit}
              onCancel={() => {
                setShowForm(false);
                setEditing(null);
              }}
              isEdit={!!editing}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
