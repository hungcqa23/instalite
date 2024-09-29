import { http } from '@/lib/http';
import { Post } from '@/types/schema-validations/post.schema';
import { create } from 'domain';

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
    }),
  create: ({ content }: { content: string }) =>
    http.post<{
      message: string;
      data: Post;
    }>('/posts', {
      content
    })
};
export { postApiRequest };
