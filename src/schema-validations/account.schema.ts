import z from 'zod';

export const AccountSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string(),
  followers_count: z.number(),
  following_count: z.number(),
  posts_count: z.number(),
  is_registered_via_oauth_google: z.boolean(),
  refresh_token: z.string(),
  avatar: z.string().optional(),
  full_name: z.string().optional(),
  bio: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string()
});

export type Account = z.TypeOf<typeof AccountSchema>;

export const AccountRes = z.object({
  message: z.string(),
  result: AccountSchema
});

export type AccountResType = z.TypeOf<typeof AccountRes>;
export type User = AccountResType['result'];
