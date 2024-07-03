import { z } from "zod";

export const registerSchema = {
  CREATE: z.object({
    username: z.string(),
    password: z.string(),
    passwordRe: z.string(),
  }),
};

export interface IBlogSchema {
  CREATE: z.infer<typeof registerSchema.CREATE>;
}
