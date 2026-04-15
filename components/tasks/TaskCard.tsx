"use client";
import { useState } from 'react';

export interface TaskCardProps {
  task: { id: string; title: string; points: number; frequency?: string|null; description?: string|null; category?: string|null; durationMin?: number|null; enabled?: boolean|null };
  onCompleted?: (taskId: string, gained: number) => void;
}

const categoryColor: Record<string,string> = {
  study: 'bg-blue-500', exercise: 'bg-green-500', chore: 'bg-purple-500'
};

export default function TaskCard({ task, onCompleted }: TaskCardProps){
  const [busy, setBusy] = useState(false);
  const [fly, setFly] = useState<number>(0);
  const [done, setDone] = useState(false);
  const color = categoryColor[task.category||''] || 'bg-[var(--primary-50)]0';

  async function quickComplete(){
    if(busy||done) return; setBusy(true);
    try{
      const r = await fetch(`/api/tasks/${task.id}/complete`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ category: task.category||undefined }) });
      const d = await r.json();
      if(!r.ok || !d.success) throw new Error(d.error||'完成失败');
      setDone(true); const gain = Number(d?.data?.points||task.points||0); setFly(gain); setTimeout(()=>setFly(0),1200);
      onCompleted?.(task.id, Number(d?.data?.points||task.points||0));
    }catch(e:any){ alert(e.message||'网络错误'); }
    finally{ setBusy(false); }
  }

  return (<>
    <div className={`relative rounded-lg border p-4 bg-white shadow-sm ${done? 'opacity-60' : ''}`}>
      <div className="flex items-center gap-3">
        <div className={`w-2 h-10 rounded ${color}`} />
        <div className="flex-1">
          <div className="font-semibold text-gray-800 flex items-center gap-2">
            {task.title}
            {task.frequency && (<span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{task.frequency}</span>)}
            {task.durationMin ? (<span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">约{task.durationMin}分钟</span>) : null}
          </div>
          {task.description && (<div className="text-xs text-gray-500 mt-1">{task.description}</div>)}
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">积分</div>
          <div className="text-xl font-bold text-amber-600">+{task.points}</div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-3">
        <button disabled={busy||done} onClick={quickComplete}
          className={`px-3 py-1.5 rounded ${done? 'bg-gray-100 text-gray-400' : 'bg-[var(--primary-600)] text-white hover:bg-[var(--primary-700)]'} disabled:opacity-50`}>
          {done ? '已完成' : (busy ? '提交中…' : '快速完成')}
        </button>
      </div>
      {fly>0 && (<div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-2 text-amber-600 font-bold animate-[fly_1.2s_ease-out_forwards]">+{String(fly)}</div>)}
      {done && (
        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">✓</div>
      )}
    </div>
    <style jsx>{`@keyframes fly{0%{opacity:0;transform:translate(-50%,0)}40%{opacity:1}100%{opacity:0;transform:translate(-50%,-40px)}}`}</style>
    </>)
}


