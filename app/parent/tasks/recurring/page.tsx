import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function Badge({ children }: { children: React.ReactNode }) { return (<span className="px-2 py-0.5 rounded-full text-xs" style={{ background: "#eef2ff", color: "#3730a3" }}>{children}</span>); }

async function getData() {
  const token = cookies().get("token")?.value || null;
  const payload = token ? await verifyToken(token) : null;
  if (!payload || (payload.role !== "parent" && payload.role !== "admin")) redirect("/login");
  const list = await prisma.recurringTask.findMany({ where: { familyId: payload.familyId }, orderBy: { createdAt: "desc" } });
  return { list };
}

export default async function Page() {
  const { list } = await getData();
  return (
    <div className="min-h-[calc(100vh-56px)] px-4 pt-4 pb-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-[var(--p-text)]">{`周期任务`}</h1>
        <p className="text-sm text-[var(--p-muted)]">{`为家庭定义每日/每周重复出现的任务，系统每日 00:05 (UTC) 自动生成当日任务。`}</p>

        <form method="post" action="/api/tasks/recurring" className="mt-4 rounded-xl border p-4 bg-[var(--p-card)]" style={{ borderColor: "var(--p-border)" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-[var(--p-muted)]">{`名称`}</label>
              <input name="name" required className="mt-1 w-full border rounded px-2 py-1" style={{ borderColor: "var(--p-border)" }} />
            </div>
            <div>
              <label className="block text-sm text-[var(--p-muted)]">{`积分`}</label>
              <input name="points" type="number" min={1} required className="mt-1 w-full border rounded px-2 py-1" style={{ borderColor: "var(--p-border)" }} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-[var(--p-muted)]">{`描述`}</label>
              <input name="description" className="mt-1 w-full border rounded px-2 py-1" style={{ borderColor: "var(--p-border)" }} />
            </div>
            <div>
              <label className="block text-sm text-[var(--p-muted)]">{`频率`}</label>
              <select name="frequency" className="mt-1 w-full border rounded px-2 py-1" style={{ borderColor: "var(--p-border)" }}>
                <option value="daily">{`每日`}</option>
                <option value="weekly">{`每周`}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-[var(--p-muted)]">{`星期（留空=每日）`}</label>
              <div className="mt-1 grid grid-cols-7 gap-1 text-center text-xs">
                {[1,2,3,4,5,6,7].map((d)=> (
                  <label key={d} className="inline-flex items-center justify-center gap-1 border rounded px-1 py-0.5" style={{ borderColor: "var(--p-border)" }}>
                    <input type="checkbox" name="weekday" value={String(d)} />
                    <span>{d}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <input type="hidden" name="_json" value="1" />
          <button className="mt-3 px-3 py-1.5 rounded-md text-white" style={{ background: "var(--p-accent)" }}>{`新增`}</button>
        </form>

        <div className="mt-6 space-y-2">
          {list.length === 0 ? (
            <div className="text-[var(--p-muted)]">{`尚未配置周期任务`}</div>
          ) : (
            list.map((x) => (
              <div key={x.id} className="rounded-xl border p-3 bg-[var(--p-card)]" style={{ borderColor: "var(--p-border)" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[var(--p-text)]">{x.name} <Badge>{x.frequency}</Badge></div>
                    <div className="text-xs text-[var(--p-muted)]">{x.description || ""}</div>
                  </div>
                  <div className="text-blue-600 font-bold">+{x.points}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// codex-ok: 2026-04-10T14:30:00+08:00