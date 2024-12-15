import { type ActionFunctionArgs } from "@remix-run/node";

import { joseJwt } from "@/libs/jose";

class RefreshTokenTool {
  /**
   * 创建 refresh token
   * @param args
   * @returns
   */
  async createTokens(args: ActionFunctionArgs) {
    const vDto = await args.request.json();
    const { refresh_token } = vDto;
    const result: any = await joseJwt.getPayloadByToken(refresh_token);

    if (result?.error) {
      throw new Error(result?.error?.message);
    }
    const userId = result.payload.userId;
    const ts = {
      refresh_token: await joseJwt.signRefreshToken(userId),
      token: await joseJwt.signToken(userId),
    };
    return ts;
  }
}

export const refreshTokenTool = new RefreshTokenTool();
