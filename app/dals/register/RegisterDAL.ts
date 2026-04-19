import { eq } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { userRoles, user } from "db/schema";

export function createRegisterDAL(db: DrizzleD1Database) {
  class RegisterDAL {
    registerRole = [3];

    async register(data: { username: string; email?: string; password: string }) {
      return db.transaction(async (tx) => {
        const roles = this.registerRole;
        const email = (data.email ?? data.username).toLowerCase();
        const created = await tx.select().from(user).where(eq(user.email, email)).limit(1);
        const authUser = created[0];
        if (!authUser?.id) {
          throw new Error("create user fail");
        }
        if (roles?.length) {
          await tx.insert(userRoles).values(
            roles.map((roleId: number) => ({
              roleId,
              userId: authUser.id,
            })),
          );
        }
        return authUser;
      });
    }
  }

  return new RegisterDAL();
}

export type RegisterDAL = ReturnType<typeof createRegisterDAL>;
