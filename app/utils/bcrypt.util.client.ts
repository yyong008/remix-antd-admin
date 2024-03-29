import sha256 from "crypto-js/sha256";

export function genHashedPassword(passwordInput: string) {
  const hashedPassword = sha256(passwordInput).toString();
  return hashedPassword;
}
