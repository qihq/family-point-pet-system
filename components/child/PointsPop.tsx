"use client";

import React from "react";

export type PointsPopProps = {
  id?: string;
  x: number;
  y: number;
  points: number;
  onDone?: (id?: string) => void;
};

export default function PointsPop({ id, x, y, points, onDone }: PointsPopProps) {
  return (
    <div
      className="pts-pop"
      style={{ position: "fixed", left: x, top: y }}
      onAnimationEnd={() => onDone?.(id)}
      aria-live="polite"
    >
      {"+"}{points} {"⭐"}
    </div>
  );
}

// codex-ok: 2026-04-10T12:20:00+08:00