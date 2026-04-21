import { useParams } from "react-router";
import { i18n } from "~/libs/fumadocs/i18n";
import { defineI18nUI } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider/react-router";

const { provider } = defineI18nUI(i18n, {
  translations: {
    en: {
      displayName: "English",
    },
    zh: {
      displayName: "中文",
      search: "搜索文档",
    },
  },
});

interface DocsRootProviderProps {
  children: React.ReactNode;
}

export function DocsRootProvider({ children }: DocsRootProviderProps) {
  const { locale = "en" } = useParams();
  return (
    <RootProvider
      i18n={provider(locale)}
      /** Fumadocs defaults to `next-themes` (system preference), which fights `MktThemeSync` + marketing `mkt-theme`. Theme + `.dark` for `--color-fd-*` come from `applyMktTheme` on `<html>`. */
      theme={{ enabled: false }}
    >
      {children}
    </RootProvider>
  );
}
