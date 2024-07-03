import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from "@remix-run/node";
import { decrypt } from "@/libs/jose";

type TT = ActionFunctionArgs | LoaderFunctionArgs;

export async function handlerAuth(args: TT) {
  const token = args.request.headers.get("Authorization")?.split(" ")[1];

  if (token) {
    const { error, payload } = await decrypt(token);

    if (error) {
      throw new Error(error?.message);
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
    return payload;
  } else {
    throw new Error("No Authorization No Token");
  }
}
