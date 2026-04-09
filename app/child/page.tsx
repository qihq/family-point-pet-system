"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useRequireRole } from '@/lib/useRequireRole';

// 小工具
function Section({ children }:{ children: React.ReactNode }){ return (<div className="transition-opacity duration-200 ease-out">{children}</div>); }
function Skeleton({ className='' }:{ className?: string }){ return (<div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>); }

type Status = 'pending'|'approved'|'rejected';

enum TabKey { pet='pet', tasks='tasks', records='records', points='points', rewards='rewards' }

function Overview(){
  const [balance,setBalance] = useState<number>(0);
  const [pending,setPending] = useState<number>(0);
  const [todayDone,setTodayDone] = useState<number>(0);
  const [loading,setLoading] = useState(true);
  useEffect(()=>{ (async()=>{
    try{
      const start = new Date(); start.setHours(0,0,0,0); const startTs = start.getTime();
      const tr = await fetch('/api/points/transactions?pageSize=1', { cache:'no-store', credentials:'include' });
      const td = await tr.json(); if(tr.ok && td.success) setBalance(td.data.balance||0);
      const pr = await fetch('/api/point-records?status=pending&pageSize=1', { cache:'no-store', credentials:'include' });
      const pd = await pr.json(); if(pr.ok && pd.success) setPending(pd.data.pagination?.total||0);
      const ar = await fetch('/api/point-records?status=approved&pageSize=50', { cache:'no-store', credentials:'include' });
      const ad = await ar.json(); if(ar.ok && ad.success){ const rows = (ad.data.records||[]) as any[]; setTodayDone(rows.filter((r:any)=> new Date(r.createdAt).getTime() >= startTs).length); }
    }catch{} finally{ setLoading(false); }
  })(); },[]);
  const Card = ({ label, value, color }:{label:string; value:React.ReactNode; color:string}) => (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-[var(--border)]">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-1 text-2xl font-bold" style={{color}}>{value}</div>
    </div>
  );
  return (
    <Section>
      {loading? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      ):(
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <Card label="当前积分" value={<span className="text-emerald-700">{balance}</span>} color="#0f766e" />
          <Card label="今日完成" value={<span className="text-[var(--text)]">{todayDone}</span>} color="#2f2a25" />
          <Card label="待审核" value={<span className="text-rose-700">{pending}</span>} color="#b91c1c" />
        </div>
      )}
    </Section>
  );
}

export default function ChildHome(){
  useRequireRole('child');
  const [tab, setTab] = useState<TabKey>(TabKey.pet);
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--text)]">孩子主页</h1>
          <div className="flex items-center gap-2">
            {[TabKey.pet,TabKey.tasks,TabKey.records,TabKey.points,TabKey.rewards].map(k=> (
              <button key={k} onClick={()=>setTab(k)} className={tab===k? 'px-3 py-1.5 rounded bg-[var(--primary-100)] text-[var(--text)] font-semibold shadow-sm':'px-3 py-1.5 rounded hover:bg-[var(--primary-50)] text-[var(--muted)]'}>
                {k===TabKey.pet?'宠物':k===TabKey.tasks?'提交任务':k===TabKey.records?'审核结果':k===TabKey.points?'我的积分':'奖品兑换'}
              </button>
            ))}
          </div>
        </div>
        <Overview />
        <div className="mt-4">
          {tab===TabKey.pet && <PetTab/>}
          {tab===TabKey.tasks && <TasksTab/>}
          {tab===TabKey.records && <RecordsTab/>}
          {tab===TabKey.points && <PointsTab/>}
          {tab===TabKey.rewards && <RewardsTab/>}
        </div>
      </div>
    </div>
  );
}

function PetTab(){
  const [pet,setPet] = useState<any>(null);
  const [loading,setLoading] = useState(true);
  const [Viewer,setViewer] = useState<any>(null);
  useEffect(()=>{ (async()=>{ try{ const r = await fetch('/api/pets/me', { cache:'no-store', credentials:'include' }); const d = await r.json(); if(r.ok && d.success) setPet(d.data.pet); } finally{ setLoading(false); } })(); },[]);
  useEffect(()=>{ (async()=>{ try{ const m = await import('@/components/child/pet-3d-viewer'); setViewer(()=>m.default); }catch{} })(); },[]);
  if(loading) return (<div className="space-y-2"><Skeleton className="h-6 w-32" /><Skeleton className="h-[220px] w-full" /></div>);
  return (
    <Section>
      <div className="text-sm text-[var(--muted)] mb-2">3D 预览（原型）</div>
      <div className="w-full max-w-[680px] aspect-video border rounded bg-white">
        {pet? (Viewer? <Viewer pet={pet} /> : <div className="w-full h-full flex items-center justify-center text-gray-500">加载模型…</div>) : <div className="w-full h-full flex items-center justify-center text-gray-500">暂无数据</div>}
      </div>
    </Section>
  );
}

function TasksTab(){
  const [rules, setRules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ (async()=>{ try{ const r = await fetch('/api/point-rules?enabled=true&pageSize=200', { cache:'no-store', credentials:'include' }); const d = await r.json(); if(r.ok && d.success) setRules(d.data.rules||d.data||[]); } finally{ setLoading(false); } })(); },[]);
  async function submit(id:string){
    const desc = prompt('给家长说说你完成了什么（可选）：','')||'';
    const r = await fetch('/api/point-records', { method:'POST', headers:{'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify({ pointRuleId: id, description: desc })});
    const d = await r.json(); if(!r.ok || !d.success){ alert(d.error||'提交失败'); return; }
    alert('已提交，等待家长审核');
  }
  if(loading) return (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{Array.from({length:6}).map((_,i)=>(<Skeleton key={i} className="h-28" />))}</div>);
  return (
    <Section>
      {rules.length===0? <div className="text-gray-600">暂无可提交任务</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {rules.map((r:any)=> (
            <div key={r.id} className="bg-white rounded shadow-sm p-4">
              <div className="font-semibold text-gray-800">{r.name}</div>
              <div className="text-xs text-gray-500 mt-1 h-10 line-clamp-2">{r.description||'-'}</div>
              <div className="mt-2 text-[var(--text)]">积分：<span className="font-semibold text-emerald-700">{r.pointsType==='range'? `${r.pointsMin||0}~${r.pointsMax||0}` : `+${r.points}`}</span></div>
              <button onClick={()=>submit(r.id)} className="mt-3 w-full px-3 py-2 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-600)]">提交审核</button>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

function RecordsTab(){
  const [tab,setTab] = useState<Status>('pending');
  const [rows,setRows] = useState<any[]>([]);
  const [loading,setLoading] = useState(true);
  useEffect(()=>{ (async()=>{
    setLoading(true);
    try{
      const r = await fetch(`/api/point-records?status=${tab}&pageSize=50`, { cache:'no-store', credentials:'include' }); const d = await r.json(); if(!r.ok||!d.success) throw new Error(d.error||'获取失败'); setRows(d.data.records||[]);
    }catch{ setRows([]); } finally{ setLoading(false); }
  })(); },[tab]);
  return (
    <Section>
      <div className="flex items-center gap-2 text-sm mb-3">
        {(['pending','approved','rejected'] as Status[]).map(s=> (
          <button key={s} onClick={()=>setTab(s)} className={tab===s? 'px-3 py-1.5 rounded bg-blue-100 font-semibold':'px-3 py-1.5 rounded hover:bg-blue-50'}>
            {s==='pending'? '待审核': s==='approved'? '已通过':'已拒绝'}
          </button>
        ))}
      </div>
      {loading? <div>加载中…</div> : rows.length===0? <div className="text-gray-600">暂无记录</div> : (
        <div className="overflow-x-auto bg-white rounded shadow-sm">
          <table className="w-full text-sm"><thead className="bg-gray-50 text-gray-600"><tr><th className="text-left px-3 py-2">时间</th><th className="text-left px-3 py-2">规则</th><th className="text-left px-3 py-2">分值</th><th className="text-left px-3 py-2">说明</th></tr></thead>
            <tbody>{rows.map((r:any)=> (<tr key={r.id} className="border-t"><td className="px-3 py-2">{new Date(r.createdAt).toLocaleString()}</td><td className="px-3 py-2">{r.pointRule?.name||'-'}</td><td className="px-3 py-2">{r.points||0}</td><td className="px-3 py-2 text-gray-600">{r.description||'-'}</td></tr>))}</tbody>
          </table>
        </div>
      )}
    </Section>
  );
}

function PointsTab(){
  const [rows,setRows] = useState<any[]>([]);
  const [loading,setLoading] = useState(true);
  const [balance,setBalance] = useState<number>(0);
  useEffect(()=>{ (async()=>{ setLoading(true); try{ const r = await fetch('/api/points/transactions?pageSize=50', { cache:'no-store', credentials:'include' }); const d = await r.json(); if(r.ok && d.success){ setRows(d.data.transactions||[]); setBalance(d.data.balance||0);} } finally{ setLoading(false); } })(); },[]);
  const earn = useMemo(()=> rows.filter((x:any)=>x.type==='earn').reduce((s:number,x:any)=>s+(x.amount||0),0),[rows]);
  const spend = useMemo(()=> rows.filter((x:any)=>x.type==='spend').reduce((s:number,x:any)=>s+(x.amount||0),0),[rows]);
  if(loading) return (<div className="space-y-2"><Skeleton className="h-5 w-28" /><Skeleton className="h-24" /></div>);
  return (
    <Section>
      <div className="text-gray-700">当前余额：<span className="font-semibold text-emerald-700">{balance}</span></div>
      <div className="text-sm text-gray-500">累计获得：{earn}，累计花费：{spend}</div>
      <div className="mt-3 overflow-x-auto bg-white rounded shadow-sm">
        <table className="w-full text-sm"><thead className="bg-gray-50 text-gray-600"><tr><th className="text-left px-3 py-2">时间</th><th className="text-left px-3 py-2">类型</th><th className="text-left px-3 py-2">金额</th><th className="text-left px-3 py-2">余额</th><th className="text-left px-3 py-2">说明</th></tr></thead>
          <tbody>{rows.map((t:any)=> (<tr key={t.id} className="border-t"><td className="px-3 py-2">{new Date(t.createdAt||t.time||Date.now()).toLocaleString()}</td><td className="px-3 py-2">{t.type==='earn'? '获得':'兑换'}</td><td className="px-3 py-2">{t.amount}</td><td className="px-3 py-2">{t.balanceAfter||t.balance}</td><td className="px-3 py-2 text-gray-600">{t.description||'-'}</td></tr>))}</tbody>
        </table>
      </div>
    </Section>
  );
}

function RewardsTab(){
  type RewardItem = { id:string; name:string; description?:string|null; cost:number; stock?:number|null; enabled:boolean; imageUrl?:string|null };
  const [items,setItems] = useState<RewardItem[]>([]);
  const [loading,setLoading] = useState(true);
  useEffect(()=>{ (async()=>{ try{ const r = await fetch('/api/rewards', { cache:'no-store', credentials:'include' }); const d = await r.json(); if(r.ok && d.success) setItems((d.data||[]).filter((x:any)=>x.enabled)); } finally{ setLoading(false); } })(); },[]);
  async function redeem(it: RewardItem){
    const q = prompt(`兑换“${it.name}”数量：`, '1'); if(!q) return; const quantity = Math.max(1, parseInt(q));
    const r = await fetch('/api/rewards/redeem', { method:'POST', headers:{'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify({ rewardItemId: it.id, quantity })});
    const d = await r.json(); if(!r.ok || !d.success){ alert(d.error||'兑换失败'); return; }
    alert('兑换成功');
  }
  if(loading) return (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({length:6}).map((_,i)=>(<Skeleton key={i} className="h-64" />))}</div>);
  return (
    <Section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length===0? <div className="text-gray-600">暂无可兑换奖品</div> : items.map((it)=> (
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
    </Section>
  );
}