import { lastValueFrom } from "rxjs";

// utils
import { respFailJson } from "~/server/utils/response.json";

// session
import { auth$ } from "../services/common/session";

/**
 * 检查登录
 * @returns
 */
export function checkLogin() {
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
          console.log("no user id", userId);
          return redirectToLogin();
        }
        return originalMethod.apply(this, args);
      } catch (error: any) {
        // 如果校验失败，抛出错误
        console.error("Request data validation failed: " + typeof error);
        return respFailJson({}, error.toString());
      }
    };

    return descriptor;
  };
}
