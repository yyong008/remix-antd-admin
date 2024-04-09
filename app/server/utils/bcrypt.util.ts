import crypto from "crypto";

/**
 * hash 密码
 * @param password
 * @returns
 */
export function hashPassword(password: string) {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}
/**
 * 对比密码
 * @param dtoPassword
 * @param dbPassword
 * @returns
 */
export function comparePassword(dtoPassword: string, dbPassword: string) {
  return hashPassword(dtoPassword) === dbPassword;
}
