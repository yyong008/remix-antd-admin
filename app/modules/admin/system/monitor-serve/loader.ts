import * as ds from "~/decorators";
// import type * as rrn from "@remix-run/node";
import * as serviceUtils from "~/utils/server";

import { getSystemInfo$ } from "~/lib/systemInfo";

class Loader {
  @ds.checkLogin()
  async loader() {
    return serviceUtils.resp$(getSystemInfo$());
  }
}

export const loader = new Loader().loader;
