import { forkJoin, from, lastValueFrom, map, switchMap } from "rxjs";
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { getTokenUserIdByArgs } from "@/libs/jose";
import {
  getBlogTagCount$,
  getBlogTagByUserId$,
  createBlogTag$,
  deleteBlogTagByIds$,
  updateBlogTag$,
} from "~/dals/blog";

export async function query(args: LoaderFunctionArgs) {
  const result$ = from(getTokenUserIdByArgs(args))
    .pipe(map(({ userId }) => userId))
    .pipe(
      switchMap((userId) =>
        forkJoin({
          total: getBlogTagCount$(),
          list: getBlogTagByUserId$(userId!),
        }),
      ),
    );

  return await lastValueFrom(result$);
}

export async function actionBlogTagCreate(args: ActionFunctionArgs) {
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
    .pipe(switchMap((data) => createBlogTag$(data)));

  return lastValueFrom(result$);
}

export async function actionBlogTagDelete(args: ActionFunctionArgs) {
  const result$ = from(args.request.json())
    .pipe(map((data) => data.ids))
    .pipe(switchMap((ids) => deleteBlogTagByIds$(ids)));

  return lastValueFrom(result$);
}

export async function actionBlogTagUpdate(args: ActionFunctionArgs) {
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
    .pipe(switchMap((data) => updateBlogTag$(data)));

  return lastValueFrom(result$);
}
