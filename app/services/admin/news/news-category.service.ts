import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { forkJoin, from, lastValueFrom, map, of, switchMap } from "rxjs";

import { getTokenUserIdByArgs } from "@/libs/jose";
import {
  createNewsCategory$,
  deleteNewsCategoryByIds$,
  getNewsCategoryById$,
  getNewsCategoryByPage$,
  getNewsCategoryCount$,
  updateNewsCategory$,
} from "@/dals/news/news-category";

export async function readNewsCategoryByIdService(args: LoaderFunctionArgs) {
  const result$ = of(Number(args.params.id)).pipe(
    switchMap((id) => getNewsCategoryById$(id)),
  );

  return await lastValueFrom(result$);
}

export async function readNewsCategoryListService(args: LoaderFunctionArgs) {
  const result$ = of({
    page: args.params?.page,
    pageSize: args.params?.pageSize,
  })
    .pipe(
      map(({ page, pageSize }) => ({
        page: +(page ?? 1),
        pageSize: +(pageSize || 10),
      })),
    )
    .pipe(
      switchMap((data) =>
        forkJoin({
          total: getNewsCategoryCount$(),
          list: getNewsCategoryByPage$(data),
        }),
      ),
    );

  return await lastValueFrom(result$);
}

export async function newsCategoryCreateService(args: ActionFunctionArgs) {
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
    .pipe(switchMap((data: any) => createNewsCategory$(data)));

  return await lastValueFrom(result$);
}

export async function newsCategoryDeleteService(args: ActionFunctionArgs) {
  const result$ = from(args.request.json())
    .pipe(
      map((data: { ids: number[] }) => {
        return data.ids;
      }),
    )
    .pipe(switchMap((ids: any) => deleteNewsCategoryByIds$(ids)));

  return await lastValueFrom(result$);
}

export async function newsCategoryUpdateService(args: ActionFunctionArgs) {
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
        return updateNewsCategory$(data);
      }),
    );

  return lastValueFrom(result$);
}
