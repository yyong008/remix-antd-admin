import * as serverUtils from "~/utils/server";
import { and, eq, gte, lte } from "drizzle-orm";
import { db } from "@/libs/neon";
import { userSignLogs } from "db/schema";

async function create(data: any) {
	const created = await db.insert(userSignLogs).values(data).returning();
	return created[0];
}

async function getLatestById(id: number) {
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
	create,
	getLatestById,
};
