"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRequireRole } from "@/lib/useRequireRole";

interface Kid {
  id: string;
  name: string;
  avatarUrl?: string | null;
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("头像读取失败"));
    reader.readAsDataURL(file);
  });
}

export default function ParentChildrenPage() {
  useRequireRole("parent");

  const [list, setList] = useState<Kid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState<Kid | null>(null);
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPin, setNewPin] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/family/children", { cache: "no-store", credentials: "include" });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "加载失败");
      setList(data.data || []);
    } catch (caught: any) {
      setError(caught.message || "网络错误");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function openEdit(kid: Kid) {
    setEditing(kid);
    setName(kid.name);
    setPin("");
    setAvatarFile(null);
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    try {
      let avatarBase64: string | undefined;
      if (avatarFile) {
        avatarBase64 = await readFileAsDataUrl(avatarFile);
      }

      const body: any = { name };
      if (pin) body.pin = pin;
      if (avatarBase64) body.avatarBase64 = avatarBase64;

      const response = await fetch(`/api/family/children/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "保存失败");

      setEditing(null);
      await load();
    } catch (caught: any) {
      alert(caught.message || "保存失败");
    } finally {
      setSaving(false);
    }
  }

  async function createChild() {
    try {
      if (!newName.trim()) {
        alert("请输入姓名");
        return;
      }
      const response = await fetch("/api/family/children", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: newName.trim(), pin: newPin || undefined }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "创建失败");

      setCreating(false);
      setNewName("");
      setNewPin("");
      await load();
    } catch (caught: any) {
      alert(caught.message || "创建失败");
    }
  }

  async function softDelete(id: string) {
    if (!confirm("确定要将该孩子移至回收站？")) return;
    try {
      const response = await fetch(`/api/family/children/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "操作失败");
      await load();
    } catch (caught: any) {
      alert(caught.message || "操作失败");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-xl bg-white shadow-md">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">家庭成员管理</h1>
              <p className="mt-1 text-sm text-gray-600">支持新增孩子、编辑昵称、重置 PIN 和维护头像。</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCreating(true)}
                className="rounded bg-[var(--primary)] px-3 py-2 text-white hover:bg-[var(--primary-600)]"
              >
                新增孩子
              </button>
              <Link href="/parent/recycle" className="rounded bg-gray-100 px-3 py-2 text-gray-800 hover:bg-gray-200">
                回收站
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="p-6 text-gray-600">加载中…</div>
          ) : error ? (
            <div className="p-6 text-red-600">{error}</div>
          ) : (
            <div className="overflow-x-auto p-6">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm text-gray-500">头像</th>
                    <th className="px-4 py-2 text-left text-sm text-gray-500">名字</th>
                    <th className="px-4 py-2 text-left text-sm text-gray-500">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {list.map((kid) => (
                    <tr key={kid.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2">
                        {kid.avatarUrl ? (
                          <img src={kid.avatarUrl} alt={`${kid.name} 头像`} className="h-10 w-10 rounded-full object-cover" />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary-100)] text-amber-700">
                            {kid.name.slice(0, 1)}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">{kid.name}</td>
                      <td className="px-4 py-2 text-sm">
                        <div className="flex gap-3">
                          <button onClick={() => openEdit(kid)} className="text-blue-600 hover:text-blue-800">
                            编辑
                          </button>
                          <Link href={`/child/pet?childId=${kid.id}`} target="_blank" className="text-amber-600 hover:text-amber-700">
                            预览孩子页
                          </Link>
                          <button onClick={() => void softDelete(kid.id)} className="text-gray-600 hover:text-gray-800">
                            移至回收站
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {list.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                        暂无孩子，点击右上角“新增孩子”
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="space-y-4 p-6">
              <h2 className="text-xl font-bold text-gray-800">编辑孩子</h2>
              <div>
                <label className="mb-1 block text-sm text-gray-600">名字</label>
                <input value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded border px-3 py-2" />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">PIN（可选，数字）</label>
                <input
                  value={pin}
                  onChange={(event) => setPin(event.target.value.replace(/\D/g, ""))}
                  className="w-full rounded border px-3 py-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">头像（可选，JPG/PNG）</label>
                <input type="file" accept="image/png,image/jpeg" onChange={(event) => setAvatarFile(event.target.files?.[0] || null)} />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => void save()}
                  disabled={saving}
                  className="rounded bg-[var(--primary)] px-4 py-2 text-white hover:bg-[var(--primary-600)] disabled:opacity-60"
                >
                  {saving ? "保存中…" : "保存"}
                </button>
                <button onClick={() => setEditing(null)} className="rounded bg-gray-100 px-4 py-2 hover:bg-gray-200">
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {creating && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="space-y-4 p-6">
              <h2 className="text-xl font-bold text-gray-800">新增孩子</h2>
              <div>
                <label className="mb-1 block text-sm text-gray-600">名字</label>
                <input value={newName} onChange={(event) => setNewName(event.target.value)} className="w-full rounded border px-3 py-2" />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">PIN（可选，数字）</label>
                <input
                  value={newPin}
                  onChange={(event) => setNewPin(event.target.value.replace(/\D/g, ""))}
                  className="w-full rounded border px-3 py-2"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => void createChild()} className="rounded bg-[var(--primary)] px-4 py-2 text-white hover:bg-[var(--primary-600)]">
                  创建
                </button>
                <button
                  onClick={() => {
                    setCreating(false);
                    setNewName("");
                    setNewPin("");
                  }}
                  className="rounded bg-gray-100 px-4 py-2 hover:bg-gray-200"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
