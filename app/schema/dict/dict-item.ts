import { z } from "zod";

const base = z.object({
  name: z.string(),
  description: z.string().optional(),
});
export const dictItemSchema = {
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

export interface IDictItemSchema {
  CREATE: z.infer<typeof dictItemSchema.CREATE>;
  UPDATE: z.infer<typeof dictItemSchema.UPDATE>;
  DELETE: z.infer<typeof dictItemSchema.DELETE>;
  READ: z.infer<typeof dictItemSchema.READ>;
  READ_LIST: z.infer<typeof dictItemSchema.READ_LIST>;
}
