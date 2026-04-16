"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Input } from "@/components/ui";

type LoginTab = "parent" | "child" | "admin";

const tabMeta: Record<LoginTab, { label: string; hint: string; endpoint: string; destination: string; fieldHint: string }> = {
  parent: {
    label: "家长登录",
    hint: "进入审核台、学习计划、奖励库存和家庭报表。",
    endpoint: "/api/auth/parent-login",
    destination: "/parent",
    fieldHint: "请输入家长账号",
  },
  child: {
    label: "孩子登录",
    hint: "打开今日任务、成长记录、宠物互动和奖励目标。",
    endpoint: "/api/auth/child-login",
    destination: "/child",
    fieldHint: "请输入孩子账号",
  },
  admin: {
    label: "管理员登录",
    hint: "进入账户运维、系统健康和后台维护入口。",
    endpoint: "/api/auth/admin-login",
    destination: "/admin",
    fieldHint: "请输入管理员账号",
  },
};

export default function LoginPage() {
  const [tab, setTab] = useState<LoginTab>("parent");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "1" || params.get("role") === "admin") {
      setTab("admin");
    }
  }, []);

  const visibleTabs = useMemo<LoginTab[]>(
    () => (tab === "admin" ? ["parent", "child", "admin"] : ["parent", "child"]),
    [tab]
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(tabMeta[tab].endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(tab === "child" ? { name, pin } : { name, password }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) {
        setError(data.error || "登录失败，请检查输入信息。");
        return;
      }

      window.location.assign(tabMeta[tab].destination);
    } catch {
      setError("网络异常，请稍后再试。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,142,110,0.18),_transparent_40%),linear-gradient(180deg,#fff7f0_0%,#fffaf5_100%)] px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between rounded-full border border-white/80 bg-white/70 px-4 py-3 shadow-[0_20px_50px_rgba(255,142,110,0.08)] backdrop-blur">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Family Point Pet</div>
            <div className="mt-1 text-sm font-semibold text-[var(--text)]">家庭积分宠物系统</div>
          </div>
          <div className="flex items-center gap-2">
            {visibleTabs.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setTab(item);
                  setError("");
                }}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  tab === item ? "bg-[var(--primary)] text-white shadow-sm" : "bg-white/80 text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                {tabMeta[item].label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <section className="space-y-6">
            <div className="inline-flex rounded-full border border-[var(--border)] bg-white/80 px-3 py-1 text-xs tracking-[0.18em] text-[var(--muted)] backdrop-blur">
              WORKSPACE ENTRY
            </div>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-bold leading-tight text-[var(--text)] md:text-5xl">
                把家庭任务、积分奖励和宠物成长收进同一个登录入口。
              </h1>
              <p className="max-w-xl text-base leading-7 text-[var(--muted)]">
                家长负责审核和计划，孩子专注完成任务与成长反馈。公开入口只保留家庭日常会用到的角色，减少误点和无关跳转。
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/80 bg-white/75 p-5 shadow-[0_18px_50px_rgba(255,142,110,0.08)] backdrop-blur">
                <div className="text-sm font-semibold text-[var(--text)]">家长工作台</div>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  处理待审核任务、配置奖励库存、查看孩子表现和周期报表。
                </p>
              </div>
              <div className="rounded-2xl border border-white/80 bg-white/75 p-5 shadow-[0_18px_50px_rgba(255,142,110,0.08)] backdrop-blur">
                <div className="text-sm font-semibold text-[var(--text)]">孩子成长台</div>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  完成今天的任务、领取积分反馈、推进宠物升级和奖励目标。
                </p>
              </div>
            </div>

            {tab === "admin" ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50/90 px-4 py-3 text-sm text-amber-800">
                当前为管理员维护入口。完成操作后，建议返回家长/孩子公开登录页继续日常流程。
              </div>
            ) : null}
          </section>

          <section className="rounded-[28px] border border-white/80 bg-white/92 p-6 shadow-[0_30px_80px_rgba(255,142,110,0.14)] backdrop-blur">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-[var(--text)]">{tabMeta[tab].label}</h2>
              <p className="text-sm leading-6 text-[var(--muted)]">{tabMeta[tab].hint}</p>
            </div>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm text-[var(--muted)]">用户名</label>
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={tabMeta[tab].fieldHint}
                />
              </div>

              {tab === "child" ? (
                <div>
                  <label className="mb-1 block text-sm text-[var(--muted)]">PIN</label>
                  <Input
                    inputMode="numeric"
                    maxLength={6}
                    value={pin}
                    onChange={(event) => setPin(event.target.value.replace(/\D/g, ""))}
                    placeholder="请输入 PIN"
                    className="tracking-[0.3em]"
                  />
                </div>
              ) : (
                <div>
                  <label className="mb-1 block text-sm text-[var(--muted)]">密码</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder={tab === "admin" ? "请输入管理员密码" : "请输入家长密码"}
                  />
                </div>
              )}

              {error ? <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}

              <Button type="submit" variant="primary" fullWidth disabled={loading}>
                {loading ? "登录中..." : "进入系统"}
              </Button>

              {tab === "admin" ? (
                <button
                  type="button"
                  onClick={() => {
                    setTab("parent");
                    setError("");
                  }}
                  className="w-full rounded-2xl border border-[var(--border)] px-4 py-3 text-sm text-[var(--muted)] transition hover:bg-[var(--primary-50)] hover:text-[var(--text)]"
                >
                  返回公开登录入口
                </button>
              ) : null}
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
