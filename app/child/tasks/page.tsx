"use client";

import Link from "next/link";
import React from "react";
import { PetStage } from "@prisma/client";
import { useRequireRole } from "@/lib/useRequireRole";

interface Rule {
  id: string;
  name: string;
  description?: string;
  points: number;
  pointsType: string;
  category: string;
  enabled: boolean;
  needApproval?: boolean;
}

interface Plan {
  id: string;
  title: string;
  description?: string | null;
  points: number;
  frequency?: string | null;
  enabled?: boolean | null;
  needApproval?: boolean | null;
  status?: "idle" | "pending" | "done";
}

interface PetSnapshot {
  level: number;
  mood: number;
  stage: PetStage;
  exp: number;
}

interface AccountSnapshot {
  balance: number;
}

interface TaskFeedback {
  kind: "approved" | "pending";
  title: string;
  text: string;
  points?: number;
  comboBonus?: number;
  newLevel?: number;
  petGrowth?: {
    expGained: number;
    leveledUp: boolean;
    stageChanged: boolean;
    pet: PetSnapshot;
  };
}

type Notice = { tone: "success" | "error"; text: string } | null;
type PlanStatus = "idle" | "pending" | "done";

const stageLabels: Record<PetStage, string> = {
  egg: "宠物蛋",
  baby: "幼崽",
  growth: "成长中",
  final: "完全体",
};

async function readJson(response: Response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

function getFrequencyLabel(frequency?: string | null) {
  switch (frequency) {
    case "daily":
      return "每日";
    case "weekly":
      return "每周";
    case "monthly":
      return "每月";
    case "once":
      return "单次";
    default:
      return "灵活安排";
  }
}

function renderPlanBadge(plan: Plan, status: PlanStatus) {
  if (status === "done") {
    return <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">已完成</span>;
  }

  if (status === "pending") {
    return <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-700">已提交审核</span>;
  }

  if (plan.needApproval) {
    return <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">完成后需家长审核</span>;
  }

  return null;
}

export default function ChildTasksPage() {
  useRequireRole("child");

  const [rules, setRules] = React.useState<Rule[]>([]);
  const [plans, setPlans] = React.useState<Plan[]>([]);
  const [pet, setPet] = React.useState<PetSnapshot | null>(null);
  const [account, setAccount] = React.useState<AccountSnapshot | null>(null);
  const [statusByPlanId, setStatusByPlanId] = React.useState<Record<string, PlanStatus>>({});
  const [loading, setLoading] = React.useState(true);
  const [submittingId, setSubmittingId] = React.useState<string | null>(null);
  const [selectedRule, setSelectedRule] = React.useState<Rule | null>(null);
  const [ruleNote, setRuleNote] = React.useState("");
  const [notice, setNotice] = React.useState<Notice>(null);
  const [feedback, setFeedback] = React.useState<TaskFeedback | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const [ruleResponse, planResponse, petResponse] = await Promise.all([
        fetch("/api/point-rules?enabled=true&pageSize=200", { cache: "no-store", credentials: "include" }),
        fetch("/api/tasks?deleted=false", { cache: "no-store", credentials: "include" }),
        fetch("/api/pets/me", { cache: "no-store", credentials: "include" }),
      ]);

      const [ruleData, planData, petData] = await Promise.all([
        readJson(ruleResponse),
        readJson(planResponse),
        readJson(petResponse),
      ]);

      if (!ruleResponse.ok || !ruleData?.success) {
        throw new Error(ruleData?.error || "加载积分规则失败");
      }
      if (!planResponse.ok || !planData?.success) {
        throw new Error(planData?.error || "加载任务失败");
      }
      if (!petResponse.ok || !petData?.success) {
        throw new Error(petData?.error || "加载宠物状态失败");
      }

      const nextPlans = ((planData.data || []) as Plan[]).filter((plan) => plan.enabled !== false);
      setRules(((ruleData.data?.rules || ruleData.data) || []) as Rule[]);
      setPlans(nextPlans);
      setStatusByPlanId(
        nextPlans.reduce<Record<string, PlanStatus>>((accumulator, plan) => {
          accumulator[plan.id] = plan.status || "idle";
          return accumulator;
        }, {})
      );
      setPet(petData.data?.pet || null);
      setAccount(petData.data?.account || null);
      setNotice(null);
    } catch (error) {
      setNotice({
        tone: "error",
        text: error instanceof Error ? error.message : "网络错误",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void load();
  }, [load]);

  React.useEffect(() => {
    function handleFocus() {
      void load();
    }

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [load]);

  async function submitRule() {
    if (!selectedRule) {
      return;
    }

    setSubmittingId(`rule:${selectedRule.id}`);
    setNotice(null);

    try {
      const response = await fetch("/api/point-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          pointRuleId: selectedRule.id,
          description: ruleNote.trim() || undefined,
        }),
      });

      const data = await readJson(response);
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "提交失败");
      }

      setSelectedRule(null);
      setRuleNote("");
      setFeedback({
        kind: data.message?.includes("待审核") ? "pending" : "approved",
        title: selectedRule.name,
        text: data.message || "提交成功",
      });
      setNotice({ tone: "success", text: data.message || "提交成功" });
      void load();
    } catch (error) {
      setNotice({
        tone: "error",
        text: error instanceof Error ? error.message : "提交失败",
      });
    } finally {
      setSubmittingId(null);
    }
  }

  async function completePlan(plan: Plan) {
    setSubmittingId(plan.id);
    setNotice(null);

    try {
      const response = await fetch(`/api/tasks/${plan.id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: "{}",
      });
      const data = await readJson(response);
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "完成失败");
      }

      if (data.data?.status === "pending") {
        setStatusByPlanId((current) => ({ ...current, [plan.id]: "pending" }));
        setFeedback({
          kind: "pending",
          title: plan.title,
          text: data.message || "已提交家长审核，稍后会收到结果提醒。",
        });
        setNotice({ tone: "success", text: data.message || "已提交审核" });
        return;
      }

      const nextPet = data.data?.petGrowth?.pet as PetSnapshot | undefined;
      if (nextPet) {
        setPet(nextPet);
      }

      setStatusByPlanId((current) => ({ ...current, [plan.id]: "done" }));
      setFeedback({
        kind: "approved",
        title: plan.title,
        text: "任务完成，积分和宠物成长已经同步更新。",
        points: data.data?.points || 0,
        comboBonus: data.data?.comboBonus || 0,
        newLevel: data.data?.newLevel || nextPet?.level,
        petGrowth: data.data?.petGrowth || undefined,
      });
      setNotice({
        tone: "success",
        text: `已完成「${plan.title}」，获得 ${data.data?.points || 0} 积分`,
      });
      void load();
    } catch (error) {
      setNotice({
        tone: "error",
        text: error instanceof Error ? error.message : "完成失败",
      });
    } finally {
      setSubmittingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--c-bg)] px-4 py-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="overflow-hidden rounded-[32px] border border-[#ffd9a8] bg-[linear-gradient(135deg,#fff6d9_0%,#fff1e8_52%,#ffffff_100%)] p-6 shadow-[0_18px_42px_rgba(255,159,67,0.14)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-[#b45309]">任务中心</div>
              <h1 className="text-3xl font-extrabold text-[var(--c-text)]" style={{ fontFamily: "var(--font-display)" }}>
                计划任务和积分规则会在这里汇总，做完后就能立刻看到成长反馈。
              </h1>
              <p className="text-sm leading-7 text-[var(--c-muted)]">
                先完成计划任务，再补充积分规则打卡。需要家长确认的内容会自动进入审核流，审核完成后页面状态也会同步刷新。
              </p>
            </div>
            <div className="grid min-w-[280px] gap-3 sm:grid-cols-3">
              <SummaryCard label="今日可做" value={plans.length} hint="先完成计划任务最稳妥" />
              <SummaryCard label="当前积分" value={account?.balance ?? 0} hint="兑换奖励时会从这里扣除" />
              <SummaryCard
                label="宠物等级"
                value={pet?.level ?? 1}
                hint={pet ? `${stageLabels[pet.stage]} · 心情 ${pet.mood}%` : "宠物状态加载中"}
              />
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <Link href="/child/plans" className="rounded-full bg-white px-4 py-2 font-semibold text-[var(--c-text)] shadow-sm">
              查看周计划
            </Link>
            <Link href="/child/records?tab=records" className="rounded-full border border-white/70 px-4 py-2 font-semibold text-[var(--c-text)]">
              查看审核结果
            </Link>
            <Link href="/child/rewards" className="rounded-full border border-white/70 px-4 py-2 font-semibold text-[var(--c-text)]">
              去兑换奖励
            </Link>
          </div>
        </section>

        {notice ? (
          <div
            className="rounded-2xl px-4 py-3 text-sm"
            style={{
              background: notice.tone === "success" ? "rgba(34,197,94,0.14)" : "rgba(239,68,68,0.14)",
              color: notice.tone === "success" ? "#166534" : "#991b1b",
            }}
          >
            {notice.text}
          </div>
        ) : null}

        {feedback ? (
          <section className="rounded-3xl border border-[#ffd9a8] bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b45309]">
                  {feedback.kind === "pending" ? "等待审核" : "完成反馈"}
                </div>
                <h2 className="mt-2 text-xl font-bold text-[var(--c-text)]">{feedback.title}</h2>
                <p className="mt-2 text-sm text-[var(--c-muted)]">{feedback.text}</p>
              </div>
              {feedback.kind === "approved" ? (
                <div className="grid gap-3 sm:grid-cols-3">
                  <FeedbackMetric label="获得积分" value={`+${feedback.points || 0}`} />
                  <FeedbackMetric label="连击奖励" value={feedback.comboBonus ? `+${feedback.comboBonus}` : "未触发"} />
                  <FeedbackMetric label="宠物经验" value={feedback.petGrowth ? `+${feedback.petGrowth.expGained}` : "0"} />
                </div>
              ) : null}
            </div>

            {feedback.petGrowth ? (
              <div className="mt-4 grid gap-3 rounded-2xl bg-[#fff8ef] p-4 md:grid-cols-3">
                <div>
                  <div className="text-xs text-[var(--c-muted)]">宠物阶段</div>
                  <div className="mt-1 font-semibold text-[var(--c-text)]">{stageLabels[feedback.petGrowth.pet.stage]}</div>
                </div>
                <div>
                  <div className="text-xs text-[var(--c-muted)]">宠物等级</div>
                  <div className="mt-1 font-semibold text-[var(--c-text)]">
                    Lv.{feedback.petGrowth.pet.level}
                    {feedback.petGrowth.leveledUp ? " · 升级了" : ""}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[var(--c-muted)]">成长状态</div>
                  <div className="mt-1 font-semibold text-[var(--c-text)]">
                    {feedback.petGrowth.stageChanged ? "进入新阶段" : "继续成长中"}
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        ) : null}

        <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold text-[var(--c-text)]">我的计划任务</h2>
              <p className="mt-1 text-sm text-gray-500">状态会根据真实完成记录和审核结果自动更新。</p>
            </div>
            <Link href="/child/plans" className="text-sm font-semibold text-[var(--c-orange)]">
              去周历查看
            </Link>
          </div>

          {loading ? (
            <div className="p-6 text-sm text-gray-500">加载中…</div>
          ) : plans.length === 0 ? (
            <div className="p-6 text-sm text-gray-500">今天还没有安排计划任务。</div>
          ) : (
            <div className="space-y-3 p-4">
              {plans.map((plan) => {
                const status = statusByPlanId[plan.id] || "idle";
                return (
                  <article key={plan.id} className="rounded-2xl border border-[#f6e3d1] bg-[#fffdfa] p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-semibold text-[var(--c-text)]">{plan.title}</h3>
                          {renderPlanBadge(plan, status)}
                        </div>
                        <p className="mt-2 text-sm text-gray-500">{plan.description || "完成后会同步记录到成长链路里。"}</p>
                        <div className="mt-3 text-xs text-gray-500">
                          {getFrequencyLabel(plan.frequency)} · +{plan.points} 积分
                        </div>
                      </div>

                      <button
                        onClick={() => void completePlan(plan)}
                        disabled={status !== "idle" || submittingId === plan.id}
                        className="rounded-2xl bg-[var(--c-orange)] px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {submittingId === plan.id
                          ? "提交中…"
                          : status === "pending"
                            ? "等待审核"
                            : status === "done"
                              ? "今天已完成"
                              : "完成任务"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-[var(--c-text)]">积分规则打卡</h2>
            <p className="mt-1 text-sm text-gray-500">适合补充记录不在计划里的表现，也会进入审核流。</p>
          </div>

          {loading ? (
            <div className="p-6 text-sm text-gray-500">加载中…</div>
          ) : rules.length === 0 ? (
            <div className="p-6 text-sm text-gray-500">暂无可提交的积分规则。</div>
          ) : (
            <div className="grid gap-3 p-4 md:grid-cols-2">
              {rules.map((rule) => (
                <article key={rule.id} className="rounded-2xl border border-[#f5e2d2] bg-[#fffdfa] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-[var(--c-text)]">{rule.name}</h3>
                      <p className="mt-2 text-sm text-gray-500">{rule.description || "完成后可以提交给家长确认。"}</p>
                    </div>
                    <div className="rounded-full bg-[#fff1df] px-3 py-1 text-sm font-semibold text-[var(--c-orange)]">+{rule.points}</div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                    <span>{rule.category || "未分类"}</span>
                    <span>{rule.needApproval ? "提交后待审核" : "可直接入账"}</span>
                  </div>
                  <button
                    onClick={() => setSelectedRule(rule)}
                    className="mt-4 w-full rounded-2xl border border-[#ffd7a6] px-3 py-2 text-sm font-semibold text-[var(--c-text)] transition hover:bg-[#fff5e9]"
                  >
                    填写说明并提交
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {selectedRule ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-[28px] bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-[#b45309]">提交规则打卡</div>
                <h2 className="mt-1 text-xl font-bold text-[var(--c-text)]">{selectedRule.name}</h2>
              </div>
              <button
                onClick={() => {
                  setSelectedRule(null);
                  setRuleNote("");
                }}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
              >
                关闭
              </button>
            </div>

            <p className="mt-3 text-sm text-gray-500">{selectedRule.description || "补充一点说明，家长审核时会更容易理解。"}</p>
            <label className="mt-4 block text-sm text-gray-700">
              这次做了什么
              <textarea
                value={ruleNote}
                onChange={(event) => setRuleNote(event.target.value)}
                placeholder="比如：我把今天的阅读打卡完成了，还写了 20 分钟摘记。"
                className="mt-2 min-h-[120px] w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ffb454]"
              />
            </label>

            <div className="mt-4 rounded-2xl bg-[#fff8ef] px-4 py-3 text-sm text-gray-600">
              预计积分 <span className="font-semibold text-[var(--c-orange)]">+{selectedRule.points}</span>
              {selectedRule.needApproval ? "，提交后会进入家长审核。" : "，符合规则时会自动入账。"}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedRule(null);
                  setRuleNote("");
                }}
                className="rounded-2xl bg-gray-100 px-4 py-2 text-sm text-gray-700"
              >
                取消
              </button>
              <button
                onClick={() => void submitRule()}
                disabled={submittingId === `rule:${selectedRule.id}`}
                className="rounded-2xl bg-[var(--c-orange)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {submittingId === `rule:${selectedRule.id}` ? "提交中…" : "确认提交"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SummaryCard({ label, value, hint }: { label: string; value: string | number; hint: string }) {
  return (
    <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
      <div className="text-xs uppercase tracking-[0.18em] text-gray-500">{label}</div>
      <div className="mt-2 text-2xl font-extrabold text-[var(--c-text)]" style={{ fontFamily: "var(--font-display)" }}>
        {value}
      </div>
      <div className="mt-2 text-xs text-gray-500">{hint}</div>
    </div>
  );
}

function FeedbackMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#fff8ef] px-4 py-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-1 font-semibold text-[var(--c-text)]">{value}</div>
    </div>
  );
}
