"use client";

import { useEffect } from "react";

type ThemeControllerProps = {
  theme?: "parent" | "child" | "admin";
  mode?: "kid";
};

export default function ThemeController({ theme, mode }: ThemeControllerProps) {
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const previousTheme = root.dataset.theme;
    const previousMode = body.dataset.mode;

    if (theme) root.dataset.theme = theme;
    else delete root.dataset.theme;

    if (mode) body.dataset.mode = mode;
    else delete body.dataset.mode;

    return () => {
      if (previousTheme) root.dataset.theme = previousTheme;
      else delete root.dataset.theme;

      if (previousMode) body.dataset.mode = previousMode;
      else delete body.dataset.mode;
    };
  }, [mode, theme]);

  return null;
}
