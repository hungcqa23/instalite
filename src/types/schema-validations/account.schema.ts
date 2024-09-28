import z from 'zod';

export const AccountSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string(),
  followersCount: z.number(),
  followingCount: z.number(),
  postsCount: z.number(),
  isRegisteredViaOauthGoogle: z.boolean(),
  refreshToken: z.string().optional(),
  avatar: z.string().optional(),
  fullName: z.string().optional(),
  bio: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type Account = z.TypeOf<typeof AccountSchema>;

export const FollowUser = z.object({
  _id: z.string(),
  username: z.string(),
  avatar: z.string(),
  full_name: z.string()
});

export type FollowUser = z.TypeOf<typeof FollowUser>;

export const AccountRes = z.object({
  message: z.string(),
  result: AccountSchema
});

export type AccountResType = z.TypeOf<typeof AccountRes>;
export type User = AccountResType['result'];
