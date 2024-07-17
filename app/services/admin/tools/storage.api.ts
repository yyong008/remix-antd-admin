import { forkJoin, from, lastValueFrom, map, of, switchMap } from "rxjs";

import { getTokenUserIdByArgs } from "@/libs/jose";
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";

import { getSearchParams } from "@/utils/server";
import {
  createToolsStorage$,
  deleteToolsStorageByIds$,
  readToolsStorageById$,
  readToolsStorageCount$,
  readToolsStorageList$,
} from "@/dals/tools/storage";

export async function readToolsStorageByIdService(args: LoaderFunctionArgs) {
  const result$ = of(Number(args.params.id)).pipe(
    switchMap((id) => readToolsStorageById$(id)),
  );

  const result = await lastValueFrom(result$);
  return result;
}

export async function readToolsStorageListService(args: LoaderFunctionArgs) {
  const result$ = forkJoin({
    payload: getTokenUserIdByArgs(args),
    page: of(Number(getSearchParams(args.request, "page") ?? 1)),
    pageSize: of(Number(getSearchParams(args.request, "pageSize") ?? 10)),
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
          list: readToolsStorageList$(data),
          total: readToolsStorageCount$(),
        });
      }),
    );

  return lastValueFrom(result$);
}

export async function createToolsStorageService(args: ActionFunctionArgs) {
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
    .pipe(switchMap((data) => createToolsStorage$(data)));

  return lastValueFrom(result$);
}

export async function deleteToolsStorageByIdsService({
  request,
}: ActionFunctionArgs) {
  const result$ = from(request.json()).pipe(
    switchMap(({ ids }) => deleteToolsStorageByIds$(ids)),
  );

  return lastValueFrom(result$);
}
