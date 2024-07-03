import { z } from "zod";

const base = z.object({
  userId: z.number(),
  roleId: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const userRoleSchema = {
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

export interface IUserRoleSchema {
  CREATE: z.infer<typeof userRoleSchema.CREATE>;
  UPDATE: z.infer<typeof userRoleSchema.UPDATE>;
  DELETE: z.infer<typeof userRoleSchema.DELETE>;
  READ: z.infer<typeof userRoleSchema.READ>;
  READ_LIST: z.infer<typeof userRoleSchema.READ_LIST>;
}
