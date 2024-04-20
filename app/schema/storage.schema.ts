import { z } from "zod";

/*  ------------------ Storage-------------------------------*/
export const CreateStorageSchema = z.object({
  type: z.string(),
  size: z.string(),
  path: z.string(),
  extName: z.string(),
  fileName: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.number(),
});

export type CreateStorageSchemaType = z.infer<typeof CreateStorageSchema>;

export const UpdateStorageSchema = CreateStorageSchema.extend({
  id: z.number(),
});

export type UpdateStorageSchemaType = z.infer<typeof UpdateStorageSchema>;

export const GetStorageByIdSchema = z.object({
  id: z.number(),
});

export type GetStorageByIdSchemaType = z.infer<typeof GetStorageByIdSchema>;

export const GetStorageByPageSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
});

export type GetStorageByPageSchemaType = z.infer<typeof GetStorageByPageSchema>;

export const DeleteStorageByIdSchema = z.object({
  ids: z.array(z.number()),
});

export type DeleteStorageByIdSchemaType = z.infer<
  typeof DeleteStorageByIdSchema
>;
