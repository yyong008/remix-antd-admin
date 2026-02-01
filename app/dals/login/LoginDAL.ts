import { eq } from "drizzle-orm";
import { db } from "@/libs/neon";
import { users } from "db/schema";

async function findByUserName(name: string) {
  try {
    const rows = await db
      .select({
        id: users.id,
        name: users.name,
        password: users.password,
      })
      .from(users)
      .where(eq(users.name, name))
      .limit(1);
    return rows[0] ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const loginDAL = {
  findByUserName,
};
