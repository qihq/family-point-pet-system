"use client";
import { useEffect, useState } from 'react';

interface Kid { id: string; name: string; avatarUrl?: string | null }

export default function ParentChildrenPage() {
  const [list, setList] = useState<Kid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [editing, setEditing] = useState<Kid | null>(null);
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPin, setNewPin] = useState('');

  async function load(){
    setLoading(true); setError('');
    try{
      const res = await fetch('/api/family/children', { cache:'no-store', credentials:'include' });
      const data = await res.json();
      if(!res.ok || !data.success) throw new Error(data.error||'加载失败');
      setList(data.data||[]);
    }catch(e:any){ setError(e.message||'网络错误'); }
    finally{ setLoading(false); }
  }
  useEffect(()=>{ load(); },[]);

  function openEdit(k:Kid){ setEditing(k); setName(k.name); setPin(''); setAvatarFile(null); }

  async function save(){
    if(!editing) return; setSaving(true);
    try{
      let avatarBase64: string | undefined;
      if (avatarFile) {
        const buf = await avatarFile.arrayBuffer();
        const b64 = Buffer.from(buf).toString('base64');
        const ext = (avatarFile.type.includes('png') ? 'png' : 'jpeg');
        avatarBase64 = `data:image/${ext};base64,${b64}`;
      }
      const body:any = { name };
      if(pin) body.pin = pin; if(avatarBase64) body.avatarBase64 = avatarBase64;
      const res = await fetch(`/api/family/children/${editing.id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify(body) });
      const d = await res.json(); if(!res.ok || !d.success) throw new Error(d.error||'保存失败');
      setEditing(null); await load();
    }catch(e:any){ alert(e.message||'保存失败'); }
    finally{ setSaving(false); }
  }

  async function createChild(){
    try{
      if(!newName.trim()){ alert('请输入姓名'); return; }
      const res = await fetch('/api/family/children', { method:'POST', headers:{'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify({ name:newName.trim(), pin: newPin||undefined }) });
      const d = await res.json(); if(!res.ok || !d.success) throw new Error(d.error||'创建失败');
      setCreating(false); setNewName(''); setNewPin(''); await load();
    }catch(e:any){ alert(e.message||'创建失败'); }
  }

  async function softDelete(id:string){
    if(!confirm('确定要将该孩子移至回收站？')) return;
    try{
      const r = await fetch(`/api/family/children/${id}`, { method:'DELETE', credentials:'include' });
      const d = await r.json(); if(!r.ok || !d.success) throw new Error(d.error||'操作失败');
      await load();
    }catch(e:any){ alert(e.message||'操作失败'); }
  }

  // 仅家长访问
  useEffect(()=>{ (async()=>{ try{ const r=await fetch('/api/auth/me',{cache:'no-store',credentials:'include'}); if(!r.ok){ await fetch('/api/auth/logout',{method:'POST',credentials:'include'}); location.href='/login'; return; } const d=await r.json(); if(!d?.user || d.user.role!=='parent'){ await fetch('/api/auth/logout',{method:'POST',credentials:'include'}); location.href='/login'; return; } }catch{} })(); },[]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">家庭成员管理</h1>
              <p className="text-gray-600 text-sm mt-1">家长可为孩子改名、设置 PIN、修改头像；也可新增/删除孩子。</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={()=>setCreating(true)} className="px-3 py-2 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-600)]">新增孩子</button>
              <a href="/parent/recycle" className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-800">回收站</a>
            </div>
          </div>

          {loading ? (
            <div className="p-6 text-gray-600">加载中…</div>
          ) : error ? (
            <div className="p-6 text-red-600">{error}</div>
          ) : (
            <div className="p-6 overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm text-gray-500">头像</th>
                    <th className="px-4 py-2 text-left text-sm text-gray-500">名字</th>
                    <th className="px-4 py-2 text-left text-sm text-gray-500">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {list.map(k => (
                    <tr key={k.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2">
                        {k.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={k.avatarUrl} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[var(--primary-100)] flex items-center justify-center text-amber-700">{k.name.slice(0,1)}</div>
                        )}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">{k.name}</td>
                      <td className="px-4 py-2 text-sm">
                        <div className="flex gap-3">
                          <button onClick={()=> openEdit(k)} className="text-blue-600 hover:text-blue-800">编辑</button>
                          <a href={`/child/pet?childId=${k.id}`} target="_blank" className="text-amber-600 hover:text-amber-700">预览孩子页</a>
                          <button onClick={()=> softDelete(k.id)} className="text-gray-600 hover:text-gray-800">移至回收站</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {list.length===0 && (
                    <tr><td colSpan={3} className="px-4 py-8 text-center text-gray-500">暂无孩子，点击右上角“新增孩子”</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-800">编辑孩子</h2>
              <div>
                <label className="block text-sm text-gray-600 mb-1">名字</label>
                <input value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">PIN（可选，数字）</label>
                <input value={pin} onChange={e=>setPin(e.target.value.replace(/\D/g,''))} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">头像（可选，JPG/PNG）</label>
                <input type="file" accept="image/png,image/jpeg" onChange={e=>setAvatarFile(e.target.files?.[0]||null)} />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={save} disabled={saving} className="px-4 py-2 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-600)] disabled:opacity-60">{saving? '保存中…':'保存'}</button>
                <button onClick={()=>setEditing(null)} className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200">取消</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {creating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-800">新增孩子</h2>
              <div>
                <label className="block text-sm text-gray-600 mb-1">名字</label>
                <input value={newName} onChange={e=>setNewName(e.target.value)} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">PIN（可选，数字）</label>
                <input value={newPin} onChange={e=>setNewPin(e.target.value.replace(/\D/g,''))} className="w-full border rounded px-3 py-2" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={createChild} className="px-4 py-2 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-600)]">创建</button>
                <button onClick={()=>{ setCreating(false); setNewName(''); setNewPin(''); }} className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200">取消</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
