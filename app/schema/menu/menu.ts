import { z } from "zod";

const base = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const menuSchema = {
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

export interface IMenuSchema {
  CREATE: z.infer<typeof menuSchema.CREATE>;
  UPDATE: z.infer<typeof menuSchema.UPDATE>;
  DELETE: z.infer<typeof menuSchema.DELETE>;
  READ: z.infer<typeof menuSchema.READ>;
  READ_LIST: z.infer<typeof menuSchema.READ_LIST>;
}
