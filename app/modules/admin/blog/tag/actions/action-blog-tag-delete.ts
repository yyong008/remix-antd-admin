import * as blogTagServices from "~/services/blog/blog-tags";
import type * as rrn from "@remix-run/node";

import { from, lastValueFrom, switchMap } from "rxjs";

export async function actionBlogTagDelete({ request }: rrn.ActionFunctionArgs) {
  const result$ = from(request.json()).pipe(
    switchMap(({ ids }) => blogTagServices.deleteBlogTagByIds$(ids)),
  );

  return lastValueFrom(result$);
}
