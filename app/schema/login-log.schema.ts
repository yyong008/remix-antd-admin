import { z } from "zod";

/*  ------------------ LoginLog-------------------------------*/
export const CreateLoginLogSchema = z.object({
  name: z.string(),
  ip: z.string(),
  address: z.string(),
  loginAt: z.date(),
  system: z.string(),
  browser: z.string(),
});

export type CreateLoginLogSchemaType = z.infer<typeof CreateLoginLogSchema>;

export const UpdateLoginLogSchema = CreateLoginLogSchema.extend({
  id: z.number(),
});

export type UpdateLoginLogSchemaType = z.infer<typeof UpdateLoginLogSchema>;

export const GetLoginLogByIdSchema = z.object({
  id: z.number(),
});

export type GetLoginLogByIdSchemaType = z.infer<typeof GetLoginLogByIdSchema>;

export const GetLoginLogByPageSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
});

export type GetLoginLogByPageSchemaType = z.infer<
  typeof GetLoginLogByPageSchema
>;

export const DeleteLoginLogByIdSchema = z.object({
  ids: z.array(z.number()),
});

export type DeleteLoginLogByIdSchemaType = z.infer<
  typeof DeleteLoginLogByIdSchema
>;
