import { eq } from "drizzle-orm";
import { db } from "@/libs/neon";
import { users } from "db/schema";

async function getById(id: number) {
  const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return rows[0] ?? null;
}

export const profileAccountDAL = { getById };
