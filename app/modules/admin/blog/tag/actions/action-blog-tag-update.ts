import * as blogTagServices from "~/services/blog/blog-tags";
import type * as rrn from "@remix-run/node";
import * as sessionServices from "~/lib/session";

import { forkJoin, from, lastValueFrom, switchMap } from "rxjs";

export async function actionBlogTagUpdate({ request }: rrn.ActionFunctionArgs) {
  const result$ = forkJoin({
    data: from(request.json()),
    userId: sessionServices.getUserId$(request),
  }).pipe(
    switchMap(({ data, userId }) =>
      blogTagServices.updateBlogTag$({
        ...data,
        userId,
      }),
    ),
  );

  return lastValueFrom(result$);
}
