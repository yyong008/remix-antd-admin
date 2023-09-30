import { resolve } from "node:path";

import Backend from "i18next-http-backend";
import { createInstance }  from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";

import i18n from "./i18n";
import i18nServer from './i18next.server';

export async function startServerI18n(request, remixContext) {
  let instance = createInstance();
  let lng = await i18nServer.getLocale(request);
  let ns = i18nServer.getRouteNamespaces(remixContext);

  await instance
    .use(initReactI18next) // Tell our instance to use react-i18next
    .use(Backend) // Setup our backend
    .init({
      ...i18n, // spread the configuration
      lng, // The locale we detected above
      ns, // The namespaces the routes about to render wants to use
      backend: { loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json") },
    });

  return instance;
}

export const I18nextProviderWrap = ({ children, i18next }: any) => {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
}
