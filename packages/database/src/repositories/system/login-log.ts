import { and, count, desc, eq, inArray, like } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { loginLogs } from "../../schema";

type TPage = {
  page?: number;
  pageSize?: number;
  name?: string;
  role?: string;
};

export async function create(db: DrizzleD1Database, data: any) {
  const created = await db
    .insert(loginLogs)
    .values({
      ...data,
      id: data.id ?? crypto.randomUUID(),
    })
    .returning();
  return created[0];
}

export async function getCount(db: DrizzleD1Database) {
  const rows = await db.select({ count: count() }).from(loginLogs);
  return rows[0]?.count ?? 0;
}

export async function getLoginLogList(db: DrizzleD1Database, data: TPage) {
  const conditions = [] as any[];
  if (data.name) {
    conditions.push(like(loginLogs.name, `%${data.name}%`));
  }
  let query: any = db.select().from(loginLogs);
  if (conditions.length) query = query.where(and(...conditions));
  return (await query
    .orderBy(desc(loginLogs.id))
    .limit(data.pageSize ?? 10)
    .offset(((data.page ?? 1) - 1) * (data.pageSize ?? 10))) as any;
}

export async function getLoginLogLatestByUserId(
  db: DrizzleD1Database,
  userId: string,
) {
  const rows = await db
    .select()
    .from(loginLogs)
    .where(eq(loginLogs.userId, userId))
    .orderBy(desc(loginLogs.id))
    .limit(1);
  return rows[0] ?? null;
}

export async function deleteByIds(db: DrizzleD1Database, ids: string[]) {
  const deleted = await db
    .delete(loginLogs)
    .where(inArray(loginLogs.id, ids))
    .returning({ id: loginLogs.id });
  return { count: deleted.length };
}
