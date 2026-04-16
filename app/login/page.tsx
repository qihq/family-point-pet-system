"use client";

import { useEffect, useState } from "react";
import { Button, Input } from "@/components/ui";

type LoginTab = "parent" | "child" | "admin";

const tabMeta: Record<
  LoginTab,
  {
    label: string;
    hint: string;
    endpoint: string;
    destination: string;
    fieldHint: string;
    secretLabel: string;
    secretPlaceholder: string;
  }
> = {
  parent: {
    label: "家长登录",
    hint: "进入审核台、计划管理、奖励库存和家庭报表。",
    endpoint: "/api/auth/parent-login",
    destination: "/parent",
    fieldHint: "请输入家长账号",
    secretLabel: "密码",
    secretPlaceholder: "请输入家长密码",
  },
  child: {
    label: "孩子登录",
    hint: "打开今日任务、成长记录、宠物互动和奖励目标。",
    endpoint: "/api/auth/child-login",
    destination: "/child",
    fieldHint: "请输入孩子账号",
    secretLabel: "PIN",
    secretPlaceholder: "请输入 PIN",
  },
  admin: {
    label: "管理员登录",
    hint: "进入账户运维、系统健康和后台维护入口。",
    endpoint: "/api/auth/admin-login",
    destination: "/admin",
    fieldHint: "请输入管理员账号",
    secretLabel: "密码",
    secretPlaceholder: "请输入管理员密码",
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,142,110,0.18),_transparent_38%),linear-gradient(180deg,#fff7f0_0%,#fffaf5_100%)] px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between rounded-full border border-white/80 bg-white/80 px-4 py-3 shadow-[0_18px_48px_rgba(255,142,110,0.08)] backdrop-blur">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Family Point Pet</div>
            <div className="mt-1 text-sm font-semibold text-[var(--text)]">家庭积分宠物系统</div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {(["parent", "child", "admin"] as LoginTab[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setTab(item);
                  setError("");
                }}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  tab === item ? "bg-[var(--primary)] text-white shadow-sm" : "bg-white text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                {tabMeta[item].label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <section className="rounded-[28px] border border-white/80 bg-white/88 p-6 shadow-[0_24px_70px_rgba(255,142,110,0.12)] backdrop-blur">
            <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--primary-50)] px-3 py-1 text-xs font-semibold tracking-[0.16em] text-[var(--primary)]">
              LOGIN
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-[var(--text)] md:text-4xl">
              保留一个清晰入口，按角色直接进入各自工作区。
            </h1>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              家长处理审核和计划，孩子专注任务与成长，管理员负责系统维护。公开页不再放无关展示，只保留真正会用到的入口。
            </p>

            <div className="mt-6 space-y-3">
              <FeatureItem title="家长端" text="待审核、孩子表现、本周计划和奖励管理集中处理。" />
              <FeatureItem title="孩子端" text="今日任务、积分规则、宠物成长和奖励目标集中查看。" />
              <FeatureItem title="管理员" text="系统健康、账户运维和后台维护入口独立保留。" />
            </div>
          </section>

          <section className="rounded-[28px] border border-white/80 bg-white/92 p-6 shadow-[0_30px_80px_rgba(255,142,110,0.14)] backdrop-blur">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-[var(--text)]">{tabMeta[tab].label}</h2>
              <p className="text-sm leading-6 text-[var(--muted)]">{tabMeta[tab].hint}</p>
            </div>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm text-[var(--muted)]">用户名</label>
                <Input value={name} onChange={(event) => setName(event.target.value)} placeholder={tabMeta[tab].fieldHint} />
              </div>

              {tab === "child" ? (
                <div>
                  <label className="mb-1 block text-sm text-[var(--muted)]">{tabMeta[tab].secretLabel}</label>
                  <Input
                    inputMode="numeric"
                    maxLength={6}
                    value={pin}
                    onChange={(event) => setPin(event.target.value.replace(/\D/g, ""))}
                    placeholder={tabMeta[tab].secretPlaceholder}
                    className="tracking-[0.3em]"
                  />
                </div>
              ) : (
                <div>
                  <label className="mb-1 block text-sm text-[var(--muted)]">{tabMeta[tab].secretLabel}</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder={tabMeta[tab].secretPlaceholder}
                  />
                </div>
              )}

              {error ? <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}

              <Button type="submit" variant="primary" fullWidth disabled={loading}>
                {loading ? "登录中..." : "进入系统"}
              </Button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white/78 px-4 py-4">
      <div className="text-sm font-semibold text-[var(--text)]">{title}</div>
      <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{text}</p>
    </div>
  );
}
