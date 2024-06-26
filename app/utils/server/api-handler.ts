import { rfj, rsj } from "~/utils/server";

import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from "@remix-run/node";
import { type z } from "zod";
import { getUserId$ } from "~/lib/session";
import { switchMap, lastValueFrom } from "rxjs";
import { getUserPerms$ } from "~/services/system/user-perms.server";
import { decrypt } from "~/lib/jose";
import { ERRIR_PRESENTATION_MODE } from "~/constants/error";

type TT = ActionFunctionArgs | LoaderFunctionArgs;
type TOption = {
  isPublic?: boolean;
  perm?: string;
  schema?: z.ZodSchema;
};

async function handlerAuth(args: TT) {
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

async function handlerPerm(args: TT, perm: string) {
  const { request } = args as ActionFunctionArgs;

  const result$ = getUserId$(request).pipe(
    switchMap((userId) => getUserPerms$(userId!)),
  );

  const usersPerms = await lastValueFrom(result$);
  if (!usersPerms.includes(perm)) {
    throw new Error("No Permission");
  }
}

async function handlerSchema(args: TT, schema: z.ZodSchema) {
  const dto = await args.request.clone().json();
  const result = schema.safeParse(dto);
  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
}

async function handlerPresentationMode(args: TT) {
  const method: string = args.request.method;
  if (method.toUpperCase() !== "GET" && process.env.PRESENTATION_MODE === "1") {
    throw new Error(ERRIR_PRESENTATION_MODE);
  }
}

export async function createApiHandler(
  options: TOption,
  fn: (ags: TT) => Promise<any>,
) {
  return async function apiHandler(args: TT) {
    let data = {};
    try {
      if (!options.isPublic) {
        await handlerAuth(args);
        await handlerPresentationMode(args);
      }
      if (options.perm) {
        await handlerPerm(args, options.perm);
      }

      if (options.schema) {
        await handlerSchema(args, options.schema);
      }
      data = await fn(args);
      return rsj(data);
    } catch (error) {
      console.error("❌ >>", error);
      if (error instanceof Error) {
        return rfj(data, error?.message);
      }
      if (typeof error === "string") {
        return rfj(data, error);
      }
      return rfj(data, error?.toString());
    }
  };
}
