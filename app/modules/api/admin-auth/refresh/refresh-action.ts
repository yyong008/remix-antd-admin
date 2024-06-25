import { type ActionFunctionArgs } from "@remix-run/node";

import {
  getPayloadByToken,
  getTokenUserId,
  signRefreshToken,
  signToken,
} from "~/lib/jose";

import { createApiHandler } from "~/utils/server/api-handler";

export async function refreshTokenAction(args: ActionFunctionArgs) {
  const userId = await getTokenUserId(args);

  if (!userId) {
    throw new Error("token 不能正确解析");
  }

  const vDto = await args.request.json();
  const { refresh_token } = vDto;
  const payload = await getPayloadByToken(refresh_token);

  if (userId !== payload.id) {
    throw new Error("token 信息不一致");
  }
  if (Date.now() > payload.exp * 1000) {
    throw new Error("freshToken 超时, 需重新登录");
  }
  const ts = {
    refreshToken: await signRefreshToken(userId),
    token: await signToken(userId),
  };
  return ts;
}

export const apiRefreshHandler = await createApiHandler(
  {
    isPublic: false,
    perm: "",
  },
  refreshTokenAction,
);
