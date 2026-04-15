"use client";
import { useRouter } from 'next/navigation';
export function ParentLogoutButton(){
  const router = useRouter();
  async function onClick(){
    try{ await fetch('/api/auth/logout',{ method:'POST', credentials:'include' }); }catch{}
    router.push('/login');
  }
  return (<button onClick={onClick} className='mt-auto px-3 py-2 rounded-md border' style={{borderColor:'var(--p-border)'}}>{`退出`}</button>);
}
// codex-ok: '@ + (Get-Date -Format o) + '