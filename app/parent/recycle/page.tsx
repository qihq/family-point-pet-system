/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from 'react';

export default function RecycleBin(){
  const [rows, setRows] = useState<{id:string; name:string; avatarUrl?:string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load(){
    setLoading(true); setError('');
    try{
      const r = await fetch('/api/family/children?deleted=true', { cache:'no-store' });
      const d = await r.json();
      if(!r.ok || !d.success) throw new Error(d.error||'加载失败');
      setRows(d.data||[]);
    }catch(e:any){ setError(e.message||'网络错误'); }
    finally{ setLoading(false); }
  }

  useEffect(()=>{ load(); },[]);

  async function restore(id:string){
    if(!confirm('确定要恢复该孩子吗？')) return;
    try{
      const r = await fetch(`/api/family/children/${id}/restore`, { method:'POST' });
      const d = await r.json(); if(!r.ok || !d.success) throw new Error(d.error||'恢复失败');
      await load(); alert('已恢复');
    }catch(e:any){ alert(e.message||'恢复失败'); }
  }

  async function purge(id:string){
    if(!confirm('此操作将彻底删除该孩子及其数据，无法撤销。继续吗？')) return;
    try{
      const r = await fetch(`/api/family/children/${id}/purge`, { method:'DELETE' });
      const d = await r.json(); if(!r.ok || !d.success) throw new Error(d.error||'删除失败');
      await load(); alert('已彻底删除');
    }catch(e:any){ alert(e.message||'删除失败'); }
  }

    // 仅家长访问
  useEffect(()=>{ (async()=>{ try{ const r=await fetch('/api/auth/me',{cache:'no-store',credentials:'include'}); if(!r.ok){ await fetch('/api/auth/logout',{method:'POST',credentials:'include'}); location.href='/login'; return; } const d=await r.json(); if(!d?.user || d.user.role!=='parent'){ await fetch('/api/auth/logout',{method:'POST',credentials:'include'}); location.href='/login'; return; } }catch{} })(); },[]);
return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--text)]">回收站</h1>
          <a href="/parent" className="text-amber-700 hover:text-amber-800 text-sm">返回主页</a>
        </div>
        <div className="bg-white rounded-xl shadow-md mt-4">
          {loading? <div className="p-6 text-gray-500">加载中…</div> : error? <div className="p-6 text-red-600">{error}</div> : (
            rows.length===0? <div className="p-6 text-gray-600">暂无已删除的孩子</div> : (
              <div className="p-4 space-y-2">
                {rows.map(k => (
                  <div key={k.id} className="flex items-center justify-between border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      {k.avatarUrl ? (<img src={k.avatarUrl} alt="avatar" className="w-10 h-10 rounded-full object-cover" />) : (<div className="w-10 h-10 rounded-full bg-gray-100" />)}
                      <div>
                        <div className="font-semibold text-gray-800">{k.name}</div>
                        <div className="text-xs text-gray-500">ID: {k.id}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={()=>restore(k.id)} className="px-2 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700">恢复</button>
                      <button onClick={()=>purge(k.id)} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">彻底删除</button>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
