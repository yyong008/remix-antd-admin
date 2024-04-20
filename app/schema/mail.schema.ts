import { z } from "zod";

// 发送邮件
export const PostMailSchema = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  host: z.string().optional(),
  port: z.string().optional(),
  user: z.string().optional(),
  pass: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  subject: z.string().optional(),
  content: z.string().optional(),
  html: z.string().optional(),
  text: z.string().optional(),
});

// 邮件模板
export const CreateMailTemplateSchema = PostMailSchema.extend({});

export const UpdateMailTemplateSchema = PostMailSchema.extend({
  id: z.number(),
});

export const FindMailTemplateByIdSchema = z.object({
  id: z.number(),
});

export const FindMailTemplateByPageSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
});

export const DeleteMailTemplateByIdsSchema = z.object({
  ids: z.array(z.number()),
});
