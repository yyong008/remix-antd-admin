import { forkJoin, from, lastValueFrom, map, of, switchMap } from "rxjs";

import { getTokenUserIdByArgs } from "@/libs/jose";
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";

import { getSearchParams } from "@/utils/server";
import {
  createMailTemplate$,
  readMailTemplateById$,
  readMailTemplateList$,
  readMailTemplateCount$,
  deleteMailTemplateByIds$,
  updateMailTemplate$,
} from "@/dals/tools/mail";

export async function readMailTemplateByIdService(args: LoaderFunctionArgs) {
  const result$ = of(Number(args.params.id)).pipe(
    switchMap((id) => readMailTemplateById$(id)),
  );

  const result = await lastValueFrom(result$);
  return result;
}

export async function readMailTemplateListService(args: LoaderFunctionArgs) {
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
          list: readMailTemplateList$(data),
          count: readMailTemplateCount$(),
        });
      }),
    );

  return lastValueFrom(result$);
}

export async function createMailTemplateService(args: ActionFunctionArgs) {
  const result$ = forkJoin({
    dto: args.request.json(),
  })
    .pipe(
      map((data) => ({
        ...data.dto,
      })),
    )
    .pipe(switchMap((data) => createMailTemplate$(data)));

  return lastValueFrom(result$);
}

export async function deleteMailTemplateService({
  request,
}: ActionFunctionArgs) {
  const result$ = from(request.json()).pipe(
    switchMap(({ ids }) => deleteMailTemplateByIds$(ids)),
  );

  return lastValueFrom(result$);
}

export async function updateMailTemplateService(args: ActionFunctionArgs) {
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
    .pipe(switchMap((data) => updateMailTemplate$(data)));

  return lastValueFrom(result$);
}
