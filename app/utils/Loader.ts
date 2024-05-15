import type { LoaderFunctionArgs } from "@remix-run/node";

export class Loader {
  loader(loaderParams: LoaderFunctionArgs) {
    return this.GET(loaderParams);
  }
  GET(loaderParams: LoaderFunctionArgs) {}
}
