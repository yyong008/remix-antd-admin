import { z } from "zod";

export const base = z.object({
  title: z.string(),
  content: z.string(),
  author: z.string().optional(),
  source: z.string().optional(),
  viewCount: z.number(),
  publishedAt: z.date(),
  newsId: z.string(),
  userId: z.string(),
});

export const newsCategorySchema = {
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

export interface INewsCategorySchema {
  CREATE: z.infer<typeof newsCategorySchema.CREATE>;
  UPDATE: z.infer<typeof newsCategorySchema.UPDATE>;
  DELETE: z.infer<typeof newsCategorySchema.DELETE>;
  READ: z.infer<typeof newsCategorySchema.READ>;
  READ_LIST: z.infer<typeof newsCategorySchema.READ_LIST>;
}
