import { drizzle } from "drizzle-orm/libsql";

export function getDb(env: { DB: string }) {
  return drizzle(env.DB);
}
