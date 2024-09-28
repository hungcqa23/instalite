import { http } from '@/lib/http';
import { Post } from '@/types/schema-validations/post.schema';

const postApiRequest = {
  getAll: () =>
    http.get<{
      message: string;
      data: Post[];
    }>('/posts'),
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
    })
};
export { postApiRequest };
