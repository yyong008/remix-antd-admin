import type { ActionFunctionArgs } from "@remix-run/node";

/**
 * 打印日志
 * @returns
 */
export function Logger() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    // 重写原始方法
    descriptor.value = async function (...args: any[]) {
      const { request } = args[0] as ActionFunctionArgs;

      console.log(`
      请求方法: ${request.method};
      请求地址: ${request.url};
      `);
      return originalMethod.apply(this, args); // 继续执行函数
    };

    return descriptor;
  };
}
