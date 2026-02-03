import { eq } from "drizzle-orm";
import { db } from "@/libs/neon";
import { user } from "db/schema";

async function getById(id: string) {
	const rows = await db.select().from(user).where(eq(user.id, id)).limit(1);
	return rows[0] ?? null;
}

export const profileAccountDAL = { getById };
