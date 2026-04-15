import { PetCat } from "@/components/child/PetCat";

export type PetCardProps = {
  name?: string;
  level: number;
  xp: number;
  xpToNext: number;
  hunger: number; // 0-100
  mood: number;   // 0-100
};

export function PetCard({ name = "Cat", level, xp, xpToNext, hunger, mood }: PetCardProps) {
  const pct = Math.max(0, Math.min(100, Math.round((xp / Math.max(1, xpToNext)) * 100)))
  return (
    <div className="rounded-[26px] border-2" style={{ borderColor: "#ffd27a", background: "linear-gradient(135deg, #fff7e0, #ffe8d6)" }}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[var(--c-text)] font-bold" style={{ fontFamily: "var(--font-display)" }}>{name}</div>
          <div className="text-sm text-[var(--c-muted)]">Lv. {level}</div>
        </div>
        <PetCat />
        <div className="mt-3">
          <div className="h-[14px] rounded-full" style={{ background: "rgba(255,255,255,0.6)" }}>
            <div
              className="h-[14px] rounded-full progress-shimmer"
              style={{ width: pct + "%", background: "linear-gradient(90deg,#FFD93D,#FF6B35)" }}
              aria-label={"xp-progress"}
            />
          </div>
          <div className="mt-1 text-xs text-[var(--c-muted)]">XP {xp} / {xpToNext}</div>
        </div>
        <div className="mt-3 flex gap-2">
          <div className="px-2 py-1 text-xs rounded-full" style={{ background: "rgba(255,255,255,0.6)" }}>{`饱食度 ${hunger}%`}</div>
          <div className="px-2 py-1 text-xs rounded-full" style={{ background: "rgba(255,255,255,0.6)" }}>{`快乐度 ${mood}%`}</div>
        </div>
      </div>
    </div>
  );
}

// codex-ok: 2026-04-10T11:35:00+08:00