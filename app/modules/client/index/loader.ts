import type * as tn from "@remix-run/node";
import * as us from "~/utils/server";

import { defaultLang } from "~/config";
import { redirect } from "@remix-run/node";

class L {
  static async loader(args: tn.LoaderFunctionArgs) {
    try {
      return L.loaderImpl(args);
    } catch (error) {
      return us.rfj();
    }
  }

  static async loaderImpl(args: tn.LoaderFunctionArgs) {
    const { lang = defaultLang } = args.params;
    if (!args?.params?.lang) {
      return redirect(`/${lang}/`);
    }
    return null;
  }
}

export const loader = L.loader;
