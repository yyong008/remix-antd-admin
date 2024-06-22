import * as ls from "./loaders";
import type * as tn from "@remix-run/node";
import * as us from "~/utils/server";

class L {
  static async loader(args: tn.LoaderFunctionArgs) {
    try {
      return L.loaderImpl(args);
    } catch (error) {
      return us.rfj();
    }
  }

  static async loaderImpl(args: tn.LoaderFunctionArgs) {
    const result = await ls.query(args);
    return result;
  }
}

export const loader = L.loader;
