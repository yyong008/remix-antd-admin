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
        <AppQueryProvider>
          <DocsRootProvider>
            <ClientOnly fallback={<></>}>{() => <Outlet />}</ClientOnly>
          </DocsRootProvider>
        </AppQueryProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
