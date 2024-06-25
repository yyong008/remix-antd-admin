import { type ActionFunctionArgs } from "@remix-run/node";

import { getPayloadByToken, signRefreshToken, signToken } from "~/lib/jose";

import { createApiHandler } from "~/utils/server/api-handler";

export async function refreshTokenAction(args: ActionFunctionArgs) {
  const vDto = await args.request.json();
  const { refresh_token } = vDto;
  const result = await getPayloadByToken(refresh_token);

  if (result?.error) {
    throw new Error(result?.error?.message);
  }
  const userId = result.payload.userId;
  const ts = {
    refresh_token: await signRefreshToken(userId),
    token: await signToken(userId),
  };
  return ts;
}

export const apiRefreshHandler = await createApiHandler(
  {
    isPublic: true,
    perm: "",
  },
  refreshTokenAction,
);
