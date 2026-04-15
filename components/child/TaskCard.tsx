"use client";

import { useEffect, useRef, useState } from "react";
import PointsPop from "@/components/child/PointsPop";
import { usePointsPop } from "@/hooks/usePointsPop";

export type TaskCardStatus = "idle" | "done" | "pending";

export type TaskCardProps = {
  id: string;
  name: string;
  desc?: string | null;
  points: number;
  color: "green" | "purple" | "blue" | "pink";
  done?: boolean;
  status?: TaskCardStatus;
  onComplete?: (id: string, points: number) => Promise<{ status?: TaskCardStatus; points?: number } | void> | { status?: TaskCardStatus; points?: number } | void;
};

const COLOR_MAP: Record<TaskCardProps["color"], { bar: string; tileBg: string }> = {
  green: { bar: "bg-[var(--c-green)]", tileBg: "bg-[#E6FAF6]" },
  purple: { bar: "bg-[var(--c-purple)]", tileBg: "bg-[#F1EAFF]" },
  blue: { bar: "bg-[var(--c-blue)]", tileBg: "bg-[#EAF3FF]" },
  pink: { bar: "bg-[var(--c-pink)]", tileBg: "bg-[#FDE7F2]" },
};

function cx(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(" ");
}

export default function TaskCard({ id, name, desc, points, color, done: doneInit = false, status: statusProp, onComplete }: TaskCardProps) {
  const initialStatus: TaskCardStatus = statusProp ?? (doneInit ? "done" : "idle");
  const [status, setStatus] = useState<TaskCardStatus>(initialStatus);
  const btnRef = useRef<HTMLButtonElement>(null);
  const { pops, trigger } = usePointsPop();

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  async function handleClick() {
    if (status !== "idle") return;
    try {
      let result: { status?: TaskCardStatus; points?: number } | void;
      if (onComplete) {
        result = await onComplete(id, points);
      } else {
        const response = await fetch(`/api/tasks/${id}/complete`, { method: "POST", credentials: "include" });
        const data = await response.json().catch(() => null);
        if (!response.ok || !data?.success) {
          throw new Error(data?.error || "提交失败");
        }
        result = data?.data;
      }

      const nextStatus: TaskCardStatus = result?.status === "pending" ? "pending" : "done";
      setStatus(nextStatus);
      if (nextStatus === "done") {
        trigger(btnRef.current, result?.points ?? points);
      }
    } catch {
      setStatus("idle");
    }
  }

  const cm = COLOR_MAP[color];
  const isDone = status === "done";
  const isPending = status === "pending";

  return (
    <>
      {pops.map((pop) => (
        <PointsPop key={pop.id} id={pop.id} x={pop.x} y={pop.y} points={pop.points} />
      ))}
      <button
        ref={btnRef}
        type="button"
        onClick={handleClick}
        className={cx(
          "w-full text-left rounded-xl border border-gray-200 bg-white/95 shadow-sm transition-transform",
          "hover:shadow-md active:scale-[0.99]",
          isDone && "line-through"
        )}
        style={{ opacity: isDone ? 0.55 : isPending ? 0.9 : 1 }}
        aria-pressed={isDone}
      >
        <div className="flex">
          <div className={cx("w-[5px] rounded-l-xl", cm.bar)} aria-hidden="true" />
          <div className="flex-1 p-3 flex items-center gap-3">
            <div className={cx("w-[46px] h-[46px] rounded-[14px] flex items-center justify-center", cm.tileBg)}>
              <span role="img" aria-label="task" className="text-xl">{`📋`}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="truncate font-semibold text-[var(--c-text)]">{name}</div>
              {desc ? <div className="truncate text-sm text-[var(--c-muted)]">{desc}</div> : null}
            </div>
            <div className="text-[20px] font-extrabold" style={{ color: "var(--c-orange)", fontFamily: "var(--font-display)" }}>{`+${points}`}</div>
          </div>
        </div>
        {isDone ? (
          <div className="px-3 pb-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-xs text-green-700">{`✓ 已完成`}</span>
          </div>
        ) : null}
        {isPending ? (
          <div className="px-3 pb-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs text-amber-700">{`等待家长审核`}</span>
          </div>
        ) : null}
      </button>
    </>
  );
}

// codex-ok: 2026-04-15T13:12:00+08:00
