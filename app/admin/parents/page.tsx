"use client";
import React, { useEffect, useState } from 'react';

interface ParentRow { id:string; name:string; createdAt?:string }

type FormState = { id?:string; name:string; password?:string };

export default function AdminParentsPage(){
  const [rows,setRows] = useState<ParentRow[]>([]);
  const [q,setQ] = useState('');
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState('');
  const [form,setForm] = useState<FormState>({ name:'', password:'' });
  const [saving,setSaving] = useState(false);
  const [selected,setSelected] = useState<string>('');

  function authHeaders(){ const t = typeof window!=='undefined'? localStorage.getItem('token'): null; const h:any={}; if(t) h.Authorization = `Bearer ${t}`; return h; }

  async function load(){
    setLoading(true); setError('');
    try{
      const r = await fetch('/api/admin/parents?q='+encodeURIComponent(q), { cache:'no-store', credentials:'include', headers: authHeaders() });
      const d:any = await r.json();
      if(!r.ok || !d.success) throw new Error(d.error||'加载家长失败');
      setRows(d.data||[]);
      if(d.data && d.data.length>0){
        const first = d.data[0];
        setSelected(first.id);
        setForm({ id:first.id, name:first.name, password:'' });
      } else { setSelected(''); setForm({ name:'', password:'' }); }
    }catch(e:any){ setError(e.message||'网络错误'); }
    finally{ setLoading(false); }
  }

  useEffect(()=>{ load(); },[]);

  function isEdit(){ return !!form.id; }

  async function submit(){
    setSaving(true);
    try{
      const headers:any = { 'Content-Type':'application/json', ...authHeaders() };
      if(isEdit()){
        const r = await fetch('/api/admin/parents/'+form.id, { method:'PATCH', headers, credentials:'include', body: JSON.stringify({ name: form.name.trim(), password: (form.password||'').trim()||undefined }) });
        const d:any = await r.json();
        if(!r.ok || !d.success) throw new Error(d.error||'保存失败');
      }else{
        if(!form.password) throw new Error('请填写初始密码');
        const r = await fetch('/api/admin/parents', { method:'POST', headers, credentials:'include', body: JSON.stringify({ name: form.name.trim(), password: (form.password||'').trim() }) });
        const d:any = await r.json();
        if(!r.ok || !d.success) throw new Error(d.error||'创建失败');
      }
      await load();
    }catch(e:any){ alert(e.message||'操作失败'); }
    finally{ setSaving(false); }
  }

  async function remove(row: ParentRow){
    if(!confirm(`确定删除家长「${row.name}」？此操作不可恢复`)) return;
    try{
      const r = await fetch('/api/admin/parents/'+row.id, { method:'DELETE', credentials:'include', headers: authHeaders() });
      const d:any = await r.json();
      if(!r.ok || !d.success) throw new Error(d.error||'删除失败');
      await load();
    }catch(e:any){ alert(e.message||'删除失败'); }
  }

  function startCreate(){ setSelected(''); setForm({ name:'', password:'' }); }
  function startEdit(row: ParentRow){ setSelected(row.id); setForm({ id:row.id, name:row.name, password:'' }); }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：列表 */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b flex items-center gap-2">
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="搜索用户名" className="px-2 py-1 border rounded w-48" />
            <button onClick={load} className="px-3 py-1.5 rounded bg-[var(--primary)] text-white">搜索</button>
            <div className="flex-1"/>
            <button onClick={startCreate} className="px-3 py-1.5 rounded bg-blue-600 text-white">新增家长</button>
          </div>
          {loading? <div className="p-6">加载中…</div> : error? <div className="p-6 text-red-600">{error}</div> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600"><tr><th className="text-left px-3 py-2">用户名</th><th className="text-left px-3 py-2">创建时间</th><th className="text-left px-3 py-2">操作</th></tr></thead>
                <tbody>
                  {rows.length===0? (
                    <tr><td className="px-3 py-8 text-gray-600" colSpan={3}>暂无家长账户</td></tr>
                  ) : rows.map(r=> (
                    <tr key={r.id} className={"border-t "+(selected===r.id? 'bg-amber-50':'')}>
                      <td className="px-3 py-2">{r.name}</td>
                      <td className="px-3 py-2 text-gray-500">{r.createdAt? new Date(r.createdAt).toLocaleString() : '-'}</td>
                      <td className="px-3 py-2 flex gap-2">
                        <button onClick={()=>startEdit(r)} className="px-2 py-1 rounded bg-blue-600 text-white">编辑</button>
                        <button onClick={()=>remove(r)} className="px-2 py-1 rounded bg-red-600 text-white">删除</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 右侧：表单（无“所属家庭”字段） */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="text-lg font-semibold mb-3">{isEdit()? '编辑家长':'新增家长'}</div>
          <div className="space-y-3">
            <label className="block text-sm">用户名
              <input value={form.name} onChange={e=>setForm(f=>({ ...f, name:e.target.value }))} className="mt-1 w-full border rounded px-2 py-1" />
            </label>
            <label className="block text-sm">{isEdit()? '重置密码（可选）':'初始密码'}
              <input type="password" value={form.password||''} onChange={e=>setForm(f=>({ ...f, password:e.target.value }))} className="mt-1 w-full border rounded px-2 py-1" placeholder={isEdit()? '留空表示不修改':''} />
            </label>
            <div className="pt-2 flex justify-end gap-2">
              <button onClick={()=>{ if(isEdit()) startCreate(); else setForm({ name:'', password:'' }); }} className="px-3 py-1.5 rounded bg-gray-100">清空</button>
              <button onClick={submit} disabled={saving||!form.name || (!isEdit() && !form.password)} className="px-3 py-1.5 rounded bg-[var(--primary)] text-white disabled:opacity-50">{saving? '保存中…':'保存'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
