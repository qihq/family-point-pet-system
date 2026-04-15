"use client";
import React from 'react';
import WeeklyCalendar, { CalendarEvent } from '@/components/WeeklyCalendar';

function genMock(now=new Date()){
  const base = new Date(now); const w=((base.getDay()+6)%7); const mon=new Date(base); mon.setDate(base.getDate()-w); mon.setHours(9,0,0,0);
  const ev = (d:number, title:string, points:number, cat:any, child?:string, id?:string, pending?:boolean):CalendarEvent=>({ id: id || Math.random().toString(36).slice(2), date: new Date(mon.getFullYear(), mon.getMonth(), mon.getDate()+d, 18).toISOString(), title, points, category: cat, childName: child, childId: child? child.toLowerCase(): undefined, isPending: pending });
  const events: CalendarEvent[] = [
    ev(0,'阅读30分钟',20,'study','小明'),
    ev(1,'数学练习',15,'study','小明'),
    ev(2,'跑步',10,'exercise','小明'),
    ev(2,'整理房间',5,'chore','小明',undefined,true),
    ev(3,'英语听力',10,'study','小明'),
    ev(5,'足球训练',15,'exercise','小明'),
  ];
  return events;
}

export default function Page(){
  const events = React.useMemo(()=>genMock(),[]);
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        <div>
          <div className="mb-2 text-sm text-gray-600">孩子端 · 热力打卡模式</div>
          <WeeklyCalendar variant="child" events={events} />
        </div>
        <div>
          <div className="mb-2 text-sm text-gray-600">家长端 · 事件条模式</div>
          <WeeklyCalendar variant="parent" events={events} />
        </div>
      </div>
    </div>
  );
}
