// // cores
// import { startTransition, useState } from "react";
// import { hydrateRoot } from "react-dom/client";
// import { RemixBrowser } from "@remix-run/react";

// // i18n client
// import { startClientI18n, I18nextProviderWrap } from "./i18n/client";
// import SettingContext from "./context/settingContext";

// const hydrate = async () => {
//   const i18next = await startClientI18n();

//   startTransition(() => {
//     function MainApp() {
//       const [theme, setTheme] = useState({
//         colorPrimary: "#00b96b",
//         layout: "mix",
//       });
//       const [lang, setLang] = useState("zh-CN");
//       return (
//         <SettingContext.Provider value={{ theme, setTheme, lang, setLang }}>
//           <I18nextProviderWrap i18next={i18next}>
//             <RemixBrowser />
//           </I18nextProviderWrap>
//         </SettingContext.Provider>
//       );
//     }

//     hydrateRoot(document, <MainApp />);
//   });
// };

// if (typeof requestIdleCallback === "function") {
//   if (process.env.NODE_ENV === "development") {
//     // ts-ignore
//     // import("remix-development-tools").then(({ initClient }: any) => {
//     //   // Add all the dev tools props here into the client
//     //   initClient?.();
//     // });
//   }
//   requestIdleCallback(hydrate);
// } else {
//   if (process.env.NODE_ENV === "development") {
//     // ts-ignore
//     // import("remix-development-tools").then(({ initClient }: any) => {
//     //   // Add all the dev tools props here into the client
//     //   initClient?.();
//     // });
//   }
//   setTimeout(hydrate, 1);
// }

import { RemixBrowser } from "@remix-run/react";
import { startTransition, useState } from "react";
import { hydrateRoot } from "react-dom/client";

import { getInitialNamespaces } from "remix-i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18nConfig from "~/i18n/i18n";

import i18next from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import SettingContext from "~/context/settingContext";

await i18next
  // Use the react-i18next plugin.
  .use(initReactI18next)
  // Setup client-side language detector.
  // @ts-expect-error
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
