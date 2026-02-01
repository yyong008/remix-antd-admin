import type { TRegister } from "~/schema/login.schema";
import { db } from "@/libs/neon";
import { userRoles, users } from "db/schema";

class RegisterDAL {
	registerRole = [3];

	/**
	 * 注册
	 * @param data
	 * @returns
	 */
	async register(data: Exclude<TRegister, "passwordRe">) {
		return db.transaction(async (tx) => {
			const roles = this.registerRole;
			const created = await tx
				.insert(users)
				.values({
					name: data.username,
					password: data.password,
				})
				.returning();
			const user = created[0];
			if (!user?.id) {
				throw new Error("create user fail");
			}
			if (roles?.length) {
				await tx.insert(userRoles).values(
					roles.map((roleId: number) => ({
						roleId,
						userId: user.id,
					})),
				);
			}
			return user;
		});
	}
}

export const registerDAL = new RegisterDAL();
