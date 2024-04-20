import { z } from "zod";

/*  ------------------ Department-------------------------------*/
export const CreateDepartmentSchema = z.object({
  name: z.string(),
  description: z.string(),
  orderNo: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  parentDepartmentId: z.number().optional(),
});

export type CreateDepartmentSchemaType = z.infer<typeof CreateDepartmentSchema>;

export const UpdateDepartmentSchema = CreateDepartmentSchema.extend({
  id: z.number(),
});

export type UpdateDepartmentSchemaType = z.infer<typeof UpdateDepartmentSchema>;

export const GetDepartmentByIdSchema = z.object({
  id: z.number(),
});

export type GetDepartmentByIdSchemaType = z.infer<
  typeof GetDepartmentByIdSchema
>;

export const GetDepartmentByPageSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
});

export type GetDepartmentByPageSchemaType = z.infer<
  typeof GetDepartmentByPageSchema
>;

export const DeleteDepartmentByIdSchema = z.object({
  ids: z.array(z.number()),
});

export type DeleteDepartmentByIdSchemaType = z.infer<
  typeof DeleteDepartmentByIdSchema
>;
