import type { ActionFunctionArgs } from "@remix-run/node";

import { respFailJson } from "~/server/utils";

import {
  CreateMenuDirSchema,
  AddMenuSchema,
  AddMenuPermSchema,
  UpdateMenuDirSchema,
  UpdateMenuPermSchema,
  UpdateMenuSchema,
} from "~/schema/menu.schema";

/**
 * 校验 DTO
 * @param RequestSchema
 * @returns
 */
export function validate(RequestSchema: any) {
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
        const requestClone = await request.clone();
        const dto = await requestClone.json();
        RequestSchema.parse(dto); // 执行校验
        return originalMethod.apply(this, args); // 继续执行函数
      } catch (error: any) {
        // 如果校验失败，抛出错误
        console.error("Request data validation failed: " + typeof error);
        return respFailJson({}, error.toString());
      }
    };

    return descriptor;
  };
}

export function validateMenuSchema(action: "create" | "update") {
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
        const dto = await request.json();
        //  // 执行校验
        const type = dto.type as 1 | 2 | 3;

        const schemaMap = {
          1: {
            create: CreateMenuDirSchema,
            update: UpdateMenuDirSchema,
          },
          2: {
            create: AddMenuSchema,
            update: UpdateMenuSchema,
          },
          3: {
            create: AddMenuPermSchema,
            update: UpdateMenuPermSchema,
          },
        };

        const RequestSchema = schemaMap[type][action];
        RequestSchema!.parse(dto);

        return originalMethod.apply(this, args); // 继续执行函数
      } catch (error: any) {
        // 如果校验失败，抛出错误
        console.error("Request data validation failed: " + typeof error);
        return respFailJson({}, error.toString());
      }
    };

    return descriptor;
  };
}
