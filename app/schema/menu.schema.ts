import { z } from "zod";

/*---------------------dir: add/update--------------------------*/
export const AddMenuDirSchema = z.object({
  type: z.number(),
  name: z.string(),
  parentId: z.number(),
  path: z.string(),
  path_file: z.string().optional(),
  icon: z.string().optional(),
  orderNo: z.number(),
  description: z.string().optional(),
  remark: z.string().optional(),
  isLink: z.number(),
  isShow: z.number(),
  status: z.number(),
});

export const UpdateMenuDirSchema = AddMenuDirSchema.extend({
  id: z.number(),
});

/*---------------------menu: add/update--------------------------*/
export const AddMenuSchema = z.object({
  type: z.number(),
  name: z.string(),
  parentId: z.number(),
  path: z.string(),
  permission: z.string().optional(),
  icon: z.string(),
  path_file: z.string(),
  orderNo: z.number(),
  description: z.string().optional(),
  remark: z.string().optional(),
  isLink: z.number().optional(),
  isShow: z.number().optional(),
  status: z.number().optional(),
  cache: z.number().optional(),
});

export const UpdateMenuSchema = AddMenuSchema.extend({
  id: z.number(),
});

/*---------------------perm: add/update--------------------------*/
export const AddMenuPermSchema = z.object({
  type: z.number(),
  name: z.string(),
  parentId: z.number(),
  permission: z.string().optional(),
  orderNo: z.number(),
  status: z.number().optional(),
});

export const UpdateMenuPermSchema = AddMenuPermSchema.extend({
  id: z.number(),
});

/*---------------------menu: delete--------------------------*/
export const deleteMenuSchema = z.object({
  ids: z.array(z.number()),
});
