"use client";
import { useState } from 'react';

export interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
  childId: string;
}

export default function CreateTaskModal({ open, onClose, onCreated, childId }: CreateTaskModalProps){
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('study');
  const [frequency, setFrequency] = useState('daily');
  const [durationMin, setDurationMin] = useState<number|''>('');
  const [points, setPoints] = useState<number|''>('');
  const [needApproval, setNeedApproval] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(){
    if(!title || !points){ alert('请填写名称与积分'); return; }
    setBusy(true);
    try{
      const body:any = { childId, title, points: Number(points), frequency };
      // 额外字段（后端暂未持久化，预留）
      body.category = category; body.durationMin = durationMin===''?null:Number(durationMin); body.needApproval = needApproval;
      const r = await fetch('/api/tasks', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
      const d = await r.json(); if(!r.ok || !d.success){ throw new Error(d.error||'创建失败'); }
      onCreated?.(); onClose();
      setTitle(''); setPoints(''); setDurationMin(''); setNeedApproval(false);
    }catch(e:any){ alert(e.message||'网络错误'); }
    finally{ setBusy(false); }
  }

  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-[92%] max-w-md bg-white rounded-xl shadow-lg p-4">
        <div className="text-lg font-semibold mb-2">创建/编辑学习计划</div>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">名称</label>
            <input value={title} onChange={e=>setTitle(e.target.value)} className="mt-1 w-full border rounded px-3 py-2 text-sm" placeholder="如：朗读英语 15 分钟" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600">分类</label>
              <select value={category} onChange={e=>setCategory(e.target.value)} className="mt-1 w-full border rounded px-3 py-2 text-sm">
                <option value="study">学习</option>
                <option value="exercise">运动</option>
                <option value="chore">家务</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">频率</label>
              <select value={frequency} onChange={e=>setFrequency(e.target.value)} className="mt-1 w-full border rounded px-3 py-2 text-sm">
                <option value="daily">每天</option>
                <option value="weekly">每周</option>
                <option value="monthly">每月</option>
                <option value="once">一次</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600">预计时长(分钟)</label>
              <input type="number" value={durationMin} onChange={e=>setDurationMin(e.target.value===''? '': Number(e.target.value))} className="mt-1 w-full border rounded px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm text-gray-600">积分</label>
              <input type="number" value={points} onChange={e=>setPoints(e.target.value===''? '': Number(e.target.value))} className="mt-1 w-full border rounded px-3 py-2 text-sm" />
            </div>
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={needApproval} onChange={e=>setNeedApproval(e.target.checked)} />
            需要家长审核
          </label>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button onClick={onClose} className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200">取消</button>
            <button disabled={busy} onClick={submit} className="px-3 py-1.5 rounded bg-[var(--primary-600)] text-white hover:bg-[var(--primary-700)] disabled:opacity-50">{busy? '提交中…':'保存'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

