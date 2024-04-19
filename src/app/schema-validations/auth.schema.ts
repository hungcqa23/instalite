import z from 'zod';

export const LoginBody = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(100)
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;
