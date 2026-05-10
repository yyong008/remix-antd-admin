import { createContext, useEffect, useState } from "react";
import { MKT_THEME_STORAGE_KEY, readStoredMktTheme, applyMktTheme } from "~/utils/mkt-theme";

export type MktThemeMode = "light" | "dark" | "system";

type ThemeContextType = {
  themeMode: MktThemeMode;
  isDark: boolean;
  setThemeMode: (mode: MktThemeMode) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  themeMode: "light",
  isDark: false,
  setThemeMode: () => {},
});

function getSystemDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeModeState] = useState<MktThemeMode>("light");
  const [isDark, setIsDark] = useState(false);

  // Initialize from localStorage and apply theme
  useEffect(() => {
    const stored = readStoredMktTheme();
    const mode = stored === "system" ? "system" : stored;
    setThemeModeState(mode);
  }, []);

  // Update isDark when themeMode or system preference changes
  useEffect(() => {
    let dark = false;
    if (themeMode === "dark") {
      dark = true;
    } else if (themeMode === "system") {
      dark = getSystemDark();
    }
    setIsDark(dark);
    applyMktTheme(dark ? "dark" : "light");
  }, [themeMode]);

  // Listen for system preference changes when in system mode
  useEffect(() => {
    if (themeMode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
      applyMktTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [themeMode]);

  const setThemeMode = (mode: MktThemeMode) => {
    setThemeModeState(mode);
    window.localStorage.setItem(MKT_THEME_STORAGE_KEY, mode);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, isDark, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
