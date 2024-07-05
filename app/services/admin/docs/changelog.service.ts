import { forkJoin, from, lastValueFrom, map, of, switchMap } from "rxjs";

import { getTokenUserIdByArgs } from "@/libs/jose";
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";

import {
  getChangeLogById$,
  getChangeLogCount$,
  getChangeLogByList$,
  createChangeLog$,
  deleteChangeLogByIds$,
  updateChangeLogById$,
} from "~/dals/docs/changelog";

export async function readChangelogService(args: LoaderFunctionArgs) {
  const result$ = of(Number(args.params.id)).pipe(
    switchMap((id) => getChangeLogById$(id)),
  );

  const result = await lastValueFrom(result$);
  return result;
}

export async function readChangelogListService(args: LoaderFunctionArgs) {
  const { params } = args;
  const result$ = forkJoin({
    payload: getTokenUserIdByArgs(args),
    page: of(Number(params?.page ?? 1)),
    pageSize: of(Number(params?.pageSize ?? 10)),
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
          list: getChangeLogByList$(data),
          count: getChangeLogCount$(),
        });
      }),
    );

  return lastValueFrom(result$);
}

export async function createChangelogService(args: ActionFunctionArgs) {
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
    .pipe(switchMap((data) => createChangeLog$(data)));

  return lastValueFrom(result$);
}

export async function deleteChangelogService({ request }: ActionFunctionArgs) {
  const result$ = from(request.json()).pipe(
    switchMap(({ ids }) => deleteChangeLogByIds$(ids)),
  );

  return lastValueFrom(result$);
}

export async function updateChangelogService(args: ActionFunctionArgs) {
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
    .pipe(switchMap((data) => updateChangeLogById$(data)));

  return lastValueFrom(result$);
}
