'use client';
import { useEffect, useState } from 'react';
export default function Page(){
  const [db,setDb]=useState<'connected'|'error'|'unknown'>('unknown');
  useEffect(()=>{
    let mounted=true; const tick=async()=>{ try{ const r=await fetch('/api/health',{cache:'no-store'}); const d= await r.json(); if(!mounted) return; setDb(d?.db==='connected'?'connected':'error'); }catch{ if(mounted) setDb('error'); } }; tick(); const id=setInterval(tick,3000); return ()=>{ mounted=false; clearInterval(id); };
  },[]);
  return (<div className='space-y-4'><h1 className='text-2xl font-bold'>{`系统健康`}</h1><div className='rounded-xl border p-4' style={{background:'var(--a-card)',borderColor:'var(--a-border)'}}><div className='text-sm'>{`数据库：`}<span style={{color: db==='connected'? 'var(--a-success)':'var(--a-danger)'}}>{db}</span></div></div></div>);
}
// codex-ok: 2026-04-13T10:36:40.9390778+08:00