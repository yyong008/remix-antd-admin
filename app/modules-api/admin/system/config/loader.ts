import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";
import * as serverUtils from "~/utils/server";

class Loader {
  @ds.authorize()
  async loader({ request, params }: rrn.LoaderFunctionArgs) {
    return serverUtils.resp([]);
  }
}

export const loader = new Loader().loader;
