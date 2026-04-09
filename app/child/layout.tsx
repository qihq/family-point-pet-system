"use client";
import { useEffect } from "react";

export default function ChildLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute("data-mode", "kid");
    return () => { el.removeAttribute("data-mode"); };
  }, []);
  return <>{children}</>;
}
