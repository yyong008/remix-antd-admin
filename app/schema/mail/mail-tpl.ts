import { z } from "zod";

export const base = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  host: z.string().optional(),
  port: z.string().optional(),
  user: z.string().optional(),
  pass: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  subject: z.string().optional(),
  content: z.string().optional(),
  html: z.string().optional(),
  text: z.string().optional(),
});

export const mailTplSchema = {
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

export interface IMailTplSchema {
  CREATE: z.infer<typeof mailTplSchema.CREATE>;
  UPDATE: z.infer<typeof mailTplSchema.UPDATE>;
  DELETE: z.infer<typeof mailTplSchema.DELETE>;
  READ: z.infer<typeof mailTplSchema.READ>;
  READ_LIST: z.infer<typeof mailTplSchema.READ_LIST>;
}
