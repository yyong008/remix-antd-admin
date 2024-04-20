import { z } from "zod";

/*  ------------------ MenuRole-------------------------------*/
export const CreateMenuRoleSchema = z.object({
  userId: z.number(),
  menuId: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type CreateMenuRoleSchemaType = z.infer<typeof CreateMenuRoleSchema>;

export const UpdateMenuRoleSchema = CreateMenuRoleSchema.extend({
  id: z.number(),
});

export type UpdateMenuRoleSchemaType = z.infer<typeof UpdateMenuRoleSchema>;

export const GetMenuRoleByIdSchema = z.object({
  id: z.number(),
});

export type GetMenuRoleByIdSchemaType = z.infer<typeof GetMenuRoleByIdSchema>;

export const GetMenuRoleByPageSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
});

export type GetMenuRoleByPageSchemaType = z.infer<
  typeof GetMenuRoleByPageSchema
>;

export const DeleteMenuRoleByIdSchema = z.object({
  ids: z.array(z.number()),
});

export type DeleteMenuRoleByIdSchemaType = z.infer<
  typeof DeleteMenuRoleByIdSchema
>;
