import { Links, Meta, Outlet, Scripts, ScrollRestoration, useParams } from "react-router";

import { AppQueryProvider } from "~/api-client/query-provider";
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
        <MktThemeSync />
        <SessionProvider>
          <AppQueryProvider>
            <Outlet />
          </AppQueryProvider>
        </SessionProvider>
        <ReactRouterTopLoader />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
