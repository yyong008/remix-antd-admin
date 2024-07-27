import {
  createUser$,
  deleteUserByIds$,
  readUserAllCount$,
  readUserList$,
  updateUserById$,
} from "@/dals/system/user";
import { forkJoin, from, lastValueFrom, of, switchMap } from "rxjs";
import { getSearchParamsPage, getSearchParamsPageSize } from "@/utils/server";

const createOriginParams$ = (args: any) =>
  of({
    page: getSearchParamsPage(args.request),
    pageSize: getSearchParamsPageSize(args.request),
  });

const page$ = (data: any) =>
  forkJoin({
    total: readUserAllCount$(),
    list: readUserList$(data),
  });

const requestDto$ = (args: any) => from(args.request.json());

// services
export const readSystemUserListService = async (args: any) => {
  const result$ = createOriginParams$(args).pipe(switchMap(page$));

  return lastValueFrom(result$);
};

export const createSystemUserService = async (args: any) => {
  const result$ = requestDto$(args).pipe(
    switchMap((data) => createUser$(data)),
  );

  return lastValueFrom(result$);
};

export const updateSystemUserService = async (args: any) => {
  const result$ = requestDto$(args).pipe(
    switchMap((data) => updateUserById$(data)),
  );

  return lastValueFrom(result$);
};

export const deleteSystemUserService = async (args: any) => {
  const result$ = requestDto$(args).pipe(
    switchMap((ids) => deleteUserByIds$(ids as number[])),
  );

  return lastValueFrom(result$);
};
