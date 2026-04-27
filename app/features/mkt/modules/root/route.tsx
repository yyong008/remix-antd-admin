import { Links, Meta, Outlet, Scripts, ScrollRestoration, useParams } from "react-router";

import { AppQueryProvider } from "~/providers/app-query-provider";
import { MktThemeSync } from "~/features/mkt/layout/components/MktThemeSync";
import { SessionProvider } from "~/session/provider/index";
import { ReactRouterTopLoader } from "~/components/toploader";

export function RootRoute() {
  const params = useParams();

  return (
    <html lang={params.locale || "en"} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('mkt-theme');if(t){var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.classList.toggle('theme-dark',d);document.documentElement.style.colorScheme=d?'dark':'light'}})()`,
          }}
        />
        <MktThemeSync />
        <AppQueryProvider>
          <SessionProvider>
            <Outlet />
          </SessionProvider>
        </AppQueryProvider>
        <ReactRouterTopLoader />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
