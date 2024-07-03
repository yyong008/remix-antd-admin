import { z } from "zod";

const base = z.object({
  name: z.string(),
  description: z.string().optional(),
});
export const docsFeedbackSchema = {
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

export interface IFeedbackSchema {
  CREATE: z.infer<typeof docsFeedbackSchema.CREATE>;
  UPDATE: z.infer<typeof docsFeedbackSchema.UPDATE>;
  DELETE: z.infer<typeof docsFeedbackSchema.DELETE>;
  READ: z.infer<typeof docsFeedbackSchema.READ>;
  READ_LIST: z.infer<typeof docsFeedbackSchema.READ_LIST>;
}
