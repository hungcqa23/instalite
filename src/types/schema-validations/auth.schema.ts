import { AccountSchema } from '@/types/schema-validations/account.schema';
import z from 'zod';

export const RegisterBody = z.object({
  username: z.string().trim().min(6).max(256),
  email: z.string().email(),
  password: z.string().min(6).max(100)
});
export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const LoginBody = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(100)
  })
  .strict();
export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginRes = z.object({
  message: z.string(),
  data: AccountSchema
});
export type LoginResType = z.TypeOf<typeof LoginRes>;

export const RegisterRes = z.object({
  message: z.string(),
  data: AccountSchema
});
export type RegisterResType = z.TypeOf<typeof RegisterRes>;
