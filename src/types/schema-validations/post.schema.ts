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
  userId: z.object({
    _id: z.string(),
    username: z.string(),
    avatar: z.string()
  }),
  media: z.object({
    url: z.string(),
    type: z.number()
  }),
  content: z.string(),
  typePost: z.number(),
  likes: z.number(),
  comments: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type Post = z.infer<typeof PostBody>;

export const PostRes = z.object({
  message: z.string(),
  data: z.object({
    data: z.array(PostBody),
    meta: z.object({
      page: z.number(),
      take: z.number(),
      itemCount: z.number(),
      pageCount: z.number(),
      hasPreviousPage: z.boolean(),
      hasNextPage: z.boolean()
    })
  })
});

export type PostResType = z.infer<typeof PostRes>;
