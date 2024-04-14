import type { ActionFunctionArgs } from "@remix-run/node";
import { forkJoin, from, lastValueFrom, switchMap } from "rxjs";

// services
import { getUserId$ } from "~/server/services/common/session";

// utils
import * as rp from "~/server/utils/response.json";
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
        const result$ = from(getUserId$(request)).pipe(
          switchMap((userId) => {
            return forkJoin({
              // method: of(request.method),
              usersPerms: getUserPerms$(userId!),
            });
          }),
        );

        const { usersPerms } = await lastValueFrom(result$);
        if (!usersPerms.includes(perms)) {
          return rp.respUnAuthJson();
        }
        return originalMethod.apply(this, args);
      } catch (error: any) {
        // 如果校验失败，抛出错误
        console.error("Request data validation failed: " + typeof error);
        return rp.respFailJson({}, error.toString());
      }
    };

    return descriptor;
  };
}
