import { json } from "@remix-run/node";

enum ResCode {
  success,
  fail,
}

enum ResMessage {
  succes = "success",
  fail = "fail",
}

export const respSuccessJson = (data: any, message?: string) => {
  return json({
    code: ResCode.success,
    message: message ?? ResMessage.succes,
    data,
  });
};

export const respFailJson = (data: any, message?: string) => {
  console.log(message);
  return json({
    code: ResCode.fail,
    message: message ?? ResMessage.fail,
    data,
  });
};

export const respPresentationModeJson = () => {
  return json({
    code: ResCode.fail,
    message: "演示模式：仅能进行获取",
    data: {},
  });
};

export const respUnAuthJson = () => {
  return json({
    code: ResCode.fail,
    message: "未授权",
    data: {},
  });
};

export const respUnSupportJson = () => {
  return json({
    code: ResCode.fail,
    message: "暂不支持",
    data: {},
  });
};
