import { createContext } from "react-router";

type GetLoadContextArgs = {
  request: Request
}

export const urlContext = createContext<string>();
export const extraContext = createContext<string>();

declare module 'react-router' {
  interface AppLoadContext extends ReturnType<typeof getLoadContext> {}
}

export function getLoadContext(args: GetLoadContextArgs) {
  return new Map([]);
}
