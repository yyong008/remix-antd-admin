import { type JWTPayload, SignJWT, jwtVerify } from "jose";

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

export async function decrypt(
  token: string,
): Promise<{ error?: any; payload?: JWTPayload | undefined }> {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return { payload };
  } catch (error) {
    console.error("❌ Failed to verify >>", error);
    return { error };
  }
}

export async function getTokenUserIdByArgs(args: LoaderFunctionArgs) {
  const token = args.request.headers.get("Authorization")?.split(" ")[1];
  type ResultType = JWTPayload & { userId: number; error: any };
  try {
    const { payload } = await jwtVerify(token!, encodedKey, {
      algorithms: ["HS256"],
    });
    return { ...payload } as ResultType;
  } catch (error) {
    console.error("❌ Failed to verify >>", error);
    return { error } as ResultType;
  }
}

export async function getPayloadByToken(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token!, encodedKey, {
      algorithms: ["HS256"],
    });
    return { payload };
  } catch (error) {
    console.error("❌ Failed to verify >>", error);
    return { error };
  }
}

export function signToken(userId: number) {
  return encrypt({ userId }, "15min");
}

export function signRefreshToken(userId: number) {
  return encrypt({ userId }, "7d");
}
