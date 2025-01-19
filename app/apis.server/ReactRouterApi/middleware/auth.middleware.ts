import { Context } from "../context";
import { joseJwt } from "~/libs/jose";

export async function authMiddleware(c: Context, next: Function) {
  const token = c.reactRouterArgs.request.headers
    .get("Authorization")
    ?.split(" ")[1];

  if (!token) {
    throw new Error("No Authorization No Token");
  }

  const { error, payload } = await joseJwt.decrypt(token);

  if (error) {
    throw new Error((error as any)?.message || "Invalid Token");
  }

  const { userId, exp } = payload!;

  if (!userId) {
    throw new Error("No Authorization No User");
  }

  if (!exp) {
    throw new Error("No Authorization Exp");
  }

  if (exp && Date.now() >= exp * 1000) {
    throw new Error("Token has expired");
  }
  await next();
}
