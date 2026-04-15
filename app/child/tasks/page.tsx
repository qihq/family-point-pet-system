"use client";
import React from 'react';
import { useRequireRole } from '@/lib/useRequireRole';

interface Rule { id: string; name: string; description?: string; points: number; pointsType: string; category: string; enabled: boolean }
interface Plan { id:string; title:string; points:number; frequency?:string|null; enabled?:boolean|null; needApproval?:boolean|null; createdAt?:string }

export default function ChildTasksPage(){
  useRequireRole('child');
  const [rules, setRules] = React.useState<Rule[]>([]);
  const [plans, setPlans] = React.useState<Plan[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [message, setMessage] = React.useState('');

  async function load(){
    setLoading(true);
    try{
      const [rRules, rPlans] = await Promise.all([
        fetch('/api/point-rules?enabled=true&pageSize=200', { cache: 'no-store', credentials: 'include' }),
        fetch('/api/tasks?deleted=false', { cache: 'no-store', credentials: 'include' }),
      ]);
      const dRules = await rRules.json().catch(()=>({success:false}));
      const dPlans = await rPlans.json().catch(()=>({success:false}));
      if(rRules.ok && dRules.success){ setRules((dRules.data.rules||dRules.data||[]) as Rule[]); }
      if(rPlans.ok && dPlans.success){ setPlans((dPlans.data||[]) as Plan[]); }
    }catch(e:any){ setMessage(e.message||'网络错误'); }
    finally{ setLoading(false); }
  }

  React.useEffect(()=>{ load(); },[]);

  async function submitRule(rule: Rule){
    try{
      const desc = prompt('可选：补充说明');
      const r = await fetch('/api/point-records', { method:'POST', headers:{ 'Content-Type':'application/json' }, credentials:'include', body: JSON.stringify({ pointRuleId: rule.id, description: desc||undefined }) });
      const d = await r.json();
      if(!r.ok || !d.success) throw new Error(d.error||'提交失败');
      setMessage(d.message||'已提交');
      setTimeout(()=> setMessage(''), 2000);
    }catch(e:any){ setMessage(e.message||'提交失败'); setTimeout(()=> setMessage(''), 2500); }
  }

  async function completePlan(plan: Plan){
    try{
      const r = await fetch(`/api/tasks/${plan.id}/complete`, { method:'POST', headers:{ 'Content-Type':'application/json' }, credentials:'include', body: '{}' });
      const d = await r.json();
      if(!r.ok || !d.success) throw new Error(d.error||'完成失败');
      setMessage(d.data?.status==='pending'? '已提交审核' : `+${d.data?.points||0} 积分`);
      setTimeout(()=> setMessage(''), 2000);
    }catch(e:any){ setMessage(e.message||'完成失败'); setTimeout(()=> setMessage(''), 2500); }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-[var(--text)]">提交任务</h1>
        {message && <div className="text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded px-3 py-2">{message}</div>}

        {/* 计划任务（来自周历 TaskPlan） */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">我的计划任务</h2>
              <p className="text-sm text-gray-600">与周历一致，可直接在此完成</p>
            </div>
            <a href="/child/plans" className="text-sm text-amber-700 hover:text-amber-800">去周历查看</a>
          </div>
          {loading? (
            <div className="p-6 text-gray-500">加载中…</div>
          ) : (
            <div className="p-4 space-y-2">
              {plans.filter(p=> p.enabled!==false).length===0? (
                <div className="text-gray-600">暂无计划任务</div>
              ) : plans.filter(p=> p.enabled!==false).map(p=> (
                <div key={p.id} className="flex items-center justify-between border rounded-lg px-3 py-2">
                  <div>
                    <div className="text-sm font-medium">{p.title}</div>
                    <div className="text-[11px] text-gray-500">{p.frequency||'once'} · +{p.points||0}{p.needApproval? ' · 需审核':''}</div>
                  </div>
                  <button onClick={()=>completePlan(p)} className="px-2 py-1 rounded bg-amber-600 text-white hover:bg-amber-700">完成</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 旧：积分规则提交 */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">积分规则</h2>
          </div>
          {loading? (
            <div className="p-6 text-gray-500">加载中…</div>
          ) : (
            <div className="p-4 space-y-3">
              {rules.length===0? <div className="text-gray-600">暂无可提交任务</div> : rules.map(r => (
                <div key={r.id} className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-800">{r.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{r.description||'-'}</div>
                  </div>
                  <button onClick={()=>submitRule(r)} className="rounded px-3 py-1.5 text-white transition hover:bg-[var(--primary-700)] hover:text-white" style={{ background: "var(--primary)" }}>{`提交`}</button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// codex-ok: 2026-04-15T13:16:00+08:00
