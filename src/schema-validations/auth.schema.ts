import { z } from 'zod';

export const RegisterBody = z.object({
  username: z.string().trim().min(2).max(256),
  email: z.string().email(),
  password: z.string().min(6).max(100)
});

export const LoginBody = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(100)
  })
  .strict();

export type LoginBodyType = z.infer<typeof LoginBody>;

export const RegisterRes = z.object({
  message: z.string()
});

export const LoginRes = RegisterRes;

export type LoginResType = z.infer<typeof LoginRes>;
