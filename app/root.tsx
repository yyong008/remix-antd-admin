// type
import type { LinksFunction, LoaderArgs } from "@remix-run/node";

// core
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json } from "@remix-run/node";

// hooks
import { useContext, useEffect } from "react";

// hooks:i18n
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next";

// i18n server
import i18next from "~/i18next.server";

// context
import SettingContext from "./settingContext";

// css
import globalStyle from "./styles/global.css";

export async function loader({ request, params }: LoaderArgs) {
  request.headers.set("Accept-Language", params.lang!);
  let locale = await i18next.getLocale(request);
  return json({ locale });
}

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: globalStyle,
    },
  ];
};

export let handle = { i18n: "common" };

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const { i18n } = useTranslation();
  const { locale } = useLoaderData<typeof loader>();
  const { lang, setLang } = useContext(SettingContext);

  useChangeLanguage(locale);

  useEffect(() => {
    setLang(locale);
  }, [locale, setLang]);

  return (
    <html lang={lang} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <title>{title}</title>
        <Links />
        {typeof document === "undefined" ? "__ANTD__" : null}
        {typeof document === "undefined" ? "__STYLES__" : null}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
