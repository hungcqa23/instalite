import z from 'zod';

export const AccountRes = z.object({
  data: z.object({
    __NEXT_HTTP_AGENTid: z.string(),
    username: z.string(),
    email: z.string(),
    followers_count: z.number(),
    following_count: z.number(),
    posts_count: z.number(),
    is_registered_via_oauth_google: z.boolean(),
    refresh_token: z.string()
  }),
  message: z.string()
});

export type AccountResType = z.TypeOf<typeof AccountRes>;
