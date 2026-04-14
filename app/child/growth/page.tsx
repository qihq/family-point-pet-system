import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import PointsChart, { Donut } from "@/components/child/PointsChart";

export const revalidate = 300;

async function getData() {
  const c = cookies();
  const token = c.get("token")?.value || null;
  const payload = token ? await verifyToken(token) : null;
  if (!payload || payload.role !== "child") redirect("/login");
  const tag = `child-stats-${payload.userId}`;
  // 在容器内用服务自身端口 3000，避免 Host 端口映射导致的 3111 连接失败
  const base = `http://127.0.0.1:${process.env.PORT || 3000}`;
  const cookieHeader = c.getAll().map(x=>`${x.name}=${x.value}`).join("; ");
  const res = await fetch(`${base}/api/child/${payload.userId}/stats?range=14`, { next: { revalidate, tags: [tag] }, headers: { cookie: cookieHeader } });
  const data = await res.json().catch(() => ({ success: false }));
  if (!res.ok || !data.success) {
    return { series: [], stats: { week: 0, month: 0, total: 0 }, donut: { completed: 0, todo: 0 }, redeems: [] };
  }
  return data.data as { series: Array<{ date: string; points: number }>; stats: { week: number; month: number; total: number }; donut: { completed: number; todo: number }; redeems: Array<{ id: string; name: string; pointsSpent: number; quantity: number; createdAt: string }>; };
}

export default async function Page() {
  const data = await getData();
  return (
    <div className="min-h-[calc(100vh-56px)] px-4 pt-4 pb-24" style={{ background: "var(--c-bg)" }}>
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-2xl font-bold" style={{ color: "var(--c-text)" }}>{`成长`}</h1>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl p-3 shadow-sm border" style={{ background: "var(--c-card)", borderColor: "#f4e3d6" }}>
            <div className="text-xs" style={{ color: "var(--c-muted)" }}>{`本周`}</div>
            <div className="text-xl font-extrabold" style={{ color: "var(--c-orange)", fontFamily: "var(--font-display)" }}>+{data.stats.week}</div>
          </div>
          <div className="rounded-xl p-3 shadow-sm border" style={{ background: "var(--c-card)", borderColor: "#f4e3d6" }}>
            <div className="text-xs" style={{ color: "var(--c-muted)" }}>{`本月`}</div>
            <div className="text-xl font-extrabold" style={{ color: "var(--c-orange)", fontFamily: "var(--font-display)" }}>+{data.stats.month}</div>
          </div>
          <div className="rounded-xl p-3 shadow-sm border" style={{ background: "var(--c-card)", borderColor: "#f4e3d6" }}>
            <div className="text-xs" style={{ color: "var(--c-muted)" }}>{`总计`}</div>
            <div className="text-xl font-extrabold" style={{ color: "var(--c-orange)", fontFamily: "var(--font-display)" }}>+{data.stats.total}</div>
          </div>
        </div>

        <section className="rounded-xl p-3 shadow-sm border" style={{ background: "var(--c-card)", borderColor: "#f4e3d6" }}>
          <div className="text-sm mb-2" style={{ color: "var(--c-text)" }}>{`最近 14 天积分`}</div>
          <PointsChart data={data.series} />
        </section>

        <section className="rounded-xl p-3 shadow-sm border" style={{ background: "var(--c-card)", borderColor: "#f4e3d6" }}>
          <div className="text-sm mb-2" style={{ color: "var(--c-text)" }}>{`任务完成情况（近 14 天）`}</div>
          <div className="flex items-center gap-6">
            <Donut done={data.donut.completed} todo={data.donut.todo} />
            <div className="text-sm" style={{ color: "var(--c-text)" }}>
              <div>{`已完成：`}<span className="font-bold" style={{ color: "#22C55E" }}>{data.donut.completed}</span></div>
              <div className="mt-1">{`未完成：`}<span className="font-bold" style={{ color: "#9CA3AF" }}>{data.donut.todo}</span></div>
            </div>
          </div>
        </section>

        <section className="rounded-xl p-3 shadow-sm border" style={{ background: "var(--c-card)", borderColor: "#f4e3d6" }}>
          <div className="text-sm mb-2" style={{ color: "var(--c-text)" }}>{`最近兑换`}</div>
          {data.redeems.length === 0 ? (
            <div className="text-sm" style={{ color: "var(--c-muted)" }}>{`暂无兑换记录`}</div>
          ) : (
            <ul className="divide-y" style={{ borderColor: "#f4e3d6" }}>
              {data.redeems.map((r) => (
                <li key={r.id} className="py-2 flex items中心 justify-between">
                  <div>
                    <div className="font-semibold" style={{ color: "var(--c-text)" }}>{r.name}</div>
                    <div className="text-xs" style={{ color: "var(--c-muted)" }}>{new Date(r.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="text-rose-600 font-bold">-{r.pointsSpent}</div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

// codex-ok: 2026-04-14T12:45:00+08:00