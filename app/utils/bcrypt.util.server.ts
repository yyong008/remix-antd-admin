import crypto from "crypto";

export function hashPassword(password: string) {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}

// 封装密码比较函数
export function comparePassword(dtoPassword: string, dbPassword: string) {
  return hashPassword(dtoPassword) === dbPassword;
}
