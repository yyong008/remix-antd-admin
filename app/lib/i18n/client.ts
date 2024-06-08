// i18n
import i18next from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { getInitialNamespaces } from "remix-i18next/client";

// config
import i18nConfig from "./i18n";

i18next
  // Use the react-i18next plugin.
  .use(initReactI18next)
  // Setup client-side language detector.
  .use(LanguageDetector)
  // Setup backend.
  .use(Backend)
  .init({
    // Spread configuration.
    ...i18nConfig,
    // Detects the namespaces your routes rendered while SSR use
    // and pass them here to load the translations.
    ns: getInitialNamespaces(),
    backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
    detection: {
      // We'll detect the language only server-side with remix-i18next.
      // By using `<html lang>` attribute we communicate to the Client.
      order: ["htmlTag"],
    },
  });

export { I18nextProvider, i18next };
