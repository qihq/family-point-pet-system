"use client";

import React from "react";
import WeeklyCalendar, { type CalendarEvent } from "@/components/WeeklyCalendar";
import { useRequireRole } from "@/lib/useRequireRole";

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

interface Rule {
  id: string;
  name: string;
  description?: string;
  points: number;
  category: string;
  needApproval?: boolean;
}

function startOfWeek(date: Date) {
  const weekday = (date.getDay() + 6) % 7;
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - weekday);
  return start;
}

function endOfWeek(date: Date) {
  const end = startOfWeek(date);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

function frequencyLabel(frequency?: string | null) {
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

function eventStatusLabel(event: CalendarEvent) {
  if (event.isPending) {
    return "待审核";
  }
  if (event.isPlanned) {
    return "计划中";
  }
  return "已完成";
}

function eventStatusTone(event: CalendarEvent) {
  if (event.isPending) {
    return "bg-amber-100 text-amber-700";
  }
  if (event.isPlanned) {
    return "bg-slate-100 text-slate-700";
  }
  return "bg-emerald-100 text-emerald-700";
}

function planStatusLabel(status?: "idle" | "pending" | "done", needApproval?: boolean | null) {
  if (status === "done") {
    return { text: "已完成", className: "bg-emerald-100 text-emerald-700" };
  }
  if (status === "pending") {
    return { text: "已提交审核", className: "bg-sky-100 text-sky-700" };
  }
  if (needApproval) {
    return { text: "完成后需审核", className: "bg-amber-100 text-amber-700" };
  }
  return { text: "待执行", className: "bg-slate-100 text-slate-700" };
}

async function readJson(response: Response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

export default function ChildPlansPage() {
  useRequireRole("child");

  const [plans, setPlans] = React.useState<Plan[]>([]);
  const [rules, setRules] = React.useState<Rule[]>([]);
  const [events, setEvents] = React.useState<CalendarEvent[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [calendarLoading, setCalendarLoading] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [selectedEvents, setSelectedEvents] = React.useState<CalendarEvent[]>([]);
  const [, startTransition] = React.useTransition();

  const loadCalendar = React.useCallback(async (from: Date, to: Date) => {
    setCalendarLoading(true);
    try {
      const response = await fetch(`/api/calendar?from=${from.toISOString()}&to=${to.toISOString()}`, {
        cache: "no-store",
        credentials: "include",
      });
      const data = await readJson(response);
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "加载日历失败");
      }

      const nextEvents = (data.data || []) as CalendarEvent[];
      setEvents(nextEvents);
      const selectedKey = selectedDate.toDateString();
      setSelectedEvents(nextEvents.filter((event) => new Date(event.date).toDateString() === selectedKey));
    } finally {
      setCalendarLoading(false);
    }
  }, [selectedDate]);

  React.useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const weekStart = startOfWeek(new Date());
        const weekEnd = endOfWeek(new Date());
        const [taskResponse, ruleResponse, calendarResponse] = await Promise.all([
          fetch("/api/tasks?deleted=false", { cache: "no-store", credentials: "include" }),
          fetch("/api/point-rules?enabled=true&pageSize=200", { cache: "no-store", credentials: "include" }),
          fetch(`/api/calendar?from=${weekStart.toISOString()}&to=${weekEnd.toISOString()}`, {
            cache: "no-store",
            credentials: "include",
          }),
        ]);

        const [taskData, ruleData, calendarData] = await Promise.all([
          readJson(taskResponse),
          readJson(ruleResponse),
          readJson(calendarResponse),
        ]);

        if (!taskResponse.ok || !taskData?.success) {
          throw new Error(taskData?.error || "加载计划任务失败");
        }
        if (!ruleResponse.ok || !ruleData?.success) {
          throw new Error(ruleData?.error || "加载积分规则失败");
        }
        if (!calendarResponse.ok || !calendarData?.success) {
          throw new Error(calendarData?.error || "加载周计划失败");
        }

        const nextEvents = (calendarData.data || []) as CalendarEvent[];
        setPlans(((taskData.data || []) as Plan[]).filter((plan) => plan.enabled !== false));
        setRules(((ruleData.data?.rules || ruleData.data) || []) as Rule[]);
        setEvents(nextEvents);
        setSelectedDate(new Date());
        setSelectedEvents(nextEvents.filter((event) => new Date(event.date).toDateString() === new Date().toDateString()));
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--c-bg)] px-4 py-6">
      <div className="mx-auto max-w-5xl space-y-6 pb-24">
        <section className="rounded-[32px] border border-[#ffd9a8] bg-[linear-gradient(135deg,#fff9e2_0%,#fff3ea_52%,#ffffff_100%)] p-6 shadow-[0_18px_42px_rgba(255,159,67,0.14)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-[#b45309]">计划总览</div>
              <h1 className="text-3xl font-extrabold text-[var(--c-text)]" style={{ fontFamily: "var(--font-display)" }}>
                本周计划、当天安排和积分规则放在同一页，做什么一眼就能看懂。
              </h1>
              <p className="text-sm leading-7 text-[var(--c-muted)]">
                计划任务负责主线安排，积分规则负责补充表现。完成记录和审核状态会同步反映到周历里，不需要来回切页面确认。
              </p>
            </div>
            <div className="grid min-w-[280px] gap-3 sm:grid-cols-3">
              <InfoCard label="计划任务" value={plans.length} hint="本周主线安排" />
              <InfoCard label="积分规则" value={rules.length} hint="可补充打卡项目" />
              <InfoCard label="今日安排" value={selectedEvents.length} hint={selectedDate.toLocaleDateString("zh-CN")} />
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-3xl bg-white p-4 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-[var(--c-text)]">本周周历</h2>
            <p className="mt-1 text-sm text-[var(--c-muted)]">灰色是计划中，蓝色是已提交审核，绿色是已完成。</p>
          </div>
          <WeeklyCalendar
            variant="child"
            weekStart={startOfWeek(selectedDate)}
            events={events}
            loading={calendarLoading}
            onWeekChange={(from, to) => {
              startTransition(() => {
                void loadCalendar(from, to);
              });
            }}
            onDayClick={(date, dayEvents) => {
              setSelectedDate(date);
              setSelectedEvents(dayEvents);
            }}
          />
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-[var(--c-text)]">当天安排</h2>
              <p className="mt-1 text-sm text-[var(--c-muted)]">{selectedDate.toLocaleDateString("zh-CN")} 的计划和完成状态</p>
            </div>
            {calendarLoading ? <span className="text-sm text-[var(--c-muted)]">同步中…</span> : null}
          </div>

          {loading ? (
            <div className="mt-4 text-sm text-[var(--c-muted)]">加载中…</div>
          ) : selectedEvents.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-[#f4e3d6] bg-[#fffaf4] px-4 py-5 text-sm text-[var(--c-muted)]">
              这一天还没有安排，或者已经全部完成。
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {selectedEvents.map((event) => (
                <article key={event.id} className="rounded-2xl border border-[#f4e3d6] bg-[#fffdfa] p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-[var(--c-text)]">{event.title}</h3>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${eventStatusTone(event)}`}>
                          {eventStatusLabel(event)}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-[var(--c-muted)]">
                        {new Date(event.date).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })} ·
                        {event.points > 0 ? ` +${event.points} 积分` : " 等待完成后结算"}
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-[var(--c-orange)]">{event.childName || "我"}</div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-3xl bg-white p-5 shadow-sm">
            <div>
              <h2 className="text-lg font-semibold text-[var(--c-text)]">计划任务</h2>
              <p className="mt-1 text-sm text-[var(--c-muted)]">主线任务会按真实完成和审核状态自动更新。</p>
            </div>

            {loading ? (
              <div className="mt-4 text-sm text-[var(--c-muted)]">加载中…</div>
            ) : plans.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-dashed border-[#f4e3d6] bg-[#fffaf4] px-4 py-5 text-sm text-[var(--c-muted)]">
                暂无计划任务。
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {plans.map((plan) => {
                  const status = planStatusLabel(plan.status, plan.needApproval);
                  return (
                    <article key={plan.id} className="rounded-2xl border border-[#f4e3d6] bg-[#fffdfa] p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-[var(--c-text)]">{plan.title}</h3>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.className}`}>{status.text}</span>
                      </div>
                      <p className="mt-2 text-sm text-[var(--c-muted)]">{plan.description || "这是本周需要推进的主线任务。"}</p>
                      <div className="mt-3 text-xs text-[var(--c-muted)]">
                        {frequencyLabel(plan.frequency)} · +{plan.points} 积分
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          <section className="rounded-3xl bg-white p-5 shadow-sm">
            <div>
              <h2 className="text-lg font-semibold text-[var(--c-text)]">积分规则</h2>
              <p className="mt-1 text-sm text-[var(--c-muted)]">主线外的表现也可以在这里补充记录。</p>
            </div>

            {loading ? (
              <div className="mt-4 text-sm text-[var(--c-muted)]">加载中…</div>
            ) : rules.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-dashed border-[#f4e3d6] bg-[#fffaf4] px-4 py-5 text-sm text-[var(--c-muted)]">
                暂无可用积分规则。
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {rules.map((rule) => (
                  <article key={rule.id} className="rounded-2xl border border-[#f4e3d6] bg-[#fffdfa] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-[var(--c-text)]">{rule.name}</h3>
                        <p className="mt-1 text-sm text-[var(--c-muted)]">{rule.description || "完成后可以补充说明再提交。"}</p>
                      </div>
                      <div className="rounded-full bg-[#fff1df] px-3 py-1 text-sm font-semibold text-[var(--c-orange)]">+{rule.points}</div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-[var(--c-muted)]">
                      <span>{rule.category || "未分类"}</span>
                      <span>{rule.needApproval ? "提交后待审核" : "可直接入账"}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <div className="rounded-2xl bg-white/78 p-4 shadow-sm">
      <div className="text-xs uppercase tracking-[0.16em] text-[var(--c-muted)]">{label}</div>
      <div className="mt-2 text-2xl font-extrabold text-[var(--c-text)]" style={{ fontFamily: "var(--font-display)" }}>
        {value}
      </div>
      <div className="mt-1 text-xs text-[var(--c-muted)]">{hint}</div>
    </div>
  );
}
