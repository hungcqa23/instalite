import z from 'zod';

export const PostBody = z.object({
  _id: z.string(),
  user_id: z.object({
    _id: z.string(),
    username: z.string()
  }),
  content: z.string(),
  type_post: z.number(),
  created_at: z.string(),
  updated_at: z.string()
});

export type Post = z.infer<typeof PostBody>;

export const PostRes = z.object({
  message: z.string(),
  post: z.array(PostBody)
});

export type PostResType = z.infer<typeof PostRes>;
