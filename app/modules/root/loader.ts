import type * as tn from "@remix-run/node";
import * as us from "~/utils/server";

class L {
  static async loader(args: tn.LoaderFunctionArgs) {
    try {
      return L.loaderImpl(args);
    } catch (e) {
      return us.rfj();
    }
  }

  static async loaderImpl(args: tn.LoaderFunctionArgs) {
    const data = {
      lang: args.params.lang,
    };
    return us.rsj(data);
  }
}

export const loader = L.loader;
