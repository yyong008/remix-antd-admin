import type { TPage } from "~/types";

export interface IUserSignInLog {
	count$(): any;
	createUserSignInLog$(data: any): Promise<any>;
	updateUserSignInLog$(data: any): Promise<any>;
	deleteUserSignInLogByIds$(ids: number[]): Promise<any>;
	getUserSignInLogById$(id: number): Promise<any>;
	getUserSignInLogPage$(data: TPage): Promise<any>;
	// 用户今天是否签到
	getUserTodayIsSignInById$(id: string): Promise<any>;
}
