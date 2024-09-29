import { http } from '@/lib/http';
import { Post } from '@/types/schema-validations/post.schema';

const postApiRequest = {
  getAll: () =>
    http.get<{
      message: string;
      data: Post[];
    }>('/posts'),
  update: ({ postId, content }: { postId: string; content: string }) =>
    http.patch<{}>(`/posts/${postId}`, {
      content
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
