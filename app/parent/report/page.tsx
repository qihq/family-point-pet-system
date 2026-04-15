"use client";

import { useEffect, useMemo, useState } from 'react';

type Tx = {
  id: string; createdAt: string; type: 'spend'|'earn'; sourceType: string; amount: number; balanceAfter: number; description?: string;
  childId: string; childName: string;
};

export default function ReportPage(){
  const [kids, setKids] = useState<{id:string; name:string}[]>([]);
  const [childId, setChildId] = useState<string>('all');
  const [type, setType] = useState<string>('all');
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [rows, setRows] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{ fetch('/api/family/children').then(r=>r.json()).then(d=>{ if(d?.success){ setKids(d.data||[]); } }); },[]);

  async function query(){
    setLoading(true);
    try{
      const p = new URLSearchParams();
      if(childId && childId!=='all') p.set('childId', childId);
      if(type && type!=='all') p.set('type', type);
      if(start) p.set('startDate', start);
      if(end) p.set('endDate', end);
      const res = await fetch(`/api/reports/points?${p.toString()}`);
      const data = await res.json();
      if(res.ok && data.success){ setRows(data.data.transactions as Tx[]); } else { alert(data.error||'查询失败'); }
    } finally { setLoading(false); }
  }

  function exportCsv(){
    const p = new URLSearchParams();
    if(childId && childId!=='all') p.set('childId', childId);
    if(type && type!=='all') p.set('type', type);
    if(start) p.set('startDate', start);
    if(end) p.set('endDate', end);
    p.set('format','csv');
    window.open(`/api/reports/points?${p.toString()}`,'_blank');
  }

  const header = useMemo(()=>['时间','孩子','类型','来源','金额','结余','说明'],[]);

    // 仅家长访问
  useEffect(()=>{ (async()=>{ try{ const r=await fetch('/api/auth/me',{cache:'no-store',credentials:'include'}); if(!r.ok){ await fetch('/api/auth/logout',{method:'POST',credentials:'include'}); location.href='/login'; return; } const d=await r.json(); if(!d?.user || d.user.role!=='parent'){ await fetch('/api/auth/logout',{method:'POST',credentials:'include'}); location.href='/login'; return; } }catch{} })(); },[]);
return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--text)]">积分报告</h1>
          <a href="/parent" className="text-amber-700 hover:text-amber-800 text-sm">返回主页</a>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <label className="text-sm text-gray-700">
            孩子
            <select value={childId} onChange={e=>setChildId(e.target.value)} className="mt-1 w-full border rounded px-2 py-1">
              <option value="all">全部</option>
              {kids.map(k=> <option key={k.id} value={k.id}>{k.name}</option>)}
            </select>
          </label>
          <label className="text-sm text-gray-700">
            类型
            <select value={type} onChange={e=>setType(e.target.value)} className="mt-1 w-full border rounded px-2 py-1">
              <option value="all">全部</option>
              <option value="earn">收入</option>
              <option value="spend">支出</option>
            </select>
          </label>
          <label className="text-sm text-gray-700">
            起始日期
            <input type="date" value={start} onChange={e=>setStart(e.target.value)} className="mt-1 w-full border rounded px-2 py-1" />
          </label>
          <label className="text-sm text-gray-700">
            结束日期
            <input type="date" value={end} onChange={e=>setEnd(e.target.value)} className="mt-1 w-full border rounded px-2 py-1" />
          </label>
          <div className="sm:col-span-2 lg:col-span-4 flex gap-2">
            <button onClick={query} disabled={loading} className="px-3 py-1.5 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-600)] text-sm disabled:opacity-60">{loading?'查询中…':'查询'}</button>
            <button onClick={exportCsv} className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-sm">导出 CSV</button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {header.map(h=> <th key={h} className="text-left text-gray-500 px-4 py-2">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.length===0 ? (
                <tr><td className="px-4 py-6 text-gray-500" colSpan={7}>暂无数据，请设置筛选条件后查询</td></tr>
              ) : rows.map(r=> (
                <tr key={r.id} className="border-t">
                  <td className="px-4 py-2">{new Date(r.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-2">{r.childName}</td>
                  <td className="px-4 py-2">{r.type==='spend'?'支出':'收入'}</td>
                  <td className="px-4 py-2">{r.sourceType}</td>
                  <td className="px-4 py-2">{r.type==='spend'?'-':''}{r.amount}</td>
                  <td className="px-4 py-2">{r.balanceAfter}</td>
                  <td className="px-4 py-2">{r.description||''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
