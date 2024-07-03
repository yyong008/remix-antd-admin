import { z } from "zod";

const base = z.object({});

export const profileSchema = {
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

export interface IProfileSchema {
  CREATE: z.infer<typeof profileSchema.CREATE>;
  UPDATE: z.infer<typeof profileSchema.UPDATE>;
  DELETE: z.infer<typeof profileSchema.DELETE>;
  READ: z.infer<typeof profileSchema.READ>;
  READ_LIST: z.infer<typeof profileSchema.READ_LIST>;
}
