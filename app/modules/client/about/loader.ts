import * as ds from "~/decorators";
import * as ls from "./loaders";
import type * as tn from "@remix-run/node";
import * as us from "~/utils/server";

class L {
  @ds.authorize()
  static async loader(args: tn.LoaderFunctionArgs) {
    try {
      return L.loaderImpl(args);
    } catch (error) {
      return us.rfj();
    }
  }

  static async loaderImpl(args: tn.LoaderFunctionArgs) {
    const result = await ls.query(args);
    return us.rsj(result);
  }
}

export const loader = L.loader;
