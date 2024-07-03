import { z } from "zod";

const base = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const menuPermSchema = {
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

export interface IMenuPermSchema {
  CREATE: z.infer<typeof menuPermSchema.CREATE>;
  UPDATE: z.infer<typeof menuPermSchema.UPDATE>;
  DELETE: z.infer<typeof menuPermSchema.DELETE>;
  READ: z.infer<typeof menuPermSchema.READ>;
  READ_LIST: z.infer<typeof menuPermSchema.READ_LIST>;
}
