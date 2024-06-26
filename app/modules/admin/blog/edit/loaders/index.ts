import * as blogServices from "~/services/blog";
import type * as rrn from "@remix-run/node";
import * as sessionServices from "~/libs/session";

import { forkJoin, from, lastValueFrom, of, switchMap } from "rxjs";

export async function query({ request, params }: rrn.LoaderFunctionArgs) {
  const result$ = from(sessionServices.getUserId$(request)).pipe(
    switchMap((userId) => {
      const obj: any = {
        TINYMCE_KEY: of(process.env.TINYMCE_KEY!),
        blogCategory: blogServices.getAllBlogCategory$(),
        blogTag: blogServices.getBlogTagByUserId$(userId!),
      };
      if (params && params.id) {
        obj["blogData"] = blogServices.getBlogById$(Number(params.id));
      }

      return forkJoin(obj);
    }),
  );

  return await lastValueFrom(result$);
}
