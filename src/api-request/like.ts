import { http } from '@/lib/http';

export const likeApiRequest = {
  like: (postId: string) => http.post(`/likes`, { postId }),
  unLike: (postId: string) => http.delete(`/likes`, { postId })
};
