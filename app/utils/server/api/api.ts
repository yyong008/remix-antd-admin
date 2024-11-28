import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  type ActionFunction,
  type LoaderFunction,
} from "@remix-run/node";
import { hm } from "./http";

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
      if (hm.isPOST(args)) return restfulApi.POST?.(args);
      if (hm.isPUT(args)) return restfulApi.PUT?.(args);
      if (hm.isDELETE(args)) return restfulApi.DELETE?.(args);
      if (hm.isPATCH(args)) return restfulApi.DELETE?.(args);
    },
    async loader(args: LoaderFunctionArgs) {
      return restfulApi.GET?.(args);
    },
  };
}
