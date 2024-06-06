import * as ds from "~/server/decorators";
// import type * as rrn from "@remix-run/node";
import * as serverUtils from "~/server/utils";
import * as systemDeptServices from "~/server/services/system/dept";

import { from } from "rxjs";

class Loader {
  @ds.checkLogin()
  async loader() {
    const result$ = from(systemDeptServices.getDeptListTree());
    return serverUtils.resp$(result$);
  }
}

export const loader = new Loader().loader;
