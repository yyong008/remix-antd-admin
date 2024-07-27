import {
  createDept$,
  deleteDeptByIds$,
  readDeptCount$,
  readDeptList$,
  updateDeptById$,
} from "@/dals/system/dept";
import { forkJoin, from, lastValueFrom, map, of, switchMap } from "rxjs";
import { getSearchParamsPage, getSearchParamsPageSize } from "@/utils/server";

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
    total: readDeptCount$(),
    list: readDeptList$(data),
  });

const listToTree$ = (data: any) => ({
  ...data,
  list: buildDeptListToTree(data.list, null),
});

const requestDto$ = (args: any) => from(args.request.json());

// services
export const readSystemDeptListService = async (args: any) => {
  const result$ = createOriginParams$(args)
    .pipe(switchMap(page$))
    .pipe(map(listToTree$));

  return lastValueFrom(result$);
};

export const createSystemDeptService = async (args: any) => {
  const result$ = requestDto$(args).pipe(
    switchMap((data) => createDept$(data)),
  );

  return lastValueFrom(result$);
};

export const updateSystemDeptService = async (args: any) => {
  const result$ = requestDto$(args).pipe(
    switchMap((data) => updateDeptById$(data)),
  );

  return lastValueFrom(result$);
};

export const deleteSystemDeptService = async (args: any) => {
  const result$ = requestDto$(args).pipe(
    switchMap((ids) => deleteDeptByIds$(ids)),
  );

  return lastValueFrom(result$);
};
