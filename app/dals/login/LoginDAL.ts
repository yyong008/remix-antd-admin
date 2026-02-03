import { and, eq } from "drizzle-orm";
import { db } from "@/libs/neon";
import { account, user } from "db/schema";

async function findByUserName(name: string) {
	try {
		const rows = await db
			.select({
				id: user.id,
				name: user.name,
				password: account.password,
				status: user.status,
				email: user.email,
			})
			.from(user)
			.leftJoin(
				account,
				and(eq(account.userId, user.id), eq(account.providerId, "credential")),
			)
			.where(eq(user.name, name))
			.limit(1);
		return rows[0] ?? null;
	} catch (error) {
		console.log(error);
		return null;
	}
}

async function findByEmail(email: string) {
	try {
		const rows = await db
			.select({
				id: user.id,
				name: user.name,
				password: account.password,
				status: user.status,
				email: user.email,
			})
			.from(user)
			.leftJoin(
				account,
				and(eq(account.userId, user.id), eq(account.providerId, "credential")),
			)
			.where(eq(user.email, email))
			.limit(1);
		return rows[0] ?? null;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export const loginDAL = {
	findByUserName,
	findByEmail,
};
