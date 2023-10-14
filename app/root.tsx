import { LoaderFunctionArgs, type LinksFunction, json } from "@remix-run/node";

// core
import {
  Links,
  LiveReload,
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
import Loading from "./components/FullScreen";

// css
import { cssBundleHref } from "@remix-run/css-bundle";
import globalStyle from "~/styles/global.css";
// import rdtStylesheet from "remix-development-tools/index.css";

// utils/dev-tools
// import { defineClientConfig, withDevTools } from "remix-development-tools";

import { useChangeLanguage } from "remix-i18next";
// i18n
export let handle = { i18n: "common" };

export async function loader({ request, params }: LoaderFunctionArgs) {
  let locale = params.lang;
  return json({ locale });
}

export const links: LinksFunction = () => {
  const _links = [];
  _links.push({
    rel: "stylesheet",
    href: globalStyle,
  });

  if (cssBundleHref) {
    _links.push({ rel: "stylesheet", href: cssBundleHref });
  }

  // if (process.env.NODE_ENV === "development") {
  //   _links.push({
  //     rel: "stylesheet",
  //     href: rdtStylesheet,
  //   });
  // }

  return _links;
};

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
        <ClientOnly fallback={<Loading />}>{() => <Outlet />}</ClientOnly>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
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
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}



let MainApp = App;
if (process.env.NODE_ENV === 'development') {
  // const config = defineClientConfig({});
  // MainApp = withDevTools(App, config);
} else {
  MainApp = App
}

export default MainApp;
