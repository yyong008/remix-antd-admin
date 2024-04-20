import { z } from "zod";

/*  ------------------ UserRole-------------------------------*/
export const CreateUserRoleSchema = z.object({
  userId: z.number(),
  roleId: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type CreateUserRoleSchemaType = z.infer<typeof CreateUserRoleSchema>;

export const UpdateUserRoleSchema = CreateUserRoleSchema.extend({
  id: z.number(),
});

export type UpdateUserRoleSchemaType = z.infer<typeof UpdateUserRoleSchema>;

export const GetUserRoleByIdSchema = z.object({
  id: z.number(),
});

export type GetUserRoleByIdSchemaType = z.infer<typeof GetUserRoleByIdSchema>;

export const GetUserRoleByPageSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
});

export type GetUserRoleByPageSchemaType = z.infer<
  typeof GetUserRoleByPageSchema
>;

export const DeleteUserRoleByIdSchema = z.object({
  ids: z.array(z.number()),
});

export type DeleteUserRoleByIdSchemaType = z.infer<
  typeof DeleteUserRoleByIdSchema
>;
