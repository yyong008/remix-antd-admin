import { createContext, useContext, useState, type ReactNode } from "react";

interface SettingContextType {
  lang: string;
  setLang: (lang: string) => void;
}

const SettingContext = createContext<SettingContextType | null>(null);

export function SettingProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState("zh");

  return (
    <SettingContext.Provider value={{ lang, setLang }}>
      {children}
    </SettingContext.Provider>
  );
}

export function useSetting() {
  const ctx = useContext(SettingContext);
  if (!ctx) throw new Error("useSetting must be used within SettingProvider");
  return ctx;
}

export { SettingContext };