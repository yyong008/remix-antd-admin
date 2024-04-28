// react
import { hydrateRoot } from "react-dom/client";
import { startTransition, useState } from "react";

// remix
import { RemixBrowser } from "@remix-run/react";

// i18n
import { I18nextProvider, i18next } from "~/i18n/client";

// context
import { SettingContext } from "~/context";

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
