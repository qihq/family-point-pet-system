"use client";
import React, { useEffect, useMemo, useState } from 'react';

interface Child { id:string; name:string; avatarUrl?:string|null }
interface Task { id:string; childId:string; title:string; description?:string|null; points:number; scheduledAt?:string|null; dueAt?:string|null; frequency?:string|null; enabled?:boolean|null; createdAt?:string }

type FormState = Partial<Omit<Task,'id'>> & { id?:string };

export default function ParentPlansPage(){
  const [rows,setRows] = useState<Task[]>([]);
  const [children,setChildren] = useState<Child[]>([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState('');
  const [showForm,setShowForm] = useState(false);
  const [form,setForm] = useState<FormState>({});

  async function load(){
    setLoading(true); setError('');
    try{
      const [rt, rc] = await Promise.all([
        fetch('/api/tasks?deleted=false', { cache:'no-store', credentials:'include' }),
        fetch('/api/family/children', { cache:'no-store', credentials:'include' })
      ]);
      const tt = await rt.text(); const dt = tt? JSON.parse(tt): null;
      const tc = await rc.text(); const dc = tc? JSON.parse(tc): null;
      if(!rt.ok || !dt?.success) throw new Error(dt?.error||'加载任务失败');
      if(!rc.ok || !dc?.success) throw new Error(dc?.error||'加载孩子失败');
      setRows(dt.data as Task[]);
      setChildren(dc.data as Child[]);
    }catch(e:any){ setError(e.message||'网络错误'); }
    finally{ setLoading(false); }
  }
  useEffect(()=>{ load(); },[]);

  function openCreate(){ setForm({ id:undefined, title:'', childId: children[0]?.id, points: 10, frequency: 'once', enabled: true }); setShowForm(true); }
  function openEdit(t:Task){ setForm({ ...t }); setShowForm(true); }

  async function save(){
    try{
      const isEdit = !!form.id;
      const url = isEdit? `/api/tasks/${form.id}` : '/api/tasks';
      const method = isEdit? 'PATCH':'POST';
      const payload:any = { childId: form.childId, title: form.title, description: form.description, points: Number(form.points||0), scheduledAt: form.scheduledAt||null, dueAt: form.dueAt||null, frequency: form.frequency||null, enabled: form.enabled!==false };
      const r = await fetch(url, { method, headers:{'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify(payload) });
      const t = await r.text(); const d = t? JSON.parse(t): null;
      if(!r.ok || !d?.success){ alert(d?.error||'保存失败'); return; }
      setShowForm(false); setForm({}); await load();
    }catch(e:any){ alert(e.message||'保存失败'); }
  }

  async function toggle(t:Task){
    try{
      const r = await fetch(`/api/tasks/${t.id}`, { method:'PATCH', headers:{'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify({ enabled: !(t.enabled!==false) }) });
      const tt = await r.text(); const d = tt? JSON.parse(tt): null;
      if(!r.ok || !d?.success){ alert(d?.error||'操作失败'); return; }
      await load();
    }catch(e:any){ alert(e.message||'操作失败'); }
  }

  async function remove(t:Task){
    if(!confirm(`确定删除「${t.title}」吗？`)) return;
    try{
      const r = await fetch(`/api/tasks/${t.id}`, { method:'DELETE', credentials:'include' });
      const tt = await r.text(); const d = tt? JSON.parse(tt): null;
      if(!r.ok || !d?.success){ alert(d?.error||'删除失败'); return; }
      await load();
    }catch(e:any){ alert(e.message||'删除失败'); }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--text)]">学习计划管理</h1>
          <button onClick={openCreate} className="px-3 py-2 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-600)]">新建计划</button>
        </div>

        {loading? <div>加载中…</div> : error? <div className="text-red-600">{error}</div> : (
          <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left px-4 py-2">孩子</th>
                  <th className="text-left px-4 py-2">名称</th>
                  <th className="text-left px-4 py-2">积分</th>
                  <th className="text-left px-4 py-2">频率</th>
                  <th className="text-left px-4 py-2">状态</th>
                  <th className="text-left px-4 py-2">操作</th>
                </tr>
              </thead>
              <tbody>
                {rows.length===0? (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-600">暂无计划</td></tr>
                ) : rows.map(r=> (
                  <tr key={r.id} className="border-t">
                    <td className="px-4 py-2">{children.find(c=>c.id===r.childId)?.name||r.childId}</td>
                    <td className="px-4 py-2">{r.title}</td>
                    <td className="px-4 py-2">+{r.points||0}</td>
                    <td className="px-4 py-2">{r.frequency||'once'}</td>
                    <td className="px-4 py-2">{(r.enabled!==false)? '启用':'禁用'}</td>
                    <td className="px-4 py-2">
                      <button onClick={()=>openEdit(r)} className="px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">编辑</button>
                      <button onClick={()=>toggle(r)} className="ml-2 px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">{(r.enabled!==false)? '禁用':'启用'}</button>
                      <button onClick={()=>remove(r)} className="ml-2 px-2 py-1 rounded bg-rose-100 text-rose-700 hover:bg-rose-200">删除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-lg rounded-lg shadow-xl">
              <div className="px-6 py-4 border-b">
                <div className="text-lg font-semibold">{form.id? '编辑计划':'新建计划'}</div>
              </div>
              <div className="p-6 space-y-3">
                <label className="block text-sm">孩子
                  <select value={form.childId||''} onChange={e=>setForm(f=>({...f, childId:e.target.value}))} className="mt-1 w-full border rounded px-2 py-1">
                    {children.map(c=>(<option key={c.id} value={c.id}>{c.name}</option>))}
                  </select>
                </label>
                <label className="block text-sm">名称
                  <input value={form.title||''} onChange={e=>setForm(f=>({...f, title:e.target.value}))} className="mt-1 w-full border rounded px-2 py-1"/>
                </label>
                <label className="block text-sm">积分
                  <input type="number" value={Number(form.points||0)} onChange={e=>setForm(f=>({...f, points:Number(e.target.value||0)}))} className="mt-1 w-full border rounded px-2 py-1"/>
                </label>
                <label className="block text-sm">频率
                  <select value={(form.frequency||'once') as any} onChange={e=>setForm(f=>({...f, frequency:e.target.value}))} className="mt-1 w-full border rounded px-2 py-1">
                    <option value="once">一次</option>
                    <option value="daily">每天</option>
                    <option value="weekly">每周</option>
                    <option value="monthly">每月</option>
                    <option value="unlimited">不限</option>
                  </select>
                </label>
                <label className="block text-sm">计划时间（可选）
                  <input type="datetime-local" value={form.scheduledAt? new Date(form.scheduledAt).toISOString().slice(0,16): ''} onChange={e=>setForm(f=>({...f, scheduledAt: e.target.value? new Date(e.target.value).toISOString() : null}))} className="mt-1 w-full border rounded px-2 py-1"/>
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.enabled!==false} onChange={e=>setForm(f=>({...f, enabled: e.target.checked}))}/>
                  启用
                </label>
                <label className="block text-sm">说明（可选）
                  <textarea value={form.description||''} onChange={e=>setForm(f=>({...f, description:e.target.value}))} className="mt-1 w-full border rounded px-2 py-1 min-h-[60px]"/>
                </label>
              </div>
              <div className="px-6 py-4 border-t flex justify-end gap-2">
                <button onClick={()=>{ setShowForm(false); setForm({}); }} className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200">取消</button>
                <button onClick={save} className="px-3 py-2 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-600)]">保存</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}