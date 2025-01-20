import { ErrorHandler, NotFoundHandler } from "./type";

import { Context } from "./context";

/**
 * 没有发现处理函数
 * @param c
 * @returns
 */
export const notFoundHandler: NotFoundHandler = (c: Context) => {
  return c.text("404 Not Found");
};

/**
 * 错误处理函数
 * @param err
 * @param c
 * @returns
 */
export const errorHandler: ErrorHandler = (err: any, c: Context) => {
  if ("getResponse" in err) {
    return err.getResponse();
  }
  console.error(err);
  return c.text("Internal Server Error");
};
