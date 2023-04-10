// core
import { resolve } from "node:path";

// utils
import Backend from "i18next-fs-backend";
import { RemixI18Next } from "remix-i18next";

// config
import i18n from "~/i18n";

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
