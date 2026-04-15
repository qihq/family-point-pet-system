"use client";
import { useRouter } from "next/navigation";
export default function AdminLogoutButton(){
  const router = useRouter();
  async function onClick(){ try{ await fetch('/api/auth/logout',{ method:'POST', credentials:'include' }); }catch{} router.push('/login'); }
  return (<button onClick={onClick} className="mt-auto px-3 py-2 rounded-md border text-sm" style={{ borderColor:'var(--a-border)', color:'var(--a-text)', background:'transparent' }}>{`??`}</button>);
}
// codex-ok: 2026-04-14T10:29:18.1769304+08:00
