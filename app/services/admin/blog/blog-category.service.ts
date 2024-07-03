import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { forkJoin, from, lastValueFrom, map, switchMap } from "rxjs";
import {
  createBlogCategory$,
  deleteBlogCategoryByIds$,
  getBlogCategoryByUserId$,
  getBlogCategoryCount$,
  updateBlogCategory$,
} from "@/dals/blog/blog-category";

import { getTokenUserIdByArgs } from "@/libs/jose";

export async function query(args: LoaderFunctionArgs) {
  const result$ = from(getTokenUserIdByArgs(args))
    .pipe(map(({ userId }) => userId))
    .pipe(
      switchMap((userId) =>
        forkJoin({
          total: getBlogCategoryCount$(),
          list: getBlogCategoryByUserId$(userId!),
        }),
      ),
    );

  return await lastValueFrom(result$);
}

export async function actionBlogCategoryCreate(args: ActionFunctionArgs) {
  const result$ = forkJoin({
    dto: args.request.json(),
    payload: getTokenUserIdByArgs(args),
  })
    .pipe(
      map((data) => ({
        ...data.dto,
        userId: data.payload.userId,
      })),
    )
    .pipe(switchMap((data: any) => createBlogCategory$(data)));

  return await lastValueFrom(result$);
}

export async function actionBlogCategoryDelete(args: ActionFunctionArgs) {
  const result$ = from(args.request.json())
    .pipe(
      map((data: { ids: number[] }) => {
        return data.ids;
      }),
    )
    .pipe(switchMap((ids: any) => deleteBlogCategoryByIds$(ids)));

  return await lastValueFrom(result$);
}

export async function actionBlogCategoryUpdate(args: ActionFunctionArgs) {
  const result$ = forkJoin({
    dto: args.request.json(),
    payload: getTokenUserIdByArgs(args),
  })
    .pipe(
      map((data) => ({
        ...data.dto,
        userId: data.payload.userId,
      })),
    )
    .pipe(
      switchMap((data: any) => {
        return updateBlogCategory$(data);
      }),
    );

  return lastValueFrom(result$);
}
