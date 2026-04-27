/**
 * Persists marketing (mkt) light/dark.
 * - `theme-dark` + `--mkt-*`: see `global.css`
 * - `dark` (Tailwind): Fumadocs UI uses `.dark { --color-fd-* }` in `fumadocs-ui/css/preset.css`; must stay in sync or docs look half light / half dark.
 */
export const MKT_THEME_STORAGE_KEY = "mkt-theme";

export type MktThemeMode = "light" | "dark" | "system";

export function applyMktTheme(mode: MktThemeMode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  let isDark = mode === "dark";
  if (mode === "system") {
    isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  root.classList.toggle("theme-dark", isDark);
  root.classList.toggle("dark", isDark);
  root.dataset.theme = mode;
  root.style.colorScheme = isDark ? "dark" : "light";
}

export function readStoredMktTheme(): MktThemeMode {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(MKT_THEME_STORAGE_KEY);
  if (stored === "dark" || stored === "light" || stored === "system") {
    return stored;
  }
  return "light";
}
