// types
import type * as rrn from "@remix-run/node";

// decorators
import * as ds from "~/server/decorators";

import * as toolsStorageServices from "~/server/services/tools/storage";

// utils
import * as clientUtils from "~/utils";

// rxjs
import { forkJoin, from, switchMap } from "rxjs";

// utils
import * as utils from "~/server/utils";

export class AdminToolsStorageController {
  @ds.Loader
  static async loader({ request, params }: rrn.LoaderFunctionArgs) {}

  @ds.Action
  static async action({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  static async get({ params, request }: rrn.LoaderFunctionArgs) {
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

  @ds.checkLogin()
  static async delete({ params, request }: rrn.LoaderFunctionArgs) {
    const result$ = from(request.json()).pipe(
      switchMap((ids: number[]) =>
        toolsStorageServices.deleteStorageByIds$(ids),
      ),
    );

    return utils.resp$(result$);
  }
}
