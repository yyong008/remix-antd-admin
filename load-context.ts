import { unstable_createContext } from "react-router";

type GetLoadContextArgs = {
  request: Request
}

export const urlContext = unstable_createContext<string>();
export const extraContext = unstable_createContext<string>();

declare module 'react-router' {
  interface AppLoadContext extends ReturnType<typeof getLoadContext> {}
}

export function getLoadContext(args: GetLoadContextArgs) {
  return new Map([
    [urlContext, args.request.url],
    [extraContext, "stuff"],
  ]);
}
