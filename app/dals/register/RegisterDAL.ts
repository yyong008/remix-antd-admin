import { eq } from "drizzle-orm";
import { db } from "@/libs/neon";
import { userRoles, user } from "db/schema";
import { auth } from "~/libs/auth/server";

class RegisterDAL {
	registerRole = [3];

	/**
	 * 注册
	 * @param data
	 * @returns
	 */
	async register(data: { username: string; email?: string; password: string }) {
		return db.transaction(async (tx) => {
			const roles = this.registerRole;
			const email = (data.email ?? data.username).toLowerCase();
			// @ts-expect-error - better-auth endpoint typing is stricter than server usage
			await auth.api.signUpEmail({
				body: {
					name: data.username,
					email,
					password: data.password,
				},
			});
			const created = await tx
				.select()
				.from(user)
				.where(eq(user.email, email))
				.limit(1);
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

export const registerDAL = new RegisterDAL();
