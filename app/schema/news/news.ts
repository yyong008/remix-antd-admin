import { z } from "zod";

const base = z.object({
  name: z.string(),
  description: z.string(),
  userId: z.string(),
});

export const newsSchema = {
  CREATE: base,
  UPDATE: base.extend({
    id: z.number(),
  }),
  DELETE: z.object({
    ids: z.array(z.number()),
  }),
  READ: z.object({}),
  READ_LIST: z.object({
    page: z.number().optional(),
    pageSize: z.number().optional(),
  }),
};

export interface INewsSchema {
  CREATE: z.infer<typeof newsSchema.CREATE>;
  UPDATE: z.infer<typeof newsSchema.UPDATE>;
  DELETE: z.infer<typeof newsSchema.DELETE>;
  READ: z.infer<typeof newsSchema.READ>;
  READ_LIST: z.infer<typeof newsSchema.READ_LIST>;
}
