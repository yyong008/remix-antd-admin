// react
import { startTransition, useState } from "react";
import { hydrateRoot } from "react-dom/client";

// remix
import { RemixBrowser } from "@remix-run/react";

// i18n
import i18nConfig from "~/i18n/i18n";
import i18next from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { getInitialNamespaces } from "remix-i18next/client";

// context
import SettingContext from "~/context/settingContext";

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

const AppClient = () => {
  const [theme, setTheme] = useState({
    colorPrimary: "#00b96b",
    layout: "mix",
  });
  const [lang, setLang] = useState("zh-CN");
  return (
    <SettingContext.Provider value={{ theme, setTheme, lang, setLang }}>
      <I18nextProvider i18n={i18next}>
        <RemixBrowser />
      </I18nextProvider>
    </SettingContext.Provider>
  );
};

startTransition(() => {
  hydrateRoot(
    document,
    // @ts-ignore
    <AppClient />,
  );
});
