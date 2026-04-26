import { createContext } from "react-router";

/**
 * cloudflare runtime environment context
 */
export const runtimeEnvContext = createContext<Env>();
export const runtimeExecutionContext = createContext<ExecutionContext>();
