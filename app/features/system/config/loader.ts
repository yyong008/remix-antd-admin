import * as ds from "~/server/decorators";
import type * as rrn from "@remix-run/node";
import * as serverUtils from "~/server/utils";

class Loader {
  @ds.checkLogin()
  async loader({ request, params }: rrn.LoaderFunctionArgs) {
    return serverUtils.resp([]);
  }
}

export const loader = new Loader().loader;
