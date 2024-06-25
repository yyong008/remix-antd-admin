import { SignJWT, jwtVerify } from "jose";

import { type LoaderFunctionArgs } from "@remix-run/node";

const secretKey = process.env.JWT_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any, expTime: string) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expTime)
    .sign(encodedKey);
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Failed to verify", error);
    return null;
  }
}

export async function getTokenUserId(
  args: LoaderFunctionArgs,
): Promise<number | null> {
  const token = args.request.headers.get("Authorization")?.split(" ")[1];
  try {
    const { payload } = await jwtVerify(token!, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload?.userId as number;
  } catch (error) {
    console.error("Failed to verify", error);
    return null;
  }
}

export async function getPayloadByToken(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token!, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Failed to verify: ", error);
    return null;
  }
}

export function signToken(userId: number) {
  return encrypt({ userId }, "15m");
}

export function signRefreshToken(userId: number) {
  return encrypt({ userId }, "7d");
}
