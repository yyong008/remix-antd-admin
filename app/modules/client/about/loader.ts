import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";

class Loader {
  @ds.checkLogin()
  async loader({ request, params }: rrn.LoaderFunctionArgs) {
    return null;
  }
}

export const loader = new Loader().loader;
