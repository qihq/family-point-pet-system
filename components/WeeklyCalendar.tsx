"use client";
import React from 'react';

interface WeeklyCalendarProps{
  weekStart?: Date; // 周一
  onChange?: (start: Date)=>void;
  dayBadge?: (d: Date)=>React.ReactNode;
}

function toMonday(d: Date){ const x = new Date(d); const w = (x.getDay()+6)%7; x.setHours(0,0,0,0); x.setDate(x.getDate()-w); return x; }
function addDays(d:Date,n:number){ const x=new Date(d); x.setDate(x.getDate()+n); return x; }
function fmt(d:Date){ return `${d.getMonth()+1}/${d.getDate()}`; }

export default function WeeklyCalendar({ weekStart, onChange, dayBadge }:WeeklyCalendarProps){
  const [start,setStart] = React.useState<Date>(weekStart? toMonday(weekStart): toMonday(new Date()));
  React.useEffect(()=>{ onChange && onChange(start); },[start]);
  const days = Array.from({length:7},(_,i)=> addDays(start,i));
  const todayStr = new Date().toDateString();
  return (
    <div className="w-full bg-white rounded-lg border border-amber-100 shadow-sm">
      <div className="flex items-center justify-between px-3 py-2 border-b">
        <button onClick={()=>setStart(addDays(start,-7))} className="px-2 py-1 rounded hover:bg-amber-50">‹ 上一周</button>
        <div className="text-sm text-[var(--muted)]">{start.getFullYear()} 年 第 {Math.ceil(((+start - +new Date(start.getFullYear(),0,1))/(86400000)+1)/7)} 周</div>
        <button onClick={()=>setStart(addDays(start,7))} className="px-2 py-1 rounded hover:bg-amber-50">下一周 ›</button>
      </div>
      <div className="grid grid-cols-7">
        {days.map((d,i)=>{
          const isToday = d.toDateString()===todayStr; const lab = ['一','二','三','四','五','六','日'][i];
          return (
            <div key={i} className={`p-2 text-center ${isToday? 'bg-amber-50':''}`}>
              <div className="text-xs text-gray-500">周{lab}</div>
              <div className={`inline-flex items-center justify-center w-9 h-9 rounded-full ${isToday? 'bg-amber-600 text-white':'hover:bg-gray-100'}`}>{d.getDate()}</div>
              <div className="mt-1 min-h-[14px] text-[11px] text-gray-500">{dayBadge? dayBadge(d): null}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
