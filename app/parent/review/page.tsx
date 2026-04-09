"use client";
import { useEffect, useState } from 'react';

interface RecordItem {
  id: string;
  childId: string;
  pointRuleId: string;
  description?: string;
  createdAt: string;
  child: { id: string; name: string; avatarUrl?: string };
  pointRule: { id: string; name: string; points: number; pointsType: string; category: string };
}

export default function ParentReviewPage(){
  const [rows, setRows] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load(){
    setLoading(true); setError('');
    try{
      const res = await fetch('/api/point-records?status=pending&pageSize=50', { cache: 'no-store', credentials: 'include' });
      const text = await res.text(); const data = text ? JSON.parse(text) : null;
      if(!res.ok || !data.success) throw new Error(data.error||'加载失败');
      setRows(data.data.records as RecordItem[]);
    }catch(e:any){ setError(e.message||'网络错误'); }
    finally{ setLoading(false); }
  }

  useEffect(()=>{ load(); },[]);

  async function review(row: RecordItem, action: 'approve'|'reject'){
    try{
      let body: any = { action };
      if(action==='approve'){
        const input = prompt('通过积分（正整数）：', String(row.pointRule?.points ?? 10));
        if(!input) return; const n = Number(input);
        if(!Number.isFinite(n) || n<=0){ alert('请输入大于 0 的整数'); return; }
        body.points = Math.floor(n);
      } else {
        body.reason = prompt('拒绝原因（可选）：', '') || '';
      }
      const res = await fetch(`/api/point-records/${row.id}/review`, { method: 'POST', headers: { 'Content-Type':'application/json' }, credentials: 'include', body: JSON.stringify(body) });
      const text = await res.text(); const data = text ? JSON.parse(text) : null;
      if(!res.ok || !data.success){ alert(data.error||'操作失败'); return; }
      await load();
    }catch(e:any){ alert(e.message||'操作失败'); }
  }

    // 仅家长访问
  useEffect(()=>{ (async()=>{ try{ const r=await fetch('/api/auth/me',{cache:'no-store',credentials:'include'}); if(!r.ok){ await fetch('/api/auth/logout',{method:'POST',credentials:'include'}); location.href='/login'; return; } const d=await r.json(); if(!d?.user || d.user.role!=='parent'){ await fetch('/api/auth/logout',{method:'POST',credentials:'include'}); location.href='/login'; return; } }catch{} })(); },[]);
return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--text)]">任务审核</h1>
        <p className="text-sm text-[var(--muted)] mt-1">孩子提交的任务在这里审核，通过后自动加分</p>
        {loading? <div className="mt-4">加载中…</div> : error? <div className="mt-4 text-red-600">{error}</div> : (
          rows.length===0? <div className="mt-6 text-gray-600">暂无待审核记录</div> : (
            <div className="mt-4 overflow-x-auto bg-white rounded-xl shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="text-left px-4 py-2">孩子</th>
                    <th className="text-left px-4 py-2">任务</th>
                    <th className="text-left px-4 py-2">提交时间</th>
                    <th className="text-left px-4 py-2">说明</th>
                    <th className="text-left px-4 py-2">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(r=> (
                    <tr key={r.id} className="border-t">
                      <td className="px-4 py-2">{r.child?.name||r.childId}</td>
                      <td className="px-4 py-2">{r.pointRule?.name||r.pointRuleId}</td>
                      <td className="px-4 py-2">{new Date(r.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-2 text-gray-600">{r.description||'-'}</td>
                      <td className="px-4 py-2">
                        <button onClick={()=>review(r,'approve')} className="px-2 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700">通过</button>
                        <button onClick={()=>review(r,'reject')} className="ml-2 px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">拒绝</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
}



