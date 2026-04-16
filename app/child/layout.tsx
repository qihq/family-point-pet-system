import type { ReactNode } from "react";
import "@fontsource/nunito/700.css";
import "@fontsource/baloo-2/800.css";
import ThemeController from "@/components/ThemeController";
import ChildBottomNav from "@/components/child/ChildBottomNav";
import PushInit from "@/components/parent/PushInit";
import "@/styles/child-theme.css";

export default function ChildLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ThemeController theme="child" mode="kid" />
      <div style={{ fontFamily: "var(--font-body)" }}>
        {children}
        <ChildBottomNav />
      </div>
      <PushInit publicKey={process.env.VAPID_PUBLIC_KEY || ""} />
    </>
  );
}
