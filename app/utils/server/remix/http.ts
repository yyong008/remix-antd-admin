import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

export function isPOST(args: ActionFunctionArgs | LoaderFunctionArgs) {
  return args.request.method === "POST";
}

export function isPUT(args: ActionFunctionArgs | LoaderFunctionArgs) {
  return args.request.method === "PUT";
}

export function isDELETE(args: ActionFunctionArgs | LoaderFunctionArgs) {
  return args.request.method === "DELETE";
}
