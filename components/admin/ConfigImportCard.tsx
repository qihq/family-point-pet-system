"use client";

import { useState } from "react";

type RestoreSummary = {
  families: number;
  users: number;
  pointRules: number;
  pointRecords: number;
  rewardItems: number;
  taskPlans: number;
  pets: number;
};

export default function ConfigImportCard() {
  const [file, setFile] = useState<File | null>(null);
  const [confirmText, setConfirmText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [summary, setSummary] = useState<RestoreSummary | null>(null);
  const [inputKey, setInputKey] = useState(0);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setError("请先选择一个全量备份 JSON 文件。");
      setSuccess("");
      setSummary(null);
      return;
    }
    if (confirmText.trim() !== "RESTORE") {
      setError("请输入确认词 RESTORE。");
      setSuccess("");
      setSummary(null);
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");
    setSummary(null);

    try {
      const formData = new FormData();
      formData.set("file", file);
      formData.set("confirmText", confirmText.trim());

      const response = await fetch("/api/admin/config-import", {
        method: "POST",
        body: formData,
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "恢复失败，请稍后重试。");
      }

      setSuccess("备份恢复完成。若恢复了不同账号数据，建议重新登录一次再继续使用。");
      setSummary(data.summary ?? null);
      setFile(null);
      setConfirmText("");
      setInputKey((value) => value + 1);
    } catch (restoreError: any) {
      setError(restoreError?.message || "恢复失败，请稍后重试。");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-xl border p-4" style={{ background: "var(--a-card)", borderColor: "var(--a-border)" }}>
      <div className="text-base font-semibold">从备份恢复</div>
      <p className="mt-2 text-sm" style={{ color: "var(--a-muted)" }}>
        上传管理员导出的全量备份 JSON，系统会清空当前数据库中的业务数据，然后按备份内容完整重建。
      </p>
      <p className="mt-2 text-xs" style={{ color: "var(--a-muted)" }}>
        这是覆盖式恢复。当前家庭、账号、积分、任务、奖励、宠物和推送订阅都会被替换。本地 uploads 文件不会自动恢复。
      </p>

      <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="block text-sm font-medium">备份文件</label>
          <input
            key={inputKey}
            type="file"
            accept="application/json,.json"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="block w-full rounded-lg border px-3 py-2 text-sm"
            style={{ borderColor: "var(--a-border)", background: "transparent" }}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">确认词</label>
          <input
            value={confirmText}
            onChange={(event) => setConfirmText(event.target.value)}
            placeholder="请输入 RESTORE"
            className="block w-full rounded-lg border px-3 py-2 text-sm"
            style={{ borderColor: "var(--a-border)", background: "transparent" }}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex rounded-xl px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          style={{ background: "var(--a-danger)" }}
        >
          {submitting ? "恢复中..." : "开始恢复"}
        </button>
      </form>

      {error ? (
        <div
          className="mt-3 rounded-lg border px-3 py-2 text-sm"
          style={{ borderColor: "var(--a-danger)", color: "var(--a-danger)" }}
        >
          {error}
        </div>
      ) : null}

      {success ? (
        <div
          className="mt-3 rounded-lg border px-3 py-2 text-sm"
          style={{ borderColor: "var(--a-success)", color: "var(--a-success)" }}
        >
          {success}
        </div>
      ) : null}

      {summary ? (
        <div className="mt-3 text-xs" style={{ color: "var(--a-muted)" }}>
          已恢复 {summary.families} 个家庭、{summary.users} 个账号、{summary.pointRules} 条积分规则、
          {summary.pointRecords} 条积分记录、{summary.rewardItems} 个奖励、{summary.taskPlans} 个计划、
          {summary.pets} 个宠物。
        </div>
      ) : null}
    </div>
  );
}
