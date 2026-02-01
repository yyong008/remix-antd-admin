import * as serverUtils from "~/utils/server";

import { describe, expect, it } from "vitest";

describe("bcrypt util", () => {
	const pwd = "123456789abcdefghijgklmnopqrstuvwxyz";
	let hashed = "";
	it("test hash pwd type and length greater than 1", () => {
		hashed = serverUtils.hashPassword(pwd);
		expect(typeof hashed).toBe("string");
		expect(hashed.length).toBeGreaterThan(1);
	});

	it("test hash compare password to equal", () => {
		const hasheded = serverUtils.hashPassword(hashed);
		expect(
			serverUtils.comparePassword(serverUtils.hashPassword(pwd), hasheded),
		).toBe(true);
	});
});
