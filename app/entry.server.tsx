// types
import type { EntryContext } from "@remix-run/node";

// core
import { useState } from "react";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

// node
import { resolve } from "node:path";

// components
import { ConfigProvider } from "antd";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";

// context
import SettingContext from "./settingContext";
import { ServerStyleSheet } from "styled-components";

// i18n
import i18n from "./i18n";
import i18next from "./i18next.server";
import Backend from "i18next-fs-backend";
import { createInstance } from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const cache = createCache();

  const instance = createInstance();
  const lng = await i18next.getLocale(request);
  const ns = i18next.getRouteNamespaces(remixContext);

  await instance
    .use(initReactI18next)
    .use(Backend)
    .init({
      ...i18n,
      lng,
      ns,
      backend: { loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json") },
    });

  function MainApp() {
    const [lang, setLang] = useState("zh");
    const [theme, setTheme] = useState({
      colorPrimary: "#00b96b",
      layout: "mix",
    });

    return (
      <I18nextProvider i18n={instance}>
        <SettingContext.Provider value={{ theme, setTheme, lang, setLang }}>
          <StyleProvider cache={cache}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: theme.colorPrimary,
                },
              }}
            >
              <RemixServer context={remixContext} url={request.url} />
            </ConfigProvider>
          </StyleProvider>
        </SettingContext.Provider>
      </I18nextProvider>
    );
  }
  const sheet = new ServerStyleSheet();

  let markup = renderToString(sheet.collectStyles(<MainApp />));

  // antd theme // styled-components
  const styleText = extractStyle(cache);
  const styles = sheet.getStyleTags();

  // replace
  markup = markup.replace("__STYLES__", styles);
  markup = markup.replace("__ANTD__", styleText);

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
