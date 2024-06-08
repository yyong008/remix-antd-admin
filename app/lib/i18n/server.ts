import { I18nextProvider, initReactI18next } from "react-i18next";

// i18n
import Backend from "i18next-fs-backend";
import { createInstance } from "i18next";
// config
import i18nConfig from "~/lib/i18n/i18n";
import remixI18Next from "~/lib/i18n/i18next.server";
// types
import { resolve } from "node:path";

export const createRemixI18n = async (request: any, remixContext: any) => {
  const i18nInstance = createInstance();
  const lng = await remixI18Next.getLocale(request);
  const ns = remixI18Next.getRouteNamespaces(remixContext);

  await i18nInstance
    .use(initReactI18next) // Tell our instance to use react-i18next.
    .use(Backend) // Setup backend.
    .init({
      ...i18nConfig, // Spread configuration.
      lng, // Locale detected above.
      ns, // Namespaces detected above.
      backend: { loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json") },
    });

  return { I18nextProvider, i18nInstance };
};
