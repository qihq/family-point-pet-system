"use client";

import { useEffect } from "react";

export function useRequireRole(role: "parent" | "child" | "admin") {
  useEffect(() => {
    let cancelled = false;

    async function verifyRole() {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
          credentials: "include",
        });

        if (!response.ok) {
          await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
          if (!cancelled) window.location.assign("/login");
          return;
        }

        const data = await response.json();
        if (!data?.user || data.user.role !== role) {
          await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
          if (!cancelled) window.location.assign("/login");
        }
      } catch {
        if (!cancelled) window.location.assign("/login");
      }
    }

    verifyRole();
    return () => {
      cancelled = true;
    };
  }, [role]);
}
