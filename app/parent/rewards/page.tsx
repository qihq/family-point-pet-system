"use client";
import { useEffect, useState } from 'react';

interface RewardItem { id:string; name:string; description?:string|null; cost:number; stock?:number|null; enabled:boolean; imageUrl?:string|null; createdAt:string }

async function parseJSON(res: Response){
  const text = await res.text();
  try { return text? JSON.parse(text) : null; } catch { return null; }
}

export default function ParentRewardsPage(){
  const [rows, setRows] = useState<RewardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<RewardItem|null>(null);
  // 仅家长可见，若为孩子登录则清 Cookie 并跳转登录
  useEffect(()=>{ (async()=>{ try{ const r = await fetch('/api/auth/me',{cache:'no-store',credentials:'include'}); if(!r.ok){ await fetch('/api/auth/logout',{method:'POST',credentials:'include'}); location.href='/login'; return; } const d = await r.json(); if(!d?.user || d.user.role!=='parent'){ await fetch('/api/auth/logout',{method:'POST',credentials:'include'}); location.href='/login'; return; } }catch{} })(); },[]);

  async function load(){
    setLoading(true); setError('');
    try{
      const r = await fetch('/api/rewards', { cache:'no-store', credentials:'include' });
      const d = await parseJSON(r);
      if(!r.ok || !d?.success) throw new Error(d?.error||'获取失败');
      setRows(d.data as RewardItem[]);
    }catch(e:any){ setError(e.message||'网络错误'); }
    finally{ setLoading(false); }
  }
  useEffect(()=>{ load(); },[]);

  function openCreate(){ setEditing(null); setShowForm(true); }
  function openEdit(row:RewardItem){ setEditing(row); setShowForm(true); }

  async function save(form:any){
    try{
      const { imageFile, ...payload } = form || {};
      const url = editing? `/api/rewards/${editing.id}`: '/api/rewards';
      const method = editing? 'PUT':'POST';
      const r = await fetch(url, { method, headers:{ 'Content-Type':'application/json' }, credentials:'include', body: JSON.stringify(payload) });
      const d = await parseJSON(r);
      if(!r.ok || !d?.success) throw new Error(d?.error||'保存失败');
      const id = editing? editing.id : d.data?.id;
      if(id && imageFile){
        const fd = new FormData(); fd.append('file', imageFile);
        const up = await fetch(`/api/rewards/${id}/image`, { method:'POST', body: fd, credentials:'include' });
        const ud = await parseJSON(up);
        if(!up.ok || !ud?.success){ console.warn('图片上传失败:', ud?.error); }
      }
      setShowForm(false); setEditing(null); await load();
    }catch(e:any){ alert(e.message||'保存失败'); }
  }

  async function toggle(row:RewardItem){
    try{
      const r = await fetch(`/api/rewards/${row.id}/toggle`, { method:'PATCH', credentials:'include' });
      const d = await parseJSON(r);
      if(!r.ok || !d?.success){ alert(d?.error||'操作失败'); return; }
      await load();
    }catch(e:any){ alert(e.message||'操作失败'); }
  }

  async function remove(row:RewardItem){
    if(!confirm(`确定要删除奖品“${row.name}”吗？`)) return;
    try{
      const r = await fetch(`/api/rewards/${row.id}`, { method:'DELETE', credentials:'include' });
      const d = await parseJSON(r);
      if(!r.ok || !d?.success){ alert(d?.error||'删除失败'); return; }
      await load();
    }catch(e:any){ alert(e.message||'删除失败'); }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--text)]">奖品管理</h1>
          <button onClick={openCreate} className="px-3 py-2 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-600)]">新建奖品</button>
        </div>
        {loading? <div className="mt-4">加载中…</div> : error? <div className="mt-4 text-red-600">{error}</div> : (
          rows.length===0? <div className="mt-6 text-gray-600">暂无奖品</div> : (
            <div className="mt-4 overflow-x-auto bg-white rounded-xl shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="text-left px-4 py-2">图片</th>
                    <th className="text-left px-4 py-2">名称</th>
                    <th className="text-left px-4 py-2">说明</th>
                    <th className="text-left px-4 py-2">所需积分</th>
                    <th className="text-left px-4 py-2">库存</th>
                    <th className="text-left px-4 py-2">状态</th>
                    <th className="text-left px-4 py-2">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(r=> (
                    <tr key={r.id} className="border-t">
                      <td className="px-4 py-2">
                        {r.imageUrl ? (<img src={r.imageUrl} alt={r.name} className="w-12 h-12 object-cover rounded" />) : '—'}
                      </td>
                      <td className="px-4 py-2">{r.name}</td>
                      <td className="px-4 py-2 text-gray-600">{r.description||'-'}</td>
                      <td className="px-4 py-2">{r.cost}</td>
                      <td className="px-4 py-2">{r.stock==null? '—': r.stock}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${r.enabled? 'bg-green-100 text-green-700':'bg-gray-100 text-gray-700'}`}>{r.enabled? '启用':'禁用'}</span>
                      </td>
                      <td className="px-4 py-2">
                        <button onClick={()=>openEdit(r)} className="text-blue-600 hover:text-blue-800">编辑</button>
                        <button onClick={()=>toggle(r)} className="ml-3 text-amber-600 hover:text-amber-800">启停</button>
                        <button onClick={()=>remove(r)} className="ml-3 text-rose-600 hover:text-rose-800">删除</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}

        {showForm && (
          <RewardFormModal initial={editing||undefined} onClose={()=>{ setShowForm(false); setEditing(null); }} onSave={save} />
        )}
      </div>
    </div>
  );
}

function RewardFormModal({ initial, onClose, onSave }:{ initial?: any; onClose: ()=>void; onSave:(form:any)=>void }){
  const [name,setName] = useState(initial?.name||'');
  const [description,setDescription] = useState(initial?.description||'');
  const [cost,setCost] = useState<number>(initial?.cost??100);
  const [stock,setStock] = useState<number|null>(initial?.stock??null);
  const [enabled,setEnabled] = useState<boolean>(initial?.enabled??true);
  const [submitting,setSubmitting] = useState(false);
  const [imageFile,setImageFile] = useState<File|null>(null);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-5">
        <div className="text-lg font-semibold">{initial? '编辑奖品':'新建奖品'}</div>
        <div className="mt-3 space-y-3">
          <label className="text-sm text-gray-700 block">名称
            <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full border rounded px-3 py-1.5" />
          </label>
          <label className="text-sm text-gray-700 block">说明
            <textarea value={description} onChange={e=>setDescription(e.target.value)} className="mt-1 w-full border rounded px-3 py-1.5" rows={3} />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm text-gray-700 block">所需积分
              <input type="number" min={1} value={cost} onChange={e=>setCost(parseInt(e.target.value||'0'))} className="mt-1 w-full border rounded px-3 py-1.5" />
            </label>
            <label className="text-sm text-gray-700 block">库存（空=不限）
              <input type="number" value={stock==null? '': stock} onChange={e=>{ const v=e.target.value; setStock(v===''? null: parseInt(v)); }} className="mt-1 w-full border rounded px-3 py-1.5" />
            </label>
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={enabled} onChange={e=>setEnabled(e.target.checked)} /> 启用
          </label>
          <label className="text-sm text-gray-700 block">图片（可选）
            <input type="file" accept="image/*" onChange={e=>setImageFile(e.target.files?.[0]||null)} className="mt-1 w-full text-sm" />
          </label>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-sm">取消</button>
          <button disabled={submitting} onClick={async()=>{ setSubmitting(true); await onSave({ name, description, cost, stock, enabled, imageFile }); setSubmitting(false); }} className="px-3 py-1.5 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-600)] text-sm disabled:opacity-60">保存</button>
        </div>
      </div>
    </div>
  );
}