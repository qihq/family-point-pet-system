"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PetStage, PetStatus } from '@prisma/client';
import PetCard from '@/components/child/pet-card';
import PetActions from '@/components/child/pet-actions';
import nextDynamic from 'next/dynamic';
import { useRequireRole } from '@/lib/useRequireRole';

const Pet3DViewer = nextDynamic(() => import('@/components/child/pet-3d-viewer'), { ssr: false });

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
  useRequireRole('child');
  const qs = useSearchParams();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [lastAction, setLastAction] = useState<'feed'|'water'|'clean'|'play'|undefined>(undefined);
  const [balance, setBalance] = useState<number>(0);

  async function load() {
    setError('');
    try {
      const childId = qs.get('childId');
      const url = childId ? `/api/pets/me?childId=${childId}` : '/api/pets/me';
      const res = await fetch(url, { cache: 'no-store', credentials: 'include', headers: { 'Accept': 'application/json' } });
      const text = await res.text();
      let data: any = null;
      try { data = text ? JSON.parse(text) : null; } catch { data = null; }
      if (!res.ok || !data?.success) throw new Error((data && data.error) || `加载失败(${res.status})`);
      setPet(data.data.pet);
      setBalance((data.data.account?.balance as number) ?? 0);
    } catch (e: any) {
      setError(e.message || '网络错误');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [qs.toString()]);

  function toast(msg: string) { setMessage(msg); setTimeout(() => setMessage(''), 2200); }

  async function act(action: 'feed'|'water'|'clean'|'play') {
    if (!pet || busy) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/pets/${pet.childId}/${action}`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error((data && data.error) || `操作失败(${res.status})`);
      setPet(data.data.pet);
      setBalance((data.data.account?.balance as number) ?? 0);
      setLastAction(action);
      toast(data.message || '已完成');
    } catch (e: any) {
      toast(e.message || '操作失败');
    } finally { setBusy(false); }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-[var(--muted)]">加载中…</div>;
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded">{error}</div>
    </div>
  );
  if (!pet) return null;

  return (
    <div className="min-h-screen bg-[var(--bg)]/60 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--text)]">宠物中心</h1>
          <p className="text-sm text-[var(--muted)] mt-1">和你的宠物互动，照顾它成长</p>
        </div>
        <div className="mt-2 inline-flex items-center gap-2 bg-[var(--primary-50)] text-amber-700 px-3 py-1 rounded-full text-sm">
          <span>当前积分</span><span className="font-semibold">{balance}</span>
        </div>
        {message && (<div className="bg-blue-50 border border-blue-200 text-blue-700 rounded-md px-4 py-2 text-sm text-center">{message}</div>)}
        <PetCard pet={pet as any} />
        <Pet3DViewer pet={pet} action={lastAction} />
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-[var(--text)] mb-3">互动操作</h2>
          <PetActions onFeed={() => act('feed')} onWater={() => act('water')} onClean={() => act('clean')} onPlay={() => act('play')} disabled={busy} />
          <div className="mt-2"><a href="/child/tasks" className="text-amber-700 hover:text-amber-800 text-sm">去提交任务 →</a></div>
        </div>
      </div>
    </div>
  );
}

export default function ChildPetPage(){
  useRequireRole('child');
  return (
    <Suspense fallback={<div>加载中…</div>}>
      <ChildPetPageInner />
    </Suspense>
  );
}

