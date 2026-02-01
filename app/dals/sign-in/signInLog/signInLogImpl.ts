import * as serverUtils from "~/utils/server";
import { and, eq, gte, lte } from "drizzle-orm";
import type { IUserSignInLog } from "./signInLog.type";
import { db } from "@/libs/neon";
import { userSignLogs } from "db/schema";

const createUserSignInLog$ = async (data: any) => {
	return db.insert(userSignLogs).values(data).returning();
};

const getUserTodayIsSignInById$: IUserSignInLog["getUserTodayIsSignInById$"] = (
	id: number,
) => {
	const { startTime, endTime } = serverUtils.getTodayTime();

	return db
		.select()
		.from(userSignLogs)
		.where(
			and(
				eq(userSignLogs.userId, id),
				gte(userSignLogs.signTime, startTime),
				lte(userSignLogs.signTime, endTime),
			),
		)
		.limit(1);
};

export { createUserSignInLog$, getUserTodayIsSignInById$ };

async function createUserSignInLog(data: any) {
	const created = await db.insert(userSignLogs).values(data).returning();
	return created[0];
}

async function getUserTodayUserSignLogById(id: number) {
	const { startTime, endTime } = serverUtils.getTodayTime();

	const rows = await db
		.select()
		.from(userSignLogs)
		.where(
			and(
				eq(userSignLogs.userId, id),
				gte(userSignLogs.signTime, startTime),
				lte(userSignLogs.signTime, endTime),
			),
		)
		.limit(1);
	return rows[0] ?? null;
}

export const signInLog = {
	createUserSignInLog,
	getUserTodayUserSignLogById,
};
