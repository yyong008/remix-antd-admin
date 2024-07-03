import type * as rrn from "@remix-run/node";
import * as toolsMailServices from "~/dals/tools/mail";
import * as utils from "~/utils/server";

import { forkJoin, lastValueFrom, map, switchMap } from "rxjs";

export async function query(args: rrn.LoaderFunctionArgs) {
  const result$ = forkJoin({
    page: utils.getSearchParams$(args.request, "page"),
    pageSize: utils.getSearchParams$(args.request, "pageSize"),
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

  return lastValueFrom(result$);
}
