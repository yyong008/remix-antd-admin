import { z } from "zod";

const base = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const blogTag = {
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

export interface IBlogTagSchema {
  CREATE: z.infer<typeof blogTag.CREATE>;
  UPDATE: z.infer<typeof blogTag.UPDATE>;
  DELETE: z.infer<typeof blogTag.DELETE>;
  READ: z.infer<typeof blogTag.READ>;
  READ_LIST: z.infer<typeof blogTag.READ_LIST>;
}
