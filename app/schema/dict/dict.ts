import { z } from "zod";

export const base = z.object({
  name: z.string(),
  description: z.string(),
  orderNo: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  parentDepartmentId: z.number().optional(),
});

export const dictSchema = {
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

export interface IDictSchema {
  CREATE: z.infer<typeof dictSchema.CREATE>;
  UPDATE: z.infer<typeof dictSchema.UPDATE>;
  DELETE: z.infer<typeof dictSchema.DELETE>;
  READ: z.infer<typeof dictSchema.READ>;
  READ_LIST: z.infer<typeof dictSchema.READ_LIST>;
}
