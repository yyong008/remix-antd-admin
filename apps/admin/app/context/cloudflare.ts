import { createContext } from "react-router";

export type CloudflareContextType = {
  env: Env;
  ctx: ExecutionContext;
};

export const cloudflareContext = createContext<CloudflareContextType | null>(null);
