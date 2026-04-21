"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function MktThemeSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const isDark = resolvedTheme === "dark";
    root.classList.toggle("dark", isDark);
    root.classList.toggle("theme-dark", isDark);
  }, [resolvedTheme]);

  return null;
}
