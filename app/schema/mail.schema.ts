import { z } from "zod";

// 发送邮件
export const PostMailSchema = z.object({
  name: z.string(),
  // TODO: 补齐
});

// 邮件模板
export const CreateMailTemplateSchema = z.object({
  name: z.string(),
  // TODO: 补齐
});
export const UpdateMailTemplateSchema = z.object({
  name: z.string(),
  // TODO: 补齐
});
export const findMailTemplateByIdSchema = z.object({
  name: z.string(),
  // TODO: 补齐
});
export const findMailTemplateByPageSchema = z.object({
  name: z.string(),
  // TODO: 补齐
});
export const DeleteMailTemplateByIdsSchema = z.object({
  name: z.string(),
  // TODO: 补齐
});
