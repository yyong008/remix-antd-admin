import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

type ContextRequestOptions = {
  reactRouterArgs: LoaderFunctionArgs | ActionFunctionArgs;
};

export class ContextRequest {
  reactRouterArgs;
  constructor(options: ContextRequestOptions) {
    this.reactRouterArgs = options.reactRouterArgs;
  }

  params() {
    return this.reactRouterArgs.params;
  }

  query(key: string) {
    // 解析 URL
    const url = new URL(this.reactRouterArgs.request.url);

    // 获取查询参数
    const searchParams = url.searchParams;

    // 获取所有查询参数
    const query = Object.fromEntries(searchParams.entries());

    if (key) {
      if (query[key]) {
        return query[key];
      } else {
        return null;
      }
    }

    return {
      ...query,
    };
  }

  header() {
    const headers = this.reactRouterArgs.request.headers;

    const allHeaders = Object.fromEntries(headers.entries());

    return {
      ...allHeaders,
    };
  }

  getbody(): ReadableStream<Uint8Array<ArrayBufferLike>> | null {
    return this.reactRouterArgs.request.body;
  }

  async json() {
    return await this.reactRouterArgs.request.json();
  }

  async text() {
    return await this.reactRouterArgs.request.text();
  }

  async arrayBuffer() {
    return await this.reactRouterArgs.request.arrayBuffer();
  }

  async blob() {
    return await this.reactRouterArgs.request.blob();
  }

  async formData() {
    return await this.reactRouterArgs.request.formData();
  }

  get url() {
    return this.reactRouterArgs.request.url;
  }

  method() {
    return this.reactRouterArgs.request.method;
  }
}
