import { useContext, useEffect } from "react";
import { ThemeContext } from "~/context/theme-context";

export function MktThemeSync() {
  const { isDark } = useContext(ThemeContext);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.classList.toggle("theme-dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
  }, [isDark]);

  return null;
}
