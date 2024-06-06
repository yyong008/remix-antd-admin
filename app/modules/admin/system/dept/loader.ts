import * as ds from "~/decorators";
// import type * as rrn from "@remix-run/node";
import * as serverUtils from "~/utils/server";
import * as systemDeptServices from "~/services/system/dept";

import { from } from "rxjs";

class Loader {
  @ds.checkLogin()
  async loader() {
    const result$ = from(systemDeptServices.getDeptListTree());
    return serverUtils.resp$(result$);
  }
}

export const loader = new Loader().loader;
