import { it, expect, describe } from "vitest";
import { comparePassword, hashPassword } from "~/server/utils/bcrypt.util";

describe("bcrypt util", () => {
  const pwd = "123456789abcdefghijgklmnopqrstuvwxyz";
  let hashed = "";
  it("test hash pwd type and length greater than 1", () => {
    hashed = hashPassword(pwd);
    expect(typeof hashed).toBe("string");
    expect(hashed.length).toBeGreaterThan(1);
  });

  it("test hash compare password to equal", () => {
    const hasheded = hashPassword(hashed);
    expect(comparePassword(hashPassword(pwd), hasheded)).toBe(true);
  });
});
