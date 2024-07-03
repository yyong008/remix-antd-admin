import { z } from "zod";

const base = z.object({
  name: z.string(),
  avatar: z.string(),
  password: z.string().optional(),
  email: z.string().email().optional(),
  roles: z.array(z.number()),
  dept: z.number(),
  nickname: z.string().optional(),
  phone: z.string().optional(),
  lang: z.string().optional(),
  theme: z.string().optional(),
  remark: z.string().optional(),
  status: z.number().optional(),
});

export const userSchama = {
  CREATE: base,
  UPDATE: base.extend({
    id: z.number(),
  }),
  DELETE: z.object({
    ids: z.array(z.number()),
  }),
  READ: z.object({
    id: z.number(),
  }),
  READ_LIST: z.object({
    page: z.number().optional(),
    pageSize: z.number().optional(),
  }),
};

export interface IUserSchema {
  CREATE: z.infer<typeof userSchama.CREATE>;
  UPDATE: z.infer<typeof userSchama.UPDATE>;
  DELETE: z.infer<typeof userSchama.DELETE>;
  READ: z.infer<typeof userSchama.READ>;
  READ_LIST: z.infer<typeof userSchama.READ_LIST>;
}
