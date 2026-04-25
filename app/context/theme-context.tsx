import { createContext, useState } from "react";

type ThemeContextType = {
  isDark: boolean;
  toggleDark: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleDark: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark((v) => !v);
  return <ThemeContext.Provider value={{ isDark, toggleDark }}>{children}</ThemeContext.Provider>;
}
