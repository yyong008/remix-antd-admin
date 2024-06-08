// i18n
import { I18nextProvider, i18next } from "~/lib/i18n/client";
import { startTransition, useState } from "react";

import { RemixBrowser } from "@remix-run/react";
import { SettingContext } from "~/context";
import { hydrateRoot } from "react-dom/client";

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
