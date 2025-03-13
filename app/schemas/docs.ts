import { z } from "zod";

const changelogBaseSchema = z.object({
  content: z.string(),
  publish_name: z.string(),
  publish_time: z.string(),
  publish_version: z.string(),
  type: z.number(),
});

export const changelogSchema = {
  list: z.object({
    page: z.string().optional(),
    pageSize: z.string().optional(),
  }),
  create: z.object({
    ...changelogBaseSchema.shape,
  }),
  update: z.object({
    ...changelogBaseSchema.shape,
  }),
  deleteMany: z.object({
    ids: z.array(z.string().min(1)),
  }),
};

const feedbackBaseSchema = z.object({
  content: z.string(),
  url: z.string().optional(),
  userId: z.number().optional(),
});

export const feedbackSchema = {
  list: z.object({
    page: z.string().optional(),
    pageSize: z.string().optional(),
  }),
  create: z.object({
    ...feedbackBaseSchema.shape,
  }),
  update: z.object({
    ...feedbackBaseSchema.shape,
  }),
  deleteMany: z.object({
    ids: z.array(z.string().min(1)),
  }),
  getById: z.object({
    id: z.string().min(1),
  }),
  deleteById: z.object({
    id: z.string().min(1),
  }),
};