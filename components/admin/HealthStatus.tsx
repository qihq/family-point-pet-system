"use client";

import useSWR from "swr";

export default function HealthStatus(){
  const { data } = useSWR("/api/health", async (key)=> fetch(key).then(r=>r.json()).catch(()=>null), { refreshInterval: 3000 });
  const ok = data?.status === "ok" && data?.db === "connected";
  return (
    <div className="inline-flex items-center gap-2 text-sm">
      <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: ok? "var(--a-success)" : "var(--a-danger)" }} />
      <span>{ok? "数据库已连接" : "数据库错误"}</span>
    </div>
  );
}

// codex-ok: 2026-04-10T13:28:00+08:00