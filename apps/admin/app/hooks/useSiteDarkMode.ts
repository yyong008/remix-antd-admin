import { useSyncExternalStore } from "react";

/** Subscribes to `<html>` class changes from `applyMktTheme` (`dark` / `theme-dark`). */
function subscribe(onChange: () => void) {
  const el = document.documentElement;
  const mo = new MutationObserver(onChange);
  mo.observe(el, { attributes: true, attributeFilter: ["class"] });
  return () => mo.disconnect();
}

function getIsDark() {
  if (typeof document === "undefined") return false;
  const el = document.documentElement;
  return el.classList.contains("dark") || el.classList.contains("theme-dark");
}

/**
 * Site-wide dark mode (marketing + Fumadocs `--color-fd-*`), not `next-themes`.
 * Use instead of `useTheme` when Fumadocs `RootProvider` has `theme={{ enabled: false }}`.
 */
export function useSiteDarkMode(): boolean {
  return useSyncExternalStore(subscribe, getIsDark, () => false);
}
