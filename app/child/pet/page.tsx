"use client";
export const dynamic = "force-dynamic";

import Link from "next/link";
import { Suspense, useCallback, useEffect, useState } from "react";
import nextDynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { PetStage, PetStatus } from "@prisma/client";
import PetActions from "@/components/child/pet-actions";
import PetCard from "@/components/child/pet-card";
import { useRequireRole } from "@/lib/useRequireRole";

const Pet3DViewer = nextDynamic(() => import("@/components/child/pet-3d-viewer"), { ssr: false });

interface Pet {
  id: string;
  childId: string;
  name: string;
  stage: PetStage;
  level: number;
  exp: number;
  status: PetStatus;
  hunger: number;
  thirst: number;
  cleanliness: number;
  mood: number;
  health: number;
}

function ChildPetPageInner() {
  const searchParams = useSearchParams();
  const childId = searchParams.get("childId");
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [lastAction, setLastAction] = useState<"feed" | "water" | "clean" | "play" | undefined>(undefined);
  const [balance, setBalance] = useState(0);

  const load = useCallback(async () => {
    setError("");
    try {
      const url = childId ? `/api/pets/me?childId=${childId}` : "/api/pets/me";
      const response = await fetch(url, {
        cache: "no-store",
        credentials: "include",
        headers: { Accept: "application/json" },
      });
      const text = await response.text();
      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = null;
      }

      if (!response.ok || !data?.success) {
        throw new Error((data && data.error) || `加载失败（${response.status}）`);
      }

      setPet(data.data.pet);
      setBalance(Number(data.data.account?.balance ?? 0));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "网络错误");
    } finally {
      setLoading(false);
    }
  }, [childId]);

  useEffect(() => {
    void load();
  }, [load]);

  function toast(nextMessage: string) {
    setMessage(nextMessage);
    window.setTimeout(() => setMessage(""), 2200);
  }

  async function act(action: "feed" | "water" | "clean" | "play") {
    if (!pet || busy) return;

    setBusy(true);
    try {
      const response = await fetch(`/api/pets/${pet.childId}/${action}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error((data && data.error) || `操作失败（${response.status}）`);
      }

      setPet(data.data.pet);
      setBalance(Number(data.data.account?.balance ?? 0));
      setLastAction(action);
      toast(data.message || "互动已完成");
    } catch (caught) {
      toast(caught instanceof Error ? caught.message : "操作失败");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-[var(--muted)]">加载中…</div>;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded border border-red-200 bg-red-50 px-4 py-2 text-red-700">{error}</div>
      </div>
    );
  }

  if (!pet) return null;

  return (
    <div className="min-h-screen bg-[var(--bg)]/60 px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--text)]">宠物中心</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">和你的宠物互动，让成长反馈更直接。</p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary-50)] px-3 py-1 text-sm text-amber-700">
          <span>当前积分</span>
          <span className="font-semibold">{balance}</span>
        </div>

        {message && (
          <div className="rounded-md border border-blue-200 bg-blue-50 px-4 py-2 text-center text-sm text-blue-700">
            {message}
          </div>
        )}

        <PetCard pet={pet as any} />
        <Pet3DViewer pet={pet} action={lastAction} />

        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-3 text-lg font-semibold text-[var(--text)]">互动操作</h2>
          <PetActions
            onFeed={() => void act("feed")}
            onWater={() => void act("water")}
            onClean={() => void act("clean")}
            onPlay={() => void act("play")}
            disabled={busy}
          />
          <div className="mt-3">
            <Link href="/child/tasks" className="text-sm text-amber-700 hover:text-amber-800">
              去提交任务 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChildPetPage() {
  useRequireRole("child");

  return (
    <Suspense fallback={<div>加载中…</div>}>
      <ChildPetPageInner />
    </Suspense>
  );
}
