import { z } from "zod";

const base = z.object({
  type: z.string(),
  size: z.string(),
  path: z.string(),
  extName: z.string(),
  fileName: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.number(),
});

export const storageSchema = {
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

export interface IStorageSchema {
  CREATE: z.infer<typeof storageSchema.CREATE>;
  UPDATE: z.infer<typeof storageSchema.UPDATE>;
  DELETE: z.infer<typeof storageSchema.DELETE>;
  READ: z.infer<typeof storageSchema.READ>;
  READ_LIST: z.infer<typeof storageSchema.READ_LIST>;
}
