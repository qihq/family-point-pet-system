"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { useRequireRole } from '@/lib/useRequireRole';

export default function ChildPointsPage(){
  useRequireRole('child');
  const [rows,setRows] = useState<any[]>([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState('');
  const [balance,setBalance] = useState<number>(0);

  async function load(){
    setLoading(true); setError('');
    try{
      const r = await fetch('/api/points/transactions?pageSize=50', { cache:'no-store', credentials:'include' });
      const d = await r.json();
      if(!r.ok || !d.success) throw new Error(d.error||'获取失败');
      setRows(d.data.transactions||d.data.records||[]);
      setBalance(d.data.balance||0);
    }catch(e:any){ setError(e.message||'网络错误'); }
    finally{ setLoading(false); }
  }

  useEffect(()=>{ load(); },[]);

  const totalEarn = useMemo(()=> rows.filter((x:any)=>x.type==='earn').reduce((s:number,x:any)=>s+(x.amount||0),0),[rows]);
  const totalSpend = useMemo(()=> rows.filter((x:any)=>x.type==='spend').reduce((s:number,x:any)=>s+(x.amount||0),0),[rows]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--text)]">我的积分</h1>
        <div className="mt-2 text-gray-700">当前余额：<span className="font-semibold text-emerald-700">{balance}</span></div>
        <div className="mt-1 text-sm text-gray-500">累计获得：{totalEarn}，累计花费：{totalSpend}</div>
        {loading? <div className="mt-4">加载中…</div> : error? <div className="mt-4 text-red-600">{error}</div> : (
          rows.length===0? <div className="mt-6 text-gray-600">暂无流水</div> : (
            <div className="mt-4 overflow-x-auto bg-white rounded-xl shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="text-left px-4 py-2">时间</th>
                    <th className="text-left px-4 py-2">类型</th>
                    <th className="text-left px-4 py-2">金额</th>
                    <th className="text-left px-4 py-2">余额</th>
                    <th className="text-left px-4 py-2">说明</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((t:any)=> (
                    <tr key={t.id} className="border-t">
                      <td className="px-4 py-2">{new Date(t.createdAt||t.time||Date.now()).toLocaleString()}</td>
                      <td className="px-4 py-2">{t.type==='earn'? '获得':'兑换'}</td>
                      <td className="px-4 py-2">{t.amount}</td>
                      <td className="px-4 py-2">{t.balanceAfter||t.balance}</td>
                      <td className="px-4 py-2 text-gray-600">{t.description||'-'}</td>
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