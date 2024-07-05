import { forkJoin, from, lastValueFrom, map, of, switchMap } from "rxjs";

import { getTokenUserIdByArgs } from "@/libs/jose";
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";

import {
  createFeedback$,
  deleteFeedbackByIds$,
  getFeedBackCount$,
  readFeedbackById$,
  readFeedbackByList$,
  updateFeedbackById$,
} from "@/dals/docs/feedback";

export async function readFeedbackService(args: LoaderFunctionArgs) {
  const result$ = of(Number(args.params.id)).pipe(
    switchMap((id) => readFeedbackById$(id)),
  );

  const result = await lastValueFrom(result$);
  return result;
}

export async function readFeedbackListService(args: LoaderFunctionArgs) {
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
          list: readFeedbackByList$(data),
          count: getFeedBackCount$(),
        });
      }),
    );

  return lastValueFrom(result$);
}

export async function createFeedbackService(args: ActionFunctionArgs) {
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
    .pipe(switchMap((data) => createFeedback$(data)));

  return lastValueFrom(result$);
}

export async function deleteFeedbackService({ request }: ActionFunctionArgs) {
  const result$ = from(request.json()).pipe(
    switchMap(({ ids }) => deleteFeedbackByIds$(ids)),
  );

  return lastValueFrom(result$);
}

export async function updateFeedbackService(args: ActionFunctionArgs) {
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
    .pipe(switchMap((data) => updateFeedbackById$(data)));

  return lastValueFrom(result$);
}
