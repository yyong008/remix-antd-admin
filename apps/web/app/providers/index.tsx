import { RootProvider } from "fumadocs-ui/provider/react-router";
import { translations } from "~/lib/layout.shared";
import { i18nProvider } from "fumadocs-ui/i18n";
import { TooltipProvider } from "@workspace/ui/components/tooltip";
import { ThemeProvider } from "~/context/theme-provider";
import { useParams } from "react-router";

export function Providers({ children }: { children: React.ReactNode }) {
  const { locale } = useParams();
  return (
    <RootProvider i18n={i18nProvider(translations, locale)}>
      <ThemeProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </RootProvider>
  );
}
