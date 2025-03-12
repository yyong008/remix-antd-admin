import { Context, Next } from "hono";
import { ZodSchema } from "zod";
import { zValidator as zValidatorHono } from "@hono/zod-validator";

export function zValidator(name: string, schema: ZodSchema) {

    return async (c: Context, next: Next) => {
        if(name==="json") {
            const jsonValidator = zValidatorHono("json", schema);
            return jsonValidator(c, next);
        }
        await next();
    }

    throw new Error(`Invalid validator name: ${name}`);
}