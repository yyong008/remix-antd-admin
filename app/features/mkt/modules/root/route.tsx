import { QueryClientProvider } from "@tanstack/react-query";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useParams,
} from "react-router";

import { AppQueryProvider } from "~/api-client/query-provider";
import { ClientOnly } from "~/components/common/client-only";
import { DocsRootProvider } from "~/features/cms/components/docs/provider";
import { SessionProvider } from "~/session/provider/index";
import { QueryProvider } from "~/query-provider";

export function RootRoute() {
  const params = useParams();

  return (
    <html lang={params.locale || "en"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryProvider>
          <SessionProvider>
            <AppQueryProvider>
              <DocsRootProvider>
                <ClientOnly fallback={<></>}>{() => <Outlet />}</ClientOnly>
              </DocsRootProvider>
            </AppQueryProvider>
          </SessionProvider>

          <ScrollRestoration />
        </QueryProvider>
        <Scripts />
      </body>
    </html>
  );
}
