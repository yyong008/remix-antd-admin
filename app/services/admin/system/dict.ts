import { forkJoin, lastValueFrom, of, switchMap } from "rxjs";
import { getSearchParamsPage, getSearchParamsPageSize } from "@/utils/server";
import { readDictCount$, readDictList$ } from "@/dals/system/dict";

const createOriginParams$ = (args: any) =>
  of({
    id: args.params.id,
    page: getSearchParamsPage(args.request),
    pageSize: getSearchParamsPageSize(args.request),
  });

const page$ = (data: any) =>
  forkJoin({
    total: readDictCount$(),
    list: readDictList$(data),
  });

// services
export const readSystemDictListService = async (args: any) => {
  const result$ = createOriginParams$(args).pipe(switchMap(page$));

  return lastValueFrom(result$);
};
