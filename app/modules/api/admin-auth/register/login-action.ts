import { type ActionFunctionArgs } from "@remix-run/node";
import { lastValueFrom } from "rxjs";
import {
  ERRIR_USER_DISABLED,
  ERROR_PASSWWORD,
  ERROR_UNREGISTER,
} from "~/constants/error";
import { encrypt } from "~/lib/jose";
import { LoginSchema } from "~/schema/login.schema";
import { findByUserName$ } from "~/services/login";
import { createLoginLog } from "~/services/system/login-log";
import { comparePassword, getLoginInfo } from "~/utils/server";
import { createApiHandler } from "~/utils/server/api-handler";

async function matchPassword(dataDto: any, user: any) {
  const isMatch = comparePassword(dataDto.password, user!.password);
  if (!isMatch) throw Error(ERROR_PASSWWORD);
  return isMatch;
}

async function findUserByName(dataDto: any) {
  const user = await lastValueFrom(findByUserName$(dataDto.username));
  if (!user) throw Error(ERROR_UNREGISTER);
  if (user.status === 1) throw Error(ERRIR_USER_DISABLED);
  return user;
}

async function recordLoginLog(args: ActionFunctionArgs, user: any) {
  try {
    const loginLog = await getLoginInfo(args.request);
    createLoginLog({
      ...loginLog,
      name: user!.name,
      userId: user!.id,
    });
  } catch (error) {
    console.error("❌ >> login record login log: ", error);
  }
}

function signToken(userId: number) {
  return encrypt({ userId }, "15m");
}

export async function loginActionCompute(args: ActionFunctionArgs) {
  const vDto = await args.request.json();
  const user = await findUserByName(vDto);
  matchPassword(vDto, user);
  await recordLoginLog(args, user);
  return {
    token: signToken(user.id),
  };
}

export const apiLoginHandler = await createApiHandler(
  {
    isPublic: true,
    schema: LoginSchema,
    perm: "",
  },
  loginActionCompute,
);
