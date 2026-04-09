"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, TabsPills } from '@/components/ui';

export default function LoginPage(){
  const [tab, setTab] = useState<'parent'|'child'|'admin'>('parent');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(()=>{
    if(typeof window !== 'undefined'){
      const sp = new URLSearchParams(window.location.search);
      if(sp.get('admin')==='1' || sp.get('role')==='admin'){ setTab('admin'); }
    }
  },[]);

  async function onSubmit(e: React.FormEvent){
    e.preventDefault(); setError(''); setLoading(true);
    try{
      const url = tab==='parent'? '/api/auth/parent-login' : (tab==='child'? '/api/auth/child-login' : '/api/auth/admin-login');
      const body:any = tab==='parent'? { name, password } : (tab==='child'? { name, pin } : { name, password });
      const r = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify(body) });
      const d = await r.json(); if(!r.ok || !d.success){ setError(d.error||'登录失败，请检查输入'); return; }
      try{ if(d.token) localStorage.setItem('token', d.token); }catch{}
      const dest = tab==='parent'? '/parent' : (tab==='child'? '/child/pet' : '/admin/parents');
      await fetch('/api/auth/me',{cache:'no-store',credentials:'include'}).catch(()=>{});
      location.assign(dest);
    }catch{ setError('网络错误，请稍后重试'); } finally{ setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background:'linear-gradient(180deg, var(--bg) 0%, rgba(255,230,222,0.12) 100%)' }}>
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur rounded-xl shadow-[0_10px_25px_rgba(255,142,110,0.08)] border border-[var(--border)]">
          <div className="px-6 pt-6">
            <h1 className="text-2xl font-bold text-[var(--text)]">欢迎回来</h1>
            <p className="text-sm mt-1 text-[var(--muted)]">家庭积分宠物 · 温馨相伴</p>
          </div>
          <div className="px-6 mt-4">
            <TabsPills tabs={["家长登录","孩子登录","管理员"]} active={tab==='parent'? '家长登录' : (tab==='child'? '孩子登录' : '管理员')} onChange={(t)=>{ setTab(t==='家长登录'? 'parent' : (t==='孩子登录'? 'child':'admin')); setError(''); }} />
          </div>
          <form onSubmit={onSubmit} className="px-6 pb-6 mt-4 space-y-4">
            <div>
              <label className="block text-sm mb-1 text-[var(--muted)]">用户名</label>
              <Input value={name} onChange={e=>setName((e.target as HTMLInputElement).value)} placeholder={tab==='child'? '例如：child1' : '例如：parent/admin'} />
            </div>
            {tab!=='child' ? (
              <div>
                <label className="block text-sm mb-1 text-[var(--muted)]">密码</label>
                <Input type="password" value={password} onChange={e=>setPassword((e.target as HTMLInputElement).value)} placeholder={tab==='admin'? '例如：admin123' : '例如：parent123'} />
              </div>
            ) : (
              <div>
                <label className="block text-sm mb-1 text-[var(--muted)]">PIN</label>
                <Input inputMode="numeric" pattern="[0-9]*" maxLength={6} value={pin} onChange={e=>setPin(((e.target as HTMLInputElement).value||'').replace(/\D/g,''))} placeholder="例如：1234" className="tracking-widest" />
              </div>
            )}
            {error && <div className="text-sm text-red-600">{error}</div>}
            <Button type="submit" variant="primary" fullWidth disabled={loading}>{loading? '正在登录…':'登录'}</Button>
            <p className="text-xs text-[var(--muted)] mt-2">示例：家长 parent / parent123；孩子 child1 / 1234；管理员 admin / ADMIN_PASSWORD</p>
          </form>
        </div>
      </div>
    </div>
  );
}