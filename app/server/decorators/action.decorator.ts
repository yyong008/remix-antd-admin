import type { ActionFunctionArgs } from "@remix-run/node";

export function Action(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    const { request, params } = args[0];

    switch (request.method) {
      case "POST":
        return target.post({
          request,
          params,
        } as ActionFunctionArgs);
      case "PUT":
        return target.put({
          request,
          params,
        } as ActionFunctionArgs);
      case "PATCH":
        return target.patch({
          request,
          params,
        } as ActionFunctionArgs);
      case "DELETE":
        return target.delete({
          request,
          params,
        } as ActionFunctionArgs);
      default:
        break;
    }
    return originalMethod.apply(this, args);
  };
}
