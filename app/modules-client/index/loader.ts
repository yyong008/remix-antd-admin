import * as rj from "@/utils/server/response-json";

import type { LoaderFunctionArgs } from "react-router";
import { defaultLang } from "@/config/lang";
import { redirect } from "react-router";

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
