/**
 * Optional helper: create a better-auth–compatible email/password user (same as POST /sign-up/email).
 * Not used by `pnpm db:seed:local` — create accounts in the app UI. Import from a one-off script if needed.
 *
 * @see better-auth `sign-up.mjs` — `linkAccount({ providerId: "credential", accountId: createdUser.id, password: hash })`
 */
import { and, eq } from "drizzle-orm";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { hashPassword } from "better-auth/crypto";

import { account, user } from "../../schema/auth";
import { userRoles } from "../../schema/system";

export type CredentialSeedUser = {
  email: string;
  password: string;
  name: string;
  nickname?: string;
  /** `sys_role.id` */
  roleId: string;
};

export async function seedCredentialUserIfMissing(
  db: LibSQLDatabase<any>,
  seed: CredentialSeedUser,
): Promise<{ userId: string; created: boolean }> {
  const email = seed.email.toLowerCase();
  const existing = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, email))
    .limit(1);
  const now = new Date();

  if (existing[0]) {
    const userId = existing[0].id;
    await ensureUserRole(db, userId, seed.roleId, now);
    return { userId, created: false };
  }

  const userId = crypto.randomUUID();
  const passwordHash = await hashPassword(seed.password);

  await db.insert(user).values({
    id: userId,
    name: seed.name,
    email,
    emailVerified: true,
    image: null,
    createdAt: now,
    updatedAt: now,
    nickname: seed.nickname ?? seed.name,
    locale: "en-US",
    theme: "light",
  });

  await db.insert(account).values({
    id: crypto.randomUUID(),
    accountId: userId,
    providerId: "credential",
    userId,
    password: passwordHash,
    createdAt: now,
    updatedAt: now,
  });

  await ensureUserRole(db, userId, seed.roleId, now);

  return { userId, created: true };
}

async function ensureUserRole(db: LibSQLDatabase<any>, userId: string, roleId: string, now: Date) {
  const existing = await db
    .select({ id: userRoles.id })
    .from(userRoles)
    .where(and(eq(userRoles.userId, userId), eq(userRoles.roleId, roleId)))
    .limit(1);
  if (existing.length) return;

  await db.insert(userRoles).values({
    id: crypto.randomUUID(),
    userId,
    roleId,
    createdAt: now,
    updatedAt: now,
  });
}
