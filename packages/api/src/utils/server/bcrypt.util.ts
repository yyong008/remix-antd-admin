import crypto from "crypto";

class BcryptUtil {
  hashPassword(password: string) {
    const hash = crypto.createHash("sha256");
    hash.update(password);
    return hash.digest("hex");
  }

  comparePassword(dtoPassword: string, dbPassword: string) {
    return this.hashPassword(dtoPassword) === dbPassword;
  }
}

export const bcryptUtil = new BcryptUtil();