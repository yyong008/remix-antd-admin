import { z } from "zod";

/*---------------------user: add/update--------------------------*/
export const userSchema = z.object({
  name: z.string(),
  avatar: z.string(),
  password: z.string().optional(),
  email: z.string().email().optional(),
  roles: z.array(z.number()),
  dept: z.number(),
  nickname: z.string().optional(),
  phone: z.string().optional(),
  lang: z.string().optional(),
  theme: z.string().optional(),
  remark: z.string().optional(),
  status: z.number().optional(),
});

export type UserSchemaType = z.infer<typeof userSchema>;

export const userUpdateSchema = userSchema.extend({
  id: z.number(),
});

export type UserUpdateSchemaType = z.infer<typeof userUpdateSchema>;

/*---------------------user: delete--------------------------*/
export const deleteUserSchema = z.object({
  ids: z.array(z.number()),
});

export type UserDeleteSchema = z.infer<typeof deleteUserSchema>;
