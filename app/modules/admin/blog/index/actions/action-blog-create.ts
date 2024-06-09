import type * as rrn from "@remix-run/node";

import { from, lastValueFrom, map, switchMap } from "rxjs";

import { createBlog$ } from "~/services/blog/blog";

export async function actionBlogCreate({ request }: rrn.ActionFunctionArgs) {
  const result$ = from(request.json())
    .pipe(map((data) => data.data))
    .pipe(switchMap((data) => createBlog$(data)));

  return await lastValueFrom(result$);
}
