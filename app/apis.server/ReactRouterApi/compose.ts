import { Context } from "./context";

export const compose = (
  middleware: any[],
  onError?: Function,
  onNotFound?: Function,
) => {
  if (!Array.isArray(middleware)) {
    throw new TypeError("Middleware stack must be an array!");
  }

  for (const fn of middleware) {
    if (typeof fn !== "function") {
      throw new TypeError("Middleware must be composed of functions!");
    }
  }

  // 返回一个执行链
  return async (context: Context, next?: Function) => {
    let index = -1;
    const isContext = context instanceof Context;

    // 调度函数，递归调用中间件
    const dispatch = async (i: number) => {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let handler;
      let isError = false;
      if (middleware[i]) {
        handler = middleware[i];
      } else {
        handler = i === middleware.length ? next : undefined;
      }

      if (!handler) {
        if (isContext && context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
        console.log("No fn or next"); // 如果没有下一个中间件，直接返回
        res = new Response("Server Error", { status: 500 });
      } else {
        try {
          // 执行中间件，并传递 next
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && isContext && onError) {
            context.error = err;
            res = await onError(context, err);
            isError = true;
          }
          console.error("Error in middleware:", err);
          res = new Response("Server Error", { status: 500 });
          throw err; // 抛出错误，交给外层处理
        }
      }

      if (res && (context.finalized === false || isError)) {
        context.res = res; // 只有在最后一个中间件返回响应时设置
        return context;
      }

      return context;
    };

    return dispatch(0); // 从第一个中间件开始
  };
};
