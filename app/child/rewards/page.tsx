"use client";

import { useEffect, useState } from 'react';

import { useRequireRole } from '@/lib/useRequireRole';
interface RewardItem { id:string; name:string; description?:string|null; cost:number; stock?:number|null; enabled:boolean; imageUrl?:string|null; }

export default function (){
  useRequireRole('child');
  const [items, setItems] = useState<RewardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load(){
    setLoading(true); setError('');
    try{
      const r = await fetch('/api/rewards', { cache:'no-store', credentials:'include' });
      const d = await r.json();
      if(!r.ok || !d.success) throw new Error(d.error||'获取失败');
      setItems((d.data as RewardItem[]).filter(x=>x.enabled));
    }catch(e:any){ setError(e.message||'网络错误'); }
    finally{ setLoading(false); }
  }
  useEffect(()=>{ load(); },[]);

  async function redeem(item: RewardItem){
    const q = prompt(`兑换“${item.name}”数量：`, '1'); if(!q) return;
    const quantity = Math.max(1, parseInt(q));
    try{
      const r = await fetch('/api/rewards/redeem', { method:'POST', headers:{'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify({ rewardItemId: item.id, quantity }) });
      const d = await r.json();
      if(!r.ok || !d.success) throw new Error(d.error||'兑换失败');
      alert('兑换成功');
      await load();
    }catch(e:any){ alert(e.message||'兑换失败'); }
  }

  useEffect(()=>{ (async()=>{ try{ const r=await fetch('/api/auth/me',{cache:'no-store',credentials:'include'}); if(!r.ok){ await fetch('/api/auth/logout',{method:'POST',credentials:'include'}); location.href='/login'; return; } const d=await r.json(); if(!d?.user || d.user.role!=='child'){ await fetch('/api/auth/logout',{method:'POST',credentials:'include'}); location.href='/login'; return; } }catch{} })(); },[]);
return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--text)]">奖品兑换</h1>
        {loading? <div className="mt-4">加载中…</div> : error? <div className="mt-4 text-red-600">{error}</div> : (
          items.length===0? <div className="mt-6 text-gray-600">暂无可兑换奖品</div> : (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map(it=> (
                <div key={it.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {it.imageUrl? <img src={it.imageUrl} alt={it.name} className="w-full h-40 object-cover" />: <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">无图</div>}
                  <div className="p-4">
                    <div className="font-semibold text-gray-800">{it.name}</div>
                    <div className="text-sm text-gray-500 mt-1 h-10 line-clamp-2">{it.description||'-'}</div>
                    <div className="mt-2 text-[var(--text)]">所需积分：<span className="font-semibold text-rose-600">{it.cost}</span></div>
                    <div className="mt-1 text-xs text-gray-500">库存：{it.stock==null? '—': it.stock}</div>
                    <button onClick={()=>redeem(it)} className="mt-3 w-full px-3 py-2 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-600)]">兑换</button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}



