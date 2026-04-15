"use client";

import { useEffect, useState } from 'react';

export default function SettingsPage(){
  const [costs, setCosts] = useState<any>({ feed: 5, water: 3, clean: 2, play: 1 });
  const [loading, setLoading] = useState(true);

  async function load(){
    setLoading(true);
    try{ const r = await fetch('/api/pet-config', { cache:'no-store' }); const d = await r.json(); if(r.ok && d.success) setCosts(d.data); }
    finally{ setLoading(false); }
  }
  async function save(){
    const r = await fetch('/api/pet-config', { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(costs) });
    const d = await r.json(); if(!(r.ok && d.success)) alert(d.error||'保存失败'); else alert('已保存');
  }
  useEffect(()=>{ load(); },[]);

    // 仅家长访问
  useEffect(()=>{ (async()=>{ try{ const r=await fetch('/api/auth/me',{cache:'no-store',credentials:'include'}); if(!r.ok){ await fetch('/api/auth/logout',{method:'POST',credentials:'include'}); location.href='/login'; return; } const d=await r.json(); if(!d?.user || d.user.role!=='parent'){ await fetch('/api/auth/logout',{method:'POST',credentials:'include'}); location.href='/login'; return; } }catch{} })(); },[]);
return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--text)]">设置</h1>
          <a href="/parent" className="text-amber-700 hover:text-amber-800 text-sm">返回主页</a>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-lg font-semibold">互动积分设置</h2>
          {loading ? (
            <div className="text-sm text-gray-500 mt-3">加载中…</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
              {(['feed','water','clean','play'] as const).map((k)=> (
                <label key={k} className="text-sm text-gray-700">
                  {k==='feed'?'喂食':k==='water'?'喂水':k==='clean'?'清洁':'陪玩'}（积分）
                  <input type="number" min={0} className="mt-1 w-full border rounded px-2 py-1" value={(costs as any)[k] ?? ''} onChange={e=>setCosts((c:any)=>({ ...c, [k]: Number(e.target.value||0) }))} />
                </label>
              ))}
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <button onClick={save} className="px-3 py-1.5 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-600)] text-sm">保存</button>
            <button onClick={load} className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-sm">刷新</button>
          </div>
        </div>
      </div>
    </div>
  );
}
