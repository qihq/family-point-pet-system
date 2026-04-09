"use client";
import { useEffect, useMemo, useState } from 'react';
import LevelBadge from '@/components/LevelBadge';

interface RewardItem {
  id: string; name: string; description?: string|null; cost: number; stock?: number|null; enabled: boolean;
}

export default function RewardsPage(){
  const [items, setItems] = useState<RewardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [balance, setBalance] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [busyId, setBusyId] = useState<string|undefined>(undefined);
  const [flashOk, setFlashOk] = useState(false);

  async function loadRewards(){
    const r = await fetch('/api/rewards', { cache:'no-store' });
    const d = await r.json(); if(r.ok && d.success) setItems(d.data||[]); else setError(d.error||'加载奖励失败');
  }
  async function loadAccount(){
    const r = await fetch('/api/pets/me', { cache:'no-store' });
    const d = await r.json();
    if(r.ok && d.success){
      const acc = d.data?.account || { balance:0, totalEarned:0 };
      setBalance(Number(acc.balance||0));
      setTotalEarned(Number(acc.totalEarned||0));
    }
  }

  useEffect(()=>{ (async()=>{ setLoading(true); setError(''); try{ await Promise.all([loadRewards(), loadAccount()]); } finally{ setLoading(false); } })(); },[]);

  async function redeem(id: string, cost: number){
    if(busyId) return;
    setBusyId(id);
    try{
      const r = await fetch('/api/rewards/redeem', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ rewardItemId: id, quantity: 1 }) });
      const d = await r.json();
      if(!r.ok || !d.success){ alert(d.error||'兑换失败'); return; }
      setBalance(Number(d?.data?.balance||0));
      setFlashOk(true); setTimeout(()=>setFlashOk(false), 1200);
    }catch(e:any){ alert(e.message||'网络错误'); }
    finally{ setBusyId(undefined); }
  }

  const thresholds = [100,300,600,1000];
  const level = useMemo(()=>{ let lvl=1; for(const t of thresholds){ if(totalEarned>=t) lvl++; else break; } return lvl; },[totalEarned]);

  return (
    <div className="min-h-screen bg-[var(--bg)]/60 px-4 py-6">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--text)]">奖励商城</h1>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-600">当前积分</span>
            <span className="px-2 py-1 rounded bg-[var(--primary-100)] text-amber-700 font-semibold">{balance}</span>
          </div>
        </div>

        <LevelBadge totalEarned={totalEarned} thresholds={thresholds} onLevelUp={()=>{ /* 可在此加烟花音效 */ }} />

        {loading ? (
          <div>加载中…</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(it=>{
              const lack = Math.max(0, it.cost - balance);
              const disabled = lack>0 || busyId===it.id;
              return (
                <div key={it.id} className="relative rounded-xl bg-white shadow p-4 border">
                  <div className="font-semibold text-gray-800">{it.name}</div>
                  {it.description && (<div className="mt-1 text-sm text-gray-600">{it.description}</div>)}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-amber-700 font-bold">{it.cost} 分</div>
                    {it.stock!==null && it.stock!==undefined && (
                      <div className="text-xs text-gray-500">库存 {it.stock}</div>
                    )}
                  </div>
                  <div className="mt-3 flex items-center justify-end">
                    <button disabled={disabled} onClick={()=>redeem(it.id, it.cost)}
                      className={`px-3 py-1.5 rounded ${disabled? 'bg-gray-100 text-gray-400' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>
                      {busyId===it.id? '兑换中…' : (lack>0? `还差 ${lack} 分` : '兑换')}
                    </button>
                  </div>
                </div>
              );
            })}
            {items.length===0 && (<div className="text-gray-600">暂无奖励，家长可在管理端添加</div>)}
          </div>
        )}

        {flashOk && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur text-emerald-700 font-bold shadow animate-[pop_500ms_ease]">兑换成功！</div>
          </div>
        )}
      </div>
      <style jsx>{`@keyframes pop{0%{transform:scale(.9);opacity:0}100%{transform:scale(1);opacity:1}}`}</style>
    </div>
  );
}
