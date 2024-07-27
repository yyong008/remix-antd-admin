import { forkJoin, lastValueFrom, map, of, switchMap } from "rxjs";
import { getSearchParamsPage, getSearchParamsPageSize } from "@/utils/server";
import { readDictCount$, readDictList$ } from "@/dals/system/dict";

const buildDeptListToTree = (items: any[], parentId?: number | null): any =>
  items
    .filter((item) => item.parent_department_id === parentId)
    .map((item) => ({
      ...item,
      children: buildDeptListToTree(items, item.id), // 递归构建子树
    }));

const createOriginParams$ = (args: any) =>
  of({
    page: getSearchParamsPage(args.request),
    pageSize: getSearchParamsPageSize(args.request),
  });

const page$ = (data: any) =>
  forkJoin({
    total: readDictCount$(),
    list: readDictList$(data),
  });

const listToTree$ = (data: any) => ({
  ...data,
  list: buildDeptListToTree(data.list, null),
});

// services
export const readSystemDictItemList = async (args: any) => {
  const result$ = createOriginParams$(args)
    .pipe(switchMap(page$))
    .pipe(map(listToTree$));

  return lastValueFrom(result$);
};
