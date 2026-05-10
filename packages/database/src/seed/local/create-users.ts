import { hashPassword } from "better-auth/crypto";
import { drizzle } from "drizzle-orm/libsql";
import { account, user } from "../../schema/auth";
import { userRoles } from "../../schema/system";
import { LOCAL_ROLE_IDS } from "./role-ids";
import { superAdminSeed } from "../users/superadmin";
import { adminSeed } from "../users/admin";
import { userSeed } from "../users/user";

const dbPath = "";

const db = drizzle(dbPath);

async function seedUser(seed: typeof superAdminSeed, roleId: string) {
  const email = seed.email.toLowerCase();
  const now = new Date();

  const existing = db.select({ id: user.id }).from(user).where((u) => u.email.equals(email)).limit(1).all();

  if (existing.length > 0) {
    console.log(`User ${email} already exists, skipping...`);
    return;
  }

  const userId = crypto.randomUUID();
  const passwordHash = await hashPassword(seed.password);

  db.insert(user).values({
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
  }).run();

  db.insert(account).values({
    id: crypto.randomUUID(),
    accountId: userId,
    providerId: "credential",
    userId,
    password: passwordHash,
    createdAt: now,
    updatedAt: now,
  }).run();

  db.insert(userRoles).values({
    id: crypto.randomUUID(),
    userId,
    roleId,
    createdAt: now,
    updatedAt: now,
  }).run();

  console.log(`Created user: ${email} with role ${roleId}`);
}

async function main() {
  console.log("Seeding users...");
  await seedUser(superAdminSeed, LOCAL_ROLE_IDS.superadmin);
  await seedUser(adminSeed, LOCAL_ROLE_IDS.admin);
  await seedUser(userSeed, LOCAL_ROLE_IDS.user);
  console.log("Done!");
}

main();
