import { z } from "zod";

export const base = z.object({
  type: z.number(),
  name: z.string(),
  parentId: z.number(),
  permission: z.string().optional(),
  orderNo: z.number(),
  status: z.number().optional(),
});

export const menuDirSchema = {
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

export interface IMenuDirSchema {
  CREATE: z.infer<typeof menuDirSchema.CREATE>;
  UPDATE: z.infer<typeof menuDirSchema.UPDATE>;
  DELETE: z.infer<typeof menuDirSchema.DELETE>;
  READ: z.infer<typeof menuDirSchema.READ>;
  READ_LIST: z.infer<typeof menuDirSchema.READ_LIST>;
}
