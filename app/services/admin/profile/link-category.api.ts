import { forkJoin, from, lastValueFrom, map, of, switchMap } from "rxjs";

import { getTokenUserIdByArgs } from "@/libs/jose";
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import {
  createLinkCategory$,
  deleteLinkCategoryByIds$,
  getLinkCategoryById$,
  getLinkCategoryCountByUserId$,
  getLinkCategoryListByUserId$,
  updateLinkCategoryById$,
} from "@/dals/profile/link-category";
import { getSearchParams } from "@/utils/server";

export async function readLinkCategoryByIdService(args: LoaderFunctionArgs) {
  const result$ = of(Number(args.params.id)).pipe(
    switchMap((id) => getLinkCategoryById$(id)),
  );

  const result = await lastValueFrom(result$);
  return result;
}

export async function readLinkCategoryListService(args: LoaderFunctionArgs) {
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
      switchMap((data: any) => {
        return forkJoin({
          list: getLinkCategoryListByUserId$(data),
          total: getLinkCategoryCountByUserId$(data.userId),
        });
      }),
    );

  return lastValueFrom(result$);
}

export async function createLinkCategoryService(args: ActionFunctionArgs) {
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
    .pipe(switchMap((data) => createLinkCategory$(data)));

  return lastValueFrom(result$);
}

export async function deleteLinkCategoryService({
  request,
}: ActionFunctionArgs) {
  const result$ = from(request.json()).pipe(
    switchMap((ids) => deleteLinkCategoryByIds$(ids)),
  );

  return lastValueFrom(result$);
}

export async function updateLinkCategoryService(args: ActionFunctionArgs) {
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

    .pipe(switchMap((data) => updateLinkCategoryById$(data)));

  return lastValueFrom(result$);
}
