import { z } from "zod";

const base = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const blogSchema = {
  CREATE: base,
  UPDATE: base.extend({
    id: z.number(),
  }),
  DELETE: z.object({
    ids: z.array(z.number()),
  }),
  READ: z.object({
    id: z.number().optional(),
    categoryId: z.number().optional(),
    tagId: z.number().optional(),
  }),
  READ_LIST: z.object({
    page: z.number().optional(),
    pageSize: z.number().optional(),
  }),
};

export interface IBlogSchema {
  CREATE: z.infer<typeof blogSchema.CREATE>;
  UPDATE: z.infer<typeof blogSchema.UPDATE>;
  DELETE: z.infer<typeof blogSchema.DELETE>;
  READ: z.infer<typeof blogSchema.READ>;
  READ_LIST: z.infer<typeof blogSchema.READ_LIST>;
}
