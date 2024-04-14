import { z } from "zod";

/*---------------------blog add/update/delete--------------------------*/
export const CreateBlogSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const UpdateBlogSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

export const DeleteBlogSchema = z.object({
  ids: z.array(z.number()),
});

export const GetBlogSchema = z.object({
  id: z.number().optional(),
  categoryId: z.number().optional(),
  tagId: z.number().optional(),
});

/*---------------------blog:category add/update/delete--------------------------*/
export const CreateBlogCategorySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const UpdateBlogCategorySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

export const DeleteBlogCategorySchema = z.object({
  ids: z.array(z.number()),
});

export const GetBlogCategorySchema = z.object({
  id: z.number().optional(),
  name: z.number().optional(),
});

/*---------------------blog:tag add/update/delete--------------------------*/
export const CreateBlogTagSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const UpdateBlogTagSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

export const DeleteBlogTagSchema = z.object({
  ids: z.array(z.number()),
});

export const GetBlogTagSchema = z.object({
  id: z.number().optional(),
  name: z.number().optional(),
});
