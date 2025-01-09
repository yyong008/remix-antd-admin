import Backend from "i18next-fs-backend/cjs";
import { RemixI18Next } from "remix-i18next/server";
import i18nConfig from "./i18n";
import { resolve } from "node:path";

const remixI18Next = new RemixI18Next({
  detection: {
    supportedLanguages: i18nConfig.supportedLngs,
    fallbackLanguage: i18nConfig.fallbackLng,
  },
  i18next: {
    ...i18nConfig,
    backend: {
      loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
    },
  },
  plugins: [Backend],
});

export default remixI18Next;
