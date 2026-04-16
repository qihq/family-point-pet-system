"use client";

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useState } from "react";
import { useRequireRole } from "@/lib/useRequireRole";

type AdminProfileData = {
  id: string;
  name: string;
  avatarUrl?: string | null;
} | null;

type Notice = { tone: "success" | "error"; text: string } | null;

export default function AdminProfile() {
  useRequireRole("admin");

  const [me, setMe] = useState<AdminProfileData>(null);
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/me", {
        cache: "no-store",
        credentials: "include",
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "加载管理员资料失败");
      }

      setMe(data.data);
      setName(data.data?.name || "");
      setAvatarUrl(data.data?.avatarUrl || "");
      setNotice(null);
    } catch (caught) {
      setNotice({
        tone: "error",
        text: caught instanceof Error ? caught.message : "加载管理员资料失败",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  async function saveProfile() {
    setSavingProfile(true);
    setNotice(null);
    try {
      const response = await fetch("/api/admin/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, avatarUrl }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "保存失败");
      }

      setMe(data.data);
      setNotice({ tone: "success", text: "管理员资料已保存" });
    } catch (caught) {
      setNotice({
        tone: "error",
        text: caught instanceof Error ? caught.message : "保存失败",
      });
    } finally {
      setSavingProfile(false);
    }
  }

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setNotice(null);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/me/avatar", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "头像上传失败");
      }

      setAvatarUrl(data.data?.url || "");
      setNotice({ tone: "success", text: "头像已更新" });
    } catch (caught) {
      setNotice({
        tone: "error",
        text: caught instanceof Error ? caught.message : "头像上传失败",
      });
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  async function changePassword() {
    if (!newPassword.trim()) {
      setNotice({ tone: "error", text: "请输入新密码" });
      return;
    }

    setSavingPassword(true);
    setNotice(null);
    try {
      const response = await fetch("/api/admin/me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "密码修改失败");
      }

      setOldPassword("");
      setNewPassword("");
      setNotice({ tone: "success", text: "登录密码已更新" });
    } catch (caught) {
      setNotice({
        tone: "error",
        text: caught instanceof Error ? caught.message : "密码修改失败",
      });
    } finally {
      setSavingPassword(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto max-w-3xl space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">管理员资料</h1>
          <p className="mt-1 text-sm text-gray-500">统一维护管理员的名称、头像和登录密码。</p>
        </div>

        {notice && (
          <div
            className="rounded-2xl px-4 py-3 text-sm"
            style={{
              background: notice.tone === "success" ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
              color: notice.tone === "success" ? "#065f46" : "#991b1b",
            }}
          >
            {notice.text}
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border bg-gray-100">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={name || "管理员头像"} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xl font-semibold text-gray-400">{(name || "A").slice(0, 1)}</span>
                )}
              </div>
              <div>
                <div className="text-sm text-gray-500">当前账号</div>
                <div className="text-lg font-semibold text-gray-900">{me?.name || "管理员"}</div>
                <label className="mt-3 inline-flex cursor-pointer rounded-xl bg-[var(--primary)] px-3 py-2 text-sm text-white">
                  {uploading ? "上传中…" : "上传新头像"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={uploadAvatar}
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>

            {loading ? (
              <div className="text-sm text-gray-500">加载中…</div>
            ) : (
              <div className="space-y-4">
                <label className="block text-sm text-gray-600">
                  管理员名称
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="mt-1 w-full rounded-xl border px-3 py-2"
                  />
                </label>

                <label className="block text-sm text-gray-600">
                  头像 URL（可选）
                  <input
                    value={avatarUrl}
                    onChange={(event) => setAvatarUrl(event.target.value)}
                    className="mt-1 w-full rounded-xl border px-3 py-2"
                  />
                </label>

                <div className="flex justify-end">
                  <button
                    onClick={() => void saveProfile()}
                    disabled={savingProfile}
                    className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm text-white disabled:opacity-60"
                  >
                    {savingProfile ? "保存中…" : "保存资料"}
                  </button>
                </div>
              </div>
            )}
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="text-lg font-semibold text-gray-900">修改密码</div>
            <p className="mt-1 text-sm text-gray-500">推荐在系统稳定后第一时间更换默认管理员密码。</p>

            <div className="mt-4 space-y-4">
              <label className="block text-sm text-gray-600">
                旧密码
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(event) => setOldPassword(event.target.value)}
                  className="mt-1 w-full rounded-xl border px-3 py-2"
                />
              </label>

              <label className="block text-sm text-gray-600">
                新密码
                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className="mt-1 w-full rounded-xl border px-3 py-2"
                />
              </label>

              <button
                onClick={() => void changePassword()}
                disabled={savingPassword}
                className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm text-white disabled:opacity-60"
              >
                {savingPassword ? "提交中…" : "更新密码"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
