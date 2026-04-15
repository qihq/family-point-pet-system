"use client";
import React, { useEffect, useState } from 'react';
import { useRequireRole } from '@/lib/useRequireRole';

export default function AdminProfile(){
  useRequireRole('admin');
  const [me,setMe] = useState<any>(null);
  const [name,setName] = useState('');
  const [avatarUrl,setAvatarUrl] = useState('');
  const [msg,setMsg] = useState('');
  const [uploading,setUploading] = useState(false);

  function authHeaders(){ const t = typeof window!=='undefined'? localStorage.getItem('token') : null; const h:any = {}; if(t) h.Authorization = `Bearer ${t}`; return h; }

  useEffect(()=>{
    (async()=>{
      const r = await fetch('/api/admin/me',{cache:'no-store',credentials:'include',headers:authHeaders()});
      const d = await r.json();
      if(r.ok&&d.success){ setMe(d.data); setName(d.data?.name||''); setAvatarUrl(d.data?.avatarUrl||''); }
    })();
  },[]);

  async function save(){
    const r = await fetch('/api/admin/me',{ method:'PATCH', headers:{ 'Content-Type':'application/json', ...authHeaders() }, credentials:'include', body: JSON.stringify({ name, avatarUrl })});
    const d = await r.json();
    if(!r.ok||!d.success){ alert(d.error||'保存失败'); return; }
    setMsg('已保存'); setTimeout(()=>setMsg(''),1500);
  }

  async function uploadAvatar(ev: React.ChangeEvent<HTMLInputElement>){
    const file = ev.target.files?.[0]; if(!file) return;
    setUploading(true);
    try{
      const fd = new FormData(); fd.append('file', file);
      const r = await fetch('/api/admin/me/avatar', { method:'POST', body: fd, credentials:'include', headers:authHeaders() });
      const d = await r.json();
      if(!r.ok||!d.success){ alert(d.error||'上传失败'); return; }
      setAvatarUrl(d.data?.url||'');
      setMsg('头像已更新'); setTimeout(()=>setMsg(''),1500);
    }finally{ setUploading(false); }
  }

  async function changePwd(){
    const oldPassword = prompt('旧密码：','')||'';
    const newPassword = prompt('新密码：','')||'';
    if(!newPassword) return;
    const r = await fetch('/api/admin/me',{ method:'POST', headers:{ 'Content-Type':'application/json', ...authHeaders() }, credentials:'include', body: JSON.stringify({ oldPassword, newPassword })});
    const d = await r.json();
    if(!r.ok||!d.success){ alert(d.error||'修改失败'); return; }
    setMsg('密码已修改'); setTimeout(()=>setMsg(''),1500);
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--text)]">管理员资料</h1>
        <div className="mt-4 bg-white rounded shadow-sm p-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border">
              {avatarUrl? <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">无头像</div>}
            </div>
            <div>
              <label className="inline-block px-3 py-1.5 rounded bg-[var(--primary)] text-white hover:brightness-105 cursor-pointer">
                {uploading? '上传中…' : '上传头像'}
                <input type="file" accept="image/*" className="hidden" onChange={uploadAvatar} disabled={uploading}/>
              </label>
              {avatarUrl && <div className="text-xs text-gray-500 mt-1">{avatarUrl}</div>}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">用户名</div>
            <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <div className="text-sm text-gray-600">头像 URL（可选）</div>
            <input value={avatarUrl} onChange={e=>setAvatarUrl(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded" />
          </div>
          <div className="flex items-center gap-2">
            <button onClick={save} className="px-3 py-1.5 rounded bg-[var(--primary)] text-white">保存</button>
            <button onClick={changePwd} className="px-3 py-1.5 rounded bg-gray-100">修改密码</button>
          </div>
          {msg && <div className="text-sm text-blue-700">{msg}</div>}
        </div>
      </div>
    </div>
  );
}
