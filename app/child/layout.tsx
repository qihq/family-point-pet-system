import type { ReactNode } from 'react';
import "@fontsource/nunito/700.css";
import "@fontsource/baloo-2/800.css";
import "@/styles/child-theme.css";
import ChildBottomNav from "@/components/child/ChildBottomNav";

export default function ChildLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" data-theme="child">
      <body style={{ fontFamily: "var(--font-body)" }}>
        {children}
        <ChildBottomNav />
      </body>
    </html>
  );
}

// codex-ok: 2026-04-10T11:07:00+08:00