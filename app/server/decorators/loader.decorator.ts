import type { LoaderFunctionArgs } from "@remix-run/node";

export function Loader(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  descriptor.value = function (...args: any[]) {
    const { request, params } = args[0] as LoaderFunctionArgs;
    return target.get({ request, params });
  };
}
