import { z } from "zod";

/*------------------------login----------------------------*/
export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type TLogin = z.infer<typeof LoginSchema>;

/*------------------------login-log----------------------------*/
export const loginLogSchema = z.object({
  name: z.string(),
  ip: z.string().optional(),
  address: z.string().optional(),
  browser: z.string().optional(),
  system: z.string().optional(),
});

export type TLoginLog = z.infer<typeof loginLogSchema>;

/*------------------------register----------------------------*/
export const RegisterSchema = z.object({
  username: z.string(),
  password: z.string(),
  passwordRe: z.string(),
});

export type TRegister = z.infer<typeof LoginSchema>;
