import type { ActionFunctionArgs } from "@remix-run/node";
import { lastValueFrom } from "rxjs";

// services
import { getUserId$ } from "~/server/services/common/session";

// utils
import * as respUtils from "~/server/utils/response.json";
import { getUserPerms$ } from "../services/system/user-perms.server";

/**
 * 授权检验
 * @param perms
 * @returns
 */
export function permission(perms: any) {
  return function (
    _target: any,
    __propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    // 重写原始方法
    descriptor.value = async function (...args: any[]) {
      const { request } = args[0] as ActionFunctionArgs; // 假设 request 对象作为参数的第一个元素
      try {
        const method = request.method;
        const userId = await lastValueFrom(getUserId$(request));
        const usersPerms = await lastValueFrom(getUserPerms$(userId!));

        if (!usersPerms.includes(perms[method])) {
          return respUtils.respUnAuthJson();
        }
        return originalMethod.apply(this, args);
      } catch (error: any) {
        // 如果校验失败，抛出错误
        console.error("Request data validation failed: " + typeof error);
        return respUtils.respFailJson({}, error.toString());
      }
    };

    return descriptor;
  };
}
