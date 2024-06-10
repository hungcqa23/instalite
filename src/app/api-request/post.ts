import { http } from '@/lib/http';

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
  hasLike: (postId: string) =>
    http.get(`/likes`, {
      postId
    })
};
