import { I18nextProvider, i18next } from "~/libs/i18n/client";
import { startTransition, useState } from "react";

import { HydratedRouter } from "react-router/dom";
import { SettingContext } from "~/context";
import StoreProvider from "./store-provider";
import { hydrateRoot } from "react-dom/client";

const AppClient = () => {
  const [theme, setTheme] = useState({
    colorPrimary: "#00b96b",
    layout: "mix",
  });
  const [lang, setLang] = useState("zh-CN");
  return (
      <SettingContext.Provider value={{ theme, setTheme, lang, setLang }}>
          <HydratedRouter />
      </SettingContext.Provider>
  );
};

async function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      // @ts-ignore
      <AppClient />,
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
