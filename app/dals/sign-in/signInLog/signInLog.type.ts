// types
import type { Observable } from "rxjs";
// prisma
import type { Prisma } from "@prisma/client";
import type { TPage } from "~/types";

export interface IUserSignInLog {
  count$(): any;
  createUserSignInLog$(data: Prisma.LoginlogCreateInput): Observable<any>;
  updateUserSignInLog$(
    data: Prisma.LoginlogUncheckedUpdateInput,
  ): Observable<any>;
  deleteUserSignInLogByIds$(ids: number[]): Observable<any>;
  getUserSignInLogById$(id: number): Observable<any>;
  getUserSignInLogPage$(data: TPage): Observable<any>;
  // 用户今天是否签到
  getUserTodayIsSignInById$(id: number): Observable<any>;
}
