import { ConfigProvider, theme as antdTheme } from "antd";
import { createContext, useEffect, useState } from "react";
import { MKT_THEME_STORAGE_KEY, applyMktTheme, readStoredMktTheme } from "~/utils/mkt-theme";

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

function resolveIsDark(mode: MktThemeMode): boolean {
  if (mode === "dark") return true;
  if (mode === "system") return getSystemDark();
  return false;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeModeState] = useState<MktThemeMode>(() => readStoredMktTheme());
  const [isDark, setIsDark] = useState<boolean>(() => resolveIsDark(readStoredMktTheme()));

  useEffect(() => {
    applyMktTheme(isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    if (themeMode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [themeMode]);

  const setThemeMode = (mode: MktThemeMode) => {
    setThemeModeState(mode);
    setIsDark(resolveIsDark(mode));
    window.localStorage.setItem(MKT_THEME_STORAGE_KEY, mode);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, isDark, setThemeMode }}>
      <ConfigProvider
        theme={{
          algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
