"use client";
import { useEffect } from 'react';

export function useRequireRole(role: 'parent'|'child'|'admin'){
  useEffect(()=>{
    (async()=>{
      try{
        const token = typeof window!=='undefined'? localStorage.getItem('token'): null; const headers: any = token? { Authorization: "Bearer " }: {}; const r = await fetch('/api/auth/me', { cache:'no-store', credentials:'include', headers });
        if(!r.ok){ await fetch('/api/auth/logout',{ method:'POST', credentials:'include' }); location.href='/login'; return; }
        const d = await r.json();
        if(!d?.user || d.user.role !== role){ await fetch('/api/auth/logout',{ method:'POST', credentials:'include' }); location.href='/login'; return; }
      }catch{}
    })();
  }, [role]);
}
