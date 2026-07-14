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

export class Rps {
  rsj(data: any, message?: string, options?: any) {
    return new Response(
      JSON.stringify({
        code: ResCode.success,
        message: message ?? ResMessage.succes,
        data,
      }),
      options,
    );
  }

  rfj(data?: any, message?: string, options?: any) {
    return new Response(
      JSON.stringify({
        code: ResCode.fail,
        message: message ?? ResMessage.fail,
        data: data ?? null,
      }),
      options,
    );
  }
}

export const rps = new Rps();

export const rsj = (data: any, message?: string, options?: any) => {
  return new Response(
    JSON.stringify({
      code: ResCode.success,
      message: message ?? ResMessage.succes,
      data,
    }),
    options,
  );
};

export const rfj = (data?: any, message?: string, options?: any) => {
  return new Response(
    JSON.stringify({
      code: ResCode.fail,
      message: message ?? ResMessage.fail,
      data: data ?? null,
    }),
    options,
  );
};

export const respByData$ = async (data: any | null) => {
  return data !== null ? () => rsj(data, "创建成功") : () => rfj({}, "创建失败");
};

export const resp$ = async (data$: Promise<any> | any) => {
  const data = await data$;
  return data !== null ? rsj(data) : rfj({});
};

export const resp = async (data: any | null) => {
  return data !== null ? rsj(data) : rfj({});
};

export const respFn$ = async (resultFn$: Promise<() => Response> | (() => Response)) => {
  const resultFn = await resultFn$;
  return resultFn();
};

export const respPresentationModeJson = () => {
  return Response.json({
    code: ResCode.fail,
    message: InnerMessage.PresentationMode,
    data: {},
  });
};

export const respUnAuthJson = () => {
  return Response.json({
    code: ResCode.fail,
    message: InnerMessage.UnAuth,
    data: {},
  });
};

export const respUnSupportJson = () => {
  return Response.json({
    code: ResCode.fail,
    message: InnerMessage.Unsupport,
    data: {},
  });
};

export const HigherOrderCreateRespWithTime =
  (data: any, startTimeStamp?: number, code?: boolean, message?: string) => () => {
    const idata: any = {
      code: code ?? 0,
      data,
      message: message ?? "success",
    };
    if (startTimeStamp) {
      data.time = Date.now() - startTimeStamp;
    }
    return idata;
  };
