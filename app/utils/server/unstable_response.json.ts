import { isObservable, lastValueFrom } from "rxjs";

import { json } from "@remix-run/node";

enum ResCode {
  success,
  fail,
}

enum ResMessage {
  succes = "success",
  fail = "fail",
}

/**
 * 响应 JSON 成功
 * @param data
 * @param message
 * @returns
 */
export const rsj = async (data: any, message?: string, options?: any) => {
  if (isObservable(data)) {
    return json(
      {
        code: ResCode.success,
        message: message ?? ResMessage.succes,
        data: await lastValueFrom(data),
      },
      options,
    );
  }
  return json(
    {
      code: ResCode.success,
      message: message ?? ResMessage.succes,
      data,
    },
    options,
  );
};

/**
 * 响应 JSON 失败
 * @param data
 * @param message
 * @param options
 * @returns
 */
export const rfj = async (data?: any, message?: string, options?: any) => {
  if (isObservable(data)) {
    return json(
      {
        code: ResCode.success,
        message: message ?? ResMessage.succes,
        data: await lastValueFrom(data),
      },
      options,
    );
  }
  return json(
    {
      code: ResCode.fail,
      message: message ?? ResMessage.fail,
      data: data ?? null,
    },
    options,
  );
};
