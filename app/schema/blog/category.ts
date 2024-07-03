import { z } from "zod";

const base = z.object({
  name: z.string(),
  description: z.string().optional(),
});
export const blogCategorySchema = {
  CREATE: base,
  UPDATE: base.extend({
    id: z.number(),
  }),
  DELETE: z.object({
    ids: z.array(z.number()),
  }),
  READ: z.object({
    id: z.number().optional(),
    name: z.number().optional(),
  }),
  READ_LIST: z.object({
    page: z.number().optional(),
    pageSize: z.number().optional(),
  }),
};

export interface IBlogCategorySchema {
  CREATE: z.infer<typeof blogCategorySchema.CREATE>;
  UPDATE: z.infer<typeof blogCategorySchema.UPDATE>;
  DELETE: z.infer<typeof blogCategorySchema.DELETE>;
  READ: z.infer<typeof blogCategorySchema.READ>;
  READ_LIST: z.infer<typeof blogCategorySchema.READ_LIST>;
}
