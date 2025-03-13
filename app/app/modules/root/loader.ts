import type * as tn from "react-router";
import { data, redirect } from "react-router";
import { langs, defaultLang } from "~/config/lang";

export const loader = (args: tn.LoaderFunctionArgs) => {
  const { lang } = args.params;
  const url = new URL(args.request.url);
  if (!lang) {
    if (
      !url.pathname.startsWith("/public") &&
      !url.pathname.startsWith("/api") &&
      !url.pathname.startsWith("/images")
    ) {
      return redirect(`/${defaultLang}${url.pathname}`);
    }
  } else {
    if (!langs.includes(lang)) {
      throw data("Not Lang Found", {
        status: 404,
        statusText: "Not found",
      });
    }
  }
  return {
    lang: args.params.lang,
  };
};
