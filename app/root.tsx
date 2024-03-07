import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import { json } from "@remix-run/node";

// core
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

// components
import { ClientOnly } from "./components/ClientOnly";

// css
import global from "~/styles/global.css?url";
import tailwind from "~/styles/tailwind.css?url";
import "nprogress/nprogress.css";

import { useChangeLanguage } from "remix-i18next/react";
import { noop } from "./utils/utils";

// i18n
export let handle = { i18n: "common" };

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: global },
  { rel: "stylesheet", href: tailwind },
];

export async function loader({ request, params }: LoaderFunctionArgs) {
  let locale = params.lang;
  return json({ locale });
}

function App() {
  const params = useParams();
  let { locale } = useLoaderData<typeof loader>();

  useChangeLanguage(locale as string);

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

let MainApp = App;
if (process.env.NODE_ENV === "development") {
  noop();
} else {
  MainApp = App;
}

export default MainApp;
