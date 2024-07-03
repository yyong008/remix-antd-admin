import { z } from "zod";

const base = z.object({
  userId: z.number(),
  menuId: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const menuRoleSchema = {
  CREATE: base,
  UPDATE: base.extend({ id: z.number() }),
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

export interface IMenuRoleSchema {
  CREATE: z.infer<typeof menuRoleSchema.CREATE>;
  UPDATE: z.infer<typeof menuRoleSchema.UPDATE>;
  DELETE: z.infer<typeof menuRoleSchema.DELETE>;
  READ: z.infer<typeof menuRoleSchema.READ>;
  READ_LIST: z.infer<typeof menuRoleSchema.READ_LIST>;
}
