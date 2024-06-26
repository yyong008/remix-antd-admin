import type * as rrn from "@remix-run/node";

import { forkJoin, lastValueFrom, of, switchMap } from "rxjs";

import { getBlogCategoryById$ } from "~/services/blog/blog-category";
import { getBlogTagById$ } from "~/services/blog/blog-tags";
import { getBlogsListByIds$ } from "~/services/blog/blog";
import { getSearchParams } from "~/utils/server";
import { getUserId$ } from "~/libs/session";

export async function query({ request }: rrn.LoaderFunctionArgs) {
  const result$ = forkJoin({
    userId: getUserId$(request),
    category: of(Number(getSearchParams(request, "category"))),
    tag: of(Number(getSearchParams(request, "tag"))),
  }).pipe(
    switchMap((data) => {
      return forkJoin({
        dataSource: getBlogsListByIds$(data.userId!, data.category, data.tag),
        category: getBlogCategoryById$(data.category),
        tag: getBlogTagById$(data.tag),
      });
    }),
  );

  return lastValueFrom(result$);
}
