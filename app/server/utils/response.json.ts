// remix
import { json } from "@remix-run/node";

// rxjs
import { from, iif, of } from "rxjs";

enum ResCode {
  success,
  fail,
}

enum ResMessage {
  succes = "success",
  fail = "fail",
}

enum InnerMessage {
  PresentationMode = "演示模式：仅能进行获取",
  UnAuth = "未授权",
  Unsupport = "暂不支持",
}

/**
 * 响应 JSON 成功
 * @param data
 * @param message
 * @returns
 */
export const respSuccessJson = (data: any, message?: string, options?: any) => {
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
 *
 * @param list {any[]} 数据列表
 * @param total {Number} 数据总量
 * @param message {String} 字符串
 * @param options {Object} json 的字符串
 * @returns
 */
export const respPageSuccessJson = (
  list: any,
  total: number,
  message?: string,
  options?: any,
) => {
  return json(
    {
      code: ResCode.success,
      message: message ?? ResMessage.succes,
      data: {
        list,
        total,
      },
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
export const respFailJson = (data: any, message?: string, options?: any) => {
  return json({
    code: ResCode.fail,
    message: message ?? ResMessage.fail,
    data,
  });
};

/**
 * 更具数据进行响应(Observable)
 * @param data
 * @returns
 */
export const respByData$ = (data: any | null) => {
  return from(
    iif(
      () => data !== null,
      of(() => respSuccessJson(data, "创建成功")),
      of(() => respFailJson({}, "创建失败")),
    ),
  );
};

/**
 * 响应样式模式
 * @returns
 */
export const respPresentationModeJson = () => {
  return json({
    code: ResCode.fail,
    message: InnerMessage.PresentationMode,
    data: {},
  });
};

/**
 * 响应未授权
 * @returns
 */
export const respUnAuthJson = () => {
  return json({
    code: ResCode.fail,
    message: InnerMessage.UnAuth,
    data: {},
  });
};

/**
 * 响应不支持
 * @returns
 */
export const respUnSupportJson = () => {
  return json({
    code: ResCode.fail,
    message: InnerMessage.Unsupport,
    data: {},
  });
};
