import { z } from "zod";

/*  ------------------ news-------------------------------*/
export const CreateNewsSchema = z.object({
  title: z.string(),
  content: z.string(),
  author: z.string().optional(),
  source: z.string().optional(),
  viewCount: z.number(),
  publishedAt: z.date(),
  newsId: z.string(),
  userId: z.string(),
});

export type CreateNewsSchemaType = z.infer<typeof CreateNewsSchema>;

export const UpdateNewsSchema = CreateNewsSchema.extend({
  id: z.number(),
});

export type UpdateNewsSchemaType = z.infer<typeof UpdateNewsSchema>;

export const GetNewsByIdSchema = z.object({
  id: z.number(),
});

export type GetNewsByIdSchemaType = z.infer<typeof GetNewsByIdSchema>;

export const GetNewsByPageSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
});

export type GetNewsByPageSchemaType = z.infer<typeof GetNewsByPageSchema>;

export const DeleteNewsByIdSchema = z.object({
  ids: z.array(z.number()),
});

export type DeleteNewsByIdSchemaType = z.infer<typeof DeleteNewsByIdSchema>;

/*  ------------------ news:category -------------------------------*/
export const CreateNewsCategorySchema = z.object({
  name: z.string(),
  description: z.string(),
  userId: z.string(),
});

export type CreateNewsCategorySchemaType = z.infer<
  typeof CreateNewsCategorySchema
>;

export const UpdateNewsCategorySchema = CreateNewsCategorySchema.extend({
  id: z.number(),
});

export type UpdateNewsCategorySchemaType = z.infer<
  typeof UpdateNewsCategorySchema
>;

export const GetNewsCategoryByIdSchema = z.object({
  id: z.number(),
});

export type GetNewsCategoryByIdSchemaType = z.infer<
  typeof GetNewsCategoryByIdSchema
>;

export const GetNewsCategoryByPageSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
});

export type GetNewsCategoryByPageSchemaType = z.infer<
  typeof GetNewsCategoryByPageSchema
>;

export const DeleteNewsCategoryByIdSchema = z.object({
  ids: z.array(z.number()),
});

export type DeleteNewsCategoryByIdSchemaType = z.infer<
  typeof DeleteNewsCategoryByIdSchema
>;
