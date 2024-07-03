import { z } from "zod";

const base = z.object({
  name: z.string(),
  description: z.string(),
  orderNo: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  parentDepartmentId: z.number().optional(),
});

export const deptSchema = {
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

export interface IDeptSchema {
  CREATE: z.infer<typeof deptSchema.CREATE>;
  UPDATE: z.infer<typeof deptSchema.UPDATE>;
  DELETE: z.infer<typeof deptSchema.DELETE>;
  READ: z.infer<typeof deptSchema.READ>;
  READ_LIST: z.infer<typeof deptSchema.READ_LIST>;
}
