import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  type ActionFunction,
  type LoaderFunction,
} from "@remix-run/node";
import { isPOST, isPUT, isDELETE, isPATCH } from "./http";

type TRestfulApi = {
  GET?: LoaderFunction;
  POST?: ActionFunction;
  PUT?: ActionFunction;
  DELETE?: ActionFunction;
  PATCH?: ActionFunction;
};

export function api(restfulApi: TRestfulApi) {
  return {
    async action(args: ActionFunctionArgs) {
      if (isPOST(args)) return restfulApi.POST?.(args);
      if (isPUT(args)) return restfulApi.PUT?.(args);
      if (isDELETE(args)) return restfulApi.DELETE?.(args);
      if (isPATCH(args)) return restfulApi.DELETE?.(args);
    },
    async loader(args: LoaderFunctionArgs) {
      return restfulApi.GET?.(args);
    },
  };
}
