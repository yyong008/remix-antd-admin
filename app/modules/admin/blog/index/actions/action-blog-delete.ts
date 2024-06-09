import type * as rrn from "@remix-run/node";

import { from, lastValueFrom, map, switchMap } from "rxjs";

import { deleteManyBlogByIds$ } from "~/services/blog/blog";

export async function actionBlogDelete({ request }: rrn.ActionFunctionArgs) {
  const result$ = from(request.json())
    .pipe(map((data) => data.data))
    .pipe(switchMap(({ ids }) => deleteManyBlogByIds$(ids)));

  return await lastValueFrom(result$);
}
