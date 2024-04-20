import { z } from "zod";

/*  ------------------ Dictionary-------------------------------*/
export const CreateDictionarySchema = z.object({
  name: z.string(),
  code: z.string(),
  description: z.string().optional(),
  remark: z.string().optional(),
  status: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type CreateDictionarySchemaType = z.infer<typeof CreateDictionarySchema>;

export const UpdateDictionarySchema = CreateDictionarySchema.extend({
  id: z.number(),
});

export type UpdateDictionarySchemaType = z.infer<typeof UpdateDictionarySchema>;

export const GetDictionaryByIdSchema = z.object({
  id: z.number(),
});

export type GetDictionaryByIdSchemaType = z.infer<
  typeof GetDictionaryByIdSchema
>;

export const GetDictionaryByPageSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
});

export type GetDictionaryByPageSchemaType = z.infer<
  typeof GetDictionaryByPageSchema
>;

export const DeleteDictionaryByIdSchema = z.object({
  ids: z.array(z.number()),
});

export type DeleteDictionaryByIdSchemaType = z.infer<
  typeof DeleteDictionaryByIdSchema
>;

/*  ------------------ DictionaryEntry-------------------------------*/
export const CreateDictionaryEntrySchema = z.object({
  key: z.string(),
  value: z.string(),
  orderNo: z.number(),
  status: z.number(),
  remark: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  dictionaryId: z.number(),
});

export type CreateDictionaryEntrySchemaType = z.infer<
  typeof CreateDictionaryEntrySchema
>;

export const UpdateDictionaryEntrySchema = CreateDictionaryEntrySchema.extend({
  id: z.number(),
});

export type UpdateDictionaryEntrySchemaType = z.infer<
  typeof UpdateDictionaryEntrySchema
>;

export const GetDictionaryEntryByIdSchema = z.object({
  id: z.number(),
});

export type GetDictionaryEntryByIdSchemaType = z.infer<
  typeof GetDictionaryEntryByIdSchema
>;

export const GetDictionaryEntryByPageSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
});

export type GetDictionaryEntryByPageSchemaType = z.infer<
  typeof GetDictionaryEntryByPageSchema
>;

export const DeleteDictionaryEntryByIdSchema = z.object({
  ids: z.array(z.number()),
});

export type DeleteDictionaryEntryByIdSchemaType = z.infer<
  typeof DeleteDictionaryEntryByIdSchema
>;
