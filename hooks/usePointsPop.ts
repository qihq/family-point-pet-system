"use client";

import { useCallback, useState } from "react";

export type PopItem = { id: string; x: number; y: number; points: number };

export function usePointsPop() {
  const [pops, setPops] = useState<PopItem[]>([]);

  const trigger = useCallback((el: Element | null, points: number) => {
    try {
      const id = Math.random().toString(36).slice(2);
      let x = Math.max(12, Math.round(window.innerWidth / 2));
      let y = Math.max(12, Math.round(window.innerHeight / 2));
      if (el && typeof (el as any).getBoundingClientRect === "function") {
        const rect = (el as HTMLElement).getBoundingClientRect();
        x = Math.round(rect.left + rect.width / 2);
        y = Math.round(rect.top) - 12;
      }
      const item: PopItem = { id, x, y, points };
      setPops((prev) => [...prev, item]);
      // auto clear after 1.5s
      window.setTimeout(() => {
        setPops((prev) => prev.filter((p) => p.id !== id));
      }, 1500);
      return id;
    } catch {
      return undefined;
    }
  }, []);

  return { pops, trigger } as const;
}

// codex-ok: 2026-04-10T12:21:00+08:00