import type { LoaderFunctionArgs } from "@remix-run/node";

export class Action {
  action(loaderParams: LoaderFunctionArgs) {
    if (loaderParams.request.method === "POST") {
      return this.POST(loaderParams);
    }

    if (loaderParams.request.method === "PUT") {
      return this.PUT(loaderParams);
    }

    if (loaderParams.request.method === "PATCH") {
      return this.PATCH(loaderParams);
    }

    if (loaderParams.request.method === "DELETE") {
      return this.PATCH(loaderParams);
    }
  }
  POST(loaderParams: LoaderFunctionArgs) {}
  PUT(loaderParams: LoaderFunctionArgs) {}
  PATCH(loaderParams: LoaderFunctionArgs) {}
  DELETE(loaderParams: LoaderFunctionArgs) {}
}
