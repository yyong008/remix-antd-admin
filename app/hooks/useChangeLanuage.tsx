import { useEffect } from "react";
import { setLocale } from "~/paraglide/runtime.js";

export function useChangeLanguage(locale: "en" | "zh") {
  useEffect(() => {
    setLocale(locale, { reload: false });
  }, [locale]);
}
