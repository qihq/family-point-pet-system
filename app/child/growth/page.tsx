import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PointsChart, { Donut } from "@/components/child/PointsChart";
import { verifyToken } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || null;
  const payload = token ? await verifyToken(token) : null;
  if (!payload || payload.role !== "child") {
    redirect("/login");
  }

  const base = `http://127.0.0.1:${process.env.PORT || 3000}`;
  const cookieHeader = cookieStore
    .getAll()
    .map((item) => `${item.name}=${item.value}`)
    .join("; ");

  const response = await fetch(`${base}/api/child/${payload.userId}/stats?range=14`, {
    cache: "no-store",
    headers: { cookie: cookieHeader },
  });
  const data = await response.json().catch(() => ({ success: false }));

  if (!response.ok || !data.success) {
    return {
      series: [],
      stats: { week: 0, month: 0, total: 0 },
      donut: { completed: 0, todo: 0 },
      redeems: [],
    };
  }

  return data.data as {
    series: Array<{ date: string; points: number }>;
    stats: { week: number; month: number; total: number };
    donut: { completed: number; todo: number };
    redeems: Array<{ id: string; name: string; pointsSpent: number; quantity: number; createdAt: string }>;
  };
}

export default async function ChildGrowthPage() {
  const data = await getData();

  return (
    <div className="min-h-[calc(100vh-56px)] px-4 pb-24 pt-4" style={{ background: "var(--c-bg)" }}>
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-2xl font-bold" style={{ color: "var(--c-text)" }}>
          成长
        </h1>

        <div className="grid grid-cols-3 gap-3">
          <MetricCard label="本周" value={`+${data.stats.week}`} />
          <MetricCard label="本月" value={`+${data.stats.month}`} />
          <MetricCard label="总计" value={`+${data.stats.total}`} />
        </div>

        <section className="rounded-xl border p-3 shadow-sm" style={{ background: "var(--c-card)", borderColor: "#f4e3d6" }}>
          <div className="mb-2 text-sm" style={{ color: "var(--c-text)" }}>
            最近 14 天积分
          </div>
          <PointsChart data={data.series} />
        </section>

        <section className="rounded-xl border p-3 shadow-sm" style={{ background: "var(--c-card)", borderColor: "#f4e3d6" }}>
          <div className="mb-2 text-sm" style={{ color: "var(--c-text)" }}>
            任务完成情况（近 14 天）
          </div>
          <div className="flex items-center gap-6">
            <Donut done={data.donut.completed} todo={data.donut.todo} />
            <div className="text-sm" style={{ color: "var(--c-text)" }}>
              <div>
                已完成：<span className="font-bold" style={{ color: "#22C55E" }}>{data.donut.completed}</span>
              </div>
              <div className="mt-1">
                未完成：<span className="font-bold" style={{ color: "#9CA3AF" }}>{data.donut.todo}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border p-3 shadow-sm" style={{ background: "var(--c-card)", borderColor: "#f4e3d6" }}>
          <div className="mb-2 text-sm" style={{ color: "var(--c-text)" }}>
            最近兑换
          </div>
          {data.redeems.length === 0 ? (
            <div className="text-sm" style={{ color: "var(--c-muted)" }}>
              暂无兑换记录
            </div>
          ) : (
            <ul className="divide-y" style={{ borderColor: "#f4e3d6" }}>
              {data.redeems.map((redeem) => (
                <li key={redeem.id} className="flex items-center justify-between py-2">
                  <div>
                    <div className="font-semibold" style={{ color: "var(--c-text)" }}>
                      {redeem.name}
                    </div>
                    <div className="text-xs" style={{ color: "var(--c-muted)" }}>
                      {new Date(redeem.createdAt).toLocaleString("zh-CN")}
                    </div>
                  </div>
                  <div className="font-bold text-rose-600">-{redeem.pointsSpent}</div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border p-3 shadow-sm" style={{ background: "var(--c-card)", borderColor: "#f4e3d6" }}>
      <div className="text-xs" style={{ color: "var(--c-muted)" }}>
        {label}
      </div>
      <div className="text-xl font-extrabold" style={{ color: "var(--c-orange)", fontFamily: "var(--font-display)" }}>
        {value}
      </div>
    </div>
  );
}
