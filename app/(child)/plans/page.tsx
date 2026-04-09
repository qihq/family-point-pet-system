"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import WeeklyCalendar from '@/components/WeeklyCalendar';

type Role = 'parent'|'child'|'admin';

type Task = {
  id: string;
  childId?: string;
  title: string;
  description?: string | null;
  points: number;
  scheduledAt?: string | null;
  duration?: number | null;
  frequency?: 'daily'|'weekly'|'monthly'|'once'|'unlimited'|string|null;
  enabled?: boolean | null;
};

export default function ChildPlansPage(){
  const [me,setMe] = useState<{role:Role; id:string} | null>(null);
  const [weekStart,setWeekStart] = useState<Date>(new Date());
  const [tasks,setTasks] = useState<Task[]>([]);
  const [pending,setPending] = useState<number>(0);
  const [loading,setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(()=>{ (async()=>{
    try{
      const r = await fetch('/api/auth/me', { cache:'no-store', credentials:'include' });
      const d = await r.json(); if(r.ok && d?.user){ setMe({ role:d.user.role as Role, id:d.user.id }); }
    }catch{}
  })(); },[]);

  useEffect(()=>{ (async()=>{
    setLoading(true);
    try{
      const rt = await fetch('/api/tasks', { cache:'no-store', credentials:'include' });
      const dt = await rt.json(); if(rt.ok && dt.success) setTasks(dt.data||[]);
    }finally{ setLoading(false); }
    try{
      const rp = await fetch('/api/point-records?status=pending&pageSize=1', { cache:'no-store', credentials:'include' });
      const dp = await rp.json(); const total = dp?.data?.pagination?.total ?? 0; setPending(Number(total)||0);
    }catch{ setPending(0); }
  })(); },[]);

  const filtered = useMemo(()=> tasks.filter(t=> t.enabled!==false), [tasks]);
  const isChild = me?.role === 'child';

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--text)]">学习计划</h1>
          {!isChild && (
            <div className="text-sm text-gray-500">（孩子侧只读视图）</div>
          )}
        </div>

        {pending>0 && (
          <button onClick={()=> router.push('/child/records?tab=records&status=pending')} className="w-full text-left px-4 py-3 rounded-lg bg-orange-50 border border-orange-200 text-orange-800 flex items-center justify-between">
            <div>有 <span className="font-semibold">{pending}</span> 条打卡正在审核</div>
            <span className="text-orange-600">查看</span>
          </button>
        )}

        <WeeklyCalendar weekStart={weekStart} onChange={setWeekStart} dayBadge={()=>null} />

        {loading? (
          <div>加载中…</div>
        ):(
          <div className="space-y-3">
            {filtered.length===0? (
              <div className="text-gray-600">暂无学习计划</div>
            ) : filtered.map(t=> (
              <div key={t.id} className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">{t.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{t.scheduledAt? new Date(t.scheduledAt).toLocaleString(): '任意时间'} · {t.duration||30} 分钟 · {t.frequency||'once'}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-amber-700 font-semibold">+{t.points||0}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
