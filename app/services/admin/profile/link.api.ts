import { forkJoin, from, lastValueFrom, map, of, switchMap } from "rxjs";

import { getTokenUserIdByArgs } from "@/libs/jose";
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import {
  createLink$,
  deleteLinkByIds$,
  readLinkById$,
  readLinkCount$,
  readLinkListByCategoryId$,
  updateLink$,
} from "@/dals/profile/link";
import { getSearchParams } from "~/utils/server";

export async function readLinkByIdService(args: LoaderFunctionArgs) {
  const result$ = of(Number(args.params.id)).pipe(
    switchMap((id) => readLinkById$(id)),
  );

  const result = await lastValueFrom(result$);
  return result;
}

export async function readLinkListService(args: LoaderFunctionArgs) {
  const result$ = forkJoin({
    payload: getTokenUserIdByArgs(args),
    page: of(Number(getSearchParams(args.request, "page") ?? 1)),
    pageSize: of(Number(getSearchParams(args.request, "pageSize") ?? 10)),
    categoryId: of(Number(getSearchParams(args.request, "category"))),
  })
    .pipe(
      map((data) => ({
        ...data,
        userId: data.payload.userId,
        categoryId: data.categoryId,
      })),
    )
    .pipe(
      switchMap((data) => {
        return forkJoin({
          list: readLinkListByCategoryId$(data),
          count: readLinkCount$(),
        });
      }),
    );

  return lastValueFrom(result$);
}

export async function createLinkService(args: ActionFunctionArgs) {
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
    .pipe(switchMap((data) => createLink$(data)));

  return lastValueFrom(result$);
}

export async function deleteLinkService({ request }: ActionFunctionArgs) {
  const result$ = from(request.json()).pipe(
    switchMap(({ ids }) => deleteLinkByIds$(ids)),
  );

  return lastValueFrom(result$);
}

export async function updateLinkService(args: ActionFunctionArgs) {
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
    .pipe(switchMap((data) => updateLink$(data)));

  return lastValueFrom(result$);
}
