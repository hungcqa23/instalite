import { http } from '@/lib/http';
import { CreatePost } from '@/schema-validations/post.schema';

export const postApiRequest = {
  like: (postId: string) =>
    http.post(`/likes`, {
      postId
    }),
  unLike: (postId: string) =>
    http.delete(`/likes`, {
      postId
    }),

  bookmark: (postId: string) =>
    http.post(`/bookmarks`, {
      postId
    }),
  unBookmark: (postId: string) =>
    http.delete(`/bookmarks`, {
      postId
    }),
  create: (body: CreatePost) =>
    http.post(`/posts`, {
      body
    }),
  uploadImage: (body: FormData, postId: string) =>
    http.patch(`posts/${postId}`, { body })
};
