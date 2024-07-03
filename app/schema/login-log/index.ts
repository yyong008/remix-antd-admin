import { number, z } from "zod";

const base = z.object({
  name: z.string(),
  ip: z.string().optional(),
  address: z.string().optional(),
  browser: z.string().optional(),
  system: z.string().optional(),
});

export const loginlogSchema = {
  CREATE: base,
  UPDATE: base.extend({ id: number() }),
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

export interface ILoginLogSchema {
  CREATE: z.infer<typeof loginlogSchema.CREATE>;
}
