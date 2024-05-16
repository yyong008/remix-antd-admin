import * as ds from "~/server/decorators";
// import type * as rrn from "@remix-run/node";
import * as serviceUtils from "~/server/utils";

import { getSystemInfo$ } from "~/server/services/common/systemInfo";

class Loader {
  @ds.checkLogin()
  async loader() {
    return serviceUtils.resp$(getSystemInfo$());
  }
}

export const loader = new Loader().loader;
