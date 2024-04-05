import type { ActionFunctionArgs } from "@remix-run/node";

// services
import { getUserId } from "~/services/common/auth.server";
import { getUserPerms } from "~/services/system/userPerms.server";

// utils
import * as respUtils from "~/utils/response.json";

export function permission(perms: any) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    // 重写原始方法
    descriptor.value = async function (...args: any[]) {
      const { request } = args[0] as ActionFunctionArgs; // 假设 request 对象作为参数的第一个元素
      try {
        const method = request.method;
        const userId = await getUserId(request);
        const usersPerms = await getUserPerms(userId!);
        console.log("userPerms", usersPerms);
        if (!usersPerms.includes(perms[method])) {
          return respUtils.respUnAuthJson();
        }
        return originalMethod.apply(this, args);
      } catch (error: any) {
        // 如果校验失败，抛出错误
        console.error("xxRequest data validation failed: " + typeof error);
        return respUtils.respFailJson({}, error.toString());
      }
    };

    return descriptor;
  };
}
