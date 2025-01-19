import { Context } from "./context";
import { Router } from "./router";
import { compose } from "./compose";

const LOWER_METHODS = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
  "OPTIONS",
] as const;
const ALL_METHODS = "ALL";
type LowerCaseMethods = Lowercase<(typeof LOWER_METHODS)[number]>;
type MethodsUnion = (typeof LOWER_METHODS)[number];
type handlerFunction = (c: Context, next?: Function) => any;
type MethodFunction = (path: string, ...handler: handlerFunction[]) => any;

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

const notFoundHandler = (c: Context) => {
  return c.text("404 Not Found");
};

const errorHandler = (err: any, c: Context) => {
  if ("getResponse" in err) {
    return err.getResponse();
  }
  console.error(err);
  return c.text("Internal Server Error");
};

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
  #routePath!: string;
  constructor() {
    this.router = new Router();
    LOWER_METHODS.forEach((m: MethodsUnion) => {
      const method = m.toLowerCase() as LowerCaseMethods;
      this[method] = (path: string, ...handlers: handlerFunction[]) => {
        handlers.forEach((handler) => {
          this.routes.push({ method, path: path, handler });
        });
      };
    });

    // use
    this.use = (...handlers: handlerFunction[]) => {
      handlers.forEach((handler) => {
        this.routes.push({
          method: ALL_METHODS,
          path: this.#routePath ?? "/",
          handler,
        });
      });
    };
  }

  async fetch(args: any) {
    try {
      const { request } = args;
      const { method } = request;
      const litteralMethod = method.toLowerCase();
      const { pathname } = new URL(request.url);
      const route = this.router.findRoute(
        pathname,
        litteralMethod,
        this.routes,
      );
      if (route) {
        const c = new Context({ reactRouterArgs: args });
        const composed = compose([...route.map((h) => h.handler)]);
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
  async loader(args: any) {
    return this.fetch(args);
  }
  async action(args: any) {
    return this.fetch(args);
  }
  /**
   * react router action loader
   * @returns
   */
  handler() {
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
}
