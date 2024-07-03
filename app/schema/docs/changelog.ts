import { z } from "zod";

const base = z.object({
  name: z.string(),
  description: z.string().optional(),
});
export const docsChangelogSchema = {
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

export interface IChangelogSchema {
  CREATE: z.infer<typeof docsChangelogSchema.CREATE>;
  UPDATE: z.infer<typeof docsChangelogSchema.UPDATE>;
  DELETE: z.infer<typeof docsChangelogSchema.DELETE>;
  READ: z.infer<typeof docsChangelogSchema.READ>;
  READ_LIST: z.infer<typeof docsChangelogSchema.READ_LIST>;
}
