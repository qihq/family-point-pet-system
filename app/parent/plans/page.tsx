"use client";
import React, { useEffect, useState } from "react";
import WeeklyCalendar, { CalendarEvent } from "@/components/WeeklyCalendar";

interface Child { id:string; name:string; avatarUrl?:string|null }
interface Task { id:string; childId:string; title:string; description?:string|null; points:number; scheduledAt?:string|null; dueAt?:string|null; frequency?:string|null; enabled?:boolean|null; createdAt?:string }

type FormState = Partial<Omit<Task,'id'>> & { id?:string; needApproval?: boolean };

function toLocalInput(iso?: string | null){ if(!iso) return ""; const d=new Date(iso); const p=(n:number)=>String(n).padStart(2,'0'); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`; }
function toISO(val: string){ if(!val) return null; const d=new Date(val); if(isNaN(d.getTime())) return null; return d.toISOString(); }

export default function ParentPlansPage(){
  const [rows,setRows] = useState<Task[]>([]);
  const [children,setChildren] = useState<Child[]>([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const [showForm,setShowForm] = useState(false);
  const [form,setForm] = useState<FormState>({});

  async function load(){
    setLoading(true); setError("");
    try{
      const [rt, rc] = await Promise.all([
        fetch("/api/tasks?deleted=all", { cache:"no-store", credentials:"include" }),
        fetch("/api/family/children", { cache:"no-store", credentials:"include" })
      ]);
      const dt = await rt.json();
      const dc = await rc.json();
      if(!rt.ok || !dt?.success) throw new Error(dt?.error||"加载任务失败");
      if(!rc.ok || !dc?.success) throw new Error(dc?.error||"加载孩子失败");
      setRows(dt.data as Task[]);
      setChildren(dc.data as Child[]);
    }catch(e:any){ setError(e.message||"网络错误"); }
    finally{ setLoading(false); }
  }
  useEffect(()=>{ load(); },[]);

  function openCreate(){ setForm({ id:undefined, title:"", childId: children[0]?.id, points: 10, frequency: "once", enabled: true, needApproval: true, scheduledAt: null, dueAt: null }); setShowForm(true); }
  function openEdit(t:Task){ setForm({ ...t }); setShowForm(true); }
  function openEditFromCalendar(event: CalendarEvent){
    const taskId = event.taskPlanId || event.id;
    const target = rows.find((row) => row.id === taskId);
    if (!target) {
      alert("未找到对应计划");
      return;
    }
    openEdit(target);
  }

  async function save(){
    try{
      const isEdit = !!form.id;
      const url = isEdit? `/api/tasks/${form.id}` : "/api/tasks";
      const method = isEdit? "PATCH":"POST";
      const payload:any = { childId: form.childId, title: (form.title||"").trim(), description: form.description||null, points: Number(form.points||0), scheduledAt: form.scheduledAt||null, dueAt: form.dueAt||null, frequency: form.frequency||null, enabled: form.enabled!==false, needApproval: !!form.needApproval };
      const r = await fetch(url, { method, headers:{"Content-Type":"application/json"}, credentials:"include", body: JSON.stringify(payload) });
      const d = await r.json().catch(()=>null);
      if(!r.ok || !d?.success){ alert(d?.error||"保存失败"); return; }
      setShowForm(false); setForm({}); await load();
    }catch(e:any){ alert(e.message||"保存失败"); }
  }

  async function toggle(t:Task){
    try{
      const r = await fetch(`/api/tasks/${t.id}`, { method:"PATCH", headers:{"Content-Type":"application/json"}, credentials:"include", body: JSON.stringify({ enabled: !(t.enabled!==false) }) });
      const d = await r.json().catch(()=>null);
      if(!r.ok || !d?.success){ alert(d?.error||"操作失败"); return; }
      await load();
    }catch(e:any){ alert(e.message||"操作失败"); }
  }

  async function remove(t:Task){
    if(!confirm(`${"确认删除计划「"}${t.title}${"」？"}`)) return;
    try{
      const r = await fetch(`/api/tasks/${t.id}`, { method:"DELETE", credentials:"include" });
      const d = await r.json().catch(()=>null);
      if(!r.ok || !d?.success){ alert(d?.error||"删除失败"); return; }
      await load();
    }catch(e:any){ alert(e.message||"删除失败"); }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--text)]">{`学习计划管理`}</h1>
          <button onClick={openCreate} className="px-3 py-2 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-600)]">{`新建计划`}</button>
        </div>

        <ParentCalendarBlock onEventEdit={openEditFromCalendar} />

        {loading? <div>{`加载中…`}</div> : error? <div className="text-red-600">{error}</div> : (
          <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-3 py-2 text-left">{`任务`}</th>
                  <th className="px-3 py-2 text-left">{`孩子`}</th>
                  <th className="px-3 py-2 text-left">{`积分`}</th>
                  <th className="px-3 py-2 text-left">{`频率`}</th>
                  <th className="px-3 py-2 text-left">{`时间`}</th>
                  <th className="px-3 py-2 text-left">{`启用`}</th>
                  <th className="px-3 py-2 text-left">{`操作`}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r)=>{
                  const ch = children.find(c=>c.id===r.childId);
                  const tstr = r.scheduledAt? new Date(r.scheduledAt).toLocaleString(): '-';
                  return (
                    <tr key={r.id} className="border-t">
                      <td className="px-3 py-2">{r.title}</td>
                      <td className="px-3 py-2">{ch?.name||r.childId}</td>
                      <td className="px-3 py-2">{r.points}</td>
                      <td className="px-3 py-2">{r.frequency||'-'}</td>
                      <td className="px-3 py-2">{tstr}</td>
                      <td className="px-3 py-2"><input type="checkbox" checked={r.enabled!==false} onChange={()=>toggle(r)} /></td>
                      <td className="px-3 py-2 space-x-2">
                        <button onClick={()=>openEdit(r)} className="text-blue-600 hover:text-blue-800">{`编辑`}</button>
                        <button onClick={()=>remove(r)} className="text-rose-600 hover:text-rose-800">{`删除`}</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {showForm && (
          <PlanModal
            childrenList={children}
            value={form}
            onChange={setForm}
            onClose={()=>{ setShowForm(false); setForm({}); }}
            onSubmit={save}
          />
        )}
      </div>
    </div>
  );
}

function PlanModal({ childrenList, value, onChange, onClose, onSubmit }:{ childrenList: Child[]; value: FormState; onChange:(v:FormState)=>void; onClose:()=>void; onSubmit:()=>void }){
  const f = value;
  const onSave = (v:FormState)=> onChange(v);
  return (
    <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b">
          <div className="text-lg font-semibold">{f.id? `编辑计划`:`新建计划`}</div>
        </div>
        <div className="p-6 space-y-3">
          <label className="block text-sm text-gray-700">{`任务名称`}
            <input value={f.title||""} onChange={e=>onSave({ ...f, title:e.target.value })} className="mt-1 w-full border rounded px-3 py-1.5" />
          </label>
          <label className="block text-sm text-gray-700">{`目标孩子`}
            <select value={f.childId||childrenList[0]?.id||""} onChange={e=>onSave({ ...f, childId:e.target.value })} className="mt-1 w-full border rounded px-3 py-1.5">
              {childrenList.map(c=> (<option key={c.id} value={c.id}>{c.name}</option>))}
            </select>
          </label>
          <label className="block text-sm text-gray-700">{`积分`}
            <input type="number" min={0} value={Number(f.points||0)} onChange={e=>onSave({ ...f, points: Number(e.target.value||0) })} className="mt-1 w-full border rounded px-3 py-1.5" />
          </label>
          <label className="block text-sm text-gray-700">{`频率`}
            <select value={(f.frequency||"once") as any} onChange={e=>onSave({ ...f, frequency: (e.target as HTMLSelectElement).value })} className="mt-1 w-full border rounded px-3 py-1.5">
              <option value="once">{`一次`}</option>
              <option value="daily">{`每天`}</option>
              <option value="weekly">{`每周`}</option>
              <option value="monthly">{`每月`}</option>
              <option value="unlimited">{`不限制`}</option>
            </select>
          </label>

          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-sm text-gray-700">{`计划时间（一次性可选）`}
                <input type="datetime-local" value={toLocalInput(f.scheduledAt as any)} onChange={e=>onSave({ ...f, scheduledAt: toISO((e.target as HTMLInputElement).value) })} className="mt-1 w-full border rounded px-3 py-1.5" />
              </label>
            </div>
            <div>
              <label className="block text-sm text-gray-700">{`截止时间（可选）`}
                <input type="datetime-local" value={toLocalInput(f.dueAt as any)} onChange={e=>onSave({ ...f, dueAt: toISO((e.target as HTMLInputElement).value) })} className="mt-1 w-full border rounded px-3 py-1.5" />
              </label>
            </div>
            <p className="text-xs text-gray-500">{`提示：当频率选择『一次』时，请设置计划时间；不填则默认立即生效。`}</p>
          </div>

          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={f.enabled!==false} onChange={e=>onSave({ ...f, enabled: (e.target as HTMLInputElement).checked })} /> {`启用`}
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={!!f.needApproval} onChange={e=>onSave({ ...f, needApproval: (e.target as HTMLInputElement).checked })} /> {`需要家长审核`}
          </label>
          <label className="block text-sm text-gray-700">{`说明（可选）`}
            <textarea value={f.description||""} onChange={e=>onSave({ ...f, description:e.target.value })} className="mt-1 w-full border rounded px-3 py-1.5 min-h-[60px]" />
          </label>
        </div>
        <div className="px-6 py-4 border-t flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200">{`取消`}</button>
          <button onClick={onSubmit} className="px-3 py-2 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-600)]">{`保存`}</button>
        </div>
      </div>
    </div>
  );
}

function ParentCalendarBlock({ onEventEdit }:{ onEventEdit?: (event: CalendarEvent) => void }){
  const [events,setEvents] = React.useState<CalendarEvent[]>([]);
  const [children,setChildren] = React.useState<Array<{id:string,name:string}>>([]);
  const [childId,setChildId] = React.useState<string>("all");
  React.useEffect(()=>{ (async()=>{ try{ const r=await fetch('/api/family/children',{cache:'no-store',credentials:'include'}); const d=await r.json(); if(r.ok&&d.success) setChildren(d.data||[]);}catch{} })(); },[]);
  const onWeekChange = (from:Date,to:Date)=>{ (async()=>{ try{ const url=`/api/calendar?from=${from.toISOString().slice(0,10)}&to=${to.toISOString().slice(0,10)}`; const r=await fetch(url,{cache:'no-store',credentials:'include'}); const d=await r.json(); if(r.ok&&d.success){ const all = d.data as CalendarEvent[]; setEvents(childId==='all'? all : all.filter(e=> e.childId===childId)); } }catch{} })(); };
  React.useEffect(()=>{ const now=new Date(); const w=((now.getDay()+6)%7); const from=new Date(now); from.setDate(now.getDate()-w); from.setHours(0,0,0,0); const to=new Date(from); to.setDate(from.getDate()+6); to.setHours(23,59,59,999); onWeekChange(from,to); },[childId]);
  return (
    <div className="bg-white rounded-xl shadow-sm p-3 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-600">{`家长视图 · 日程条目`}</div>
        <div className="text-sm">
          <label className="mr-2 text-gray-600">{`孩子：`}</label>
          <select value={childId} onChange={e=>setChildId((e.target as HTMLSelectElement).value)} className="border rounded px-2 py-1 text-sm">
            <option value="all">{`全部孩子`}</option>
            {children.map(c=>(<option key={c.id} value={c.id}>{c.name}</option>))}
          </select>
        </div>
      </div>
      <WeeklyCalendar variant="parent" events={events} onWeekChange={onWeekChange} onEventClick={onEventEdit} />
    </div>
  );
}
// codex-ok: 2026-04-15T12:12:00+08:00
