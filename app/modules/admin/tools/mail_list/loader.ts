import * as ds from "~/decorators";
import type * as rrn from "@remix-run/node";
import * as toolsMailServices from "~/services/tools/mail";
import * as utils from "~/utils/server";

import { forkJoin, map, switchMap } from "rxjs";

class Loader {
  @ds.checkLogin()
  async loader({ request }: rrn.LoaderFunctionArgs) {
    const result$ = forkJoin({
      page: utils.getSearchParams$(request, "page"),
      pageSize: utils.getSearchParams$(request, "pageSize"),
    }).pipe(
      map((data) => ({
        page: Number(data.page ?? 1),
        pageSize: Number(data.pageSize ?? 10),
      })),
      switchMap((data) =>
        forkJoin({
          total: toolsMailServices.count$(),
          list: toolsMailServices.getEmailTemplatePage$(data),
        }),
      ),
    );
    return utils.resp$(result$);
  }
}

export const loader = new Loader().loader;
