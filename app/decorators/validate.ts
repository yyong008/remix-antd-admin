import { respFailJson } from "~/utils/response.json";

export function validate(RequestSchema: any) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    // 重写原始方法
    descriptor.value = async function (...args: any[]) {
      const { request } = args[0]; // 假设 request 对象作为参数的第一个元素
      try {
        // 获取请求体并执行 Zod 校验
        const requestData = await request.json();
        RequestSchema.parse(requestData); // 执行校验

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
