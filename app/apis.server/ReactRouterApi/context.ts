import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

import { ContextRequest } from "./context-request";

export type ContextOptions = {
  reactRouterArgs: LoaderFunctionArgs | ActionFunctionArgs;
  notFoundHandler?: any;
  matchedRoutes?: any[];
};

export class Context {
  #contextRequest?: ContextRequest;
  #notFoundHandler?: any;
  reactRouterArgs: LoaderFunctionArgs | ActionFunctionArgs;
  #res?: Response;
  error: Error | undefined;
  finalized: boolean = false;
  #matchedRoutes?: any[];
  constructor(options: ContextOptions) {
    this.reactRouterArgs = options.reactRouterArgs;
    this.#notFoundHandler = options.notFoundHandler;
    this.#matchedRoutes = options.matchedRoutes;
  }
  /**
   * 获取 react router 请求对象
   */
  get req() {
    this.#contextRequest = new ContextRequest({
      reactRouterArgs: this.reactRouterArgs,
    });
    return this.#contextRequest;
  }

  /**
   * 获取响应对象
   */
  get res(): Response {
    return this.#res ?? new Response("404 Not Found", { status: 404 });
  }
  /**
   * 设置响应对象
   */
  set res(resp: Response | undefined) {
    this.finalized = true;
    this.#contextRequest = undefined;
    this.#res = resp;
  }
  /**
   * 响应 json 数据
   * @param data
   * @returns
   */
  json(data: Object) {
    const dataString = JSON.stringify(data);
    return new Response(dataString, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  /**
   * 响应 json (json success)
   * @param data
   * @returns
   */
  js(data: Object) {
    const dataString = JSON.stringify({
      code: 0,
      data,
      message: "success",
    });
    return new Response(dataString, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  /**
   * 响应 json (json fail)
   * @param data
   * @returns
   */
  jf(data: Object) {
    const dataString = JSON.stringify({
      code: 1,
      data,
      message: "fail",
    });
    return new Response(dataString, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  /**
   * 响应 text 数据
   * @param data
   * @returns
   */
  text(data: string, status = 200) {
    return new Response(data, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
  /**
   * 响应重定向
   * @param url
   * @param status
   * @returns
   */
  redirect(url: string, status = 302) {
    return new Response("", {
      status,
      headers: {
        Location: url,
      },
    });
  }
  /**
   * 响应 html 数据
   * @param html
   * @returns
   */
  html(html: string) {
    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }
  /**
   * 响应 not found
   * @returns
   */
  notFound() {
    if (!this.#notFoundHandler) {
      return new Response("Not Found", {
        status: 404,
      });
    }
    return this.#notFoundHandler(this.req);
  }

  getMatchedRoutes() {
    return this.#matchedRoutes;
  }
}
