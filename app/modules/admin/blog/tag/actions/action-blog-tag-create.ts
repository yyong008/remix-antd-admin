import * as blogTagServices from "~/services/blog/blog-tags";
import type * as rrn from "@remix-run/node";
import * as sessionServices from "~/lib/session";

import { forkJoin, lastValueFrom, switchMap } from "rxjs";

export async function actionBlogTagCreate({ request }: rrn.ActionFunctionArgs) {
  const result$ = forkJoin({
    data: request.json(),
    userId: sessionServices.getUserId$(request),
  }).pipe(switchMap((data) => blogTagServices.createBlogTag$(data)));

  return lastValueFrom(result$);
}
