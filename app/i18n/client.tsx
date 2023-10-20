import { createInstance } from "i18next";

import Backend from "i18next-http-backend";
import { getInitialNamespaces } from "remix-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { I18nextProvider, initReactI18next } from "react-i18next";

import i18n from "./i18n";

export async function startClientI18n() {
  let instance = createInstance();

  await instance
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)
    .init({
      ...i18n,
      ns: getInitialNamespaces(),
      backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
      detection: {
        order: ["htmlTag"],
        caches: [],
      },
    });

  return instance;
}

export const I18nextProviderWrap = ({ children, i18next }: any) => {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};
