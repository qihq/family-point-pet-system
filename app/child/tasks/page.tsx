"use client";
import React from 'react';
import { useRequireRole } from '@/lib/useRequireRole';

interface Rule { id: string; name: string; description?: string; points: number; pointsType: string; category: string; enabled: boolean }

export default function ChildTasksPage(){
  useRequireRole('child');
  const [rules, setRules] = React.useState<Rule[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [message, setMessage] = React.useState('');

  async function load(){
    setLoading(true);
    try{
      const res = await fetch('/api/point-rules?enabled=true&pageSize=200', { cache: 'no-store', credentials: 'include' });
      const data = await res.json();
      if(!res.ok || !data.success) throw new Error(data.error||'获取失败');
      setRules((data.data.rules||data.data||[]) as Rule[]);
    }catch(e:any){ setMessage(e.message||'网络错误'); }
    finally{ setLoading(false); }
  }

  React.useEffect(()=>{ load(); },[]);

  async function submit(rule: Rule){
    try{
      const desc = prompt('可选：补充说明');
      const r = await fetch('/api/point-records', { method:'POST', headers:{ 'Content-Type':'application/json' }, credentials:'include', body: JSON.stringify({ pointRuleId: rule.id, description: desc||undefined }) });
      const d = await r.json();
      if(!r.ok || !d.success) throw new Error(d.error||'提交失败');
      setMessage(d.message||'已提交');
      setTimeout(()=> setMessage(''), 2000);
    }catch(e:any){ setMessage(e.message||'提交失败'); setTimeout(()=> setMessage(''), 2500); }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--text)]">提交任务</h1>
        {loading? <div className="mt-4">加载中…</div> : (
          <div className="mt-4 space-y-3">
            {message && <div className="text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded px-3 py-2">{message}</div>}
            {rules.length===0? <div className="text-gray-600">暂无可提交任务</div> : rules.map(r => (
              <div key={r.id} className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">{r.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{r.description||'-'}</div>
                </div>
                <button onClick={()=>submit(r)} className="px-3 py-1.5 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-600)]">提交</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
