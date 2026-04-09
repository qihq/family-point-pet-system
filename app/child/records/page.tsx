"use client";
import React, { useEffect, useState } from 'react';
import { useRequireRole } from '@/lib/useRequireRole';
import { useSearchParams, useRouter } from 'next/navigation';

type Status = 'pending'|'approved'|'rejected';

type Tab = 'records' | 'redeems';

export default function ChildRecordsPage(){
  useRequireRole('child');
  const sp = useSearchParams();
  const router = useRouter();
  const initTab = (sp.get('tab') as Tab) || 'records';
  const initStatus = (sp.get('status') as Status) || 'pending';

  const [tab,setTab] = useState<Tab>(initTab);
  const [status,setStatus] = useState<Status>(initStatus);
  const [rows,setRows] = useState<any[]>([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState('');

  // 避免重复 replace 触发的刷新循环：只有当 URL 参数与本地状态不一致时才替换
  useEffect(()=>{
    const curTab = (sp.get('tab') as Tab) || 'records';
    const curStatus = (sp.get('status') as Status) || 'pending';
    if(curTab === tab && (tab !== 'records' || curStatus === status)) return;
    const qs = new URLSearchParams(); qs.set('tab', tab); if(tab==='records') qs.set('status', status);
    router.replace(`/child/records?${qs.toString()}`, { scroll: false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[tab,status,sp]);

  async function loadRecords(s:Status){
    setLoading(true); setError('');
    try{
      const r = await fetch(`/api/point-records?status=${s}&pageSize=50`, { cache:'no-store', credentials:'include' });
      const d = await r.json();
      if(!r.ok || !d.success) throw new Error(d.error||'获取失败');
      setRows(d.data.records||[]);
    }catch(e:any){ setError(e.message||'网络错误'); }
    finally{ setLoading(false); }
  }
  async function loadRedeems(){
    setLoading(true); setError('');
    try{
      const r = await fetch('/api/rewards/history', { cache:'no-store', credentials:'include' });
      const d = await r.json();
      if(!r.ok || !d.success) throw new Error(d.error||'获取失败');
      setRows(d.data||[]);
    }catch(e:any){ setError(e.message||'网络错误'); }
    finally{ setLoading(false); }
  }

  useEffect(()=>{ if(tab==='records') loadRecords(status); else loadRedeems(); },[tab, status]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--text)]">审核结果 / 兑换记录</h1>
        <div className="mt-3 flex items-center gap-3">
          <button onClick={()=>setTab('records')} className={tab==='records'? 'px-3 py-1.5 rounded bg-[var(--primary-100)] font-semibold':'px-3 py-1.5 rounded hover:bg-[var(--primary-50)]'}>打卡记录</button>
          <button onClick={()=>setTab('redeems')} className={tab==='redeems'? 'px-3 py-1.5 rounded bg-[var(--primary-100)] font-semibold':'px-3 py-1.5 rounded hover:bg-[var(--primary-50)]'}>兑换记录</button>
          {tab==='records' && (
            <div className="inline-flex items-center gap-2 ml-4 text-sm">
              {(['pending','approved','rejected'] as Status[]).map(s=> (
                <button key={s} onClick={()=>setStatus(s)} className={status===s? 'px-3 py-1.5 rounded bg-blue-100 font-semibold':'px-3 py-1.5 rounded hover:bg-blue-50'}>
                  {s==='pending'? '待审核': s==='approved'? '已通过':'已拒绝'}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading? <div className="mt-4">加载中…</div> : error? <div className="mt-4 text-red-600">{error}</div> : (
          tab==='records' ? (
            rows.length===0? <div className="mt-6 text-gray-600">暂无记录</div> : (
              <div className="mt-4 overflow-x-auto bg-white rounded-xl shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="text-left px-4 py-2">时间</th>
                      <th className="text-left px-4 py-2">规则</th>
                      <th className="text-left px-4 py-2">分值</th>
                      <th className="text-left px-4 py-2">说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r:any)=> (
                      <tr key={r.id} className="border-t">
                        <td className="px-4 py-2">{new Date(r.createdAt).toLocaleString()}</td>
                        <td className="px-4 py-2">{r.pointRule?.name||'-'}</td>
                        <td className="px-4 py-2">{r.points||0}</td>
                        <td className="px-4 py-2 text-gray-600">{r.description||'-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            rows.length===0? <div className="mt-6 text-gray-600">暂无兑换记录</div> : (
              <div className="mt-4 overflow-x-auto bg-white rounded-xl shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="text-left px-4 py-2">时间</th>
                      <th className="text-left px-4 py-2">奖品</th>
                      <th className="text-left px-4 py-2">数量</th>
                      <th className="text-left px-4 py-2">消耗积分</th>
                      <th className="text-left px-4 py-2">备注</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r:any)=> (
                      <tr key={r.id} className="border-t">
                        <td className="px-4 py-2">{new Date(r.createdAt).toLocaleString()}</td>
                        <td className="px-4 py-2">{r.rewardName||'-'}</td>
                        <td className="px-4 py-2">{r.quantity}</td>
                        <td className="px-4 py-2">{r.pointsSpent}</td>
                        <td className="px-4 py-2 text-gray-600">{r.note||'-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}