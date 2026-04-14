"use client";
import React, { useEffect, useMemo, useState } from 'react';
import WeeklyCalendar, { CalendarEvent } from '@/components/WeeklyCalendar';

export default function ChildPlansPage(){
  const [weekFrom,setWeekFrom] = useState<Date>(new Date());
  const [events,setEvents] = useState<CalendarEvent[]>([]);
  const [loading,setLoading] = useState(false);
  const [tasks,setTasks] = useState<any[]>([]);
  const [activeDate,setActiveDate] = useState<Date>(new Date());
  const [toast,setToast] = useState<string>('');

  async function fetchCalendar(from: Date, to: Date){
    setLoading(true);
    try{
      const url = `/api/calendar?from=${from.toISOString().slice(0,10)}&to=${to.toISOString().slice(0,10)}`;
      const r = await fetch(url, { cache:'no-store', credentials:'include' });
      const d = await r.json(); if(r.ok && d.success){ setEvents(d.data||[]); }
    }finally{ setLoading(false); }
  }

  useEffect(()=>{ (async()=>{
    try{ const r = await fetch('/api/tasks', { cache:'no-store', credentials:'include' }); const d = await r.json(); if(r.ok && d.success) setTasks(d.data||[]); }catch{}
  })(); },[]);

  const dayTasks = useMemo(()=> tasks.filter((t:any)=> t.enabled!==false), [tasks]);

  async function completeTask(taskId: string){
    try{
      const r = await fetch(`/api/tasks/${taskId}/complete`, { method:'POST', headers:{'Content-Type':'application/json'}, credentials:'include', body:'{}' });
      const d = await r.json(); if(!r.ok || !d.success){ alert(d.error||'完成失败'); return; }
      setToast(d.data?.status==='pending'? '已提交审核' : `+${d.data?.points||0} 积分`);
      // 重新拉取本周日历，驱动热力值更新
      const from = startOfWeek(activeDate); const to = endOfWeek(activeDate);
      await fetchCalendar(from,to);
    }catch(e:any){ alert(e.message||'网络错误'); }
  }

  function startOfWeek(d:Date){ const x=new Date(d); const w=(x.getDay()+6)%7; x.setHours(0,0,0,0); x.setDate(x.getDate()-w); return x; }
  function endOfWeek(d:Date){ const s=startOfWeek(d); const e=new Date(s); e.setDate(s.getDate()+6); e.setHours(23,59,59,999); return e; }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--text)]">{`孩子计划`}</h1>
        </div>

        <WeeklyCalendar
          variant="child"
          events={events}
          onWeekChange={(from,to)=>{ setWeekFrom(from); fetchCalendar(from,to); }}
          onDayClick={(date)=> setActiveDate(date)}
        />

        {/* 点击某天后展开任务列表（简化：列出所有启用任务，演示完成联动） */}
        <div className="bg-white rounded-xl shadow-sm p-3">
          <div className="text-sm text-gray-600 mb-2">{activeDate.toLocaleDateString()} {`的任务`}</div>
          {dayTasks.length===0? (
            <div className="text-gray-500 text-sm">{`暂无任务`}</div>
          ) : (
            <div className="space-y-2">
              {dayTasks.map((t:any)=> (
                <div key={t.id} className="flex items-center justify-between border rounded-lg px-3 py-2">
                  <div>
                    <div className="text-sm font-medium">{t.title}</div>
                    <div className="text-[11px] text-gray-500">{`${t.frequency||'once'} · +${t.points||0}${t.needApproval? ' · 待审核':''}`}</div>
                  </div>
                  <button onClick={()=>completeTask(t.id)} className="px-2 py-1 rounded bg-amber-600 text-white hover:bg-amber-700">{`完成`}</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black/80 text-white px-3 py-1.5 rounded-full text-sm" onAnimationEnd={()=>setToast('')}>{toast}</div>
        )}
      </div>
    </div>
  );
}

// codex-ok: 2026-04-14T12:23:30+08:00