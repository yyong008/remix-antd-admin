import * as blogTagServices from "~/services/blog/blog-tags";
import type * as rrn from "@remix-run/node";
import * as sessionServices from "~/lib/session";

import { lastValueFrom, switchMap } from "rxjs";

export async function query({ request }: rrn.LoaderFunctionArgs) {
  const result$ = sessionServices
    .getUserId$(request)
    .pipe(switchMap((userId) => blogTagServices.getBlogTagByUserId$(userId!)));

  return await lastValueFrom(result$);
}
