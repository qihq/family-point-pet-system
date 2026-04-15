import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
async function getData(){
  const logs = await prisma.taskLog.findMany({ orderBy:{ createdAt:'desc' }, take: 10, select:{ id:true, createdAt:true, note:true, child:{ select:{ name:true } }, taskPlan:{ select:{ title:true } } } });
  return logs.map(l=>({ id:l.id, time:l.createdAt.toISOString(), actor:l.child?.name||'-', action: l.note || (l.taskPlan?.title? ('完成 '+l.taskPlan.title):'-') }));
}
export default async function Page(){
  const items = await getData();
  return (<div className='space-y-3'><h1 className='text-2xl font-bold'>{`操作日志`}</h1><div className='rounded-xl border p-4' style={{background:'var(--a-card)',borderColor:'var(--a-border)'}}>{items.length? (<ul className='space-y-1'>{items.map(it=> (<li key={it.id} className='text-sm'>{it.time} · {it.actor} · {it.action}</li>))}</ul>):(<div className='text-sm' style={{color:'var(--a-muted)'}}>{`暂无数据`}</div>)}</div></div>);
}
// codex-ok: 2026-04-13T10:36:30.3691490+08:00