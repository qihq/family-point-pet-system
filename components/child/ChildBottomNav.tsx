"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function cx(...args: Array<string | false | null | undefined>) { return args.filter(Boolean).join(" "); }

type Props = { taskBadge?: number };

export default function ChildBottomNav({ taskBadge = 0 }: Props) {
  const pathname = usePathname();
  const items = [
    { href: "/child", label: "首页", icon: "🏠" },
    { href: "/child/tasks", label: "任务", icon: "📋", badge: taskBadge },
    { href: "/child/pet", label: "宠物", icon: "🐾" },
    { href: "/child/rewards", label: "兑换", icon: "🎁" },
    { href: "/child/growth", label: "成长", icon: "📊" },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-3xl grid grid-cols-5 py-2">
        {items.map((it) => {
          const active = pathname === it.href || pathname?.startsWith(it.href + "/");
          return (
            <Link key={it.href} href={it.href} className="px-1">
              <div
                className={cx(
                  "flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 transition-transform",
                  active && "scale-110"
                )}
                style={active ? { backgroundColor: "rgba(255,107,53,0.12)" } : undefined}
              >
                <div className="relative">
                  <span className="text-xl" aria-hidden="true">{it.icon}</span>
                  {it.badge && it.badge > 0 ? (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold bg-red-500 text-white rounded-full">{it.badge}</span>
                  ) : null}
                </div>
                <span className={cx("text-xs", active ? "text-[var(--c-orange)]" : "text-gray-600")}>{it.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

// codex-ok: 2026-04-10T11:42:00+08:00