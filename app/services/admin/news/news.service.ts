import { forkJoin, from, lastValueFrom, map, of, switchMap } from "rxjs";

import { getTokenUserIdByArgs } from "@/libs/jose";
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";

import { getSearchParams } from "@/utils/server";
import {
  createNews$,
  deleteNewsByIds$,
  getNewsById$,
  getNewsByPage$,
  getNewsCount$,
  updateNews$,
} from "@/dals/news/news";

export async function readNewsService(args: LoaderFunctionArgs) {
  const result$ = of(Number(args.params.id)).pipe(
    switchMap((id) => getNewsById$(id)),
  );

  const result = await lastValueFrom(result$);
  return result;
}

export async function readNewsListService(args: LoaderFunctionArgs) {
  const { request } = args;
  const result$ = forkJoin({
    payload: getTokenUserIdByArgs(args),
    category: of(Number(getSearchParams(request, "category"))),
    page: of(Number(getSearchParams(request, "page"))) || 1,
    pageSize: of(Number(getSearchParams(request, "pageSize"))) || 10,
  })
    .pipe(
      map((data) => ({
        ...data,
        userId: data.payload.userId,
      })),
    )
    .pipe(
      switchMap((data) => {
        return forkJoin({
          list: getNewsByPage$(data),
          count: getNewsCount$(),
        });
      }),
    );

  return lastValueFrom(result$);
}

export async function createNewsService(args: ActionFunctionArgs) {
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
    .pipe(switchMap((data) => createNews$(data)));

  return lastValueFrom(result$);
}

export async function deleteNewsService({ request }: ActionFunctionArgs) {
  const result$ = from(request.json()).pipe(
    switchMap(({ ids }) => deleteNewsByIds$(ids)),
  );

  return lastValueFrom(result$);
}

export async function updateNewsService(args: ActionFunctionArgs) {
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
    .pipe(switchMap((data) => updateNews$(data)));

  return lastValueFrom(result$);
}
