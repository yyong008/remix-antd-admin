import type { Context } from "hono";
import { drizzle } from "drizzle-orm/d1";
import type { DrizzleD1Database } from "drizzle-orm/d1";

export function getD1Db(c: Context): DrizzleD1Database {
  const db = c.env.DB;
  if (!db) {
    throw new Error("D1 database not found in env");
  }
  return drizzle(db);
}
