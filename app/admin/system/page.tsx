"use client";

import { useEffect, useState } from "react";
import ConfigExportCard from "@/components/admin/ConfigExportCard";
import ConfigImportCard from "@/components/admin/ConfigImportCard";

export default function Page() {
  const [db, setDb] = useState<"connected" | "error" | "unknown">("unknown");

  useEffect(() => {
    let mounted = true;

    const tick = async () => {
      try {
        const response = await fetch("/api/health", { cache: "no-store" });
        const data = await response.json();
        if (!mounted) return;
        setDb(data?.db === "connected" ? "connected" : "error");
      } catch {
        if (mounted) setDb("error");
      }
    };

    void tick();
    const id = setInterval(tick, 3000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">系统健康</h1>
      <div className="rounded-xl border p-4" style={{ background: "var(--a-card)", borderColor: "var(--a-border)" }}>
        <div className="text-sm">
          数据库：
          <span style={{ color: db === "connected" ? "var(--a-success)" : "var(--a-danger)" }}>{db}</span>
        </div>
      </div>
      <ConfigExportCard />
      <ConfigImportCard />
    </div>
  );
}
