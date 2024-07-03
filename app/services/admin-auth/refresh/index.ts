import { type ActionFunctionArgs } from "@remix-run/node";

import { getPayloadByToken, signRefreshToken, signToken } from "@/libs/jose";

import { createApi } from "~/utils/server/api/api-handler";

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

export const apiRefreshHandler = await createApi(
  {
    isPublic: true,
    perm: "",
  },
  refreshTokenAction,
);
