// types
import type { EntryContext } from "@remix-run/node";

// core
import { useState } from "react";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

// node
import { resolve } from "node:path";

// components
// import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";

// context
// import { ProConfigProvider } from "@ant-design/pro-components";
// import SettingContext from "./settingContext";
// import { ServerStyleSheet } from "styled-components";

// i18n
import i18n from "./i18n";
import i18next from "./i18next.server";
import Backend from "i18next-fs-backend";
import { createInstance } from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export default async function createI18nIns(
  request: Request,
  remixContext: EntryContext
) {
  const instance = createInstance();
  const lng = await i18next.getLocale(request);
  const ns = i18next.getRouteNamespaces(remixContext);

  await instance
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)
    .init({
      ...i18n,
      lng,
      ns,
      backend: { loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json") },
      detection: {
        order: ["htmlTag"],
        caches: [],
      },
    });

  return instance;
}
