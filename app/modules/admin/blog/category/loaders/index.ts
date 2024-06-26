import * as blogCategoryServices from "~/services/blog/blog-category";
import type * as rrn from "@remix-run/node";
import * as sessionServices from "~/libs/session";

import { lastValueFrom, switchMap } from "rxjs";

export async function query(args: rrn.LoaderFunctionArgs) {
  const result$ = sessionServices
    .getUserId$(args.request)
    .pipe(
      switchMap((userId) =>
        blogCategoryServices.getBlogCategoryByUserId$(userId!),
      ),
    );

  return await lastValueFrom(result$);
}
