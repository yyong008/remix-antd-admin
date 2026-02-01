import type { Observable } from "rxjs";
import type { TPage } from "~/types";

export interface IUserSignInLog {
  count$(): any;
  createUserSignInLog$(data: any): Observable<any>;
  updateUserSignInLog$(data: any): Observable<any>;
  deleteUserSignInLogByIds$(ids: number[]): Observable<any>;
  getUserSignInLogById$(id: number): Observable<any>;
  getUserSignInLogPage$(data: TPage): Observable<any>;
  // 用户今天是否签到
  getUserTodayIsSignInById$(id: number): Observable<any>;
}
