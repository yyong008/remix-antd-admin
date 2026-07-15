"use client";

import { useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { LanguageIcon } from "~/components/icons";
import { useLocation, useNavigate, useParams } from "react-router";

import { defaultLang, langs } from "~/config/lang";
import { SettingContext } from "~/context/setting-context";
import { useChangeLocale } from "~/hooks/use-change-lanuage";
import { setLocale } from "~/paraglide/runtime.js";

const LANG_LABELS: Record<string, string> = {
  en: "English",
  zh: "中文",
};

function getNextPath(pathname: string, nextLocale: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return `/${nextLocale}`;
  }
  // TODO: any type
  if (langs.includes(segments[0] as any)) {
    segments[0] = nextLocale;
    return `/${segments.join("/")}`;
  }
  return `/${nextLocale}/${segments.join("/")}`;
}

export function LocaleSwitcher() {
  const { locale = defaultLang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const settings = useContext(SettingContext);

  useChangeLocale(locale as "en" | "zh");

  const handleChange = (nextLocale: string) => {
    if (nextLocale === locale) return;
    setLocale(nextLocale as "en" | "zh", { reload: false });
    settings?.setLang(nextLocale);
    navigate(getNextPath(location.pathname, nextLocale));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center rounded-full size-7 text-foreground hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground"
            aria-label="Language"
          />
        }
      >
        <LanguageIcon className="size-4.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-60">
        <DropdownMenuRadioGroup value={locale} onValueChange={handleChange}>
          {langs.map((lang) => (
            <DropdownMenuRadioItem key={lang} value={lang}>
              {LANG_LABELS[lang] ?? lang}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
