import type * as rrn from "@remix-run/node";

import { from, lastValueFrom, map, switchMap } from "rxjs";

import { updateBlog$ } from "~/services/blog/blog";

export async function actionBlogUpdate({ request }: rrn.ActionFunctionArgs) {
  const result$ = from(request.json())
    .pipe(map((data) => data.data))
    .pipe(switchMap((data) => updateBlog$(data)));

  return await lastValueFrom(result$);
}
