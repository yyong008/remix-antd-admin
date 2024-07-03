import { z } from "zod";

const base = z.object({
  name: z.string(),
  description: z.string().optional(),
  userId: z.number(),
});

export const profileLinkCategorySchema = {
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

export interface IProfileLinkCategorySchema {
  CREATE: z.infer<typeof profileLinkCategorySchema.CREATE>;
  UPDATE: z.infer<typeof profileLinkCategorySchema.UPDATE>;
  DELETE: z.infer<typeof profileLinkCategorySchema.DELETE>;
  READ: z.infer<typeof profileLinkCategorySchema.READ>;
  READ_LIST: z.infer<typeof profileLinkCategorySchema.READ_LIST>;
}
