"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";

export type ReviewItem = {
  id: string;
  kind: "plan" | "rule";
  childName: string;
  childAvatar?: string | null;
  title: string;
  createdAt: string;
  pointsPreview: number;
};

type Notice = {
  tone: "success" | "error";
  text: string;
  detail?: string;
};

function timeAgo(input: string | number | Date) {
  const value = new Date(input);
  const diff = Math.floor((Date.now() - value.getTime()) / 1000);
  if (diff < 60) return `${diff} 秒前`;
  if (diff < 3600) return `${Math.floor(diff / 60)} 分钟前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} 小时前`;
  return `${Math.floor(diff / 86400)} 天前`;
}

const fetcher = async (): Promise<ReviewItem[]> => {
  const [taskResponse, recordResponse] = await Promise.all([
    fetch("/api/tasks/pending", { credentials: "include", cache: "no-store" }),
    fetch("/api/point-records?status=pending&pageSize=100", { credentials: "include", cache: "no-store" }),
  ]);
  const [taskData, recordData] = await Promise.all([
    taskResponse.json().catch(() => ({ success: false, data: [] })),
    recordResponse.json().catch(() => ({ success: false, data: { records: [] } })),
  ]);

  const plans: ReviewItem[] = (Array.isArray(taskData.data) ? taskData.data : []).map((item: any) => ({
    id: item.id,
    kind: "plan",
    childName: item.child?.name || "",
    childAvatar: item.child?.avatarUrl || null,
    title: item.taskPlan?.title || "-",
    createdAt: item.createdAt,
    pointsPreview: item.pointsPreview || 0,
  }));

  const rules: ReviewItem[] = (((recordData.data || {}).records) || []).map((item: any) => ({
    id: item.id,
    kind: "rule",
    childName: item.child?.name || "",
    childAvatar: item.child?.avatarUrl || null,
    title: item.pointRule?.name || "-",
    createdAt: item.createdAt,
    pointsPreview: item.pointRule?.points || 0,
  }));

  return [...plans, ...rules].sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());
};

async function readJson(response: Response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

export default function ReviewClient({ initial }: { initial: ReviewItem[] }) {
  const { data, mutate, isLoading } = useSWR<ReviewItem[]>("parent-review-pending", fetcher, {
    fallbackData: initial,
  });
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({});
  const [notice, setNotice] = useState<Notice | null>(null);
  const [confirmBulk, setConfirmBulk] = useState(false);

  const items = useMemo(() => data || [], [data]);
  const count = items.length;

  const runAction = useCallback(
    async (item: ReviewItem, action: "approve" | "reject") => {
      setLoadingIds((current) => ({ ...current, [item.id]: true }));
      setNotice(null);
      const rollback = items;

      try {
        await mutate(
          items.filter((entry) => entry.id !== item.id),
          { revalidate: false }
        );

        const url = item.kind === "plan" ? `/api/tasks/pending/${item.id}` : `/api/point-records/${item.id}/review`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            action,
            points: item.pointsPreview || 0,
          }),
        });
        const payload = await readJson(response);
        if (!response.ok || !payload?.success) {
          throw new Error(payload?.error || "操作失败");
        }

        const petGrowth = payload.data?.petGrowth;
        setNotice({
          tone: "success",
          text:
            action === "approve"
              ? `${item.childName} 的「${item.title}」已通过`
              : `${item.childName} 的「${item.title}」已拒绝`,
          detail:
            action === "approve" && petGrowth
              ? `宠物 +${petGrowth.expGained} 经验，当前 Lv.${petGrowth.pet.level}${petGrowth.leveledUp ? "，已升级" : ""}`
              : action === "approve"
                ? `本次入账 ${payload.data?.points || item.pointsPreview || 0} 积分`
                : "孩子会在记录页和推送通知里看到结果。",
        });
        await mutate();
      } catch (error) {
        setNotice({
          tone: "error",
          text: error instanceof Error ? error.message : "操作失败",
        });
        await mutate(rollback, { revalidate: false });
      } finally {
        setLoadingIds((current) => ({ ...current, [item.id]: false }));
      }
    },
    [items, mutate]
  );

  const approveAll = useCallback(async () => {
    if (!items.length) return;

    const rollback = items;
    setNotice(null);
    await mutate([], { revalidate: false });

    try {
      const results = await Promise.all(
        items.map(async (item) => {
          const url = item.kind === "plan" ? `/api/tasks/pending/${item.id}` : `/api/point-records/${item.id}/review`;
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              action: "approve",
              points: item.pointsPreview || 0,
            }),
          });
          const payload = await readJson(response);
          if (!response.ok || !payload?.success) {
            throw new Error(payload?.error || "批量批准失败");
          }
          return payload.data;
        })
      );

      const leveledUpCount = results.filter((item) => item?.petGrowth?.leveledUp).length;
      setNotice({
        tone: "success",
        text: `已批量处理 ${items.length} 条待审核记录`,
        detail: leveledUpCount ? `${leveledUpCount} 条任务让宠物升级了。` : "相关孩子会收到审核结果通知。",
      });
      setConfirmBulk(false);
      await mutate();
    } catch (error) {
      setNotice({
        tone: "error",
        text: error instanceof Error ? error.message : "批量批准失败，已回滚",
      });
      await mutate(rollback, { revalidate: false });
    }
  }, [items, mutate]);

  const content = useMemo(() => {
    if (isLoading) {
      return <div className="mt-6 text-[var(--p-muted)]">加载中…</div>;
    }

    if (!items.length) {
      return (
        <div className="mt-10 flex flex-col items-center rounded-[28px] border border-dashed border-[var(--p-border)] bg-[var(--p-card)] px-6 py-10 text-center">
          <div className="text-5xl">清空了</div>
          <div className="mt-3 text-lg font-semibold text-[var(--p-text)]">现在没有待审核任务</div>
          <div className="mt-2 max-w-md text-sm text-[var(--p-muted)]">
            孩子完成新任务后会自动进来，审核结果也会同步推送给他们。
          </div>
          <Link href="/parent" className="mt-5 rounded-full bg-[var(--p-accent)] px-4 py-2 text-sm font-semibold text-white">
            返回家长总览
          </Link>
        </div>
      );
    }

    return (
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-[24px] border border-[var(--p-border)] bg-[var(--p-card)] p-4 shadow-sm"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E7F0FE] text-sm font-semibold text-[var(--p-accent)]">
                  {(item.childName || "?").slice(0, 1)}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="truncate font-semibold text-[var(--p-text)]">{item.title}</div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        item.kind === "plan" ? "bg-amber-100 text-amber-700" : "bg-sky-100 text-sky-700"
                      }`}
                    >
                      {item.kind === "plan" ? "计划任务" : "规则打卡"}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-[var(--p-muted)]">
                    {item.childName} · {timeAgo(item.createdAt)}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-stretch gap-3 md:items-end">
                <div className="text-right">
                  <div className="text-xs text-[var(--p-muted)]">预计入账</div>
                  <div className="text-lg font-bold text-blue-600">+{item.pointsPreview || 0}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => void runAction(item, "approve")}
                    disabled={!!loadingIds[item.id]}
                    className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    {loadingIds[item.id] ? "处理中…" : "批准"}
                  </button>
                  <button
                    onClick={() => void runAction(item, "reject")}
                    disabled={!!loadingIds[item.id]}
                    className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 disabled:opacity-60"
                  >
                    拒绝
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  }, [isLoading, items, loadingIds, runAction]);

  return (
    <div>
      <div className="rounded-[28px] bg-[linear-gradient(135deg,#ffffff_0%,#f8f5ef_55%,#eef5ff_100%)] p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[var(--p-muted)]">Review Desk</div>
            <h1 className="mt-2 text-3xl font-semibold text-[var(--p-text)]">把待审核记录快速处理完，让积分和反馈马上回到孩子端。</h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--p-muted)]">
              这里会同时汇总计划任务和规则打卡。批准计划任务时，宠物成长结果也会一起写回孩子端。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
              <div className="text-xs text-[var(--p-muted)]">当前待处理</div>
              <div className="mt-1 text-2xl font-semibold text-[var(--p-text)]">{count}</div>
            </div>
            <button
              onClick={() => setConfirmBulk((current) => !current)}
              disabled={!items.length}
              className="rounded-full bg-[var(--p-accent)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              全部批准
            </button>
          </div>
        </div>
      </div>

      {confirmBulk && items.length > 0 && (
        <div className="mt-4 rounded-2xl border border-[var(--p-border)] bg-[var(--p-card)] p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-semibold text-[var(--p-text)]">确认批量批准 {items.length} 条记录？</div>
              <div className="mt-1 text-sm text-[var(--p-muted)]">批准后会立即入账，并把审核结果通知到孩子端。</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmBulk(false)}
                className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700"
              >
                先取消
              </button>
              <button
                onClick={() => void approveAll()}
                className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
              >
                确认批准
              </button>
            </div>
          </div>
        </div>
      )}

      {notice && (
        <div
          className="mt-4 rounded-2xl px-4 py-3 text-sm"
          style={{
            background: notice.tone === "success" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
            color: notice.tone === "success" ? "#065f46" : "#991b1b",
          }}
        >
          <div>{notice.text}</div>
          {notice.detail && <div className="mt-1 opacity-80">{notice.detail}</div>}
        </div>
      )}

      {content}
    </div>
  );
}
