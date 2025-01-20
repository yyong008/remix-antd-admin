import { ALL_METHODS, UPPER_METHODS } from "./constants";
import { errorHandler, notFoundHandler } from "./error";

import { Context } from "./context";
import { Router } from "./router";
import { compose } from "./compose";

type LowerCaseMethods = Lowercase<(typeof UPPER_METHODS)[number]>;
type MethodsUnion = (typeof UPPER_METHODS)[number];
type HandlerFunction = (c: Context, next?: Function) => any;
type MethodFunction = (path: string, ...handler: HandlerFunction[]) => any;

type IRoute = {
  method: string;
  path: string;
  handler: any;
};

function normalizePath(...paths: string[]): string {
  return (
    paths
      .join("/") // 拼接路径
      .replace(/\/+/g, "/") // 将多个斜杠替换为单个斜杠
      .replace(/\/$/, "") || "/" // 移除尾部斜杠（除非路径为空）
  );
}

export class ReactRouterApi {
  routes: IRoute[] = [];
  router;
  get!: MethodFunction;
  post!: MethodFunction;
  put!: MethodFunction;
  delete!: MethodFunction;
  patch!: MethodFunction;
  options!: MethodFunction;
  use!: any;
  #path: string = "/"; // http 路径 path
  #routePath!: string; // route 子路由路径
  private errorHandler = errorHandler;
  #notFondHandler = notFoundHandler;

  constructor() {
    this.router = new Router();
    UPPER_METHODS.forEach((m: MethodsUnion) => {
      const method = m.toLowerCase() as LowerCaseMethods;
      this[method] = (
        arg1: string | HandlerFunction,
        ...handlers: HandlerFunction[]
      ) => {
        if (typeof arg1 === "string") {
          this.#path = arg1;
        } else {
          this.#addRoute(method, this.#path, arg1);
        }
        handlers.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
      };
    });

    // use
    this.use = (...handlers: HandlerFunction[]) => {
      handlers.forEach((handler) => {
        this.#addRoute(ALL_METHODS, this.#routePath ?? "/", handler);
      });
    };
  }

  /**
   * 添加路由表
   * @param method
   * @param path
   * @param handler
   */
  #addRoute(method: string, path: string, handler: HandlerFunction) {
    const upperMethod = method.toUpperCase();
    this.routes.push({ method: upperMethod, path, handler });
  }

  async #fetch(args: any) {
    try {
      const { request } = args;
      const { method } = request;
      const mt = method.toUpperCase();
      const { pathname } = new URL(request.url);
      const matchedRoutes = this.router.match(pathname, mt, this.routes);
      if (matchedRoutes) {
        const c = new Context({
          reactRouterArgs: args,
          notFoundHandler: this.#notFondHandler,
          matchedRoutes,
        });
        const composed = compose(
          [...matchedRoutes.map((h) => h.handler)],
          this.errorHandler,
          this.#notFondHandler,
        );
        const context = await composed(c);
        if (!context || !context.res) {
          return new Error("Context is not Finalized");
        }
        return context.res;
      }
      return notFoundHandler(args);
    } catch (error) {
      console.error("error", error);
      return new Response("Server Error", { status: 500 });
    }
  }
  /**
   * react router loader function
   * @param args
   * @returns
   */
  async loader(args: any) {
    return this.#fetch(args);
  }
  /**
   * react router action function
   * @param args
   * @returns
   */
  async action(args: any) {
    return this.#fetch(args);
  }
  /**
   * react router action loader
   * @returns
   */
  fetch() {
    return {
      loader: this.loader.bind(this),
      action: this.action.bind(this),
    };
  }

  /**
   * 添加子路由
   * @param path
   * @param subRouter
   */
  route(path: string, subRouter: ReactRouterApi) {
    this.#routePath = path;
    // 遍历子路由的路由表，合并到当前应用的路由表中
    subRouter.routes.forEach((subRoute) => {
      const fullPath = normalizePath(path, subRoute.path);
      this.routes.push({
        method: subRoute.method,
        path: fullPath,
        handler: subRoute.handler,
      });
    });
  }

  /**
   * 监听错误: 500
   * @param handler
   * @returns
   */
  onError(handler: any) {
    this.errorHandler = handler;
    return this;
  }

  /**
   * 监听没有发现路由: 404
   */
  onFound(handler: any) {
    this.#notFondHandler = handler;
    return this;
  }
}
