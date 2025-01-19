import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

import { ContextRequest } from "./context-request";

export type ContextOptions = {
  reactRouterArgs: LoaderFunctionArgs | ActionFunctionArgs;
};

export class Context {
  #contextRequest?: ContextRequest;
  reactRouterArgs: LoaderFunctionArgs | ActionFunctionArgs;
  res?: Response;
  constructor(options: ContextOptions) {
    this.reactRouterArgs = options.reactRouterArgs;
  }
  get req() {
    this.#contextRequest = new ContextRequest({
      reactRouterArgs: this.reactRouterArgs,
    });
    return this.#contextRequest;
  }
  json(data: Object) {
    const dataString = JSON.stringify(data);
    return new Response(dataString, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
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
  text(data: string, status = 200) {
    return new Response(data, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
  redirect(url: string, status = 302) {
    return new Response("", {
      status,
      headers: {
        Location: url,
      },
    });
  }
  html(html: string) {
    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }
  notFound() {
    return new Response("Not Found", {
      status: 404,
    });
  }
  error(error: Error) {
    return new Response(error.message, {
      status: 500,
    });
  }
}
