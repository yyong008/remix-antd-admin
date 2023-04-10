// cores
import { startTransition, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import { RemixBrowser } from "@remix-run/react";

// components and others
import { createCache, StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";

// i18n
import i18n from "./i18n";
import i18next from "i18next";
import Backend from "i18next-http-backend";
import { getInitialNamespaces } from "remix-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { I18nextProvider, initReactI18next } from "react-i18next";

// context
import SettingContext from "./settingContext";

const hydrate = async () => {
  await i18next
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

  startTransition(() => {
    const cache = createCache();

    function MainApp() {
      const [theme, setTheme] = useState({
        colorPrimary: "#00b96b",
        layout: "mix",
      });
      const [lang, setLang] = useState("zh");
      return (
        <I18nextProvider i18n={i18next}>
          <SettingContext.Provider value={{ theme, setTheme, lang, setLang }}>
            <StyleProvider cache={cache}>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: theme.colorPrimary,
                  },
                }}
              >
                <RemixBrowser />
              </ConfigProvider>
            </StyleProvider>
          </SettingContext.Provider>
        </I18nextProvider>
      );
    }

    hydrateRoot(document, <MainApp />);
  });
};

if (typeof requestIdleCallback === "function") {
  requestIdleCallback(hydrate);
} else {
  setTimeout(hydrate, 1);
}
