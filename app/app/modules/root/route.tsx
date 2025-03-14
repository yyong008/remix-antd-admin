import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useParams,
} from "react-router";

import { ClientOnly } from "~/components/common/client-only";
import { useChangeLanguage } from "remix-i18next/react";

export function RootRoute() {
  const params = useParams();
  const _data = useLoaderData();
  const { lang } = _data;

  useChangeLanguage(lang!);

  return (
    <html lang={params.lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ClientOnly fallback={<></>}>{() => <Outlet />}</ClientOnly>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
