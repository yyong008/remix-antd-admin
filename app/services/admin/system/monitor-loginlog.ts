import { forkJoin, lastValueFrom, of, switchMap } from "rxjs";
import { getSearchParamsPage, getSearchParamsPageSize } from "@/utils/server";
import { readLoginLogCount$, readLoginLogList$ } from "@/dals/system/login-log";

const createOriginParams$ = (args: any) =>
  of({
    page: getSearchParamsPage(args.request),
    pageSize: getSearchParamsPageSize(args.request),
  });

const page$ = (data: any) =>
  forkJoin({
    total: readLoginLogCount$(),
    list: readLoginLogList$(data),
  });

// const requestDto$ = (args: any) => from(args.request.json());

// services
export const readSystemMinitorLoginLogListService = async (args: any) => {
  const result$ = createOriginParams$(args).pipe(switchMap(page$));

  return lastValueFrom(result$);
};
