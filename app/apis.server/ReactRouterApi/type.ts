import { Context } from "./context";

export type ErrorHandler = (error: any, c: Context) => Response;
export type NotFoundHandler = (c: Context) => Response;
