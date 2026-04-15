"use client";

import { useRef, useState } from "react";
import PointsPop from "@/components/child/PointsPop";
import { usePointsPop } from "@/hooks/usePointsPop";

export type TaskCardProps = {
  id: string;
  name: string;
  desc?: string | null;
  points: number;
  color: "green" | "purple" | "blue" | "pink";
  done?: boolean;
  onComplete?: (id: string, points: number) => Promise<void> | void;
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

export default function TaskCard({ id, name, desc, points, color, done: doneInit = false, onComplete }: TaskCardProps) {
  const [done, setDone] = useState<boolean>(!!doneInit);
  const btnRef = useRef<HTMLButtonElement>(null);
  const { pops, trigger } = usePointsPop();

  async function handleClick() {
    if (done) return;
    try {
      setDone(true);
      trigger(btnRef.current, points);
      if(onComplete){ await onComplete(id, points); } else { try{ await fetch(`/api/tasks/${id}/complete`, { method: "POST", credentials: "include" }); }catch{} } // fallback complete
    } catch {
      setDone(false);
    }
  }

  const cm = COLOR_MAP[color];

  return (
    <>
      {pops.map((p) => (
        <PointsPop key={p.id} id={p.id} x={p.x} y={p.y} points={p.points} />
      ))}
      <button
        ref={btnRef}
        type="button"
        onClick={handleClick}
        className={cx(
          "w-full text-left rounded-xl border border-gray-200 bg-white/95 shadow-sm transition-transform",
          "hover:shadow-md active:scale-[0.99]",
          done && "line-through"
        )}
        style={{ opacity: done ? 0.55 : 1 }}
        aria-pressed={done}
      >
        <div className="flex">
          <div className={cx("w-[5px] rounded-l-xl", cm.bar)} aria-hidden="true" />
          <div className="flex-1 p-3 flex items-center gap-3">
            <div className={cx("w-[46px] h-[46px] rounded-[14px] flex items-center justify-center", cm.tileBg)}>
              <span role="img" aria-label="task" className="text-xl">📋</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[var(--c-text)] font-semibold truncate">{name}</div>
              {desc ? <div className="text-sm text-[var(--c-muted)] truncate">{desc}</div> : null}
            </div>
            <div className="text-[20px] font-extrabold" style={{ color: "var(--c-orange)", fontFamily: "var(--font-display)" }}>+{points}</div>
          </div>
        </div>
        {done ? (
          <div className="px-3 pb-2">
            <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 border border-green-200 text-xs px-2 py-0.5 rounded-full">✓ {`已完成`}</span>
          </div>
        ) : null}
      </button>
    </>
  );
}

// codex-ok: 2026-04-10T12:24:00+08:00