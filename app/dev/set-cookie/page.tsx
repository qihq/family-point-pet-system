"use client";
import { useEffect } from 'react';

export default function Page(){
  useEffect(()=>{
    const sp = new URLSearchParams(location.search);
    const t = sp.get('t')||'';
    const to = sp.get('to') || '/';
    if(t){ document.cookie = `token=${t}; Path=/; SameSite=Lax`; }
    location.assign(to);
  },[]);
  return <div style={{padding:20}}>Setting token cookie…</div>;
}
