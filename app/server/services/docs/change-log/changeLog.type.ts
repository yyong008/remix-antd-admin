// types
import type { Prisma } from "@prisma/client";
import type { Observable } from "rxjs";
import type { TPage } from "~/types";

export interface IChangeLog {
  findChangeLogsByPage$(name: TPage): Observable<any[]>;
  createChangeLog$(data: Prisma.ChangeLogCreateArgs): Observable<any>;
  updateChangeLogById$(data: Prisma.ChangeLogUpdateArgs): Observable<any>;
  deleteChangeLogByIds$(ids: Prisma.ChangeLogDeleteManyArgs): Observable<any>;
  getChangeLogCount$(): Observable<any>;
}
