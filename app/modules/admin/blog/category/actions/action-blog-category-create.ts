import * as blogCategoryServices from "~/services/blog/blog-category";
import type * as rrn from "@remix-run/node";

import { from, lastValueFrom, map, switchMap } from "rxjs";

export async function actionBlogCategoryCreate(args: rrn.ActionFunctionArgs) {
  const result$ = from(args.request.json())
    .pipe(map((data) => data.data))
    .pipe(
      switchMap((data: any) => blogCategoryServices.createBlogCategory$(data)),
    );

  return await lastValueFrom(result$);
}
