import { auth$, logout$ } from "../lib/session";

import { getUserInfoById$ } from "../services/system/user";
import { lastValueFrom } from "rxjs";
import { rfj } from "~/utils/server";

/**
 * 检查登录
 * @returns
 */
export function authorize() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    // 重写原始方法
    descriptor.value = async function (...args: any[]) {
      const { request, params } = args[0]; // 假设 request 对象作为参数的第一个元素
      try {
        const [userId, redirectToLogin] = await lastValueFrom(
          auth$({
            request,
            params,
          } as any),
        );
        if (!userId) {
          return redirectToLogin();
        }
        // 用户被禁用
        const userInfo = await lastValueFrom(getUserInfoById$(userId));

        if (userInfo && userInfo.status === 0) {
          // 重定向到登录
          const redirectToLogin = await lastValueFrom(
            logout$(request, params.lang!),
          );

          return redirectToLogin();
        }
        return originalMethod.apply(this, args);
      } catch (error: any) {
        // 如果校验失败，抛出错误
        console.error("Request data validation failed: " + typeof error);
        return rfj({}, error.toString());
      }
    };

    return descriptor;
  };
}
