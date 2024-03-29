// type
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

// remix
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useParams,
  useRouteError,
} from "@remix-run/react";
import { json } from "@remix-run/node";

// components
import { ClientOnly } from "./components/common/ClientOnly";

// styles
import global from "~/styles/global.css?url";
import tailwind from "~/styles/tailwind.css?url";
import "nprogress/nprogress.css";

// hooks
import { useChangeLanguage } from "remix-i18next/react";

// i18n
// export let handle = { i18n: "common" };
export let handle = { i18n: ["common", "menu"] };

// remix:links
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: global },
  { rel: "stylesheet", href: tailwind },
];

// remix:loader
export async function loader({ request, params }: LoaderFunctionArgs) {
  let { lang } = params;
  return json({ lang });
}

export default function App() {
  const params = useParams();
  let { lang } = useLoaderData<typeof loader>();

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

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div style={{ padding: "0px 20px" }}>
        <h1>Error</h1>
        <p
          style={{
            textDecoration: "underline dotted #000",
          }}
        >
          {error.message}
        </p>
        <p>The stack trace is:</p>
        <pre
          style={{
            padding: "10px 10px",
            backgroundColor: "rgba(255, 0, 0, 0.199)",
          }}
        >
          {error.stack}
        </pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
