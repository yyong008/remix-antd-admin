import type { ActionFunctionArgs } from "@remix-run/node";

import "reflect-metadata";

export function Action(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    const { request } = args[0];

    switch (request.method) {
      case "POST":
        return target.post({
          request,
        } as ActionFunctionArgs);
      case "PUT":
        return target.put({
          request,
        } as ActionFunctionArgs);
      case "PATCH":
        return target.patch({
          request,
        } as ActionFunctionArgs);
      case "DELETE":
        return target.delete({
          request,
        } as ActionFunctionArgs);
      default:
        break;
    }
    return originalMethod.apply(this, args);
  };
}
