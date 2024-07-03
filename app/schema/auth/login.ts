import { z } from "zod";

export const loginSchema = {
  CREATE: z.object({
    username: z.string(),
    password: z.string(),
  }),
};

export interface IBlogSchema {
  CREATE: z.infer<typeof loginSchema.CREATE>;
}
