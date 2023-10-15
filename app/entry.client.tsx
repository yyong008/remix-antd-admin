// cores
import { startTransition, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import { RemixBrowser } from "@remix-run/react";

// i18n client
import { startClientI18n, I18nextProviderWrap } from "./i18n/client";
import SettingContext from "./context/settingContext";

const hydrate = async () => {
  const i18next = await startClientI18n();

  startTransition(() => {
    function MainApp() {
      const [theme, setTheme] = useState({
        colorPrimary: "#00b96b",
        layout: "mix",
      });
      const [lang, setLang] = useState("zh-CN");
      return (
        <SettingContext.Provider value={{ theme, setTheme, lang, setLang }}>
          <I18nextProviderWrap i18next={i18next}>
            <RemixBrowser />
          </I18nextProviderWrap>
        </SettingContext.Provider>
      );
    }

    hydrateRoot(document, <MainApp />);
  });
};

if (typeof requestIdleCallback === "function") {
  if (process.env.NODE_ENV === "development") {
    // ts-ignore
    // import("remix-development-tools").then(({ initClient }: any) => {
    //   // Add all the dev tools props here into the client
    //   initClient?.();
    // });
  }
  requestIdleCallback(hydrate);
} else {
  if (process.env.NODE_ENV === "development") {
    // ts-ignore
    // import("remix-development-tools").then(({ initClient }: any) => {
    //   // Add all the dev tools props here into the client
    //   initClient?.();
    // });
  }
  setTimeout(hydrate, 1);
}
