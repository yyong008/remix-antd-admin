/* eslint-disable @typescript-eslint/no-this-alias */
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import type { Op, TOption, UrlAndBodySchemas } from "@/types/restful";

import type { ALFunctionArgs } from "@/types/remix";
import { ERRIR_PRESENTATION_MODE } from "@/constants/error";
import { hm } from "./api/http";
import { joseJwt } from "@/libs/jose";
import { rps } from "./response-json";
import { userPermsDAL } from "@/dals/system/UserPermsDAL";

export class RemixApi {
  /**
   * 创建 Remix API 基于 action loader 的方式
   * @param options
   * @returns
   */
  createApi(options: Op) {
    const that = this;
    return {
      async action(args: ActionFunctionArgs) {
        let option: any = {};
        if (hm.isPOST(args)) {
          option = options.POST!;
        } else if (hm.isPUT(args)) {
          option = options.PUT!;
        } else if (hm.isDELETE(args)) {
          option = options.DELETE!;
        } else if (hm.isPATCH(args)) {
          option = options.PATCH!;
        }

        return await that._createApi(args, option, option.handler!);
      },
      async loader(args: LoaderFunctionArgs) {
        return await that._createApi(args, options.GET!, options.GET!.handler!);
      },
    };
  }
  /**
   * 创建 Remix API 基于实现，在进入 action loader 之前，直接调用函数完成验证等内容
   * @param args
   * @param options
   * @param handler
   * @returns
   */
  async _createApi(
    args: ALFunctionArgs,
    options: TOption,
    handler: (args: ALFunctionArgs) => Promise<any>,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    let data = {};
    try {
      if (!options.isPublic) {
        await that._handlerAuth(args);
      }
      if (options.isPresentationMode) {
        await that._handlerPresentationMode(args);
      }
      if (options.perm) {
        await that._handlerPerm(args, options.perm);
      }
      if (options.schemas) {
        await that._handlerSchema(args, options.schemas);
      }
      data = await handler(args);
      return rps.rsj(data);
    } catch (error) {
      console.error("❌ >>", error);
      if (error instanceof Error) {
        return rps.rfj(data, error?.message);
      }
      if (typeof error === "string") {
        return rps.rfj(data, error);
      }
      return rps.rfj(data, error?.toString());
    }
  }

  /**
   * 处理 token 授权
   * @param args
   * @returns
   */
  async _handlerAuth(args: ActionFunctionArgs) {
    const token = args.request.headers.get("Authorization")?.split(" ")[1];

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
    return payload;
  }

  /**
   * 处理当前用户菜单处理权限
   * @param args
   * @param perm
   */
  async _handlerPerm(args: ActionFunctionArgs, perm: string) {
    const { userId }: any = await joseJwt.getTokenUserIdByArgs(args);

    const usersPerms = await userPermsDAL.getUserPerms(userId);

    if (!usersPerms.includes(perm)) {
      throw new Error("No Permission");
    }
  }

  /**
   * 处理 url 和 body 的数据校验
   * @param args
   * @param schemas
   */
  async _handlerSchema(args: ActionFunctionArgs, schemas: UrlAndBodySchemas) {
    if (schemas.url) {
      const url = new URL(args.request.url);
      const searchParams = new URLSearchParams(url.search);
      const urlSearchObject = Object.fromEntries(searchParams.entries());
      const url_result = schemas.url?.safeParse(urlSearchObject);
      if (!url_result.success) {
        throw new Error(url_result.error.errors[0].message);
      }
    }
    if (schemas.body) {
      const dto = await args.request.clone().json();
      const result = schemas.body?.safeParse(dto);
      if (!result.success) {
        const e1 = result.error.errors[0];
        const path1 = e1.path[0];
        const message = `${path1} ${e1.message}`;
        throw new Error(message);
      }
    }
  }

  /**
   * 处理演示模式
   * @param args
   */
  async _handlerPresentationMode(args: ActionFunctionArgs) {
    const method: string = args.request.method.toUpperCase();
    if (method !== "GET" && process.env.PRESENTATION_MODE === "1") {
      throw new Error(ERRIR_PRESENTATION_MODE);
    }
  }
}

export const remixApi = new RemixApi();
