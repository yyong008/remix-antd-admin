import sha256 from "crypto-js/sha256";

export function genHashedPassword(passwordInput: string) {
  return sha256(passwordInput).toString();
}
