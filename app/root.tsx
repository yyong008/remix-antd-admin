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
} from "@remix-run/react";
import { json } from "@remix-run/node";
import ClientOnlyWrap from "./components/ClientOnlyWrap";
// hooks
import { useContext, useEffect } from "react";

// hooks:i18n
import { useTranslation } from "react-i18next";
// import { useChangeLanguage } from "remix-i18next";
import { useChangeLanguage } from "./hooks/useChangeLanuage";

// i18n server
import i18next from "~/i18n/i18next.server";

// context
import SettingContext from "./settingContext";

// css
import globalStyle from "./styles/global.css";

export async function loader({ request, params, ...p }: LoaderArgs) {
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

export default function App() {
  const { i18n } = useTranslation();
  const { lang } = useContext(SettingContext);

  useChangeLanguage(lang);
  return (
    <html lang={lang} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        {typeof document === "undefined" ? "__ANTD__" : null}
        {typeof document === "undefined" ? "__STYLES__" : null}
      </head>
      <body>
        <ClientOnlyWrap>
          <Outlet />
        </ClientOnlyWrap>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
