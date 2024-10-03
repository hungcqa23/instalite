import { http } from '@/lib/http';
import { QueryBuilder } from '@/lib/url-builder';
import { Post, PostResType } from '@/types/schema-validations/post.schema';

const postApiRequest = {
  getAll: ({ page = 1, take = 7 }: { page?: number; take?: number }) => {
    const url = new QueryBuilder()
      .setPathname('/posts')
      .setPage(page)
      .setLimit(take)
      .build()
      .toString();

    return http.get<PostResType>(url);
  },
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
      content,
      typePost: 0
    })
};
export { postApiRequest };
