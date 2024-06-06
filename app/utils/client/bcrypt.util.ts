import sha256 from "crypto-js/sha256";

/**
 * 生成 hash
 * @param passwordInput {String} 输入密码
 * @returns {String} 返回 hasded 密码
 */
export function genHashedPassword(passwordInput: string) {
  const hashedPassword = sha256(passwordInput).toString();
  return hashedPassword;
}
