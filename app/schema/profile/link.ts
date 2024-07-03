import { z } from "zod";

const base = z.object({
  name: z.string(),
  url: z.string(),
  description: z.string().optional(),
  categoryId: z.number(),
});

export const profileLinkSchema = {
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

export interface IProfileLinkSchema {
  CREATE: z.infer<typeof profileLinkSchema.CREATE>;
  UPDATE: z.infer<typeof profileLinkSchema.UPDATE>;
  DELETE: z.infer<typeof profileLinkSchema.DELETE>;
  READ: z.infer<typeof profileLinkSchema.READ>;
  READ_LIST: z.infer<typeof profileLinkSchema.READ_LIST>;
}
