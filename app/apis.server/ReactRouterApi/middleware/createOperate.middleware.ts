import { Context } from "../context";
import { getClientIPAddress } from "remix-utils/get-client-ip-address";
import { joseJwt } from "~/libs/jose";
import { operateDAL } from "~/dals/operate/operateDAL";
import { userDAL } from "~/dals/system/UserDAL";

export async function createOperateMiddleware(c: Context, next: Function) {
  try {
    const args = c.reactRouterArgs;
    let payload;
    try {
      payload = await joseJwt.getTokenUserIdByArgs(args);
    } catch (error) {
      if (error instanceof Error) {
        payload = {
          userId: 0,
        };
      }
    }

    const userId = payload?.userId || 0;

    const method: string = args.request.method.toUpperCase();
    const path = new URL(args.request.url).pathname;
    const url = args.request.url;
    const ipAddress = getClientIPAddress(args.request.headers) ?? "本机地址";
    const statusCode = 200;
    let user: any = {};
    if (userId) {
      user = await userDAL.getById(userId);
    }

    operateDAL.createOperate({
      userId: userId,
      method,
      username: user?.username || "",
      url,
      path,
      ipAddress,
      statusCode,
    });

    await next?.();
  } catch (error: any) {
    if (error instanceof Error) {
      return c.json({
        data: {},
        code: 1,
        message: error?.message || "操作失败",
      });
    }
    console.log(error);
    throw error;
  }
}
