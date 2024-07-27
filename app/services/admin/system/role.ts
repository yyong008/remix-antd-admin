import {
  createRole$,
  deleteRoleByIds$,
  readAllRoleList$,
  readRoleCount$,
  updateRoleById$,
} from "@/dals/system/role";
import { forkJoin, lastValueFrom, of, switchMap } from "rxjs";

const allPage$ = () =>
  forkJoin({
    total: readRoleCount$(),
    list: readAllRoleList$(),
  });

// services
export const readSystemRoleListService = async (args: any) => {
  const result$ = of(0).pipe(switchMap(() => allPage$()));

  return lastValueFrom(result$);
};

export const createSystemRoleService = async (data: any) => {
  const result$ = of(data).pipe(switchMap((data) => createRole$(data)));

  return lastValueFrom(result$);
};

export const updateSystemRoleService = async (data: any) => {
  const result$ = of(data).pipe(switchMap((data) => updateRoleById$(data)));

  return lastValueFrom(result$);
};

export const deleteSystemRoleService = async (ids: number[]) => {
  const result$ = of(ids).pipe(switchMap((data) => deleteRoleByIds$(data)));

  return lastValueFrom(result$);
};
