import type { LinksFunction } from "react-router";
import type { MiddlewareFunction } from "react-router";

import { ConfigProvider, theme } from "antd";
import { RootRoute } from "~/features/mkt/modules/root/route";
import global from "@/styles/global.css?url";
import adminShell from "@/styles/admin-shell.css?url";
import npStyle from "nprogress/nprogress.css?url";
import { paraglideMiddleware } from "~/paraglide/server.js";
import "@fontsource-variable/google-sans-code/mono.css";
import { ThemeProvider, ThemeContext } from "~/context/theme-context";
import { SettingContext } from "~/context/setting-context";
import { useContext } from "react";

export { loader } from "~/features/mkt/modules/root/loader";
export { ErrorBoundary } from "~/features/mkt/modules/root/error-boundary";

export const middleware: MiddlewareFunction[] = [
  (ctx, next) => paraglideMiddleware(ctx.request, () => next()),
];

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: global },
  { rel: "stylesheet", href: adminShell },
  { rel: "stylesheet", href: npStyle },
];

function RootInner() {
  const { isDark } = useContext(ThemeContext);

  const shellMenuTheme = {
    components: {
      Layout: {
        triggerBg: "#0d1219",
        triggerColor: "rgba(255, 255, 255, 0.72)",
      },
      Menu: {
        itemBorderRadius: 10,
        itemMarginInline: 8,
        itemMarginBlock: 3,
        itemHeight: 42,
        iconSize: 17,
        collapsedIconSize: 17,
        iconMarginInlineEnd: 12,
        darkItemBg: "transparent",
        darkSubMenuItemBg: "transparent",
        darkItemHoverBg: "rgba(255, 255, 255, 0.06)",
        darkItemHoverColor: "rgba(255, 255, 255, 0.95)",
        darkItemSelectedBg: "rgba(22, 119, 255, 0.22)",
        darkItemSelectedColor: "#fff",
        darkPopupBg: "#141a24",
        popupBg: "#141a24",
        activeBarWidth: 0,
      },
    },
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          fontFamily: "'Google Sans Code Variable', monospace",
        },
        ...shellMenuTheme,
      }}
    >
      <RootRoute />
    </ConfigProvider>
  );
}

export default function Root() {
  return (
    <ThemeProvider>
      <SettingContext.Provider
        value={{
          theme: { colorPrimary: "#1677ff" },
          setTheme: () => {},
          lang: "en",
          setLang: () => {},
        }}
      >
        <RootInner />
      </SettingContext.Provider>
    </ThemeProvider>
  );
}
