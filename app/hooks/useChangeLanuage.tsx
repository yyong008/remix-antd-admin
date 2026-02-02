import { useEffect } from "react";
import { setLocale } from "~/paraglide/runtime.js";

export function useChangeLanguage(locale: string) {
	useEffect(() => {
		setLocale(locale, { reload: false });
	}, [locale]);
}
