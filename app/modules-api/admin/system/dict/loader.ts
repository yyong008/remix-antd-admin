import * as ds from "~/decorators";
// import type * as rrn from "@remix-run/node";
import * as serverUtils from "~/utils/server";
import * as systemDictServices from "~/dals/system/dict";

import { from } from "rxjs";

class Loader {
  @ds.authorize()
  async loader() {
    const result$ = from(systemDictServices.getDictList());
    return serverUtils.resp$(result$);
  }
}

export const loader = new Loader().loader;
