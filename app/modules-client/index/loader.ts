import * as rj from "@/utils/server/response-json";

import type { LoaderFunctionArgs } from "@remix-run/node";
import { defaultLang } from "@/config/lang";
import { redirect } from "@remix-run/node";

export const loader = async (args: LoaderFunctionArgs) => {
  try {
    const { lang = defaultLang } = args.params;
    if (!args?.params?.lang) {
      return redirect(`/${lang}/`);
    }
    return null;
  } catch (error) {
    return rj.rfj();
  }
};
