"use client";
import { useState, useEffect } from 'react';
import PointRuleForm from '@/components/parent/point-rule-form';
import { Frequency, PointsType } from '@prisma/client';

interface PointRule {
  id: string;
  name: string;
  description?: string | null;
  category: string;
  pointsType: PointsType;
  points: number;
  pointsMin?: number | null;
  pointsMax?: number | null;
  needApproval: boolean;
  frequency: Frequency;
  maxTimes?: number | null;
  enabled: boolean;
}

export default function ParentPointRulesPage(){
  const [list,setList] = useState<PointRule[]>([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState('');
  const [showForm,setShowForm] = useState(false);
  const [editing,setEditing] = useState<PointRule|null>(null);

  async function load(){
    setLoading(true); setError('');
    try{
      const r = await fetch('/api/point-rules', { cache:'no-store', credentials:'include' });
      const d = await r.json();
      if(!r.ok || !d.success) throw new Error(d.error||'获取规则失败');
      setList(d.data.rules || []);
    }catch(e:any){ setError(e.message||'网络错误'); }
    finally{ setLoading(false); }
  }
  useEffect(()=>{ load(); },[]);

  function openCreate(){ setEditing(null); setShowForm(true); }
  async function openEdit(row:PointRule){
    try{
      const r = await fetch(`/api/point-rules/${row.id}`, { cache:'no-store', credentials:'include' });
      const d = await r.json();
      if(r.ok && d.success){ setEditing(d.data as PointRule); setShowForm(true); }
    }catch{}
  }

  async function submit(form:any){
    try{
      const url = editing? `/api/point-rules/${editing.id}`: '/api/point-rules';
      const method = editing? 'PUT':'POST';
      const r = await fetch(url, { method, headers:{'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify(form) });
      const d = await r.json();
      if(!r.ok || !d.success) throw new Error(d.error||'保存失败');
      setShowForm(false); setEditing(null); await load();
    }catch(e:any){ alert(e.message||'保存失败'); }
  }

  async function toggle(row:PointRule){
    try{
      const r = await fetch(`/api/point-rules/${row.id}/toggle`, { method:'PATCH', credentials:'include' });
      const d = await r.json();
      if(!r.ok || !d.success) throw new Error(d.error||'操作失败');
      await load();
    }catch(e:any){ alert(e.message||'操作失败'); }
  }

  async function remove(row:PointRule){
    if(!confirm(`确定要删除规则 "${row.name}" 吗？`)) return;
    try{
      const r = await fetch(`/api/point-rules/${row.id}`, { method:'DELETE', credentials:'include' });
      const d = await r.json();
      if(!r.ok || !d.success) throw new Error(d.error||'删除失败');
      await load();
    }catch(e:any){ alert(e.message||'删除失败'); }
  }

  const categoryText: Record<string,string> = { self_care:'自理', chores:'家务', study:'学习', test:'测试', other:'其他' };
  const freqText: Record<string,string> = { daily:'每天', weekly:'每周', monthly:'每月', once:'一次', unlimited:'不限次数' };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--text)]">规则管理</h1>
          <button onClick={openCreate} className="px-3 py-2 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-600)]">新建规则</button>
        </div>

        {loading? <div className="mt-4">加载中...</div> : error? <div className="mt-4 text-red-600">{error}</div> : (
          <div className="mt-4 overflow-x-auto bg-white rounded-xl shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left px-4 py-2">名称</th>
                  <th className="text-left px-4 py-2">分类</th>
                  <th className="text-left px-4 py-2">频率</th>
                  <th className="text-left px-4 py-2">积分</th>
                  <th className="text-left px-4 py-2">状态</th>
                  <th className="text-left px-4 py-2">操作</th>
                </tr>
              </thead>
              <tbody>
                {list.map(r=> (
                  <tr key={r.id} className="border-t">
                    <td className="px-4 py-2">{r.name}</td>
                    <td className="px-4 py-2">{categoryText[r.category] || r.category}</td>
                    <td className="px-4 py-2">{freqText[String(r.frequency)] || r.frequency}</td>
                    <td className="px-4 py-2">{r.pointsType==='fixed'? r.points : `${r.pointsMin??0}~${r.pointsMax??0}`}</td>
                    <td className="px-4 py-2"><span className={`px-2 py-0.5 rounded-full text-xs ${r.enabled? 'bg-green-100 text-green-700':'bg-gray-100 text-gray-700'}`}>{r.enabled? '启用':'禁用'}</span></td>
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
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-5 max-h-[80vh] overflow-y-auto">
              <PointRuleForm initialData={editing||undefined} onSubmit={submit} onCancel={()=>{ setShowForm(false); setEditing(null); }} isEdit={!!editing} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// codex-ok: 2026-04-13T10:37:11+08:00