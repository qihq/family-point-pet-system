"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Topbar() {
  const [user, setUser] = useState<any>(null);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const router = useRouter();
  const pathname = usePathname();

  async function fetchMe(){
    try{
      const token = typeof window!=='undefined' ? localStorage.getItem('token') : null;
      const headers: any = token ? { Authorization: `Bearer ${token}` } : {};
      const r = await fetch('/api/auth/me', { cache: 'no-store', credentials: 'include', headers });
      if(!r.ok) { setUser(null); return; }
      const d = await r.json();
      if(d?.user){ setUser(d.user); }
    }catch{ /* noop */ }
  }

  async function refreshPending(){
    if(!user || user.role !== 'parent') { setPendingCount(0); return; }
    try{
      const r = await fetch('/api/point-records?status=pending&pageSize=1', { cache: 'no-store', credentials: 'include' });
      if(!r.ok) { setPendingCount(0); return; }
      const d = await r.json();
      const total = d?.data?.pagination?.total ?? 0;
      setPendingCount(Number(total)||0);
    }catch{ setPendingCount(0); }
  }

  useEffect(()=>{ fetchMe(); }, [pathname]);
  useEffect(()=>{
    refreshPending();
    if(typeof window !== 'undefined'){
      const onVis = ()=>{ if(document.visibilityState==='visible') refreshPending(); };
      const id = window.setInterval(refreshPending, 20000);
      document.addEventListener('visibilitychange', onVis);
      return ()=>{ window.clearInterval(id); document.removeEventListener('visibilitychange', onVis); };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.role]);

  async function logout(){
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    router.push('/login');
  }

  const linkBase = 'px-2 py-1 rounded transition-colors';
  const linkHover = 'hover:bg-[var(--primary-100)] hover:text-[var(--text)]';

  return (
    <div className="w-full bg-[var(--card)] bg-opacity-80 backdrop-blur border-b border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-4 h-12 flex items-center justify-between">
        <div className="text-[var(--text)] font-semibold">家庭积分宠物</div>
        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              {user.role === 'parent' ? (
                <div className="hidden sm:flex items-center gap-1">
                  <a href="/parent" className={`${linkBase} ${linkHover}`}>主页</a>
                  <a href="/parent/plans" className={`${linkBase} ${linkHover}`}>学习计划</a>
                  <a href="/parent/report" className={`${linkBase} ${linkHover}`}>报告</a>
                  <a href="/parent/rewards" className={`${linkBase} ${linkHover}`}>奖品管理</a>
                  <a href="/parent/review" className={`${linkBase} ${linkHover}`}>
                    审核{pendingCount>0 && (
                      <span className="ml-1 inline-flex items-center justify-center min-w-[16px] h-[16px] px-1 rounded-full bg-rose-600 text-white text-[10px]">
                        {pendingCount}
                      </span>
                    )}
                  </a>
                  <a href="/parent/settings" className={`${linkBase} ${linkHover}`}>设置</a>
                  <a href="/parent/recycle" className={`${linkBase} ${linkHover}`}>回收站</a>
                </div>
              ) : user.role === 'admin' ? (
                <div className="hidden sm:flex items-center gap-1">
                  <a href="/admin/parents" className={`${linkBase} ${linkHover}`}>家长管理</a>
                  <a href="/admin/profile" className={`${linkBase} ${linkHover}`}>管理员资料</a>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-1">
                  <a href="/child" className={`${linkBase} ${linkHover}`}>主页</a>
                  <a href="/child/pet" className={`${linkBase} ${linkHover}`}>宠物</a>
                  <a href="/child/plans" className={`${linkBase} ${linkHover}`}>学习计划</a>
                  <a href="/child/records" className={`${linkBase} ${linkHover}`}>审核记录</a>
                  <a href="/child/points" className={`${linkBase} ${linkHover}`}>积分</a>
                  <a href="/child/rewards" className={`${linkBase} ${linkHover}`}>奖品兑换</a>
                  <a href="/child/records?tab=redeems" className={`${linkBase} ${linkHover}`}>兑换记录</a>
                </div>
              )}
              <span className="text-[var(--muted)]">身份:{user.role === 'parent' ? '家长' : (user.role==='admin'?'管理员':'孩子')}({user.name})</span>
              <button onClick={() => router.push('/login')} className="px-2 py-1 rounded bg-[var(--primary-100)] text-[var(--text)] hover:brightness-105">切换账号</button>
              <button onClick={logout} className="px-2 py-1 rounded bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--primary-100)]">退出</button>
            </>
          ) : (
            <button onClick={() => router.push('/login')} className="px-3 py-1.5 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-600)]">登录</button>
          )}
        </div>
      </div>
    </div>
  );
}
