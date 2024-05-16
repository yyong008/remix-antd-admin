import * as ds from "~/server/decorators";
// import type * as rrn from "@remix-run/node";
import * as serverUtils from "~/server/utils";
import * as systemDictServices from "~/server/services/system/dict";

import { from } from "rxjs";

class Loader {
  @ds.checkLogin()
  async loader() {
    const result$ = from(systemDictServices.getDictList());
    return serverUtils.resp$(result$);
  }
}

export const loader = new Loader().loader;
