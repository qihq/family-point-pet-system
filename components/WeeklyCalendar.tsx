"use client";
import React from 'react';

export interface CalendarEvent {
  id: string;
  date: string; // ISO
  title: string;
  childName?: string;
  childId?: string;
  points: number;
  category: "study" | "exercise" | "chore" | string | null;
  isPending?: boolean;
}

export interface WeeklyCalendarProps {
  variant: 'child' | 'parent';
  weekStart?: Date | string;
  events?: CalendarEvent[];
  loading?: boolean;
  onWeekChange?: (from: Date, to: Date) => void;
  onDayClick?: (date: Date, events: CalendarEvent[]) => void;
  onEventClick?: (event: CalendarEvent) => void;
}

function toMonday(d: Date){ const x = new Date(d); const w = (x.getDay()+6)%7; x.setHours(0,0,0,0); x.setDate(x.getDate()-w); return x; }
function addDays(d:Date,n:number){ const x=new Date(d); x.setDate(x.getDate()+n); return x; }
function endOfDay(d:Date){ const x=new Date(d); x.setHours(23,59,59,999); return x; }
function fmtDay(d:Date){ return d.getDate(); }
function weekIndex(d:Date){ const one = new Date(d.getFullYear(),0,1); const diff = (d.getTime()-one.getTime())/86400000+1; return Math.ceil(diff/7); }

export default function WeeklyCalendar({ variant, weekStart, events = [], loading, onWeekChange, onDayClick, onEventClick }: WeeklyCalendarProps){
  const init = weekStart ? new Date(weekStart) : new Date();
  const [start,setStart] = React.useState<Date>(toMonday(init));
  const [active,setActive] = React.useState<Date>(toMonday(init));
  React.useEffect(()=>{
    const from = toMonday(start); const to = endOfDay(addDays(from,6));
    onWeekChange?.(from,to);
  },[start]);

  const days = React.useMemo(()=>Array.from({length:7},(_,i)=> addDays(start,i)),[start]);
  const inWeek = React.useMemo(()=>{
    const from = toMonday(start).getTime(); const to = endOfDay(addDays(start,6)).getTime();
    return events.filter(e=>{ const t = new Date(e.date).getTime(); return t>=from && t<=to; });
  },[events,start]);
  const groupByDay = React.useMemo(()=>{
    const m = new Map<string, CalendarEvent[]>();
    for(const d of days){ m.set(d.toDateString(),[]); }
    for(const e of inWeek){ const k = new Date(e.date).toDateString(); if(!m.has(k)) m.set(k,[]); m.get(k)!.push(e); }
    return m;
  },[inWeek,days]);
  const sumPointsByDay = (d: Date)=> (groupByDay.get(d.toDateString())||[]).reduce((a,b)=>a+(b.points||0),0);
  const isToday = (d:Date)=> d.toDateString()=== new Date().toDateString();

  return (
    <div className={variant==='child' ? 'rounded-2xl border border-amber-200 bg-white shadow-sm p-3 md:p-4' : 'rounded-xl border bg-white shadow-sm p-3'}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <button onClick={()=>{ setStart(addDays(start,-7)); setActive(addDays(active,-7)); }} className="w-8 h-8 grid place-items-center rounded-md hover:bg-amber-50">‹</button>
        <div className="text-sm font-semibold text-gray-700">{start.getFullYear()} 年 第 {weekIndex(start)} 周</div>
        <div className="flex items-center gap-1">
          <button onClick={()=>{ const m = toMonday(new Date()); setStart(m); setActive(m); }} className="text-xs px-2 h-8 rounded-full border border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100">今天</button>
          <button onClick={()=>{ setStart(addDays(start,7)); setActive(addDays(active,7)); }} className="w-8 h-8 grid place-items-center rounded-md hover:bg-amber-50">›</button>
        </div>
      </div>

      {/* Week strip */}
      <div className={variant==='child' ? 'grid grid-cols-7 gap-2 mb-3' : 'grid grid-cols-7 gap-1 mb-3'}>
        {days.map((d,i)=>{
          const dayKey = d.toDateString();
          const pts = sumPointsByDay(d);
          const isAct = active.toDateString()===dayKey;
          return (
            <div key={i} className={variant==='child' ? 'flex flex-col items-center' : 'flex flex-col items-center'}>
              <div className="text-xs text-gray-500">{'一二三四五六日'[i] ? '周'+ '一二三四五六日'[i] : '周'}</div>
              <button
                onClick={()=>{ setActive(d); onDayClick?.(d, groupByDay.get(dayKey)||[]); }}
                className={[
                  'mt-1 w-9 h-9 rounded-full grid place-items-center text-sm',
                  isAct? 'bg-amber-600 text-white' : (isToday(d)? 'ring-1 ring-amber-400' : 'hover:bg-gray-100')
                ].join(' ')}
              >{fmtDay(d)}</button>
              <div className="h-4 mt-1 text-[11px] text-amber-600">{pts>0? `+${pts}`: ''}</div>
            </div>
          );
        })}
      </div>

      {/* Body by variant */}
      {variant==='child' ? (
        <ChildBody dayEvents={groupByDay.get(active.toDateString())||[]} onEventClick={onEventClick} />
      ) : (
        <ParentBody days={days} groupByDay={groupByDay} onEventClick={onEventClick} />
      )}

      {/* Footer (child) */}
      {variant==='child' && (
        <div className="mt-3 text-xs text-gray-500 flex items-center justify-between">
          <span>本周完成 {inWeek.length} 任务</span>
          <span className="text-amber-700 font-medium">+ {inWeek.reduce((a,b)=>a+(b.points||0),0)} 积分</span>
        </div>
      )}
    </div>
  );
}

function badgeColor(cat?: string | null){
  switch(cat){
    case 'study': return 'bg-sky-50 text-sky-700 ring-sky-200';
    case 'exercise': return 'bg-emerald-50 text-emerald-700 ring-emerald-200';
    case 'chore': return 'bg-amber-50 text-amber-700 ring-amber-200';
    default: return 'bg-gray-50 text-gray-700 ring-gray-200';
  }
}

function ChildBody({ dayEvents, onEventClick }:{ dayEvents: CalendarEvent[]; onEventClick?: (e:CalendarEvent)=>void }){
  if(!dayEvents.length){
    return <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-4 text-sm text-amber-700">今天还没有任务，去添加一个吧～</div>;
  }
  return (
    <div className="space-y-2">
      {dayEvents.map(e=> (
        <button key={e.id} onClick={()=>onEventClick?.(e)} className={`w-full text-left rounded-xl border p-3 ring-1 ${badgeColor(e.category)} flex items-center justify-between hover:shadow-sm`}>
          <div>
            <div className="text-sm font-medium">{e.title}</div>
            <div className="text-[11px] opacity-70">{e.isPending? '待审核' : '每日'}</div>
          </div>
          <div className="text-amber-700 text-sm font-semibold">+{e.points}</div>
        </button>
      ))}
    </div>
  );
}

function ParentBody({ days, groupByDay, onEventClick }:{ days: Date[]; groupByDay: Map<string, CalendarEvent[]>; onEventClick?: (e:CalendarEvent)=>void }){
  return (
    <div className="grid grid-cols-7 gap-1">
      {days.map((d,idx)=>{
        const list = groupByDay.get(d.toDateString())||[];
        return (
          <div key={idx} className="min-h-28 rounded-lg border bg-gray-50 p-2 space-y-1">
            {list.length===0 && <div className="h-16 grid place-items-center text-[11px] text-gray-400">无</div>}
            {list.map(ev=> (
              <button key={ev.id} onClick={()=>onEventClick?.(ev)} className={`w-full truncate text-left px-2 py-1 rounded-md ring-1 ${badgeColor(ev.category)} text-[11px] hover:shadow-sm`}> 
                <span className="opacity-70 mr-1">{ev.childName || ''}</span>
                {ev.title}
                {ev.isPending && <span className="ml-1 text-amber-600">(待审)</span>}
              </button>
            ))}
          </div>
        );
      })}
    </div>
  );
}

// codex-ok: 2026-04-09T16:53:27
