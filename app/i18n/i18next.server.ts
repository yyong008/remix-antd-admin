import { resolve } from "node:path";

import Backend from "i18next-fs-backend";
import _RemixI18Next from "remix-i18next";

import i18n from "./i18n"; // your i18n configuration file

const { RemixI18Next } = _RemixI18Next;

let i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
  },
  i18next: {
    ...i18n,
    backend: {
      loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
    },
  },
  backend: Backend,
});

export default i18next;
