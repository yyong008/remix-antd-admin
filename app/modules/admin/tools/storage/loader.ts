import * as clientUtils from "~/utils/client";
import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";
import * as toolsStorageServices from "~/services/tools/storage";
import * as utils from "~/utils/server";

import { forkJoin } from "rxjs";

class Loader {
  @ds.checkLogin()
  async loader({ params, request }: rrn.LoaderFunctionArgs) {
    const { page, pageSize, name } =
      clientUtils.getPaginationByRequest(request);

    const result$ = forkJoin({
      total: toolsStorageServices.storageCount$(),
      dataSource: toolsStorageServices.getStorageList$({
        page,
        pageSize,
        name,
      }),
    });

    return utils.resp$(result$);
  }
}

export const loader = new Loader().loader;
