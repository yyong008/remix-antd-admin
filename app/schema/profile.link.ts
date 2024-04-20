import { z } from "zod";

/*  ------------------ ProfileLink-------------------------------*/
export const CreateProfileLinkSchema = z.object({
  name: z.string(),
  url: z.string(),
  description: z.string().optional(),
  categoryId: z.number(),
});

export type CreateProfileLinkSchemaType = z.infer<
  typeof CreateProfileLinkSchema
>;

export const UpdateProfileLinkSchema = CreateProfileLinkSchema.extend({
  id: z.number(),
});

export type UpdateProfileLinkSchemaType = z.infer<
  typeof UpdateProfileLinkSchema
>;

export const GetProfileLinkByIdSchema = z.object({
  id: z.number(),
});

export type GetProfileLinkByIdSchemaType = z.infer<
  typeof GetProfileLinkByIdSchema
>;

export const GetProfileLinkByPageSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
});

export type GetProfileLinkByPageSchemaType = z.infer<
  typeof GetProfileLinkByPageSchema
>;

export const DeleteProfileLinkByIdSchema = z.object({
  ids: z.array(z.number()),
});

export type DeleteProfileLinkByIdSchemaType = z.infer<
  typeof DeleteProfileLinkByIdSchema
>;

/*  ------------------ ProfileLinkCategory-------------------------------*/
export const CreateProfileLinkCategorySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  userId: z.number(),
});

export type CreateProfileLinkCategorySchemaType = z.infer<
  typeof CreateProfileLinkCategorySchema
>;

export const UpdateProfileLinkCategorySchema =
  CreateProfileLinkCategorySchema.extend({
    id: z.number(),
  });

export type UpdateProfileLinkCategorySchemaType = z.infer<
  typeof UpdateProfileLinkCategorySchema
>;

export const GetProfileLinkCategoryByIdSchema = z.object({
  id: z.number(),
});

export type GetProfileLinkCategoryByIdSchemaType = z.infer<
  typeof GetProfileLinkCategoryByIdSchema
>;

export const GetProfileLinkCategoryByPageSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
});

export type GetProfileLinkCategoryByPageSchemaType = z.infer<
  typeof GetProfileLinkCategoryByPageSchema
>;

export const DeleteProfileLinkCategoryByIdSchema = z.object({
  ids: z.array(z.number()),
});

export type DeleteProfileLinkCategoryByIdSchemaType = z.infer<
  typeof DeleteProfileLinkCategoryByIdSchema
>;
