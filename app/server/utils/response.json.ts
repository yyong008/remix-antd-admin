// types
import type { Observable } from "rxjs";

// remix
import { json } from "@remix-run/node";

// rxjs
import { from, iif, lastValueFrom, of, switchMap } from "rxjs";

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
 * 更具数据进行响应(Observable)
 * @param data
 * @returns
 */
export const resp$ = async (data$: any | null) => {
  const res$ = from(data$).pipe(
    switchMap((data) =>
      iif(
        () => {
          return data !== null;
        },
        of(() => respSuccessJson(data)),
        of(() => respFailJson({})),
      ),
    ),
  );

  const res = await lastValueFrom(res$);
  return res();
};

/**
 * 函数响应
 * @param data
 * @returns
 */
export const respFn$ = async (resultFn$: Observable<any>) => {
  const resultFn = await lastValueFrom(resultFn$);
  return resultFn();
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

export const HigherOrderCreateRespWithTime =
  (data: any, startTimeStamp?: number, code?: boolean, message?: string) =>
  () => {
    const idata: any = {
      code: code ?? 0,
      data,
      message: message ?? "success",
    };
    if (startTimeStamp) {
      data.time = Date.now() - startTimeStamp;
    }
    return json(idata);
  };
