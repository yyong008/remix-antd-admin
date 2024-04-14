import { z } from "zod";

const MenuSchema = z.object({
  key: z.number().optional(),
  value: z.number().optional(),
  id: z.number(),
});

export const CreateRoleSchema = z.object({
  value: z.string(),
  name: z.string(),
  description: z.string().optional(),
  remark: z.string().optional(),
  status: z.number(),
  menus: z.array(MenuSchema),
});

export const UpdateRoleSchema = z.object({
  id: z.number(),
  value: z.string(),
  name: z.string(),
  description: z.string().optional(),
  remark: z.string().optional(),
  status: z.number(),
  menus: z.array(MenuSchema),
});

export const DeleteRoleSchema = z.object({
  ids: z.number(),
});
