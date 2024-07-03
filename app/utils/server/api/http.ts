import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

export function isGET(args: ActionFunctionArgs | LoaderFunctionArgs) {
  return args.request.method === "GET";
}

export function isPOST(args: ActionFunctionArgs | LoaderFunctionArgs) {
  return args.request.method === "POST";
}

export function isPUT(args: ActionFunctionArgs | LoaderFunctionArgs) {
  return args.request.method === "PUT";
}

export function isDELETE(args: ActionFunctionArgs | LoaderFunctionArgs) {
  return args.request.method === "DELETE";
}

export function isPATCH(args: ActionFunctionArgs | LoaderFunctionArgs) {
  return args.request.method === "PATCH";
}
