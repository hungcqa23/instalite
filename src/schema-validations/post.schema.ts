import z from 'zod';

export enum PostType {
  NewPost,
  RePost,
  Comment
}

export const CreatePostBody = z.object({
  content: z.string(),
  typePost: z.nativeEnum(PostType)
});
export type CreatePost = z.infer<typeof CreatePostBody>;

export const PostBody = z.object({
  _id: z.string(),
  user_id: z.object({
    _id: z.string(),
    username: z.string(),
    avatar: z.string()
  }),
  media: z.object({
    url: z.string(),
    type: z.number()
  }),
  content: z.string(),
  type_post: z.number(),
  likes: z.number(),
  comments: z.number(),
  created_at: z.string(),
  updated_at: z.string()
});

export type Post = z.infer<typeof PostBody>;

export const PostRes = z.object({
  message: z.string(),
  post: z.array(PostBody)
});

export type PostResType = z.infer<typeof PostRes>;
