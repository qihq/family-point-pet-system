import { prisma } from "@/lib/prisma";
import HealthStatus from "@/components/admin/HealthStatus";
import ParentsTable, { ParentRow } from "@/components/admin/ParentsTable";

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl p-4 border" style={{ background: "var(--a-card)", borderColor: "var(--a-border)" }}>
      <div className="text-sm" style={{ color: "var(--a-muted)" }}>{label}</div>
      <div className="mt-1 text-2xl font-bold" style={{ color: "var(--a-text)" }}>{value}</div>
    </div>
  );
}

function startOfDay(d: Date) { const x = new Date(d); x.setHours(0,0,0,0); return x; }
function endOfDay(d: Date) { const x = new Date(d); x.setHours(23,59,59,999); return x; }
function startOfWeek(d: Date) { const wd = (d.getDay()+6)%7; const x = new Date(d); x.setHours(0,0,0,0); x.setDate(x.getDate()-wd); return x; }
function endOfWeek(d: Date) { const x = startOfWeek(d); x.setDate(x.getDate()+6); x.setHours(23,59,59,999); return x; }

async function getStats(){
  const now = new Date();
  const [parentCount, activeChildren, todayCompleted, weekFlow] = await Promise.all([
    prisma.user.count({ where: { role: "parent" } }),
    prisma.taskLog.groupBy({ by:["childId"], where:{ createdAt:{ gte: new Date(Date.now()-7*86400000) } }, _count:{ childId: true } }).then(g=> g.length),
    prisma.taskLog.count({ where:{ createdAt:{ gte: startOfDay(now), lte: endOfDay(now) } } }),
    prisma.pointTransaction.aggregate({ where:{ createdAt:{ gte: startOfWeek(now), lte: endOfWeek(now) } }, _sum:{ amount:true } }).then(x=> x._sum.amount || 0)
  ]);
  return { parentCount, activeChildren, todayCompleted, weekFlow };
}

async function getParents(): Promise<ParentRow[]>{
  const parents = await prisma.user.findMany({ where: { role: "parent" }, orderBy: { createdAt: "desc" }, take: 20, select:{ id:true, name:true, createdAt:true, familyId:true } });
  const childrenByFamily = await prisma.user.groupBy({ by:["familyId"], where:{ role: "child" }, _count:{ familyId:true } });
  const map = new Map(childrenByFamily.map(x=> [x.familyId, x._count.familyId] as const));
  const rows: ParentRow[] = parents.map(p=> ({ id:p.id, name:p.name, email: "-", createdAtISO: p.createdAt.toISOString(), childrenCount: map.get(p.familyId)||0 }));
  return rows;
}

async function getOpLogs(){
  // Placeholder: if you have an OperationLog model, replace this with real data
  return [] as Array<{ id:string; actor:string; action:string; time:string }>;
}

export default async function AdminHome(){
  const [stats, parents, logs] = await Promise.all([ getStats(), getParents(), getOpLogs() ]);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{`系统总览`}</h1>
        <HealthStatus />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label={"注册家长数"} value={stats.parentCount} />
        <StatCard label={"活跃孩子数(7天)"} value={stats.activeChildren} />
        <StatCard label={"今日任务完成数"} value={stats.todayCompleted} />
        <StatCard label={"本周积分流通量"} value={stats.weekFlow} />
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-2">{`家长账号`}</h2>
        <ParentsTable initial={parents} />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">{`操作日志（最近10条）`}</h2>
        <div className="rounded-xl p-4 border" style={{ background: "var(--a-card)", borderColor: "var(--a-border)" }}>
          {logs.length ? (
            <ul className="space-y-1">
              {logs.map((l)=> (<li key={l.id} className="text-sm">{l.time} · {l.actor} · {l.action}</li>))}
            </ul>
          ) : (
            <div className="text-sm" style={{ color: "var(--a-muted)" }}>{`暂无日志`}</div>
          )}
        </div>
      </section>
    </div>
  );
}

// codex-ok: 2026-04-10T13:50:00+08:00