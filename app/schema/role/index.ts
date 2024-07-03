import { z } from "zod";

const MenuSchema = z.object({
  key: z.number().optional(),
  value: z.number().optional(),
  id: z.number(),
});

const base = z.object({
  value: z.string(),
  name: z.string(),
  description: z.string().optional(),
  remark: z.string().optional(),
  status: z.number(),
  menus: z.array(MenuSchema),
});

export const roleSchema = {
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

export interface IRoleSchema {
  CREATE: z.infer<typeof roleSchema.CREATE>;
  UPDATE: z.infer<typeof roleSchema.UPDATE>;
  DELETE: z.infer<typeof roleSchema.DELETE>;
  READ: z.infer<typeof roleSchema.READ>;
  READ_LIST: z.infer<typeof roleSchema.READ_LIST>;
}
